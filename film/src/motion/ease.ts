/**
 * The film's motion vocabulary. Everything eases; nothing bounces
 * (the single exception is the "?" pop in S3).
 */
import { Easing, interpolate } from "remotion";

export const ease = {
  enter: Easing.bezier(0.22, 1, 0.36, 1),
  exit: Easing.bezier(0.64, 0, 0.78, 0),
  camera: Easing.inOut(Easing.sin),
  linear: Easing.linear,
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0→1 progress between two frames with an easing curve. */
export const prog = (frame: number, start: number, dur: number, easing = ease.enter) =>
  interpolate(frame, [start, start + Math.max(dur, 1)], [0, 1], { ...clamp, easing });

/** Map progress onto a range. */
export const mix = (p: number, a: number, b: number) => a + (b - a) * p;

/** Words "settle": 12px rise + fade. Returns a style fragment. */
export const settle = (frame: number, start: number, dur = 12, rise = 12) => {
  const p = prog(frame, start, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * rise}px)` };
};

/** Fade in at `start`, optionally fade out at `end`. */
export const fadeInOut = (frame: number, start: number, end?: number, dur = 10) => {
  const a = prog(frame, start, dur);
  const b = end === undefined ? 1 : 1 - prog(frame, end, dur, ease.exit);
  return Math.min(a, b);
};

/** A point along a quadratic arc — used for coins flying between objects. */
export const arc = (
  p: number,
  from: { x: number; y: number },
  to: { x: number; y: number },
  lift = 160,
) => {
  const cx = (from.x + to.x) / 2;
  const cy = Math.min(from.y, to.y) - lift;
  const x = (1 - p) ** 2 * from.x + 2 * (1 - p) * p * cx + p ** 2 * to.x;
  const y = (1 - p) ** 2 * from.y + 2 * (1 - p) * p * cy + p ** 2 * to.y;
  return { x, y };
};

/** Gentle breathing for characters: ±1.2% vertical scale on a 4s loop. */
export const breathe = (frame: number, phase = 0) => 1 + 0.012 * Math.sin((frame / 120) * Math.PI * 2 + phase);
