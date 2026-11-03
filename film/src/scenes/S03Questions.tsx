/**
 * S3 · The questions (0:09–0:15) — closer, quieter. Three bubbles draw
 * on, then condense into a single "?" that becomes a text cursor (match
 * cut into Act 2).
 */
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Character } from "../components/primitives";
import { CoinStack } from "../components/objects";
import { ThoughtBubble } from "../components/ThoughtBubble";
import { mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";

const BUBBLES = [
  { x: 260, y: 150, w: 470, h: 150, text: "How do I start managing money?", start: 8, tail: "right" as const },
  { x: 1250, y: 130, w: 430, h: 150, text: "How do I track everything?", start: 44, tail: "left" as const },
  { x: 1240, y: 430, w: 520, h: 150, text: "Should I save, invest or get insurance first?", start: 80, tail: "left" as const },
];

export const S03Questions = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const gather = prog(f, 140, 22);
  const qPop = spring({ frame: f - 116, fps, config: { damping: 9, stiffness: 160 } }); // the film's only bounce
  const qX = mix(gather, 1010, 960), qY = mix(gather, 120, 470);
  const toCursor = prog(f, 164, 8);
  const wobble = f > 100 && f < 124 ? Math.sin(f * 0.9) * 2 : 0;
  return (
    <AbsoluteFill>
      <Character poses={[{ at: 0, pose: "kit-thinking" }]} x={960} scale={1.32} exit={140} />
      <div style={{ position: "absolute", inset: 0, transform: `rotate(${wobble * 0.5}deg)`, transformOrigin: `${C.leftoverX}px ${stage.groundY}px`, opacity: 1 - gather }}>
        <CoinStack x={C.leftoverX} y={stage.groundY} count={2} size={104} />
      </div>
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
