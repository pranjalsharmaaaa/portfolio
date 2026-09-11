import { sideVocabulary } from "@/lib/site-content";

/**
 * "DESIGN / DETAILS / VIBE CODING" — an editorial label that balances
 * the headline rather than competing with it (spec §05).
 *
 * Runs vertically along the hero edge on wider screens; reflows into a
 * quiet horizontal row on narrow ones so it repositions instead of
 * disappearing (spec §11).
 */
export function SideVocabulary() {
  return (
    <div
      className="flex flex-row items-center gap-3 text-[0.65rem] font-medium tracking-[0.3em] text-ink-quiet uppercase md:h-full md:flex-col md:gap-4 md:[writing-mode:vertical-rl]"
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
    </div>
  );
}
