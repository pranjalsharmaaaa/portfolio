import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { ExperienceSection } from "@/components/about-page/experience-section";
import { RearLandscape } from "@/components/about-page/landscape";
import { PhotoCollage } from "@/components/about-page/photo-collage";
import { StickyRear } from "@/components/about-page/sticky-rear";
import styles from "@/components/about-page/about-page.module.css";
import { GlassNav } from "@/components/navigation/glass-nav";
import { aboutPage, collagePhotos } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About — Pranjal Sharma",
  description: aboutPage.intro,
};

/**
 * /about: the introduction and photo collage, then a small illustrated
 * landscape the reader scrolls through into Professional Experience.
 *
 * Layering, back to front:
 *   - the rear layer: the intro (headline, paragraph, collage) and the
 *     rear landscape below it, pinned together while the cream travels
 *     over them — see StickyRear and `.stage` in about-page.module.css;
 *   - the Experience section, whose own top edge is the cream hill.
 *
 * Photos are checked on the server so a file that hasn't been added
 * yet renders an honest empty frame instead of a broken image.
 */
export default function AboutPage() {
  const photos = collagePhotos.map((photo) => ({
    ...photo,
    available: existsSync(path.join(process.cwd(), "public", photo.src)),
  }));

  return (
    <main id="main" className={styles.page}>
      <div className={styles.stage}>
        <StickyRear className={styles.rear}>
          <div className="relative z-[1] mx-auto w-full max-w-[100rem] px-6 sm:px-10 lg:px-12">
            <div className="flex justify-center pt-5 sm:pt-6">
              <GlassNav />
            </div>

            <section
              aria-labelledby="about-heading"
              className="grid items-center gap-12 pt-14 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24"
            >
              <div className="lg:col-span-6 xl:col-span-5">
                <h1
                  id="about-heading"
                  className="font-display text-[clamp(2.4rem,4.6vw,4.6rem)] leading-[1.06] font-medium tracking-[-0.02em] text-balance"
                >
                  <span className="block">{aboutPage.headline.lead}</span>
                  <em className="block font-medium italic" style={{ color: "var(--meadow-accent)" }}>
                    {aboutPage.headline.emphasis}
                  </em>
                </h1>
                <p
                  className="mt-6 max-w-[34rem] text-[clamp(1rem,1.2vw,1.125rem)] leading-relaxed sm:mt-8"
                  style={{ color: "var(--meadow-body)" }}
                >
                  {aboutPage.intro}
                </p>
              </div>

              <div className="mx-auto w-full max-w-[36rem] lg:col-span-6 xl:col-span-6 xl:col-start-7">
                <PhotoCollage photos={photos} />
              </div>
            </section>
          </div>

          <RearLandscape />
        </StickyRear>
        <div aria-hidden="true" className={styles.revealSpacer} />
      </div>

      <ExperienceSection />
    </main>
  );
}
