/**
 * The case study's REAL product screens, never redrawn.
 *
 * - PhoneImage: the final Sales Coach renders (phone-*.webp, 800×1650,
 *   maroon device frame included).
 * - PhoneVideo: the case study's two recordings inside PhoneShell — a CSS
 *   port of components/sales-coach/demo-video.tsx's PhoneShell, measured
 *   off those same renders, so a video phone and an image phone of the same
 *   width are the same phone (they can dissolve into each other).
 * - Overlays are limited to a tap ripple and a highlight ring placed on
 *   elements that really exist on the screen.
 */
import type { ReactNode } from "react";
import { Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { mix, prog } from "../motion/ease";
import { color } from "../theme/tokens";
import { scImage } from "./primitives";

export const PHONE_W = 400;
const RENDER_RATIO = 1650 / 800;

export type Ripple = { at: number; u: number; v: number };
export type Ring = { at: number; until: number; u: number; v: number; w: number; h: number };

const Overlays = ({ w, h, ripples = [], rings = [] }: { w: number; h: number; ripples?: Ripple[]; rings?: Ring[] }) => {
  const f = useCurrentFrame();
  return (
    <>
      {rings.map((r, i) => {
        const o = Math.min(prog(f, r.at, 8), 1 - prog(f, r.until, 8));
        if (o <= 0) return null;
        return (
          <div key={`r${i}`} style={{
            position: "absolute", left: (r.u - r.w / 2) * w, top: (r.v - r.h / 2) * h, width: r.w * w, height: r.h * h,
            borderRadius: 16, border: `3px solid ${color.redBright}`, opacity: o, boxShadow: "0 0 0 6px rgb(238 17 51 / 12%)",
            transform: `scale(${mix(prog(f, r.at, 10), 1.1, 1)})`,
          }} />
        );
      })}
      {ripples.map((r, i) => {
        const p = prog(f, r.at, 18);
        if (p <= 0 || p >= 1) return null;
        return (
          <div key={`t${i}`} style={{
            position: "absolute", left: r.u * w - 28, top: r.v * h - 28, width: 56, height: 56, borderRadius: "50%",
            background: color.red, opacity: 0.35 * (1 - p), transform: `scale(${0.4 + p * 1.3})`,
          }} />
        );
      })}
    </>
  );
};

/** Cross-dissolving sequence of real phone renders. */
export const PhoneImage = ({
  cx, top, screens, width = PHONE_W, opacity = 1, scale = 1, origin = "50% 50%", ripples, rings,
}: {
  cx: number; top: number; screens: { at: number; name: string }[]; width?: number; opacity?: number; scale?: number; origin?: string;
  ripples?: Ripple[]; rings?: Ring[];
}) => {
  const f = useCurrentFrame();
  const h = width * RENDER_RATIO;
  return (
    <div style={{
      position: "absolute", left: cx - width / 2, top, width, height: h, opacity, transform: `scale(${scale})`, transformOrigin: origin,
      filter: "drop-shadow(0 24px 32px rgba(60,10,20,0.18))",
    }}>
      {screens.map((s, i) => {
        const next = screens[i + 1];
        const o = (i === 0 ? 1 : prog(f, s.at, 10)) * (next ? 1 - prog(f, next.at + 10, 1) : 1);
        if (o <= 0.001) return null;
        return <Img key={s.name + i} src={scImage(s.name)} style={{ position: "absolute", inset: 0, width, height: h, opacity: o }} />;
      })}
      <Overlays w={width} h={h} ripples={ripples} rings={rings} />
    </div>
  );
};

/** demo-video.tsx's PhoneShell, ported 1:1 (sizes in cqw of the wrapper). */
const PhoneShell = ({ aspect, children }: { aspect: string; children: ReactNode }) => (
  <div style={{ containerType: "inline-size", width: "100%", filter: "drop-shadow(0 24px 32px rgba(60,10,20,0.18))" }}>
    <div style={{ padding: "0 0.625cqw" }}>
      <div style={{
        borderRadius: "17.9cqw", padding: "2cqw", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        background: "linear-gradient(90deg,#352020 0%,#986972 1.4%,#4f2e35 2.6%,#3a2226 12%,#3a2226 88%,#4f2e35 97.4%,#986972 98.6%,#352020 100%)",
      }}>
        <div style={{ borderRadius: "15.9cqw", background: "#050505", padding: "1.625cqw" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: "14.4cqw", background: "white", aspectRatio: aspect }}>{children}</div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * A case-study recording in the phone, played from `clips` (segments of
 * the source, in source seconds), muted — the narration carries the sound.
 */
export const PhoneVideo = ({
  cx, top, src, aspect, clips, width = PHONE_W, opacity = 1, scale = 1,
}: {
  cx: number; top: number; src: string; aspect: string; clips: { at: number; fromSec: number; frames: number }[]; width?: number; opacity?: number; scale?: number;
}) => (
  <div style={{ position: "absolute", left: cx - width / 2, top, width, opacity, transform: `scale(${scale})` }}>
    <PhoneShell aspect={aspect}>
      {clips.map((c, i) => (
        <Sequence key={i} from={c.at} durationInFrames={c.frames} layout="none">
          <OffthreadVideo src={staticFile(src)} trimBefore={Math.round(c.fromSec * 30)} muted
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }} />
        </Sequence>
      ))}
    </PhoneShell>
  </div>
);
