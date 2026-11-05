/**
 * Single source of timing truth: exactly 60 s (1,800 frames @ 30 fps).
 *
 * Scene lengths follow the approved storyboard; the Outcome scene starts
 * 2.5 s earlier than storyboarded (0:49.5) because its approved line runs
 * 8.8 s — longer than an 8 s slot — and the script must stay word-for-word.
 * The time comes from Scenes 3–5, which had spare silence.
 *
 * Measured voice timings (voiceover-manifest.json) drive captions, the SRT,
 * music ducking and phrase-synced visual beats (phraseAt).
 */
import manifest from "./voiceover-manifest.json";
import narration from "./narration.json";
import { stage } from "./theme/tokens";

export type SceneId = "S1" | "S2" | "S3" | "S4" | "S5" | "S6";

export const SCENES: { id: SceneId; title: string; frames: number; fadeOut: number }[] = [
  { id: "S1", title: "The challenge", frames: 240, fadeOut: 12 }, // 0:00
  { id: "S2", title: "The opportunity", frames: 240, fadeOut: 10 }, // 0:08
  { id: "S3", title: "Introducing Sales Coach", frames: 195, fadeOut: 0 }, // 0:16
  { id: "S4", title: "Understand and ask", frames: 510, fadeOut: 12 }, // 0:22.5
  { id: "S5", title: "Practise", frames: 300, fadeOut: 12 }, // 0:39.5
  { id: "S6", title: "The outcome", frames: 315, fadeOut: 0 }, // 0:49.5 → 1:00
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
