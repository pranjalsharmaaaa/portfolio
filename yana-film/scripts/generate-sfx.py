"""
Synthesises the film's subtle sound effects (original, no third-party
audio) into public/sfx/*.wav — 48 kHz mono, quiet by design (the film sets
each cue's gain on top):

  bloom   character entrances: a soft, rising two-note swell
  whoosh  UI / scene transitions: a gentle filtered air sweep
  tap     button selections: a soft rounded tick
  page    journal interactions: a light paper brush
  chime   the title card: a warm three-partial bell

    python3 scripts/generate-sfx.py      (needs numpy, scipy, soundfile)
"""
from pathlib import Path

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "sfx"
OUT.mkdir(parents=True, exist_ok=True)
SR = 48000
rng = np.random.default_rng(7)


def t(sec):
    return np.arange(int(sec * SR)) / SR


def hz(m):
    return 440 * 2 ** ((m - 69) / 12)


def band(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype="band", fs=SR, output="sos"), x)


def save(name, x, peak_db):
    x = x / np.max(np.abs(x)) * 10 ** (peak_db / 20)
    n = int(0.004 * SR)
    x[:n] *= np.linspace(0, 1, n); x[-n:] *= np.linspace(1, 0, n)
    sf.write(OUT / f"{name}.wav", x.astype(np.float32), SR, subtype="PCM_16")
    print(f"{name:7s} {len(x) / SR:.2f}s  peak {peak_db} dBFS")


# bloom: F5 → A5 soft sines with slow attack
s = t(1.6)
env = np.minimum(s / 0.35, 1) * np.exp(-np.maximum(s - 0.35, 0) * 2.2)
bloom = 0.6 * np.sin(2 * np.pi * hz(77) * s) + 0.25 * np.sin(2 * np.pi * hz(89) * s)
bloom += np.where(s > 0.18, 1, 0) * 0.5 * np.sin(2 * np.pi * hz(81) * s) * np.minimum(np.maximum(s - 0.18, 0) / 0.3, 1)
save("bloom", bloom * env, -14)

# whoosh: band-passed noise with a moving centre and a smooth hump
s = t(0.7)
noise = rng.standard_normal(len(s))
lo = sosfilt(butter(2, [300, 1400], btype="band", fs=SR, output="sos"), noise)
hi = sosfilt(butter(2, [1400, 5000], btype="band", fs=SR, output="sos"), noise)
mixv = np.clip(s / 0.7, 0, 1)
w = (lo * (1 - mixv) + hi * mixv * 0.6) * np.sin(np.pi * s / 0.7) ** 2
save("whoosh", w, -18)

# tap: a short rounded tick (sine blip + a breath of noise)
s = t(0.12)
tap = np.sin(2 * np.pi * 1250 * s) * np.exp(-s * 70) + 0.25 * band(rng.standard_normal(len(s)), 2000, 6000) * np.exp(-s * 140)
save("tap", tap, -16)

# page: light paper brush, two overlapping strokes
s = t(0.45)
brush = band(rng.standard_normal(len(s)), 1800, 7000)
pg = brush * (np.sin(np.pi * np.clip(s / 0.28, 0, 1)) ** 2 * 1.0 + np.sin(np.pi * np.clip((s - 0.16) / 0.28, 0, 1)) ** 2 * 0.6)
save("page", pg, -18)

# chime: warm bell on C6 with a fifth and octave, long decay
s = t(2.4)
ch = sum(a * np.sin(2 * np.pi * hz(84) * r * s) * np.exp(-s * d) for a, r, d in ((1, 1, 1.6), (0.4, 1.5, 2.4), (0.25, 2.0, 3.2)))
ch *= np.minimum(s / 0.008, 1)
save("chime", ch, -12)
