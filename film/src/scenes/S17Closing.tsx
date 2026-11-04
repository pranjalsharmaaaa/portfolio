/**
 * S17 · Understand → Practise → Build Confidence (1:41–1:48).
 * Callback to Act 1: the same "what's left" coins, in the same spot,
 * become the steps of the case study's own illustration — the same
 * character, climbing. Then the closing line and the end card.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Asset } from "../components/primitives";
import { StackMark } from "../components/objects";
import { Display } from "../components/type";
import { ease, mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";
import { WhatsLeft } from "./WhatsLeft";

export const S17Closing = () => {
  const f = useCurrentFrame();
  const coinsOut = prog(f, 22, 14);
  const steps = prog(f, 24, 18);
  const push = prog(f, 24, 110, ease.camera);
  const recede = prog(f, 120, 18);
  const fadeAll = prog(f, 184, 14);
  return (
    <AbsoluteFill style={{ opacity: 1 - fadeAll }}>
      <WhatsLeft x={C.stackX} dropFrom={0} opacity={1 - coinsOut} />
      <Asset name="steps-climb" x={960} y={stage.groundY + 64} height={660}
        opacity={steps * mix(recede, 1, 0.1)} scale={1 + 0.04 * push} style={{ transform: `translateY(${-30 * recede}px)` }} />
      <Display x={960} y={250} align="center" width={1600} start={128} size={84}
        lines={[{ text: "Understand money." }, { text: "Build confidence." }, { text: "Make informed decisions.", green: true }]} />
      <div style={{ position: "absolute", left: 960, top: 690, transform: "translate(-50%, 0)" }}>
        <div style={settle(f, 154)}>
          <div style={{ transform: "scale(0.42)", transformOrigin: "50% 0" }}><StackMark size={1} /></div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 900, textAlign: "center", fontSize: 26, color: color.slate, ...settle(f, 160) }}>
        A product design case study by <strong>Pranjal Sharma</strong>
        <span style={{ color: color.muted }}>  ·  pranjaldesign.vercel.app</span>
      </div>
    </AbsoluteFill>
  );
};
