import { yanaIdeationInsights } from "@/lib/yana-define-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/** The reference's pill gradient (pink → violet), as on the "Target Audience" pills. */
const PILL_GRADIENT = "linear-gradient(100deg, var(--yana-pink) 0%, #765bf0 100%)";

/**
 * "Insights →": the ten themes from ideation as two rows of gradient
 * pills, the second row set in from the first as in the reference. Each
 * pill gets a soft pink shadow and a thin top highlight so it reads as a
 * small physical tile (a sticky note from the session) rather than a
 * flat UI tag; rows wrap naturally on smaller screens.
 */
export function YanaIdeationInsightsSection() {
  const { heading, rows } = yanaIdeationInsights;
  return (
    <section aria-label="Ideation insights" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <div className="flex items-center gap-3 sm:gap-4">
          <YanaSectionHeading>{heading}</YanaSectionHeading>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-1 size-7 shrink-0 sm:size-8 lg:size-9" fill="none" stroke="var(--yana-purple)" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M13 5l7 7-7 7" />
          </svg>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:gap-5 lg:mt-16 lg:gap-7">
          {rows.map((row, r) => (
            <ul key={r} className={`flex flex-wrap gap-3 sm:gap-4 lg:gap-5 ${r === 1 ? "lg:pl-[6%]" : ""}`}>
              {row.map((theme) => (
                <li
                  key={theme}
                  className="rounded-[16px] px-5 py-3 text-[17px] font-semibold text-white sm:px-6 sm:py-3.5 sm:text-lg lg:rounded-[18px] lg:px-7 lg:py-4 lg:text-[20px]"
                  style={{
                    background: PILL_GRADIENT,
                    boxShadow:
                      "inset 0 1px 0 color-mix(in srgb, white 40%, transparent), 0 14px 28px -14px color-mix(in srgb, var(--yana-pink) 70%, transparent)",
                  }}
                >
                  {theme}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </YanaFrame>
    </section>
  );
}
