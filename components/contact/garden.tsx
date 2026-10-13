"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactElement } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./garden.module.css";

/**
 * The illustrated garden behind the closing section: a dark, gently
 * curved bed with daisies and lavender standing in it. It fills the
 * whole section as its back layer (grow-section.tsx puts the text in
 * front), so a well-watered flower can rise behind the headline.
 *
 * Every flower is a real <button> — click (or tap, or Enter/Space) to
 * water it: a watering can tips over it, a few drops fall, and it grows
 * one stage, from a young sprout (stage 0) to full bloom (stage
 * MAX_STAGE), each flower independently. Past full bloom, watering
 * still pours but the flower stops growing.
 *
 * Growth is drawn, not scaled: the stem stretches upward from its foot
 * and the head (daisy) or bud spikes (lavender) ride up to its new top,
 * so a tall flower keeps the proportions of a short one. How tall full
 * bloom is depends on the garden's own height (`--kmax`, measured
 * below), so it reaches about the headline's level on any screen.
 *
 * Everything moves with CSS transforms on SVG — no layout ever changes,
 * nothing scrolls sideways (the garden clips its own overflow), and
 * reduced motion drops the sway, drops and sparkles while keeping the
 * growth itself.
 *
 * Coordinates: each flower is drawn in a 100×200 box whose bottom
 * centre (50,200) is the stem's foot. Flowers are positioned by `x`
 * (percent across the garden) and stand on the soil's curved top edge.
 */

/** Waterings from sprout to full bloom. */
const MAX_STAGE = 6;

/**
 * Stem stretch `k` at stage 0 unless a flower sets its own `k0` (1 = the
 * stem as drawn; full bloom is the garden's measured `--kmax`).
 */
const K_SPROUT = 0.55;

type FlowerKind = "daisy" | "spray" | "lavender";

type FlowerSpec = {
  kind: FlowerKind;
  /** Percent across the garden from `sm` up. */
  x: number;
  /** Percent across on phones; omitted = not shown on phones. */
  xm?: number;
  /** Size multiplier. */
  s: number;
  /** Resting stem stretch, so the bed starts with small, medium and taller plants. */
  k0?: number;
  /** Sway period (s) and phase offset (s) so no two move in step. */
  sway: number;
  phase: number;
};

const FLOWERS: FlowerSpec[] = [
  { kind: "daisy", x: 5, xm: 11, s: 1.04, k0: 0.86, sway: 4.6, phase: 0.4 },
  { kind: "lavender", x: 14, xm: 31, s: 1.0, k0: 0.8, sway: 5.4, phase: 2.1 },
  { kind: "spray", x: 23, s: 0.94, k0: 0.92, sway: 4.2, phase: 1.3 },
  { kind: "daisy", x: 32, s: 0.94, k0: 0.72, sway: 4.8, phase: 3.0 },
  { kind: "lavender", x: 41, s: 0.95, k0: 0.9, sway: 5.8, phase: 0.7 },
  { kind: "daisy", x: 50, xm: 50, s: 1.1, k0: 0.8, sway: 4.9, phase: 1.9 },
  { kind: "spray", x: 59, xm: 70, s: 1.0, k0: 0.78, sway: 5.2, phase: 2.6 },
  { kind: "lavender", x: 68, s: 1.02, k0: 0.7, sway: 4.4, phase: 1.1 },
  { kind: "daisy", x: 77, s: 1.0, k0: 0.94, sway: 4.7, phase: 3.4 },
  { kind: "spray", x: 86, s: 0.92, k0: 0.84, sway: 5.6, phase: 0.2 },
  { kind: "daisy", x: 95, xm: 90, s: 0.98, k0: 0.76, sway: 4.5, phase: 2.3 },
];

type SprigKind = "rosette" | "grass" | "fern";

