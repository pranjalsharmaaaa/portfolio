import type { Metadata } from "next";
import { GlassNav } from "@/components/navigation/glass-nav";
import { ThemeControls } from "@/components/ui/theme-controls";
import { AboutSky } from "@/components/about/about-sky";
import { PolaroidCollage } from "@/components/about/polaroid-collage";
import { aboutPage, aboutPageNavItems } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "About — Pranjal Sharma",
  description:
    "Pranjal Sharma is a product designer with a background in computer science, curious about how things work, look, and feel.",
};

/**
 * The About page: the shared glass nav at the top left (About outlined)
 * with separate sun/moon theme controls at the top right, a two-line
 * editorial headline with its key words in the accent green, a short
 * introduction, and a stack of Polaroid prints in the lower part of the
 * page. The nav stays put while scrolling here: it's the way back home.
 */
export default function AboutPage() {
  return (
    <div className="about-page relative min-h-dvh overflow-x-clip">
      <AboutSky />

      <header className="relative mx-auto w-full max-w-[100rem] px-5 pt-4 sm:px-10 sm:pt-5 lg:px-12">
        <GlassNav
          items={aboutPageNavItems}
          align="start"
          themeToggle={false}
          trailing={<ThemeControls />}
          hideOnScroll={false}
        />
      </header>

      <main id="main" className="relative mx-auto w-full max-w-[100rem] px-5 pb-20 sm:px-10 sm:pb-28 lg:px-12">
        <h1 className="mt-[clamp(2.5rem,8vh,5.5rem)] font-display text-[clamp(1.85rem,4.1vw,4.25rem)] leading-[1.12] font-bold tracking-[-0.015em]">
          {aboutPage.headline.map((line) => (
            <span key={line.highlight} className="block text-balance">
              {line.before}
              <span className="about-accent">{line.highlight}</span>
              {line.after}
            </span>
          ))}
        </h1>

        <div className="mt-6 max-w-[40rem] space-y-4 text-[17px] leading-relaxed sm:mt-8 sm:text-lg" style={{ color: "var(--ap-muted)" }}>
          {aboutPage.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 sm:mt-16">
          <PolaroidCollage />
        </div>
      </main>
    </div>
  );
}
