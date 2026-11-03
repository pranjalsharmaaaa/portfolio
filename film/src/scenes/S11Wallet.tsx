/**
 * S11 · What's left → Practice Wallet → phone (1:01.5–1:09.5).
 *
 * The Practice Wallet is introduced as a SAFE SPACE to practise managing
 * the money left after essentials — never as a fixed amount (no figure is
 * shown anywhere). The same "what's left" coins from Act 1 morph into the
 * product's own wallet render, which flies into "Meet Your Practice Wallet".
 * Screens follow the real onboarding order: Welcome → Learn Without Risk →
 * Meet Your Practice Wallet.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, PHONE_H, screenPoint } from "../components/Phone";
import { Asset, Character } from "../components/primitives";
import { Body } from "../components/type";
import { arc, ease, mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";
import { WhatsLeft } from "./WhatsLeft";

const STACK_X = 880;
const WALLET_H = 300;
/** Wallet render position on app-onboarding-4 (centre, fraction of screen) + its on-screen height. */
const ON_SCREEN = { u: 0.5, v: 0.235, h: PHONE_H * 0.3 };
const T = { morph: 96, fly: 116, wallet: 144, words: 150 };
const WORDS = ["Understand", "Explore", "Practise"];

export const S11Wallet = () => {
  const f = useCurrentFrame();
  const morph = prog(f, T.morph, 16);
  const fly = prog(f, T.fly, 30, ease.camera);
  const target = screenPoint(C.phone.S11, ON_SCREEN.u, ON_SCREEN.v);
  const pt = arc(fly, { x: STACK_X, y: stage.groundY - WALLET_H / 2 }, target, 120);
  return (
    <AbsoluteFill>
      <Phone cx={C.phone.S11} screens={[
        { at: 0, name: "app-onboarding-1" }, { at: 16, name: "app-onboarding-3" }, { at: T.wallet, name: "app-onboarding-4" },
      ]} />
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={560} exit={226} />
      <WhatsLeft x={STACK_X} dropFrom={6} glow={prog(f, 18, 14)} tag={prog(f, 24, 10)} opacity={1 - morph} />
      <Asset name="render-wallet" x={pt.x} y={pt.y} anchor="center" height={mix(fly, WALLET_H, ON_SCREEN.h)}
        opacity={morph * (1 - prog(f, T.wallet + 6, 6))} scale={mix(morph, 0.7, 1)} />
      <Body x={stage.margin} y={150} width={680} start={20} size={46}
        text="A **safe space** to practise managing **what’s left**." />
      <div style={{ position: "absolute", left: stage.margin, top: 320, display: "flex", gap: 22, fontSize: 40, fontWeight: 700 }}>
        {WORDS.map((w, i) => (
          <span key={w} style={{ color: i === 2 ? color.brand : color.ink, ...settle(f, T.words + i * 12) }}>
            {w}{i < 2 ? <span style={{ color: color.muted }}> ·</span> : null}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
