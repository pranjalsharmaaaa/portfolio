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
 * The narrated Sales Coach film. Unlike this page's DemoVideo (muted
 * loops that play while on screen), it never plays on its own: it rests
 * on a real frame from the film with one Airtel-red play button. The
 * first click plays with sound and hands over to the browser's native
 * controls (scrubbing, volume, fullscreen; captions are burned in), which
 * are keyboard- and screen-reader-accessible everywhere.
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
      className="relative w-full overflow-hidden rounded-[20px] bg-[var(--sc-bg)] ring-1 ring-black/5 shadow-[0_28px_60px_-30px_rgba(80,0,0,0.45)]"
      style={{ aspectRatio: `${width} / ${height}` }}
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
        Your browser can&apos;t play this video. <a href={src}>Download the Sales Coach film (MP4)</a>.
      </video>

      {!started && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 transition-colors hover:bg-black/[0.03] focus-visible:outline-none"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--sc-red)] text-white shadow-[0_10px_30px_rgba(198,10,24,0.45)] transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:ring-4 group-focus-visible:ring-[rgba(198,10,24,0.35)] @min-[640px]:h-20 @min-[640px]:w-20">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 @min-[640px]:h-8 @min-[640px]:w-8" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15l12.5-7.5z" />
            </svg>
          </span>
          <span className="hidden rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-[var(--sc-ink)] shadow-sm ring-1 ring-black/5 backdrop-blur @min-[640px]:inline-block">
            Watch the film · {duration}
          </span>
        </button>
      )}
    </div>
  );
}
