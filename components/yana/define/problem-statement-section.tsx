import { Fragment } from "react";
import { yanaProblemStatement } from "@/lib/yana-define-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";

/** The reference sets "Problem Statement" in a violet → purple gradient; here pink → Yana purple. */
const TITLE_GRADIENT = "linear-gradient(90deg, var(--yana-pink) 0%, var(--yana-purple) 70%)";

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
);

/**
 * The problem statement as the Define chapter's centrepiece: a large
 * gradient title and the two statements at reading-display size, with
 * the source's bold phrases carried as darker, heavier emphasis. The
 * pathway the second statement names — self-help → community support →
 * professional care — is drawn beneath it as a small three-step path
 * (the statement's own words, so it adds emphasis, not content).
 */
export function YanaProblemStatementSection() {
  const { heading, statements, pathway } = yanaProblemStatement;
  return (
    <section aria-label="Problem statement" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <h2
          className="inline-block bg-clip-text pb-1 text-[38px] leading-tight font-semibold tracking-[-0.015em] text-transparent sm:text-[50px] lg:text-[60px]"
          style={{ backgroundImage: TITLE_GRADIENT }}
        >
          {heading}
        </h2>

        <div className="mt-8 flex max-w-[1080px] flex-col gap-7 text-[21px] leading-[1.55] sm:text-[25px] lg:mt-11 lg:gap-8 lg:text-[29px]" style={{ color: "var(--yana-muted)" }}>
          {statements.map((runs, i) => (
            <p key={i}>
              {i === 0 ? <Arrow className="mr-3 inline-block size-[0.85em] align-[-0.1em]" /> : null}
              {runs.map((run, j) =>
                run.strong ? (
                  <strong key={j} className="font-semibold" style={{ color: "var(--yana-ink)" }}>
                    {run.text}
                  </strong>
                ) : (
                  <Fragment key={j}>{run.text}</Fragment>
                ),
              )}
            </p>
          ))}
        </div>

        <ol aria-hidden="true" className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3 lg:mt-12">
          {pathway.map((step, i) => (
            <Fragment key={step}>
              {i > 0 ? <Arrow className="size-6 shrink-0" /> : null}
              <li
                className="rounded-full px-5 py-2.5 text-[15px] font-semibold capitalize sm:text-base lg:px-6 lg:text-[17px]"
                style={{
                  color: "var(--yana-purple)",
                  background: "color-mix(in srgb, var(--yana-purple-light) 70%, white)",
                  boxShadow: "inset 0 0 0 1px color-mix(in srgb, var(--yana-purple) 22%, transparent)",
                }}
              >
                {step}
              </li>
            </Fragment>
          ))}
        </ol>
      </YanaFrame>
    </section>
  );
}
