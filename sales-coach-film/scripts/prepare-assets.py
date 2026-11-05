"""
Crops reusable layers out of the case study's ORIGINAL illustrations, so
static artwork can move in layers (no redrawing, no new art).

    python3 scripts/prepare-assets.py      (run after `npm run sync-assets`)

- card-*.png: the four floating UI cards from step-understand.webp
  (Account / Insights / Signals / Products), used as information panels
  around the KAM in Scene 1. Composited with `mix-blend-mode: multiply`
  in the film, so their near-white surround melts into the page colour.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "sc" / "images"
OUT = ROOT / "public" / "film-assets"
OUT.mkdir(parents=True, exist_ok=True)

CARDS = {  # (left, top, right, bottom) in step-understand.webp's own 900x750 px
    "card-account": (292, 82, 562, 218),
    "card-insights": (596, 82, 840, 218),
    "card-signals": (520, 238, 802, 368),
    "card-products": (592, 383, 858, 515),
}
src = Image.open(SRC / "step-understand.webp").convert("RGB")
for name, box in CARDS.items():
    crop = src.crop(box)
    crop.save(OUT / f"{name}.png", optimize=True)
    print(name, crop.size)
