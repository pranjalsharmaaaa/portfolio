import { yanaAwareness } from "@/lib/yana-research-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";

/**
 * The reference's open "bracket" container: a hairline top and bottom
 * with short ticks turning inward at each corner, no sides. Drawn in a
 * soft Yana purple rather than the source's grey.
 */
function Bracket({ children }: { children: React.ReactNode }) {
  const line = "color-mix(in srgb, var(--yana-purple) 38%, transparent)";
  const tick = "absolute h-2.5 w-px";
  return (
    <div className="relative px-6 py-4 text-center" style={{ borderTop: `1px solid ${line}`, borderBottom: `1px solid ${line}` }}>
      <span aria-hidden="true" className={`${tick} top-0 left-0`} style={{ background: line }} />
      <span aria-hidden="true" className={`${tick} top-0 right-0`} style={{ background: line }} />
      <span aria-hidden="true" className={`${tick} bottom-0 left-0`} style={{ background: line }} />
      <span aria-hidden="true" className={`${tick} right-0 bottom-0`} style={{ background: line }} />
      {children}
    </div>
  );
}

/**
 * "How Has Mental Health Awareness and Support Evolved in India?" — the
 * question as the screen's large editorial title on the left, with the
 * page's "Challenges :-" note beneath it, and the five-step evolution
 * as a vertical stack of bracketed blocks on the right. (The source
 * puts "Challenges" in a full-width band above both columns; it moves
 * into the left column here so the whole page fits one screen.)
 */
export function YanaAwarenessSection() {
  const { challengesLabel, challenges, question, timeline } = yanaAwareness;
  return (
    <section aria-label="How mental health awareness evolved in India" className={YANA_SCREEN_Y}>
      <YanaFrame className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
        <div>
          <h2 className="text-[30px] leading-[1.25] font-medium tracking-[-0.01em] sm:text-[36px] lg:text-[42px]" style={{ color: "var(--yana-ink)" }}>
            {question}
          </h2>

          <div className="mt-10 lg:mt-14">
            <p className="text-lg font-medium sm:text-xl" style={{ color: "var(--yana-magenta)" }}>
              {challengesLabel}
            </p>
            <ul className="mt-4 flex list-disc flex-col gap-3 pl-5 text-base leading-relaxed sm:text-[17px]" style={{ color: "var(--yana-ink)" }}>
              {challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <ol className="flex flex-col gap-4">
          {timeline.map((block) => (
            <li key={block.title}>
              <Bracket>
                <h3 className="text-[17px] leading-snug font-semibold italic sm:text-lg lg:text-[19px]" style={{ color: "var(--yana-ink)" }}>
                  {block.title}
                </h3>
                <div className="mt-2 text-[15px] leading-relaxed sm:text-base" style={{ color: "var(--yana-muted)" }}>
                  {block.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </Bracket>
            </li>
          ))}
        </ol>
      </YanaFrame>
    </section>
  );
}
