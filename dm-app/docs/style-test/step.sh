#!/bin/sh
# Unpack job <P><n> (if its dump exists), then write mj/next.js: the Playwright snippet that submits <P><n+1>.
# Usage: sh step.sh 1                         (attack run: A-jobs from attack-prompts.txt)
#        P=B F=v2-prompts.txt sh step.sh 1    (v2 run)
cd "$(dirname "$0")" || exit 1
P=${P:-A}
F=${F:-attack-prompts.txt}
n=$(printf '%02d' "$1")
row=$(grep "^$P$n	" "$F")
[ -f "mj/$P$n.json" ] && python mj/unpack.py "$P$n" "$(echo "$row" | cut -f2)"
next=$(printf '%02d' $(( $1 + 1 )))
python - "$next" "$P" "$F" <<'EOF'
import json, sys
nxt, pre, fname = sys.argv[1], sys.argv[2], sys.argv[3]
rows = [l.rstrip("\n").split("\t") for l in open(fname, encoding="utf-8")]
row = next((r for r in rows if r[0] == pre + nxt), None)
if not row:
    print("no more jobs"); sys.exit()
js = """async (page) => {
  const firstId = () => page.evaluate(() => { const a = document.querySelector('a[href*="/jobs/"]'); return a ? a.getAttribute('href').split('/jobs/')[1].split('?')[0] : null; });
  const before = await firstId();
  await page.locator('#desktop_input_bar').fill(%s);
  await page.locator('#desktop_input_bar').press('Enter');
  let id = before, t = 0;
  for (; t < 30 && id === before; t++) { await page.waitForTimeout(3000); id = await firstId(); }
  await page.waitForTimeout(40000);
  return JSON.stringify({ job: %s, id, waited: t * 3 + 40 });
}""" % (json.dumps(row[2]), json.dumps(row[0] + " " + row[1]))
open("mj/next.js", "w", encoding="utf-8").write(js)
print("next:", row[0], row[1])
EOF
