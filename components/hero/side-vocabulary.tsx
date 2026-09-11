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
      // Same reasoning as the headline's text-shadow: this sits
      // directly on the illustrated sky, which is bright/white in
      // places (clouds, sun glow) — without it, this near-white,
      // partly-transparent text can all but vanish where it happens
      // to cross a light cloud shape.
      style={{ color: "var(--hero-text-quiet)", textShadow: "0 2px 10px rgb(0 0 0 / 22%)" }}
      aria-hidden="true"
    >
      {sideVocabulary}
    </p>
  );
}
