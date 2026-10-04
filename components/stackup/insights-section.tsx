import Image from "next/image";
import { stackupInsights } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/**
 * Per-pattern frame geometry (CSS px at 1440x810): each illustration's
 * full (transparent-margined) image box exactly as the PDF places it,
 * and the horizontal centre + first-line top of its label. On canvases
 * wider than the frame each column takes an i/3 share of the spare width,
 * so the four columns spread across the 60px content frame. In flow
 * layout every illustration gets the same 3:2 box so labels line up.
 */
const PATTERN_GEOMETRY = [
  { img: { x: 60, y: 268.8, w: 294, h: 278.4 }, label: { cx: 206.4, y: 554.5 } },
  { img: { x: 325.2, y: 268.8, w: 448.2, h: 298.8 }, label: { cx: 551.4, y: 554.5 } },
  { img: { x: 682.2, y: 268.8, w: 417.6, h: 278.4 }, label: { cx: 890.4, y: 555.5 } },
  { img: { x: 1020, y: 261.6, w: 455.4, h: 303.6 }, label: { cx: 1233, y: 556.5 } },
] as const;

/** Screen 13 — "Insights": four behavioural patterns. */
export function InsightsSection() {
  return (
    <Slide label="Insights">
      <Container>
        <p
          className={`text-sm font-semibold uppercase @min-[640px]:text-base ${slide.abs} ${slide.type}`}
          style={{ color: "rgb(0 0 0 / 50%)", ...at({ x: 60, y: 53, fs: 21, lh: 26 }) }}
        >
          {stackupInsights.label}
        </p>
        <h2
          className={`mt-3 text-2xl leading-snug font-semibold @min-[640px]:text-3xl ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 104, fs: 38.4, lh: 47 }) }}
        >
          {stackupInsights.heading}
        </h2>
        <p
          className={`mt-3 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#3a3a3a", ...at({ x: 60, y: 165, fs: 24, lh: 29 }) }}
        >
          {stackupInsights.subheading}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 @min-[640px]:grid-cols-4">
          {stackupInsights.patterns.map((pattern, i) => {
            const g = PATTERN_GEOMETRY[i];
            return (
              <figure key={pattern.image} className="flex flex-col items-center gap-3 text-center">
                <div
                  className={`relative w-full max-w-[22rem] ${slide.abs} ${slide.w} ${slide.h}`}
                  style={{ aspectRatio: "3 / 2", ...at({ ...g.img, f: i / 3 }) }}
                >
                  <Image
                    src={pattern.image}
                    alt={pattern.alt}
                    fill
                    sizes={`(min-width: 640px) ${Math.ceil(g.img.w / 14.4)}vw, 50vw`}
                    quality={95}
                    className="object-contain"
                  />
                </div>
                <figcaption
                  className={`text-sm font-bold @min-[640px]:text-base ${slide.abs} ${slide.w} ${slide.type}`}
                  style={{ color: "#3a3a3a", ...at({ x: g.label.cx - 160, y: g.label.y, w: 320, fs: 24, lh: 36, f: i / 3 }) }}
                >
                  {pattern.lines.map((line, j) => (
                    <span key={j} className={slide.line}>
                      {line}
                      {j < pattern.lines.length - 1 ? " " : null}
                    </span>
                  ))}
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p
          className={`mt-10 text-lg leading-relaxed @min-[640px]:text-xl ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 697, fs: 28.8, lh: 35 }) }}
        >
          <Lines lines={[stackupInsights.closing]} />
        </p>
      </Container>
    </Slide>
  );
}
