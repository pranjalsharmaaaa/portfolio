import type { ComponentType } from "react";
import { placeCues } from "../sfx";
import type { SceneId } from "../timeline";
import { S4, S4_CUES } from "./Begin";
import { S6, S6_CUES } from "./Journey";
import { S3, S3_CUES } from "./Meet";
import { S1, S1_CUES, S2, S2_CUES } from "./Opening";
import { S5, S5_CUES } from "./Reflect";

export const SCENE_COMPONENTS: Record<SceneId, ComponentType> = { S1, S2, S3, S4, S5, S6 };

export const SFX_CUES = [
  ...placeCues("S1", S1_CUES),
  ...placeCues("S2", S2_CUES),
  ...placeCues("S3", S3_CUES()),
  ...placeCues("S4", S4_CUES()),
  ...placeCues("S5", S5_CUES()),
  ...placeCues("S6", S6_CUES()),
];
