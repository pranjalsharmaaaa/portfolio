/** S2 · Where did it go? (0:04–0:09) — each notification takes a coin: 7 → 2. */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Asset, Character, Chip } from "../components/primitives";
import { Coin, CoinStack, LineIcon } from "../components/objects";
import { arc, mix, prog } from "../motion/ease";
import { stage } from "../theme/tokens";
import { C } from "./continuity";

const NOTES = [
  { text: "Shopping", icon: <Asset name="kit-bags" x={0} y={0} height={44} anchor="top-left" style={{ position: "relative" }} /> },
  { text: "EMI due", icon: <LineIcon kind="calendar" /> },
  { text: "Credit card bill", icon: <Asset name="kit-card" x={0} y={0} height={40} anchor="top-left" style={{ position: "relative" }} /> },
  { text: "Subscriptions", icon: <LineIcon kind="repeat" /> },
  { text: "Monthly expenses", icon: <LineIcon kind="receipt" /> },
];
const COL_X = 960;
const LAND = (i: number) => 14 + i * 18; // frame each chip starts dropping
const DROP = 12;

export const S02WhereDidItGo = () => {
  const f = useCurrentFrame();
  const taken = NOTES.filter((_, i) => f >= LAND(i) + DROP).length;
  const exit = prog(f, 128, 16);
  return (
    <AbsoluteFill>
      <Character
        poses={[{ at: 0, pose: "kit-working" }, { at: 16, pose: "kit-phone" }, { at: 112, pose: "kit-confused" }]}
        x={C.deskCharX} scale={1.25}
      />
      <CoinStack x={C.stackX} y={stage.groundY} count={7 - taken} size={104} />
      {NOTES.map((n, i) => {
        const p = prog(f, LAND(i), DROP);
        const y = mix(p, -90, 150 + i * 92);
        // the coin pulled off the stack, flying into this notification
        const cp = prog(f, LAND(i) + DROP, 14);
        const from = { x: C.stackX, y: stage.groundY - 70 - (6 - i) * 16.6 };
        const pt = arc(cp, from, { x: COL_X - 40, y: y + 30 }, 120);
        return (
          <div key={n.text}>
            <div style={{ position: "absolute", left: COL_X + exit * 700, top: y, opacity: p * (1 - exit) }}>
              <Chip>{n.icon}{n.text}</Chip>
            </div>
            {cp > 0 && cp < 1 && (
              <div style={{ position: "absolute", left: pt.x - 40, top: pt.y - 20, opacity: 1 - cp * 0.6, transform: `scale(${1 - cp * 0.5})` }}>
                <Coin size={80} />
              </div>
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
