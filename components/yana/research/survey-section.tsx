import { yanaSurvey } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";
import { Bars, Donut, LegendDot } from "@/components/yana/research/charts";

/**
 * Category colors drawn from Yana's own palette rather than the
 * source's neon set — the values, order and labels are unchanged, and
 * every bar/slice is also named in its legend.
 */
const CONCERN_COLORS = ["var(--yana-purple)", "var(--yana-pink)", "var(--yana-indigo)"];
const ATTITUDE_COLORS = [
  "var(--yana-indigo)",
  "var(--yana-purple)",
  "var(--yana-periwinkle)",
  "var(--yana-pink)",
  "var(--yana-magenta)",
  "#ffb5fa",
];

/**
 * "Survey Insights": the survey and its questions on the left, the two
 * result charts on the right — so a page that runs to ~1,330px in the
 * reference fits one screen without shrinking its type.
 */
export function YanaSurveySection() {
  const s = yanaSurvey;
  const concerns = s.concerns.map((c, i) => ({ label: c.label, value: c.value, color: CONCERN_COLORS[i], percent: c.percent }));
  const attitudes = s.attitudes.map((a, i) => ({ ...a, color: ATTITUDE_COLORS[i] }));

  return (
    <section aria-label="Survey insights" className={YANA_SCREEN_Y}>
      <YanaFrame className="grid gap-12 lg:grid-cols-[minmax(0,11fr)_minmax(0,13fr)] lg:gap-16">
        <div>
          <YanaSectionHeading>{s.heading}</YanaSectionHeading>
          <p className="mt-4 text-[15px] sm:text-base" style={{ color: "var(--yana-muted)" }}>
            {s.subheading}
          </p>

          <h3 className="mt-8 text-lg font-medium lg:mt-10 lg:text-xl" style={{ color: "var(--yana-ink)" }}>
            {s.questionsLabel}
          </h3>
          <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-snug sm:text-base lg:text-[16.5px]" style={{ color: "var(--yana-muted)" }}>
            {s.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-12">
          <figure className="grid items-center gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="mx-auto w-full max-w-[250px]">
              <Donut
                title={`Main concerns: ${s.concerns.map((c) => `${c.label} ${c.percent}`).join(", ")}`}
                slices={concerns}
                labelFor={(slice) => String(slice.value)}
                size={190}
                thickness={44}
              />
            </div>
            <div>
              <ul className="flex flex-col gap-3 text-[15px] sm:text-base lg:text-[17px]" style={{ color: "var(--yana-ink)" }}>
                {concerns.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <LegendDot color={c.color} />
                    {c.label} ({c.percent})
                  </li>
                ))}
              </ul>
              <figcaption className="mt-4 text-[13px] leading-snug" style={{ color: "var(--yana-muted)" }}>
                {s.concernsNote}
              </figcaption>
            </div>
          </figure>

          <figure className="grid items-center gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="mx-auto w-full max-w-[330px]">
              <Bars
                title={`Attitudes to group therapy: ${s.attitudes.map((a) => `${a.label} ${a.value}`).join(", ")}`}
                bars={attitudes}
                max={60}
                step={10}
                barWidth={30}
                gap={14}
                height={210}
              />
            </div>
            <ul className="flex flex-col gap-2.5 text-[15px] leading-snug sm:text-base" style={{ color: "var(--yana-ink)" }}>
              {attitudes.map((a) => (
                <li key={a.label} className="flex items-start gap-3">
                  <LegendDot color={a.color} />
                  {a.label}
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </YanaFrame>
    </section>
  );
}
