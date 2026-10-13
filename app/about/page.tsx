import type { Metadata } from "next";
import { GlassNav } from "@/components/navigation/glass-nav";
import { AboutSky } from "@/components/about/about-sky";
import { PolaroidCollage } from "@/components/about/polaroid-collage";
import { GrowSection } from "@/components/contact/grow-section";
import { ExperienceSection } from "@/components/about-page/experience-section";
import { RearLandscape } from "@/components/about-page/landscape";
import { StickyRear } from "@/components/about-page/sticky-rear";
import styles from "@/components/about-page/about-page.module.css";
import { aboutPage } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About — Pranjal Sharma",
  description:
    "Pranjal Sharma is a product designer with a background in computer science, curious about how things work, look, and feel.",
};

/**
 * The About page: the shared glass nav centred at the top (About
 * outlined, theme toggle in the pill), a two-line editorial headline
 * with its key words in the accent green, a short introduction, and a
 * stack of Polaroid prints (beside the introduction on wide screens,
 * below it on smaller ones). The nav stays put while scrolling here:
 * it's the way back home.
 *
 * Below the introduction, a small illustrated landscape leads into
 * Professional Experience. Layering, back to front:
 *   - the rear layer: everything above plus the rear landscape
 *     (RearLandscape), pinned together while the cream hill travels over
 *     them — see StickyRear and `.stage` in about-page.module.css. They
 *     hold still as one piece, so no gap opens as the intro would
 *     otherwise scroll away from a separately pinned landscape;
 *   - the Experience section, whose own top edge is the cream hill.
 */
export default function AboutPage() {
  return (
    <div className={`about-page relative min-h-dvh overflow-x-clip ${styles.page}`}>
      <AboutSky />

      {/* Outside the pinned stage on purpose: `.stage` is its own stacking
          context, so a nav inside it would sit beneath the Experience
          section (and its cream hill) however high its own z-index. Out
          here the fixed nav stays above everything on the page. */}
      <header className="relative mx-auto w-full max-w-[100rem] px-3 pt-4 sm:px-10 sm:pt-5 lg:px-12">
        <GlassNav hideOnScroll={false} portal={false} />
      </header>

      <main id="main">
        <div className={styles.stage}>
          <StickyRear className={styles.rear}>
            <div className="relative z-[1] mx-auto w-full max-w-[100rem] px-5 sm:px-10 lg:px-12">
              <h1 className="mt-[clamp(2.5rem,8vh,5.5rem)] font-display text-[clamp(1.85rem,4.1vw,4.25rem)] leading-[1.12] font-bold tracking-[-0.015em]">
                {aboutPage.headline.map((line) => (
                  <span key={line.highlight} className="block text-balance">
                    {line.before}
                    <span className="about-accent">{line.highlight}</span>
                    {line.after}
                  </span>
                ))}
              </h1>

              {/* The introduction and the photo stack: one after the other on
                  phones and tablets, side by side from `lg` so both sit in view
                  together beneath the headline. */}
              <div className="mt-6 sm:mt-8 lg:grid lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
                <p
                  className="max-w-[32rem] text-[17px] leading-relaxed text-pretty sm:text-lg lg:pt-1"
                  style={{ color: "var(--ap-muted)" }}
                >
                  {/* A no-break space keeps "I love" together, so no line ends on a
                      lone "I". */}
                  {aboutPage.intro.replace("I love", "I\u00a0love")}
                </p>

                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <PolaroidCollage />
                </div>
              </div>
            </div>

            <RearLandscape />
          </StickyRear>
          <div aria-hidden="true" className={styles.revealSpacer} />
        </div>

        <ExperienceSection />

        {/* The homepage's closing contact section, reused as-is. */}
        <GrowSection />
      </main>
    </div>
  );
}
