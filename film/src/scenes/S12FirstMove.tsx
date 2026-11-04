/**
 * S12 · Where to begin.
 *
 * Product concept: Stack Up doesn't force one first step. People choose
 * where to begin — saving, insurance or investing — and the film follows
 * ONE example path (mutual funds). The three options are drawn in the
 * film's illustration language OUTSIDE the phone (not as invented UI);
 * "Investing" lifts as the example while the narrator says "Say you pick
 * mutual funds", then the real First Move → Mutual Funds screens follow.
 * (The Home screen is not shown: it displays a fixed wallet balance.)
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, PHONE_H, screenPoint } from "../components/Phone";
import { Asset, Character, Chip } from "../components/primitives";
import { Coin } from "../components/objects";
import { Label } from "../components/type";
import { arc, ease, mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { phraseAt } from "../timeline";
import { C } from "./continuity";

export const phoneGlide = (f: number, from: number, to: number) => mix(prog(f, 0, 20, ease.camera), from, to);

/** "saving, insurance, or investing" / "Say you pick mutual funds" */
const NAMED = phraseAt("S12", 1, 63);
const PICK = phraseAt("S12", 2, 138);

const CHOICES = [
  { label: "Saving", asset: "kit-jar", x: 1100 },
  { label: "Insurance", asset: "kit-shield", x: 1310 },
  { label: "Investing", asset: "kit-chart", x: 1520 },
];
const EXAMPLE = 2;
const JAR = { x: 1190, h: 270 };
const SPLIT = { x: 1400, y: 330, r: 150, n: 8 };

export const S12FirstMove = () => {
  const f = useCurrentFrame();
  const cx = phoneGlide(f, C.phone.S11, C.phone.S12);
  const picked = prog(f, PICK, 12);
  const choicesOut = prog(f, PICK + 34, 12);
  // sprout jar: lifts out of the First Move card (screen) into the world
  const lift = prog(f, PICK + 30, 24, ease.camera);
  const jp = arc(lift, screenPoint(C.phone.S12, 0.5, 0.56), { x: JAR.x, y: stage.groundY - JAR.h / 2 }, 80);
  // one coin → many companies (what "spreads your money" means)
  const one = prog(f, PICK + 58, 8);
  const split = prog(f, PICK + 64, 18);
  return (
    <AbsoluteFill>
      <Label text="Where to begin" x={stage.margin} y={96} start={10} />
      <Phone cx={cx}
        screens={[{ at: 0, name: "app-onboarding-4" }, { at: PICK + 4, name: "app-journey-2" }, { at: PICK + 54, name: "app-journey-3" }]}
        rings={[
          { at: PICK + 60, until: 226, u: 0.273, v: 0.704, w: 0.36, h: 0.04 },
          { at: PICK + 68, until: 226, u: 0.695, v: 0.704, w: 0.36, h: 0.04 },
          { at: PICK + 76, until: 226, u: 0.273, v: 0.761, w: 0.36, h: 0.04 },
        ]} />

      {/* the three places someone might begin — investing is just the example */}
      {CHOICES.map((c, i) => {
        const appear = prog(f, NAMED - 6 + i * 10, 12);
        const isExample = i === EXAMPLE;
        const o = appear * (isExample ? 1 : mix(picked, 1, 0.3)) * (1 - choicesOut);
        return (
          <div key={c.label} style={{ opacity: o }}>
            <Asset name={c.asset} x={c.x} height={150} scale={isExample ? mix(picked, 1, 1.12) : 1} />
            <div style={{ position: "absolute", left: c.x, top: stage.groundY + 22, transform: "translateX(-50%)" }}>
              <Chip bg={isExample && picked > 0.5 ? color.brand : color.tint} fg={isExample && picked > 0.5 ? "white" : color.ink} border={false}>
                {c.label}
              </Chip>
            </div>
          </div>
        );
      })}

      <Asset name="render-sprout-jar" x={jp.x} y={jp.y} anchor="center" height={mix(lift, PHONE_H * 0.22, JAR.h)} opacity={prog(f, PICK + 28, 4)} />
      <Character poses={[{ at: 0, pose: "kit-thinking" }, { at: PICK, pose: "kit-phone" }]} x={1760} scale={0.9} enter={10} exit={218} />
      {Array.from({ length: SPLIT.n }).map((_, i) => {
        const a = (i / SPLIT.n) * Math.PI * 2 - Math.PI / 2;
        const r = SPLIT.r * split;
        return (
          <div key={i} style={{
            position: "absolute", left: SPLIT.x + Math.cos(a) * r, top: SPLIT.y + Math.sin(a) * r * 0.8,
            transform: `translate(-50%, -50%) scale(${mix(split, 1, 0.55)})`, opacity: one * (1 - prog(f, 218, 8)),
          }}>
            <Coin size={90} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
