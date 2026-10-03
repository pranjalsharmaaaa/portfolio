import { stackupResearchIntro } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/** Screen 11 — "Understanding how People actually manage their money". */
export function ResearchIntroSection() {
  return (
    <Slide label="Understanding how people manage their money" corner flowClassName="pt-10 pb-28 @min-[640px]:py-14">
      <Container>
        <h2 className="font-normal">
          <span
            className={`block text-4xl leading-tight @min-[640px]:text-6xl ${slide.abs} ${slide.type}`}
            style={{ color: "#000", letterSpacing: "0.022em", ...at({ x: 60, y: 232, fs: 72, lh: 96 }) }}
          >
            {stackupResearchIntro.headingPlain}
          </span>
          <span
            className={`mt-1 block text-4xl leading-tight font-extrabold @min-[640px]:text-6xl ${slide.abs} ${slide.type}`}
            style={{ color: "#035422", ...at({ x: 60, y: 328, fs: 72, lh: 96 }) }}
          >
            {stackupResearchIntro.headingAccent}
          </span>
        </h2>
        <p
          className={`mt-8 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 472.25, fs: 24, lh: 34.5 }) }}
        >
          <Lines lines={stackupResearchIntro.body} />
        </p>
      </Container>
    </Slide>
  );
}
