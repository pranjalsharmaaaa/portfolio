// Copies the Sales Coach case study's ORIGINAL assets from the portfolio
// (public/images/sales-coach, public/videos/sales-coach) plus Inter into
// public/sc and public/fonts (git-ignored). The film never edits or
// duplicates them in git: the portfolio stays the single source of truth.
import { cpSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const portfolio = join(root, "..");
mkdirSync(join(root, "public", "sc"), { recursive: true });
cpSync(join(portfolio, "public", "images", "sales-coach"), join(root, "public", "sc", "images"), { recursive: true });
cpSync(join(portfolio, "public", "videos", "sales-coach"), join(root, "public", "sc", "videos"), { recursive: true });
mkdirSync(join(root, "public", "fonts"), { recursive: true });
cpSync(join(portfolio, "components", "stackup", "fonts", "inter-latin-variable.woff2"), join(root, "public", "fonts", "inter-latin-variable.woff2"));
console.log("synced Sales Coach images + videos + Inter");
