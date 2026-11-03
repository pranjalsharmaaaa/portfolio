/**
 * S13 · Guided questions (1:15–1:21). The two real comfort questions,
 * the real loader, then Best Starting Point. Taps land only on options
 * already shown selected in the prototype screens.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone } from "../components/Phone";
import { Character } from "../components/primitives";
import { Body } from "../components/type";
import { prog } from "../motion/ease";
import { color } from "../theme/tokens";
import { C } from "./continuity";
import { phoneGlide } from "./S12FirstMove";

export const S13Questions = () => {
  const f = useCurrentFrame();
  const cx = phoneGlide(f, C.phone.S12, C.phone.S13);
  const dots = prog(f, 14, 12) * (1 - prog(f, 100, 10));
  return (
    <AbsoluteFill>
      <Phone cx={cx}
        screens={[
          { at: 0, name: "app-journey-3" }, { at: 8, name: "app-journey-4" }, { at: 66, name: "app-journey-5" },
          { at: 108, name: "app-recommendation-1" }, { at: 136, name: "app-recommendation-2" },
        ]}
        ripples={[{ at: 40, u: 0.5, v: 0.484 }, { at: 92, u: 0.48, v: 0.49 }]} />
      <Character poses={[{ at: 0, pose: "kit-comparing" }]} x={420} enter={10} />
      {/* steady vs. moving — the question, as two dots */}
      <div style={{ position: "absolute", left: 1290, top: 420, opacity: dots }}>
        <div style={{ position: "absolute", width: 34, height: 34, borderRadius: "50%", background: color.brand }} />
        <div style={{ position: "absolute", left: 80, top: Math.sin(f / 6) * 36, width: 34, height: 34, borderRadius: "50%", background: color.olive }} />
      </div>
      <Body x={1240} y={200} width={560} start={20} size={40} text="**Guided questions**, not jargon." />
    </AbsoluteFill>
  );
};
