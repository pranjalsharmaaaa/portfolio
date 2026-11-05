import type { ComponentType } from "react";
import type { SceneId } from "../timeline";
import { S1, S2, S3 } from "./Act1";
import { S4 } from "./Act2";
import { S5, S6 } from "./Act3";

export const SCENE_COMPONENTS: Record<SceneId, ComponentType> = { S1, S2, S3, S4, S5, S6 };
