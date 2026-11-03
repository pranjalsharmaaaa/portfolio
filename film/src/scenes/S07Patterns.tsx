/**
 * S7 · Four patterns, one need (0:39–0:46). Each behaviour gets its own
 * beat (illustration + label) before the four converge on one line:
 * "guidance before action."
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Asset, Stroke } from "../components/primitives";
import { Display, Label, Statement } from "../components/type";
import { prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";
import { phraseAt } from "../timeline";

const PATTERNS = [
  { img: "insight-depend", label: "DEPEND ON OTHERS", h: 300 },
  { img: "insight-figure-out", label: "FIGURE IT OUT THEMSELVES", h: 300 },
  { img: "insight-fragments", label: "MANAGE IT IN FRAGMENTS", h: 360 },
  { img: "insight-hesitate", label: "HESITATE TO ASK", h: 330 },
];
const XS = [290, 740, 1190, 1630];
/** Each behaviour comes into focus as its sentence is spoken; the need lands on the last line. */
const INTRO = [0, 1, 2, 3].map((i) => phraseAt("S07", i, 9 + i * 62));
const NEED = phraseAt("S07", 4, 257);

export const S07Patterns = () => {
  const f = useCurrentFrame();
  // the beat currently being introduced gets full focus, the rest wait at 45%
  const focus = (i: number) => {
    if (f < INTRO[i]) return 0;
    if (f >= NEED) return 1;
    return i === 3 || f < INTRO[i + 1] ? 1 : 0.45;
  };
  return (
    <AbsoluteFill>
      <Label text="Insights" x={stage.margin} y={96} start={2} />
      <Statement text="People weren’t struggling in the same way." x={stage.margin} y={140} start={4} exit={NEED - 8} />
      <Statement text="Different behaviours pointed to the same underlying need:" x={stage.margin} y={130} start={NEED} />
      <Display lines={[{ text: "guidance before action.", green: true }]} x={stage.margin} y={196} start={NEED + 8} size={84} />
      {PATTERNS.map((p, i) => {
        const appear = prog(f, INTRO[i] - 4, 14);
        const o = appear * (0.45 + 0.55 * focus(i));
        return (
          <div key={p.img}>
            <Asset name={p.img} x={XS[i]} height={p.h} opacity={o} scale={0.94 + 0.06 * appear} />
            <div style={{
              position: "absolute", left: XS[i] - 200, top: stage.groundY + 26, width: 400, textAlign: "center",
              fontSize: 24, fontWeight: 700, letterSpacing: "0.06em", color: color.ink, ...settle(f, INTRO[i]), opacity: o,
            }}>{p.label}</div>
          </div>
        );
      })}
      {/* four lines converge on one point: the same need */}
      {XS.map((x, i) => (
        <Stroke key={x} d={`M${x} ${stage.groundY + 76} C ${x} ${stage.groundY + 120}, 960 ${stage.groundY + 100}, 960 ${stage.groundY + 150}`}
          start={NEED + 12 + i * 3} dur={18} stroke={color.brand} width={3} />
      ))}
      <div style={{
        position: "absolute", left: 950, top: stage.groundY + 142, width: 20, height: 20, borderRadius: "50%",
        background: color.brand, transform: `scale(${prog(f, NEED + 34, 8)})`,
      }} />
    </AbsoluteFill>
  );
};
