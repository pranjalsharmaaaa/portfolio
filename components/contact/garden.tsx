"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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
const MAX_STAGE = 5;

/** Stem stretch `k` at stage 0 (1 = the stem as drawn; full bloom is `--kmax`). */
const K_SPROUT = 0.55;

type FlowerKind = "daisy" | "lavender";

type FlowerSpec = {
  kind: FlowerKind;
  /** Percent across the garden from `sm` up. */
  x: number;
  /** Percent across on phones; omitted = not shown on phones. */
  xm?: number;
  /** Size multiplier. */
  s: number;
  /** Sway period (s) and phase offset (s) so no two move in step. */
  sway: number;
  phase: number;
};

const FLOWERS: FlowerSpec[] = [
  { kind: "daisy", x: 4.5, xm: 9, s: 1.0, sway: 4.6, phase: 0.4 },
  { kind: "lavender", x: 13.5, xm: 29.5, s: 1.06, sway: 5.4, phase: 2.1 },
  { kind: "daisy", x: 22.5, s: 0.92, sway: 4.2, phase: 1.3 },
  { kind: "daisy", x: 31.5, s: 1.04, sway: 4.8, phase: 3.0 },
  { kind: "lavender", x: 40.5, s: 0.96, sway: 5.8, phase: 0.7 },
  { kind: "daisy", x: 50, xm: 50, s: 1.1, sway: 4.9, phase: 1.9 },
  { kind: "lavender", x: 59.5, xm: 70.5, s: 1.02, sway: 5.2, phase: 2.6 },
  { kind: "daisy", x: 68.5, s: 0.94, sway: 4.4, phase: 1.1 },
  { kind: "daisy", x: 77.5, s: 1.03, sway: 4.7, phase: 3.4 },
  { kind: "lavender", x: 86.5, s: 0.98, sway: 5.6, phase: 0.2 },
  { kind: "daisy", x: 95.5, xm: 91, s: 0.96, sway: 4.5, phase: 2.3 },
];

type SprigKind = "grass" | "sprig" | "clump";

