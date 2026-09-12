"use client";

/**
 * One line of an editorial numbered list, not a SaaS feature tag — no
 * pill, border, background, or shadow anywhere here. Each line's hover
 * response is still written to match what its own label is about; the
 * difference from a chip/button is that the response lives entirely in
 * the number/label typography, never in a box drawn around it.
 */
export type ChipVariant = "storytelling" | "motion" | "empathy";

const VARIANT_CLASS: Record<ChipVariant, string> = {
  storytelling: "chip-storytelling",
  motion: "chip-motion",
  empathy: "chip-empathy",
};

export function ExplorationChip({
  label,
  hint,
  variant,
  index,
}: {
  label: string;
  hint: string;
  variant: ChipVariant;
  index: number;
}) {
  return (
    <span tabIndex={0} className={`chip cursor-default ${VARIANT_CLASS[variant]}`}>
      <span
        className="font-sans text-xs tabular-nums"
        style={{ color: "var(--paper-ink-muted)" }}
        aria-hidden="true"
      >
        {String(index).padStart(2, "0")}
      </span>
      <span className="chip-label font-display text-lg sm:text-xl">{label}</span>
      {variant === "empathy" && (
        <span className="chip-heart" aria-hidden="true">
          ♥
        </span>
      )}
      <span className="sr-only"> — {hint}</span>
    </span>
  );
}
