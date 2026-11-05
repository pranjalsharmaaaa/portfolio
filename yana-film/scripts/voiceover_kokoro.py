"""
Generates the YANA narration locally with Kokoro (open-source neural
TTS, Apache-2.0) — the same voice family as the portfolio's other films: a blend of Kokoro's
Hindi female speaker (hf_alpha, Indian English accent) and its most natural
English female voice (af_heart). ElevenLabs is not reachable from the build
environment.

    python3 scripts/voiceover_kokoro.py      (pip: kokoro-onnx soundfile)

Per line: each '|' phrase is synthesised separately, edge silence trimmed,
joined with a natural pause, loudness-normalised. Writes
public/voiceover/<scene>.wav (lossless; also used to assemble
deliverables/yana-voiceover.wav) and src/voiceover-manifest.json
(durations + phrase start times → captions, SRT, scene beats, ducking).
"""
import json
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
MODELS = ROOT / ".tts-models"
OUT = ROOT / "public" / "voiceover"
NARRATION = json.loads((ROOT / "src" / "narration.json").read_text())
RELEASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
SR = 24000
TARGET_RMS_DB = -16.0
PEAK_LIMIT = 0.89  # ≈ -1 dBFS


def fetch(name: str) -> Path:
    MODELS.mkdir(exist_ok=True)
    p = MODELS / name
    if not p.exists():
        urllib.request.urlretrieve(RELEASE + name, p)
    return p


def trim(x, thresh=0.008):
    loud = np.where(np.abs(x) > thresh)[0]
    if len(loud) == 0:
        return x
    pad = int(0.04 * SR)
    return x[max(loud[0] - pad, 0): min(loud[-1] + pad, len(x))]


def fade(x, ms=12):
    n = int(SR * ms / 1000)
    r = np.linspace(0, 1, n)
    x = x.copy(); x[:n] *= r; x[-n:] *= r[::-1]
    return x


def normalise(x):
    f = int(0.03 * SR)
    rms = np.array([np.sqrt(np.mean(x[i:i + f] ** 2)) for i in range(0, len(x) - f, f)])
    act = rms[rms > 0.01]
    level = np.sqrt(np.mean(act ** 2)) if len(act) else np.sqrt(np.mean(x ** 2))
    x = x * (10 ** (TARGET_RMS_DB / 20) / max(level, 1e-6))
    pk = np.max(np.abs(x))
    return x * (PEAK_LIMIT / pk) if pk > PEAK_LIMIT else x


def main():
    cfg = NARRATION["voice"]["kokoro"]
    kokoro = Kokoro(str(fetch("kokoro-v1.0.onnx")), str(fetch("voices-v1.0.bin")))
    style = sum(kokoro.get_voice_style(n) * w for n, w in cfg["style"].items())
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {"generated": True, "engine": "kokoro-v1.0 (local, Apache-2.0)", "voice": cfg["style"], "lines": {}}
    for line in NARRATION["lines"]:
        phrases = [p.strip() for p in line["text"].split("|") if p.strip()]
        parts, starts, t = [], [], 0.0
        for i, ph in enumerate(phrases):
            for k, v in NARRATION["voice"].get("say", {}).items():
                ph = ph.replace(k, v)
            speed = line.get("phraseSpeed", {}).get(str(i), line.get("speed", cfg["speed"]))
            a, _ = kokoro.create(ph, voice=style, speed=speed, lang=cfg["lang"])
            a = fade(trim(np.asarray(a, dtype=np.float32)))
            if i:
                parts.append(np.zeros(int(cfg["phrasePauseSeconds"] * SR), dtype=np.float32)); t += cfg["phrasePauseSeconds"]
            starts.append(round(t, 3)); parts.append(a); t += len(a) / SR
        clip = normalise(np.concatenate(parts))
        sf.write(OUT / f"{line['scene']}.wav", clip, SR, subtype="PCM_16")
        secs = round(len(clip) / SR, 3)
        manifest["lines"][line["scene"]] = {"file": f"voiceover/{line['scene']}.wav", "seconds": secs, "phrases": starts}
        print(f"{line['scene']}  {secs:5.2f}s  phrases at {starts}")
    (ROOT / "src" / "voiceover-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
