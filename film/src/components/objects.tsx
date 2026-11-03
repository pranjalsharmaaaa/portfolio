/**
 * Vector financial objects that have to animate (coins, the Confidence
 * Jar fill, the Stack Up mark). Drawn in the illustrations' language:
 * 2.5px ink outline, flat fills, no gradients.
 */
import type { CSSProperties } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { color } from "../theme/tokens";

const OUT = 2.5;

/** One coin (the film's motif), drawn as a short cylinder seen slightly from above. */
export const Coin = ({ size = 96, style }: { size?: number; style?: CSSProperties }) => {
  const w = size, h = size * 0.42, t = size * 0.13;
  return (
    <svg width={w + 6} height={h + t + 6} viewBox={`-3 -3 ${w + 6} ${h + t + 6}`} style={{ display: "block", overflow: "visible", ...style }}>
      <path d={`M0 ${h / 2} v${t} A${w / 2} ${h / 2} 0 0 0 ${w} ${h / 2 + t} v${-t}`} fill={color.coinSide} stroke={color.ink} strokeWidth={OUT} />
      <ellipse cx={w / 2} cy={h / 2} rx={w / 2} ry={h / 2} fill={color.coinFace} stroke={color.ink} strokeWidth={OUT} />
      <ellipse cx={w / 2} cy={h / 2} rx={w / 2 - w * 0.14} ry={h / 2 - h * 0.16} fill="none" stroke={color.coinSide} strokeWidth={2} />
      <text x={w / 2} y={h / 2 + h * 0.2} textAnchor="middle" fontSize={h * 0.62} fontWeight={700} fill={color.coinGlyph} fontFamily="Inter">₹</text>
    </svg>
  );
};

/**
 * A stack of `count` coins, bottom-centre anchored at (x, y). Coins
 * that arrive after `dropFrom` fall in with a damped spring (no overshoot
 * above 4px). `count` can change over time — the stack simply shrinks.
 */
export const CoinStack = ({
  x, y, count, size = 96, dropFrom, dropStagger = 3, opacity = 1,
}: { x: number; y: number; count: number; size?: number; dropFrom?: number; dropStagger?: number; opacity?: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const step = size * 0.16;
  const coinH = size * 0.42 + size * 0.13 + 6;
  return (
    <div style={{ position: "absolute", left: x - (size + 6) / 2, top: 0, opacity }}>
      {Array.from({ length: Math.max(0, Math.round(count)) }).map((_, i) => {
        let dy = 0, o = 1;
        if (dropFrom !== undefined) {
          const s = spring({ frame: frame - dropFrom - i * dropStagger, fps, config: { damping: 18, stiffness: 140 } });
          dy = (1 - s) * -260;
          o = Math.min(1, s * 3);
        }
        return <Coin key={i} size={size} style={{ position: "absolute", top: y - coinH - i * step + dy, opacity: o }} />;
      })}
    </div>
  );
};

/**
 * The Confidence Jar as a vector, so it can fill from 0%. Styled after
 * the product's cream lid / glass body / sage coins render.
 */
export const ConfidenceJar = ({ fill, height = 280, label }: { fill: number; height?: number; label?: string }) => {
  const w = height * 0.78;
  const bodyTop = height * 0.26, bodyBottom = height * 0.97;
  const inner = bodyBottom - bodyTop - 14;
  const level = bodyBottom - 8 - inner * Math.min(Math.max(fill, 0), 1);
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <clipPath id={`jar-${height}`}>
          <rect x={10} y={bodyTop + 4} width={w - 20} height={bodyBottom - bodyTop - 10} rx={height * 0.09} />
        </clipPath>
      </defs>
      <rect x={6} y={bodyTop} width={w - 12} height={bodyBottom - bodyTop} rx={height * 0.1} fill="#f4f6ee" stroke={color.ink} strokeWidth={OUT} />
      <rect x={0} y={level} width={w} height={height} fill={color.coinSide} opacity={0.85} clipPath={`url(#jar-${height})`} />
      <rect x={w * 0.14} y={bodyTop - height * 0.06} width={w * 0.72} height={height * 0.07} rx={6} fill="#dfe5cf" stroke={color.ink} strokeWidth={OUT} />
      <rect x={w * 0.1} y={height * 0.06} width={w * 0.8} height={height * 0.15} rx={height * 0.05} fill="#f3eedd" stroke={color.ink} strokeWidth={OUT} />
      {label ? (
        <text x={w / 2} y={bodyTop + (bodyBottom - bodyTop) * 0.42} textAnchor="middle" fontFamily="Inter" fontWeight={700} fontSize={height * 0.15} fill={color.deep}>{label}</text>
      ) : null}
    </svg>
  );
};

