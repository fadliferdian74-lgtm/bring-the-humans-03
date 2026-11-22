// bring-the-humans-03 — entry program.
// The deliverable is the TikTok video named in VIDEO.json; the house reads
// the video itself. This program's only job is to copy VIDEO.json from the
// repository root into the output directory, byte for byte.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const source = join(botDir, "VIDEO.json");
if (!existsSync(source)) {
  throw new Error(`VIDEO.json not found in bot dir: ${source}`);
}

// Copy to a sibling temp name first, then move into place, so the output
// never holds a half-written VIDEO.json if the run is interrupted.
const target = join(outDir, "VIDEO.json");
mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
