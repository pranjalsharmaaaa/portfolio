import type { CSSProperties } from "react";
import styles from "./about-page.module.css";

/**
 * Delicate, editorial plant shapes for the /about landscape — single
 * leafy sprigs, small three-stem tufts, and soft sage mounds. Drawn
 * directly into the landscape SVGs (not positioned images on top of
 * them) with their feet on a ground line, so they belong to whichever
 * layer they're drawn in and are overlapped by the layers in front.
 *
 * Every shape is authored with its foot at (0,0), growing up into
 * negative y. A sprig is one gently bent stem with pairs of slim,
 * lens-shaped leaves angled upward, shrinking toward the tip.
 */

const f = (n: number) => +n.toFixed(1);

/** One slim lens-shaped leaf from (0,0) pointing along +x, length `l`. */
function leafD(l: number) {
  const w = l * 0.2;
  return `M0,0 C${f(l * 0.3)},${f(-w)} ${f(l * 0.72)},${f(-w)} ${f(l)},0 C${f(l * 0.72)},${f(w)} ${f(l * 0.3)},${f(w)} 0,0 Z`;
}

type SprigGeometry = { stem: string; leaves: { x: number; y: number; a: number; l: number }[] };

function sprigGeometry(h: number, lean: number, pairs: number): SprigGeometry {
  const rad = (lean * Math.PI) / 180;
  const tipX = Math.sin(rad) * h;
  const tipY = -Math.cos(rad) * h;
  // Quadratic stem with a slight bow opposite the lean.
  const cx = tipX * 0.35 - Math.sign(lean || 1) * h * 0.04;
  const cy = tipY * 0.55;
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: 2 * u * t * cx + t * t * tipX,
      y: 2 * u * t * cy + t * t * tipY,
      // Tangent angle (degrees, 0 = +x).
      a: (Math.atan2(2 * u * (cy - 0) + 2 * t * (tipY - cy), 2 * u * (cx - 0) + 2 * t * (tipX - cx)) * 180) / Math.PI,
    };
  };

  const leaves: SprigGeometry["leaves"] = [];
  for (let i = 0; i < pairs; i++) {
    const t = 0.3 + (0.62 * i) / Math.max(pairs - 1, 1);
    const p = at(t);
    const l = h * (0.24 - 0.12 * t);
    // Leaves rise ~52° off the stem on either side.
    leaves.push({ x: p.x, y: p.y, a: p.a + 52, l });
    leaves.push({ x: p.x, y: p.y, a: p.a - 52, l: l * 0.94 });
  }
  const tip = at(1);
  leaves.push({ x: tip.x, y: tip.y, a: tip.a, l: h * 0.11 });

  return { stem: `M0,0 Q${f(cx)},${f(cy)} ${f(tipX)},${f(tipY)}`, leaves };
}

export function Sprig({
  h,
  lean = 0,
  pairs = 5,
  tone = "var(--meadow-plant)",
}: {
  h: number;
  lean?: number;
  pairs?: number;
  tone?: string;
}) {
  const g = sprigGeometry(h, lean, pairs);
  return (
    <g>
      <path d={g.stem} fill="none" stroke={tone} strokeWidth={Math.max(1.6, h * 0.012)} strokeLinecap="round" />
      {g.leaves.map((leaf, i) => (
        <path
          key={i}
          d={leafD(leaf.l)}
          transform={`translate(${f(leaf.x)} ${f(leaf.y)}) rotate(${f(leaf.a)})`}
          fill={tone}
        />
      ))}
    </g>
  );
}

/** Three sprigs fanning from one foot. */
export function Tuft({ h, tone }: { h: number; tone?: string }) {
  return (
    <g>
      <Sprig h={h * 0.78} lean={-24} pairs={4} tone={tone} />
      <Sprig h={h * 0.84} lean={22} pairs={4} tone={tone} />
      <Sprig h={h} lean={-2} pairs={5} tone={tone} />
    </g>
  );
}

/**
 * A plant placed on a ground line: translated to its foot, scaled, and
 * swaying very slowly from its base (CSS only; held still under reduced
 * motion).
 */
export function Planted({
  x,
  y,
  sway = 7,
  phase = 0,
  children,
}: {
  x: number;
  y: number;
  sway?: number;
  phase?: number;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${f(x)} ${f(y)})`}>
      <g
        className={styles.sway}
        style={{ "--sway": `${sway}s`, "--phase": `-${phase}s` } as CSSProperties}
      >
        {children}
      </g>
    </g>
  );
}

/**
 * Soft sage mounds: overlapping half-domes sitting on the ground at
 * (0,0). `radii` run left to right; neighbours overlap by ~35%.
 */
export function Mounds({ radii, tone = "var(--meadow-mound)" }: { radii: number[]; tone?: string }) {
  const total = radii.reduce((sum, r) => sum + r * 1.3, 0);
  const centres = radii.map((r, i) => -total / 2 + radii.slice(0, i).reduce((sum, q) => sum + q * 1.3, 0) + r * 0.65);
  return (
    <g fill={tone}>
      {radii.map((r, i) => (
        <ellipse key={i} cx={f(centres[i])} cy={f(r * 0.22)} rx={r} ry={f(r * 0.82)} />
      ))}
    </g>
  );
}