/** Non-interactive foliage between the flowers; `front` tufts sit in front of the stems. */
const SPRIGS: { kind: SprigKind; x: number; xm?: number; s: number; front?: boolean }[] = [
  { kind: "rosette", x: 0.5, xm: 1, s: 1.1 },
  { kind: "grass", x: 9.5, xm: 21, s: 1, front: true },
  { kind: "fern", x: 18.5, xm: 40, s: 1 },
  { kind: "rosette", x: 27.5, s: 0.95 },
  { kind: "grass", x: 36.5, s: 1.05, front: true },
  { kind: "fern", x: 45.5, s: 0.9 },
  { kind: "grass", x: 54.5, xm: 60, s: 1, front: true },
  { kind: "rosette", x: 63.5, xm: 80, s: 1 },
  { kind: "fern", x: 72.5, s: 1.05 },
  { kind: "grass", x: 81.5, s: 0.95, front: true },
  { kind: "rosette", x: 90.5, s: 0.95 },
  { kind: "fern", x: 99.5, xm: 99, s: 0.95 },
];

/**
 * Height of the soil's top edge at `x` percent, as a fraction of the
 * soil's own height, minus a little so feet sink into the bed. Mirrors
 * the bed path below (cubic from y=60 through control points at y=20
 * in a 120-tall box, whose top edge works out to 60 − 120·u(1−u)).
 */
function footing(x: number) {
  const u = x / 100;
  return ((60 + 120 * u * (1 - u)) / 120 - 0.12).toFixed(3);
}

/* -------------------------------------------------------------- art */

const r2 = (n: number) => n.toFixed(2);

/** A broad, spoon-shaped leaf pointing up from (0,0): `l` long, `w` at its widest. */
function spoonPath(l: number, w: number) {
  return `M0 0 C ${r2(-w * 0.3)} ${r2(-l * 0.22)}, ${r2(-w)} ${r2(-l * 0.5)}, ${r2(-w * 0.8)} ${r2(-l * 0.82)} C ${r2(-w * 0.55)} ${r2(-l * 1.03)}, ${r2(w * 0.55)} ${r2(-l * 1.03)}, ${r2(w * 0.8)} ${r2(-l * 0.82)} C ${r2(w)} ${r2(-l * 0.5)}, ${r2(w * 0.3)} ${r2(-l * 0.22)}, 0 0 Z`;
}

/** A slender pointed leaf from (0,0). */
function lancePath(l: number, w: number) {
  return `M0 0 C ${r2(-w)} ${r2(-l * 0.3)}, ${r2(-w * 0.7)} ${r2(-l * 0.75)}, 0 ${r2(-l)} C ${r2(w * 0.7)} ${r2(-l * 0.75)}, ${r2(w)} ${r2(-l * 0.3)}, 0 0 Z`;
}

type LeafDef = { x: number; y: number; a: number; l: number; w: number; tone: "dark" | "mid" | "light"; lance?: boolean };

/** One leaf with a pale midrib, in one of three greens for depth. */
function Leaf({ d }: { d: LeafDef }) {
  return (
    <g transform={`translate(${d.x} ${d.y}) rotate(${d.a})`}>
      <path d={(d.lance ? lancePath : spoonPath)(d.l, d.w)} className={styles.leaf} data-tone={d.tone} />
      <path d={`M0 -1 Q ${r2(d.w * 0.14)} ${r2(-d.l * 0.5)} 0 ${r2(-d.l * 0.86)}`} className={styles.midrib} />
    </g>
  );
}

/** A daisy petal pointing up from (0,0), with a soft notch at its tip. */
function petalPath(l: number, w: number) {
  return `M0 0 C ${r2(-w)} ${r2(-l * 0.35)}, ${r2(-w * 0.95)} ${r2(-l * 0.85)}, ${r2(-w * 0.4)} ${r2(-l)} Q 0 ${r2(-l * 0.93)} ${r2(w * 0.4)} ${r2(-l)} C ${r2(w * 0.95)} ${r2(-l * 0.85)}, ${r2(w)} ${r2(-l * 0.35)}, 0 0 Z`;
}

/**
 * A daisy head centred on (0,0): a shaded back ring of petals, a front
 * ring offset between them, and a domed gold centre flecked with seeds.
 * `l` is the front petals' length.
 */
