# YANA — 60-second product film (Remotion)

A 60 s, 1920×1080, 30 fps (1,800 frames), H.264 product film for the YANA
case study. It is a moving version of the live case study (`/yana`). It uses
the case study's own illustrations, real product screens, colours
(`--yana-*`), Nunito type and copy. Nothing is redrawn, and no stock, AI or
3D characters are used.

## Render again

```bash
cd yana-film
npm ci
npm run sync-assets       # copies public/images/yana into public/yana, and Nunito into public/fonts (git-ignored)
npm run prepare-assets    # crops the woman and cuts out the mascot → public/film-assets (committed)
npm run render            # → out/yana-film-final.mp4
npm run deliverables      # → deliverables/: .srt captions, voice-only .wav, copy of the .mp4
```

If Remotion can't download its own browser (offline containers), point it at a
local Chrome headless shell:
`REMOTION_BROWSER=/path/to/chrome-headless-shell npm run render`
(`remotion.config.ts` picks it up).

Optional regeneration (the outputs are committed, so you don't need these to render):

```bash
npm run voiceover        # narration (Kokoro, local; pip: kokoro-onnx soundfile scipy)
npm run voiceover:check  # timing report: every line inside its scene and the film
npm run music            # original music bed (numpy)
npm run sfx              # original sound effects (numpy, scipy, soundfile)
```

Live preview while editing: `npm run studio`.

## What's in it

| Scene | Time | Narration (word for word) | Picture |
|---|---|---|---|
| S1 | 0:00–0:07.5 | "Sometimes, you know something doesn't feel right. But finding the words for it isn't always easy." | The welcome illustration's woman, soft botanical shapes, OVERWHELMED. UNCERTAIN. UNHEARD. The words loosen and blur on "finding the words". |
| S2 | 0:07.5–0:14.8 | "And when opening up feels difficult, getting the right support can feel even further away." | The same woman; thought shapes and empty speech bubbles drift out of reach; her lavender opens into a welcoming space. |
| S3 | 0:14.8–0:23.8 | "What if taking care of your mental wellbeing started with simply being heard? Meet YANA. You Are Not Alone." | A bubble that listens (three dots), then the brain mascot, the real splash screen and the title YANA / YOU ARE NOT ALONE. |
| S4 | 0:23.8–0:33.6 | "Start at your own pace. Check in with how you're feeling, explore what matters to you, and find a space that understands your needs." | Welcome → Mood check-in → Areas of support → All set! → personalised home (Mood Relaxer), with the case study's "A more personal starting point" features. |
| S5 | 0:33.6–0:43.1 | "Reflect through journaling. Discover bite-sized guidance. Share your thoughts and connect with a supportive community." | "Small moments, big progress": a carousel of Journal Calendar → Journal Entry → Minis → Share Your Thought → Community feed. |
| S6 | 0:43.1–1:00 | "And when you're ready for more, explore individual therapy, group sessions and professional support. Because wellbeing isn't a one-time destination. It's a journey, and you don't have to take it alone. YANA. You are not alone." | "Find the right support for you": Therapy Style, Group Therapy, Suggested Therapists; then the woman with the Wellbeing Snapshot, the mascot joins her, and the title card YANA / YOU ARE NOT ALONE. |

Scene lengths follow the storyboard (8 · 8 · 7 · 10 · 10 · 17 s), adjusted
to the measured voice. The S3 line runs 7.8 s, so S3 is 8.93 s; the extra
time comes from spare silence in S1, S2, S4 and S5. S6 keeps 16.87 s. All
timing lives in `src/timeline.ts`.

## Source assets (all from `public/images/yana`, unaltered)

- **The illustrated woman** (`film-assets/woman.png`) is an exact crop of
  `screen-onboarding-welcome.webp`, keeping her own lavender background. The
  film sets her on a blob of the same sampled colour and feathers the edges.
- **The brain mascot** (`film-assets/mascot.png`) is cut out of the splash
  screen's purple in `phone-splash.webp`. The purple is flood-filled from the
  crop's edges, and the sticker's white outline is kept. Nothing is redrawn.
- **The splash screen** is `phone-splash.webp`.
- **The screens** are:
  - `screen-onboarding-welcome`, `-feeling`, `-areas` and `-allset`;
  - `screen-home-mood-relaxer`, `-express` and `-feed`;
  - `screen-journal-calendar`, `-entry`, `-minis` and `-snapshot`;
  - `screen-therapy-style`, `-group` and `-suggested`.

  Each file already includes its phone frame. The only overlay is a soft
  ripple, placed on buttons that really exist on that screen.

The woman and mascot exist in the case study only at small sizes (238×302
and 204×190 px). They are shown at no more than about 1.7× with
high-quality resampling. Higher-resolution originals would make them
sharper.

## Sound

- **Voice:** Kokoro v1.0 (open-source neural TTS, Apache-2.0), run locally.
  It is a style blend of `hf_alpha` (Indian English female, 0.65) and
  `af_heart` (0.35), at speed 0.94. One phrase, S3's "…simply being heard?", is spoken at 0.88; at the default pace "heard" was transcribed as "hurt". Each phrase is synthesised separately,
  joined with a 0.38 s pause, and normalised to −16 dBFS RMS with a −1 dBFS
  peak. Captions show "YANA" and the voice is given "Yana", so it says the
  name instead of spelling it.
- **Music:** an original ambient pad in F major, with a bell motif from
  "Meet YANA". It sits at a 0.2 bed level and is ducked about 9 dB under the
  voice (`scripts/generate-music.py`).
- **Sound effects:** original synthesised sounds (`scripts/generate-sfx.py`).
  Each cue sits next to its motion in the scene files:
  - bloom: character entrances
  - whoosh: UI and scene transitions
  - tap: button selections
  - page: journal
  - chime: title card

## Content guardrails

The film makes no medical claims. It never says or shows that YANA
diagnoses or treats anything. The Wellbeing Snapshot is shown as the case
study presents it: a self-reflection view ("Here's a look at your
journey"). All on-screen copy is the case study's own, and the therapist
details are exactly what the real prototype screens show.

## Output

- **Video:** H.264 High, yuv420p (standard range), 1920×1080, 30 fps, 1,800
  frames, with AAC 48 kHz stereo audio. Frames are captured as lossless PNG.
- **Deliverables** (`npm run deliverables`):
  - `yana-film-final.mp4`
  - `yana-voiceover.wav`: narration only, 48 kHz, 60.000 s, each line at its
    film time
  - `yana-captions.srt`

  The MP4 and WAV are git-ignored and regenerate exactly from the committed
  source.
