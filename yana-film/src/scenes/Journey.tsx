/**
 * Scene 6 · Support, and the journey (0:43.1–1:00).
 * "Find the right support for you" (the case study's heading): Choose Your
 * Therapy Style, Group Therapy and Suggested Therapists — the real screens,
 * appearing as each is named. Then the woman returns with the Wellbeing
 * Snapshot (a self-reflection view, "Here's a look at your journey"), the
 * mascot joins her, and the close is the splash's identity:
 * YANA / YOU ARE NOT ALONE.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Mascot, Organic, SectionHeading, Woman } from "../components/primitives";
import { Still } from "../components/Screen";
import { ease, mix, prog, settle } from "../motion/ease";
import type { Cue } from "../sfx";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

const explore = (b: { group: number }) => b.group - 56;

const beats = () => {
  const explore = phraseAt("S6", 1); // "explore individual therapy, group sessions and professional support."
  return {
    ready: phraseAt("S6", 0),
    style: phraseAt("S6", 0) + 22, // as "ready for more" lands, ahead of "individual therapy"
    group: explore + 56, // "group sessions"
    pro: explore + 104, // "professional support"
    because: phraseAt("S6", 2), // "Because wellbeing isn't a one-time destination."
    journey: phraseAt("S6", 3), // "It's a journey, and you don't have to take it alone."
    close: phraseAt("S6", 4), // "YANA. You are not alone."
  };
};

export const S6 = () => {
  const f = useCurrentFrame();
  const b = beats();
  const therapyOut = b.because - 14;
  const titleIn = prog(f, b.close - 14, 22, ease.camera);
  return (
    <AbsoluteFill>
      {/* Find the right support for you */}
      <SectionHeading x={stage.margin} y={60} start={b.ready} exit={therapyOut}>Find the right support for you</SectionHeading>
      <Still name="screen-therapy-style" cx={560} top={210} height={720} enter={b.style} exit={therapyOut}
        taps={[{ at: explore(b) + 6, u: 0.5, v: 0.33 }]} />
      <Still name="screen-therapy-group" cx={960} top={210} height={720} enter={b.group} exit={therapyOut} />
      <Still name="screen-therapy-suggested" cx={1360} top={210} height={720} enter={b.pro} exit={therapyOut} />

      {/* the journey */}
      <Organic x={150} y={170} size={120} fill={color.periwinkle} kind="leaf" rotate={-24} enter={b.because} exit={b.close - 14} opacity={0.5} />
      <Organic x={820} y={190} size={80} fill={color.pinkLight} kind="petal" rotate={14} enter={b.because + 10} exit={b.close - 14} opacity={0.5} />
      <Woman x={300} y={250} width={400} enter={b.because + 2} exit={b.close - 14} />
      <Mascot x={700} y={600} width={250} enter={b.journey + 20} exit={b.close - 14} />
      <Still name="screen-journal-snapshot" cx={1380} top={150} height={760} enter={b.because + 14} exit={b.close - 14} />

      {/* YANA · YOU ARE NOT ALONE. */}
      <AbsoluteFill style={{ opacity: titleIn, background: `radial-gradient(ellipse 70% 80% at 50% 45%, ${color.lavender} 50%, ${color.bg} 100%)` }} />
      <Mascot x={960 - 150} y={170} width={300} enter={b.close - 4} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 520, textAlign: "center" }}>
        <div style={{ fontSize: 140, lineHeight: "150px", fontWeight: 800, color: color.purple, letterSpacing: "0.05em", ...settle(f, b.close + 4, 18, 16), opacity: prog(f, b.close + 4, 18) }}>YANA</div>
        <div style={{
          fontSize: 40, fontWeight: 700, color: color.indigo, marginTop: 18, ...settle(f, b.close + 26, 18, 12), opacity: prog(f, b.close + 26, 18),
          letterSpacing: `${mix(prog(f, b.close + 26, 60, ease.enter), 0.14, 0.22)}em`,
        }}>YOU ARE NOT ALONE.</div>
      </div>
    </AbsoluteFill>
  );
};

export const S6_CUES = (): Cue[] => {
  const b = beats();
  return [
    { at: b.style, kind: "whoosh", gain: 0.2 },
    { at: explore(b) + 6, kind: "tap" },
    { at: b.group, kind: "whoosh", gain: 0.18 },
    { at: b.pro, kind: "whoosh", gain: 0.18 },
    { at: b.because + 2, kind: "bloom", gain: 0.45 },
    { at: b.journey + 20, kind: "bloom", gain: 0.5 },
    { at: b.close, kind: "chime", gain: 0.6 },
  ];
};
