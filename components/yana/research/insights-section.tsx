import { yanaInsights } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/** The reference's soft lavender numerals (#D2C4FC). */
const NUMERAL = "#d2c4fc";

/** "Key Insights from Secondary Research": five numbered horizontal cards. */
export function YanaInsightsSection() {
  const { heading, items } = yanaInsights;
  return (
    <section aria-label="Key insights from secondary research" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <ol className="mt-10 flex max-w-[1120px] flex-col gap-3 lg:mt-9">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-4 rounded-[24px] px-5 py-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:px-7 lg:rounded-[28px] lg:py-3.5"
              style={{ background: "var(--yana-card)", border: "1px solid color-mix(in srgb, var(--yana-ink) 11%, transparent)" }}
            >
              <span aria-hidden="true" className="text-[42px] leading-none font-normal tracking-tight sm:text-[56px] lg:text-[60px]" style={{ color: NUMERAL }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-[17px] font-semibold lg:text-lg" style={{ color: "var(--yana-muted)" }}>
                  <span className="sr-only">{String(i + 1).padStart(2, "0")} </span>
                  {item.title}
                </h3>
                <ul className="mt-1 list-disc pl-5 text-[15px] leading-relaxed sm:text-base lg:text-[16.5px]" style={{ color: "var(--yana-muted)" }}>
                  {item.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </YanaFrame>
    </section>
  );
}
