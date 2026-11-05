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
 * The narrated YANA film. It never plays on its own: it rests on a real
 * frame from the film with one Yana-purple play button. The first click
 * plays with sound and hands over to the browser's native controls
 * (scrubbing, volume, fullscreen; captions are burned in), which are
 * keyboard- and screen-reader-accessible everywhere. YANA's own copy of
 * the pattern (not shared with Sales Coach), so neither case study can
 * change the other.
 */
export function YanaFilmPlayer({ src, poster, width, height, duration, title }: Props) {
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
      className="relative w-full overflow-hidden rounded-[20px] ring-1 ring-black/5 shadow-[0_28px_60px_-30px_rgba(73,64,143,0.45)]"
      style={{ aspectRatio: `${width} / ${height}`, background: "var(--yana-bg)" }}
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
        Your browser can&apos;t play this video. <a href={src}>Download the YANA film (MP4)</a>.
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors hover:bg-black/[0.03] focus-visible:outline-none"
        >
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-white shadow-[0_10px_30px_rgba(106,74,216,0.45)] transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[rgba(106,74,216,0.35)] sm:h-20 sm:w-20"
            style={{ background: "var(--yana-purple)" }}
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
          <span
            className="hidden rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium shadow-sm ring-1 ring-black/5 backdrop-blur sm:inline-block"
            style={{ color: "var(--yana-ink)" }}
          >
            Watch the film · {duration}
          </span>
        </button>
      )}
    </div>
  );
}
