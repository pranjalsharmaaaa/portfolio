"""
Derives the two character layers the film needs from the case study's OWN
assets — exact crops, no redrawing, no AI enhancement, no upscaling:

  film-assets/woman.png   the illustrated woman with plants, cropped from
                          screen-onboarding-welcome.webp (her lavender
                          background kept; the film feathers its edges)
  film-assets/mascot.png  the YANA brain mascot, cut out of the splash
                          screen's purple (phone-splash.webp) by flood-filling
                          the purple from the crop's edges; the sticker's own
                          white outline is kept intact

    python3 scripts/prepare-assets.py   (needs Pillow, numpy, scipy)
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "public" / "images" / "yana"
OUT = ROOT / "public" / "film-assets"
OUT.mkdir(parents=True, exist_ok=True)

# ── woman ───────────────────────────────────────────────────────────────
welcome = Image.open(SRC / "screen-onboarding-welcome.webp").convert("RGBA")
welcome.crop((24, 100, 262, 402)).save(OUT / "woman.png")

# ── mascot ──────────────────────────────────────────────────────────────
splash = Image.open(SRC / "phone-splash.webp").convert("RGBA")
crop = np.asarray(splash.crop((126, 262, 330, 452))).astype(np.float32)
r, g, b = crop[..., 0], crop[..., 1], crop[..., 2]
# the splash gradient is saturated violet; the sticker is white / pale blue / dark line
purple = (b - g > 60) & (r - g > 15)
lbl, _ = ndimage.label(purple)
edge = set(np.unique(np.concatenate([lbl[0], lbl[-1], lbl[:, 0], lbl[:, -1]]))) - {0}
sizes = ndimage.sum(purple, lbl, range(lbl.max() + 1))
# edge-connected background, plus enclosed pockets of it (e.g. between an arm and a dumbbell)
bg = np.isin(lbl, list(edge)) | np.isin(lbl, [i for i, n in enumerate(sizes) if i and n >= 6])
bg = ndimage.binary_closing(bg, iterations=1) | bg
# soft alpha: 1px feather on the outline, and un-premultiply the violet fringe
dist = ndimage.distance_transform_edt(~bg)
alpha = np.clip(dist / 1.6, 0, 1)
out = crop.copy()
fringe = (alpha > 0) & (alpha < 1)
out[fringe, :3] = np.maximum(out[fringe, :3], 235)  # the fringe sits on the white sticker outline
out[..., 3] = alpha * 255
Image.fromarray(out.astype(np.uint8)).save(OUT / "mascot.png")
print("wrote film-assets/woman.png", Image.open(OUT / "woman.png").size, "and film-assets/mascot.png", Image.open(OUT / "mascot.png").size)
