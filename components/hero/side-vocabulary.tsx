import { sideVocabulary } from "@/lib/site-content";

/**
 * "DESIGN / DETAILS / VIBE CODING" — a design annotation that sits
 * beside the headline, not underneath it.
 *
 * Runs vertically at ~90° (writing-mode) on desktop, alongside the
 * headline's own grid track so it can never overlap it; reflows into
 * a quiet horizontal row on narrow screens rather than disappearing.
 */
export function SideVocabulary() {
  return (
    <p
      className="flex flex-row items-center gap-3 text-[0.65rem] font-medium tracking-[0.3em] uppercase md:h-full md:flex-col md:gap-4 md:[writing-mode:vertical-rl]"
      style={{ color: "var(--hero-text-quiet)" }}
      aria-hidden="true"
    >
      {sideVocabulary.map((word, i) => (
        <span key={word} className="flex items-center gap-3 md:flex-col">
          {word}
          {i < sideVocabulary.length - 1 && (
            <span className="inline-block h-px w-3 bg-current opacity-50 md:h-3 md:w-px" />
          )}
        </span>
      ))}
    </p>
  );
}
