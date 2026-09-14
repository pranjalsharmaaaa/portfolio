"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * About's own foreground cloud — NOT a separate section between Hero
 * and About, and not a decoration that belongs to the hero. It is the
 * top edge of the About section itself: an absolutely positioned child
 * of `<section id="about">`, anchored with `bottom-full` so its own
 * box sits entirely ABOVE that section, flush against the section's
 * top edge, with individual puffs then irregularly straddling that
 * seam (some stop right at it, some dip a little past it) rather than
 * every puff sharing one flat baseline.
 *
 * Because this wrapper is a child of `<section id="about">`, it
 * inherits that section's stacking order automatically — no separate
 * z-index of its own is needed, and (learned the hard way on this
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
 * hero's own content row (cassette/headline): the depth here is the
 * deepest this cluster can go without covering that row, checked by
 * measuring actual element geometry rather than eyeballing a
 * screenshot at one viewport size.
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
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-[16vh] sm:h-[20vh]"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Two loose "rows" (back = smaller, reaches highest into the
            sky; front = larger, hugs the seam and dips into About) so
            the union reads as a layered mass rather than one row of
            same-size bumps repeating across the width. Sized against
            this wrapper's own (deliberately modest) height — an
            earlier pass sized these against a much taller wrapper and
            the puffs reached high enough to visibly cover the hero's
            cassette/headline row; verified by measuring actual puff
            vs. hero-content geometry, not by eyeballing a screenshot. */}
        {[
          { left: "-6%", d: 16, capVw: 22, top: "18%" },
          { left: "14%", d: 13, capVw: 20, top: "46%" },
          { left: "32%", d: 18, capVw: 24, top: "22%" },
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
  );
}
