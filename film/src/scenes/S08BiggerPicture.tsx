/**
 * S8 · The bigger picture (0:46–0:53). The two coins left over from Act 1
 * roll back in and grow into "Savings"; the other four areas join them
 * side by side. Framed as the landscape and the problem — not features.
 */
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Character } from "../components/primitives";
import { Display, Label } from "../components/type";
import { stage } from "../theme/tokens";
import { BiggerPictureRow } from "./BiggerPicture";
import { C } from "./continuity";

export const S08_TEXT_AT = 108;

export const S08BiggerPicture = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <BiggerPictureRow build={f} />
      <Character poses={[{ at: 0, pose: "kit-thinking" }, { at: 96, pose: "kit-realisation" }]} x={C.rowCharX} enter={26} scale={1.05} />
      <Label text="The bigger picture" x={stage.margin} y={96} start={S08_TEXT_AT - 6} />
      <Display x={stage.margin} y={140} start={S08_TEXT_AT} size={88}
        lines={[{ text: "Managing money" }, { text: "isn’t just investing.", green: true }]} />
    </AbsoluteFill>
  );
};
