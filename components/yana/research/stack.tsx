"use client";

import { Children, useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * Narrowest width (design px) a screen is ever laid out at in the
 * stack — the reference PDF's own page width, so every research screen
 * keeps its full desktop composition and a narrower viewport scales the
 * whole composition down rather than reflowing it.
 */
const DESIGN_MIN_WIDTH = 1200;

/** Same gate as the classes below: desktop/landscape-tablet, not too short. */
const STACK_QUERY = "(min-width: 1024px) and (min-height: 600px)";

/**
 * YANA's research page-stack — the same scroll architecture as the
 * Stack Up case study (components/stackup/stack-page.tsx), rebuilt here
 * so it can carry Yana's own surface and fit rule without touching
 * Stack Up's component.
 *
 * Every screen is a `position: sticky; top: 0` sibling exactly one
 * viewport (100svh) tall, inside one ordinary block in normal document
 * flow. The browser's own scroll is the only scroll context — no fixed
 * layers, no spacers, no wheel or scroll listeners. Each screen sticks
 * once reached and the next sibling, arriving in normal flow beneath
 * it, rises from the bottom of the viewport and covers it; scrolling up
 * reverses the same geometry.
 *
 * Fitting is done by uniform scaling, never by trimming: each screen's
 * canvas is laid out at the viewport's size (but never narrower than
 * DESIGN_MIN_WIDTH), and if its composition is taller than the
 * viewport — a short laptop window, say — the whole canvas is scaled
 * down until it fits. The scale is measured per screen on resize (and
 * when its own content's size changes), never on scroll.
 *
 * Gated on a viewport at least 1024px wide and 600px tall. Below that —
 * phones, portrait tablets, very short windows — screens fall back to
 * plain blocks in one normal top-to-bottom document, each section using
 * its own responsive layout, so text is never scaled down to fit a
 * desktop composition on a small screen.
 */
export function YanaStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child) => (
        <YanaStackScreen>{child}</YanaStackScreen>
      ))}
    </div>
  );
}

function YanaStackScreen({ children }: { children: ReactNode }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!screen || !canvas || !content) return;

    const query = window.matchMedia(STACK_QUERY);

    const fit = () => {
      if (!query.matches) {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
        canvas.style.removeProperty("transform");
        return;
      }
      const width = screen.clientWidth;
      const height = screen.clientHeight;
      let scale = Math.min(1, width / DESIGN_MIN_WIDTH);
      canvas.style.width = `${width / scale}px`;
      canvas.style.height = `${height / scale}px`;
      // Too tall for the viewport at this width: shrink until it fits.
      // Laying the canvas out wider only ever makes it shorter, so one
      // correction always lands within the viewport.
      const needed = content.offsetHeight;
      if (needed > height / scale) {
        scale = height / needed;
        canvas.style.width = `${width / scale}px`;
        canvas.style.height = `${height / scale}px`;
      }
      canvas.style.transform = `scale(${scale})`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(screen);
    observer.observe(content);
    query.addEventListener("change", fit);
    return () => {
      observer.disconnect();
      query.removeEventListener("change", fit);
    };
  }, []);

  return (
    <div
      ref={screenRef}
      // Cream by default; a screen holding a full-bleed chapter divider
      // (marked `data-yana-chapter`) takes that divider's purple field
      // across the whole viewport instead.
      className="relative bg-[var(--yana-bg)] has-[[data-yana-chapter]]:[background:linear-gradient(135deg,var(--yana-purple)_0%,var(--yana-indigo)_100%)] [@media(min-width:1024px)_and_(min-height:600px)]:sticky [@media(min-width:1024px)_and_(min-height:600px)]:top-0 [@media(min-width:1024px)_and_(min-height:600px)]:h-svh [@media(min-width:1024px)_and_(min-height:600px)]:overflow-clip"
      style={{
        // A hairline and a soft lift along the top edge, so each screen
        // reads as a sheet sliding over the one beneath it rather than
        // the content simply swapping on an identical cream.
        boxShadow: "0 -1px 0 color-mix(in srgb, var(--yana-purple) 10%, transparent), 0 -10px 24px -18px color-mix(in srgb, var(--yana-indigo) 30%, transparent)",
      }}
    >
      <div
        ref={canvasRef}
        className="[@media(min-width:1024px)_and_(min-height:600px)]:absolute [@media(min-width:1024px)_and_(min-height:600px)]:top-0 [@media(min-width:1024px)_and_(min-height:600px)]:left-0 [@media(min-width:1024px)_and_(min-height:600px)]:flex [@media(min-width:1024px)_and_(min-height:600px)]:origin-top-left [@media(min-width:1024px)_and_(min-height:600px)]:flex-col [@media(min-width:1024px)_and_(min-height:600px)]:justify-center"
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
