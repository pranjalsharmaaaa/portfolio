"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Three tilted, editorial cards (spec: interactive exploration cards,
 * not a row of pills/buttons) — replaces the earlier numbered-list
 * treatment. Each card keeps its own hover *personality* from that
 * earlier version (see .card-storytelling/.card-motion/.card-empathy
 * in globals.css); what's new here is the card shape itself: a solid
 * denim-blue tile, slightly rotated, that lifts/straightens/scales on
 * hover via framer-motion rather than a flat CSS color swap.
 */
export type CardVariant = "storytelling" | "motion" | "empathy";

const VARIANT_CLASS: Record<CardVariant, string> = {
  storytelling: "card-storytelling",
  motion: "card-motion",
  empathy: "card-empathy",
};

/** One shade per card (--card-blue-1/2/3) plus a resting tilt and a
 * small vertical stagger — a small editorial arrangement rather than
 * three identical tiles in a rigid row. Middle card sits marginally
 * higher, echoing the reference's loose fan composition without
 * copying it exactly. */
const VARIANT_STYLE: Record<
  CardVariant,
  { background: string; rotate: number; y: number }
> = {
  storytelling: { background: "var(--card-blue-1)", rotate: -5, y: 4 },
  motion: { background: "var(--card-blue-2)", rotate: 2.5, y: -8 },
  empathy: { background: "var(--card-blue-3)", rotate: -3, y: 6 },
};

export function ExplorationCard({
  label,
  hint,
  variant,
  index,
}: {
  label: string;
  hint: string;
  variant: CardVariant;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { background, rotate, y } = VARIANT_STYLE[variant];

  return (
    <motion.span
      tabIndex={0}
      role="group"
      aria-label={`${label} — ${hint}`}
      className={`exploration-card relative flex w-full max-w-[15.5rem] shrink-0 cursor-default flex-col justify-between gap-6 rounded-[1.75rem] px-6 py-7 shadow-[0_18px_36px_-18px_rgb(20_30_50/45%)] sm:max-w-[16.5rem] ${VARIANT_CLASS[variant]}`}
      style={{ background }}
      initial={false}
      animate={prefersReducedMotion ? { rotate: 0, y: 0 } : { rotate, y }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { rotate: rotate * 0.3, y: y - 10, scale: 1.045 }
      }
      whileFocus={
        prefersReducedMotion
          ? undefined
          : { rotate: rotate * 0.3, y: y - 10, scale: 1.045 }
      }
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <span
        className="font-sans text-xs tabular-nums"
        style={{ color: "rgb(255 255 255 / 60%)" }}
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>

      <span className="flex items-end justify-between gap-3">
        <span
          className="exploration-card-label font-display text-2xl leading-[1.15] font-medium sm:text-[1.7rem]"
          style={{ color: "var(--card-ink)" }}
          aria-hidden="true"
        >
          {label}
        </span>
        {variant === "empathy" && (
          <span className="card-heart shrink-0 text-2xl" style={{ color: "var(--card-ink)" }} aria-hidden="true">
            ♥
          </span>
        )}
      </span>
    </motion.span>
  );
}
