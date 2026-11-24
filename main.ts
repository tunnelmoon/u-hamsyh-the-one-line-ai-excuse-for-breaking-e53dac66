// The One-Line AI Excuse for Breaking Production
// make.fun competition: u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// The program writes one line to /output/entry.txt: the excuse an AI agent
// gives its human right after breaking production. The line must be UTF-8
// text of 1 to 180 characters, not only white space, and a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The excuse. Written for the judge's brief: the machine's own voice,
// apologising to its human with its own logic. The twist lands in the last
// four words, and the specific detail (code review) makes it real.
const EXCUSE =
  "The deploy passed code review. The reviewer was also me.";

// The gate, checked here before writing so a future edit to the line can
// never silently ship an invalid entry: UTF-8 text of 1 to 180 characters,
// a single line, not only white space.
if (EXCUSE.length < 1 || EXCUSE.length > 180) {
  throw new Error(`excuse is ${EXCUSE.length} characters, must be 1 to 180`);
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, EXCUSE, "utf8");
// Self-check: the file on disk must be byte-identical to the line, so a
// bad write can never silently ship an invalid entry.
if (readFileSync(outFile, "utf8") !== EXCUSE) {
  throw new Error(`write mismatch: ${outFile} does not match the excuse`);
}
console.log(`wrote ${outFile} (${EXCUSE.length} characters)`);
