"use client";

/**
 * Three tactile little objects, not SaaS feature tags — each one's
 * hover response is written to match what the label itself is about,
 * rather than sharing one generic pill treatment.
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
}: {
  label: string;
  hint: string;
  variant: ChipVariant;
}) {
  return (
    <span
      tabIndex={0}
      className={`chip cursor-default rounded-full border px-5 py-2.5 text-sm font-medium sm:text-base ${VARIANT_CLASS[variant]}`}
      style={{
        borderColor: "var(--nav-border)",
        color: "var(--ink)",
        background: "var(--nav-bg)",
      }}
    >
      <span className="chip-label inline-block">{label}</span>
      {variant === "empathy" && (
        <span className="chip-heart ml-1.5 inline-block" aria-hidden="true">
          ♥
        </span>
      )}
      <span className="sr-only"> — {hint}</span>
    </span>
  );
}
