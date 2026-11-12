// Audit: every {@scene}, {@side}, {@c}, choices goto/side and encounter combatant in a session resolves.
// Usage: node tests/link-audit.js 14-the-emporium-and-the-mirror 15-the-scab
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const CAMPAIGN = ["campaign-ship", "campaign-arcs", "campaign-tower", "campaign-hellriders", "campaign-world",
  "campaign-map", "campaign-crew", "campaign-endgame", "campaign-emporium", "campaign-emporium-games"];
let bad = 0;
for (const id of process.argv.slice(2)) {
  const ctx = vm.createContext({ window: {}, console });
  for (const c of CAMPAIGN) vm.runInContext(fs.readFileSync(path.join(ROOT, "sessions", c + ".js"), "utf8"), ctx, { filename: c });
  vm.runInContext(fs.readFileSync(path.join(ROOT, "sessions", id + ".js"), "utf8"), ctx, { filename: id });
  const S = ctx.window.SESSION, C = ctx.window.CAMPAIGN || { creatures: {}, side: {} };
  const scenes = new Set((S.scenes || []).map(s => s.id));
  const sides = new Set([...Object.keys(C.side || {}), ...Object.keys(S.side || {})]);
  const creatures = new Set([...Object.keys(C.creatures || {}), ...Object.keys(S.creatures || {})]);
  const text = JSON.stringify(S);
  const check = (kind, set, re) => {
    for (const m of text.matchAll(re)) if (!set.has(m[1])) { bad++; console.log(id + ": missing " + kind + ' "' + m[1] + '"'); }
  };
  check("scene", scenes, /\{@scene ([a-z0-9-]+)/g);
  check("side", sides, /\{@side ([a-z0-9-]+)/g);
  check("creature", creatures, /\{@c ([a-z0-9-]+)/g);
  check("goto", scenes, /"goto":"([a-z0-9-]+)"/g);
  check("choice side", sides, /"side":"([a-z0-9-]+)"/g);
  check("combatant", creatures, /"c":"([a-z0-9-]+)"/g);
  console.log(id + ": " + scenes.size + " scenes, " + Object.keys(S.side || {}).length + " sides, " +
    Object.keys(S.creatures || {}).length + " creatures checked");
}
process.exit(bad ? 1 : 0);
