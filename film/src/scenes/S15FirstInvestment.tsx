/**
 * S15 · The first investment (1:27–1:35) — the film's hero product beat.
 *
 * How to Invest → ₹5,000 → Ready to Invest? → First Investment Complete.
 * On "Ready to Invest?" the camera leans in and ONE coin physically
 * leaves the Practice Wallet, travels into the investment (the screen's
 * Practice Wallet → ICICI fund row), and the Confidence Jar beside it
 * rises 0% → 10% exactly as the real completion screen shows.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Phone, screenPoint } from "../components/Phone";
import { Asset, Character, Chip } from "../components/primitives";
import { Coin, ConfidenceJar } from "../components/objects";
import { Body } from "../components/type";
import { arc, ease, mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";
import { phoneGlide } from "./S12FirstMove";

const WALLET = { x: 330, h: 250 };
const JAR = { x: 720, h: 270 };
const T = { emerge: 96, travel: 112, land: 148, complete: 152, fill: 158 };

export const S15FirstInvestment = () => {
  const f = useCurrentFrame();
  const leave = prog(f, 180, 22, ease.camera);
  const cx = mix(leave, phoneGlide(f, C.phone.S14, C.phone.S15), C.phone.S16);
  const push = prog(f, 96, 30, ease.camera) * (1 - prog(f, 170, 20, ease.camera));
  const worldOut = 1 - prog(f, 176, 12);

  // the coin
  const emerge = prog(f, T.emerge, 16);
  const travel = prog(f, T.travel, T.land - T.travel, ease.camera);
  const startPt = { x: WALLET.x, y: stage.groundY - WALLET.h - 40 * emerge };
  const endPt = screenPoint(C.phone.S15, 0.71, 0.535);
  const coin = arc(travel, startPt, endPt, 140);
  const coinVisible = f >= T.emerge && f < T.land + 4;

  const fill = 0.1 * prog(f, T.fill, 26);
  const pct = Math.round(fill * 100);
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${1 + 0.05 * push})`, transformOrigin: "800px 520px" }}>
        <Phone cx={cx}
          screens={[
            { at: 0, name: "app-fund-selection-1" }, { at: 8, name: "app-first-investment-1" }, { at: 44, name: "app-first-investment-2" },
            { at: 90, name: "app-first-investment-3" }, { at: T.complete, name: "app-first-investment-4" },
          ]}
          rings={[{ at: 56, until: 88, u: 0.5, v: 0.337, w: 0.42, h: 0.05 }]}
          ripples={[{ at: T.land - 2, u: 0.71, v: 0.535 }]} />
        <div style={{ opacity: worldOut }}>
          <Asset name="render-wallet" x={WALLET.x} height={WALLET.h} opacity={prog(f, 10, 12)} />
          <div style={{ position: "absolute", left: JAR.x, top: stage.groundY, transform: "translate(-50%, -100%)", opacity: prog(f, 18, 12) }}>
            <ConfidenceJar fill={fill} height={JAR.h} label={`${pct}%`} />
          </div>
          <div style={{ position: "absolute", left: JAR.x, top: stage.groundY + 22, transform: "translateX(-50%)", opacity: prog(f, 22, 10) }}>
            <Chip bg={color.tint} border={false}>Confidence Jar</Chip>
          </div>
          <div style={{ position: "absolute", left: WALLET.x, top: stage.groundY + 22, transform: "translateX(-50%)", opacity: prog(f, 14, 10) }}>
            <Chip bg={color.tint} border={false}>Practice Wallet</Chip>
          </div>
        </div>
        {coinVisible && (
          <>
            <div style={{
              position: "absolute", left: coin.x, top: coin.y, transform: `translate(-50%, -50%) scale(${mix(travel, 1, 0.45)})`,
              opacity: emerge * (1 - prog(f, T.land, 4)), filter: `drop-shadow(0 0 ${18 * emerge}px rgb(159 192 84 / 70%))`,
            }}>
              <Coin size={110} />
            </div>
            <div style={{ position: "absolute", left: coin.x, top: coin.y + 56, transform: "translateX(-50%)", opacity: emerge * (1 - prog(f, T.land - 10, 8)) }}>
              <Chip>₹5,000 · practice money</Chip>
            </div>
          </>
        )}
      </div>
      <Character poses={[{ at: 0, pose: "kit-phone" }, { at: T.fill + 4, pose: "kit-realisation" }]} x={1690} enter={12} exit={176} />
      <Body x={stage.margin} y={110} width={600} start={10} size={40} exit={172} text="**Small, guided steps.**" />
      <div style={{
        position: "absolute", left: stage.margin, top: 190, fontSize: 64, fontWeight: 700, letterSpacing: "-0.02em",
        opacity: prog(f, T.fill, 10) * worldOut,
      }}>
        Confidence <span style={{ color: color.muted }}>0%</span> → <span style={{ color: color.brand }}>{pct}%</span>
      </div>
    </AbsoluteFill>
  );
};
