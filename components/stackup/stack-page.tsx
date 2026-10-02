"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll distance (in vh) allotted to one page's entrance — how far the
 * user scrolls while the incoming page slides from translateY(100%) to
 * translateY(0%) and covers the page beneath it. Deliberately short: a
 * few normal wheel/trackpad ticks should visibly move the incoming page,
 * not land entirely inside a "nothing happens yet" zone.
 */
const TRAVEL_VH = 45;

/**
 * Scroll distance (in vh) a page rests, fully settled, before the next
 * page begins its own entrance. Purely a pacing choice — give each page
 * a brief beat before the next one starts covering it, rather than
 * transitions running back to back with no pause. Kept short for the
 * same reason as TRAVEL_VH: a long rest reads as "scrolling stopped
 * doing anything."
 */
const REST_VH = 15;

/**
 * Wraps one Stack Up section so it participates in the full-screen
 * page-stack: every page renders `position: fixed; inset: 0` (always at
 * the viewport's full size, in the same screen position — not `sticky`:
 * a sticky element unavoidably disengages a bit before its own track
 * ends, which leaves no way for it to stay "stuck" long enough to cover
 * the *next* page's whole entrance using only its own track; `fixed`
 * sidesteps that by keying every page's position purely off scroll
 * position, computed independently per page, with no engage/disengage
 * edge cases to fight). Later pages (higher z-index) physically cover
 * earlier ones by sliding up from below as the user scrolls through a
 * plain spacer element — pure scroll-distance bookkeeping, no visible
 * content of its own — placed in normal document flow before the fixed
 * layer. Reversing the scroll reverses the same transform for free: it
 * is a pure function of the current scroll position, not a one-way
 * animation or state machine.
 *
 * Below the `sm` breakpoint none of this applies: every element falls
 * back to a plain, unstyled block so the existing mobile composition
 * (already measured to run well past one viewport on several pages) is
 * completely unaffected — scrolling stays the normal, single in-flow
 * document it already is today.
 *
 * `prefers-reduced-motion` keeps the same page-stack structure (pages
 * still cover each other, scroll-position driven) but swaps instantly
 * at each page's boundary instead of interpolating the slide — still
 * computed from scroll position, just without the motion.
 */
export function StackPage({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: ReactNode;
}) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirst = index === 0;
  const isLast = index === total - 1;

  useEffect(() => {
    // The first page never animates — it's visible from the start, and
    // never needs to be repositioned.
    if (isFirst) return;

    const spacer = spacerRef.current;
    const content = contentRef.current;
    if (!spacer || !content) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function update() {
      frame = 0;
      if (window.innerWidth < 640) {
        // Mobile falls back to plain flow — make sure no stale inline
        // transform lingers from a wider viewport before a resize.
        content!.style.transform = "";
        return;
      }
      const travelPx = (TRAVEL_VH / 100) * window.innerHeight;
      // The spacer's own position in the document is exactly this
      // page's assigned scroll range start (spacers sit end to end in
      // normal flow), so its live rect.top tells us how far into that
      // range the user has scrolled, with no cumulative offsets to
      // track or pass down separately.
      const rect = spacer!.getBoundingClientRect();
      const rawProgress = -rect.top / travelPx;
      const progress = reduceMotionQuery.matches ? (rawProgress > 0 ? 1 : 0) : Math.min(1, Math.max(0, rawProgress));
      content!.style.transform = `translateY(${(1 - progress) * 100}%)`;
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [isFirst]);

  // Page 0 needs no entrance distance of its own; every other page
  // reserves its own TRAVEL_VH. Every page but the last also reserves a
  // REST_VH beat before the next page's entrance begins. The spacer is
  // the only thing that occupies this space in document flow — the
  // fixed content layer renders independently of it.
  //
  // The last page reserves TRAVEL_VH + 100 instead of TRAVEL_VH + REST:
  // a page's fixed layer isn't itself part of document flow, so nothing
  // after the final spacer provides the scroll room a browser needs to
  // keep scrolling once the document's bottom reaches the viewport's
  // bottom — without this, the very last transition could never reach
  // translateY(0), capping out partway through.
  const spacerHeight = `${(isFirst ? 0 : TRAVEL_VH) + (isLast ? 100 : REST_VH)}svh`;

  return (
    <>
      <div ref={spacerRef} className="hidden sm:block" style={{ height: spacerHeight }} />
      <div
        ref={contentRef}
        // overflow-y is `auto`, not `hidden`: every page is trimmed to
        // fit 100svh, but a handful (the Benchmark Insight pages, whose
        // Frontpage/Money Bhai screenshots have a fixed height that
        // can't shrink without changing that composition) can still
        // exceed an unusually short real browser viewport. `auto` means
        // that content is reachable by scrolling *within* the page
        // instead of being silently, permanently clipped — the one
        // thing the brief explicitly rules out — while still clipping
        // the not-yet-arrived page horizontally and (via the transform)
        // vertically before its turn.
        className={`sm:fixed sm:inset-0 sm:overflow-x-hidden sm:overflow-y-auto ${isFirst ? "" : "sm:[transform:translateY(100%)] sm:motion-reduce:![transform:translateY(0)]"}`}
        style={{ zIndex: index + 1, background: "var(--stackup-bg)" }}
      >
        {children}
      </div>
    </>
  );
}
