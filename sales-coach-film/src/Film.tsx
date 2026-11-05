import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Fragment } from "react";
import { AbsoluteFill } from "remotion";
import { Backdrop, Captions, Soundtrack } from "./components/Layers";
import { SCENE_COMPONENTS } from "./scenes";
import { ensureInter } from "./theme/fonts";
import { color, font } from "./theme/tokens";
import { TIMED } from "./timeline";

ensureInter();

/**
 * Sales Coach — 60 s. Each scene's Sequence is (frames + its outgoing
 * cross-fade), so every scene starts exactly on its timeline frame.
 */
export const Film = () => (
  <AbsoluteFill style={{ fontFamily: font.family, color: color.ink }}>
    <Backdrop />
    <TransitionSeries>
      {TIMED.map((s, i) => {
        const Scene = SCENE_COMPONENTS[s.id];
        const last = i === TIMED.length - 1;
        return (
          <Fragment key={s.id}>
            <TransitionSeries.Sequence durationInFrames={s.frames + (last ? 0 : s.fadeOut)} name={`${s.id} · ${s.title}`}>
              <Scene />
            </TransitionSeries.Sequence>
            {!last && s.fadeOut > 0 && <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: s.fadeOut })} />}
          </Fragment>
        );
      })}
    </TransitionSeries>
    <Captions />
    <Soundtrack />
  </AbsoluteFill>
);
