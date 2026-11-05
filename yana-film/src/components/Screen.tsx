/**
 * The case study's REAL product screens (public/images/yana/screen-*.webp),
 * never redrawn — each file already carries its own phone frame. Screens
 * cross-dissolve inside one box; the only overlay is a soft tap ripple,
 * placed on elements that really exist on that screen (u, v are 0–1 of
 * the screen image).
 */
import { Img, useCurrentFrame } from "remotion";
import { prog } from "../motion/ease";
import { color } from "../theme/tokens";
import { yanaImage } from "./primitives";

/** Native sizes of the screens used (px). */
export const SIZES: Record<string, [number, number]> = {
  "screen-onboarding-welcome": [283, 649],
  "screen-onboarding-feeling": [249, 571],
  "screen-onboarding-areas": [245, 563],
  "screen-onboarding-allset": [233, 539],
  "screen-journal-snapshot": [254, 575],
  "screen-home-mood-relaxer": [840, 1732],
  "screen-home-express": [840, 1732],
  "screen-home-feed": [840, 1736],
  "screen-journal-calendar": [840, 1736],
  "screen-journal-entry": [840, 1736],
  "screen-journal-minis": [840, 1736],
  "screen-therapy-style": [840, 1736],
  "screen-therapy-suggested": [840, 1736],
  "screen-therapy-group": [840, 1736],
};

export const screenWidth = (name: string, height: number) => (height * SIZES[name][0]) / SIZES[name][1];

export type Tap = { at: number; u: number; v: number };

/** Plays a tap: a soft purple ripple. */
const Ripple = ({ tap, w, h }: { tap: Tap; w: number; h: number }) => {
  const f = useCurrentFrame();
  const p = prog(f, tap.at, 20);
  if (p <= 0 || p >= 1) return null;
  return (
    <div style={{
      position: "absolute", left: tap.u * w - 30, top: tap.v * h - 30, width: 60, height: 60, borderRadius: "50%",
      background: color.purple, opacity: 0.32 * (1 - p), transform: `scale(${0.35 + p * 1.4})`,
    }} />
  );
};

/** A sequence of real screens at a fixed height, cross-dissolving; centred on cx. */
export const Screens = ({
  cx, top, height, screens, taps = [], opacity = 1, scale = 1, dissolve = 12,
}: {
  cx: number; top: number; height: number; screens: { at: number; name: string }[]; taps?: Tap[]; opacity?: number; scale?: number; dissolve?: number;
}) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: cx, top, opacity, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "50% 50%" }}>
      {screens.map((s, i) => {
        const next = screens[i + 1];
        const o = (i === 0 ? 1 : prog(f, s.at, dissolve)) * (next ? 1 - prog(f, next.at + dissolve, 1) : 1);
        if (o <= 0.001) return null;
        const w = screenWidth(s.name, height);
        return (
          <div key={s.name + i} style={{
            position: i === 0 ? "relative" : "absolute", left: i === 0 ? undefined : "50%", top: 0, width: w, height,
            marginLeft: i === 0 ? undefined : -w / 2, opacity: o, filter: "drop-shadow(0 26px 34px rgba(73,64,143,0.20))",
          }}>
            <Img src={yanaImage(s.name)} style={{ width: "100%", height: "100%", display: "block" }} />
            {taps.filter((t) => t.at >= s.at && (!next || t.at < next.at)).map((t, k) => <Ripple key={k} tap={t} w={w} h={height} />)}
          </div>
        );
      })}
    </div>
  );
};

/** One still screen with an entrance (fade + rise) and optional exit. */
export const Still = ({
  name, cx, top, height, enter, exit, taps = [], style,
}: { name: string; cx: number; top: number; height: number; enter: number; exit?: number; taps?: Tap[]; style?: React.CSSProperties }) => {
  const f = useCurrentFrame();
  const a = prog(f, enter, 18) * (exit === undefined ? 1 : 1 - prog(f, exit, 12));
  const w = screenWidth(name, height);
  return (
    <div style={{
      position: "absolute", left: cx - w / 2, top: top + (1 - prog(f, enter, 22)) * 36, width: w, height, opacity: a,
      filter: "drop-shadow(0 26px 34px rgba(73,64,143,0.20))", ...style,
    }}>
      <Img src={yanaImage(name)} style={{ width: "100%", height: "100%", display: "block" }} />
      {taps.map((t, k) => <Ripple key={k} tap={t} w={w} h={height} />)}
    </div>
  );
};
