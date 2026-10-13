import { Mounds, Planted, Sprig, Tuft } from "@/components/about-page/botanicals";
import {
  FAR_RIDGE,
  GROUND_A,
  GROUND_B,
  LAND_H,
  SCENE_W,
  SCENE_X0,
  hillPath,
  yAt,
} from "@/components/about-page/scene";
import styles from "./about-page.module.css";

/** Rear plants on the main ground line, left to right. */
const REAR_PLANTS: { x: number; kind: "sprig" | "tuft"; h: number; lean?: number; sway: number; phase: number }[] = [
  { x: -260, kind: "tuft", h: 150, sway: 7.4, phase: 1.2 },
  { x: 40, kind: "tuft", h: 120, sway: 6.8, phase: 0.3 },
  { x: 330, kind: "sprig", h: 200, lean: -7, sway: 8.2, phase: 2.4 },
  { x: 420, kind: "sprig", h: 244, lean: 3, sway: 7.6, phase: 0.9 },
  { x: 540, kind: "sprig", h: 176, lean: 11, sway: 8.8, phase: 3.1 },
  { x: 860, kind: "tuft", h: 156, sway: 7.1, phase: 1.7 },
  { x: 1030, kind: "tuft", h: 140, sway: 7.9, phase: 2.9 },
  { x: 1330, kind: "sprig", h: 150, lean: -6, sway: 8.4, phase: 0.6 },
  { x: 1640, kind: "sprig", h: 190, lean: 5, sway: 7.3, phase: 2.2 },
];

/** Sage mounds on the main ground line. */
const REAR_MOUNDS: { x: number; radii: number[] }[] = [
  { x: 10, radii: [13, 18, 15, 12] },
  { x: 945, radii: [12, 16, 19, 15, 18, 13, 11] },
  { x: 1290, radii: [12, 15, 12] },
];

/** Smaller life on the nearer ridge — swallowed first by the cream. */
const NEAR_PLANTS: { x: number; h: number; lean: number }[] = [
  { x: 210, h: 96, lean: -10 },
  { x: 700, h: 84, lean: 8 },
  { x: 1180, h: 104, lean: -4 },
];

const NEAR_MOUNDS: { x: number; radii: number[] }[] = [
  { x: 260, radii: [12, 16, 13] },
  { x: 1230, radii: [13, 17, 14, 11] },
];

/**
 * Layer 1 — the rear landscape: warm beige sky, a faint far ridge, the
 * main ground line with its peach sprigs and sage mounds, and a nearer
 * ridge with a little more life on it. This layer never moves while
 * the cream foreground travels across it: it belongs to the pinned rear
 * layer (sticky-rear.tsx — the same mechanism as the homepage's Hero ↔
 * About reveal in app/page.tsx; see about-page.module.css).
 *
 * Pure SVG with no client JS. Drawn in shared scene units (scene.ts),
 * centred, so the foreground hill in experience-section.tsx overlaps
 * it exactly where composed at every width.
 */
export function RearLandscape() {
  return (
    <div aria-hidden="true" className={styles.panel}>
      <svg
        viewBox={`${SCENE_X0} 0 ${SCENE_W} ${LAND_H}`}
        className={styles.sceneSvg}
        style={{ height: "var(--land-h)" }}
      >
        <path d={hillPath(FAR_RIDGE, LAND_H)} fill="var(--meadow-far)" />
        <path d={hillPath(GROUND_A, LAND_H)} fill="var(--meadow-hill)" />

        {REAR_PLANTS.map((p) => (
          <Planted key={p.x} x={p.x} y={yAt(GROUND_A, p.x) + 4} sway={p.sway} phase={p.phase}>
            {p.kind === "tuft" ? <Tuft h={p.h} /> : <Sprig h={p.h} lean={p.lean} pairs={p.h > 190 ? 6 : 5} />}
          </Planted>
        ))}
        {REAR_MOUNDS.map((m) => (
          <g key={m.x} transform={`translate(${m.x} ${yAt(GROUND_A, m.x) + 6})`}>
            <Mounds radii={m.radii} />
          </g>
        ))}

        <path d={hillPath(GROUND_B, LAND_H)} fill="var(--meadow-hill-near)" />
        {NEAR_PLANTS.map((p) => (
          <Planted key={p.x} x={p.x} y={yAt(GROUND_B, p.x) + 4} sway={8} phase={p.x / 300}>
            <Sprig h={p.h} lean={p.lean} pairs={4} tone="var(--meadow-plant-deep)" />
          </Planted>
        ))}
        {NEAR_MOUNDS.map((m) => (
          <g key={m.x} transform={`translate(${m.x} ${yAt(GROUND_B, m.x) + 6})`}>
            <Mounds radii={m.radii} tone="var(--meadow-mound-deep)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
