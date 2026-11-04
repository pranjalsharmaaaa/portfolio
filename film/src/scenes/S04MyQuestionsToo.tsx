/**
 * S4 · These were my questions too (0:15–0:25) — the emotional turn.
 * The cursor from S3 types the case study's opening question, then the
 * live brief arrives and the designer's own realisation is annotated.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Character } from "../components/primitives";
import { Annotation, Body, Display, Label } from "../components/type";
import { mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { phraseAt } from "../timeline";

/** The brief card arrives with "My semester project became the perfect excuse…" */
const CARD_AT = phraseAt("S04", 1, 76) - 14;

export const S04MyQuestionsToo = () => {
  const f = useCurrentFrame();
  const blink = f < 22 && Math.floor(f / 8) % 2 === 0 ? 1 : 0;
  const cardIn = prog(f, CARD_AT, 20);
  const underline = prog(f, CARD_AT + 40, 14);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 957, top: 430, width: 6, height: 84, background: color.ink, opacity: blink }} />
      <Label text="My journey" x={stage.margin} y={96} start={22} />
      {/* the case study's own opening, verbatim */}
      <Display x={stage.margin} y={290} start={24} exit={CARD_AT - 4}
        lines={[{ text: "You earn money." }, { text: "But how do you manage it?", green: true }]} />
      <Character poses={[{ at: 0, pose: "phone-notebook" }]} x={1700} enter={18} exit={180} scale={0.96} />

      {/* the live brief */}
      <div style={{
        position: "absolute", left: mix(cardIn, -980, stage.margin), top: 200, width: 900, padding: "36px 44px",
        background: color.card, borderRadius: 24, transform: "rotate(-1.5deg)", opacity: cardIn,
        boxShadow: "0 18px 40px rgb(38 38 38 / 9%), 0 0 0 1.5px rgb(38 38 38 / 8%)",
      }}>
        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.08em", color: color.muted, marginBottom: 16 }}>
          SEMESTER PROJECT · LIVE BRIEF
        </div>
        <div style={{ fontSize: 38, lineHeight: "52px", fontWeight: 500 }}>
          “Design a Personal Finance Management experience that helps people{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            manage
            <svg viewBox="0 0 160 20" preserveAspectRatio="none" style={{ position: "absolute", left: -4, bottom: -12, width: "110%", height: 18, overflow: "visible" }}>
              <path d="M2 12 C 40 4, 90 18, 158 8" fill="none" stroke={color.brand} strokeWidth={4} strokeLinecap="round"
                pathLength={1} strokeDasharray={1} strokeDashoffset={1 - underline} />
            </svg>
          </span>{" "}
          their overall net worth.”
        </div>
      </div>
      <Annotation text="…but did I know how?" x={840} y={540} start={CARD_AT + 52} />

      <Body x={stage.margin} y={620} width={1150} start={CARD_AT + 78} size={34}
        text="I realised I first needed to **understand the financial ecosystem myself.**" />
    </AbsoluteFill>
  );
};
