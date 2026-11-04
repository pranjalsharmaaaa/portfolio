"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: string;
  /** Accessible name for the video and its play button. */
  title: string;
};

/**
 * The narrated Stack Up film. Unlike the Sales Coach demos (muted loops
 * that play while on screen), this is a story with sound, so it never
 * plays on its own: it rests on a real frame from the film with one
 * Stack Up-green play button. The first click starts playback with
 * sound and hands over to the browser's native controls (scrubbing,
 * volume, fullscreen; captions are burned into the film itself),
 * which are keyboard- and screen-reader-accessible on every platform.
 */
export function FilmPlayer({ src, poster, width, height, duration, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {
      // If the browser refuses (rare after a click), the native controls
      // are now visible, so the visitor can press play there instead.
    });
    v.focus();
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-[0_28px_60px_-30px_rgb(0_40_15/45%)] @min-[1024px]:rounded-3xl"
      style={{ aspectRatio: `${width} / ${height}`, background: "#fcfaf5" }}
    >
      <video
        ref={videoRef}
        className="block h-full w-full object-contain"
        src={src}
        poster={poster}
        width={width}
        height={height}
        controls={started}
        playsInline
        preload="metadata"
        aria-label={title}
        onPlay={() => setStarted(true)}
      >
        Your browser can&apos;t play this video. <a href={src}>Download the Stack Up film (MP4)</a>.
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/0 transition-colors hover:bg-black/[0.03] focus-visible:outline-none"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_14px_34px_-8px_rgb(0_99_38/60%)] transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[rgb(0_99_38/35%)] @min-[640px]:h-20 @min-[640px]:w-20 @min-[1024px]:h-24 @min-[1024px]:w-24"
            style={{ background: "var(--stackup-green)" }}
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 @min-[1024px]:h-9 @min-[1024px]:w-9" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
          <span
            className="hidden rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold tracking-wide shadow-sm backdrop-blur @min-[640px]:inline-block"
            style={{ color: "var(--stackup-ink)" }}
          >
            Watch the film · {duration}
          </span>
        </button>
      )}
    </div>
  );
}
