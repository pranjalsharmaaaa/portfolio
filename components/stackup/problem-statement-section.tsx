import { stackupProblemStatement } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/** Screen 14 — "Problem Statement". */
export function ProblemStatementSection() {
  const [first, second] = stackupProblemStatement.paragraphs;
  return (
    <Slide label="Problem statement" corner flowClassName="pt-10 pb-28 @min-[640px]:py-14">
      <Container>
        <p
          className={`text-base font-semibold uppercase @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "rgb(0 0 0 / 50%)", ...at({ x: 60, y: 50, fs: 24, lh: 29 }) }}
        >
          {stackupProblemStatement.label}
        </p>
        <h2
          className={`mt-6 text-2xl leading-snug font-bold @min-[640px]:text-3xl ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 204.5, fs: 38.4, lh: 48 }) }}
        >
          <Lines lines={stackupProblemStatement.statement} />
        </h2>
        <p
          className={`mt-6 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 391.5, fs: 24, lh: 36 }) }}
        >
          <Lines lines={first} />
        </p>
        <p
          className={`mt-4 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 499.5, fs: 24, lh: 36 }) }}
        >
          <Lines lines={second} />
        </p>
      </Container>
    </Slide>
  );
}
