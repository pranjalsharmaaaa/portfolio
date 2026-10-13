import type { Metadata } from "next";
import { GlassNav } from "@/components/navigation/glass-nav";
import { AboutSky } from "@/components/about/about-sky";
import { PolaroidCollage } from "@/components/about/polaroid-collage";
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
 */
export default function AboutPage() {
  return (
    <div className="about-page relative min-h-dvh overflow-x-clip">
      <AboutSky />

      <header className="relative mx-auto w-full max-w-[100rem] px-3 pt-4 sm:px-10 sm:pt-5 lg:px-12">
        <GlassNav hideOnScroll={false} portal={false} />
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

        {/* The introduction and the photo stack: one after the other on
            phones and tablets, side by side from `lg` so both sit in view
            together beneath the headline. */}
        <div className="mt-6 sm:mt-8 lg:grid lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <div className="max-w-[32rem]">
            <p className="font-display text-[clamp(1.2rem,1.7vw,1.5rem)] leading-snug font-medium italic">
              {aboutPage.intro.lead}
            </p>
            <p className="mt-3 text-base leading-relaxed text-pretty sm:text-[17px]" style={{ color: "var(--ap-muted)" }}>
              {aboutPage.intro.body}
            </p>
          </div>

          <div className="mt-12 sm:mt-16 lg:mt-0">
            <PolaroidCollage />
          </div>
        </div>
      </main>
    </div>
  );
}