function DaisyHead({ l, n }: { l: number; n: number }) {
  const back = petalPath(l * 1.06, l * 0.21);
  const front = petalPath(l, l * 0.19);
  const r = l * 0.38;
  return (
    <>
      <g className={styles.petals}>
        {Array.from({ length: n }, (_, i) => (
          <path key={`b${i}`} d={back} transform={`rotate(${r2(((i + 0.5) * 360) / n)})`} className={styles.petalBack} />
        ))}
        {Array.from({ length: n }, (_, i) => (
          <path key={`f${i}`} d={front} transform={`rotate(${r2((i * 360) / n)})`} className={styles.petal} />
        ))}
      </g>
      <circle r={r2(r)} className={styles.discOuter} />
      <circle cx={r2(-r * 0.18)} cy={r2(-r * 0.2)} r={r2(r * 0.68)} className={styles.discInner} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i * 2 * Math.PI) / 9;
        return <circle key={i} cx={r2(Math.cos(a) * r * 0.62)} cy={r2(Math.sin(a) * r * 0.62)} r={r2(r * 0.09)} className={styles.discDot} />;
      })}
    </>
  );
}

/** Parts that ride up a stretching stem: `rise` = their distance above the foot. */
const ride = (rise: number, origin?: string) =>
  ({ "--rise": `${rise}px`, ...(origin ? { transformOrigin: origin } : {}) }) as CSSProperties;

/* Daisy (reference: a single tall bloom over a lush basal rosette). */

const DAISY_HEAD: [number, number] = [50, 50];

const DAISY_ROSETTE: LeafDef[] = [
  { x: 50, y: 199, a: -64, l: 50, w: 12, tone: "dark" },
  { x: 50, y: 199, a: 60, l: 52, w: 12, tone: "dark" },
  { x: 49, y: 199, a: -82, l: 42, w: 11, tone: "mid" },
  { x: 51, y: 199, a: 84, l: 40, w: 11, tone: "mid" },
  { x: 49, y: 199, a: -40, l: 58, w: 13, tone: "mid" },
  { x: 51, y: 199, a: 34, l: 60, w: 13, tone: "mid" },
  { x: 50, y: 199, a: -16, l: 50, w: 12, tone: "light" },
  { x: 50, y: 199, a: 14, l: 46, w: 12, tone: "light" },
];

function Daisy() {
  const [hx, hy] = DAISY_HEAD;
  return (
    <>
      {/* Tapered, slightly bowed stem — a filled shape, so it stretches without thinning. */}
      <path
        d={`M47.4 199 C 46.2 160, 51.8 110, 49.1 ${hy + 4} L 50.9 ${hy + 4} C 53.8 110, 48.8 160, 52.6 199 Z`}
        className={`${styles.stemFill} ${styles.stalk}`}
      />
      <g className={styles.rider} style={ride(52)}>
        <Leaf d={{ x: 49.6, y: 148, a: -50, l: 30, w: 6.5, tone: "mid", lance: true }} />
      </g>
      <g className={styles.rider} style={ride(80)}>
        <Leaf d={{ x: 50.4, y: 120, a: 48, l: 26, w: 6, tone: "light", lance: true }} />
      </g>
      <g className={styles.rider} style={ride(104)}>
        <Leaf d={{ x: 49.4, y: 96, a: -44, l: 22, w: 5, tone: "mid", lance: true }} />
      </g>
      <g className={styles.rider} style={ride(124)}>
        <Leaf d={{ x: 50.2, y: 76, a: 40, l: 18, w: 4.4, tone: "light", lance: true }} />
      </g>
      <g className={styles.rosette}>
        {DAISY_ROSETTE.map((d, i) => (
          <Leaf key={i} d={d} />
        ))}
      </g>
      <g className={`${styles.rider} ${styles.head}`} style={ride(200 - hy, `${hx}px ${hy}px`)}>
        <g transform={`translate(${hx} ${hy})`}>
          <DaisyHead l={26} n={18} />
        </g>
      </g>
    </>
  );
}

