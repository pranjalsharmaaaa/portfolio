"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Three uniform, editorial cards — same height, width, radius, padding,
 * and (spec: must never read as three different shades) the same
 * `--card-blue` fill, which itself switches with the theme (a light,
 * airy blue in Light mode; a denser, richer one at night) rather than
 * staying fixed like the rest of this "paper" section. The entrance
 * choreography (cards clustering together, then spreading into their
 * final row) lives one level up, in about-section.tsx, as a wrapping
 * motion.div per card — this component only owns the hover/focus
 * response, so its own transform stays free for that outer
 * choreography to drive.
 *
 * Text is centered both axes via flex, inside a fixed height, so a
 * one-line label ("Storytelling") and a two-line one ("Prototyping +
 * Motion") land at the same visual center regardless of how many lines
 * they wrap to — never top-anchored.
 *
 * Hover/focus is one identical, tiny scale on the card as a whole —
 * `transform: scale(...)` only, never width/height, so it can't
 * reflow the row's 28px gaps — with no per-variant differences: all
 * three cards (storytelling, motion, empathy) must behave exactly the
 * same on hover, not just look the same at rest.
 */
export type CardVariant = "storytelling" | "motion" | "empathy";

const VARIANT_CLASS: Record<CardVariant, string> = {
  storytelling: "card-storytelling",
  motion: "card-motion",
  empathy: "card-empathy",
};

export function ExplorationCard({
  label,
  hint,
  variant,
}: {
  label: string;
  hint: string;
  variant: CardVariant;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      tabIndex={0}
      role="group"
      aria-label={`${label} — ${hint}`}
      className={`exploration-card flex h-32 w-full cursor-default flex-col items-center justify-center rounded-[1.25rem] px-4 py-4 text-center shadow-[0_12px_24px_-14px_rgb(20_30_50/45%)] sm:h-36 ${VARIANT_CLASS[variant]}`}
      style={{ background: "var(--card-blue)" }}
      // A barely-there scale — ~1-2px of growth on a card this size —
      // nothing else: no lift, no opacity, no filter, no per-variant
      // difference. This lives on the card's own element, entirely
      // separate from (and composes safely with, never overwrites) the
      // scroll-driven x/y/rotate transform that about-section.tsx
      // applies to this card's *wrapping* motion.div for the cluster→
      // separate choreography — two different DOM nodes, so this
      // hover scale and that scroll transform stack independently
      // rather than one clobbering the other's `transform`. A tween
      // (not the spring used elsewhere in this file's history) is
      // what gives hover-in and the mouse-leave return the same fixed,
      // smooth duration in both directions.
      whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
      whileFocus={prefersReducedMotion ? undefined : { scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span
        className="exploration-card-label font-display text-base leading-[1.2] font-medium sm:text-lg"
        style={{ color: "var(--card-ink)" }}
        aria-hidden="true"
      >
        {label}
      </span>
    </motion.span>
  );
}
