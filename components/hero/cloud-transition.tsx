"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * The scroll-driven passage from the hero's night/day sky into the
 * About section — the hero's own bottom shore pattern (sky-
 * background.tsx) is what the user sees at rest; this is what happens
 * to that same cream motif once they start scrolling past it.
 *
 * Mechanism: a tall "track" div sets how much scroll distance the
 * transition takes. A `position: sticky` frame pins to the viewport
 * for that distance, and *inside* that pinned frame, one more cream
 * swoosh band (same shapes, same --shore token, as one continuous
 * motif with the hero's) drifts upward and fades as scroll progresses
 * — reading as the cloud layer physically lifting away rather than the
 * page merely scrolling past a static image. Once the track's scroll
 * distance is spent, the sticky frame releases and About continues in
 * normal flow underneath, already partly visible through the fading
 * cloud.
 *
 * `useScroll`'s own `target` option (rather than a manual scroll
 * listener) keeps this off the main thread where possible and is what
 * already backs `useReducedMotion` elsewhere in this hero — the same
 * pattern, not a new one.
 *
 * The opacity curve never fades to 0: it used to, which meant the
 * track's own background showed through right as the swoosh finished
 * lifting away — invisible in light mode (where that background
 * happened to be pale) but a hard navy seam in dark mode, since the
 * track sat on --sky-bottom. The track's background is now the same
 * fixed --shore-solid cream as the swoosh itself and the About surface
 * beneath it, so the whole passage — swoosh, track, About — is one
 * continuous paper-colored surface with no seam to reveal in the
 * first place, regardless of theme.
 */
export function CloudTransition() {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -140]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.04]);

  return (
    <div
      ref={trackRef}
      aria-hidden="true"
      className="relative h-[45vh] sm:h-[55vh]"
      style={{ background: "var(--shore-solid)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.svg
          style={{ y, opacity, scale }}
          viewBox="0 0 1600 500"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-x-0 top-0 h-full w-full"
        >
          <defs>
            <symbol id="transition-swoosh" viewBox="0 0 200 60">
              <path d="M4,40 C18,12 52,4 88,13 C111,19 118,36 145,35 C166,34 177,17 196,21 C184,42 159,53 130,51 C103,49 82,35 55,40 C33,44 13,52 4,40 Z" />
            </symbol>
          </defs>
          {/* A dense field of the hero's own swoosh motif, tall enough
              to fully cover the frame at rest — the same shape
              language as sky-background.tsx's bottom edge, scaled up
              to read as a foreground landscape rather than a thin
              trim. Solid --shore-solid, not the hero's semi-transparent
              --shore: the base rect and the swooshes on top of it
              overlap by design here, and stacking two alpha fills of
              the same color visibly double-darkens the overlap. */}
          <rect x="0" y="120" width="1600" height="380" fill="var(--shore-solid)" />
          {[
            { x: -80, y: 60, s: 2.6, r: -4 },
            { x: 300, y: 20, s: 2.2, r: 5 },
            { x: 650, y: 55, s: 2.8, r: -3 },
            { x: 1020, y: 15, s: 2.3, r: 6 },
            { x: 1350, y: 50, s: 2.5, r: -5 },
          ].map((s, i) => (
            <use
              key={i}
              href="#transition-swoosh"
              x={s.x}
              y={s.y}
              width={200 * s.s}
              height={60 * s.s}
              transform={`rotate(${s.r} ${s.x + 100 * s.s} ${s.y + 30 * s.s})`}
              fill="var(--shore-solid)"
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
