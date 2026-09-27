"use client";

/**
 * Three uniform, editorial cards — same height, width, radius, padding,
 * and (spec: must never read as three different shades) the same
 * `--card-blue` fill, which itself switches with the theme (a light,
 * airy blue in Light mode; a denser, richer one at night) rather than
 * staying fixed like the rest of this "paper" section. The entrance
 * choreography (cards clustering together, then spreading into their
 * final row) lives one level up, in about-section.tsx, as a wrapping
 * motion.div per card — that's the only Framer Motion involved
 * anywhere in this composition; this component itself is a plain
 * element with a plain CSS `:hover`/`:focus-visible` rule (see
 * `.exploration-card` in globals.css), not a second, competing
 * animation system.
 *
 * Text is centered both axes via flex, inside a fixed height, so a
 * one-line label ("Storytelling") and a two-line one ("Prototyping +
 * Motion") land at the same visual center regardless of how many lines
 * they wrap to — never top-anchored.
 *
 * Hover/focus is one identical, tiny scale on the card as a whole —
 * `transform: scale(...)` only, never width/height/opacity/font, so it
 * can't reflow the row's 28px gaps — with no per-variant differences:
 * all three cards (storytelling, motion, empathy) share the exact same
 * CSS rule, not just the same look at rest.
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
  return (
    <span
      tabIndex={0}
      role="group"
      aria-label={`${label} — ${hint}`}
      className={`exploration-card flex h-32 w-full cursor-default flex-col items-center justify-center rounded-[1.25rem] px-4 py-4 text-center shadow-[0_12px_24px_-14px_rgb(20_30_50/45%)] sm:h-36 ${VARIANT_CLASS[variant]}`}
      style={{ background: "var(--card-blue)" }}
    >
      <span
        className="exploration-card-label font-display text-base leading-[1.2] font-medium sm:text-lg"
        style={{ color: "var(--card-ink)" }}
        aria-hidden="true"
      >
        {label}
      </span>
    </span>
  );
}
