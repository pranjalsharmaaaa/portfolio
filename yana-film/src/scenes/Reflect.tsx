/**
 * Scene 5 · Reflect, discover, connect (0:33.6–0:43.1).
 * A gentle carousel of the real screens, one in focus per phrase:
 * Journal Calendar → Journal Entry ("Reflect through journaling"), Minis
 * ("Discover bite-sized guidance"), Share Your Thought ("Share your
 * thoughts"), the Community feed ("connect with a supportive community").
 * Heading and labels are the case study's own.
 */
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from "remotion";
import { SectionHeading, yanaImage } from "../components/primitives";
import { screenWidth } from "../components/Screen";
import { ease, mix, prog } from "../motion/ease";
import type { Cue } from "../sfx";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

const ITEMS = [
  { name: "screen-journal-calendar", label: "Journal Calendar" },
  { name: "screen-journal-entry", label: "Journal Entry" },
  { name: "screen-journal-minis", label: "Minis" },
  { name: "screen-home-express", label: "Share Your Thought" },
  { name: "screen-home-feed", label: "Community" },
];
const H = 700;
const STEP = 430;
const MOVE = 22;

const focusFrames = () => [0, 46, phraseAt("S5", 1) - 4, phraseAt("S5", 2) - 4, phraseAt("S5", 3) - 4];

export const S5 = () => {
  const f = useCurrentFrame();
  const at = focusFrames();
  // continuous focus index, easing between items
  let active = 0;
  at.forEach((t, i) => { if (i) active += prog(f, t, MOVE, ease.camera); });
  return (
    <AbsoluteFill>
      <SectionHeading x={stage.margin} y={60} start={2}>Small moments, big progress</SectionHeading>
      {ITEMS.map((it, i) => {
        const d = i - active;
        const near = Math.max(0, 1 - Math.abs(d));
        const w = screenWidth(it.name, H);
        const enter = prog(f, i * 4, 20);
        return (
          <div key={it.name} style={{
            position: "absolute", left: 960 + d * STEP - w / 2, top: 220 + (1 - enter) * 40, width: w, height: H,
            opacity: enter * interpolate(Math.abs(d), [0, 1, 2.2], [1, 0.42, 0], { extrapolateRight: "clamp" }),
            transform: `scale(${mix(near, 0.84, 1)})`, filter: "drop-shadow(0 26px 34px rgba(73,64,143,0.20))", zIndex: Math.round(near * 10),
          }}>
            <Img src={yanaImage(it.name)} style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
        );
      })}
      {ITEMS.map((it, i) => (
        <div key={it.label} style={{
          position: "absolute", right: stage.margin, top: 84, fontSize: 30, fontWeight: 700, color: color.indigo, letterSpacing: "0.02em",
          display: "flex", alignItems: "center", gap: 14,
          opacity: Math.max(0, 1 - Math.abs(active - i) * 2.2) * prog(f, 6, 14),
        }}>
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: color.purple }} />
          {it.label}
        </div>
      ))}
    </AbsoluteFill>
  );
};

export const S5_CUES = (): Cue[] => {
  const at = focusFrames();
  return [
    { at: at[1], kind: "page", gain: 0.6 },
    { at: at[2], kind: "whoosh", gain: 0.22 },
    { at: at[3], kind: "whoosh", gain: 0.22 },
    { at: at[4], kind: "whoosh", gain: 0.22 },
  ];
};
