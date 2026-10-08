import type { ReactNode } from "react";
import type { Heading } from "@/lib/sales-coach-content";

/**
 * Shared building blocks for the Sales Coach screens. Breakpoints are
 * container queries (`@min-[640px]:` / `@min-[1024px]:`) on the screen
 * canvas, not viewport media queries, so a section's layout always
 * matches the width it's actually laid out at inside the scaled stack.
 */

/** The one horizontal grid: 20px mobile · 40px tablet · 60px desktop. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full px-5 @min-[640px]:px-10 @min-[1024px]:px-[60px] ${className}`}>{children}</div>;
}

/** The one vertical rhythm every screen owns. */
export const SCREEN_Y = "pt-20 pb-14 @min-[640px]:pt-[72px] @min-[640px]:pb-12 @min-[1024px]:pb-[44px]";

export function SectionTitle({ heading, sub, className = "" }: { heading: Heading; sub?: ReactNode; className?: string }) {
  return (
    <header className={className}>
      <h2 className="text-[34px] leading-[1.1] font-medium tracking-[-0.025em] text-[var(--sc-ink)] @min-[640px]:text-[46px] @min-[1024px]:text-[52px]">
        {heading.plain}
        {heading.accent && <span className="text-[var(--sc-red)]">{heading.accent}</span>}
      </h2>
      {sub && (
        <p className="mt-3 max-w-[1180px] text-[17px] leading-[1.5] text-[var(--sc-ink)] @min-[640px]:text-[20px] @min-[1024px]:text-[21px]">
          {sub}
        </p>
      )}
    </header>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-[13px] font-medium tracking-[0.12em] text-[var(--sc-label)] uppercase @min-[640px]:text-[15px] ${className}`}>
      {children}
    </p>
  );
}

/** The raised off-white card used across the PDF. */
export function Card({ children, className = "", highlight = false }: { children: ReactNode; className?: string; highlight?: boolean }) {
  return (
    <div
      className={`rounded-[20px] ${
        highlight
          ? "border border-[var(--sc-red-line)] bg-[var(--sc-pink-strong)] shadow-[0_10px_30px_-12px_rgba(198,10,24,0.28)]"
          : "bg-[var(--sc-card)] shadow-[0_8px_28px_-10px_rgba(20,20,20,0.16),0_1px_2px_rgba(20,20,20,0.04)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

type Line = { text: string; accent?: boolean; italic?: boolean; inline?: boolean };

/**
 * The soft-pink "Insight" / "Key takeaway" panel that closes most PDF
 * pages. Lines render on their own row unless `inline` (which continues
 * the previous line). With `aside`, a thin red rule splits the panel
 * into statement | explanation, as in the PDF.
 */
export function Takeaway({ label, lines, aside }: { label: string; lines: readonly Line[]; aside?: string }) {
  const rows: Line[][] = [];
  lines.forEach((l) => (l.inline && rows.length ? rows[rows.length - 1].push(l) : rows.push([l])));
  return (
    <div className="rounded-[22px] bg-[var(--sc-pink)] px-6 py-6 @min-[640px]:px-8 @min-[640px]:py-6">
      <div className={aside ? "flex flex-col gap-5 @min-[1024px]:flex-row @min-[1024px]:items-stretch @min-[1024px]:gap-10" : ""}>
        <div className={aside ? "@min-[1024px]:w-[46%] @min-[1024px]:shrink-0" : ""}>
          <Eyebrow className="mb-2">{label}</Eyebrow>
          <p className="text-[24px] leading-[1.3] font-medium tracking-[-0.015em] text-[var(--sc-ink)] @min-[640px]:text-[30px] @min-[1024px]:text-[32px]">
            {rows.map((row, i) => (
              <span key={i} className="block">
                {row.map((l, j) => (
                  <span
                    key={j}
                    className={`${l.accent ? "text-[var(--sc-red)]" : ""} ${l.italic ? "font-semibold italic" : ""}`}
                  >
                    {l.text}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
        {aside && (
          <>
            <span aria-hidden className="hidden w-[2px] shrink-0 self-stretch rounded bg-[var(--sc-red)] @min-[1024px]:block" />
            <span aria-hidden className="block h-[2px] w-16 rounded bg-[var(--sc-red)] @min-[1024px]:hidden" />
            <p className="self-center text-[17px] leading-[1.5] text-[var(--sc-ink)] @min-[640px]:text-[20px]">{aside}</p>
          </>
        )}
      </div>
    </div>
  );
}

/** Red numerals on a pink disc ("01", "02"…). */
export function NumberDisc({ n, size = "md", tone = "pink" }: { n: string; size?: "sm" | "md"; tone?: "pink" | "grey" }) {
  const dims = size === "sm" ? "h-9 w-9 text-[15px]" : "h-12 w-12 text-[20px] @min-[640px]:h-14 @min-[640px]:w-14 @min-[640px]:text-[24px]";
  const colors = tone === "grey" ? "bg-[#ececea] text-[#5b5b5b]" : "bg-[var(--sc-num)] text-[var(--sc-red)]";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-medium tabular-nums ${dims} ${colors}`}>
      {n}
    </span>
  );
}

/** Glyphs from the PDF's pink-disc icon set, redrawn as SVG so they stay crisp at any scale. */
export function IconDisc({ name, className = "h-14 w-14" }: { name: "sparkle" | "people" | "arrow" | "rocket" | "sliders" | "pin"; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--sc-num)] text-[var(--sc-red-bright)] ${className}`} aria-hidden>
      <svg viewBox="0 0 24 24" className="h-[52%] w-[52%]" fill="currentColor">
        {name === "people" && (
          <>
            <circle cx="12" cy="7.2" r="3.4" />
            <circle cx="5.2" cy="9" r="2.4" opacity=".85" />
            <circle cx="18.8" cy="9" r="2.4" opacity=".85" />
            <path d="M5 21v-1.6a7 7 0 0 1 14 0V21z" />
            <path d="M1 20.5v-1a4.5 4.5 0 0 1 5.6-4.3A8.6 8.6 0 0 0 4 20.5zM23 20.5v-1a4.5 4.5 0 0 0-5.6-4.3 8.6 8.6 0 0 1 2.6 5.3z" opacity=".85" />
          </>
        )}
        {name === "sparkle" && (
          <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M10 4.5c.5 3.7 1.8 5 5.5 5.5-3.7.5-5 1.8-5.5 5.5-.5-3.7-1.8-5-5.5-5.5 3.7-.5 5-1.8 5.5-5.5z" />
            <path d="M18 2.8c.2 1.4.7 1.9 2.1 2.1-1.4.2-1.9.7-2.1 2.1-.2-1.4-.7-1.9-2.1-2.1 1.4-.2 1.9-.7 2.1-2.1zM5.5 16.8c.2 1.3.6 1.7 1.9 1.9-1.3.2-1.7.6-1.9 1.9-.2-1.3-.6-1.7-1.9-1.9 1.3-.2 1.7-.6 1.9-1.9z" fill="currentColor" />
          </g>
        )}
        {name === "arrow" && (
          <path d="M6.5 17.5 17.5 6.5M9 6.5h8.5V15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        )}
        {name === "rocket" && (
          <>
            <path d="M20.5 3.5c-4.6-.3-8.6 1.7-11.4 5.6L6 9.4 3.5 12l4 1 3.5 3.5 1 4 2.6-2.5.3-3.1c3.9-2.8 5.9-6.8 5.6-11.4zM15 10.6a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z" />
            <path d="M6.8 15.2c-1.6.3-2.8 1.7-3.3 5.3 3.6-.5 5-1.7 5.3-3.3z" opacity=".55" />
          </>
        )}
        {name === "sliders" && (
          <g fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
            <circle cx="14.5" cy="6.5" r="2" fill="var(--sc-num)" />
            <circle cx="9" cy="12" r="2" fill="var(--sc-num)" />
            <circle cx="15" cy="17.5" r="2" fill="var(--sc-num)" />
          </g>
        )}
        {name === "pin" && (
          <>
            <circle cx="10" cy="7" r="4" />
            <path d="M2.5 20.5a7.5 7.5 0 0 1 11.2-6.5A6 6 0 0 0 13 21H3z" />
            <path d="M18 12.5a3.5 3.5 0 0 0-3.5 3.5c0 2.6 3.5 5.5 3.5 5.5s3.5-2.9 3.5-5.5a3.5 3.5 0 0 0-3.5-3.5zm0 4.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />
          </>
        )}
      </svg>
    </span>
  );
}

/** "Before" / "After" pill. */
export function StateTag({ children, tone }: { children: ReactNode; tone: "grey" | "pink" }) {
  return (
    <span
      className={`inline-flex min-w-[120px] items-center justify-center rounded-[10px] px-5 py-2 text-[14px] font-medium tracking-[0.04em] uppercase @min-[640px]:min-w-[170px] ${
        tone === "grey" ? "bg-[#e8e8e8] text-[#3a3a3a]" : "bg-[var(--sc-chip)] text-[var(--sc-red)]"
      }`}
    >
      {children}
    </span>
  );
}
