/**
 * S2 · Essentials first, then what's left (0:04–0:12.5).
 *
 * The product's founding idea: Stack Up is not about the whole salary.
 * The essentials (rent, electricity, groceries, transport) each take a
 * coin into their own stack and are marked as covered; the coins that
 * remain light up as "What's left" — the money the rest of the film,
 * and Stack Up, is about.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Character, Chip } from "../components/primitives";
import { Coin, CoinStack, LineIcon } from "../components/objects";
import { Display, Label } from "../components/type";
import { arc, mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { phraseAt } from "../timeline";
import { C } from "./continuity";
import { WhatsLeft } from "./WhatsLeft";

const ESSENTIALS = [
  { text: "Rent", icon: "home" as const },
  { text: "Electricity", icon: "bolt" as const },
  { text: "Groceries", icon: "cart" as const },
  { text: "Transport", icon: "bus" as const },
];
const COL_X = 980;
/** Chips drop as each essential is spoken (phrase 2 of the narration). */
const LIST_AT = phraseAt("S02", 1, 88);
const LAND = (i: number) => LIST_AT - 8 + i * 22;
const DROP = 12;
const FLY = 16;
const COIN = 104;
const STEP = COIN * 0.16;
/** Frames: essentials marked covered → what's left highlighted → line. */
const LEFT_AT = phraseAt("S02", 2, 192); // "Then you look at what's left…"
const T = { covered: LAND(3) + 34, highlight: LEFT_AT, line: LEFT_AT + 12, out: 230 };

export const S02WhereDidItGo = () => {
  const f = useCurrentFrame();
  const left = ESSENTIALS.filter((_, i) => f >= LAND(i) + DROP).length; // coins pulled off the salary
  const arrived = ESSENTIALS.filter((_, i) => f >= LAND(i) + DROP + FLY).length; // coins in the essentials stack
  const covered = prog(f, T.covered, 14);
  const out = prog(f, T.out, 16);
  return (
    <AbsoluteFill>
      <Label text="Payday" x={stage.margin} y={96} start={-30} exit={0} />
      <Label text="Essentials first" x={stage.margin} y={96} start={12} />
      <Character poses={[{ at: 0, pose: "kit-working" }, { at: LIST_AT - 14, pose: "kit-phone" }]} x={C.deskCharX} scale={1.25} />

      {/* the essentials' own stack, set apart on the left */}
      <div style={{ opacity: mix(covered, 1, 0.45) * (1 - out) }}>
        <CoinStack x={C.essentialsX} y={stage.groundY} count={arrived} size={COIN} />
        <div style={{ position: "absolute", left: C.essentialsX, top: stage.groundY + 22, transform: "translateX(-50%)", opacity: prog(f, T.covered, 10) }}>
          <Chip bg={color.tint} border={false}>✓ Essentials covered</Chip>
        </div>
      </div>

      {/* the salary stack shrinks to what's left, then lights up */}
      <WhatsLeft x={C.stackX} count={7 - left} glow={prog(f, T.highlight, 16)} tag={prog(f, T.highlight + 6, 12)} />

      {ESSENTIALS.map((n, i) => {
        const p = prog(f, LAND(i), DROP);
        const y = mix(p, -90, 170 + i * 92);
        const cp = prog(f, LAND(i) + DROP, FLY);
        const from = { x: C.stackX, y: stage.groundY - 70 - (6 - i) * STEP };
        const to = { x: C.essentialsX, y: stage.groundY - 70 - i * STEP };
        const pt = arc(cp, from, to, 150);
        return (
          <div key={n.text}>
            <div style={{
              position: "absolute", left: COL_X, top: y - out * 30,
              opacity: p * mix(covered, 1, 0.5) * (1 - out),
            }}>
              <Chip><LineIcon kind={n.icon} />{n.text}{covered > 0.5 ? <span style={{ color: color.brand, fontWeight: 700 }}>✓</span> : null}</Chip>
            </div>
            {cp > 0 && cp < 1 && (
              <div style={{ position: "absolute", left: pt.x, top: pt.y, transform: "translate(-50%, -50%)" }}>
                <Coin size={COIN} />
              </div>
            )}
          </div>
        );
      })}

      <Display x={stage.margin} y={160} start={T.line} size={72}
        lines={[{ text: "Essentials covered." }, { text: "Now, what’s left.", green: true }]} />
    </AbsoluteFill>
  );
};
