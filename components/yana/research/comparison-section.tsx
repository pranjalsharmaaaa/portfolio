import { yanaComparison, type YanaFeatureSupport } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YANA_CHALLENGE_RED } from "@/components/yana/research/group-therapy-section";

/** The source's lighter violet for the "Features/ Platforms" corner cell, derived from Yana purple. */
const CORNER = "color-mix(in srgb, var(--yana-purple) 62%, white)";
const ROW_LINE = "1px solid color-mix(in srgb, var(--yana-purple) 22%, transparent)";
const COL_LINE = "1px solid color-mix(in srgb, var(--yana-ink) 10%, transparent)";

function Mark({ value }: { value: YanaFeatureSupport }) {
  if (value === false) {
    return (
      <svg role="img" aria-label="No" viewBox="0 0 24 24" className="mx-auto size-6 lg:size-7" fill="none" stroke={YANA_CHALLENGE_RED} strokeWidth={2.4} strokeLinecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg role="img" aria-label="Yes" viewBox="0 0 24 24" className="size-6 lg:size-7" fill="none" stroke="var(--yana-purple)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
      </svg>
      {value === "limited" ? (
        <span className="text-[13px] font-medium" style={{ color: "var(--yana-ink)" }}>
          (Limited)
        </span>
      ) : null}
    </span>
  );
}

/**
 * The competitive feature comparison, kept a real table at every size.
 * On desktop it fills the content frame at a comfortable reading size;
 * on phones it keeps its columns at a readable width and scrolls
 * sideways inside its own rounded box (with the feature column pinned),
 * rather than being squeezed — the one horizontal scroll region on the
 * page, and only in the phone layout.
 */
export function YanaComparisonSection() {
  const { cornerLabel, platforms, rows } = yanaComparison;
  return (
    <section aria-label="Competitive feature comparison" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <div
          className="overflow-x-auto rounded-2xl lg:overflow-clip"
          style={{ background: "var(--yana-card)", border: COL_LINE }}
        >
          <table className="w-full min-w-[760px] border-collapse text-center md:min-w-0">
            <caption className="sr-only">Feature comparison of mental health platforms: {platforms.join(", ")}</caption>
            <thead>
              <tr className="text-[14px] font-semibold text-white lg:text-[17px]">
                <th
                  scope="col"
                  className="sticky left-0 z-10 w-[22%] px-4 py-4 lg:static lg:py-[18px]"
                  style={{ background: CORNER }}
                >
                  {cornerLabel}
                </th>
                {platforms.map((p) => (
                  <th key={p} scope="col" className="px-3 py-4 lg:py-[18px]" style={{ background: "var(--yana-purple)", borderLeft: "1px solid color-mix(in srgb, white 25%, transparent)" }}>
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} style={{ borderTop: ROW_LINE }}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 px-4 py-3 text-[14px] leading-snug font-normal lg:static lg:py-[11px] lg:text-[16px]"
                    style={{ background: "var(--yana-card)", color: "var(--yana-muted)", borderRight: COL_LINE }}
                  >
                    {row.feature}
                  </th>
                  {row.support.map((value, i) => (
                    <td key={platforms[i]} className="px-3 py-3 lg:py-[11px]" style={{ borderLeft: i === 0 ? undefined : COL_LINE }}>
                      <Mark value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </YanaFrame>
    </section>
  );
}
