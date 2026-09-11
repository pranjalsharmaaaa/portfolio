import { sideVocabulary } from "@/lib/site-content";

/**
 * "DESIGN / DETAILS / VIBE CODING" — a quiet editorial caption under
 * the headline, always on one horizontal line at every width. It
 * supports the composition rather than competing with it, so it stays
 * small, tracked-out, and low-contrast relative to the headline.
 */
export function SideVocabulary() {
  return (
    <p
      className="flex flex-wrap items-center gap-x-3 text-[0.7rem] font-medium tracking-[0.3em] whitespace-nowrap text-ink-quiet uppercase"
      aria-hidden="true"
    >
      {sideVocabulary.map((word, i) => (
        <span key={word} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden="true">/</span>}
          {word}
        </span>
      ))}
    </p>
  );
}
