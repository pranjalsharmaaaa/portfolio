// Voiceover pipeline for the Stack Up film.
//
//   node scripts/voiceover.mjs --check   timing report only (no network, no key)
//   node scripts/voiceover.mjs           generate every line with ElevenLabs
//   node scripts/voiceover.mjs S02 S11   regenerate only these scenes
//
// Needs (generation only):
//   ELEVENLABS_API_KEY   an ElevenLabs API key with Text to Speech access
//   ELEVENLABS_VOICE_ID  the chosen voice (young adult female, Indian English)
//   ELEVENLABS_MODEL_ID  optional, defaults to narration.json voice.model_id
//
// Output: public/voiceover/<scene>.mp3 + src/voiceover-manifest.json
// (measured durations). The film picks both up automatically.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const narrationPath = join(root, "src", "narration.json");
const manifestPath = join(root, "src", "voiceover-manifest.json");
const outDir = join(root, "public", "voiceover");
const narration = JSON.parse(readFileSync(narrationPath, "utf8"));

/** Load the real timeline (TypeScript) so the report uses the film's own numbers. */
async function loadTimeline() {
  const out = join(tmpdir(), `stackup-timeline-${process.pid}.mjs`);
  await build({ entryPoints: [join(root, "src", "timeline.ts")], bundle: true, format: "esm", platform: "node", outfile: out, logLevel: "silent" });
  const mod = await import(pathToFileURL(out).href + `?t=${Date.now()}`);
  rmSync(out, { force: true });
  return mod;
}

function report(t) {
  const fps = 30;
  const fmt = (f) => `${Math.floor(f / fps / 60)}:${String(((f / fps) % 60).toFixed(1)).padStart(4, "0")}`;
  console.log(`\nVoiceover fit  (${t.VOICEOVER_READY ? "MEASURED from generated audio" : "ESTIMATED — no audio generated yet"})\n`);
  console.log("scene  starts  length  ends    next starts  slack");
  let problems = 0;
  t.VO_LINES.forEach((l, i) => {
    const next = t.VO_LINES[i + 1];
    const end = l.from + l.frames;
    const limit = next ? next.from : t.TOTAL_FRAMES - 15;
    const slack = (limit - end) / fps;
    const flag = slack < 0.15 ? "  ⚠ overlaps / too tight" : "";
    if (flag) problems++;
    console.log(`${l.scene}    ${fmt(l.from)}  ${(l.frames / fps).toFixed(1).padStart(5)}s  ${fmt(end)}  ${fmt(limit)}       ${slack.toFixed(2).padStart(5)}s${flag}`);
  });
  console.log(`\nTotal film: ${fmt(t.TOTAL_FRAMES)}  ·  ${problems ? `${problems} line(s) need attention` : "every line fits"}\n`);
  return problems;
}

async function tts(text, previousText, nextText) {
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) {
    throw new Error("Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in the environment (never commit them).");
  }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL_ID || narration.voice.model_id,
      voice_settings: narration.voice.voice_settings,
      // request stitching: neighbouring lines keep intonation continuous across clips
      previous_text: previousText,
      next_text: nextText,
    }),
  });
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return Buffer.from(await res.arrayBuffer());
}

function measure(file) {
  const out = execFileSync("npx", ["remotion", "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { cwd: root }).toString();
  return Number(out.trim());
}

const args = process.argv.slice(2);
const timeline = await loadTimeline();

if (args.includes("--check")) {
  process.exit(report(timeline) ? 1 : 0);
}

const only = args.filter((a) => /^S\d\d$/.test(a));
const spoken = (s) => timeline.spoken(s);
mkdirSync(outDir, { recursive: true });
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
manifest.lines ??= {};

for (const [i, line] of narration.lines.entries()) {
  if (only.length && !only.includes(line.scene)) continue;
  const prev = narration.lines[i - 1];
  const next = narration.lines[i + 1];
  process.stdout.write(`${line.scene} … `);
  const audio = await tts(spoken(line.text), prev && spoken(prev.text), next && spoken(next.text));
  const file = join(outDir, `${line.scene}.mp3`);
  writeFileSync(file, audio);
  const seconds = measure(file);
  manifest.lines[line.scene] = { file: `voiceover/${line.scene}.mp3`, seconds: Number(seconds.toFixed(3)) };
  console.log(`${seconds.toFixed(2)}s`);
}
manifest.generated = narration.lines.every((l) => manifest.lines[l.scene]);
manifest.voiceId = process.env.ELEVENLABS_VOICE_ID;
manifest.model = process.env.ELEVENLABS_MODEL_ID || narration.voice.model_id;
manifest.generatedAt = new Date().toISOString();
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const problems = report(await loadTimeline());
if (problems) console.log("Adjust `offset` in narration.json or `seconds` in timeline.ts, then re-run --check.");
