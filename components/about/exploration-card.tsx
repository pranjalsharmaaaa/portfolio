"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Three uniform, editorial cards — same height, width, radius, padding,
 * and (spec: must never read as three different shades) the same
 * `--card-blue` fill, which itself switches with the theme (a light,
 * airy blue in Light mode; a denser, richer one at night) rather than
 * staying fixed like the rest of this "paper" section. The entrance
 * choreography (cards emerging from behind one another) lives one
 * level up, in about-section.tsx, as a wrapping motion.div per card —
 * this component only owns the hover/focus response, so its own
 * transform stays free for that outer choreography to drive.
 *
 * Each card keeps a distinct hover *personality* (an idea carried over
 * from the earlier numbered-list treatment) even though the base shape
 * is now identical across all three: a hairline of character without
 * breaking the "same card, three times" requirement.
 */
export type CardVariant = "storytelling" | "motion" | "ai";

const VARIANT_CLASS: Record<CardVariant, string> = {
  storytelling: "card-storytelling",
  motion: "card-motion",
  ai: "card-ai",
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
      className={`exploration-card flex h-48 w-full cursor-default flex-col items-center justify-center rounded-[1.75rem] px-6 py-7 text-center shadow-[0_18px_36px_-18px_rgb(20_30_50/45%)] sm:h-56 ${VARIANT_CLASS[variant]}`}
      style={{ background: "var(--card-blue)" }}
      whileHover={
        prefersReducedMotion ? undefined : { y: -8, scale: 1.04, filter: "brightness(1.06)" }
      }
      whileFocus={
        prefersReducedMotion ? undefined : { y: -8, scale: 1.04, filter: "brightness(1.06)" }
      }
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <span className="flex flex-col items-center gap-2">
        <span
          className="exploration-card-label font-display text-2xl leading-[1.15] font-medium sm:text-[1.7rem]"
          style={{ color: "var(--card-ink)" }}
          aria-hidden="true"
        >
          {label}
        </span>
        {variant === "ai" && (
          <span className="card-spark text-2xl" style={{ color: "var(--card-ink)" }} aria-hidden="true">
            ✦
          </span>
        )}
      </span>
    </motion.span>
  );
}
