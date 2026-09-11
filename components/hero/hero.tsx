import { GlassNav } from "@/components/navigation/glass-nav";
import { AnimatedHeadline } from "@/components/hero/animated-headline";
import { LocationBadge } from "@/components/hero/location-badge";
import { SideVocabulary } from "@/components/hero/side-vocabulary";
import { SkyBackground } from "@/components/hero/sky-background";
import { kicker } from "@/lib/site-content";

/**
 * The complete first-screen composition: an illustrated sky world
 * carrying the intro copy, a centered glass nav, a location marker,
 * and a quiet editorial caption. A self-contained scene — the
 * transition into the rest of the site is deliberately out of scope
 * for now.
 */
export function Hero() {
  return (
    <section
      id="main"
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden"
    >
      <SkyBackground />

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

        <div className="flex flex-1 flex-col justify-center gap-8 py-10 sm:py-14">
          <p className="text-xs font-semibold tracking-[0.25em] text-ink-muted uppercase">
            {kicker}
          </p>

          <AnimatedHeadline />

          <SideVocabulary />
        </div>
      </div>
    </section>
  );
}
