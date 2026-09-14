"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The passage from the hero's sky into the About section.
 *
 * A previous version relied on `position: sticky` pinning a
 * full-viewport (`h-screen`) frame inside a much shorter (45-55vh)
 * track. A sticky child taller than its own containing block has
 * nowhere sane to release, and — because every shape drawn inside that
 * frame was filled with the exact same solid `--shore-solid` as the
 * frame's own backdrop — the swoosh motif was invisible against
 * itself besides. The net effect at rest was exactly the bug this
 * component exists to prevent: a large stretch of flat, textureless
 * cream between the hero and About's first line.
 *
 * This version is a short, ordinary (non-sticky, non-scroll-jacked)
 * band: a vertical gradient continuing the hero's own `--sky-bottom`
 * tone into the About section's `--shore-solid` cream, with one more
 * cluster of the hero's swoosh shapes drawn in the hero's own
 * semi-transparent `--shore` tone so they read as a visible, soft
 * cloud-bank crest rather than disappearing into their background —
 * the sky flowing forward into the page rather than a hard horizontal
 * border. A gentle scroll-linked drift keeps a touch of life; it's
 * bounded to a few pixels so it never needs the earlier version's
 * large empty scroll track to play out.
 */
export function CloudTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [14, -14]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[15vh] w-full overflow-hidden sm:h-[19vh]"
      style={{
        background: "linear-gradient(180deg, var(--sky-bottom) 0%, var(--shore-solid) 78%)",
      }}
    >
      <motion.svg
        style={{ y }}
        viewBox="0 0 1600 220"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-0 h-full w-full"
      >
        <defs>
          <symbol id="transition-swoosh" viewBox="0 0 200 60">
            <path d="M4,40 C18,12 52,4 88,13 C111,19 118,36 145,35 C166,34 177,17 196,21 C184,42 159,53 130,51 C103,49 82,35 55,40 C33,44 13,52 4,40 Z" />
          </symbol>
        </defs>
        {[
          { x: -80, y: 20, s: 2.6, r: -4 },
          { x: 300, y: -8, s: 2.1, r: 5 },
          { x: 650, y: 24, s: 2.8, r: -3 },
          { x: 1020, y: -6, s: 2.2, r: 6 },
          { x: 1350, y: 20, s: 2.5, r: -5 },
        ].map((s, i) => (
          <use
            key={i}
            href="#transition-swoosh"
            x={s.x}
            y={s.y}
            width={200 * s.s}
            height={60 * s.s}
            transform={`rotate(${s.r} ${s.x + 100 * s.s} ${s.y + 30 * s.s})`}
            fill="var(--shore)"
          />
        ))}
      </motion.svg>
    </div>
  );
}
