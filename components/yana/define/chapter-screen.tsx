import { YanaFrame } from "@/components/yana/frame";

/** Yana purple deepening into indigo — the chapter dividers' full-bleed field. */
export const YANA_CHAPTER_FIELD = "linear-gradient(135deg, var(--yana-purple) 0%, var(--yana-indigo) 100%)";

/**
 * A full-screen chapter divider ("02 DEFINE", "03 Ideation"): the same
 * number-tile + title pairing as the "01 DISCOVER" band, scaled up into
 * a whole screen of Yana purple with the type set large and left, and
 * the rest left as open space — a deliberate pause between phases.
 *
 * In the page-stack the screen itself paints the field (YanaStack keys
 * it off `data-yana-chapter`, with the same gradient as
 * YANA_CHAPTER_FIELD) so it fills the viewport; in the phone flow the
 * section paints its own field.
 */
export function YanaChapterScreen({ number, title }: { number: string; title: string }) {
  return (
    <section
      aria-label={`Chapter ${number}: ${title}`}
      data-yana-chapter=""
      // In the page-stack the section steps back (no box, no clip): the
      // screen itself carries the field, and the glow below is placed
      // against the whole viewport instead of being cut at this box.
      className="relative overflow-hidden py-24 [background:var(--yana-chapter-field)] sm:py-32 lg:py-[60px] [@media(min-width:1024px)_and_(min-height:600px)]:static [@media(min-width:1024px)_and_(min-height:600px)]:overflow-visible [@media(min-width:1024px)_and_(min-height:600px)]:[background:none]"
      style={{ "--yana-chapter-field": YANA_CHAPTER_FIELD } as React.CSSProperties}
    >
      {/* A soft lift of pink light in the far corner — Yana's glow
          language, kept faint so the screen still reads as open space. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-1/3 -right-1/4 size-[70vmax] rounded-full opacity-40"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--yana-pink) 55%, transparent), transparent)" }}
      />
      <YanaFrame className="relative flex items-center gap-5 sm:gap-8 lg:gap-10">
        <span
          className="flex size-16 shrink-0 items-center justify-center rounded-[18px] text-[34px] font-semibold tracking-[-0.02em] sm:size-24 sm:rounded-[24px] sm:text-[52px] lg:size-[124px] lg:rounded-[30px] lg:text-[66px]"
          style={{ background: "var(--yana-pink-light)", color: "var(--yana-purple)" }}
        >
          {number}
        </span>
        <h2 className="text-[56px] leading-none font-semibold tracking-[-0.01em] text-white sm:text-[96px] lg:text-[136px]">{title}</h2>
      </YanaFrame>
    </section>
  );
}
