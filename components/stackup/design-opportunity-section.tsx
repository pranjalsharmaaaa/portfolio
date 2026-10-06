import type { CSSProperties } from "react";
import { stackupDesignOpportunity } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, at, slide } from "@/components/stackup/slide";

/** First-line tops (CSS px at 1440x810) of each title and its question; rows repeat at a ~127px pitch. */
const ROWS = [
  { title: 172, question: 211 },
  { title: 299, question: 338 },
  { title: 426, question: 466 },
  { title: 553, question: 593 },
] as const;

/** The PDF's lightbulb glyph, traced from its own vector path (28.33 x 29.99 pt). */
function Lightbulb({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 28.33 29.99" aria-hidden="true" className={className} style={style} fill="currentColor">
      <path d="M10.81 27.99C10.26 27.99 9.81 28.44 9.81 28.99C9.81 29.54 10.26 29.99 10.81 29.99L17.5 29.99C18.06 29.99 18.5 29.54 18.5 28.99C18.5 28.44 18.06 27.99 17.5 27.99L10.81 27.99M15.05 5.04C13.51 4.88 11.96 5.13 10.53 5.74C9.11 6.35 7.85 7.3 6.88 8.53C5.91 9.75 5.25 11.19 4.96 12.73C4.67 14.28 4.76 15.87 5.22 17.36C5.68 18.86 6.5 20.22 7.6 21.32C7.6 21.33 7.61 21.33 7.61 21.34C8.03 21.74 8.37 22.23 8.6 22.76C8.84 23.31 8.98 23.96 8.98 24.46L8.98 25.1C8.98 25.65 9.43 26.1 9.98 26.1L18.34 26.1C18.89 26.1 19.34 25.65 19.34 25.1L19.34 24.53C19.34 23.97 19.48 23.35 19.72 22.79C19.96 22.23 20.31 21.73 20.74 21.31C20.74 21.31 20.75 21.3 20.75 21.3C21.63 20.41 22.33 19.36 22.8 18.2C23.27 17.04 23.52 15.79 23.52 14.54C23.52 12.97 23.14 11.42 22.42 10.04C21.69 8.65 20.64 7.47 19.36 6.6C18.07 5.72 16.59 5.19 15.05 5.04M6.41 21.63C6.03 21.23 5.4 21.23 5.01 21.63L3.79 22.88C3.41 23.27 3.41 23.91 3.79 24.3C4.18 24.7 4.81 24.7 5.19 24.3L6.41 23.06C6.8 22.66 6.8 22.02 6.41 21.63M23.37 21.56C22.99 21.16 22.36 21.16 21.97 21.56C21.59 21.95 21.59 22.59 21.97 22.99L23.19 24.23C23.58 24.63 24.21 24.63 24.59 24.23C24.98 23.84 24.98 23.2 24.59 22.8L23.37 21.56M11.32 7.57C12.44 7.1 13.65 6.91 14.86 7.03C16.06 7.14 17.22 7.56 18.23 8.25C19.24 8.94 20.07 9.87 20.65 10.97C21.22 12.06 21.52 13.29 21.52 14.54L21.52 14.54C21.52 15.53 21.32 16.52 20.95 17.44C20.62 18.25 20.16 18.98 19.58 19.62L19.33 19.89C18.72 20.49 18.23 21.2 17.89 21.99C17.6 22.65 17.41 23.37 17.36 24.1L10.96 24.1C10.91 23.39 10.73 22.63 10.44 21.97C10.1 21.19 9.62 20.49 9.01 19.91L9.01 19.91C8.14 19.04 7.5 17.97 7.13 16.78C6.77 15.59 6.7 14.33 6.93 13.1C7.16 11.88 7.68 10.73 8.45 9.77C9.21 8.81 10.2 8.05 11.32 7.57M25.6 12.75C25.05 12.75 24.6 13.2 24.6 13.75C24.6 14.3 25.05 14.75 25.6 14.75L27.33 14.75C27.88 14.75 28.33 14.3 28.33 13.75C28.33 13.2 27.88 12.75 27.33 12.75L25.6 12.75M1 12.75C0.45 12.75 0 13.2 0 13.75C0 14.3 0.45 14.75 1 14.75L2.73 14.75C3.28 14.75 3.73 14.3 3.73 13.75C3.73 13.2 3.28 12.75 2.73 12.75L1 12.75M5.82 3.95C5.43 3.55 4.81 3.55 4.42 3.95C4.03 4.34 4.03 4.98 4.42 5.38L5.64 6.62C6.03 7.02 6.66 7.02 7.04 6.62C7.43 6.23 7.43 5.59 7.04 5.2L5.82 3.95M23.83 3.88C23.44 3.49 22.82 3.49 22.43 3.88L21.21 5.13C20.82 5.52 20.82 6.16 21.21 6.56C21.59 6.95 22.22 6.95 22.61 6.56L23.83 5.31C24.21 4.92 24.21 4.28 23.83 3.88M14.15 0C13.6 0 13.15 0.45 13.15 1L13.15 2.76C13.15 3.31 13.6 3.76 14.15 3.76C14.7 3.76 15.15 3.31 15.15 2.76L15.15 1C15.15 0.45 14.7 0 14.15 0" />
    </svg>
  );
}

/**
 * One concentric background ring, as a bordered circle: `d` is its outer
 * diameter and `t` its band thickness (PDF: 780/71.4 and 545.2/50),
 * centred on (cx, cy). Same fill as the PDF — #d9d8d3 at 14% opacity.
 */
function Ring({ cx, cy, d, t }: { cx: number; cy: number; d: number; t: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full ${slide.abs} ${slide.w} ${slide.h}`}
      style={{
        border: `calc(${t} * var(--u, ${(150 / d).toFixed(4)}vw)) solid rgb(217 216 211 / 14%)`,
        ...at({ x: cx - d / 2, y: cy - d / 2, w: d, h: d }),
      }}
    />
  );
}

/** Screen 15 — "Design Opportunity": four HMW questions over two faint rings. */
export function DesignOpportunitySection() {
  return (
    <Slide label="Design opportunity" corner flowClassName="pt-10 pb-28 @min-[640px]:py-14">
      <Ring cx={705.8} cy={393.8} d={780} t={71.45} />
      <Ring cx={705.4} cy={393.4} d={545.2} t={49.95} />
      <Container className="relative">
        <p
          className={`text-base font-semibold uppercase @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "rgb(0 0 0 / 50%)", ...at({ x: 60, y: 50, fs: 24, lh: 29 }) }}
        >
          {stackupDesignOpportunity.label}
        </p>
        <ul className="mt-8 flex flex-col gap-8">
          {stackupDesignOpportunity.opportunities.map((item, i) => (
            <li key={item.title}>
              <h3
                className={`text-base font-bold @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
                style={{ color: "var(--stackup-green)", ...at({ x: 60, y: ROWS[i].title, fs: 24, lh: 29 }) }}
              >
                {item.title}
              </h3>
              <div className="mt-2 flex items-start gap-3">
                <Lightbulb
                  className={`mt-0.5 h-7 w-7 shrink-0 ${slide.abs} ${slide.w} ${slide.h}`}
                  style={{ color: "#000", ...at({ x: 67, y: ROWS[i].question + 0.2, w: 34, h: 36 }) }}
                />
                <p
                  className={`text-lg leading-snug @min-[640px]:text-xl ${slide.abs} ${slide.type}`}
                  style={{ color: "#000", ...at({ x: 122, y: ROWS[i].question, fs: 28.8, lh: 35 }) }}
                >
                  <span className={slide.line}>{item.question}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Slide>
  );
}
