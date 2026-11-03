/**
 * S14 · Recommendation, with reasons, and alternatives (1:21–1:27).
 * The real ICICI Prudential Balanced Advantage Fund screen ("Your Best
 * Match") as hero, then the two real alternatives fan out behind it.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone } from "../components/Phone";
import { Asset, Character } from "../components/primitives";
import { Body } from "../components/type";
import { mix, prog } from "../motion/ease";
import { C } from "./continuity";

const SIDES = [
  { name: "app-fund-selection-2", x: 560, rot: -5, icon: "kit-chart" }, // SBI Equity Hybrid — More Growth
  { name: "app-fund-selection-3", x: 1360, rot: 5, icon: "kit-shield" }, // HDFC Balanced Advantage — More Stable
];

export const S14Recommendation = () => {
  const f = useCurrentFrame();
  const fan = prog(f, 82, 22) * (1 - prog(f, 152, 20));
  return (
    <AbsoluteFill>
      {SIDES.map((s) => (
        <div key={s.name}>
          <Phone cx={mix(fan, C.phone.S14, s.x)} screens={[{ at: 0, name: s.name }]} opacity={fan} rotate={s.rot * fan} scale={0.74} top={150} />
          <Asset name={s.icon} x={s.x} y={250} height={80} opacity={prog(f, 100, 10) * (1 - prog(f, 150, 8))} />
        </div>
      ))}
      <Phone cx={C.phone.S14} screens={[{ at: 0, name: "app-recommendation-2" }, { at: 6, name: "app-fund-selection-1" }]}
        rings={[{ at: 28, until: 84, u: 0.3, v: 0.652, w: 0.36, h: 0.045 }]} />
      <Character poses={[{ at: 0, pose: "kit-comparing" }, { at: 134, pose: "kit-realisation" }]} x={200} scale={0.92} enter={0} exit={168} />
      <Body x={120} y={110} width={560} start={22} size={36} text="**Recommended** — with the reasoning." />
      <Body x={1290} y={110} width={520} start={98} size={36} text="**Compare** before you choose." />
    </AbsoluteFill>
  );
};