const SPRIGS: { kind: SprigKind; x: number; xm?: number; s: number }[] = [
  { kind: "clump", x: 0.5, xm: 1, s: 1 },
  { kind: "grass", x: 9, s: 1 },
  { kind: "clump", x: 18, xm: 19.5, s: 0.9 },
  { kind: "sprig", x: 27, s: 1 },
  { kind: "grass", x: 36, xm: 40, s: 1.05 },
  { kind: "clump", x: 45, s: 1 },
  { kind: "sprig", x: 54.5, xm: 60, s: 0.95 },
  { kind: "grass", x: 64, s: 1 },
  { kind: "clump", x: 73, xm: 81, s: 0.95 },
  { kind: "sprig", x: 82, s: 1.05 },
  { kind: "grass", x: 91, s: 0.95 },
  { kind: "clump", x: 99.5, xm: 99, s: 0.9 },
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

const DAISY_PETALS = Array.from({ length: 14 }, (_, i) => r2((i * 360) / 14));

/**
 * Each moving part rises by `(1 − k) × its distance above the foot`
 * (the `--rise` on it), which is exactly where the stretched stem
 * carries that point — so leaves stay on the stem and the head stays on
 * its tip at every stage.
 */
function Daisy() {
  return (
    <>
      <path d="M50 200 C 47 165, 54 120, 50 62" className={`${styles.stem} ${styles.stalk}`} />
      <g className={styles.rider} style={{ "--rise": "40px" } as CSSProperties}>
        <path d="M49.5 160 C 37 155, 28 143, 25 131 C 38 133, 47 144, 49.5 160 Z" className={styles.leaf} />
      </g>
      <g className={styles.rider} style={{ "--rise": "72px" } as CSSProperties}>
        <path d="M51 128 C 63 122, 71 110, 74 99 C 61 102, 53 112, 51 128 Z" className={styles.leaf} />
      </g>
      <g className={`${styles.rider} ${styles.head}`} style={{ "--rise": "138px", transformOrigin: "50px 58px" } as CSSProperties}>
        <g className={styles.petals}>
          {DAISY_PETALS.map((a) => (
            <ellipse key={a} cx="50" cy="45" rx="4.6" ry="12.5" transform={`rotate(${a} 50 58)`} className={styles.petal} />
          ))}
        </g>
        <g className={styles.disc}>
          <circle cx="50" cy="58" r="8" className={styles.discOuter} />
          <circle cx="50" cy="58" r="4.2" className={styles.discInner} />
        </g>
      </g>
    </>
  );
}

type Bud = { x: string; y: string; rot: string; scale: string; tone: number; order: number };

/** Lavender: three spikes, buds alternating either side of each. */
const LAVENDER_SPIKES = [
  { stem: "M50 200 C 50 160, 49 110, 50 36", top: [50, 30], bottom: [50, 90], n: 9 },
  { stem: "M50 200 C 46 168, 39 128, 33 76", top: [31.5, 66], bottom: [35.5, 114], n: 6 },
  { stem: "M50 200 C 54 170, 61 132, 67 86", top: [68.5, 76], bottom: [64.5, 120], n: 6 },
].map((spike) => {
  const [tx, ty] = spike.top;
  const [bx, by] = spike.bottom;
  const len = Math.hypot(bx - tx, by - ty);
  const dx = (bx - tx) / len;
  const dy = (by - ty) / len;
  const base = (-Math.asin(dx) * 180) / Math.PI;
  const buds: Bud[] = Array.from({ length: spike.n }, (_, i) => {
    const t = i / (spike.n - 1);
    const side = i === 0 ? 0 : i % 2 ? 1 : -1;
    return {
      x: r2(tx + (bx - tx) * t + -dy * side * 2.6),
      y: r2(ty + (by - ty) * t + dx * side * 2.6),
      rot: r2(base + side * 22),
      scale: r2(0.72 + 0.28 * t),
      tone: i % 3,
      // Bloom travels up the spike: lowest bud first.
      order: spike.n - 1 - i,
    };
  });
  // The spike's buds ride up with its stem top (y of the stem's end).
  const stemTop = Number(spike.stem.split(", ").pop()!.split(" ")[1]);
  return { stem: spike.stem, buds, rise: 200 - stemTop, origin: `${tx}px ${ty}px` };
});

function Lavender() {
  return (
    <>
      <path d="M49 200 C 44 186, 39 178, 33 172" className={styles.blade} />
      <path d="M51 200 C 57 187, 62 180, 69 175" className={styles.blade} />
      {LAVENDER_SPIKES.map((spike) => (
        <path key={spike.stem} d={spike.stem} className={`${styles.lavStem} ${styles.stalk}`} />
      ))}
      {LAVENDER_SPIKES.map((spike, si) => (
        <g
          key={si}
          className={`${styles.rider} ${styles.head}`}
          style={{ "--rise": `${spike.rise}px`, transformOrigin: spike.origin } as CSSProperties}
        >
          {spike.buds.map((b, i) => (
            <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.rot}) scale(${b.scale})`}>
              <ellipse
                rx="3.8"
                ry="5.6"
                className={styles.bud}
                data-tone={b.tone}
                style={{ transitionDelay: `${b.order * 45}ms` }}
              />
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

const HEAD: Record<FlowerKind, [number, number]> = { daisy: [50, 58], lavender: [50, 44] };

/** How far each kind's head sits above the foot (its `--rise`), for the pour overlay. */
const HEAD_RISE: Record<FlowerKind, number> = { daisy: 138, lavender: 164 };

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

const NAMES: Record<FlowerKind, string> = { daisy: "daisy", lavender: "lavender" };

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
  const style = {
    "--x": `${spec.x}%`,
    "--xm": `${spec.xm ?? spec.x}%`,
    "--b": footing(spec.x),
    "--bm": footing(spec.xm ?? spec.x),
    "--s": spec.s,
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
          <g className={styles.plant}>{spec.kind === "daisy" ? <Daisy /> : <Lavender />}</g>
        </svg>
        {pouring && <PourOverlay key={pourId} kind={spec.kind} mirrored={spec.x > 50} />}
      </span>
    </button>
  );
}

/* ------------------------------------------------------ decorations */

function Sprig({ kind }: { kind: SprigKind }) {
  if (kind === "grass") {
    return (
      <svg viewBox="0 0 60 80" className={styles.art} aria-hidden="true">
        <path d="M30 80 C 28 62, 22 48, 12 38" className={styles.blade} />
        <path d="M30 80 C 30 58, 32 40, 30 22" className={styles.blade} />
        <path d="M31 80 C 34 62, 40 52, 50 44" className={styles.blade} />
        <path d="M29 80 C 25 68, 18 62, 8 60" className={styles.blade} />
      </svg>
    );
  }
  if (kind === "clump") {
    return (
      <svg viewBox="0 0 60 80" className={styles.art} aria-hidden="true">
        <path d="M30 80 C 16 72, 8 58, 10 44 C 22 52, 29 66, 30 80 Z" className={styles.clumpBack} />
        <path d="M30 80 C 44 72, 52 58, 50 44 C 38 52, 31 66, 30 80 Z" className={styles.clumpBack} />
        <path d="M30 80 C 22 64, 22 44, 30 30 C 38 44, 38 64, 30 80 Z" className={styles.clumpFront} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 80" className={styles.art} aria-hidden="true">
      <path d="M30 80 C 29 60, 31 42, 30 18" className={styles.lavStem} />
      {[
        [26, 26, -38],
        [34, 34, 38],
        [25.5, 44, -40],
        [34.5, 52, 40],
        [26, 62, -42],
      ].map(([x, y, a]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="2.6" ry="6" transform={`rotate(${a} ${x} ${y})`} className={styles.sprigLeaf} />
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
  // height (head centre = (4 + 138k)/200 of the flower box above its
  // foot). Recomputed whenever the garden resizes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const probe = el.querySelector<HTMLElement>("[data-probe]");
      if (!probe || probe.offsetHeight === 0) return;
      const box = probe.offsetHeight;
      const foot = parseFloat(getComputedStyle(probe).bottom) || 0;
      const k = (((FULL_REACH * el.clientHeight - foot) * 200) / box - 4) / 138;
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