/* Spray (reference: branching stems carrying several smaller daisies). */

const SPRAY_BRANCHES = [
  { stem: "M50 200 C 49 160, 52 110, 50 46", top: [50, 46], size: 1 },
  { stem: "M50 200 C 47 165, 36 125, 28 86", top: [28, 86], size: 0.8 },
  { stem: "M50 200 C 53 165, 64 120, 73 74", top: [73, 74], size: 0.88 },
] as const;

const SPRAY_LEAVES: (LeafDef & { rise?: number })[] = [
  { x: 49, y: 199, a: -58, l: 34, w: 5, tone: "dark", lance: true },
  { x: 51, y: 199, a: 56, l: 36, w: 5, tone: "dark", lance: true },
  { x: 50, y: 199, a: -26, l: 40, w: 5.5, tone: "mid", lance: true },
  { x: 50, y: 199, a: 24, l: 38, w: 5.5, tone: "mid", lance: true },
  { x: 50.5, y: 146, a: 52, l: 24, w: 5, tone: "light", lance: true, rise: 54 },
  { x: 43, y: 150, a: -58, l: 22, w: 4.6, tone: "mid", lance: true, rise: 50 },
  { x: 58, y: 136, a: 60, l: 20, w: 4.4, tone: "mid", lance: true, rise: 64 },
  { x: 49.5, y: 108, a: -46, l: 20, w: 4.4, tone: "light", lance: true, rise: 92 },
];

function Spray() {
  return (
    <>
      {SPRAY_BRANCHES.map((b) => (
        <path key={b.stem} d={b.stem} className={`${styles.stem} ${styles.stalk}`} />
      ))}
      {SPRAY_LEAVES.filter((d) => d.rise).map((d, i) => (
        <g key={i} className={styles.rider} style={ride(d.rise!)}>
          <Leaf d={d} />
        </g>
      ))}
      <g className={styles.rosette}>
        {SPRAY_LEAVES.filter((d) => !d.rise).map((d, i) => (
          <Leaf key={i} d={d} />
        ))}
      </g>
      {SPRAY_BRANCHES.map(({ top: [x, y], size }) => (
        <g key={`${x}`} className={`${styles.rider} ${styles.head}`} style={ride(200 - y, `${x}px ${y}px`)}>
          <g transform={`translate(${x} ${y}) scale(${size})`}>
            <DaisyHead l={16} n={14} />
          </g>
        </g>
      ))}
    </>
  );
}

/* Lavender: five spikes of whorled buds over a tuft of narrow leaves. */

type Bud = { x: string; y: string; rot: string; scale: string; tone: number; order: number };

const LAVENDER_SPIKES = [
  { stem: "M50 200 C 50 160, 49 100, 50 30", top: [50, 26], dir: [0, 1], n: 11 },
  { stem: "M50 200 C 47 165, 40 115, 34.5 60", top: [34, 56], dir: [0.12, 1], n: 8 },
  { stem: "M50 200 C 53 165, 60 118, 65.5 64", top: [66, 60], dir: [-0.12, 1], n: 8 },
  { stem: "M50 200 C 45 172, 31 135, 22.5 98", top: [22, 94], dir: [0.25, 1], n: 6 },
  { stem: "M50 200 C 55 172, 69 138, 77.5 102", top: [78, 98], dir: [-0.25, 1], n: 6 },
].map((spike) => {
  const [tx, ty] = spike.top;
  const len = Math.hypot(spike.dir[0], spike.dir[1]);
  const dx = spike.dir[0] / len;
  const dy = spike.dir[1] / len;
  const base = (-Math.asin(dx) * 180) / Math.PI;
  const buds: Bud[] = [];
  for (let i = 0; i < spike.n; i++) {
    const t = i / (spike.n - 1);
    const cx = tx + dx * i * 4.6;
    const cy = ty + dy * i * 4.6;
    const sides = i === 0 ? [0] : [-1, 1, 0];
    for (const side of sides) {
      buds.push({
        x: r2(cx - dy * side * 3.4),
        y: r2(cy + dx * side * 3.4),
        rot: r2(base + side * 28),
        scale: r2((0.7 + 0.35 * t) * (side === 0 ? 0.85 : 1)),
        tone: (i + side + 3) % 3,
        // Colour travels up the spike: lowest whorl first.
        order: spike.n - 1 - i,
      });
    }
  }
  const stemTop = Number(spike.stem.split(", ").pop()!.split(" ")[1]);
  return { stem: spike.stem, buds, rise: 200 - stemTop, origin: `${tx}px ${ty}px` };
});

