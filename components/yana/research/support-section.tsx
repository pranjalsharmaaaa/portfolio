import { yanaSupport } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";
import { Donut, LegendDot } from "@/components/yana/research/charts";

/**
 * Legend colors as the reference assigns them (purple, orchid,
 * lavender, near-black). Each label keeps its own color; the values are
 * the ones stated in the brief (Seek Professional Help 15%, Confided in
 * Friends 58%, Counsellors 25%, Miscellaneous 2%), drawn clockwise from
 * 12 o'clock in the same slice order as the source donut.
 */
const COLORS: Record<string, string> = {
  "Seek Professional Help": "var(--yana-purple)",
  "Confided in Friends": "#ca72d2",
  Counsellors: "var(--yana-purple-light)",
  Miscellaneous: "#1e1e1e",
};
const SLICE_ORDER = ["Seek Professional Help", "Confided in Friends", "Miscellaneous", "Counsellors"];

/** Label | divider | content row, as the source lays out "WHO said" and "Reason". */
function LabelledRow({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-0">
      <div className="text-lg font-semibold sm:pt-0.5" style={{ color: "var(--yana-muted)" }}>
        {label}
      </div>
      <div className="sm:border-l sm:pl-8" style={{ borderColor: "color-mix(in srgb, var(--yana-ink) 18%, transparent)" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * The news quotes in the reference are screenshots of article text;
 * they're set here as real text in the portfolio's serif, keeping the
 * look of a clipped article quote without a blurry image.
 */
function QuoteCard({ children, className = "" }: { children: string; className?: string }) {
  return (
    <blockquote
      className={`font-display rounded-xl px-5 py-4 text-[15px] leading-[1.6] lg:text-base ${className}`}
      style={{
        background: "var(--yana-card)",
        color: "color-mix(in srgb, var(--yana-ink) 82%, transparent)",
        boxShadow: "0 6px 20px -10px color-mix(in srgb, var(--yana-ink) 30%, transparent)",
      }}
    >
      {children}
    </blockquote>
  );
}

export function YanaSupportSection() {
  const s = yanaSupport;
  const slices = SLICE_ORDER.map((label) => {
    const item = s.chart.find((c) => c.label === label)!;
    return { label, value: item.value, color: COLORS[label] };
  });

  return (
    <section aria-label="Can mental health conditions be addressed without support" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{s.heading}</YanaSectionHeading>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <div className="flex flex-col gap-7">
            <LabelledRow
              label={
                <>
                  <span style={{ color: "var(--yana-ink)" }}>{s.whoLabel}</span> <span className="font-normal">{s.whoSuffix}</span>
                </>
              }
            >
              <p className="font-display text-lg leading-snug lg:text-xl" style={{ color: "var(--yana-muted)" }}>
                {s.whoQuote}
              </p>
            </LabelledRow>

            <LabelledRow label={s.reasonLabel}>
              <div className="text-[15px] leading-relaxed lg:text-base" style={{ color: "var(--yana-muted)" }}>
                <p>{s.reasonIntro}</p>
                <ul className="mt-2 list-disc pl-5">
                  {s.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <p className="mt-3 font-medium" style={{ color: "var(--yana-ink)" }}>
                  {s.reasonConclusion}
                </p>
              </div>
            </LabelledRow>

            <div>
              <p className="text-[28px] leading-none font-medium tracking-wide lg:text-[34px]" style={{ color: "var(--yana-ink)" }}>
                {s.factsLabel}
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <QuoteCard className="lg:ml-[12%]">{s.facts[0]}</QuoteCard>
                <QuoteCard className="lg:mr-[8%]">{s.facts[1]}</QuoteCard>
              </div>
            </div>
          </div>

          <figure
            className="flex flex-col rounded-3xl p-5 sm:p-7"
            style={{ border: "1px solid color-mix(in srgb, var(--yana-ink) 16%, transparent)" }}
          >
            <p className="rounded-xl px-4 py-3 text-[17px] leading-snug lg:text-lg" style={{ background: "var(--yana-card)", color: "var(--yana-ink)" }}>
              {s.survey}
            </p>

            <div className="mt-5 grid flex-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <div className="mx-auto w-full max-w-[260px]">
                <Donut
                  title={`Survey of 2,800 students: ${s.chart.map((c) => `${c.label} ${c.value}%`).join(", ")}`}
                  slices={slices}
                  labelFor={(slice) => `${slice.value.toFixed(1)}%`}
                  size={200}
                  thickness={40}
                />
              </div>
              <ul className="flex flex-col gap-3 text-[15px] lg:text-base" style={{ color: "var(--yana-ink)" }}>
                {s.chart.map((c) => (
                  <li key={c.label} className="flex items-start gap-3">
                    <LegendDot color={COLORS[c.label]} />
                    {c.label}
                  </li>
                ))}
              </ul>
            </div>

            <figcaption className="mt-4 text-center text-[13px] leading-snug" style={{ color: "var(--yana-muted)" }}>
              {s.chartNote}
            </figcaption>
          </figure>
        </div>
      </YanaFrame>
    </section>
  );
}
