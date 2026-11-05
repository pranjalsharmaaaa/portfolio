"""
Assembles the narration-only WAV deliverable: each generated line placed at
its exact film time on a silent 60.000 s, 48 kHz, 16-bit mono track.

    python3 scripts/assemble-voiceover.py <placements.json> <out.wav>
"""
import json
import sys

import numpy as np
import soundfile as sf
from scipy.signal import resample_poly

SR = 48000
spec = json.load(open(sys.argv[1]))
track = np.zeros(int(round(spec["seconds"] * SR)), dtype=np.float32)
for p in spec["placements"]:
    audio, sr = sf.read(p["file"], dtype="float32")
    if audio.ndim > 1:
        audio = audio.mean(axis=1)
    if sr != SR:
        audio = resample_poly(audio, SR, sr).astype(np.float32)
    start = int(round(p["at"] * SR))
    end = min(start + len(audio), len(track))
    track[start:end] += audio[: end - start]
peak = float(np.max(np.abs(track)))
assert peak < 1.0, f"clipping: peak {peak:.3f}"
sf.write(sys.argv[2], track, SR, subtype="PCM_16")
print(f"wrote {sys.argv[2]}  {len(track) / SR:.3f}s  peak {20 * np.log10(peak):.1f} dBFS")
