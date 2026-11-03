/**
 * S12 · First move. First Move → Mutual Funds. (The Home screen is not
 * shown: it displays a fixed wallet balance, which the film avoids.)
 * The sprout jar lifts out of the First Move card into the world, then
 * one coin splits into many — what "spreads your money across many
 * companies" means, explained beside the real screen.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, PHONE_H, screenPoint } from "../components/Phone";
import { Asset, Character } from "../components/primitives";
import { Coin } from "../components/objects";
import { Label } from "../components/type";
import { arc, ease, mix, prog } from "../motion/ease";
import { stage } from "../theme/tokens";
import { C } from "./continuity";

export const phoneGlide = (f: number, from: number, to: number) => mix(prog(f, 0, 20, ease.camera), from, to);

const JAR = { x: 1190, h: 270 };
const SPLIT = { x: 1360, y: 330, r: 150, n: 8 };

export const S12FirstMove = () => {
  const f = useCurrentFrame();
  const cx = phoneGlide(f, C.phone.S11, C.phone.S12);
  // sprout jar: lifts out of the First Move card (screen) into the world
  const lift = prog(f, 52, 24, ease.camera);
  const from = screenPoint(C.phone.S12, 0.5, 0.56);
  const to = { x: JAR.x, y: stage.groundY - JAR.h / 2 };
  const jp = arc(lift, from, to, 80);
  // one coin → many companies
  const one = prog(f, 100, 8);
  const split = prog(f, 112, 22);
  const regroup = prog(f, 158, 16);
  return (
    <AbsoluteFill>
      <Label text="One concept at a time" x={stage.margin} y={96} start={10} />
      <Phone cx={cx} screens={[{ at: 0, name: "app-onboarding-4" }, { at: 8, name: "app-journey-2" }, { at: 98, name: "app-journey-3" }]}
        rings={[
          { at: 120, until: 172, u: 0.273, v: 0.704, w: 0.36, h: 0.04 },
          { at: 134, until: 172, u: 0.695, v: 0.704, w: 0.36, h: 0.04 },
          { at: 148, until: 172, u: 0.273, v: 0.761, w: 0.36, h: 0.04 },
        ]} />
      <Asset name="render-sprout-jar" x={jp.x} y={jp.y} anchor="center" height={mix(lift, PHONE_H * 0.22, JAR.h)} opacity={prog(f, 50, 4)} />
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={1690} enter={20} exit={166} />
      {Array.from({ length: SPLIT.n }).map((_, i) => {
        const a = (i / SPLIT.n) * Math.PI * 2 - Math.PI / 2;
        const r = SPLIT.r * split * (1 - regroup);
        return (
          <div key={i} style={{
            position: "absolute", left: SPLIT.x + Math.cos(a) * r, top: SPLIT.y + Math.sin(a) * r * 0.8,
            transform: `translate(-50%, -50%) scale(${mix(split, 1, 0.55)})`, opacity: one * (1 - prog(f, 170, 8)),
          }}>
            <Coin size={90} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
