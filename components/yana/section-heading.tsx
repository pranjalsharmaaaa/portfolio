/**
 * YANA's section-heading marker, rebuilt from the reference's own
 * vectors rather than its 35×178px raster: an 11 × 82px lavender bar
 * (square on the left, fully rounded on the right), a soft glow around
 * it, and a hairline running from the bar's foot that fades out to the
 * right — the source fades it to a near-background indigo, expressed
 * here as a fade to transparent so it reads the same on any of the
 * dark backgrounds it sits on.
 */
export function YanaSectionHeading({ children }: { children: string }) {
  return (
    <div className="relative flex items-center gap-2 sm:gap-2.5">
      <span
        aria-hidden="true"
        className="block h-16 w-[9px] shrink-0 rounded-r-full sm:h-[82px] sm:w-[11px]"
        style={{
          background: "var(--yana-purple-light)",
          boxShadow: "0 0 12px color-mix(in srgb, var(--yana-purple-light) 28%, transparent)",
        }}
      />
      <h2
        className="pt-1 text-[26px] leading-tight font-semibold tracking-[-0.01em] sm:text-[32px] lg:text-[35px]"
        style={{ color: "var(--yana-purple-light)" }}
      >
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-[126px]"
        style={{ background: "linear-gradient(90deg, var(--yana-purple-light), transparent)" }}
      />
    </div>
  );
}
