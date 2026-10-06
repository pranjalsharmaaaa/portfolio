import Image from "next/image";
import { yanaData } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";
import { StigmaChart } from "@/components/yana/research/charts";

/** The reference's attribute pills: its own pink → violet gradient. */
const PILL_GRADIENT = "linear-gradient(90deg, var(--yana-pink) 0%, #765bf0 100%)";

/** The source's soft pink glow around both chart cards. */
const CARD_SHADOW = "0 10px 30px -12px color-mix(in srgb, var(--yana-pink) 45%, transparent)";

/**
 * "Mental Health Data": the two evidence cards side by side with the
 * economic/social impact beside them, then the target audience and its
 * four attributes as the screen's closing statement.
 *
 * The COVID-19 infographic is the source's own raster (The Lancet / IHME,
 * 1000×836) shown as the PDF shows it — down to its citation, with the
 * publisher logo strip cropped off — at no more than its native size.
 */
export function YanaDataSection() {
  const { heading, stigmaChart, covidImage, impactHeading, impact, audienceLabel, audienceRange, attributes } = yanaData;
  return (
    <section aria-label="Mental health data" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[minmax(0,24fr)_minmax(0,40fr)_minmax(0,36fr)] lg:gap-10">
          <figure className="flex flex-col rounded-2xl px-5 pt-5 pb-3" style={{ background: "var(--yana-card)", boxShadow: CARD_SHADOW }}>
            <figcaption className="text-center text-[15px] font-semibold" style={{ color: "var(--yana-ink)" }}>
              {stigmaChart.title}
            </figcaption>
            <div className="mt-2 flex flex-1 items-center">
              <StigmaChart title={stigmaChart.title} bars={stigmaChart.bars} />
            </div>
          </figure>

          <figure className="overflow-hidden rounded-2xl" style={{ background: "var(--yana-card)", boxShadow: CARD_SHADOW }}>
            <div className="relative aspect-[1000/762] w-full max-w-[1000px]">
              <Image
                src={covidImage.src}
                alt={covidImage.alt}
                fill
                unoptimized
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
          </figure>

          <div className="sm:col-span-2 lg:col-span-1 lg:self-center">
            <h3 className="text-xl font-semibold lg:text-[22px]" style={{ color: "var(--yana-muted)" }}>
              {impactHeading}
            </h3>
            <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-base leading-relaxed sm:text-[17px]" style={{ color: "var(--yana-muted)" }}>
              {impact.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 flex flex-wrap items-center gap-x-[0.35em] text-[32px] leading-tight font-medium sm:text-[40px] lg:mt-14 lg:text-[46px]" style={{ color: "var(--yana-ink)" }}>
          {audienceLabel}
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[0.8em] shrink-0" fill="none" stroke="var(--yana-purple)" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h16M13 5l7 7-7 7" />
          </svg>
          <span className="whitespace-nowrap">{audienceRange}</span>
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-7 lg:flex lg:justify-between lg:gap-6">
          {attributes.map((attribute) => (
            <li
              key={attribute}
              className="rounded-2xl px-6 py-3.5 text-lg font-semibold text-white sm:text-xl lg:px-7 lg:py-4 lg:text-[22px]"
              style={{ background: PILL_GRADIENT }}
            >
              {attribute}
            </li>
          ))}
        </ul>
      </YanaFrame>
    </section>
  );
}
