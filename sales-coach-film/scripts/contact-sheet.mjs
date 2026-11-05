// Renders keyframes into a single review folder with ONE bundle (much
// faster than calling `remotion still` per frame).
// Usage: node scripts/contact-sheet.mjs <outDir> <frame> [frame...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const [outDir, ...frames] = process.argv.slice(2);
if (!outDir || frames.length === 0) {
  console.error("usage: node scripts/contact-sheet.mjs <outDir> <frame...>");
  process.exit(1);
}
mkdirSync(resolve(outDir), { recursive: true });
const browserExecutable = process.env.REMOTION_BROWSER || null;
const serveUrl = await bundle({ entryPoint: join(root, "src/index.ts"), publicDir: join(root, "public") });
const composition = await selectComposition({ serveUrl, id: "SalesCoachFilm", browserExecutable });
for (const f of frames) {
  const frame = Number(f);
  await renderStill({
    serveUrl, composition, frame, browserExecutable, scale: 0.5,
    output: resolve(outDir, `f${String(frame).padStart(4, "0")}.png`),
  });
  process.stdout.write(`${frame} `);
}
console.log("\ndone");
