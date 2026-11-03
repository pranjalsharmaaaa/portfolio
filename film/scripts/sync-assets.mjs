// Copies the real Stack Up product assets from the portfolio's public
// folder into film/public/stackup so the film always uses the same files
// as the case study (single source of truth; the copy is git-ignored).
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "..", "public", "images", "stackup");
const to = join(root, "public", "stackup");
mkdirSync(to, { recursive: true });
cpSync(from, to, { recursive: true });
mkdirSync(join(root, "public", "fonts"), { recursive: true });
cpSync(
  join(root, "..", "components", "stackup", "fonts", "inter-latin-variable.woff2"),
  join(root, "public", "fonts", "inter-latin-variable.woff2"),
);
console.log("synced stackup assets + Inter");
