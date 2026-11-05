import { Composition } from "remotion";
import { Film } from "./Film";
import { TOTAL_FRAMES } from "./timeline";
import { stage } from "./theme/tokens";

export const Root = () => (
  <Composition id="SalesCoachFilm" component={Film} durationInFrames={TOTAL_FRAMES} fps={stage.fps} width={stage.width} height={stage.height} />
);
