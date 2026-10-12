"use client";

import { useEffect, useRef, useState } from "react";
import { cassette } from "@/lib/site-content";

function Reel() {
  return (
    <div
      className="cassette-reel relative flex aspect-square w-[3.3em] shrink-0 items-center justify-center rounded-full sm:w-[4.6em]"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #4b5266 0%, #2b303e 55%, #1c2029 100%)",
        boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 8%)",
      }}
    >
      {/* A few spokes so the spin actually reads as motion, not just a blur. */}
      {[0, 60, 120].map((deg) => (
        <span
          key={deg}
          className="absolute h-[70%] w-[2px] rounded-full"
          style={{ background: "rgb(255 255 255 / 10%)", transform: `rotate(${deg}deg)` }}
        />
      ))}
      <span
        className="relative h-[38%] w-[38%] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 35%, #c9945a 0%, #8a5f34 70%, #6e4a29 100%)",
          boxShadow: "0 0 0 3px rgb(0 0 0 / 15%)",
        }}
      />
    </div>
  );
}

/** "m:ss" for the time readout and the progress bar's accessible value. */
function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * The hero's audio player, built as an original cream cassette object
 * (two reels, a recessed playback window, a play control, a progress
 * track) rather than a generic audio-player bar, because that object
 * is deliberately part of this portfolio's visual identity.
 *
 * Plays "Designer Brain" (cassette.src) through a hidden `<audio>`:
 * the button toggles play/pause, the track fills with the real
 * playback position, and at the end the player resets so it can be
 * played again. Nothing autoplays. If the file can't load or play,
 * the button gives its small "not yet" shake instead of pretending to
 * play, and its label says the audio is unavailable.
 */
export function Cassette() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [nudgeKey, setNudgeKey] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  // The server-rendered <audio> can load its metadata (or fail) before
  // React attaches the handlers below, so pick up what it already has.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.error) setFailed(true);
    else if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) setDuration(audio.duration);
  }, []);

  // `timeupdate` only fires a few times a second; while playing, read
  // the position every frame so the track fills smoothly.
  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setCurrent(audio.currentTime);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  function fail() {
    setFailed(true);
    setPlaying(false);
    setNudgeKey((k) => k + 1);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio || failed) {
      setNudgeKey((k) => k + 1);
      return;
    }
    if (audio.paused) {
      audio.play().catch(fail);
    } else {
      audio.pause();
    }
  }

  const progress = duration > 0 ? Math.min(1, current / duration) : 0;

  return (
    <div
      // Every inner dimension is in `em`, so this one font-size per
      // breakpoint scales the whole cassette — reels, window, button,
      // text, track — together, keeping its proportions. Widths are
      // sized to the room the hero row actually has at each width:
      // phones are already full-width (92vw), so there the parts grow
      // within the same width; md is tight beside the cycling word;
      // from xl up there is room to make it a prominent object.
      className="cassette flex w-[min(92vw,26rem)] items-center gap-[0.9em] rounded-[1.9em] p-[0.9em] text-[13px] sm:w-[30rem] sm:text-[15px] md:w-[26rem] md:text-[14px] lg:w-[30rem] lg:text-[15px] xl:w-[clamp(34rem,40vw,44rem)] xl:text-[clamp(16px,1.25vw,20px)]"
      style={{
        background: "linear-gradient(160deg, #fffaf0 0%, #f6e9cf 100%)",
        boxShadow:
          "0 24px 48px -12px rgb(28 34 48 / 22%), inset 0 0 0 1px rgb(255 255 255 / 60%)",
      }}
    >
      <Reel />

      <div
        className="flex min-w-0 flex-1 flex-col gap-[0.7em] rounded-[1.2em] px-[1em] py-[0.95em]"
        style={{
          background: "rgb(28 34 48 / 6%)",
          boxShadow: "inset 0 2px 4px rgb(28 34 48 / 12%)",
        }}
      >
        {/* Every color in here is a fixed value, never a theme token.
            The cassette is a physical object that doesn't repaint
            itself for dark mode any more than a real one would — but
            that means its own text/controls must never borrow a token
            that DOES flip (text-ink, var(--accent-strong), …), or
            dark mode quietly turns them into light-on-light. Verified
            by screenshotting dark mode specifically, not assumed. */}
        {/* Must stay on one line (spec) — never wrap. Below `sm` the
            cassette can't get any wider than the phone, so the title
            is a touch smaller relative to the rest there to keep
            reading in full at the narrowest real phone widths.
            `text-ellipsis` stays on as a last-resort safety net, never
            the primary fit strategy. */}
        <p
          className="overflow-hidden text-[0.92em] leading-snug font-semibold text-ellipsis whitespace-nowrap sm:text-[1.02em]"
          style={{ color: "#1c2230" }}
        >
          {cassette.title}
        </p>

        <div className="flex items-center gap-[0.75em]">
          <audio
            ref={audioRef}
            src={cassette.src}
            preload="metadata"
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onPlay={() => setPlaying(true)}
            onPause={(e) => {
              setPlaying(false);
              setCurrent(e.currentTarget.currentTime);
            }}
            onEnded={(e) => {
              e.currentTarget.currentTime = 0;
              setPlaying(false);
              setCurrent(0);
            }}
            onError={fail}
          />

          <button
            key={nudgeKey}
            type="button"
            aria-label={failed ? cassette.errorLabel : playing ? cassette.pauseLabel : cassette.playLabel}
            onClick={toggle}
            className={`flex h-[3.4em] w-[3.4em] shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 sm:h-[2.7em] sm:w-[2.7em] ${
              nudgeKey ? "cassette-nudge" : ""
            }`}
            style={{ background: "#1c2230", color: "#fbf3e6" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[40%] w-[40%]">
              {playing ? (
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              ) : (
                <path d="M8 5v14l11-7z" />
              )}
            </svg>
          </button>

          <div className="flex min-w-0 flex-1 flex-col gap-[0.45em]">
            {/* The 3% stub is the track's resting look; playback fills
                it from there with the real position. */}
            <div
              role="progressbar"
              aria-label="Playback position"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              aria-valuetext={duration > 0 ? `${formatTime(current)} of ${formatTime(duration)}` : undefined}
              className="relative h-[0.32em] min-h-1 overflow-hidden rounded-full"
              style={{ background: "rgb(28 34 48 / 12%)" }}
            >
              <span
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${Math.max(3, progress * 100)}%`, background: "#6b7688" }}
              />
            </div>

            {/* Elapsed / total, under the track. The progressbar above
                already announces the same values to screen readers. */}
            <div
              aria-hidden="true"
              className="flex justify-between text-[0.8em] leading-none font-medium tabular-nums"
              style={{ color: "#4d5768" }}
            >
              <span>{formatTime(current)}</span>
              <span>{duration > 0 ? formatTime(duration) : "-:--"}</span>
            </div>
          </div>
        </div>
      </div>

      <Reel />
    </div>
  );
}
