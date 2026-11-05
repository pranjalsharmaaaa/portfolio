// Copies the YANA case study's ORIGINAL images from the portfolio
// (public/images/yana) into public/yana, and Nunito from @fontsource into
// public/fonts (both git-ignored). The film never edits or duplicates them
// in git: the portfolio stays the single source of truth.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const portfolio = join(root, "..");
cpSync(join(portfolio, "public", "images", "yana"), join(root, "public", "yana"), { recursive: true });
mkdirSync(join(root, "public", "fonts"), { recursive: true });
for (const w of [400, 600, 700, 800]) {
  const f = `nunito-latin-${w}-normal.woff2`;
  cpSync(join(root, "node_modules", "@fontsource", "nunito", "files", f), join(root, "public", "fonts", f));
}
console.log("synced YANA images + Nunito");
