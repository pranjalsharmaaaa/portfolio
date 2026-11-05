/**
 * Scenes 1–2: something doesn't feel right → support feels far away.
 * The welcome screen's illustrated woman (eyes closed, hand on her heart —
 * calm, not sad) among soft botanical shapes; the feeling words; then empty
 * speech bubbles and thought shapes, drifting out of reach, before her
 * lavender opens into a welcoming space.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Organic, Woman } from "../components/primitives";
import { ease, mix, prog, settle } from "../motion/ease";
import type { Cue } from "../sfx";
import { phraseAt } from "../timeline";
import { color } from "../theme/tokens";

/** Where the woman sits in both scenes, so the cut between them is invisible. */
export const WOMAN = { x: 300, y: 250, width: 400 };
const WOMAN_H = (WOMAN.width * 302) / 238;

const Botanicals = ({ enter = 0 }: { enter?: number }) => (
  <>
    <Organic x={170} y={210} size={110} fill={color.periwinkle} kind="leaf" rotate={-28} enter={enter + 6} phase={0.4} opacity={0.55} />
    <Organic x={720} y={190} size={84} fill={color.pinkLight} kind="petal" rotate={18} enter={enter + 14} phase={1.6} opacity={0.5} />
    <Organic x={140} y={690} size={130} fill={color.purpleLight} kind="pebble" enter={enter + 10} phase={2.4} />
    <Organic x={760} y={640} size={96} fill={color.periwinkle} kind="leaf" rotate={34} enter={enter + 20} phase={3.1} opacity={0.5} />
    <Organic x={640} y={860} size={60} fill={color.pinkLight} kind="petal" rotate={-12} enter={enter + 24} phase={4.2} opacity={0.45} />
  </>
);

/* ── S1 · Something doesn't feel right (0:00–0:07.5) ────────────────── */
const WORDS = [
  { w: "OVERWHELMED.", c: color.indigo },
  { w: "UNCERTAIN.", c: color.purple },
  { w: "UNHEARD.", c: "#8c74e6" },
];

export const S1 = () => {
  const f = useCurrentFrame();
  const but = phraseAt("S1", 1); // "But finding the words for it isn't always easy."
  const loosen = prog(f, but, 70, ease.camera);
  return (
    <AbsoluteFill>
      <Botanicals />
      <Woman {...WOMAN} enter={0} />
      {WORDS.map((k, i) => {
        const at = 26 + i * 22;
        return (
          <div key={k.w} style={{
            position: "absolute", left: 940, top: 310 + i * 130, fontSize: 82, fontWeight: 800, color: k.c,
            letterSpacing: `${mix(loosen, 0.04, 0.11)}em`, ...settle(f, at, 18, 18),
            opacity: prog(f, at, 18) * mix(loosen, 1, 0.38 + 0.12 * i),
            filter: `blur(${loosen * (0.6 + 0.5 * i)}px)`,
          }}>{k.w}</div>
        );
      })}
    </AbsoluteFill>
  );
};

export const S1_CUES: Cue[] = [{ at: 4, kind: "bloom", gain: 0.5 }];

/* ── S2 · Support feels far away (0:07.5–0:14.8) ────────────────────── */
/** An empty speech bubble (rounded, with a tail). */
export const Bubble = ({ w, h, flip = false, stroke = color.purple, fill = "white" }: { w: number; h: number; flip?: boolean; stroke?: string; fill?: string }) => (
  <svg width={w} height={h + 26} viewBox={`0 0 ${w} ${h + 26}`} style={{ display: "block", overflow: "visible", transform: flip ? "scaleX(-1)" : undefined }}>
    <path
      d={`M${h / 2} 2 H${w - h / 2} A${h / 2 - 2} ${h / 2 - 2} 0 0 1 ${w - h / 2} ${h - 2} H${h * 0.95} L${h * 0.42} ${h + 22} L${h * 0.6} ${h - 2} H${h / 2} A${h / 2 - 2} ${h / 2 - 2} 0 0 1 ${h / 2} 2 Z`}
      fill={fill} stroke={stroke} strokeOpacity="0.45" strokeWidth="3" strokeLinejoin="round"
    />
  </svg>
);

const BUBBLES = [
  { x: 800, y: 250, w: 300, h: 110, at: 18 },
  { x: 1150, y: 390, w: 240, h: 96, at: 32 },
  { x: 880, y: 540, w: 270, h: 104, at: 46 },
];

export const S2 = () => {
  const f = useCurrentFrame();
  const far = phraseAt("S2", 1); // "getting the right support can feel even further away."
  const away = prog(f, far, 80, ease.camera);
  const open = prog(f, 186, 34, ease.camera); // her lavender opens into a welcoming space
  return (
    <AbsoluteFill>
      <Botanicals enter={-30} />
      {/* thought shapes rising from her */}
      {[0, 1, 2].map((i) => {
        const at = 8 + i * 8;
        return (
          <div key={i} style={{
            position: "absolute", left: 660 + i * 46, top: 300 - i * 34 + Math.sin(f / 30 + i) * 4, width: 16 + i * 8, height: 16 + i * 8, borderRadius: "50%",
            background: color.purpleLight, border: `2px solid rgb(106 74 216 / 35%)`, opacity: prog(f, at, 14) * (1 - away * 0.6),
          }} />
        );
      })}
      {BUBBLES.map((b, i) => (
        <div key={i} style={{
          position: "absolute", left: b.x + away * (160 + i * 90), top: b.y + Math.sin(f / 34 + i * 1.7) * 6 - away * 30,
          opacity: prog(f, b.at, 16) * mix(away, 1, 0.25), transform: `scale(${mix(prog(f, b.at, 20), 0.9, 1) * mix(away, 1, 0.78)})`,
        }}>
          <Bubble w={b.w} h={b.h} flip={i === 1} />
        </div>
      ))}
      {/* the welcoming space: her lavender, opening out */}
      <div style={{
        position: "absolute", left: WOMAN.x + WOMAN.width / 2 - 1400, top: WOMAN.y + WOMAN_H / 2 - 1400, width: 2800, height: 2800, borderRadius: "50%",
        background: color.lavender, transform: `scale(${mix(open, 0.2, 1.4)})`, opacity: open > 0 ? 1 : 0,
      }} />
      <Woman {...WOMAN} enter={-60} exit={196} />
    </AbsoluteFill>
  );
};

export const S2_CUES: Cue[] = [
  { at: 16, kind: "whoosh", gain: 0.22 },
  { at: 184, kind: "whoosh", gain: 0.35 },
];
