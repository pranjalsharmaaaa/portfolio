import { Cassette } from "@/components/hero/cassette";
import { GlassNav } from "@/components/navigation/glass-nav";
import { CyclingWord, DesignerWhoLine } from "@/components/hero/animated-headline";
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
      // Was `min-h-dvh` (a floor only — content could grow past the
      // viewport and force a scroll to see the bottom, which is
      // exactly what happened). This is an actual cap: on any real
      // desktop viewport (<1400px tall) it's just 100dvh — the whole
      // hero fits on first paint — and on an unusually tall display it
      // stops growing at 1400px instead of stretching further.
      className="relative isolate flex h-[min(100dvh,1400px)] w-full flex-col overflow-hidden"
    >
      <SkyStage />

      <div className="mx-auto flex w-full max-w-[100rem] flex-1 flex-col px-6 pt-5 pb-6 sm:px-10 sm:pt-6 sm:pb-8 lg:px-12">
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

        <div className="flex flex-1 flex-col justify-center gap-5 py-4 sm:gap-6 sm:py-6">
          <div className="md:hidden">
            <SideVocabulary />
          </div>

          <p
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--hero-text)" }}
          >
            {kicker}
          </p>

          <DesignerWhoLine />

          {/* One horizontal composition on desktop: the vertical
              vocabulary, the cassette, and the changing word share the
              same row and the same vertical center — the cassette
              always sits directly beside whichever word is currently
              showing, never on a row of its own underneath "Designer
              who". `flex-nowrap` from md up keeps that trio from
              breaking apart; only below md (where the vocabulary
              already renders separately above, not here) does the row
              wrap, letting the word drop under the cassette instead of
              overflowing. */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-6 md:flex-nowrap md:gap-x-8">
            {/* A vertical-writing-mode child inside a flex row is a
                known trap: with no explicit height, its auto block-size
                calculation stretches to the flex line's full cross
                size (the row silently became 900px tall — the entire
                viewport height — before this fix) instead of sizing to
                its own text. 17rem is the string's own measured extent
                at this font-size/tracking (~16.3rem) plus a small
                buffer, so it renders as one line at its natural size
                and `items-center` centers it against the cassette and
                the word rather than either collapsing to nothing or
                blowing out the row. */}
            <div className="hidden shrink-0 items-center md:flex md:h-[17rem]">
              <SideVocabulary />
            </div>
            <Cassette />
            <CyclingWord />
          </div>
        </div>
      </div>
    </section>
  );
}
