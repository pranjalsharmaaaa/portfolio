/**
 * Single source of timing truth: exactly 60 s (1,800 frames @ 30 fps).
 *
 * Scene lengths follow the storyboard (8 · 8 · 7 · 10 · 10 · 17 s), adjusted
 * to the measured narration so the script stays word-for-word and unhurried:
 * the Scene 3 line runs 7.8 s, longer than its 7 s slot, so Scene 3 gets
 * 8.93 s; the time comes from spare silence at the ends of Scenes 1, 2, 4
 * and 5. Scene 6 keeps its 17 s slot (16.87 s).
 *
 * Measured voice timings (voiceover-manifest.json) drive captions, the SRT,
 * music ducking and phrase-synced visual beats (phraseAt).
 */
import manifest from "./voiceover-manifest.json";
import narration from "./narration.json";
import { stage } from "./theme/tokens";

export type SceneId = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export const SCENES: { id: SceneId; title: string; frames: number; fadeOut: number }[] = [
  { id: "S1", title: "Something doesn't feel right", frames: 225, fadeOut: 12 }, // 0:00
  { id: "S2", title: "Support feels far away", frames: 220, fadeOut: 14 }, // 0:07.5
  { id: "S3", title: "Meet YANA", frames: 268, fadeOut: 14 }, // 0:14.83
  { id: "S4", title: "Start at your own pace", frames: 296, fadeOut: 14 }, // 0:23.77
  { id: "S5", title: "Reflect, discover, connect", frames: 285, fadeOut: 14 }, // 0:33.63
  { id: "S6", title: "Support, and the journey", frames: 506, fadeOut: 0 }, // 0:43.13 → 1:00
];

export const TIMED = (() => {
  let from = 0;
  return SCENES.map((s) => {
    const t = { ...s, from };
    from += s.frames;
    return t;
  });
})();

export const TOTAL_FRAMES = TIMED.reduce((n, s) => n + s.frames, 0);

export const sceneStart = (id: SceneId) => TIMED.find((s) => s.id === id)!.from;

const sec = (s: number) => Math.round(s * stage.fps);

type Manifest = { lines: Partial<Record<SceneId, { file: string; seconds: number; phrases: number[] }>> };
const VO = manifest as Manifest;

export type VoLine = {
  scene: SceneId;
  text: string;
  from: number;
  frames: number;
  file?: string;
  /** absolute start frame of each '|' phrase */
  phrases: number[];
};

export const VO_LINES: VoLine[] = narration.lines.map((l) => {
  const id = l.scene as SceneId;
  const m = VO.lines[id];
  const from = sceneStart(id) + sec(l.offset);
  const chunks = l.text.split("|").length;
  return {
    scene: id,
    text: l.text,
    from,
    frames: Math.ceil((m?.seconds ?? 0) * stage.fps),
    file: m?.file,
    phrases: m?.phrases?.map((p) => from + Math.round(p * stage.fps)) ?? Array.from({ length: chunks }, () => from),
  };
});

/** Scene-local frame at which phrase i of that scene's narration starts. */
export const phraseAt = (id: SceneId, i: number) => {
  const l = VO_LINES.find((v) => v.scene === id)!;
  return l.phrases[i] - sceneStart(id);
};

/** Caption chunks with absolute timings, from the measured phrases. */
export const CAPTIONS = VO_LINES.flatMap((l) => {
  const chunks = l.text.split("|").map((c) => c.trim());
  const end = l.from + l.frames;
  return chunks.map((text, i) => ({ text, from: l.phrases[i], to: (l.phrases[i + 1] ?? end) + (i === chunks.length - 1 ? 8 : 0) }));
});
