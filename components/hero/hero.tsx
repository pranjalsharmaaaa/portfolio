import { Cassette } from "@/components/hero/cassette";
import { GlassNav } from "@/components/navigation/glass-nav";
import { AnimatedHeadline } from "@/components/hero/animated-headline";
import { LocationBadge } from "@/components/hero/location-badge";
import { SideVocabulary } from "@/components/hero/side-vocabulary";
import { SkyStage } from "@/components/hero/sky-stage";
import { kicker } from "@/lib/site-content";

/**
 * The complete first-screen composition: an illustrated sky world
 * carrying the intro copy, a centered glass nav, a location marker,
 * a vertical design annotation, and the cassette — a reserved audio
 * moment built as part of the main artwork, not a corner widget.
 * A self-contained scene — the transition into the rest of the site
 * is deliberately out of scope for now.
 */
export function Hero() {
  return (
    <section
      id="main"
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden"
    >
      <SkyStage />

      <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-6 pt-6 pb-10 sm:px-10 sm:pt-8 lg:px-12">
        <div className="mb-4 md:hidden">
          <LocationBadge />
        </div>

        {/* Three-column top row: INDIA and a matching spacer flank the
            nav so the nav sits genuinely centered, not just "left of
            whatever's on the right" — a CSS Grid balance, not a tuned
            offset. Below md, INDIA renders separately above (its own
            block just before this one) and this row centers the nav
            alone. */}
        <div className="grid grid-cols-1 items-center justify-items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch">
          <div className="hidden md:block">
            <LocationBadge />
          </div>
          <GlassNav />
          <div aria-hidden="true" className="hidden md:block" />
        </div>

        {/* Vocabulary gets its own grid track beside the headline so it
            can never overlap it — a design annotation, not underneath
            the type on desktop, reflowing to a horizontal row above it
            on narrow screens instead of disappearing. */}
        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-10 md:grid-cols-[auto_1fr] md:gap-10 sm:py-14 lg:gap-14">
          <div className="hidden h-56 items-center justify-center md:flex">
            <SideVocabulary />
          </div>

          <div className="flex flex-col gap-6">
            <div className="md:hidden">
              <SideVocabulary />
            </div>

            <p className="text-xs font-semibold tracking-[0.25em] text-ink-muted uppercase">
              {kicker}
            </p>

            {/* The cassette bottom-aligns with the headline block, which
                puts it beside the cycling word (the headline's own last
                line) while staying below "Designer who" above it — a
                flex/items-end relationship, not a pixel overlap, so it
                reflows instead of colliding at narrower desktop widths. */}
            <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
              <AnimatedHeadline />
              <Cassette />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
