/**
 * Scenes 1–3: the challenge → the opportunity → introducing Sales Coach.
 * Every illustration and screen is the case study's own asset.
 */
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { Badge, Eyebrow, FloatCard, Illus, Pill, scImage, Title } from "../components/primitives";
import { PhoneImage } from "../components/Phone";
import { ease, mix, prog, settle } from "../motion/ease";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

/* ── S1 · The challenge (0:00–0:08) ─────────────────────────────────── */
// kam-at-desk: the KAM preparing; the step-understand cards (Account /
// Insights / Signals / Products) float in around her; on "But getting ready
// isn't always easy" it becomes before-static-brief (spreadsheets, PDFs:
// "So much information… what is relevant for today?").
export const S1 = () => {
  const turn = phraseAt("S1", 1);
  return (
    <AbsoluteFill>
      <Eyebrow x={stage.margin} y={90} start={8} exit={turn - 6}>Before the meeting</Eyebrow>
      <Illus src={scImage("kam-at-desk")} x={150} y={170} width={1100} enter={0} exit={turn - 8} push={0.04} pushDur={turn} origin="45% 40%" />
      <FloatCard name="card-account" x={1290} y={210} width={300} at={34} phase={0} exit={turn - 8} />
      <FloatCard name="card-insights" x={1560} y={300} width={270} at={46} phase={1.3} exit={turn - 8} />
      <FloatCard name="card-signals" x={1300} y={420} width={312} at={58} phase={2.1} exit={turn - 8} />
      <FloatCard name="card-products" x={1520} y={560} width={295} at={70} phase={3.4} exit={turn - 8} />
      <Illus src={scImage("before-static-brief")} x={210} y={150} width={1500} enter={turn} push={0.06} pushFrom={turn} pushDur={240 - turn} origin="22% 25%" />
    </AbsoluteFill>
  );
};

/* ── S2 · The opportunity (0:08–0:16) ───────────────────────────────── */
// insight-focus with the case study's own insight ("Information is
// everywhere. But focus isn't."), then the real Airtel Work Meeting Brief:
// all seven legacy screens, presented as the case study does (white cards,
// "Present Airtel Work Application") with its own callouts; on "But what
// actually matters…" the camera settles on the densest screen.
const CALLOUTS = ["Scattered information", "Context gets buried", "Dense Information", "Opportunities are hard to spot", "Too much reading to find the signal"];
const SCREEN_H = 640;
const SCREEN_W = (SCREEN_H * 600) / 1298;
const GAP = 34;
const FOCUS = 2; // legacy-screen-3: headwinds & tailwinds table

export const S2 = () => {
  const f = useCurrentFrame();
  const reports = phraseAt("S2", 1);
  const matters = phraseAt("S2", 2);
  const rowIn = prog(f, reports - 10, 22);
  const pan = prog(f, reports - 10, matters - reports + 20, ease.camera);
  const focus = prog(f, matters, 40, ease.camera);
  const rowW = 7 * SCREEN_W + 6 * GAP;
  const startX = 1920 / 2 - rowW / 2;
  const panX = mix(pan, 120, -40);
  const focusCx = startX + FOCUS * (SCREEN_W + GAP) + SCREEN_W / 2;
  return (
    <AbsoluteFill>
      {/* insight */}
      <Illus src={scImage("insight-focus")} x={170} y={230} width={640} enter={0} exit={reports - 14} drift={4} />
      <Title plain="Information is everywhere. " accent="But focus isn’t." x={900} y={380} start={10} exit={reports - 14} width={860} />
      {/* the real Airtel Work meeting brief */}
      <div style={{
        position: "absolute", inset: 0, opacity: rowIn,
        transform: `translateX(${mix(focus, panX, 960 - focusCx)}px) scale(${mix(focus, 1, 1.32)})`, transformOrigin: `${focusCx}px 520px`,
      }}>
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute", left: startX + i * (SCREEN_W + GAP), top: 200 + (1 - prog(f, reports - 10 + i * 3, 18)) * 40,
            width: SCREEN_W, height: SCREEN_H, borderRadius: 14, overflow: "hidden", background: "white",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.10), 0 10px 24px -14px rgba(0,0,0,0.35)",
            opacity: i === FOCUS ? 1 : mix(focus, 1, 0.22),
          }}>
            <Img src={scImage(`legacy-screen-${i + 1}`)} style={{ width: "100%", height: "100%", display: "block" }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, textAlign: "center", fontSize: 26, color: color.ink, fontStyle: "italic", ...settle(f, reports + 4), opacity: prog(f, reports + 4, 12) * (1 - prog(f, matters, 10)) }}>
        Present Airtel Work Application
      </div>
      {/* the case study's own callouts around the dense brief */}
      {CALLOUTS.map((c, i) => {
        const at = matters + 12 + i * 7;
        const pos = [[150, 330], [1430, 260], [190, 560], [1400, 520], [1300, 760]][i];
        return (
          <div key={c} style={{ position: "absolute", left: pos[0], top: pos[1], ...settle(f, at), opacity: prog(f, at, 12) }}>
            <Pill tone="white"><span style={{ width: 10, height: 10, borderRadius: 5, background: color.red, display: "inline-block" }} />{c}</Pill>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ── S3 · Introducing Sales Coach (0:16–0:22.5) ─────────────────────── */
// The case study's next section — "What if the brief did more?" — with its
// cover AI orb; on "Meet Sales Coach." the cover's title badge and the real
// Sales Coach home screen.
export const S3 = () => {
  const f = useCurrentFrame();
  const meet = phraseAt("S3", 1);
  const orbOut = prog(f, meet - 4, 20, ease.camera);
  const phoneIn = prog(f, meet, 24, ease.enter);
  return (
    <AbsoluteFill>
      <Title plain="What if the brief did " accent="more?" x={960} y={140} start={6} exit={meet - 6} width={1400} align="center" size={72} />
      <div style={{
        position: "absolute", left: 960 - 380 + mix(orbOut, 0, -330), top: 300 + mix(orbOut, 0, 30), width: 760,
        opacity: prog(f, 4, 18) * (1 - orbOut), transform: `scale(${mix(orbOut, 1 + 0.02 * Math.sin(f / 18), 0.82)})`,
      }}>
        <Img src={scImage("cover-ai-orb")} style={{ width: "100%", display: "block" }} />
      </div>
      <div style={{ position: "absolute", left: stage.margin, top: 360, ...settle(f, meet + 2, 14, 20), opacity: prog(f, meet + 2, 14) }}>
        <Badge size={84}>Sales Coach</Badge>
      </div>
      <div style={{ position: "absolute", left: stage.margin, top: 520, width: 700, fontSize: 32, lineHeight: "42px", fontWeight: 500, letterSpacing: "-0.01em", color: color.ink, ...settle(f, meet + 14), opacity: prog(f, meet + 14, 14) }}>
        A voice-first AI experience that helps Airtel KAMs prepare, practise, and act on customer opportunities.
      </div>
      <PhoneImage cx={1300} top={mix(phoneIn, 1100, 128)} screens={[{ at: 0, name: "phone-home-accounts" }]} opacity={phoneIn} />
    </AbsoluteFill>
  );
};
