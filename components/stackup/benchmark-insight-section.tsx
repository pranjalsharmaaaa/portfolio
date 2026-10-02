import Image from "next/image";
import type { InsightCard, InsightExample } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";
import { ProductLogo } from "@/components/stackup/product-logo";

/**
 * Shared layout for the three "NN / Benchmark Insight" sections: a
 * labelled headline, a row of product examples (each a logo, 0-2
 * screenshots preserving their own aspect ratio, and a short caption
 * per screenshot), and a closing "What I Observed" / "The Opportunity"
 * card pair. One component parameterized by content rather than three
 * near-duplicate section files, since all three share the exact same
 * visual system end to end.
 */
export function BenchmarkInsightSection({
  index,
  headline,
  subheading,
  examples,
  observed,
  opportunity,
}: {
  index: string;
  headline: string;
  subheading: string;
  examples: readonly InsightExample[];
  observed: InsightCard;
  opportunity: InsightCard;
}) {
  return (
    <section className={`relative ${SECTION_Y}`} style={{ background: "var(--stackup-bg)" }} aria-label={`Benchmark insight ${index}`}>
      {/* gap-10 on mobile (unchanged), tightened to gap-4 from `sm:` up —
          at that breakpoint the page-stack wrapper constrains this
          section to one viewport, and these three blocks' own content
          (label+heading+subheading, the example screenshots, the two
          insight cards) already use most of that height on a common
          laptop screen; trimming this one gap is what keeps Insight 03
          (the tallest of the three) inside 100svh without touching its
          typography or images. */}
      <Container className="flex flex-col gap-10 sm:gap-4">
        <div className="w-full">
          <p className="text-base font-bold tracking-wide uppercase sm:text-lg" style={{ color: "var(--stackup-label)" }}>
            {index} / Benchmark Insight
          </p>
          <h2 className="mt-3 max-w-4xl text-2xl font-bold sm:text-3xl" style={{ color: "var(--stackup-ink)" }}>
            {headline}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--stackup-muted)" }}>
            {subheading}
          </p>
        </div>

        {examples.length === 2 ? (
          // Two examples means one wide screenshot beside one product with
          // two phones (currently only "Practice platforms..." / page 10) —
          // the reference composes this as two genuinely different-width
          // visual areas, not a 3-up grid with one cell left empty. The
          // narrower example's shot fills its own column at closer to its
          // native size instead of being squeezed into the same fixed
          // thumbnail width as a tall phone screenshot.
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:justify-between">
            {examples.map((example) => {
              // An example with more than one shot (Frontpage) pairs each
              // phone with its own caption beside its lower portion, side
              // by side with the other pair — not stacked image-then-
              // caption like a single-shot example (Money Bhai) is.
              const pairShots = example.shots.length > 1;
              return (
                <div key={example.name} className="flex w-full flex-col items-start gap-4 lg:w-auto">
                  <div className="flex items-center gap-2">
                    <ProductLogo src={example.logo} name={example.name} className="h-8 w-auto" />
                    <h3 className="font-bold" style={{ color: "var(--stackup-ink)" }}>
                      {example.name}
                    </h3>
                  </div>

                  <div className={`flex w-full flex-row flex-wrap gap-6 ${pairShots ? "items-end justify-between" : "items-start"}`}>
                    {example.shots.map((shot) => (
                      <div
                        key={shot.src}
                        className={pairShots ? "flex flex-row items-end gap-3" : "flex flex-col gap-2"}
                        style={pairShots ? undefined : { width: shot.displayWidth ? `${shot.displayWidth}px` : "10rem", maxWidth: "100%" }}
                      >
                        <div
                          className="relative shrink-0 overflow-hidden rounded-lg shadow-[0_2px_10px_-4px_rgb(0_0_0/15%)]"
                          style={{ width: pairShots ? (shot.displayWidth ? `${shot.displayWidth}px` : "10rem") : "100%", aspectRatio: shot.aspect }}
                        >
                          <Image src={shot.src} alt={shot.alt} fill sizes={shot.displayWidth ? `${shot.displayWidth}px` : "10rem"} quality={100} className="object-contain" />
                        </div>
                        {shot.caption ? (
                          <p className={pairShots ? "max-w-[8rem] text-xs leading-snug" : "text-xs leading-snug"} style={{ color: "var(--stackup-muted)" }}>
                            {shot.caption}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {examples.map((example) => (
              <div key={example.name} className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-2">
                  <ProductLogo src={example.logo} name={example.name} className="h-8 w-auto" />
                  <h3 className="font-bold" style={{ color: "var(--stackup-ink)" }}>
                    {example.name}
                  </h3>
                </div>

                {example.shots.length > 0 ? (
                  <div className="flex flex-row flex-wrap items-start justify-center gap-4">
                    {example.shots.map((shot) => (
                      <div key={shot.src} className="flex w-32 flex-col gap-2">
                        <div className="relative w-full overflow-hidden rounded-lg shadow-[0_2px_10px_-4px_rgb(0_0_0/15%)]" style={{ aspectRatio: shot.aspect }}>
                          <Image src={shot.src} alt={shot.alt} fill sizes="10rem" quality={100} className="object-contain" />
                        </div>
                        {shot.caption ? (
                          <p className="text-xs leading-snug" style={{ color: "var(--stackup-muted)" }}>
                            {shot.caption}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--stackup-muted)" }}>
                    {example.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <InsightCardView card={observed} background="#f1f1ef" />
          <InsightCardView card={opportunity} background="#e8f0e8" />
        </div>
      </Container>
    </section>
  );
}

function InsightCardView({ card, background }: { card: InsightCard; background: string }) {
  return (
    <div className="rounded-2xl p-6" style={{ background }}>
      <p className="text-xs font-bold tracking-wide uppercase" style={{ color: "var(--stackup-muted)" }}>
        {card.label}
      </p>
      <h4 className="mt-2 text-lg font-bold" style={{ color: "var(--stackup-ink)" }}>
        {card.heading}
      </h4>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--stackup-muted)" }}>
        {card.body}
      </p>
    </div>
  );
}
