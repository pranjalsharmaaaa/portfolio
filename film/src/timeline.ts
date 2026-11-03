/**
 * The film's single source of timing truth.
 *
 * Every scene owns a "slot" (its storyboard duration). Transitions
 * overlap the END of the outgoing scene, so each scene's local frame 0
 * is exactly its storyboard start time and the total length is the sum
 * of the slots (3,240 frames = 1:48 @ 30fps).
 *
 * Narration text lives in narration.json (shared with the voiceover
 * generator). Measured clip lengths, once generated, live in
 * voiceover-manifest.json and automatically drive captions + music ducking.
 */
import narration from "./narration.json";
import manifest from "./voiceover-manifest.json";
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
};

export const SCENES: SceneSpec[] = [
  // ACT 1 — THE PROBLEM
  { id: "S01", act: 1, title: "Payday", seconds: 4.5, out: { kind: "cut", frames: 0 } },
  { id: "S02", act: 1, title: "Essentials first, then what's left", seconds: 8.4, out: { kind: "fade", frames: 12 } },
  { id: "S03", act: 1, title: "The questions", seconds: 4, out: { kind: "fade", frames: 8 } },
  // ACT 2 — MY JOURNEY
  { id: "S04", act: 2, title: "These were my questions too", seconds: 8.9, out: { kind: "dolly", frames: 24 } },
  { id: "S05", act: 2, title: "Exploring the ecosystem", seconds: 5.2, out: { kind: "dolly", frames: 24 } },
  { id: "S06", act: 2, title: "Listening", seconds: 9.5, out: { kind: "fade", frames: 12 } },
  { id: "S07", act: 2, title: "Four patterns, one need", seconds: 10.8, out: { kind: "dolly", frames: 24 } },
  // ACT 3 — THE BIGGER PICTURE
  { id: "S08", act: 3, title: "The bigger picture", seconds: 7.8, out: { kind: "cut", frames: 0 } },
  { id: "S09", act: 3, title: "The real problem", seconds: 128 / 30, out: { kind: "cut", frames: 0 } },
  // ACT 4 — INTRODUCING STACK UP
  { id: "S10", act: 4, title: "The reveal", seconds: 3, out: { kind: "cut", frames: 0 } },
  { id: "S11", act: 4, title: "What's left → Practice Wallet", seconds: 6.9, out: { kind: "fade", frames: 10 } },
  // ACT 5 — LEARNING THROUGH DOING
  { id: "S12", act: 5, title: "First move", seconds: 142 / 30, out: { kind: "fade", frames: 10 } },
  { id: "S13", act: 5, title: "Guided questions", seconds: 172 / 30, out: { kind: "fade", frames: 10 } },
  { id: "S14", act: 5, title: "Recommendation & alternatives", seconds: 5, out: { kind: "fade", frames: 10 } },
  { id: "S15", act: 5, title: "The first investment", seconds: 203 / 30, out: { kind: "fade", frames: 12 } },
  // ACT 6 — THE DESTINATION
  { id: "S16", act: 6, title: "The Confidence Jar", seconds: 5.5, out: { kind: "fade", frames: 15 } },
  { id: "S17", act: 6, title: "Understand → Practise → Build Confidence", seconds: 7, out: { kind: "cut", frames: 0 } },
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
  });
})();

export const TOTAL_FRAMES = TIMED.reduce((n, s) => n + s.slot, 0);

export const sceneStart = (id: SceneId) => TIMED.find((s) => s.id === id)!.from;

// ---------------------------------------------------------------- voiceover

type Manifest = { generated: boolean; lines: Partial<Record<SceneId, { file: string; seconds: number; phrases?: number[] }>> };
const VO = manifest as Manifest;

/** Spoken text (caption-break marks removed) — exactly what the TTS voice reads. */
export const spoken = (text: string) => text.replace(/\s*\|\s*/g, " ").replace(/\s+/g, " ").trim();

/** Estimated read time before real audio exists (≈150 wpm + sentence pauses). */
export const estimateSeconds = (text: string) => {
  const t = spoken(text);
  const words = t.split(" ").length;
  const pauses = (t.match(/[.?!—:]/g) ?? []).length;
  return words / narration.estimate.wordsPerSecond + pauses * narration.estimate.pauseSeconds;
};

export type VoLine = {
  scene: SceneId;
  text: string;
  from: number; // absolute frame
  frames: number; // clip length
  measured: boolean; // true once real audio has been generated
  file?: string;
  captions: boolean;
  /** Absolute start frame of each '|' phrase (measured once audio exists). */
  phrases?: number[];
};

export const VO_LINES: VoLine[] = narration.lines.map((l) => {
  const scene = TIMED.find((s) => s.id === l.scene)!;
  const m = VO.lines[l.scene as SceneId];
  const seconds = m?.seconds ?? estimateSeconds(l.text);
  return {
    scene: l.scene as SceneId,
    text: l.text,
    from: scene.from + sec(l.offset),
    frames: Math.ceil(seconds * stage.fps),
    measured: Boolean(m),
    file: m?.file,
    captions: (l as { captions?: boolean }).captions !== false,
    phrases: m?.phrases?.map((p) => scene.from + sec(l.offset) + Math.round(p * stage.fps)),
  };
});

/**
 * Scene-local frame at which phrase `i` of a scene's narration starts —
 * lets a scene land its visuals on the spoken words. Falls back to the
 * given frame until real audio has been generated.
 */
export const phraseAt = (id: SceneId, i: number, fallback: number) => {
  const l = VO_LINES.find((v) => v.scene === id);
  const p = l?.phrases?.[i];
  return p === undefined ? fallback : p - sceneStart(id);
};

export const VOICEOVER_READY = VO.generated && VO_LINES.every((l) => l.measured);

// ---------------------------------------------------------------- camera

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
