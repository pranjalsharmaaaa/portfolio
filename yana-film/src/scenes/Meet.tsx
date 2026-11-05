/**
 * Scene 3 · Meet YANA (0:14.8–0:23.8).
 * In the welcoming lavender, one empty bubble starts to listen (three
 * soft dots); on "Meet YANA" the splash screen's brain mascot appears, the
 * real splash screen (phone-splash.webp) arrives, and the title follows on
 * "You Are Not Alone".
 */
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { Mascot, yanaImage } from "../components/primitives";
import { ease, mix, prog, settle } from "../motion/ease";
import type { Cue } from "../sfx";
import { phraseAt } from "../timeline";
import { color } from "../theme/tokens";
import { Bubble } from "./Opening";

export const S3 = () => {
  const f = useCurrentFrame();
  const meet = phraseAt("S3", 1); // "Meet YANA."
  const alone = phraseAt("S3", 2); // "You Are Not Alone."
  const bubbleOut = prog(f, meet - 10, 14, ease.exit);
  const toLeft = prog(f, meet + 18, 30, ease.camera);
  const phoneIn = prog(f, meet + 20, 30, ease.enter);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse 80% 90% at 35% 50%, ${color.lavender} 55%, ${color.bg} 100%)` }} />
      {/* the bubble that listens */}
      <div style={{
        position: "absolute", left: 960 - 190, top: 420 + Math.sin(f / 34) * 6, opacity: prog(f, 4, 18) * (1 - bubbleOut),
        transform: `scale(${mix(prog(f, 4, 22), 0.92, 1) * mix(bubbleOut, 1, 0.9)})`,
      }}>
        <Bubble w={380} h={140} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 380, height: 140, display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
          {[0, 1, 2].map((i) => {
            const at = 40 + i * 12;
            const pulse = 0.55 + 0.45 * Math.max(0, Math.sin((f - at) / 9));
            return <span key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: color.purple, opacity: prog(f, at, 12) * (f > at + 12 ? pulse : 1) }} />;
          })}
        </div>
      </div>
      {/* the mascot, then the title beneath it */}
      <Mascot x={mix(toLeft, 960 - 170, 330)} y={mix(toLeft, 300, 210)} width={340} enter={meet} />
      <div style={{ position: "absolute", left: 230, width: 540, top: 600, textAlign: "center" }}>
        <div style={{ fontSize: 112, lineHeight: "120px", fontWeight: 800, color: color.purple, letterSpacing: "0.04em", ...settle(f, meet + 26, 16, 16), opacity: prog(f, meet + 26, 16) }}>YANA</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: color.indigo, letterSpacing: "0.2em", marginTop: 14, ...settle(f, alone + 2, 16, 12), opacity: prog(f, alone + 2, 16) }}>YOU ARE NOT ALONE</div>
      </div>
      {/* the real splash screen */}
      <div style={{
        position: "absolute", left: 1010 + (1 - phoneIn) * 120, top: 130, width: 720, opacity: phoneIn,
        filter: "drop-shadow(0 30px 40px rgba(73,64,143,0.18))",
      }}>
        <Img src={yanaImage("phone-splash")} style={{ width: "100%", display: "block" }} />
      </div>
    </AbsoluteFill>
  );
};

export const S3_CUES = (): Cue[] => [
  { at: phraseAt("S3", 1), kind: "bloom", gain: 0.7 },
  { at: phraseAt("S3", 1) + 20, kind: "whoosh", gain: 0.3 },
];
