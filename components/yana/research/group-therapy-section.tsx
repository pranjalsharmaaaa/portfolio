import { yanaGroupTherapy } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * The reference's challenge box outline (#C70000) — the one strong red
 * in the research chapter, reused for the "no" marks in the comparison
 * table so negatives read the same everywhere.
 */
export const YANA_CHALLENGE_RED = "#c70000";

/** "Group Therapy in India": three models, then the outlined list of challenges. */
export function YanaGroupTherapySection() {
  const { heading, models, challengesHeading, challenges } = yanaGroupTherapy;
  return (
    <section aria-label="Group therapy in India" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <ul className="mt-10 flex list-disc flex-col gap-4 pl-5 text-[17px] leading-snug sm:text-lg lg:mt-12 lg:text-[19px]">
          {models.map((m) => (
            <li key={m.term} style={{ color: "var(--yana-ink)" }}>
              {m.term} <span style={{ color: "var(--yana-muted)" }}>{m.detail}</span>
            </li>
          ))}
        </ul>

        <div
          className="mt-10 max-w-[780px] rounded-2xl px-6 py-6 sm:px-7 lg:mt-12"
          style={{ border: `1.5px solid ${YANA_CHALLENGE_RED}`, background: "color-mix(in srgb, var(--yana-card) 60%, transparent)" }}
        >
          <h3 className="text-lg font-semibold lg:text-[19px]" style={{ color: "var(--yana-muted)" }}>
            {challengesHeading}
          </h3>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-base leading-snug sm:text-[17px] lg:text-lg" style={{ color: "var(--yana-muted)" }}>
            {challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </YanaFrame>
    </section>
  );
}
