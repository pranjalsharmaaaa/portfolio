import { linearTiming, TransitionSeries, type TransitionPresentation } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Fragment } from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Captions } from "./components/Backdrop";
import { Soundtrack } from "./components/Soundtrack";
import { dolly } from "./components/transitions";
import { ease } from "./motion/ease";
import { SCENE_COMPONENTS } from "./scenes";
import { ensureInter } from "./theme/fonts";
import { color, font } from "./theme/tokens";
import { TIMED } from "./timeline";

ensureInter();

/**
 * The whole film: persistent backdrop + the scene track + captions.
 * Each scene's Sequence is (slot + outgoing transition) long, so every
 * scene starts exactly on its storyboard time.
 */
export const Film = () => (
  <AbsoluteFill style={{ fontFamily: font.family, color: color.ink, background: color.paper }}>
    <Backdrop />
    <TransitionSeries>
      {TIMED.map((s, i) => {
        const Scene = SCENE_COMPONENTS[s.id];
        const last = i === TIMED.length - 1;
        const t = s.out;
        return (
          <Fragment key={s.id}>
            <TransitionSeries.Sequence durationInFrames={s.slot + (last ? 0 : t.frames)} name={`${s.id} · ${s.title}`}>
              <Scene />
            </TransitionSeries.Sequence>
            {!last && t.kind !== "cut" && (
              <TransitionSeries.Transition
                presentation={(t.kind === "dolly" ? dolly() : fade()) as TransitionPresentation<Record<string, unknown>>}
                timing={linearTiming({ durationInFrames: t.frames, easing: t.kind === "dolly" ? ease.camera : ease.linear })}
              />
            )}
          </Fragment>
        );
      })}
    </TransitionSeries>
    <Captions />
    <Soundtrack />
  </AbsoluteFill>
);
