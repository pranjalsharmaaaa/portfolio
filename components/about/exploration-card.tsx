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
 * Each card keeps a distinct hover *personality* even though the base
 * shape is identical across all three: a hairline of character without
 * breaking the "same card, three times" requirement.
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
      whileHover={
        prefersReducedMotion ? undefined : { y: -8, scale: 1.04, filter: "brightness(1.06)" }
      }
      whileFocus={
        prefersReducedMotion ? undefined : { y: -8, scale: 1.04, filter: "brightness(1.06)" }
      }
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
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
