import type { CSSProperties, ReactNode } from "react";
import localFont from "next/font/local";
import type { RichLine } from "@/lib/stackup-content";
import styles from "@/components/stackup/slide.module.css";

/**
 * Inter (variable, Latin subset — the same file next/font/google serves
 * for the site-wide Inter) under its own family name, so the research
 * screens get the true 700/800 weights their Figma frames use. Next 16
 * names a local font's family after this const, which is why it's
 * deliberately specific.
 *
 * It must NOT be a second `next/font/google` Inter: Next 16 names every
 * Google instance plain "Inter", so extra weights loaded on this route
 * would merge into the site-wide family and change how `font-bold`
 * renders on Stack Up screens 1-10 (which today resolve it to 600, the
 * heaviest weight app/layout.tsx loads).
 */
const stackUpResearchInter = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  weight: "100 900",
  display: "swap",
});

export { styles as slide };

/**
 * Frame geometry (CSS px at 1440x810) as the custom properties
 * slide.module.css reads. `f` is the element's share (0-1) of any spare
 * width on canvases wider than the frame — see slide.module.css.
 */
export function at(geometry: { x?: number; y?: number; w?: number; h?: number; fs?: number; lh?: number; f?: number }): CSSProperties {
  const style: Record<string, number> = {};
  if (geometry.x !== undefined) style["--x"] = geometry.x;
  if (geometry.y !== undefined) style["--y"] = geometry.y;
  if (geometry.w !== undefined) style["--w"] = geometry.w;
  if (geometry.h !== undefined) style["--h"] = geometry.h;
  if (geometry.fs !== undefined) style["--fs"] = geometry.fs;
  if (geometry.lh !== undefined) style["--lh"] = geometry.lh;
  if (geometry.f !== undefined) style["--f"] = geometry.f;
  return style as CSSProperties;
}

/**
 * One research screen: the <section> (a size container in the
 * page-stack, a normal padded block elsewhere) and its 1440x810 frame.
 * `flowClassName` is the section's own phone/flow-mode spacing.
 */
export function Slide({
  label,
  corner = false,
  flowClassName = "py-10 @min-[640px]:py-14",
  children,
}: {
  label: string;
  corner?: boolean;
  flowClassName?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className={`relative overflow-clip ${flowClassName} ${stackUpResearchInter.className} ${styles.screen}`}
      style={{ background: "var(--stackup-bg)" }}
    >
      {corner ? <Corner /> : null}
      <div className={`relative ${styles.frame}`}>{children}</div>
    </section>
  );
}

/** The two-tone bottom-right corner rings shared by several screens. */
function Corner() {
  return (
    <>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 bottom-0 h-32 w-32 translate-x-1/2 translate-y-1/2 rounded-full ${styles.cornerOuter}`}
        style={{ background: "#3a3a3a" }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 bottom-0 h-24 w-24 translate-x-1/2 translate-y-1/2 rounded-full ${styles.cornerInner}`}
        style={{ background: "var(--stackup-green)" }}
      />
    </>
  );
}

/**
 * Text set as the PDF's own lines: each line is one block, unbroken, in
 * the slide; in flow mode the lines are inline and wrap naturally.
 */
export function Lines({ lines }: { lines: readonly RichLine[] }) {
  return lines.map((line, i) => (
    <span key={i}>
      <span className={styles.line}>
        {line.map((segment, j) => (
          <span
            key={j}
            className={segment.bold ? "font-bold" : undefined}
            style={segment.accent ? { color: "var(--stackup-green)" } : undefined}
          >
            {segment.text}
          </span>
        ))}
      </span>
      {i < lines.length - 1 ? " " : null}
    </span>
  ));
}