const LAVENDER_TUFT: LeafDef[] = [-62, -44, -26, -10, 8, 24, 42, 60].map((a, i) => ({
  x: 50,
  y: 199,
  a,
  l: 30 + (i % 3) * 6,
  w: 3.2,
  tone: i % 2 ? "mid" : "dark",
  lance: true,
}));

function Lavender() {
  return (
    <>
      {LAVENDER_SPIKES.map((spike) => (
        <path key={spike.stem} d={spike.stem} className={`${styles.lavStem} ${styles.stalk}`} />
      ))}
      <g className={styles.rosette}>
        {LAVENDER_TUFT.map((d, i) => (
          <Leaf key={i} d={d} />
        ))}
      </g>
      {LAVENDER_SPIKES.map((spike, si) => (
        <g key={si} className={`${styles.rider} ${styles.head}`} style={ride(spike.rise, spike.origin)}>
          {spike.buds.map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot}) scale(${b.scale})`}>
              <ellipse rx="3.3" ry="5.2" className={styles.bud} data-tone={b.tone} style={{ transitionDelay: `${b.order * 40}ms` }} />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}

/**
 * The watering can, upright and facing left, spout tip at (0,0).
 * One source for both the pouring animation and the custom cursor.
 */
const CAN_MARKUP =
  '<line x1="1" y1="1" x2="19" y2="15" stroke="#50656a" stroke-width="3.6" stroke-linecap="round"/>' +
  '<line x1="1" y1="1" x2="19" y2="15" stroke="#a9bcbf" stroke-width="1.6" stroke-linecap="round"/>' +
  '<ellipse cx="0" cy="0" rx="2.6" ry="3.8" transform="rotate(-52)" fill="#a9bcbf" stroke="#50656a" stroke-width="1.4"/>' +
  '<path d="M27 -2 C 27 -15, 45 -15, 45 -2" fill="none" stroke="#50656a" stroke-width="3" stroke-linecap="round"/>' +
  '<path d="M48 3 C 57 3, 57 17, 48 17" fill="none" stroke="#50656a" stroke-width="3" stroke-linecap="round"/>' +
  '<rect x="18" y="-2" width="30" height="26" rx="4" fill="#a9bcbf" stroke="#50656a" stroke-width="1.6"/>' +
  '<rect x="21.5" y="2" width="4.5" height="17" rx="2.25" fill="#d3e0e1"/>' +
  '<line x1="17" y1="-2" x2="49" y2="-2" stroke="#50656a" stroke-width="2.4" stroke-linecap="round"/>';

/** The same can, tipped forward, as a 32px cursor with its hotspot on the spout. */
const CAN_CURSOR = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g transform="translate(3 22) rotate(-28) scale(0.42)">${CAN_MARKUP}</g></svg>`,
)}") 3 22`;

const DROPS = [
  { x: -1, y: 2.5 },
  { x: 1.5, y: 3.5 },
  { x: -2.5, y: 4 },
  { x: 0.5, y: 2 },
  { x: -1.5, y: 3 },
];

const SPARKLES = [
  { dx: -21, dy: -20 },
  { dx: 23, dy: -8 },
  { dx: -15, dy: 15 },
];

/** Where each kind's (main) head sits, for the pour overlay. */
const HEAD: Record<FlowerKind, [number, number]> = { daisy: DAISY_HEAD, spray: [50, 46], lavender: [50, 32] };

/** How far each kind's head sits above the foot (its `--rise`), for the pour overlay. */
const HEAD_RISE: Record<FlowerKind, number> = { daisy: 200 - DAISY_HEAD[1], spray: 154, lavender: 170 };

function PourOverlay({ kind, mirrored }: { kind: FlowerKind; mirrored: boolean }) {
  const [hx, hy] = HEAD[kind];
  return (
    <svg
      viewBox="0 0 100 200"
      className={styles.overlay}
      overflow="visible"
      aria-hidden="true"
      style={{ "--rise": `${HEAD_RISE[kind] / 2}%` } as CSSProperties}
    >
      <g transform={mirrored ? `translate(${2 * hx} 0) scale(-1 1)` : undefined}>
        <g transform={`translate(${hx + 7} ${hy - 40})`}>
          <g className={styles.can} dangerouslySetInnerHTML={{ __html: CAN_MARKUP }} />
          {DROPS.map((d, i) => (
            <g key={i} transform={`translate(${d.x} ${d.y})`}>
              <path
                d="M0 -2.6 C 1.6 -0.6, 1.9 0.6, 1.9 1.3 A 1.9 1.9 0 0 1 -1.9 1.3 C -1.9 0.6, -1.6 -0.6, 0 -2.6 Z"
                className={styles.drop}
                style={{ animationDelay: `${330 + i * 90}ms` }}
              />
            </g>
          ))}
        </g>
      </g>
      {SPARKLES.map((s, i) => (
        <g key={i} transform={`translate(${hx + s.dx} ${hy + s.dy})`}>
          <path
            d="M0 -4.5 L1.1 -1.1 L4.5 0 L1.1 1.1 L0 4.5 L-1.1 1.1 L-4.5 0 L-1.1 -1.1 Z"
            className={styles.sparkle}
            style={{ animationDelay: `${720 + i * 110}ms` }}
          />
        </g>
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------- flower */

const NAMES: Record<FlowerKind, string> = { daisy: "daisy", spray: "daisy spray", lavender: "lavender" };

const ART: Record<FlowerKind, () => ReactElement> = { daisy: Daisy, spray: Spray, lavender: Lavender };

function Flower({ spec }: { spec: FlowerSpec }) {
  const reduceMotion = useReducedMotion();
  // `stage` counts every watering (so each click can be acted on at
  // once); `shown` is what the plant displays, lagging a beat behind so
  // it grows as the water lands rather than before the can tips.
  const [stage, setStage] = useState(0);
  const [shown, setShown] = useState(0);
  const [pouring, setPouring] = useState(false);
  const [pourId, setPourId] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  function water() {
    const next = Math.min(MAX_STAGE, stage + 1);
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    setStage(next);
    setPourId((n) => n + 1);
    setPouring(true);
    timers.current.push(
      window.setTimeout(() => setShown(next), reduceMotion ? 0 : 450),
      window.setTimeout(() => setPouring(false), reduceMotion ? 700 : 1600),
    );
  }

  const name = NAMES[spec.kind];
  const Art = ART[spec.kind];
  const style = {
    "--x": `${spec.x}%`,
    "--xm": `${spec.xm ?? spec.x}%`,
    "--b": footing(spec.x),
    "--bm": footing(spec.xm ?? spec.x),
    "--s": spec.s,
    "--k0": spec.k0 ?? K_SPROUT,
    "--sway": `${spec.sway}s`,
    "--phase": `-${spec.phase}s`,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={styles.flower}
      style={style}
      data-kind={spec.kind}
      data-stage={shown}
      data-full={shown === MAX_STAGE}
      data-pouring={pouring}
      data-phone={spec.xm !== undefined}
      aria-label={
        stage === MAX_STAGE
          ? `The ${name} is fully grown`
          : `Water the ${name} (grown ${stage} of ${MAX_STAGE})`
      }
      onClick={water}
    >
      <span className={styles.sway}>
        <svg viewBox="0 0 100 200" className={styles.art} overflow="visible" aria-hidden="true">
          <g className={styles.plant}>
            <Art />
          </g>
        </svg>
        {pouring && <PourOverlay key={pourId} kind={spec.kind} mirrored={spec.x > 50} />}
      </span>
    </button>
  );
}

/* ------------------------------------------------------ decorations */

const SPRIG_LEAVES: Record<SprigKind, LeafDef[]> = {
  // A low clump of broad leaves, like a daisy's rosette without its stem.
  rosette: [-72, -40, -8, 26, 60].map((a, i) => ({ x: 30, y: 79, a, l: 28 + (i % 2) * 7, w: 8.5, tone: i % 2 ? "light" : "mid" })),
  // Fine blades, filled rather than stroked so they taper.
  grass: [-34, -18, -4, 10, 24, 38].map((a, i) => ({ x: 30, y: 80, a, l: 40 + ((i * 7) % 16), w: 2.4, tone: i % 2 ? "mid" : "light", lance: true })),
  // A leafy sprig: pairs of leaflets up a short stem.
  fern: [66, 54, 42, 30].flatMap((y, i) => [
      { x: 30, y, a: -52, l: 16 - i * 2, w: 4, tone: "mid" as const, lance: true },
      { x: 30, y: y - 4, a: 52, l: 15 - i * 2, w: 3.8, tone: "light" as const, lance: true },
  ]),
};

function Sprig({ kind }: { kind: SprigKind }) {
  return (
    <svg viewBox="0 0 60 80" className={styles.art} overflow="visible" aria-hidden="true">
      {kind === "fern" && <path d="M30 80 C 29 62, 31 44, 30 20" className={styles.lavStem} />}
      {SPRIG_LEAVES[kind].map((d, i) => (
        <Leaf key={i} d={d} />
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------- garden */

/** Fraction of the garden's height a fully grown head reaches (≈ the headline). */
const FULL_REACH = 0.62;

export function Garden() {
  const ref = useRef<HTMLDivElement>(null);

  // Full bloom is as tall as the garden allows: solve for the stem
  // stretch `k` that puts a daisy head at FULL_REACH of the garden's
  // height (its centre rides `rise·k` units above the foot, in a box
  // 200 units tall). Recomputed whenever the garden resizes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const probe = el.querySelector<HTMLElement>("[data-probe]");
      if (!probe || probe.offsetHeight === 0) return;
      const box = probe.offsetHeight;
      const foot = parseFloat(getComputedStyle(probe).bottom) || 0;
      const k = ((FULL_REACH * el.clientHeight - foot) * 200) / box / HEAD_RISE.daisy;
      el.style.setProperty("--kmax", Math.min(4.5, Math.max(1.6, k)).toFixed(3));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="A small garden. Water a flower again and again to help it grow."
      className={styles.garden}
      style={{ "--can-cursor": CAN_CURSOR, "--k0": K_SPROUT } as CSSProperties}
    >
      {SPRIGS.map((s, i) => (
        <span
          key={i}
          className={styles.sprig}
          data-phone={s.xm !== undefined}
          data-front={s.front ?? false}
          style={
            {
              "--x": `${s.x}%`,
              "--xm": `${s.xm ?? s.x}%`,
              "--b": footing(s.x),
              "--bm": footing(s.xm ?? s.x),
              "--s": s.s,
            } as CSSProperties
          }
        >
          <Sprig kind={s.kind} />
        </span>
      ))}

      {FLOWERS.map((spec, i) => (
        <Flower key={i} spec={spec} />
      ))}

      {/* Invisible s=1 flower box at the garden's centre, for sizing full bloom. */}
      <span
        data-probe
        aria-hidden="true"
        className={styles.probe}
        style={{ "--x": "50%", "--xm": "50%", "--b": footing(50), "--bm": footing(50) } as CSSProperties}
      />

      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className={styles.soil} aria-hidden="true">
        <path d="M0 120 L0 54 C 250 14, 750 14, 1000 54 L1000 120 Z" className={styles.soilRim} />
        <path d="M0 120 L0 60 C 250 20, 750 20, 1000 60 L1000 120 Z" className={styles.soilBed} />
      </svg>
    </div>
  );
}
