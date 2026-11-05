# Sales Coach — 60-second product film (Remotion)

A 60 s, 1920×1080, 30 fps (1,800 frames), H.264 product film for the Sales
Coach case study. It is a moving version of the live case study
(`/sales-coach`): its own illustrations, its own product screens and
recordings, its own type, colours and copy.

## Render again

```bash
cd sales-coach-film
npm ci
npm run sync-assets                 # copies the case study's original assets into public/sc (git-ignored)
python3 scripts/prepare-assets.py   # crops the four floating cards from step-understand.webp
npm run render                      # → out/sales-coach-film-final.mp4
npm run deliverables                # → deliverables/: .srt captions, voice-only .wav, copy of the .mp4
```

In a container without Remotion's own browser, add
`REMOTION_BROWSER=/path/to/chrome-headless-shell` and pass
`--browser-executable="$REMOTION_BROWSER"` to `remotion render`.

Optional regeneration (outputs are committed, so these aren't needed to render):

```bash
npm run voiceover        # regenerate the narration (Kokoro, local; pip: kokoro-onnx soundfile scipy)
npm run voiceover:check  # timing report: every line inside its scene and the film
npm run music            # regenerate the original music bed (numpy)
```

Live preview while editing: `npm run studio`.

Output: H.264 High, yuv420p (standard range), 1920×1080, 30 fps, 1,800 frames,
AAC 48 kHz stereo. Frames are captured as lossless PNG (`remotion.config.ts`).

Deliverables (`npm run deliverables`): `sales-coach-film-final.mp4`,
`sales-coach-voiceover.wav` (narration only, 48 kHz, 60.000 s, each line at
its film time) and `sales-coach-captions.srt`. The MP4 and WAV are git-ignored
and regenerate exactly from the committed source.

## How it's organised

| Path | What lives there |
|---|---|
| `src/timeline.ts` | **All timing.** Six scenes (frames), the measured voice timings, captions, and `phraseAt()` (visual beats that land on spoken phrases). |
| `src/narration.json` | The approved script, word for word. `|` marks phrase breaks (not spoken). |
| `src/theme/tokens.ts` | The case study's `--sc-*` colours, Inter, the cover's title-badge gradient. |
| `src/components/primitives.tsx` | `Illus` (an original illustration with subtle motion only), `Title`/`Eyebrow` (the case study's heading styles), `Badge` (cover title), `Pill`, `FloatCard`. |
| `src/components/Phone.tsx` | `PhoneImage` (real phone renders) and `PhoneVideo` (the case study's recordings inside a 1:1 port of the portfolio's `PhoneShell`). Overlays: tap ripples and highlight rings on real elements only. |
| `src/components/Layers.tsx` | Page colour, captions, soundtrack (narration + music with ducking). |
| `src/scenes/Act1.tsx … Act3.tsx` | The six scenes. |
| `scripts/` | asset sync, card crops, voice generation, music, deliverables, contact sheets. |

## Timing (exactly 60.00 s)

| Scene | Starts | Notes |
|---|---|---|
| 1 The challenge | 0:00 | |
| 2 The opportunity | 0:08 | |
| 3 Introducing Sales Coach | 0:16 | |
| 4 Understand and ask | 0:22.5 | storyboard said 0:23 |
| 5 Practise | 0:39.5 | storyboard said 0:41 |
| 6 The outcome | 0:49.5 | storyboard said 0:52 |

The approved closing line runs 8.8 s, longer than an 8 s slot, and the
script stays word-for-word, so the outcome starts 2.5 s earlier, taken from
spare silence in Scenes 3–5. Every line ends inside its scene.

## Audio

- **Voice:** Kokoro (open-source neural TTS, Apache-2.0), run locally: a blend of
  its Hindi female speaker (`hf_alpha`, Indian English accent) and English
  female voice (`af_heart`), the same voice as the Stack Up film. ElevenLabs was
  not reachable from the build environment.
- **Music:** an original ambient bed (`scripts/generate-music.py`, no
  third-party audio). It ducks about −9 dB under the voice (6-frame attack,
  20-frame release).

## Assets (all from the portfolio, unmodified)

Reused from `public/images/sales-coach/` and `public/videos/sales-coach/`:
`kam-at-desk`, `step-understand` (its four cards cropped into layers),
`before-static-brief`, `insight-focus`, `legacy-screen-1…7`, `cover-ai-orb`,
`phone-home-accounts`, `phone-home-expanded`, `phone-meeting-brief`,
`ai-conversational`, `ask-in-context.mp4`, `ajay-alone`, `ajay-practice`,
`phone-practice-accounts`, `phone-practice-prepare`, `practice-rajesh.mp4`,
`step-act`.

The case study has **no feedback screen**. "Get feedback" is shown with the
case study's own words for that step ("Get feedback — See what went well &
where to improve"), not with invented UI.
