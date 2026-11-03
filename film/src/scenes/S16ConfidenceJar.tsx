/**
 * S16 · The Confidence Jar (1:35–1:41). The real jar render lifts out of
 * "Your Confidence Jar". Each practice decision the prototype actually
 * contains drops in as a coin; the meter rises from 10% and HOLDS at ~80%
 * — the destination is implied, never claimed.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, PHONE_H, screenPoint } from "../components/Phone";
import { Asset, Character, Chip } from "../components/primitives";
import { Coin } from "../components/objects";
import { Display } from "../components/type";
import { arc, ease, mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";

const JAR = { x: 1240, h: 380 };
// jar mouth on the render (it sits left of the arrow)
const MOUTH = { x: JAR.x - 70, y: stage.groundY - JAR.h * 0.78 };
const DECISIONS = ["Practice Wallet", "Mutual Funds", "Guided questions", "Compared alternatives", "First investment"];
const DROP0 = 66, DROP_GAP = 18;
const HOLD_AT = 0.8;

export const S16ConfidenceJar = () => {
  const f = useCurrentFrame();
  const lift = prog(f, 20, 30, ease.camera);
  const from = screenPoint(C.phone.S16, 0.52, 0.715);
  const to = { x: JAR.x, y: stage.groundY - JAR.h / 2 };
  const jp = arc(lift, from, to, 90);
  const dropped = DECISIONS.filter((_, i) => f >= DROP0 + i * DROP_GAP + 14).length;
  const level = Math.min(HOLD_AT, 0.1 + dropped * 0.14);
  const shown = mix(prog(f, DROP0, DECISIONS.length * DROP_GAP + 14, ease.linear), 0.1, level);
  return (
    <AbsoluteFill>
      <Phone cx={C.phone.S16} screens={[{ at: 0, name: "app-first-investment-4" }, { at: 6, name: "app-portfolio-1" }]} />
      <Asset name="render-confidence-jar" x={jp.x} y={jp.y} anchor="center" height={mix(lift, PHONE_H * 0.265, JAR.h)} opacity={prog(f, 18, 4)} />
      <Display x={760} y={110} start={44} size={76} lines={[{ text: "Confidence," }, { text: "before real money.", green: true }]} />
      {DECISIONS.map((d, i) => {
        const at = DROP0 + i * DROP_GAP;
        const p = prog(f, at, 14, ease.exit);
        const pt = arc(p, { x: MOUTH.x - 260, y: 330 }, MOUTH, 40);
        return (
          <div key={d}>
            {f >= at && f < at + 15 && (
              <div style={{ position: "absolute", left: pt.x, top: pt.y, transform: "translate(-50%, -50%) scale(0.7)" }}><Coin size={80} /></div>
            )}
            <div style={{ position: "absolute", left: 760, top: 330 + i * 64, ...settle(f, at - 4) }}>
              <Chip bg={color.tint} border={false}>✓ {d}</Chip>
            </div>
          </div>
        );
      })}
      {/* confidence meter in the kit's progress-bar style */}
      <div style={{ position: "absolute", left: JAR.x - 220, top: stage.groundY + 30, width: 440, opacity: prog(f, 56, 10) }}>
        <div style={{ height: 18, borderRadius: 9, background: color.ground, overflow: "hidden" }}>
          <div style={{ width: `${shown * 100}%`, height: "100%", borderRadius: 9, background: `linear-gradient(90deg, ${color.logo[0]}, ${color.olive})` }} />
        </div>
        <div style={{ marginTop: 10, fontSize: 24, fontWeight: 600, display: "flex", justifyContent: "space-between" }}>
          <span>Confidence</span><span style={{ color: color.brand }}>{Math.round(shown * 100)}%</span>
        </div>
      </div>
      <Character poses={[{ at: 0, pose: "kit-confident" }]} x={1700} enter={30} />
    </AbsoluteFill>
  );
};
