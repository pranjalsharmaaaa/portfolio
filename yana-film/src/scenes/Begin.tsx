/**
 * Scene 4 · Start at your own pace (0:23.8–0:33.6).
 * The real onboarding: Welcome → How have you been feeling lately? →
 * What areas would you like support with? → All set! → the personalised
 * home (Mood Relaxer). Taps land only on real buttons. Copy is the case
 * study's own ("A more personal starting point" and its three features;
 * "A home that meets you where you are").
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Organic, SectionHeading } from "../components/primitives";
import { Screens } from "../components/Screen";
import { prog, settle } from "../motion/ease";
import type { Cue } from "../sfx";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

const FEATURES = [
  { title: "A safe space", body: "Answer at your own pace" },
  { title: "Personalized Experience", body: "Content and support adapted to you" },
  { title: "Private and Confidential", body: "Your responses are always safe with us" },
];

const beats = () => {
  const feeling = phraseAt("S4", 1); // "Check in with how you're feeling,"
  const explore = phraseAt("S4", 2); // "explore what matters to you,"
  const space = phraseAt("S4", 3); // "and find a space that understands your needs."
  return { feeling, explore, space, home: space + 44 };
};

export const S4 = () => {
  const f = useCurrentFrame();
  const { feeling, explore, space, home } = beats();
  const featureAt = [10, explore + 4, space + 4];
  return (
    <AbsoluteFill>
      <Organic x={1500} y={150} size={150} fill={color.purpleLight} kind="pebble" phase={1} />
      <Organic x={960} y={760} size={110} fill={color.lavender} kind="leaf" rotate={-30} phase={2} />
      <SectionHeading x={stage.margin} y={170} start={4} exit={home - 8}>A more personal starting point</SectionHeading>
      <SectionHeading x={stage.margin} y={170} start={home + 2}>A home that meets you where you are</SectionHeading>
      {FEATURES.map((k, i) => (
        <div key={k.title} style={{
          position: "absolute", left: stage.margin + 30, top: 360 + i * 120, display: "flex", gap: 22, alignItems: "flex-start",
          ...settle(f, featureAt[i], 14), opacity: prog(f, featureAt[i], 14) * (1 - prog(f, home - 8, 10)),
        }}>
          <span style={{ marginTop: 10, width: 18, height: 18, borderRadius: "50%", background: color.purple, boxShadow: `0 0 0 8px ${color.purpleLight}` }} />
          <div>
            <div style={{ fontSize: 34, fontWeight: 700, color: color.ink }}>{k.title}</div>
            <div style={{ fontSize: 26, color: color.muted, marginTop: 4 }}>{k.body}</div>
          </div>
        </div>
      ))}
      <div style={{
        position: "absolute", left: stage.margin + 30, top: 360, width: 700, fontSize: 32, lineHeight: "46px", color: color.ink,
        ...settle(f, home + 10, 14), opacity: prog(f, home + 10, 14),
      }}>
        YANA adapts to your mood, interests and needs — bringing personalized content, tools and a supportive community, all in one place.
      </div>
      <Screens cx={1300} top={130} height={800}
        screens={[
          { at: 0, name: "screen-onboarding-welcome" },
          { at: feeling - 6, name: "screen-onboarding-feeling" },
          { at: explore - 6, name: "screen-onboarding-areas" },
          { at: space - 6, name: "screen-onboarding-allset" },
          { at: home - 6, name: "screen-home-mood-relaxer" },
        ]}
        taps={[
          { at: feeling - 22, u: 0.5, v: 0.874 }, // Get Started
          { at: feeling + 24, u: 0.5, v: 0.68 }, // Overwhelmed (selected on the real screen)
          { at: explore - 20, u: 0.5, v: 0.909 }, // Next
          { at: space - 20, u: 0.5, v: 0.916 }, // Next
          { at: home - 22, u: 0.5, v: 0.907 }, // Take me to YANA
        ]} />
    </AbsoluteFill>
  );
};

export const S4_CUES = (): Cue[] => {
  const { feeling, explore, space, home } = beats();
  return [
    { at: feeling - 22, kind: "tap" }, { at: feeling + 24, kind: "tap", gain: 0.7 }, { at: explore - 20, kind: "tap" },
    { at: space - 20, kind: "tap" }, { at: home - 22, kind: "tap" }, { at: home - 6, kind: "whoosh", gain: 0.25 },
  ];
};
