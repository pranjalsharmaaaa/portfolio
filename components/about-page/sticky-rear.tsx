"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * The rear layer of the /about transition (intro, collage and rear
 * landscape together), pinned by `position: sticky` once its bottom
 * edge reaches the viewport's bottom — see `.rear` in
 * about-page.module.css.
 *
 * Sticky needs that pin point as a length, and it depends on this
 * block's own height (it's taller than the viewport and varies with
 * copy, width and fonts), which CSS can't read. So the one piece of JS
 * here publishes the height as `--rear-h` — a ResizeObserver, not a
 * scroll listener: it runs on layout changes only, and scrolling
 * itself stays entirely in the browser's hands. Without it (before
 * hydration, or with JS off) the CSS fallback simply never pins.
 */
export function StickyRear({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const publish = () => el.style.setProperty("--rear-h", `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
