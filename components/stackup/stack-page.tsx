"use client";

import { Children, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Smallest width (design px) a screen's composition is ever laid out
 * at in the page-stack. At this width every section is in its full
 * desktop (Figma) arrangement — notably Benchmark Insight 03's
 * Frontpage pair stays side by side instead of wrapping — so a
 * narrower viewport scales the whole composition down rather than
 * reflowing it into a different one.
 */
const DESIGN_MIN_WIDTH = 1280;

/**
 * Smallest height (design px) a screen's canvas is ever given: the
 * 16:9 height of a 1440px frame, matching the Figma frames' own aspect.
 * The tallest section at any canvas width >= DESIGN_MIN_WIDTH is well
 * under this, so a viewport shorter than this scales every screen down
 * uniformly instead of letting any of them overflow.
 */
const DESIGN_MIN_HEIGHT = 810;

/**
 * The Stack Up page-stack: every screen is a `position: sticky; top: 0`
 * sibling exactly one viewport (100svh) tall, all inside one ordinary
 * block in normal document flow. The document itself is just N
 * viewports tall and the browser's own scroll is the only scroll
 * context — no fixed layers, no spacers, no scroll listeners. Each
 * screen sticks to the top once reached and stays stuck until the
 * stack's own bottom edge (the end of the page), so the next sibling,
 * arriving in normal flow directly beneath it, rises from the bottom
 * of the viewport and covers it; later siblings paint over earlier
 * ones by DOM order. Scrolling up simply reverses the same geometry.
 *
 * Fitting a screen into its viewport is done by scaling, never by
 * reflowing or trimming the composition: each screen's content is laid
 * out on a canvas at least DESIGN_MIN_WIDTH x DESIGN_MIN_HEIGHT design
 * px (and otherwise exactly the viewport's size), then that whole
 * canvas is scaled uniformly to fill the viewport. The scale factor is
 * the one value CSS can't derive on its own (it's a ratio of two
 * lengths), so it's measured here — on resize only, never on scroll.
 * Sections respond to the canvas's width through container queries
 * (`@min-[640px]:` / `@min-[1024px]:` rather than `sm:` / `lg:`), so
 * the layout they pick always matches the width they're actually laid
 * out at, regardless of how far the canvas is scaled.
 *
 * The screen clips with `overflow: clip`, which unlike `hidden`/`auto`
 * does not create a scroll container: it only keeps the (unscaled,
 * wider) canvas's layout box from widening the document, and the
 * decorative corner shapes inside their own bounds.
 *
 * Below `sm` none of this applies: screens and canvases fall back to
 * plain blocks, and the page scrolls as one normal top-to-bottom
 * document using the existing mobile composition.
 */
export function PageStack({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const screen = root?.firstElementChild;
    if (!root || !screen) return;

    const observer = new ResizeObserver(() => {
      const { clientWidth: width, clientHeight: height } = screen;
      const scale = Math.min(1, width / DESIGN_MIN_WIDTH, height / DESIGN_MIN_HEIGHT);
      root.style.setProperty("--stack-scale", String(scale));
      root.style.setProperty("--stack-canvas-w", `${width / scale}px`);
      root.style.setProperty("--stack-canvas-h", `${height / scale}px`);
    });
    observer.observe(screen);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      // Fallbacks before the first measurement: an unscaled canvas
      // filling its screen, identical to the measured result whenever
      // the viewport is already at least the design minimum.
      style={{ "--stack-scale": "1", "--stack-canvas-w": "100%", "--stack-canvas-h": "100%" } as CSSProperties}
    >
      {Children.map(children, (child) => (
        <div className="relative sm:sticky sm:top-0 sm:h-svh sm:overflow-clip" style={{ background: "var(--stackup-bg)" }}>
          <div className="@container sm:absolute sm:top-0 sm:left-0 sm:flex sm:h-[var(--stack-canvas-h)] sm:w-[var(--stack-canvas-w)] sm:origin-top-left sm:scale-[var(--stack-scale)] sm:flex-col sm:justify-center">
            {child}
          </div>
        </div>
      ))}
    </div>
  );
}
