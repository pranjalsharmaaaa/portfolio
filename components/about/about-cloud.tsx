"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * About's own foreground cloud — NOT a separate section between Hero
 * and About, and not a decoration that belongs to the hero. It is the
 * top edge of the About section itself: absolutely positioned children
 * of `<section id="about">`, anchored with `bottom-full` so their own
 * box sits entirely ABOVE that section, flush against the section's
 * top edge, with individual puffs then irregularly straddling that
 * seam (some stop right at it, some dip a little past it) rather than
 * every puff sharing one flat baseline.
 *
 * Because these wrappers are children of `<section id="about">`, they
 * inherit that section's stacking order automatically — no separate
 * z-index of their own is needed, and (learned the hard way on this
 * component previously) no separate "base fill" rect is needed either:
 * the section's own single `background: var(--shore-solid)` already
 * covers its entire box with one paint operation, so there is no
 * second, independently-rounded box whose edge could fail to line up
 * with it and leave a hairline gap. Puffs above the seam (y < 0
 * relative to the section) are the only thing responsible for
 * coverage there, which is exactly the point — that's where sky should
 * show through between them.
 *
 * Sized for real depth (spec: "enough vertical depth to actually
 * extend upward into the sky and downward into the About section" —
 * explicitly NOT a thin decorative scallop) while staying clear of the
 * hero's own content. Measured precisely rather than eyeballed: the
 * hero's own content columns (SideVocabulary's vertical strip, the
 * cassette, the cycling word) don't scale as a fixed % of width across
 * breakpoints — the cycling word's right edge alone ranges from ~73%
 * of viewport width at 1024px down to ~56% at 1536px, so a single
 * "safe %" tuned at one width is not safe at another. This renders as
 * two tiers: a continuous "attached" cluster that hugs the About seam
 * everywhere (shallow enough to clear all three columns at every
 * breakpoint the layout supports, phone included), plus — only once
 * the viewport is wide enough that the content columns' worst-case
 * measured footprint (checked above ~1280px) leaves real clearance — a
 * few taller "floating" accents reaching substantially higher into the
 * sky, matching a real cloud bank's look (a dense bank at the horizon,
 * a few scattered puffs higher up) rather than a single flat ridge.
 */
export function AboutCloud() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [16, -16]);

  return (
    <>
      {/* Attached cluster — continuous, always touches the seam below
          it (no gap, anywhere across the width), shallow enough to
          clear the cassette/cycling-word/side-vocabulary columns
          wherever it crosses them, at every breakpoint. This is the
          one wrapper the scroll-linked ref attaches to; the floating
          tier below reuses the same `y` value rather than tracking its
          own scroll target. */}
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full h-[16vh] sm:h-[20vh]"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          {[
            { left: "-6%", d: 12, capVw: 22, top: "34%" },
            { left: "14%", d: 13, capVw: 20, top: "46%" },
            { left: "32%", d: 16, capVw: 24, top: "36%" },
            { left: "52%", d: 14, capVw: 20, top: "48%" },
            { left: "68%", d: 17, capVw: 22, top: "20%" },
            { left: "84%", d: 13, capVw: 13, top: "44%" },
            { left: "92%", d: 10, capVw: 6, top: "40%" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: `min(${p.d}vh, ${p.capVw}vw)`,
                height: `min(${p.d}vh, ${p.capVw}vw)`,
                background: "var(--shore-solid)",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating accents — not required to touch anything below them
          (a gap of sky around a distant puff is correct, not a bug).
          Reach roughly twice as high as the attached cluster, but only
          past the far right edge of the cycling word and bleeding off
          the far left edge. `xl:` (1280px+) only: below that width the
          cycling word's measured right edge creeps up to ~62-73% of
          viewport width — this tier's own left positions were checked
          against that and only clear it with real margin from ~1280px
          up; on narrower desktop/tablet widths (and phones, which have
          no clear column left at all) the attached cluster alone still
          reads as a cloud. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-full hidden h-[46vh] xl:block"
      >
        <motion.div style={{ y }} className="absolute inset-0">
          {[
            { left: "-8%", d: 17, capVw: 11, top: "6%" },
            { left: "68%", d: 18, capVw: 20, top: "10%" },
            { left: "80%", d: 14, capVw: 16, top: "2%" },
            { left: "90%", d: 12, capVw: 8, top: "14%" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: p.left,
                top: p.top,
                width: `min(${p.d}vh, ${p.capVw}vw)`,
                height: `min(${p.d}vh, ${p.capVw}vw)`,
                background: "var(--shore-solid)",
              }}
            />
          ))}
        </motion.div>
      </div>
    </>
  );
}
