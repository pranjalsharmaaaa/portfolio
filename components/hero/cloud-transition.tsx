"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The passage from the hero's sky into the About section — a genuine
 * foreground cloud bank that overlaps BOTH worlds, not a divider
 * between them (spec: "REMOVE" the straight horizontal line/gradient
 * fade entirely).
 *
 * Two earlier versions of this component both amounted to a flat band
 * sitting *after* the hero in normal flow — first a broken sticky-pin
 * hack, then a plain vertical gradient. Both still read as a seam,
 * just a softer one. This version is structurally different: the
 * whole element is pulled UP with a negative top margin so its box
 * genuinely overlaps the hero's lower portion (Hero's own `isolate` +
 * `overflow-hidden` only clip Hero's *own* children — a later sibling
 * rendered at overlapping screen coordinates paints on top of it by
 * ordinary document order, no z-index needed), and its top edge is
 * never a straight line: a base fill (solid `--shore-solid`, so there
 * is zero gap-risk regardless of viewport size) plus a cluster of
 * large, irregular circular "puffs" positioned in %-of-container units
 * so they read as one continuous, organic cloud-bank silhouette
 * bulging into the sky above, at every breakpoint, without any
 * SVG-viewBox crop math to get subtly wrong on odd aspect ratios.
 *
 * The cream fill IS the About surface's own color, so wherever the
 * cloud sits, it already reads as About's surface — no separate
 * "cream rising from behind" layer is needed; the shape itself defines
 * where cream begins as the hero scrolls up and away above it.
 */
export function CloudTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [10, -10]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative z-10 -mt-[15vh] h-[20vh] w-full sm:-mt-[17vh] sm:h-[24vh]"
    >
      {/* Base fill — the gap-proof floor, and NOT part of the moving
          group below. Bleeds 6px past this container's own bottom edge
          on purpose: `-mt-[Nvh]` and `h-[Nvh]` on the container above
          are two independently-rounded viewport-unit values, and
          Chromium can round each to a different sub-pixel, leaving a
          hairline gap at their shared edge that reveals `body`'s own
          background (--sky-bottom) — a different tone from this fill's
          --shore-solid, glaring in dark mode where sky-bottom is navy.
          Anchoring this rect's own bottom a few px *past* the container
          (rather than flush with it) guarantees real, painted overlap
          with About regardless of any such rounding. It stays out of
          the `motion.div` below deliberately: a `transform` on a
          fractional-edged solid rect promotes it to its own GPU
          compositing layer, and *that* introduced the same hairline
          symptom right at this rect's own bottom edge — a static rect
          never hits that path in the first place. */}
      <div
        className="absolute inset-x-0"
        style={{ top: "30%", bottom: "-6px", background: "var(--shore-solid)" }}
      />

      {/* The moving group: only the puffs drift, in their own layer —
          isolating the transform to elements where a soft, irregular
          edge makes any sub-pixel blending invisible by construction. */}
      <motion.div style={{ y }} className="absolute inset-0">
        {/* The puff cluster — irregular sizes/positions/overlaps so the
            union reads as one uneven cloud-bank ridge, not a repeating
            pattern. Diameter is `min(Xvh, Yvw)`: sized off the
            viewport HEIGHT (so it's proportionate to this short band
            regardless of screen width) but capped by a per-puff
            viewport-WIDTH ceiling tuned so `left% + widthCap%` never
            exceeds 100 — the guard that actually matters, since a
            purely vh-sized puff would happily balloon past the right
            edge on a narrow, tall phone screen where vh is large
            relative to the available width. Bleed to the left of 0% is
            left uncapped: unlike the right edge, overflow to the start
            side of the viewport doesn't add scrollable width in
            browsers, so it can't create horizontal scroll. */}
        {[
          { left: "-4%", d: 19, capVw: 22, top: "30%" },
          { left: "14%", d: 22, capVw: 26, top: "12%" },
          { left: "38%", d: 20, capVw: 24, top: "30%" },
          { left: "58%", d: 23, capVw: 22, top: "6%" },
          { left: "76%", d: 19, capVw: 17, top: "26%" },
          { left: "92%", d: 14, capVw: 7, top: "34%" },
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
