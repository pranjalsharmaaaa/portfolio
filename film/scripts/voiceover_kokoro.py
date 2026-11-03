"""
Generates the film's narration locally with Kokoro (open-source neural TTS,
Apache-2.0), used because ElevenLabs is not reachable from this environment.
`npm run voiceover` (ElevenLabs) remains available and overwrites these clips.

    python3 scripts/voiceover_kokoro.py          (pip: kokoro-onnx soundfile scipy)

Voice: a blend of Kokoro's Hindi female speaker (hf_alpha, carries the Indian
English accent) with its most natural English female voice (af_heart, warmth
and diction), set in src/narration.json → voice.kokoro.

Per line: each '|' phrase is synthesised separately, edge silence trimmed,
joined with a natural pause, and the line is loudness-normalised. Output:
public/voiceover/<scene>.mp3 + src/voiceover-manifest.json (durations and
phrase start times, which drive captions, S7's beats and music ducking).
"""
import json
import subprocess
import urllib.request
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
MODELS = ROOT / ".tts-models"
OUT = ROOT / "public" / "voiceover"
MANIFEST = ROOT / "src" / "voiceover-manifest.json"
NARRATION = json.loads((ROOT / "src" / "narration.json").read_text())
RELEASE = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"
ACT_OF = {f"S{i:02d}": a for a, ids in {1: [1, 2, 3], 2: [4, 5, 6, 7], 3: [8, 9], 4: [10, 11], 5: [12, 13, 14, 15], 6: [16, 17]}.items() for i in ids}

TARGET_RMS_DB = -16.0  # speech loudness (active frames); ≈ web-video level in the final mix
PEAK_LIMIT = 0.89  # ≈ -1 dBFS


def fetch(name: str) -> Path:
    MODELS.mkdir(exist_ok=True)
    p = MODELS / name
    if not p.exists():
        print(f"downloading {name} …")
        urllib.request.urlretrieve(RELEASE + name, p)
    return p


def trim(x: np.ndarray, sr: int, thresh: float = 0.008) -> np.ndarray:
    """Trim leading/trailing silence, keeping 40 ms of air either side."""
    loud = np.where(np.abs(x) > thresh)[0]
    if len(loud) == 0:
        return x
    pad = int(0.04 * sr)
    return x[max(loud[0] - pad, 0): min(loud[-1] + pad, len(x))]


def fade(x: np.ndarray, sr: int, ms: float = 12) -> np.ndarray:
    n = int(sr * ms / 1000)
    ramp = np.linspace(0, 1, n)
    x = x.copy()
    x[:n] *= ramp
    x[-n:] *= ramp[::-1]
    return x


def normalise(x: np.ndarray, sr: int) -> np.ndarray:
    frame = int(0.03 * sr)
    rms = np.array([np.sqrt(np.mean(x[i:i + frame] ** 2)) for i in range(0, len(x) - frame, frame)])
    active = rms[rms > 0.01]
    level = np.sqrt(np.mean(active ** 2)) if len(active) else np.sqrt(np.mean(x ** 2))
    x = x * (10 ** (TARGET_RMS_DB / 20) / max(level, 1e-6))
    peak = np.max(np.abs(x))
    return x * (PEAK_LIMIT / peak) if peak > PEAK_LIMIT else x


def main() -> None:
    cfg = NARRATION["voice"]["kokoro"]
    kokoro = Kokoro(str(fetch("kokoro-v1.0.onnx")), str(fetch("voices-v1.0.bin")))
    style = sum(kokoro.get_voice_style(name) * w for name, w in cfg["style"].items())
    pause_s = cfg["phrasePauseSeconds"]
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {"generated": True, "engine": "kokoro-v1.0 (local, Apache-2.0)", "voice": cfg["style"], "lines": {}}

    for line in NARRATION["lines"]:
        scene = line["scene"]
        speed = cfg["speedByAct"][str(ACT_OF[scene])]
        phrases = [p.strip() for p in line["text"].split("|") if p.strip()]
        sr = 24000
        parts, starts, t = [], [], 0.0
        for i, phrase in enumerate(phrases):
            audio, sr = kokoro.create(phrase, voice=style, speed=speed, lang=cfg["lang"])
            audio = fade(trim(np.asarray(audio, dtype=np.float32), sr), sr)
            if i:
                parts.append(np.zeros(int(pause_s * sr), dtype=np.float32))
                t += pause_s
            starts.append(round(t, 3))
            parts.append(audio)
            t += len(audio) / sr
        clip = normalise(np.concatenate(parts), sr)
        wav = OUT / f"{scene}.wav"
        mp3 = OUT / f"{scene}.mp3"
        sf.write(wav, clip, sr)
        subprocess.run(["npx", "remotion", "ffmpeg", "-y", "-v", "error", "-i", str(wav), "-ar", "44100", "-b:a", "192k", str(mp3)], cwd=ROOT, check=True)
        wav.unlink()
        seconds = round(len(clip) / sr, 3)
        manifest["lines"][scene] = {"file": f"voiceover/{scene}.mp3", "seconds": seconds, "phrases": starts}
        print(f"{scene}  {seconds:5.2f}s  speed {speed}  phrases at {starts}")

    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"wrote {MANIFEST.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
