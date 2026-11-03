/**
 * The phone — an object in the same world as the character. Shows REAL
 * Stack Up screenshots only (bezel is part of the screenshot). The only
 * overlays allowed are a tap ripple and a highlight ring on elements that
 * already exist on the screen; screen content is never altered.
 */
import { Img, useCurrentFrame } from "remotion";
import { screen, SCREEN_H, SCREEN_W } from "../assets";
import { mix, prog } from "../motion/ease";
import { color } from "../theme/tokens";

export const PHONE_H = 780;
export const PHONE_W = (PHONE_H * SCREEN_W) / SCREEN_H;
export const PHONE_TOP = 110;

export type ScreenStep = { at: number; name: string };
export type Ripple = { at: number; u: number; v: number };
export type Ring = { at: number; until: number; u: number; v: number; w: number; h: number };

/** Map a point on the screen image (0–1) to stage coordinates. */
export const screenPoint = (cx: number, u: number, v: number, height = PHONE_H, top = PHONE_TOP) => {
  const w = (height * SCREEN_W) / SCREEN_H;
  return { x: cx - w / 2 + u * w, y: top + v * height };
};

export const Phone = ({
  cx, screens, ripples = [], rings = [], height = PHONE_H, top = PHONE_TOP, opacity = 1, rotate = 0, scale = 1,
}: {
  cx: number; screens: ScreenStep[]; ripples?: Ripple[]; rings?: Ring[]; height?: number; top?: number;
  opacity?: number; rotate?: number; scale?: number;
}) => {
  const frame = useCurrentFrame();
  const w = (height * SCREEN_W) / SCREEN_H;
  return (
    <div style={{
      position: "absolute", left: cx - w / 2, top, width: w, height, opacity,
      transform: `rotate(${rotate}deg) scale(${scale})`, transformOrigin: "50% 60%",
      filter: "drop-shadow(0 28px 36px rgb(20 30 20 / 22%))",
    }}>
      {screens.map((s, i) => {
        const next = screens[i + 1];
        const o = (i === 0 ? 1 : prog(frame, s.at, 8)) * (next ? 1 - prog(frame, next.at + 8, 1) : 1);
        if (o <= 0.001) return null;
        return <Img key={s.name + i} src={screen(s.name)} style={{ position: "absolute", inset: 0, width: w, height, opacity: o }} />;
      })}
      {rings.map((r, i) => {
        const o = Math.min(prog(frame, r.at, 8), 1 - prog(frame, r.until, 8));
        if (o <= 0) return null;
        return (
          <div key={`r${i}`} style={{
            position: "absolute", left: (r.u - r.w / 2) * w, top: (r.v - r.h / 2) * height, width: r.w * w, height: r.h * height,
            borderRadius: 14, border: `3px solid ${color.brand}`, opacity: o,
            transform: `scale(${mix(prog(frame, r.at, 10), 1.12, 1)})`,
          }} />
        );
      })}
      {ripples.map((r, i) => {
        const p = prog(frame, r.at, 16);
        if (p <= 0 || p >= 1) return null;
        return (
          <div key={`t${i}`} style={{
            position: "absolute", left: r.u * w - 30, top: r.v * height - 30, width: 60, height: 60, borderRadius: "50%",
            background: color.olive, opacity: 0.45 * (1 - p), transform: `scale(${0.4 + p * 1.2})`,
          }} />
        );
      })}
    </div>
  );
};
