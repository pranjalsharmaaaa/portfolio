import Image from "next/image";
import { yanaPersonaData } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * "User Persona Data": the two Google Forms response charts. These are
 * the source's own screenshots (940px wide) — their answer labels are
 * already truncated by Google Forms, so they can't be faithfully
 * redrawn — shown untouched (`unoptimized`, no re-encode) and never
 * wider than their native width.
 */
export function YanaPersonaSection() {
  const { heading, intro, charts } = yanaPersonaData;
  return (
    <section aria-label="User persona data" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>
        <p className="mt-5 max-w-[760px] text-base leading-relaxed sm:text-lg lg:text-[19px]" style={{ color: "var(--yana-muted)" }}>
          {intro}
        </p>

        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-2 lg:gap-10">
          {charts.map((chart) => (
            <figure
              key={chart.src}
              className="overflow-hidden rounded-2xl p-3 sm:p-4"
              style={{ background: "#fff", border: "1px solid color-mix(in srgb, var(--yana-ink) 10%, transparent)" }}
            >
              <Image
                src={chart.src}
                alt={chart.alt}
                width={chart.width}
                height={chart.height}
                unoptimized
                className="h-auto w-full"
                style={{ maxWidth: chart.width }}
              />
            </figure>
          ))}
        </div>
      </YanaFrame>
    </section>
  );
}
