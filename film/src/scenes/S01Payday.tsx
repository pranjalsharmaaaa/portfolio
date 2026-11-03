/** S1 · Payday (0:00–0:04) — the salary arrives and becomes a coin stack. */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Asset, Character, Stroke } from "../components/primitives";
import { CoinStack } from "../components/objects";
import { Label } from "../components/type";
import { mix, prog } from "../motion/ease";
import { stage } from "../theme/tokens";
import { C } from "./continuity";

export const S01Payday = () => {
  const f = useCurrentFrame();
  const buzz = f > 26 && f < 38 ? Math.sin(f * 2.4) * 3 : 0;
  // salary card: rises from the desk, holds, then folds down into the stack
  const rise = prog(f, 34, 22);
  const fold = prog(f, 80, 16);
  const cardX = mix(fold, 1000, C.stackX);
  const cardY = mix(rise, stage.groundY - 20, 420) + mix(fold, 0, 260);
  return (
    <AbsoluteFill>
      <Label text="Payday" x={stage.margin} y={96} start={10} />
      <Character poses={[{ at: 0, pose: "kit-working" }]} x={C.deskCharX} enter={4} scale={1.25} />
      {/* phone lying on the desk, buzzing */}
      <div style={{
        position: "absolute", left: 980 + buzz, top: stage.groundY - 16, width: 86, height: 14, borderRadius: 6,
        background: "#262626", opacity: prog(f, 8, 10),
      }} />
      {f > 26 && f < 44 && (
        <Stroke d="M988 740 l-14 -16 M1023 732 v-22 M1058 740 l14 -16" start={26} dur={6} width={2.5} />
      )}
      <Asset name="kit-salary" x={cardX} y={cardY} anchor="center" height={150}
        opacity={rise * (1 - prog(f, 88, 8))} scale={mix(fold, 1, 0.35)} rotate={-4} />
      <CoinStack x={C.stackX} y={stage.groundY} count={7} dropFrom={86} size={104} />
      {/* sparkle rays above the new stack */}
      <Stroke d={`M${C.stackX - 70} 600 l-18 -16 M${C.stackX} 584 v-26 M${C.stackX + 70} 600 l18 -16`} start={106} dur={8} width={3} />
    </AbsoluteFill>
  );
};
