"use client";

import { Children, useLayoutEffect, useRef, type ReactNode } from "react";

/**
 * The desktop page margin, left and right, in real screen px — the same
 * 60px frame as Stack Up. It sits outside the scaled canvas, so it stays
 * exactly 60px whatever scale a screen ends up at.
 */
const GUTTER = 60;

/**
 * Narrowest width (design px) a screen's content is laid out at once
 * the stack is active (≥1024px viewports): 1280 minus the two gutters.
 * A narrower viewport scales the whole composition down rather than
 * reflowing it, so each PDF page keeps its desktop arrangement on small
 * laptops / landscape tablets. Portrait tablets and phones get the
 * normal-flow layout.
 */
const DESIGN_MIN_WIDTH = 1280 - 2 * GUTTER;

/** Widest a screen's content is ever laid out at, however tall it is. */
const DESIGN_MAX_WIDTH = 2400;

/**
 * Every screen's top padding at desktop (SCREEN_Y's 72px). It is kept
 * at a full 72 real px however far a screen is scaled, so content
 * pinned to the top of a tall screen always clears the fixed "Back
 * home" pill (which ends ~56px down) instead of sliding under it.
 */
const TOP_PAD = 72;

/**
 * The Sales Coach page-stack — same model as Stack Up's (sibling
 * `position: sticky; top: 0; height: 100svh` screens in one ordinary
 * document scroll; each next screen rises over the pinned previous one
 * by plain sticky geometry), re-implemented here so Stack Up's own
 * component stays untouched.
 *
 * One difference: Sales Coach's PDF pages vary a lot in height (p3 is
 * almost square, p15 is a wide landscape), so every screen measures its
 * OWN content and picks the largest uniform scale (≤ 1) at which it
 * fits the viewport height. The canvas is then laid out at
 * (available width / scale), so once scaled it spans exactly the width
 * between the two 60px gutters: a screen that has to shrink to fit its
 * height gets a wider composition, not wider side margins. Because the
 * content reflows at that width (and its height changes with it), the
 * scale is found by a short binary search over real layouts. Measured
 * with ResizeObserver only — nothing runs on scroll, nothing intercepts
 * the wheel; the search settles on the same width every time, so the
 * observer doesn't loop.
 *
 * Screens clip with `overflow: clip` (not hidden/auto), which never
 * creates a scroll container: the browser scrollbar is the only one.
 *
 * Below 1024px (phones, portrait tablets) none of this applies: screens
 * are plain blocks and the page is a normal top-to-bottom document,
 * laid out by the sections' own 640px container breakpoint (40px
 * gutters on tablet, 20px on phones).
 */
export function ScreenStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child, i) => (
        <Screen index={i}>{child}</Screen>
      ))}
    </div>
  );
}

function Screen({ children, index }: { children: ReactNode; index: number }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const screen = screenRef.current;
    const canvas = canvasRef.current;
    const content = contentRef.current;
    if (!screen || !canvas || !content) return;
    const mq = window.matchMedia("(min-width: 1024px)");

    const apply = () => {
      if (!mq.matches) {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
        canvas.style.removeProperty("transform");
        return;
      }
      const vh = screen.clientHeight;
      const avail = screen.clientWidth - 2 * GUTTER;
      // Real px added above a screen scaled to `s`, restoring TOP_PAD.
      const lift = (s: number) => TOP_PAD * (1 - s);
      // Lay the content out at the width it gets at scale `s`; true if it fits.
      const fits = (s: number) => {
        canvas.style.width = `${avail / s}px`;
        return content.offsetHeight * s + lift(s) <= vh + 0.5;
      };

      let scale = Math.min(1, avail / DESIGN_MIN_WIDTH);
      if (!fits(scale)) {
        let lo = avail / DESIGN_MAX_WIDTH;
        let hi = scale;
        if (fits(lo)) {
          for (let i = 0; i < 10; i++) {
            const mid = (lo + hi) / 2;
            if (fits(mid)) lo = mid;
            else hi = mid;
          }
          scale = lo;
          fits(scale);
        } else {
          // Still too tall at the widest layout: shrink further and centre it.
          const h = Math.max(content.offsetHeight, 1);
          scale = (vh - TOP_PAD) / (h - TOP_PAD);
          const width = avail / lo;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${(vh - lift(scale)) / scale}px`;
          canvas.style.transform = `translate(${GUTTER + (avail - width * scale) / 2}px, ${lift(scale)}px) scale(${scale})`;
          return;
        }
      }
      canvas.style.height = `${(vh - lift(scale)) / scale}px`;
      canvas.style.transform = `translate(${GUTTER}px, ${lift(scale)}px) scale(${scale})`;
    };

    const ro = new ResizeObserver(apply);
    ro.observe(screen);
    ro.observe(content);
    mq.addEventListener("change", apply);
    apply();
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div
      ref={screenRef}
      data-sc-screen={index}
      className="relative bg-[var(--sc-bg)] lg:sticky lg:top-0 lg:h-svh lg:overflow-clip"
    >
      <div
        ref={canvasRef}
        className="@container lg:absolute lg:top-0 lg:left-0 lg:flex lg:origin-top-left lg:flex-col lg:justify-center"
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </div>
  );
}
