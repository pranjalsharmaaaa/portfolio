/**
 * S11 · Coin stack → Practice Wallet → phone (1:03–1:09).
 * The signature transformation: a fresh coin stack morphs into the
 * product's own wallet render, which flies into the phone and lands
 * exactly where it sits on "Meet Your Practice Wallet".
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, PHONE_H, screenPoint } from "../components/Phone";
import { Asset, Character } from "../components/primitives";
import { CoinStack } from "../components/objects";
import { Body } from "../components/type";
import { arc, ease, mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";

const STACK_X = 880;
const WALLET_H = 300;
/** Wallet render position on app-onboarding-4 (centre, fraction of screen) + its on-screen height. */
const ON_SCREEN = { u: 0.5, v: 0.235, h: PHONE_H * 0.3 };

export const S11Wallet = () => {
  const f = useCurrentFrame();
  const morph = prog(f, 34, 16);
  const fly = prog(f, 52, 28, ease.camera);
  const target = screenPoint(C.phone.S11, ON_SCREEN.u, ON_SCREEN.v);
  const start = { x: STACK_X, y: stage.groundY - WALLET_H / 2 };
  const pt = arc(fly, start, target, 120);
  const h = mix(fly, WALLET_H, ON_SCREEN.h);
  const counter = Math.round(25000 * prog(f, 124, 22));
  return (
    <AbsoluteFill>
      <Phone cx={C.phone.S11} screens={[{ at: 0, name: "app-onboarding-1" }, { at: 78, name: "app-onboarding-4" }, { at: 120, name: "app-onboarding-5" }]} />
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={560} exit={166} />
      <CoinStack x={STACK_X} y={stage.groundY} count={5} size={110} dropFrom={4} opacity={1 - morph} />
      <Asset name="render-wallet" x={pt.x} y={pt.y} anchor="center" height={h}
        opacity={morph * (1 - prog(f, 86, 6))} scale={mix(morph, 0.7, 1)} />
      <div style={{ position: "absolute", left: stage.margin, top: 150, ...settle(f, 122) }}>
        <div style={{ fontSize: 120, lineHeight: "130px", fontWeight: 700, letterSpacing: "-0.03em", color: color.brand }}>
          ₹{counter.toLocaleString("en-IN")}
        </div>
      </div>
      <Body x={stage.margin} y={300} width={640} start={136} size={34} text="of **virtual money**. Real decisions, no real risk." />
    </AbsoluteFill>
  );
};
