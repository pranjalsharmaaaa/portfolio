/**
 * Persistent layers outside the scenes: page colour, captions, soundtrack
 * (music bed ducked under the voice, narration, sound effects).
 */
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import musicInfo from "../music.json";
import { prog } from "../motion/ease";
import { SFX_CUES } from "../scenes";
import { CAPTIONS, TOTAL_FRAMES, VO_LINES } from "../timeline";
import { color } from "../theme/tokens";

export const Backdrop = () => <AbsoluteFill style={{ background: color.bg }} />;

/** Subtitles, timed from the measured phrases of the generated voice. */
export const Captions = () => {
  const frame = useCurrentFrame();
  const c = CAPTIONS.find((k) => frame >= k.from && frame < k.to);
  if (!c) return null;
  const o = Math.min(prog(frame, c.from, 4), 1 - prog(frame, c.to - 4, 4));
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, display: "flex", justifyContent: "center", opacity: o }}>
      <div style={{
        maxWidth: 1500, padding: "12px 30px", borderRadius: 22, background: "rgb(9 8 111 / 86%)", color: "white",
        fontSize: 32, lineHeight: "42px", fontWeight: 600, textAlign: "center", letterSpacing: "0.005em",
      }}>{c.text}</div>
    </div>
  );
};

/** Music levels (linear gain); ducked ≈ −9.3 dB below the bed. Attack/release in frames. */
const MUSIC = { bed: 0.2, ducked: 0.068, attack: 6, release: 20 };
const SPOKEN = VO_LINES.filter((l) => l.file);

const voiceAt = (frame: number) => {
  let v = 0;
  for (const l of SPOKEN) {
    v = Math.max(v, interpolate(frame, [l.from - MUSIC.attack, l.from, l.from + l.frames, l.from + l.frames + MUSIC.release], [0, 1, 1, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    }));
  }
  return v;
};

export const Soundtrack = () => (
  <>
    {musicInfo.file && (
      <Audio
        src={staticFile(musicInfo.file)}
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 30], [0, 1], { extrapolateRight: "clamp" });
          const fadeOut = interpolate(f, [TOTAL_FRAMES - 60, TOTAL_FRAMES - 1], [1, 0], { extrapolateLeft: "clamp" });
          return (MUSIC.bed + (MUSIC.ducked - MUSIC.bed) * voiceAt(f)) * fadeIn * fadeOut;
        }}
      />
    )}
    {SFX_CUES.map((c, i) => (
      <Sequence key={`sfx${i}`} from={c.at} durationInFrames={90} name={`SFX ${c.kind}`}>
        <Audio src={staticFile(`sfx/${c.kind}.wav`)} volume={c.gain ?? 1} />
      </Sequence>
    ))}
    {SPOKEN.map((l) => (
      <Sequence key={l.scene} from={l.from} durationInFrames={l.frames + 6} name={`VO ${l.scene}`}>
        <Audio src={staticFile(l.file!)} />
      </Sequence>
    ))}
  </>
);
