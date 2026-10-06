import { yanaDiscover } from "@/lib/yana-content";
import { YanaFrame } from "@/components/yana/frame";

/**
 * Body copy is left-aligned rather than the reference's justified,
 * full-page-width lines, and held to a comfortable reading measure —
 * browsers can't hyphenate justified text well, and the source's
 * ~160-character lines are roughly twice a readable length.
 *
 * Top-anchored rather than vertically centered like the other screens:
 * in the reference this content hangs directly off the chapter band, so
 * any spare height on a tall viewport falls to the cream below the last
 * line instead of opening a gap under "DISCOVER". On short landscape
 * screens (≤ 860px tall) the band and block spacing tighten slightly so
 * this screen still fits one viewport like the others.
 */
export function YanaDiscoverSection() {
  const { whatIs, whyMatters, policies } = yanaDiscover;

  return (
    <section className="flex flex-1 flex-col" style={{ background: "var(--yana-bg)" }} aria-label="Discover">
      <YanaFrame
        className="flex flex-1 flex-col pt-12 pb-16 sm:pt-14 sm:pb-20 lg:pt-[56px] lg:pb-[60px] [@media(min-width:1024px)_and_(max-height:860px)]:pt-10 [@media(min-width:1024px)_and_(max-height:860px)]:pb-12"
      >
        <div className="max-w-[50rem]" style={{ color: "var(--yana-ink)" }}>
          <h3 className="text-lg font-semibold sm:text-xl" style={{ color: "var(--yana-purple)" }}>{whatIs.heading}</h3>
          <p className="mt-3 text-base leading-relaxed sm:text-[17px] lg:mt-4">{whatIs.body}</p>

          <h3 className="mt-11 text-lg font-semibold sm:text-xl lg:mt-12 [@media(min-width:1024px)_and_(max-height:860px)]:mt-9" style={{ color: "var(--yana-purple)" }}>{whyMatters.heading}</h3>
          <p className="mt-3 text-base leading-relaxed sm:text-[17px] lg:mt-4">{whyMatters.body}</p>
          <p className="mt-1 text-base leading-relaxed font-semibold sm:text-[17px]">
            {whyMatters.emphasis}
          </p>

          <h3 className="mt-11 text-lg font-semibold sm:text-xl lg:mt-12 [@media(min-width:1024px)_and_(max-height:860px)]:mt-9" style={{ color: "var(--yana-purple)" }}>{policies.heading}</h3>
          <ul className="mt-4 flex list-disc flex-col gap-3 pl-6 marker:text-[var(--yana-purple)] text-base leading-relaxed sm:text-[17px] lg:mt-5 lg:gap-3.5">
            {policies.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </YanaFrame>
    </section>
  );
}
