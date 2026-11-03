/**
 * S3 · The questions (0:12.5–0:17.5) — closer, quieter. "What's left"
 * sits at the character's feet; the questions are about that money.
 * The bubbles condense into a single "?" that becomes a text cursor
 * (match cut into Act 2).
 */
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "../components/primitives";
import { ThoughtBubble } from "../components/ThoughtBubble";
import { mix, prog } from "../motion/ease";
import { color } from "../theme/tokens";
import { C } from "./continuity";
import { WhatsLeft } from "./WhatsLeft";

const BUBBLES = [
  { x: 240, y: 150, w: 470, h: 150, text: "What do I do with what’s left?", start: 6, tail: "right" as const },
  { x: 1250, y: 130, w: 430, h: 150, text: "How do I track everything?", start: 32, tail: "left" as const },
  { x: 1240, y: 430, w: 520, h: 150, text: "Should I save, invest or get insurance first?", start: 58, tail: "left" as const },
];
const T = { pop: 86, gather: 106, cursor: 130 };

export const S03Questions = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gather = prog(f, T.gather, 22);
  const qPop = spring({ frame: f - T.pop, fps, config: { damping: 9, stiffness: 160 } }); // the film's only bounce
  const qX = mix(gather, 1010, 960), qY = mix(gather, 120, 470);
  const toCursor = prog(f, T.cursor, 8);
  return (
    <AbsoluteFill>
      <Character poses={[{ at: 0, pose: "kit-thinking" }]} x={960} scale={1.32} exit={T.gather} />
      <WhatsLeft x={C.leftoverX} opacity={1 - gather} />
      {BUBBLES.map((b) => (
        <div key={b.text} style={{
          position: "absolute", inset: 0, opacity: 1 - gather,
          transform: `translate(${(960 - (b.x + b.w / 2)) * gather}px, ${(470 - (b.y + b.h / 2)) * gather}px) scale(${1 - gather * 0.7})`,
        }}>
          <ThoughtBubble {...b} />
        </div>
      ))}
      <div style={{
        position: "absolute", left: qX, top: qY, transform: `translate(-50%, -50%) scale(${Math.max(qPop, 0) * (1 - toCursor)})`,
        color: color.question, fontSize: 140, fontWeight: 700, lineHeight: 1,
      }}>?</div>
      {/* the cursor that Act 2 starts with */}
      <div style={{ position: "absolute", left: 957, top: 430, width: 6, height: 84, background: color.ink, opacity: toCursor }} />
    </AbsoluteFill>
  );
};
