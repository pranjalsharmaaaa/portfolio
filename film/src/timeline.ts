/**
 * The film's single source of timing truth.
 *
 * Every scene owns a "slot" (its storyboard duration). Transitions
 * overlap the END of the outgoing scene, so each scene's local frame 0
 * is exactly its storyboard start time and the total length is the sum
 * of the slots (3,240 frames = 1:48 @ 30fps).
 *
 * Retime the film by editing `seconds` here — nothing else needs to change.
 */
import { stage } from "./theme/tokens";

export type TransitionKind =
  | "cut" // seamless: the next scene's first frame matches this scene's last
  | "fade" // short dissolve, used for match cuts on a shared shape
  | "dolly"; // camera travels right along the ground line

export type SceneId =
  | "S01" | "S02" | "S03" | "S04" | "S05" | "S06" | "S07" | "S08" | "S09"
  | "S10" | "S11" | "S12" | "S13" | "S14" | "S15" | "S16" | "S17";

export type SceneSpec = {
  id: SceneId;
  act: 1 | 2 | 3 | 4 | 5 | 6;
  title: string;
  seconds: number;
  out: { kind: TransitionKind; frames: number };
  vo: string;
  /** Hide subtitles when on-screen type already says the same words. */
  captions?: boolean;
};

export const SCENES: SceneSpec[] = [
  // ACT 1 — THE PROBLEM
  { id: "S01", act: 1, title: "Payday", seconds: 4, out: { kind: "cut", frames: 0 },
    vo: "You start earning. · And for the first time, the money is yours." },
  { id: "S02", act: 1, title: "Where did it go?", seconds: 5, out: { kind: "fade", frames: 12 },
    vo: "Then comes shopping. EMIs. A credit card bill. Subscriptions. · And somehow, the month gets ahead of you." },
  { id: "S03", act: 1, title: "The questions", seconds: 6, out: { kind: "fade", frames: 8 },
    vo: "How do I start managing money? · Should I save, invest, or get insurance first?", captions: false },

  // ACT 2 — MY JOURNEY
  { id: "S04", act: 2, title: "These were my questions too", seconds: 10, out: { kind: "dolly", frames: 24 },
    vo: "Those were my questions too. · Starting my semester project, I realised I didn't really understand money myself — · and I wondered if other young earners felt the same." },
  { id: "S05", act: 2, title: "Exploring the ecosystem", seconds: 6, out: { kind: "dolly", frames: 24 },
    vo: "So I studied the apps people actually use. · Most assumed you were already ready to invest." },
  { id: "S06", act: 2, title: "Listening", seconds: 8, out: { kind: "fade", frames: 12 },
    vo: "Then I listened. · I spoke with over forty people — · and had twenty-three focused conversations with early-career professionals, aged twenty-one to twenty-six." },
  { id: "S07", act: 2, title: "Four patterns, one need", seconds: 7, out: { kind: "dolly", frames: 24 },
    vo: "Their habits were different. · But the need was the same: guidance before action." },

  // ACT 3 — THE BIGGER PICTURE
  { id: "S08", act: 3, title: "The bigger picture", seconds: 7, out: { kind: "cut", frames: 0 },
    vo: "And managing money isn't only investing. · It's spending, saving, an emergency fund, insurance — all connected." },
  { id: "S09", act: 3, title: "The real problem", seconds: 5, out: { kind: "cut", frames: 0 },
    vo: "Most products help you act. · Very few help you understand first." },

  // ACT 4 — INTRODUCING STACK UP
  { id: "S10", act: 4, title: "The reveal", seconds: 5, out: { kind: "cut", frames: 0 },
    vo: "So I designed Stack Up — · a place to practise with money before you risk it." },
  { id: "S11", act: 4, title: "Coin stack → Practice Wallet", seconds: 6, out: { kind: "fade", frames: 10 },
    vo: "You start with a Practice Wallet — twenty-five thousand rupees of virtual money. · Real decisions, no real risk." },

  // ACT 5 — LEARNING THROUGH DOING
  { id: "S12", act: 5, title: "First move", seconds: 6, out: { kind: "fade", frames: 10 },
    vo: "Your first move is mutual funds — · explained simply, one concept at a time." },
  { id: "S13", act: 5, title: "Guided questions", seconds: 6, out: { kind: "fade", frames: 10 },
    vo: "Then a few guided questions — · how you feel about change, and how long you can stay invested." },
  { id: "S14", act: 5, title: "Recommendation & alternatives", seconds: 6, out: { kind: "fade", frames: 10 },
    vo: "You get a recommendation with the reasoning behind it — · and you can still compare alternatives before choosing." },
  { id: "S15", act: 5, title: "The first investment", seconds: 8, out: { kind: "fade", frames: 12 },
    vo: "Your first investment happens in small, guided steps. · And your confidence grows." },

  // ACT 6 — THE DESTINATION
  { id: "S16", act: 6, title: "The Confidence Jar", seconds: 6, out: { kind: "fade", frames: 15 },
    vo: "Every practice decision fills your Confidence Jar. · Reach a hundred percent, and you're ready for real money." },
  { id: "S17", act: 6, title: "Understand → Practise → Build Confidence", seconds: 7, out: { kind: "cut", frames: 0 },
    vo: "Stack Up. · Understand money. Build confidence. Make informed decisions.", captions: false },
];

export const sec = (s: number) => Math.round(s * stage.fps);

export type TimedScene = SceneSpec & { from: number; slot: number };

/** Absolute start frame + slot length for every scene. */
export const TIMED: TimedScene[] = (() => {
  let from = 0;
  return SCENES.map((s) => {
    const slot = sec(s.seconds);
    const t = { ...s, from, slot };
    from += slot;
    return t;
  })
})();

export const TOTAL_FRAMES = TIMED.reduce((n, s) => n + s.slot, 0);

export const sceneStart = (id: SceneId) => TIMED.find((s) => s.id === id)!.from;

/**
 * Horizontal camera position (px) along the ground line. Each dolly
 * transition advances the camera by one frame-width; used for parallax
 * on the persistent background layers.
 */
export const cameraX = (frame: number): number => {
  let x = 0;
  for (const s of TIMED) {
    if (s.out.kind !== "dolly") continue;
    const start = s.from + s.slot;
    const p = Math.min(Math.max((frame - start) / s.out.frames, 0), 1);
    const eased = 0.5 - Math.cos(Math.PI * p) / 2;
    x += eased * stage.width;
  }
  return x;
};

export const ACT_RANGES = [1, 2, 3, 4, 5, 6].map((act) => {
  const s = TIMED.filter((t) => t.act === act);
  return { act, from: s[0].from, to: s[s.length - 1].from + s[s.length - 1].slot };
});
