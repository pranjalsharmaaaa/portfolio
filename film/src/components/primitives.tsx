import type { CSSProperties, ReactNode } from "react";
import { Img, useCurrentFrame } from "remotion";
import { filmAsset, HEAD_PX, POSES, type PoseName } from "../assets";
import { breathe, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";

type Anchor = "center" | "bottom" | "top-left" | "left";

/** Absolutely positions children at (x, y) with a chosen anchor point. */
export const At = ({
  x, y, anchor = "center", style, children,
}: { x: number; y: number; anchor?: Anchor; style?: CSSProperties; children: ReactNode }) => {
  const t = {
    center: "translate(-50%, -50%)",
    bottom: "translate(-50%, -100%)",
    "top-left": "none",
    left: "translate(0, -50%)",
  }[anchor];
  return (
    <div style={{ position: "absolute", left: x, top: y, ...style, transform: `${t} ${style?.transform ?? ""}` }}>
      {children}
    </div>
  );
};

/** A film asset (PNG) positioned by its bottom-centre on the ground or anywhere. */
export const Asset = ({
  name, x, y = stage.groundY, height, opacity = 1, scale = 1, rotate = 0, anchor = "bottom", style,
}: {
  name: string; x: number; y?: number; height: number; opacity?: number; scale?: number;
  rotate?: number; anchor?: Anchor; style?: CSSProperties;
}) => (
  <At x={x} y={y} anchor={anchor} style={{ opacity, transform: `scale(${scale}) rotate(${rotate}deg)`, transformOrigin: "50% 100%", ...style }}>
    <Img src={filmAsset(name)} style={{ height, display: "block" }} />
  </At>
);

/**
 * The character. `poses` is a schedule of pose swaps (local frames); swaps
 * dissolve over 5 frames so the person never "pops". Every pose is
 * normalised to the same head size, then multiplied by `scale`.
 */
export const Character = ({
  poses, x, y = stage.groundY, scale = 1, enter = 0, exit, flip = false,
}: {
  poses: { at: number; pose: PoseName }[]; x: number; y?: number; scale?: number;
  enter?: number; exit?: number; flip?: boolean;
}) => {
  const frame = useCurrentFrame();
  const appear = prog(frame, enter, 12);
  const leave = exit === undefined ? 0 : prog(frame, exit, 10);
  const groupOpacity = appear * (1 - leave);
  const lift = (1 - appear) * 16;
  return (
    <>
      {poses.map((p, i) => {
        const next = poses[i + 1];
        const fadeIn = i === 0 ? 1 : prog(frame, p.at, 5);
        const fadeOut = next ? prog(frame, next.at, 5) : 0;
        const o = fadeIn * (1 - fadeOut);
        if (o <= 0.001) return null;
        const meta = POSES[p.pose];
        const h = meta.h * (HEAD_PX / meta.head) * scale;
        return (
          <At key={i} x={x} y={y + lift} anchor="bottom"
            style={{ opacity: o * groupOpacity, transform: `scaleX(${flip ? -1 : 1}) scaleY(${breathe(frame, x)})`, transformOrigin: "50% 100%" }}>
            <Img src={filmAsset(meta.file)} style={{ height: h, display: "block" }} />
          </At>
        );
      })}
    </>
  );
};

/** SVG path that draws itself on (stroke-dashoffset), the film's "hand". */
export const Stroke = ({
  d, start, dur = 18, width = 3, stroke = color.ink, viewBox = "0 0 1920 1080", style, dash, frame: frameOverride,
}: {
  d: string; start: number; dur?: number; width?: number; stroke?: string; viewBox?: string;
  style?: CSSProperties; dash?: string; /** drive from another clock (e.g. a shared component replayed in a later scene) */ frame?: number;
}) => {
  const current = useCurrentFrame();
  const frame = frameOverride ?? current;
  const p = prog(frame, start, dur);
  return (
    <svg viewBox={viewBox} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", ...style }}>
      {dash ? (
        <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash}
          style={{ clipPath: `inset(0 ${100 - p * 100}% 0 0)` }} />
      ) : (
        <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      )}
    </svg>
  );
};

/** Rounded notification / label pill. */
export const Chip = ({
  children, bg = color.card, fg = color.ink, border = true, style,
}: { children: ReactNode; bg?: string; fg?: string; border?: boolean; style?: CSSProperties }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 24px", borderRadius: 18,
    background: bg, color: fg, fontSize: 24, fontWeight: 500, whiteSpace: "nowrap",
    boxShadow: border ? "0 10px 24px rgb(38 38 38 / 8%), 0 0 0 1.5px rgb(38 38 38 / 10%)" : undefined, ...style,
  }}>{children}</div>
);

/** Soft contact shadow where an object meets the ground line. */
export const SoftShadow = ({ x, w, opacity = 0.18 }: { x: number; w: number; opacity?: number }) => (
  <div style={{
    position: "absolute", left: x - w / 2, top: stage.groundY - 6, width: w, height: 12, borderRadius: "50%",
    background: `radial-gradient(closest-side, rgb(38 38 38 / ${opacity}), transparent)`,
  }} />
);
