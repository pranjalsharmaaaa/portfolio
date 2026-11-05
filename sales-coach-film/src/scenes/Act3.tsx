/**
 * Scenes 5–6: practise → the outcome.
 * Practice: phone-practice-accounts → phone-practice-prepare → the Rajesh
 * role-play recording (practice-rajesh.mp4: "Rajesh is speaking", then
 * "Your turn"), with Ajay (ajay-alone → ajay-practice). The case study has
 * no feedback screen, so "get feedback" is shown with its own words
 * ("Get feedback — See what went well & where to improve"), not invented UI.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Badge, Eyebrow, Illus, scImage, Title } from "../components/primitives";
import { PhoneImage, PhoneVideo } from "../components/Phone";
import { ease, prog, settle } from "../motion/ease";
import { phraseAt } from "../timeline";
import { color, stage } from "../theme/tokens";

const CX = 1300;
const TOP = 128;

/* ── S5 · Practise (0:39.5–0:49.5) ──────────────────────────────────── */
const STEPS = [
  { title: "Understand", body: "See what matters for this meeting" },
  { title: "Practise", body: "Rehearse the conversation with AI" },
  { title: "Get feedback", body: "See what went well & where to improve" },
];

export const S5 = () => {
  const f = useCurrentFrame();
  const practise = phraseAt("S5", 1); // "Practise realistic customer conversations, respond to questions,"
  const feedback = phraseAt("S5", 2); // "and get feedback before the actual meeting."
  const videoIn = prog(f, practise + 18, 10);
  const yourTurn = practise + 18 + 66; // cut to "Your turn" in the recording
  return (
    <AbsoluteFill>
      <Eyebrow x={stage.margin} y={110} start={4}>Practise</Eyebrow>
      <Title plain="Practise the Conversation" x={stage.margin} y={156} start={8} width={820} />
      <Illus src={scImage("ajay-alone")} x={170} y={300} width={560} enter={6} exit={practise + 10} drift={3} />
      <Illus src={scImage("ajay-practice")} x={170} y={290} width={560} enter={practise + 14} drift={3} />
      {/* the case study's own Get-feedback step, as its pink takeaway panel */}
      <div style={{
        position: "absolute", left: 140, top: 800 - 0, width: 760, padding: "20px 28px", borderRadius: 20, background: color.pink,
        display: "flex", gap: 28, ...settle(f, feedback - 6, 14, 16), opacity: prog(f, feedback - 6, 14),
      }}>
        {STEPS.map((s, i) => {
          const hot = i === 2;
          return (
            <div key={s.title} style={{ flex: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 600, color: hot ? color.red : color.ink }}>{s.title}</div>
              <div style={{ fontSize: 18, lineHeight: "24px", color: color.muted, marginTop: 4 }}>{s.body}</div>
            </div>
          );
        })}
      </div>
      <PhoneImage cx={CX} top={TOP} opacity={(1 - videoIn) * prog(f, 0, 12)}
        screens={[{ at: 0, name: "phone-practice-accounts" }, { at: practise - 8, name: "phone-practice-prepare" }]}
        ripples={[{ at: practise - 20, u: 0.5, v: 0.415 }, { at: practise + 12, u: 0.5, v: 0.905 }]}
        rings={[{ at: practise + 2, until: practise + 14, u: 0.5, v: 0.79, w: 0.86, h: 0.1 }]} />
      <PhoneVideo cx={CX} top={TOP} src="sc/videos/practice-rajesh.mp4" aspect="860 / 1864" opacity={videoIn}
        clips={[
          { at: practise + 16, fromSec: 0, frames: yourTurn - (practise + 16) },
          { at: yourTurn, fromSec: 14.6, frames: 300 - yourTurn },
        ]} />
    </AbsoluteFill>
  );
};

/* ── S6 · The outcome (0:49.5–1:00) ─────────────────────────────────── */
// The KAM from Scene 1 returns, walking into the meeting ready (step-act),
// UNDERSTAND → ASK → PRACTISE, then the cover's Sales Coach title card.
const FLOW = ["Understand", "Ask", "Practise"];

export const S6 = () => {
  const f = useCurrentFrame();
  const close = phraseAt("S6", 1); // "Sales Coach. Be ready for what matters."
  const out = prog(f, close - 12, 16, ease.exit);
  return (
    <AbsoluteFill>
      <div style={{ opacity: 1 - out }}>
        <Illus src={scImage("step-act")} x={90} y={150} width={860} enter={0} push={0.035} pushDur={close} origin="55% 60%" multiply />
        <div style={{ position: "absolute", left: 960, top: 440, display: "flex", alignItems: "center", gap: 22 }}>
          {FLOW.map((w, i) => {
            const at = 10 + i * 34;
            return (
              <div key={w} style={{ display: "flex", alignItems: "center", gap: 22, ...settle(f, at, 14, 16), opacity: prog(f, at, 14) }}>
                {i > 0 && (
                  <svg width="44" height="24" viewBox="0 0 44 24" aria-hidden>
                    <path d="M2 12h36M28 3l10 9-10 9" fill="none" stroke={color.red} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span style={{ fontSize: 46, fontWeight: 500, letterSpacing: "-0.02em", color: i === 2 ? color.red : color.ink }}>{w.toUpperCase()}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* title card — the cover's identity */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", flexDirection: "column", alignItems: "center", gap: 34 }}>
        <div style={{ ...settle(f, close, 16, 18), opacity: prog(f, close, 16) }}>
          <Badge size={96}>Sales Coach</Badge>
        </div>
        <div style={{ fontSize: 52, fontWeight: 500, letterSpacing: "-0.02em", color: color.ink, ...settle(f, close + 26, 16), opacity: prog(f, close + 26, 16) }}>
          Be ready for <span style={{ color: color.red }}>what matters.</span>
        </div>
        <div style={{ fontSize: 22, color: color.label, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 26, ...settle(f, close + 50), opacity: prog(f, close + 50, 14) }}>
          A product design case study by Pranjal Sharma
        </div>
      </div>
    </AbsoluteFill>
  );
};

