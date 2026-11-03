/**
 * Persistent layers that live OUTSIDE the scenes, so they never cut:
 * paper, sage ground plane, the single ink ground line, the Act 2 dot
 * grid (with parallax), and captions.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { prog } from "../motion/ease";
import { ACT_RANGES, cameraX, TOTAL_FRAMES, VO_LINES } from "../timeline";
import { color, stage } from "../theme/tokens";

/** A gently hand-drawn horizontal line across the full width. */
const groundPath = (() => {
  let d = `M -20 ${stage.groundY}`;
  for (let x = 0; x <= 1960; x += 120) {
    const wob = Math.sin(x * 0.013) * 1.4 + Math.sin(x * 0.041) * 0.8;
    d += ` L ${x} ${stage.groundY + wob}`;
  }
  return d;
})();

export const Backdrop = () => {
  const frame = useCurrentFrame();
  const drawIn = prog(frame, 0, 20);
  const drawOut = prog(frame, TOTAL_FRAMES - 45, 35);
  const act2 = ACT_RANGES[1];
  const grid = Math.min(prog(frame, act2.from, 18), 1 - prog(frame, act2.to - 12, 18));
  const camX = cameraX(frame);
  return (
    <AbsoluteFill style={{ background: color.paper }}>
      {/* Act 2 notebook dot grid — the case study's own 3% radial pattern */}
      <AbsoluteFill style={{
        opacity: grid,
        backgroundImage: "radial-gradient(circle, rgb(0 0 0 / 9%) 1.6px, transparent 2px)",
        backgroundSize: "48px 48px",
        backgroundPosition: `${-camX * 0.3}px 0px`,
      }} />
      {/* sage ground plane */}
      <div style={{ position: "absolute", left: 0, right: 0, top: stage.groundY, bottom: 0, background: color.ground, opacity: 0.55 * drawIn * (1 - drawOut) }} />
      {/* the ink line: draws in at 0:00, retracts right→left at the end (mirror of S1) */}
      <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path d={groundPath} fill="none" stroke={color.ink} strokeWidth={2.4} strokeLinecap="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={drawOut > 0 ? drawOut : 1 - drawIn} />
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Caption chunks come from the narration's "|" marks and are timed inside
 * each line's actual clip (measured once audio exists, estimated before),
 * so captions stay in sync with the voice.
 */
const CAPTIONS = VO_LINES.flatMap((l) => {
  if (!l.captions) return [];
  const chunks = l.text.split("|").map((c) => c.trim()).filter(Boolean);
  const words = chunks.map((c) => c.split(/\s+/).length);
  const total = words.reduce((a, b) => a + b, 0);
  const end = l.from + l.frames;
  // measured phrase starts (real audio) — otherwise split the clip by word count
  if (l.phrases && l.phrases.length === chunks.length) {
    return chunks.map((text, i) => ({ text, from: l.phrases![i], to: (l.phrases![i + 1] ?? end) + (i === chunks.length - 1 ? 10 : 0) }));
  }
  let t = l.from;
  return chunks.map((text, i) => {
    const len = (l.frames * words[i]) / total;
    const c = { text, from: Math.round(t), to: Math.round(t + len) + (i === chunks.length - 1 ? 10 : 0) };
    t += len;
    return c;
  });
});

export const Captions = () => {
  const frame = useCurrentFrame();
  const c = CAPTIONS.find((k) => frame >= k.from && frame < k.to);
  if (!c) return null;
  const o = Math.min(prog(frame, c.from, 4), 1 - prog(frame, c.to - 4, 4));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 44, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{
        maxWidth: 1400, padding: "12px 26px", borderRadius: 14, background: "rgb(38 38 38 / 85%)", color: "white",
        fontSize: 30, lineHeight: "40px", fontWeight: 500, textAlign: "center",
      }}>{c.text}</div>
    </div>
  );
};
