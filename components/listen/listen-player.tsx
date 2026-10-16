"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listen } from "@/lib/site-content";
import { registerExclusiveAudio } from "@/lib/exclusive-audio";
import { ListenArtwork } from "@/components/listen/listen-artwork";
import styles from "./listen.module.css";

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "-:--";
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** iOS Safari ignores `audio.volume` (hardware buttons only), so only show a slider where it works. */
function volumeIsSettable() {
  try {
    const probe = document.createElement("audio");
    probe.volume = 0.5;
    return probe.volume === 0.5;
  } catch {
    return false;
  }
}

/**
 * The standalone player for /listen: one large play/pause/replay
 * control, a seekable progress bar, elapsed/total time and (where the
 * browser allows it) volume. Plays the same file as the homepage
 * cassette. Never autoplays — playback only starts from a press.
 */
export function ListenPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrubbing = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [buffering, setBuffering] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(NaN);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [canSetVolume, setCanSetVolume] = useState(false);

  // Register for exclusive playback, and pick up metadata/errors the
  // server-rendered <audio> may have reached before hydration.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.error) setStatus("error");
    else if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) setDuration(audio.duration);
    // Feature detection has to run in the browser, after hydration.
    setCanSetVolume(volumeIsSettable());
    return registerExclusiveAudio(audio);
  }, []);

  // Smooth progress while playing (timeupdate fires only ~4×/s).
  useEffect(() => {
    if (status !== "playing") return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio && !scrubbing.current) setCurrent(audio.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [status]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (status === "error") {
      // One retry: reload the source and try again.
      audio.load();
    }
    if (audio.paused || audio.ended) {
      if (audio.ended) audio.currentTime = 0;
      setStatus((s) => (s === "playing" ? s : "loading"));
      audio.play().catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setStatus("error");
      });
    } else {
      audio.pause();
    }
  }, [status]);

  // Lock-screen / headphone controls, where supported.
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const ms = navigator.mediaSession;
    ms.metadata = new MediaMetadata({ title: listen.title, artist: listen.artist });
    const audio = audioRef.current;
    ms.setActionHandler("play", () => void audio?.play().catch(() => {}));
    ms.setActionHandler("pause", () => audio?.pause());
    ms.setActionHandler("seekto", (d) => {
      if (audio && d.seekTime !== undefined) audio.currentTime = d.seekTime;
    });
    return () => {
      for (const a of ["play", "pause", "seekto"] as const) ms.setActionHandler(a, null);
    };
  }, []);

  // Space toggles playback unless a control already handles the key.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && t.closest("button, input, a, [contenteditable]")) return;
      e.preventDefault();
      toggle();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  function seek(value: number) {
    const audio = audioRef.current;
    setCurrent(value);
    if (audio && Number.isFinite(audio.duration)) audio.currentTime = value;
    if (status === "ended") setStatus("paused");
  }

  function changeVolume(v: number) {
    const audio = audioRef.current;
    setVolume(v);
    setMuted(v === 0);
    if (audio) {
      audio.volume = v;
      audio.muted = v === 0;
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    const next = !muted;
    setMuted(next);
    if (audio) audio.muted = next;
    if (!next && volume === 0) changeVolume(0.8);
  }

  const hasDuration = Number.isFinite(duration) && duration > 0;
  const progress = hasDuration ? Math.min(1, current / duration) : 0;
  const isPlaying = status === "playing";
  const showSpinner = status === "loading" || (isPlaying && buffering);

  const buttonLabel =
    status === "error"
      ? "Try playing again"
      : status === "ended"
        ? `Replay “${listen.title}”`
        : isPlaying
          ? `Pause “${listen.title}”`
          : `Play “${listen.title}”`;

  return (
    <div className={styles.player} data-playing={isPlaying || undefined}>
      <div className={styles.art}>
        <ListenArtwork />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <p className={styles.artist}>{listen.artist}</p>
          <h1 className={styles.title}>{listen.title}</h1>
          <p className={styles.subtitle}>{listen.subtitle}</p>
        </div>

        <div className={styles.progressBlock}>
          <input
            type="range"
            className={styles.range}
            min={0}
            max={hasDuration ? duration : 0}
            step={0.1}
            value={hasDuration ? current : 0}
            disabled={!hasDuration}
            aria-label="Seek"
            aria-valuetext={hasDuration ? `${formatTime(current)} of ${formatTime(duration)}` : "Loading"}
            style={{ ["--p" as string]: `${progress * 100}%` }}
            onPointerDown={() => (scrubbing.current = true)}
            onPointerUp={() => (scrubbing.current = false)}
            onPointerCancel={() => (scrubbing.current = false)}
            onChange={(e) => seek(Number(e.currentTarget.value))}
          />
          <div className={styles.times} aria-hidden="true">
            <span>{formatTime(current)}</span>
            <span>{hasDuration ? formatTime(duration) : "-:--"}</span>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.side}>
            {canSetVolume && (
              <div className={styles.volume}>
                <button
                  type="button"
                  className={styles.iconButton}
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  aria-pressed={muted}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 9h3.5L12 5v14l-4.5-4H4z" fill="currentColor" />
                    {muted ? (
                      <path d="M16 9.5l5 5M21 9.5l-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                    ) : (
                      <path
                        d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        fill="none"
                      />
                    )}
                  </svg>
                </button>
                <input
                  type="range"
                  className={`${styles.range} ${styles.volumeRange}`}
                  min={0}
                  max={1}
                  step={0.01}
                  value={muted ? 0 : volume}
                  aria-label="Volume"
                  aria-valuetext={`${Math.round((muted ? 0 : volume) * 100)}%`}
                  style={{ ["--p" as string]: `${(muted ? 0 : volume) * 100}%` }}
                  onChange={(e) => changeVolume(Number(e.currentTarget.value))}
                />
              </div>
            )}
          </div>

          <button
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={buttonLabel}
            aria-busy={showSpinner || undefined}
          >
            {showSpinner && <span className={styles.spinner} aria-hidden="true" />}
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.playIcon}>
              {status === "ended" || status === "error" ? (
                <path
                  d="M5.5 12a6.5 6.5 0 1 0 2-4.7M5.5 4.5v3.6h3.6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ) : isPlaying ? (
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" />
              ) : (
                <path d="M8.5 5.2v13.6L19 12z" fill="currentColor" />
              )}
            </svg>
          </button>

          <div className={`${styles.side} ${styles.sideEnd}`} aria-live="polite">
            <span className={styles.status}>
              {status === "error"
                ? "Couldn’t load the audio"
                : status === "ended"
                  ? "Play again"
                  : showSpinner
                    ? "Loading…"
                    : ""}
            </span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={listen.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onPlaying={() => {
          setBuffering(false);
          setStatus("playing");
        }}
        onWaiting={() => setBuffering(true)}
        onPause={(e) => {
          if (e.currentTarget.ended) return;
          setStatus("paused");
          setCurrent(e.currentTarget.currentTime);
        }}
        onEnded={(e) => {
          setStatus("ended");
          setCurrent(e.currentTarget.duration);
        }}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
