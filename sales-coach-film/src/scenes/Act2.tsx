/**
 * Scene 4 · Understand and ask (0:22.5–0:39.5).
 * Real screens: phone-home-accounts → phone-home-expanded (JK Tyres) →
 * phone-meeting-brief, then the Ask Coach recording (ask-in-context.mp4).
 * Titles and principle are the case study's own section copy.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Eyebrow, Illus, scImage, Title } from "../components/primitives";
import { PhoneImage, PhoneVideo } from "../components/Phone";
import { ease, prog, settle } from "../motion/ease";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

const CX = 1300;
const TOP = 128;

export const S4 = () => {
  const f = useCurrentFrame();
  const understand = phraseAt("S4", 1); // "understand the account,"
  const context = phraseAt("S4", 2); // "and get the context that matters — all in one place."
  const ask = phraseAt("S4", 3); // "Need to go deeper? Just ask."
  const voice = phraseAt("S4", 4); // "With voice-first AI, …"
  const zoom = prog(f, context + 14, ask - context - 10, ease.camera) * (1 - prog(f, ask - 8, 10));
  const videoIn = prog(f, ask - 2, 10);
  return (
    <AbsoluteFill>
      {/* Understand the Account */}
      <Eyebrow x={stage.margin} y={210} start={4} exit={ask - 8}>Understand</Eyebrow>
      <Title plain="Understand the Account" x={stage.margin} y={256} start={8} exit={ask - 8} width={760} />
      {[
        { at: 9, text: "Upcoming conversations" },
        { at: understand, text: "Account context" },
        { at: context, text: "What matters for this meeting" },
      ].map((b, i) => (
        <div key={b.text} style={{
          position: "absolute", left: stage.margin, top: 420 + i * 78, display: "flex", alignItems: "center", gap: 18,
          fontSize: 32, fontWeight: 500, letterSpacing: "-0.01em", color: color.ink, ...settle(f, b.at + 4), opacity: prog(f, b.at + 4, 12) * (1 - prog(f, ask - 8, 10)),
        }}>
          <span style={{ width: 44, height: 44, borderRadius: 22, background: color.num, color: color.red, fontSize: 20, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          {b.text}
        </div>
      ))}

      {/* real screens; taps land on real buttons */}
      <PhoneImage cx={CX} top={TOP} opacity={1 - videoIn} scale={1 + 0.1 * zoom} origin="50% 36%"
        screens={[
          { at: 0, name: "phone-home-accounts" },
          { at: understand - 6, name: "phone-home-expanded" },
          { at: context, name: "phone-meeting-brief" },
        ]}
        ripples={[{ at: understand - 14, u: 0.5, v: 0.355 }, { at: context - 10, u: 0.29, v: 0.755 }]}
        rings={[
          { at: 14, until: understand - 16, u: 0.5, v: 0.405, w: 0.84, h: 0.25 },
          { at: understand + 8, until: context - 12, u: 0.5, v: 0.53, w: 0.84, h: 0.13 },
          { at: context + 30, until: ask - 12, u: 0.5, v: 0.52, w: 0.86, h: 0.16 },
        ]} />

      {/* Ask in Context */}
      <Eyebrow x={stage.margin} y={170} start={ask + 2}>Ask</Eyebrow>
      <Title plain="Ask in Context" x={stage.margin} y={216} start={ask + 6} width={760} />
      <div style={{ position: "absolute", left: stage.margin, top: 310, width: 700, fontSize: 30, lineHeight: "40px", color: color.ink, ...settle(f, voice + 4), opacity: prog(f, voice + 4, 14) }}>
        <span style={{ color: color.red, fontWeight: 500 }}>Voice should be where the work is.</span>{" "}
        Ask instantly, without leaving the current context.
      </div>
      <Illus src={scImage("ai-conversational")} x={90} y={430} width={760} enter={ask + 10} drift={3} />
      <PhoneVideo cx={CX} top={TOP} src="sc/videos/ask-in-context.mp4" aspect="1080 / 2346" opacity={videoIn}
        clips={[{ at: ask - 2, fromSec: 0, frames: 510 - ask + 2 }]} />
    </AbsoluteFill>
  );
};

