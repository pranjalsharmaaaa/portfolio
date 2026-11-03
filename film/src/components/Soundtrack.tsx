/**
 * Narration + music.
 *
 * - Voiceover: one clip per scene (public/voiceover/<scene>.mp3), placed at
 *   the line's start frame from timeline.ts. Clips appear automatically once
 *   `npm run voiceover` has generated them; until then the film is silent
 *   apart from the music bed, and captions carry the script.
 * - Music: a subtle bed that ducks under the voice (and swells only in the
 *   gaps), fading in at 0:00 and out on the last frame.
 */
import { Audio, interpolate, Sequence, staticFile } from "remotion";
import musicInfo from "../music.json";
import { TOTAL_FRAMES, VO_LINES } from "../timeline";

/** Music levels (linear gain). Ducked ≈ −9.3 dB below the bed. Attack/release in frames. */
const MUSIC = { bed: 0.22, ducked: 0.075, noVoice: 0.15, attack: 6, release: 20 };
/** Duck only under clips that actually exist. */
const SPOKEN = VO_LINES.filter((l) => l.file);

/** 0 = no voice, 1 = voice speaking (with short ramps either side). */
const voiceAt = (frame: number) => {
  let v = 0;
  for (const l of SPOKEN) {
    const a = interpolate(frame, [l.from - MUSIC.attack, l.from, l.from + l.frames, l.from + l.frames + MUSIC.release], [0, 1, 1, 0], {
      extrapolateLeft: "clamp", extrapolateRight: "clamp",
    });
    v = Math.max(v, a);
  }
  return v;
};

export const Soundtrack = () => {
  return (
    <>
      {musicInfo.file && (
        <Audio
          src={staticFile(musicInfo.file)}
          volume={(f) => {
            const fadeIn = interpolate(f, [0, 45], [0, 1], { extrapolateRight: "clamp" });
            const fadeOut = interpolate(f, [TOTAL_FRAMES - 75, TOTAL_FRAMES - 1], [1, 0], { extrapolateLeft: "clamp" });
            const level = SPOKEN.length ? MUSIC.bed + (MUSIC.ducked - MUSIC.bed) * voiceAt(f) : MUSIC.noVoice;
            return level * fadeIn * fadeOut;
          }}
        />
      )}
      {SPOKEN.map((l) => (
        <Sequence key={l.scene} from={l.from} durationInFrames={l.frames + 6} name={`VO ${l.scene}`}>
          <Audio src={staticFile(l.file!)} />
        </Sequence>
      ))}
    </>
  );
};
