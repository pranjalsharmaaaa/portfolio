import type { CSSProperties, ReactNode } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { mix, prog, settle } from "../motion/ease";
import { badgeGradient, color, type } from "../theme/tokens";

export const scImage = (name: string) => staticFile(`sc/images/${name}.webp`);
export const filmAsset = (name: string) => staticFile(`film-assets/${name}.png`);

/**
 * One of the case study's ORIGINAL illustrations, unaltered, with subtle
 * motion only: an entrance (fade + rise), an optional slow push-in or
 * drift, and an exit. `multiply` melts near-white backgrounds (the
 * step-* illustrations) into the page colour, as on the portfolio.
 */
export const Illus = ({
  src, x, y, width, enter = 0, exit, push = 0, pushFrom = 0, pushDur = 240, drift = 0, origin = "50% 50%", multiply = false, style,
}: {
  src: string; x: number; y: number; width: number; enter?: number; exit?: number; push?: number; pushFrom?: number; pushDur?: number;
  drift?: number; origin?: string; multiply?: boolean; style?: CSSProperties;
}) => {
  const f = useCurrentFrame();
  const a = prog(f, enter, 18);
  const z = exit === undefined ? 0 : prog(f, exit, 14);
  const scale = 1 + push * prog(f, pushFrom, pushDur, (t) => t) ;
  const dy = drift * Math.sin(f / 45);
  return (
    <div style={{
      position: "absolute", left: x, top: y, width, opacity: a * (1 - z),
      transform: `translateY(${(1 - a) * 24 + dy}px) scale(${scale})`, transformOrigin: origin,
      mixBlendMode: multiply ? "multiply" : undefined, ...style,
    }}>
      <Img src={src} style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
};

export const Eyebrow = ({ children, x, y, start, exit }: { children: ReactNode; x: number; y: number; start: number; exit?: number }) => {
  const f = useCurrentFrame();
  const z = exit === undefined ? 0 : prog(f, exit, 10);
  return <div style={{ position: "absolute", left: x, top: y, ...type.eyebrow, ...settle(f, start), opacity: prog(f, start, 12) * (1 - z) }}>{children}</div>;
};

/** The case study's SectionTitle: Inter medium, tight tracking, accent in Airtel red. */
export const Title = ({
  plain, accent, x, y, start, exit, width = 760, size = type.title.fontSize, align = "left",
}: { plain: string; accent?: string; x: number; y: number; start: number; exit?: number; width?: number; size?: number; align?: "left" | "center" }) => {
  const f = useCurrentFrame();
  const z = exit === undefined ? 0 : prog(f, exit, 10);
  return (
    <div style={{
      position: "absolute", left: align === "center" ? x - width / 2 : x, top: y, width, textAlign: align,
      ...type.title, fontSize: size, lineHeight: `${Math.round(size * 1.13)}px`, ...settle(f, start, 16, 16), opacity: prog(f, start, 16) * (1 - z),
    }}>
      {plain}
      {accent ? <span style={{ color: color.red }}>{accent}</span> : null}
    </div>
  );
};

/** The cover's title badge. */
export const Badge = ({ children, size = 48 }: { children: ReactNode; size?: number }) => (
  <div style={{
    display: "inline-block", borderRadius: size * 0.42, background: badgeGradient, color: "white", fontWeight: 500,
    fontSize: size, lineHeight: 1.2, letterSpacing: "-0.01em", padding: `${size * 0.22}px ${size * 0.55}px`,
    boxShadow: "0 18px 40px -14px rgba(80,0,0,0.55)",
  }}>{children}</div>
);

/** Rounded pill, like the case study's callouts. */
export const Pill = ({ children, tone = "pink", style }: { children: ReactNode; tone?: "pink" | "white"; style?: CSSProperties }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 10, borderRadius: 999, padding: "12px 22px",
    background: tone === "pink" ? color.pink : "white", color: color.ink, fontSize: 24, fontWeight: 500, whiteSpace: "nowrap",
    boxShadow: tone === "white" ? "0 10px 24px -14px rgba(0,0,0,0.35)" : undefined, ...style,
  }}>{children}</div>
);

/** A cropped card layer that floats gently (Scene 1 information panels). */
export const FloatCard = ({ name, x, y, width, at, phase = 0, exit }: { name: string; x: number; y: number; width: number; at: number; phase?: number; exit?: number }) => {
  const f = useCurrentFrame();
  const a = prog(f, at, 16);
  const z = exit === undefined ? 0 : prog(f, exit, 12);
  return (
    <div style={{
      position: "absolute", left: x, top: y + Math.sin(f / 40 + phase) * 6 + (1 - a) * 20, width, opacity: a * (1 - z),
      transform: `scale(${mix(a, 0.94, 1)})`, mixBlendMode: "multiply",
      WebkitMaskImage: "radial-gradient(ellipse 72% 78% at 50% 50%, #000 70%, transparent 100%)",
    }}>
      <Img src={filmAsset(name)} style={{ width: "100%", display: "block" }} />
    </div>
  );
};
