import { AboutSection } from "@/components/about/about-section";
import { Hero } from "@/components/hero/hero";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { SelectedWork } from "@/components/work/selected-work";

/**
 * Mirrors Hero's own `min-h-[100dvh] max-h-[1400px]` (see hero.tsx)
 * exactly. Hero's real rendered height is always one or the other of
 * those two values — this needs no JS/ResizeObserver measurement to
 * stay correct, only needs to be kept in sync if Hero's own min/max
 * height rule ever changes.
 */
const HERO_HEIGHT = "min(100dvh, 1400px)";

/**
 * The Hero -> About handoff is a scroll-coupled "sticky reveal", not a
 * static overlap. A static negative margin (the previous approach,
 * removed) makes About's box always overlap Hero's by the same fixed
 * amount regardless of scroll position — there is no state where "About
 * is just starting to arrive" versus "About has now covered more of
 * the sky", because the geometry never changes as you scroll. This
 * version makes the covered amount an actual function of scroll
 * position:
 *
 * 1. Hero sits inside a `position: sticky; top: 0` wrapper, itself
 *    inside a "stage" div exactly TWICE Hero's own height. A sticky
 *    element stays pinned to the viewport for as long as its
 *    containing block still has room below it — with a stage twice
 *    Hero's height, that room is exactly one Hero-height's worth of
 *    scrolling, during which Hero visually stays put while the user
 *    scrolls.
 * 2. About — an ordinary, normal-flow block immediately after the
 *    stage (never `position: absolute`; it stays in flow per spec) —
 *    is pulled up by exactly one Hero-height via `margin-top`, so its
 *    own top edge starts at the *stage's* top rather than after it.
 *    That's what puts About's box directly over the sticky-pinned Hero
 *    for that whole scroll range, instead of only meeting it at the
 *    very end.
 * 3. Paint order does the rest: About is the later DOM sibling (the
 *    same default-stacking rule this codebase already relies on
 *    elsewhere), reinforced by the explicit `z-10` already on
 *    `<section id="about">`. As the user scrolls through that one
 *    Hero-height of range, more and more of the pinned Hero is
 *    covered by About's own box scrolling up over it in real document
 *    flow — genuinely "About sitting on top of the sky" at any paused
 *    scroll position, not a page mid-transition between two flat
 *    sections. Once About's top passes the viewport's top edge, Hero
 *    is fully covered, the sticky wrapper's containing block runs out
 *    of room and releases, and the page continues as an ordinary
 *    scroll through About's own content.
 *
 * AboutCloud (about-cloud.tsx) is untouched by this: it's already
 * positioned relative to `<section id="about">` itself, so it rises
 * with About automatically as this margin/sticky mechanism moves
 * About's box — it was never a separate, independently-positioned
 * decoration in the first place.
 */
export default function Home() {
  return (
    <>
      <LoadingScreen />

      <div className="relative" style={{ height: `calc(2 * ${HERO_HEIGHT})` }}>
        <div className="sticky top-0">
          <Hero />
        </div>
      </div>

      <div style={{ marginTop: `calc(-1 * ${HERO_HEIGHT})` }}>
        <AboutSection />
      </div>

      <SelectedWork />
    </>
  );
}
