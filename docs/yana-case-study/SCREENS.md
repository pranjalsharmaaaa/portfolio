# YANA case study — original screen integration

Case-study Figma file: https://www.figma.com/design/gJa0uyMnOEZVTF9A7Cj0AV
Original YANA design file (source of truth): `qv5yeiq6zjTMy87nvgYxdk`, page **yana**

## Status of the case-study file (verified by reading the file)

- Page `YANA Case Study`, one frame: `YANA / 01 — Introduction` (842 × 595, page 35).
- Present: all text layers, 9 text styles, 10 colour variables, 12-column grid.
- **Images present: 0.** The four `Screen / …` layers are solid-colour placeholders.

## Recommended route — copy the original frames (lossless)

Figma copy/paste between files keeps the original vector UI, its photos and its exact size.

1. Open the YANA design file → page **yana**.
2. Select the frames in the table below (Shift-click), **Copy** (⌘C / Ctrl+C).
3. Open the case-study file → add a page named **Source screens** → **Paste** (⌘V).
4. Tell Claude it's done. Claude then places scaled copies into each slot (the pasted
   originals stay untouched on `Source screens`) and verifies them by reading the file.

| Page | Slot / use | Source frame (name · node id) |
|---|---|---|
| 35 | Journal entry | Jornal · 1626:2488 |
| 35 | Community feed | share · 1626:2323 |
| 35 | Group therapy | Group Therapy · 1626:1127 |
| 35 | Suggested therapists | Choose a therepist · 1626:1027 |
| 39 | Profile → Take Assessment | Profile · 1626:1491 |
| 40 | Journal calendar | Jornal · 1626:2432 |
| 40 | Share your thought | Home Screen · 1626:1917 |
| 41 | Community list | Community · 1626:2080 |
| 41 | Therapy style | Choose Style · 1626:969 |
| 41 | Therapist preferences | Choose therapy · 1626:1826 |
| optional | Minis (therapist video) | Minis · 1626:2134 |

All frames above were viewed in the source file and match the website screens.

**Phone mockup:** the source file has none (only status-bar components inside screens).
Paste the iPhone mockup used on the Stack Up / Sales Coach pages onto `Source screens` too.

**Not in the source file's `yana` page — please locate or export:** onboarding welcome,
onboarding "How have you been feeling", onboarding "What areas", "All set", the DASS-21
question/result screens (website version), and the weekly Wellbeing Snapshot.

## Fallback route — place the exported PNGs manually

Files: `docs/yana-case-study/screens/`, named `p<page>-<order> <screen>.png`, exported
unaltered from the website assets (same pixels, same proportions, transparent corners).

1. In the case-study file, select the slot layer (e.g. `Screen / Journal entry`).
2. Fill → swap the solid colour for **Image** → choose the file → set the mode to **Fit**.
   Do not resize the slot; it already matches the screen proportions (162 × 335 pt).
3. Repeat per slot. Claude verifies placement and resolution afterwards.

| File | Size (px) | Note |
|---|---|---|
| p35-01 … p35-04 | 840 × 1736 | full resolution |
| p39-05, p40-01, p40-02, p41-01 … p41-03 | 840 × ~1736 | full resolution |
| p39-01 … p39-04 (onboarding) | ~250 × 570 | **too small for print** — re-export needed |
| p40-03 Wellbeing snapshot | 254 × 575 | **too small for print** — re-export needed |

Page numbers 36–42 follow the approved outline and may shift once those pages are built.
