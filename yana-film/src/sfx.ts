/**
 * Sound-effect cues. Each scene exports its own cues (scene-local frames),
 * kept next to the motion they belong to; this gathers them onto the film
 * timeline. Sounds are original, synthesised by scripts/generate-sfx.py.
 */
import { sceneStart, type SceneId } from "./timeline";

export type SfxKind = "bloom" | "whoosh" | "tap" | "page" | "chime";
export type Cue = { at: number; kind: SfxKind; gain?: number };

export const placeCues = (scene: SceneId, cues: Cue[]) => cues.map((c) => ({ ...c, at: sceneStart(scene) + c.at }));
