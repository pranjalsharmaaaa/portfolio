/**
 * S9 · The real problem (0:53–0:58). The problem statement (verbatim),
 * then the five areas compress into the Stack Up mark — the key
 * transformation into Act 4.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Character } from "../components/primitives";
import { StackMark } from "../components/objects";
import { Display, Label, Statement } from "../components/type";
import { prog } from "../motion/ease";
import { stage } from "../theme/tokens";
import { BiggerPictureRow } from "./BiggerPicture";
import { C } from "./continuity";
import { S08_TEXT_AT } from "./S08BiggerPicture";

export const MarkAt = ({ build, word, scale = 1, opacity = 1 }: { build: number; word: number; scale?: number; opacity?: number }) => (
  <div style={{
    position: "absolute", left: C.markCenter.x, top: C.markCenter.y, opacity,
    transform: `translate(-50%, -50%) scale(${scale})`,
  }}>
    <StackMark size={1.1} build={build} word={word} />
  </div>
);

export const S09Problem = () => {
  const f = useCurrentFrame();
  const gather = prog(f, 102, 24);
  const chrome = 1 - prog(f, 96, 10);
  return (
    <AbsoluteFill>
      {/* S8's heading leaves as the problem statement arrives */}
      <Display x={stage.margin} y={140} start={-S08_TEXT_AT} size={88} exit={0}
        lines={[{ text: "Managing money" }, { text: "isn’t just investing.", green: true }]} />
      <BiggerPictureRow build={999} gather={gather} chrome={chrome} />
      <Character poses={[{ at: 0, pose: "kit-realisation" }, { at: 12, pose: "kit-confused" }]} x={C.rowCharX} scale={1.05} exit={98} />
      <Label text="Problem statement" x={stage.margin} y={96} start={8} exit={104} />
      <Statement x={stage.margin} y={150} width={1420} start={12} exit={104}
        text="Financial products help people execute decisions, but do little to build the ==understanding and confidence== needed to make those decisions independently." />
      <MarkAt build={prog(f, 108, 30)} word={0} />
    </AbsoluteFill>
  );
};
