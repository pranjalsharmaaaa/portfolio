import { stackupResearchToDesign } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/** Screen 16 — "From Research to Design", an editorial transition. */
export function ResearchToDesignSection() {
  return (
    <Slide label="From research to design" corner flowClassName="pt-16 pb-32 @min-[640px]:py-20">
      <Container>
        <h2
          className={`text-4xl leading-tight font-bold @min-[640px]:text-6xl ${slide.abs} ${slide.type}`}
          style={{ color: "var(--stackup-green)", ...at({ x: 60, y: 301, fs: 72, lh: 88 }) }}
        >
          {stackupResearchToDesign.heading}
        </h2>
        <p
          className={`mt-6 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 441.5, fs: 24, lh: 34 }) }}
        >
          <Lines lines={stackupResearchToDesign.body} />
        </p>
      </Container>
    </Slide>
  );
}
