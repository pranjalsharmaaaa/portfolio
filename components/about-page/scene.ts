/**
 * Shared geometry for the /about landscape transition. The rear
 * landscape (landscape.tsx) and the cream foreground hill
 * (experience-section.tsx) are separate elements in separate stacking
 * layers, but they're drawn in ONE coordinate system — "scene units",
 * converted to pixels by the CSS custom property `--u` (see
 * about-page.module.css) — so wherever the two overlap, at any
 * viewport width, the foreground curve lands on the rear plants exactly
 * where it was composed to.
 *
 * Both SVGs share the same horizontal extent (SCENE_X0 → SCENE_X1, a
 * little wider than the 0→1440 "design frame" so wide screens never
 * see an edge) and are centred on the page, so x lines up too.
 */

export const SCENE_X0 = -480;
export const SCENE_X1 = 1920;
export const SCENE_W = SCENE_X1 - SCENE_X0;

/** Rear landscape panel height. */
export const LAND_H = 680;
/** Foreground hill box height (sits on top of the Experience section). */
export const WAVE_H = 220;
/**
 * How far the foreground travels across the pinned rear landscape.
 * Before: the cream edge sits at LAND_H - WAVE_H + edge(x). After:
 * REVEAL units higher — the resting composition of the reference.
 */
export const REVEAL = 300;

type Pt = readonly [number, number];

/** A smooth path through `pts` (Catmull-Rom → cubic Béziers). */
export function smoothLine(pts: readonly Pt[]): string {
  const f = (n: number) => +n.toFixed(1);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${f(c1x)},${f(c1y)} ${f(c2x)},${f(c2y)} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

/** A filled band: the smooth top edge, closed down to `bottom`. */
export function hillPath(pts: readonly Pt[], bottom: number): string {
  const last = pts[pts.length - 1];
  return `${smoothLine(pts)} L${last[0]},${bottom} L${pts[0][0]},${bottom} Z`;
}

/** Linear interpolation of a polyline's y at `x` (for plant footing). */
export function yAt(pts: readonly Pt[], x: number): number {
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    if (x >= x1 && x <= x2) {
      const t = (x - x1) / (x2 - x1);
      // Smoothstep matches the eased Catmull-Rom curve closely enough
      // that feet never float visibly above it.
      const s = t * t * (3 - 2 * t);
      return y1 + (y2 - y1) * s;
    }
  }
  return pts[pts.length - 1][1];
}

/**
 * The foreground hill's top edge, in its own box (0 → WAVE_H). Traced
 * from the reference: a low start on the left, a broad crest around
 * x≈460, a valley near x≈940 (where the rear mounds peek over), and a
 * softer rise toward the right.
 */
export const WAVE_EDGE: readonly Pt[] = [
  [-480, 96],
  [-200, 118],
  [0, 105],
  [160, 80],
  [320, 50],
  [460, 40],
  [620, 62],
  [780, 106],
  [940, 132],
  [1080, 120],
  [1200, 96],
  [1310, 84],
  [1440, 100],
  [1680, 122],
  [1920, 100],
];

/** Ground the rear plants stand on (rear panel coordinates). */
export const GROUND_A: readonly Pt[] = [
  [-480, 290],
  [-200, 296],
  [0, 284],
  [300, 272],
  [600, 286],
  [940, 302],
  [1250, 282],
  [1440, 292],
  [1700, 280],
  [1920, 290],
];

/** A nearer, lower rear ridge — the first thing the cream covers. */
export const GROUND_B: readonly Pt[] = [
  [-480, 432],
  [-150, 418],
  [150, 410],
  [500, 446],
  [850, 420],
  [1200, 442],
  [1500, 418],
  [1920, 432],
];

/** Faint far ridge behind everything. */
export const FAR_RIDGE: readonly Pt[] = [
  [-480, 250],
  [-100, 236],
  [200, 226],
  [700, 254],
  [1100, 216],
  [1500, 246],
  [1920, 232],
];
