/**
 * S10 · The reveal (0:58–1:03). The mark completes, the wordmark
 * arrives, then the whole logo shrinks and docks into the real Welcome
 * screen as the phone appears around it — the first phone in the film.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, screenPoint } from "../components/Phone";
import { Character } from "../components/primitives";
import { StackMark } from "../components/objects";
import { Display } from "../components/type";
import { ease, mix, prog } from "../motion/ease";
import { stage } from "../theme/tokens";
import { C } from "./continuity";

/** Where the logo sits on app-onboarding-1 (fractions of the screen image). */
const SCREEN_LOGO = { u: 0.496, v: 0.126 };
const DOCK_SCALE = 0.15;

export const S10Reveal = () => {
  const f = useCurrentFrame();
  const word = prog(f, 6, 18);
  const dock = prog(f, 40, 26, ease.camera);
  const target = screenPoint(C.phone.S10, SCREEN_LOGO.u, SCREEN_LOGO.v);
  const x = mix(dock, C.markCenter.x, target.x);
  const y = mix(dock, C.markCenter.y, target.y);
  const phoneIn = prog(f, 52, 16);
  return (
    <AbsoluteFill>
      <Phone cx={C.phone.S10} screens={[{ at: 0, name: "app-onboarding-1" }]} opacity={phoneIn} scale={mix(phoneIn, 0.96, 1)} />
      <div style={{
        position: "absolute", left: x, top: y, opacity: 1 - prog(f, 64, 8),
        transform: `translate(-50%, -50%) scale(${mix(dock, 1, DOCK_SCALE)})`,
      }}>
        <StackMark size={1.1} build={1} word={word} />
      </div>
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={560} enter={66} />
      <Display lines={[{ text: "Practise first.", green: true }]} x={stage.margin} y={150} start={78} exit={128} size={88} />
    </AbsoluteFill>
  );
};
