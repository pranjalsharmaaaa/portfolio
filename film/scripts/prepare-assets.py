"""
Builds the film's derived image assets into public/film-assets/.

Run once (outputs are committed):  python3 scripts/prepare-assets.py
Requires Pillow, numpy, scipy.

Sources, in order of preference:
  1. Hi-res transparent illustrations already in the portfolio
     (../public/images/stackup/insight-*.webp, ~1500px). Detached marks
     (icons, "?", bubbles) are stripped so the film can animate them itself.
  2. White-background portfolio illustrations (illustration-steps) — keyed.
  3. The character & visual asset kit sheet (source/character-kit.webp).
     Poses there are only ~250px tall, so these cutouts are PLACEHOLDERS
     for the animatic and are written with a `kit-` prefix so they are
     easy to swap for hi-res originals later.
  4. Product renders (wallet, jars) cut from the 1312x2656 app screens.
"""
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SRC_STACKUP = ROOT.parent / "public" / "images" / "stackup"
OUT = ROOT / "public" / "film-assets"
OUT.mkdir(parents=True, exist_ok=True)


def keep_largest(rgba: np.ndarray, min_share: float = 1.0) -> np.ndarray:
    """Drop detached components smaller than `min_share` of the largest."""
    alpha = rgba[:, :, 3] > 20
    lab, n = ndimage.label(alpha)
    if n <= 1:
        return rgba
    sizes = ndimage.sum(alpha, lab, range(1, n + 1))
    keep_ids = [i + 1 for i, s in enumerate(sizes) if s >= sizes.max() * min_share]
    mask = np.isin(lab, keep_ids)
    # keep soft anti-aliased fringe next to kept pixels
    mask = ndimage.binary_dilation(mask, iterations=2)
    out = rgba.copy()
    out[~mask, 3] = 0
    return out


def trim(img: Image.Image, pad: int = 8) -> Image.Image:
    box = img.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    if not box:
        return img
    l, t, r, b = box
    return img.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, img.width), min(b + pad, img.height)))


def key_paper(rgb: Image.Image, light: int = 205, chroma: int = 26) -> np.ndarray:
    """Remove paper + pale blobs reachable from the border.

    Flood-fills only from the edges, so light areas enclosed by ink
    outlines (skin, mugs, paper cards) are untouched.
    """
    a = np.asarray(rgb.convert("RGB")).astype(int)
    mx, mn = a.max(axis=2), a.min(axis=2)
    paper = (mn > light) & ((mx - mn) < chroma)
    lab, _ = ndimage.label(paper)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(border))
    # soften: pixels next to the background get partial alpha by lightness
    edge = ndimage.binary_dilation(bg, iterations=1) & ~bg
    alpha = np.full(bg.shape, 255, dtype=np.uint8)
    alpha[bg] = 0
    lum = a.mean(axis=2)
    alpha[edge] = np.clip((255 - lum[edge]) * 3.2, 60, 255).astype(np.uint8)
    rgba = np.dstack([a.astype(np.uint8), alpha])
    return rgba


def save(rgba: np.ndarray | Image.Image, name: str) -> None:
    img = rgba if isinstance(rgba, Image.Image) else Image.fromarray(rgba, "RGBA")
    img = trim(img)
    img.save(OUT / f"{name}.png", optimize=True)
    print(f"{name}.png {img.size}")


# 1. Hi-res portfolio poses, stripped of detached marks --------------------
for src, name in [
    ("insight-figure-out", "pose-laptop"),
    ("insight-depend", "pose-leaning"),
    ("insight-fragments", "pose-phone-notebook"),
    ("insight-hesitate", "pose-arms-crossed"),
]:
    rgba = np.array(Image.open(SRC_STACKUP / f"{src}.webp").convert("RGBA"))
    save(keep_largest(rgba), name)

# 1b. The same four illustrations kept WHOLE (icons, "?", bubble, shield)
# for S7, where those details are what explain each behaviour.
for src in ["insight-figure-out", "insight-depend", "insight-fragments", "insight-hesitate"]:
    save(np.array(Image.open(SRC_STACKUP / f"{src}.webp").convert("RGBA")), src)

# 2. White-background portfolio illustrations ------------------------------
steps = Image.open(SRC_STACKUP / "illustration-steps.webp").convert("RGB")
save(key_paper(steps, light=228, chroma=20), "steps-climb")

# 3. Kit sheet (placeholders, ~250px source) --------------------------------
kit = Image.open(ROOT / "source" / "character-kit.webp").convert("RGB")
UPSCALE = 2
KIT = {
    # name: (box, min_share for detached marks; 1.0 = largest only)
    "kit-thinking": ((225, 282, 450, 602), 1.0),
    "kit-working": ((700, 150, 975, 347), 0.02),
    "kit-phone": ((1045, 148, 1250, 347), 1.0),
    "kit-confused": ((1340, 128, 1555, 347), 1.0),
    "kit-realisation": ((686, 415, 915, 648), 0.004),
    "kit-comparing": ((1028, 420, 1245, 648), 1.0),
    "kit-confident": ((1375, 420, 1545, 648), 1.0),
    "kit-salary": ((60, 772, 258, 882), 0.05),
    "kit-bags": ((290, 775, 415, 880), 0.05),
    "kit-card": ((472, 785, 590, 878), 0.05),
    "kit-jar": ((658, 770, 745, 880), 0.05),
    "kit-shield": ((825, 772, 925, 878), 0.05),
    "kit-chart": ((985, 772, 1092, 875), 0.05),
    "kit-pie": ((1172, 776, 1280, 878), 0.05),
}
for name, (box, share) in KIT.items():
    crop = kit.crop(box)
    crop = crop.resize((crop.width * UPSCALE, crop.height * UPSCALE), Image.LANCZOS)
    save(keep_largest(key_paper(crop), share), name)

# 4. Product renders cut from the real screens ------------------------------
# Boxes are fractions of the 1312x2656 screen image.
RENDERS = {
    "render-wallet": ("app-onboarding-4", (0.20, 0.07, 0.80, 0.42)),
    "render-sprout-jar": ("app-journey-2", (0.30, 0.44, 0.70, 0.68)),
    "render-confidence-jar": ("app-portfolio-1", (0.18, 0.58, 0.86, 0.845)),
    "render-coin": ("app-first-investment-4", (0.18, 0.08, 0.82, 0.31)),
}
for name, (src, (l, t, r, b)) in RENDERS.items():
    img = Image.open(SRC_STACKUP / f"{src}.webp").convert("RGB")
    W, H = img.size
    crop = img.crop((int(l * W), int(t * H), int(r * W), int(b * H)))
    save(key_paper(crop, light=236, chroma=12), name)
