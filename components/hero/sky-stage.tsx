"use client";

import { useEffect, useRef } from "react";
import { SkyBackground } from "@/components/hero/sky-background";

/**
 * Wraps the (otherwise static) sky illustration with a whisper of
 * cursor-driven parallax — a couple of layers drift a few pixels
 * toward the pointer, so the world reads as responsive rather than a
 * flat backdrop. Exposed as CSS custom properties (`--px`, `--py`,
 * normalized to roughly -1..1) that `sky-background.tsx` reads on the
 * specific layers worth moving; most of the illustration ignores them
 * entirely.
 *
 * Skipped outright for touch/coarse pointers (no persistent cursor to
 * track) and for `prefers-reduced-motion`, rather than attaching a
 * listener that would just never fire.
 */
export function SkyStage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const px = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const py = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        el.style.setProperty("--px", px.toFixed(3));
        el.style.setProperty("--py", py.toFixed(3));
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10">
      <SkyBackground />
    </div>
  );
}
