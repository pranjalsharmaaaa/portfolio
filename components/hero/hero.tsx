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
      // A floor and a ceiling, not a fixed height: on any real desktop
      // viewport (<1400px tall) min-height alone determines the box —
      // it's exactly 100dvh, the whole hero fits on first paint — and
      // on an unusually tall display max-height stops it growing past
      // 1400px. A *fixed* height here (this section's previous
      // approach) is a hard cap that clips real content the moment
      // anything renders even slightly taller than the calculation
      // assumed — which is exactly what cropped the bottom sky
      // pattern. With only min/max set, the box can still grow to fit
      // its own content up to the 1400px ceiling instead of clipping it.
      className="relative isolate flex min-h-[100dvh] max-h-[1400px] w-full flex-col overflow-hidden"
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

        <div className="flex flex-1 flex-col justify-center gap-6 py-4 sm:gap-8 sm:py-6">
          <div className="md:hidden">
            <SideVocabulary />
          </div>

          {/* Groups the intro line and the cassette/word row into one
              rigid unit so they can be shifted toward the horizontal
              center together, at desktop widths, without disturbing
              either block's own internal layout: each stays exactly as
              wide as its own content (`md:w-fit`) and flush against the
              other's left edge exactly as before — only the pair's
              shared position within the hero changes. `md:` throughout
              this wrapper's own sizing/centering: below that, mobile
              keeps its current full-width, left-anchored layout
              untouched. */}
          <div className="flex flex-col gap-6 sm:gap-8 md:w-fit md:mx-auto">
            {/* Kicker and headline get their own tight, deliberate gap —
                siblings of one intro line — separate from the larger gap
                (above, in the parent wrapper) that separates this whole
                intro from the cassette/word row below it. Without this
                grouping, a single gap value applied uniformly
                everywhere would leave as much air between the kicker
                and "Designer who" as between "Designer who" and the
                row underneath it. */}
            <div className="flex flex-col gap-2">
              <p
                className="text-xs font-semibold tracking-[0.25em] uppercase"
                style={{ color: "var(--hero-text)" }}
              >
                {kicker}
              </p>

              <DesignerWhoLine />
            </div>

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
                  its own text. 14.5rem is this string's own measured
                  extent at this font-size/tracking (~13.5rem) plus a
                  small buffer, so it renders as one line at its natural
                  size and `items-center` centers it against the cassette
                  and the word rather than either collapsing to nothing,
                  blowing out the row, or (an oversized box, the previous
                  bug) reserving far more height than the shorter string
                  needs and pushing the whole row down. */}
              {/* self-start (not the row's own items-center) so this
                  sits higher than the cassette/word it shares the row
                  with, toward the upper-left of the composition, rather
                  than centering on their same line — nudged up an
                  additional 1.5rem (`md:-mt-6`) so its lowest visible
                  character clears the About cloud's resting position at
                  the initial scroll offset instead of being clipped by
                  it. */}
              <div className="hidden shrink-0 self-start md:-mt-6 md:flex md:h-[14.5rem]">
                <SideVocabulary />
              </div>
              <Cassette />
              <CyclingWord />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
