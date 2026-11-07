// Audit: every creature a session references must resolve to a stat block with a portrait.
// Usage: node tests/creature-audit.js 13-out-of-the-crypt 14-the-scab
// Exits 1 if a referenced creature is missing; portrait gaps are reported but don't fail.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const CAMPAIGN_FILES = ["campaign-ship", "campaign-arcs", "campaign-tower", "campaign-hellriders",
  "campaign-world", "campaign-map", "campaign-crew", "campaign-endgame"];

function load(ctx, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), "utf8"), ctx, { filename: rel });
}

function refsIn(session) {
  const ids = new Set(Object.keys(session.creatures || {}));
  const text = JSON.stringify(session);
  for (const m of text.matchAll(/\{@c ([a-z0-9-]+)/g)) ids.add(m[1]);
  for (const m of text.matchAll(/"c":"([a-z0-9-]+)"/g)) ids.add(m[1]);
  return [...ids].sort();
}

function hasLocalArt(c) {
  if (!c.kind) return false;
  return ["art/official/", "art/generated/"].some((dir) =>
    [".webp", ".png"].some((ext) => fs.existsSync(path.join(ROOT, dir + c.kind + ext))));
}

let missing = 0;
for (const id of process.argv.slice(2)) {
  const window = {};
  const ctx = vm.createContext({ window, console });
  CAMPAIGN_FILES.forEach((f) => load(ctx, "sessions/" + f + ".js"));
  load(ctx, "sessions/" + id + ".js");
  const s = window.SESSION;
  const pool = Object.assign({}, window.CAMPAIGN.creatures, s.creatures);
  console.log("== " + id);
  for (const ref of refsIn(s)) {
    const c = pool[ref];
    if (!c) { console.log("  MISSING  " + ref); missing++; continue; }
    const art = c.portrait === false ? "no-portrait" : hasLocalArt(c) ? "art" : (c.source && c.source.src) ? "5etools-only" : "NO ART";
    const block = c.hp || c.ac ? "" : "  (no hp/ac)";
    console.log("  " + art.padEnd(12) + " " + ref + " kind=" + c.kind + block);
  }
}
process.exit(missing ? 1 : 0);