/**
 * The Stack Up mark rebuilt as vector from logo.webp: four right-aligned
 * bars, bottom widest, plus the two-tone "stack / up" wordmark.
 * `build` (0→1) grows the bars bottom→top; `word` fades the wordmark.
 */
export const StackMark = ({ size = 1, build = 1, word = 1, wordOnly = false }: { size?: number; build?: number; word?: number; wordOnly?: boolean }) => {
  const bars = [
    { w: 180, x: 0 }, { w: 145, x: 50 }, { w: 105, x: 100 }, { w: 58, x: 150 },
  ];
  const h = 48, gap = 14;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 40 * size }}>
      {!wordOnly && (
        <svg width={210 * size} height={(4 * h + 3 * gap) * size} viewBox={`0 0 210 ${4 * h + 3 * gap}`}>
          {bars.map((b, i) => {
            const p = Math.min(Math.max(build * 4 - i, 0), 1);
            const y = (3 - i) * (h + gap);
            return <rect key={i} x={208 - b.w} y={y + (1 - p) * 30} width={b.w} height={h} rx={10} fill={color.logo[i]} opacity={p} />;
          })}
        </svg>
      )}
      <div style={{ opacity: word, fontWeight: 700, fontSize: 128 * size, lineHeight: `${108 * size}px`, letterSpacing: "-0.03em" }}>
        <div style={{ color: color.logoInk }}>stack</div>
        <div style={{ color: color.logoUp }}>up</div>
      </div>
    </div>
  );
};

/** Simple line icons for the two notifications the asset kit doesn't cover. */
export const LineIcon = ({ kind, size = 40 }: { kind: "calendar" | "repeat" | "receipt" | "home" | "bolt" | "cart" | "bus"; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke={color.ink} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    {kind === "calendar" && (<><rect x={5} y={8} width={30} height={27} rx={5} fill={color.tint} /><path d="M5 16h30M13 4v8M27 4v8" /><text x={20} y={31} fontSize={11} textAnchor="middle" fill={color.ink} stroke="none" fontWeight={700} fontFamily="Inter">EMI</text></>)}
    {kind === "repeat" && (<><path d="M8 18a12 12 0 0 1 21-7l3 3M32 22a12 12 0 0 1-21 7l-3-3" /><path d="M32 6v8h-8M8 34v-8h8" /></>)}
    {kind === "home" && (<><path d="M6 19 20 7l14 12" /><path d="M10 16v18h20V16" fill={color.tint} /><path d="M17 34v-9h6v9" /></>)}
    {kind === "bolt" && (<path d="M23 4 9 22h10l-3 14 15-19H21z" fill={color.tint} />)}
    {kind === "cart" && (<><path d="M4 7h5l4 18h18l4-13H11" /><circle cx={15} cy={32} r={2.5} /><circle cx={28} cy={32} r={2.5} /></>)}
    {kind === "bus" && (<><rect x={8} y={5} width={24} height={26} rx={5} fill={color.tint} /><path d="M8 18h24M13 31v4M27 31v4" /><circle cx={14} cy={25} r={1.5} /><circle cx={26} cy={25} r={1.5} /></>)}
    {kind === "receipt" && (<><path d="M9 4h22v32l-4-3-4 3-3-3-4 3-3-3-4 3z" fill={color.tint} /><path d="M14 13h12M14 19h12M14 25h7" /></>)}
  </svg>
);
