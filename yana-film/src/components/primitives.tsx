/**
 * YANA's visual vocabulary, built only from the case study's own assets
 * and styles: the illustrated woman and the brain mascot (exact crops of
 * the case study's welcome and splash screens), the purple section
 * heading, and soft organic shapes in the palette. Motion is subtle:
 * fades, gentle rises, slow breathing and drift.
 */
import type { CSSProperties, ReactNode } from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { breathe, ease, mix, prog, settle } from "../motion/ease";
import { color, type } from "../theme/tokens";

export const yanaImage = (name: string) => staticFile(`yana/${name}.webp`);
export const filmAsset = (name: string) => staticFile(`film-assets/${name}.png`);

const fadeWindow = (f: number, enter: number, exit?: number, inDur = 18, outDur = 14) =>
  prog(f, enter, inDur) * (exit === undefined ? 1 : 1 - prog(f, exit, outDur, ease.exit));

/**
 * The welcome screen's illustrated woman, unaltered, on her own lavender:
 * an organic blob in the illustration's sampled background colour, with
 * the crop's edges feathered into it so no rectangle ever shows.
 * Native crop 238×302; `width` stays ≤ ~1.7× that.
 */
export const Woman = ({
  x, y, width = 400, enter = 0, exit, blob = true, style,
}: { x: number; y: number; width?: number; enter?: number; exit?: number; blob?: boolean; style?: CSSProperties }) => {
  const f = useCurrentFrame();
  const a = fadeWindow(f, enter, exit, 22);
  const h = (width * 302) / 238;
  const b = breathe(f);
  return (
    <div style={{ position: "absolute", left: x, top: y, width, height: h, opacity: a, transform: `translateY(${(1 - prog(f, enter, 26)) * 20}px)`, ...style }}>
      {blob && (
        <div style={{
          position: "absolute", left: -width * 0.22, top: -h * 0.12, width: width * 1.44, height: h * 1.22, background: color.lavender,
          borderRadius: `${48 + 4 * Math.sin(f / 50)}% ${52 - 4 * Math.sin(f / 60)}% ${46 + 3 * Math.cos(f / 55)}% ${54}% / ${55}% ${47 + 3 * Math.sin(f / 45)}% ${53}% ${45 + 4 * Math.cos(f / 50)}%`,
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0, transform: `scaleY(${b})`, transformOrigin: "50% 100%",
        WebkitMaskImage: "radial-gradient(ellipse 58% 56% at 50% 52%, #000 74%, transparent 100%)",
      }}>
        <Img src={filmAsset("woman")} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
    </div>
  );
};

/** The splash screen's brain mascot, cut out of its purple. Native 204×190; `width` ≤ ~1.7× that. */
export const Mascot = ({
  x, y, width = 320, enter = 0, exit, bob = true, style,
}: { x: number; y: number; width?: number; enter?: number; exit?: number; bob?: boolean; style?: CSSProperties }) => {
  const f = useCurrentFrame();
  const a = fadeWindow(f, enter, exit, 16);
  const pop = prog(f, enter, 22, ease.enter);
  return (
    <div style={{
      position: "absolute", left: x, top: y, width, opacity: a,
      transform: `translateY(${(bob ? Math.sin((f - enter) / 16) * 4 : 0) + (1 - pop) * 26}px) scale(${mix(pop, 0.86, 1)})`, transformOrigin: "50% 80%",
      filter: "drop-shadow(0 18px 22px rgba(73,64,143,0.18))", ...style,
    }}>
      <Img src={filmAsset("mascot")} style={{ width: "100%", display: "block" }} />
    </div>
  );
};

/** The case study's section heading: purple bar with a soft glow, purple Nunito, fading hairline. */
export const SectionHeading = ({ children, x, y, start, exit }: { children: ReactNode; x: number; y: number; start: number; exit?: number }) => {
  const f = useCurrentFrame();
  const a = fadeWindow(f, start, exit, 14, 10);
  const bar = prog(f, start, 18);
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "center", gap: 16, opacity: a }}>
      <span style={{
        width: 13, height: 96 * bar, borderRadius: "0 999px 999px 0", background: color.purple,
        boxShadow: `0 0 14px rgb(106 74 216 / 22%)`,
      }} />
      <div style={{ ...type.heading, ...settle(f, start + 4, 14, 14), opacity: prog(f, start + 4, 14), whiteSpace: "nowrap" }}>{children}</div>
      <span style={{ position: "absolute", left: 0, bottom: -2, height: 2, width: 150 * bar, background: `linear-gradient(90deg, ${color.purple}, transparent)` }} />
    </div>
  );
};

/** Body copy that settles in. */
export const Copy = ({ children, x, y, width, start, exit, style }: { children: ReactNode; x: number; y: number; width: number; start: number; exit?: number; style?: CSSProperties }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: x, top: y, width, ...type.body, ...settle(f, start, 14), opacity: fadeWindow(f, start, exit, 14, 10), ...style }}>{children}</div>
  );
};

/**
 * A soft organic shape (leaf / pebble / petal) in the case study palette,
 * drifting slowly — the botanical motifs around the woman.
 */
export const Organic = ({
  x, y, size, fill, kind = "leaf", rotate = 0, enter = 0, exit, phase = 0, opacity = 1,
}: { x: number; y: number; size: number; fill: string; kind?: "leaf" | "pebble" | "petal"; rotate?: number; enter?: number; exit?: number; phase?: number; opacity?: number }) => {
  const f = useCurrentFrame();
  const a = fadeWindow(f, enter, exit, 24, 16) * opacity;
  const path = {
    leaf: "M50 4 C82 22 92 58 50 96 C8 58 18 22 50 4 Z",
    pebble: "M18 30 C30 6 74 4 88 28 C100 52 84 92 50 94 C14 96 4 58 18 30 Z",
    petal: "M50 8 C70 8 84 30 78 56 C72 82 58 94 50 94 C42 94 28 82 22 56 C16 30 30 8 50 8 Z",
  }[kind];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{
      position: "absolute", left: x, top: y + Math.sin(f / 38 + phase) * 7, opacity: a,
      transform: `rotate(${rotate + Math.sin(f / 60 + phase) * 4}deg) scale(${mix(prog(f, enter, 28), 0.8, 1)})`,
    }}>
      <path d={path} fill={fill} />
      {kind === "leaf" && <path d="M50 12 C52 40 52 70 50 90" stroke="white" strokeOpacity="0.55" strokeWidth="2.4" fill="none" strokeLinecap="round" />}
    </svg>
  );
};
