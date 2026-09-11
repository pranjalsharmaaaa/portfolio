import { GlassNav } from "@/components/navigation/glass-nav";
import { AnimatedHeadline } from "@/components/hero/animated-headline";
import { LocationBadge } from "@/components/hero/location-badge";
import { SideVocabulary } from "@/components/hero/side-vocabulary";
import { SkyBackground } from "@/components/hero/sky-background";
import { kicker } from "@/lib/site-content";

/**
 * The complete first-screen composition (spec §03, §08): a sky
 * environment carrying the intro copy, glass nav, location marker and
 * side vocabulary. A self-contained scene — the transition into the
 * rest of the site is deliberately out of scope for now (spec §17).
 */
export function Hero() {
  return (
    <section
      id="main"
      aria-label="Introduction"
      className="relative isolate flex min-h-dvh w-full flex-col overflow-hidden"
    >
      <SkyBackground />

      <div className="mx-auto flex w-full max-w-[92rem] flex-1 flex-col px-6 pt-6 pb-10 sm:px-10 sm:pt-8 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <LocationBadge />
          <GlassNav />
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-12 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-14">
          {/* Desktop: a vertical editorial spine, given its own grid
              track so it can never overlap the headline — its width
              comes from its own content, not a tuned pixel offset. */}
          <div className="hidden h-48 items-center justify-center md:flex">
            <SideVocabulary />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-xs font-semibold tracking-[0.25em] text-ink-muted uppercase">
              {kicker}
            </p>

            <AnimatedHeadline />
          </div>
        </div>

        {/* Mobile: the same label reflows into a quiet row under the headline. */}
        <div className="md:hidden">
          <SideVocabulary />
        </div>
      </div>
    </section>
  );
}
