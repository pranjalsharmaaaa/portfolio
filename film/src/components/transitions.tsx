import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill } from "remotion";
import { stage } from "../theme/tokens";

/**
 * "Dolly": the camera travels right along the ground line. Both scenes
 * move together by one frame-width, so it reads as one continuous world
 * rather than a slide transition. Easing comes from the timing.
 */
const DollyPresentation = ({ children, presentationDirection, presentationProgress }: TransitionPresentationComponentProps<Record<string, never>>) => {
  const x = presentationDirection === "exiting" ? -presentationProgress * stage.width : (1 - presentationProgress) * stage.width;
  return <AbsoluteFill style={{ transform: `translateX(${x}px)` }}>{children}</AbsoluteFill>;
};

export const dolly = (): TransitionPresentation<Record<string, never>> => ({ component: DollyPresentation, props: {} });
