# Stack Up — case study film (Remotion)

A 1:48, 1920×1080, 30 fps animated case study film for the Stack Up project.
Direction **B "One Continuous Stack"** with Direction A's hand-drawn annotations.
Brief, analysis and storyboard: [`../docs/stackup-film/`](../docs/stackup-film/).

**Status: first placeholder animatic (Phase 5).** Composition, transitions,
timing and story are in place; illustrations and motion are not polished yet.

## Run

```bash
cd film
npm install
npm run studio          # live preview + scrubbing (Remotion Studio)
npm run render          # → out/stackup-film.mp4
```

In a container without Remotion's own browser, point it at an existing
headless Chrome: `REMOTION_BROWSER=/path/to/chrome-headless-shell npm run render`.

Keyframe review without re-bundling per frame:

```bash
node scripts/contact-sheet.mjs out/frames 100 560 1520 2800
```

## How it's organised

| Path | What lives there |
|---|---|
| `src/timeline.ts` | **The only place timing lives.** Scene order, durations (seconds), transitions, voiceover lines, caption on/off. Retime the film here. |
| `src/theme/tokens.ts` | Colours, type scale, stage geometry — extracted from the case study / product, not invented. |
| `src/motion/ease.ts` | The motion vocabulary: enter/exit/camera easing, `settle`, arcs, breathing. |
| `src/components/` | Reusable pieces: `Character` (pose swaps, head-size normalised), `Phone` (real screens + tap ripple / highlight ring only), `CoinStack`, `ConfidenceJar`, `StackMark`, `ThoughtBubble`, `Stroke` (draw-on), type styles, the persistent `Backdrop` (paper, sage ground, ink line, Act 2 dot grid) and `Captions`. |
| `src/scenes/` | One file per scene (`S01Payday.tsx` … `S17Closing.tsx`). `continuity.ts` holds positions shared across scene boundaries so cuts are seamless. |
| `public/film-assets/` | Generated cutouts (committed). |
| `public/stackup/`, `public/fonts/` | Synced from the portfolio on every run (git-ignored) — the film uses the exact files the case study ships. |
| `scripts/prepare-assets.py` | Builds `film-assets/` from the portfolio illustrations, the asset-kit sheet (`source/`) and the real screens. |

### How timing works

Each scene owns a *slot* (its storyboard duration). Transitions overlap the end
of the outgoing scene, so a scene's frame 0 is always its storyboard start time
and the film is exactly the sum of the slots. Change `seconds` in
`timeline.ts` and every later scene, the captions and the camera parallax follow.

Transitions: `cut` (the next scene starts on this scene's last frame — shared
positions come from `continuity.ts`), `fade` (match cuts on a shared shape), and
`dolly` (the camera travels right along the ground line; Act 2 and into Act 3).

## Asset status

| Asset | Source | Status |
|---|---|---|
| `pose-laptop`, `pose-leaning`, `pose-phone-notebook`, `pose-arms-crossed`, `insight-*` | Portfolio illustrations (~1500px, transparent) | ✅ hi-res |
| `steps-climb` | `illustration-steps.webp` (1332px) | ✅ hi-res |
| `render-wallet`, `render-sprout-jar`, `render-confidence-jar`, `render-coin` | Cut from the real 1312×2656 screens | ✅ hi-res |
| `kit-thinking`, `kit-working`, `kit-phone`, `kit-confused`, `kit-realisation`, `kit-comparing`, `kit-confident` | Flattened asset-kit sheet, ~250px per pose, 2× upscaled | ⚠️ **placeholder** — needs individual hi-res originals |
| `kit-salary`, `kit-bags`, `kit-card`, `kit-jar`, `kit-shield`, `kit-chart`, `kit-pie` | Same sheet, ~110px per object | ⚠️ **placeholder** |

Replacing a placeholder needs no code change: drop a hi-res PNG with the same
name into `public/film-assets/` (or into `source/` and re-run the prep script),
then adjust its `head` value in `src/assets.ts` so the head size still matches.

Not yet in the animatic (production phase): voiceover audio, music, sound
design, per-limb character rigs (blink/arm motion), polish of individual
motion curves.
