import { sideVocabulary } from "@/lib/site-content";

/**
 * "DESIGN / DETAILS / VIBE CODING" beside the headline — one
 * continuous piece of text, not three independently-positioned words.
 * The previous version gave each word its own `writing-mode`, which
 * read as three separate vertical objects loosely stacked rather than
 * one label; a single element can't drift out of alignment with
 * itself the way three siblings can.
 *
 * On desktop, that one string is set in `writing-mode: vertical-rl`
 * (rotating the whole block into a column) and then the entire block
 * is rotated 180° again, as one object, to read bottom-to-top —
 * matching the reference's orientation without rotating each
 * character or word individually. Below `md` it reflows to a plain
 * horizontal line rather than disappearing.
 */
export function SideVocabulary() {
  return (
    <p
      className="text-[0.65rem] font-medium tracking-[0.3em] whitespace-nowrap uppercase md:h-full md:[writing-mode:vertical-rl] md:[transform:rotate(180deg)]"
      style={{ color: "var(--hero-text-quiet)" }}
      aria-hidden="true"
    >
      {sideVocabulary}
    </p>
  );
}
