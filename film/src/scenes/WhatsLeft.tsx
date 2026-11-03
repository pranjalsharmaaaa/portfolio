/**
 * "What's left" — the money remaining after the essentials are covered.
 * This is the money Stack Up helps people manage, so it is drawn the same
 * way everywhere it appears (S2, S3, S11, S17): the coin stack on a soft
 * green glow, with a green "What's left" tag on the ground.
 */
import { Chip } from "../components/primitives";
import { CoinStack } from "../components/objects";
import { color, stage } from "../theme/tokens";

export const WHATS_LEFT_COINS = 3;

export const WhatsLeft = ({
  x, glow = 1, tag = 1, opacity = 1, dropFrom, size = 104, count = WHATS_LEFT_COINS,
}: { x: number; glow?: number; tag?: number; opacity?: number; dropFrom?: number; size?: number; count?: number }) => (
  <div style={{ position: "absolute", inset: 0, opacity }}>
    <div style={{
      position: "absolute", left: x - size * 1.1, top: stage.groundY - size * 0.95, width: size * 2.2, height: size * 1.1,
      borderRadius: "50%", background: `radial-gradient(closest-side, rgb(159 192 84 / ${0.55 * glow}), transparent)`,
    }} />
    <CoinStack x={x} y={stage.groundY} count={count} size={size} dropFrom={dropFrom} />
    <div style={{ position: "absolute", left: x, top: stage.groundY + 22, transform: "translateX(-50%)", opacity: tag }}>
      <Chip bg={color.brand} fg="white" border={false}>What’s left</Chip>
    </div>
  </div>
);
