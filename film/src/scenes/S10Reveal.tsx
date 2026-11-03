/**
 * S10 · The reveal (0:58–1:03). The mark completes, the wordmark
 * arrives, then the whole logo shrinks and docks into the real Welcome
 * screen as the phone appears around it — the first phone in the film.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, screenPoint } from "../components/Phone";
import { Character } from "../components/primitives";
import { StackMark } from "../components/objects";
import { ease, mix, prog } from "../motion/ease";
import { C } from "./continuity";

/** Where the logo sits on app-onboarding-1 (fractions of the screen image). */
const SCREEN_LOGO = { u: 0.496, v: 0.126 };
const DOCK_SCALE = 0.15;

export const S10Reveal = () => {
  const f = useCurrentFrame();
  const word = prog(f, 4, 14);
  const dock = prog(f, 26, 24, ease.camera);
  const target = screenPoint(C.phone.S10, SCREEN_LOGO.u, SCREEN_LOGO.v);
  const x = mix(dock, C.markCenter.x, target.x);
  const y = mix(dock, C.markCenter.y, target.y);
  const phoneIn = prog(f, 36, 14);
  return (
    <AbsoluteFill>
      <Phone cx={C.phone.S10} screens={[{ at: 0, name: "app-onboarding-1" }]} opacity={phoneIn} scale={mix(phoneIn, 0.96, 1)} />
      <div style={{
        position: "absolute", left: x, top: y, opacity: 1 - prog(f, 48, 8),
        transform: `translate(-50%, -50%) scale(${mix(dock, 1, DOCK_SCALE)})`,
      }}>
        <StackMark size={1.1} build={1} word={word} />
      </div>
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={560} enter={44} />
    </AbsoluteFill>
  );
};
