/**
 * S6 · Listening (0:31–0:39). Two research groups, kept visibly separate:
 * the broader 40+ (light, left) and the focused 23 (green, right). They
 * never overlap or nest. Real quotes then rise from the focused group.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Character } from "../components/primitives";
import { Rich, Label } from "../components/type";
import { mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";

const R = 210;
const LEFT = { x: 520, y: 420 };
const RIGHT = { x: 1400, y: 420 };
// Verbatim from the 23 conversations (lib/stackup-content.ts).
const QUOTES = [
  "“Even after managing my own money, I **still don't understand many financial terms.**”",
  "“There are a lot of financial tools, overall I **don't know where to start from.**”",
  "“I'm **scared of being judged** for not knowing basic terms.”",
];

const Disc = ({ c, at, fill, ink, tag, n, suffix, caption, dim = 1, f }: {
  c: { x: number; y: number }; at: number; fill: string; ink: string; tag: string; n: number; suffix: string;
  caption: string; dim?: number; f: number;
}) => {
  const grow = prog(f, at, 20);
  const count = Math.round(n * prog(f, at + 6, 26));
  return (
    <div style={{ opacity: dim }}>
      <div style={{
        position: "absolute", left: c.x - R, top: c.y - R, width: R * 2, height: R * 2, borderRadius: "50%", background: fill,
        transform: `scale(${grow})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: ink,
      }}>
        <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "0.1em", opacity: 0.75 }}>{tag}</div>
        <div style={{ fontSize: 168, fontWeight: 700, lineHeight: "176px", letterSpacing: "-0.04em" }}>
          {count}{count === n ? suffix : ""}
        </div>
      </div>
      <div style={{ position: "absolute", left: c.x - 300, top: c.y + R + 24, width: 600, textAlign: "center", fontSize: 28, lineHeight: "38px", ...settle(f, at + 22) }}>
        <Rich text={caption} />
      </div>
    </div>
  );
};

export const S06Listening = () => {
  const f = useCurrentFrame();
  const leftOut = 1 - prog(f, 146, 14);
  return (
    <AbsoluteFill>
      <Label text="Research" x={stage.margin} y={96} start={4} />
      <Disc f={f} c={LEFT} at={6} fill={color.ground} ink={color.ink} tag="BROADER RESEARCH" n={40} suffix="+"
        caption="people across **different levels of financial experience**" dim={leftOut * mix(prog(f, 86, 12), 1, 0.7)} />
      <Disc f={f} c={RIGHT} at={80} fill={color.brand} ink="white" tag="FOCUSED CONVERSATIONS" n={23} suffix=""
        caption="**early-career professionals, aged 21–26**, managing money independently" />
      <Character poses={[{ at: 0, pose: "kit-phone" }]} x={960} enter={36} scale={0.92} />
      {/* real quotes rise out of the focused group */}
      {QUOTES.map((q, i) => {
        const p = prog(f, 154 + i * 16, 22);
        return (
          <div key={q} style={{
            position: "absolute", left: mix(p, RIGHT.x - 340, stage.margin), top: mix(p, RIGHT.y, 180 + i * 160), width: 680,
            padding: "24px 30px", background: color.ground, borderRadius: 24, fontSize: 28, lineHeight: "38px", opacity: p,
            transform: `scale(${mix(p, 0.6, 1)})`, transformOrigin: "0 50%", boxShadow: "0 10px 24px rgb(38 38 38 / 8%)",
          }}>
            <Rich text={q} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
