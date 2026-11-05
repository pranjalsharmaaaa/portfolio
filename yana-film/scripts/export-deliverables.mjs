// Builds the deliverables from the film's own timeline (the same measured
// voice timings the composition uses), so they can never drift from it:
//
//   deliverables/yana-captions.srt    subtitles, phrase-timed
//   deliverables/yana-voiceover.wav   narration only, 48 kHz, 60.000 s,
//                                            each line at its exact film time
//   deliverables/yana-film-final.mp4  copied from out/ if rendered
//
//   node scripts/export-deliverables.mjs [--check]   (--check: timing report only)
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(tmpdir(), `yana-timeline-${process.pid}.mjs`);
await build({ entryPoints: [join(root, "src", "timeline.ts")], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "silent" });
const t = await import(pathToFileURL(out).href);
rmSync(out, { force: true });
const FPS = 30;

// ── timing report ────────────────────────────────────────────────────────
const fmt = (f) => `${Math.floor(f / FPS / 60)}:${(f / FPS % 60).toFixed(2).padStart(5, "0")}`;
let problems = 0;
console.log(`film: ${t.TOTAL_FRAMES} frames = ${fmt(t.TOTAL_FRAMES)}`);
console.log("line  starts    ends      next/end  gap");
t.VO_LINES.forEach((l, i) => {
  const end = l.from + l.frames;
  const next = t.VO_LINES[i + 1]?.from ?? t.TOTAL_FRAMES;
  const gap = (next - end) / FPS;
  const scene = t.TIMED.find((s) => s.id === l.scene);
  const inScene = l.from >= scene.from && end <= scene.from + scene.frames + scene.fadeOut;
  const bad = gap < 0.15 || !inScene;
  if (bad) problems++;
  console.log(`${l.scene}    ${fmt(l.from)}   ${fmt(end)}   ${fmt(next)}   ${gap.toFixed(2)}s${bad ? "  ⚠" : ""}`);
});
console.log(problems ? `${problems} problem(s)` : "every line fits inside its scene and the film");
if (process.argv.includes("--check")) process.exit(problems ? 1 : 0);

// ── SRT ──────────────────────────────────────────────────────────────────
const ts = (frame) => {
  const ms = Math.round((frame / FPS) * 1000);
  const p = (n, w = 2) => String(n).padStart(w, "0");
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const dir = join(root, "deliverables");
mkdirSync(dir, { recursive: true });
const srt = t.CAPTIONS.map((c, i) => `${i + 1}\n${ts(c.from)} --> ${ts(Math.min(c.to, t.TOTAL_FRAMES))}\n${c.text}\n`).join("\n");
writeFileSync(join(dir, "yana-captions.srt"), srt);
console.log(`wrote deliverables/yana-captions.srt (${t.CAPTIONS.length} cues)`);

// ── voice-only WAV, assembled at the film's exact line times ─────────────
const placements = t.VO_LINES.map((l) => ({ file: join(root, "public", l.file), at: l.from / FPS }));
const placementsPath = join(root, "out", "vo-placements.json");
mkdirSync(join(root, "out"), { recursive: true });
writeFileSync(placementsPath, JSON.stringify({ seconds: t.TOTAL_FRAMES / FPS, placements }));
execFileSync("python3", [join(root, "scripts", "assemble-voiceover.py"), placementsPath, join(dir, "yana-voiceover.wav")], { stdio: "inherit" });

const mp4 = join(root, "out", "yana-film-final.mp4");
if (existsSync(mp4)) {
  copyFileSync(mp4, join(dir, "yana-film-final.mp4"));
  console.log("copied deliverables/yana-film-final.mp4");
}
