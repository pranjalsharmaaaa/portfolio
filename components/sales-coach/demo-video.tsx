"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  /** What the demo shows — used as the video's accessible name. */
  label: string;
};

type Status = "idle" | "playing" | "paused-by-user" | "blocked";

/**
 * A product demo that behaves like part of the story, not an embedded
 * player:
 *
 * - Plays (muted, looping, inline) only while it is actually on screen.
 *   "On screen" = at least 35% of the video intersects the viewport AND
 *   the next case-study screen hasn't scrolled up past 40% of the
 *   viewport (by then the reader has moved on to it). Both checks are
 *   IntersectionObservers — no scroll listeners, no scroll hijacking.
 * - Scrolling away pauses it; scrolling back resumes it. A tab in the
 *   background pauses it too.
 * - No control bar. One small pill toggles pause/play; a second turns
 *   sound on. Sound is OFF by default and only ever comes on from that
 *   explicit tap, so the page never makes unexpected noise.
 * - If the browser refuses autoplay, or the visitor prefers reduced
 *   motion, it rests on the first frame (poster) with a play button.
 */
export function DemoVideo({ src, poster, width, height, label }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [muted, setMuted] = useState(true);
  const inView = useRef(false);
  const covered = useRef(false);
  const userPaused = useRef(false);
  const reduced = useRef(false);

  const sync = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const onScreen = inView.current && !covered.current;
    // Leaving the screen always returns the demo to muted, whether it was
    // playing or already paused, so coming back can never start with sound.
    if (!onScreen && !v.muted) {
      v.muted = true;
      setMuted(true);
    }
    const shouldPlay = onScreen && !userPaused.current && !reduced.current && !document.hidden;
    if (shouldPlay) {
      if (!v.paused) return;
      const p = v.play();
      if (p) p.then(() => setStatus("playing")).catch(() => setStatus("blocked"));
    } else if (!v.paused) {
      v.pause();
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) setStatus("blocked");

    const selfIO = new IntersectionObserver(
      ([e]) => {
        inView.current = e.isIntersecting && e.intersectionRatio >= 0.35;
        sync();
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    selfIO.observe(v);

    // The screen after this one: once its top edge is above 40% of the
    // viewport, it has taken over from ours.
    const next = v.closest("[data-sc-screen]")?.nextElementSibling;
    let nextIO: IntersectionObserver | undefined;
    if (next) {
      nextIO = new IntersectionObserver(
        ([e]) => {
          covered.current = e.isIntersecting;
          sync();
        },
        { rootMargin: "0px 0px -60% 0px" },
      );
      nextIO.observe(next);
    }

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    const onPause = () => setStatus((s) => (s === "playing" ? (userPaused.current ? "paused-by-user" : "idle") : s));
    const onPlay = () => setStatus("playing");
    v.addEventListener("pause", onPause);
    v.addEventListener("play", onPlay);
    return () => {
      selfIO.disconnect();
      nextIO?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("play", onPlay);
    };
  }, [sync]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      reduced.current = false; // an explicit tap overrides reduced-motion
      v.play().then(() => setStatus("playing")).catch(() => setStatus("blocked"));
    } else {
      userPaused.current = true;
      v.pause();
      setStatus("paused-by-user");
    }
  };

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) togglePlay();
  };

  const playing = status === "playing";

  return (
    <figure className="m-0 flex w-full flex-col items-center">
      <PhoneShell aspect={`${width} / ${height}`}>
        <video
          ref={videoRef}
          className="block h-full w-full object-contain"
          src={src}
          poster={poster}
          width={width}
          height={height}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={label}
        />
        {status === "blocked" && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Play demo"
            className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors hover:bg-black/10"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sc-red)] text-white shadow-[0_10px_30px_rgba(198,10,24,0.45)]">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden>
                <path d="M7 4.5v15l12.5-7.5z" />
              </svg>
            </span>
          </button>
        )}
      </PhoneShell>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 whitespace-nowrap">
        <button
          type="button"
          onClick={togglePlay}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/80 px-3 text-[12px] font-medium text-[var(--sc-ink)] shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-colors hover:bg-white"
          aria-label={playing ? "Pause demo" : "Play demo"}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
            {playing ? <path d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z" /> : <path d="M7 4.5v15l12.5-7.5z" />}
          </svg>
          {playing ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          className="inline-flex h-8 items-center gap-1.5 rounded-full bg-white/80 px-3 text-[12px] font-medium text-[var(--sc-ink)] shadow-[0_1px_3px_rgba(0,0,0,0.12)] ring-1 ring-black/5 transition-colors hover:bg-white"
          aria-label={muted ? "Turn sound on" : "Mute"}
          aria-pressed={!muted}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
            {muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
          </svg>
          {muted ? "Sound on" : "Mute"}
        </button>
      </div>
    </figure>
  );
}

/**
 * A phone bezel drawn in CSS around live content, measured off the
 * PDF's own phone renders (public/images/sales-coach/phone-*.webp,
 * 800×1650) so a video phone and an image phone of the same width are
 * the same phone: same maroon titanium frame (with its edge highlight),
 * same black rim, same corner radii, same screen inset, same shadow.
 * All sizes are in `cqw` of the wrapper (1cqw = 8 render px), so the
 * proportions hold at any width. The screen's aspect ratio is the
 * video's own (≈0.46, the same as the renders' screens), so nothing is
 * stretched or cropped and the two kinds of phone come out the same
 * height.
 */
export function PhoneShell({ aspect, children }: { aspect: string; children: React.ReactNode }) {
  return (
    <div className="@container w-full drop-shadow-[0_24px_32px_rgba(60,10,20,0.18)]">
      {/* The renders keep a 5px (0.625%) transparent margin either side. */}
      <div className="px-[0.625cqw]">
        <div className="rounded-[17.9cqw] bg-[linear-gradient(90deg,#352020_0%,#986972_1.4%,#4f2e35_2.6%,#3a2226_12%,#3a2226_88%,#4f2e35_97.4%,#986972_98.6%,#352020_100%)] p-[2cqw] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]">
          <div className="rounded-[15.9cqw] bg-[#050505] p-[1.625cqw]">
            <div className="relative overflow-hidden rounded-[14.4cqw] bg-white" style={{ aspectRatio: aspect }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
