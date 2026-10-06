import { YanaFrame } from "@/components/yana/frame";

/**
 * A chapter opener band ("01 DISCOVER"), on the same purple the wave
 * above lands on, so the wave flows straight into it with no seam. The
 * number sits in a light-pink tile (the reference's 12px corner radius)
 * — Yana's pink kept as one controlled accent rather than a whole page.
 * Set in semibold rather than a heavier weight — Yana's calmer type
 * hierarchy, and the weight Inter is actually loaded at here.
 */
export function YanaChapterDivider({ number, title }: { number: string; title: string }) {
  return (
    <div style={{ background: "var(--yana-purple)" }}>
      <YanaFrame className="flex items-center gap-5 py-10 sm:gap-7 sm:py-12 lg:gap-9 lg:py-[56px] [@media(min-width:1024px)_and_(max-height:860px)]:py-10">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-[11px] text-[22px] font-semibold tracking-[-0.02em] sm:size-[42px] sm:rounded-[12px] sm:text-[25px] lg:size-12 lg:rounded-[14px] lg:text-[29px]"
          style={{ background: "var(--yana-pink-light)", color: "var(--yana-purple)" }}
        >
          {number}
        </span>
        <h2 className="text-[40px] leading-none font-semibold tracking-[0.005em] text-white sm:text-[52px] lg:text-[59px]">
          {title}
        </h2>
      </YanaFrame>
    </div>
  );
}
