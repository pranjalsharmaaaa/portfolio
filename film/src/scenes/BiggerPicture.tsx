/**
 * The five areas of a young earner's financial life, shown SIDE BY SIDE
 * at equal size and height — deliberately no hierarchy or priority order.
 * One hand-drawn line links them: connected parts of one life.
 *
 * Shared by S8 (build) and S9 (compress into the Stack Up mark), so the
 * cut between them is frame-exact.
 */
import { Asset, Chip, Stroke } from "../components/primitives";
import { CoinStack } from "../components/objects";
import { mix, prog } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { C } from "./continuity";

export const AREAS = [
  { label: "Spending", asset: "kit-bags" },
  { label: "Savings", asset: null }, // the coin stack — the film's motif
  { label: "Emergency fund", asset: "kit-jar" },
  { label: "Insurance", asset: "kit-shield" },
  { label: "Investments", asset: "kit-chart" },
] as const;

const OBJ_H = 180;

/**
 * `build`: S8-local frame driving the entrances (pass a large number to
 * show everything). `gather` 0→1 pulls every object into the mark's centre.
 */
export const BiggerPictureRow = ({ build, gather = 0, chrome = 1 }: { build: number; gather?: number; chrome?: number }) => {
  const local = build;
  const roll = prog(local, 0, 26);
  const savingsCount = local < 28 ? 2 : Math.min(5, 2 + Math.floor((local - 28) / 5));
  return (
    <>
      {AREAS.map((a, i) => {
        const appear = i === 1 ? 1 : prog(local, 14 + i * 16, 14);
        const x = mix(gather, C.rowX[i], C.markCenter.x);
        const y = mix(gather, stage.groundY, C.markCenter.y + 60);
        const s = mix(gather, 1, 0.2);
        const o = appear * (1 - Math.min(Math.max((gather - 0.75) / 0.25, 0), 1));
        return (
          <div key={a.label}>
            {a.asset ? (
              <Asset name={a.asset} x={x} y={y} height={OBJ_H} opacity={o} scale={s * mix(appear, 0.9, 1)} />
            ) : (
              <div style={{ position: "absolute", inset: 0, opacity: 1 - gather, transform: `translateX(${mix(roll, -C.rowX[1] - 200, 0) + (x - C.rowX[1])}px)` }}>
                <CoinStack x={C.rowX[1]} y={y} count={savingsCount} size={92} />
              </div>
            )}
            <div style={{
              position: "absolute", left: C.rowX[i], top: stage.groundY + 22, transform: "translateX(-50%)",
              opacity: prog(local, 18 + i * 16, 12) * chrome,
            }}>
              <Chip bg={color.tint} border={false}>{a.label}</Chip>
            </div>
          </div>
        );
      })}
      {/* one hand-drawn line linking all five: connected, not ranked */}
      <div style={{ opacity: chrome }}>
        <Stroke d={`M ${C.rowX[0] - 90} 548 C ${C.rowX[1]} 500, ${C.rowX[2]} 590, ${C.rowX[2] + 135} 548 S ${C.rowX[3] + 135} 500, ${C.rowX[4] + 90} 548`}
          start={98} dur={24} width={2.5} stroke={color.deep} frame={local} />
        {C.rowX.map((x, i) => (
          <div key={x} style={{
            position: "absolute", left: x - 7, top: [526, 538, 556, 532, 540][i], width: 14, height: 14, borderRadius: "50%",
            background: color.deep, transform: `scale(${prog(local, 104 + i * 4, 8)})`,
          }} />
        ))}
      </div>
    </>
  );
};
