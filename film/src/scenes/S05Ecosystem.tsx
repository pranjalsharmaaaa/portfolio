/**
 * S5 · Exploring the ecosystem (0:25–0:31) — the five areas explored,
 * the benchmarked products (real screenshots from the case study), and
 * the three benchmark insights as the designer's sticky notes.
 */
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { stackup } from "../assets";
import { Character, Chip, Stroke } from "../components/primitives";
import { Label } from "../components/type";
import { mix, prog, settle } from "../motion/ease";
import { color, stage } from "../theme/tokens";

const AREAS = ["Investments", "Payments", "Credit Cards", "Net Worth", "Paper Trading"];
const SHOTS = [
  { src: "benchmark-groww-investready", logo: "logo-groww", name: "Groww", rot: -2 },
  { src: "benchmark-kuvera-investready", logo: "logo-kuvera", name: "Kuvera", rot: 1.5 },
  { src: "benchmark-indmoney-learning", logo: "logo-indmoney", name: "IND Money", rot: -1 },
  { src: "benchmark-moneybhai-practice", logo: "logo-moneybhai", name: "Money Bhai", rot: 2 },
  { src: "benchmark-frontpage-practice-2", logo: "logo-frontpage", name: "Frontpage", rot: -1.5 },
];
const COLS = [610, 890, 1170, 1450, 1730];
// Short forms of Benchmark Insights 01–03 from the case study.
const NOTES = [
  { text: "Built for investment-ready users", x: 520, y: 210, rot: -2.5, at: 82 },
  { text: "Learning sits outside the journey", x: 900, y: 300, rot: 1.5, at: 100 },
  { text: "Practice removes the risk, not the complexity", x: 1290, y: 210, rot: -1, at: 118 },
];

export const S05Ecosystem = () => {
  const f = useCurrentFrame();
  const dim = 1 - 0.62 * prog(f, 78, 14);
  return (
    <AbsoluteFill>
      <Label text="Benchmarking" x={stage.margin} y={96} start={6} />
      <Character poses={[{ at: 0, pose: "laptop" }]} x={250} scale={0.72} enter={4} />
      {/* explored areas, sitting on the ground line */}
      {AREAS.map((a, i) => (
        <div key={a} style={{ position: "absolute", left: COLS[i], top: stage.groundY - 84, transform: "translateX(-50%)" }}>
          <div style={settle(f, 4 + i * 5)}><Chip bg={color.tint}>{a}</Chip></div>
        </div>
      ))}
      {/* benchmarked products */}
      {SHOTS.map((s, i) => {
        const p = prog(f, 26 + i * 7, 14);
        return (
          <div key={s.src} style={{
            position: "absolute", left: COLS[i], top: mix(p, 150, 170), transform: `translateX(-50%) rotate(${s.rot}deg)`,
            opacity: p * dim, display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 22, fontWeight: 600 }}>
              <Img src={stackup(s.logo)} style={{ height: 36, borderRadius: 8 }} />{s.name}
            </div>
            <Img src={stackup(s.src)} style={{ height: 380, maxWidth: 250, objectFit: "contain", borderRadius: 14, boxShadow: "0 10px 26px rgb(38 38 38 / 12%)" }} />
          </div>
        );
      })}
      {NOTES.map((n, i) => {
        const p = prog(f, n.at, 14);
        return (
          <div key={n.text}>
            <div style={{
              position: "absolute", left: n.x, top: n.y, width: 330, padding: "26px 28px", background: color.ground,
              borderRadius: 20, fontSize: 30, lineHeight: "38px", fontWeight: 600, opacity: p,
              transform: `rotate(${n.rot}deg) translateY(${(1 - p) * 18}px)`, boxShadow: "0 12px 28px rgb(38 38 38 / 10%)",
            }}>
              <div style={{ fontSize: 18, letterSpacing: "0.08em", color: color.deep, marginBottom: 8 }}>0{i + 1} / INSIGHT</div>
              {n.text}
            </div>
            <Stroke d={`M${n.x + 200} ${n.y + 210} q 30 50 -10 110`} start={n.at + 10} dur={10} stroke={color.deep} width={3} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
