import type { ComponentType } from "react";
import type { SceneId } from "../timeline";
import { S01Payday } from "./S01Payday";
import { S02WhereDidItGo } from "./S02WhereDidItGo";
import { S03Questions } from "./S03Questions";
import { S04MyQuestionsToo } from "./S04MyQuestionsToo";
import { S05Ecosystem } from "./S05Ecosystem";
import { S06Listening } from "./S06Listening";
import { S07Patterns } from "./S07Patterns";
import { S08BiggerPicture } from "./S08BiggerPicture";
import { S09Problem } from "./S09Problem";
import { S10Reveal } from "./S10Reveal";
import { S11Wallet } from "./S11Wallet";
import { S12FirstMove } from "./S12FirstMove";
import { S13Questions } from "./S13Questions";
import { S14Recommendation } from "./S14Recommendation";
import { S15FirstInvestment } from "./S15FirstInvestment";
import { S16ConfidenceJar } from "./S16ConfidenceJar";
import { S17Closing } from "./S17Closing";

/** Scene id → component. Timing lives in ../timeline.ts, not here. */
export const SCENE_COMPONENTS: Record<SceneId, ComponentType> = {
  S01: S01Payday, S02: S02WhereDidItGo, S03: S03Questions,
  S04: S04MyQuestionsToo, S05: S05Ecosystem, S06: S06Listening, S07: S07Patterns,
  S08: S08BiggerPicture, S09: S09Problem,
  S10: S10Reveal, S11: S11Wallet,
  S12: S12FirstMove, S13: S13Questions, S14: S14Recommendation, S15: S15FirstInvestment,
  S16: S16ConfidenceJar, S17: S17Closing,
};
