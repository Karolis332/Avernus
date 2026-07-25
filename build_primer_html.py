#!/usr/bin/env python3
"""Convert a campaign primer .md into a 5e.tools-style adventure reader (HTML).

Clone of the 5e.tools night-mode adventure interface: flat dark background,
maroon small-caps serif headers, cream serif body, blue inline links, plain
bordered tables, collapsible nested nav tree, Prev/Next chapter bar, inset
read-aloud + DM-only boxes.
"""
import sys, html, webbrowser, os, re
import markdown

SRC = sys.argv[1] if len(sys.argv) > 1 else "descent-into-avernus-primer.md"
OUT = SRC.rsplit(".", 1)[0] + ".html"

raw = open(SRC, encoding="utf-8").read()

lines = raw.split("\n")
title, subtitle, body_start = "Campaign Primer", "", 0
for i, ln in enumerate(lines):
    if ln.startswith("# "):
        title = ln[2:].split("{")[0].strip()
        body_start = i + 1
        break
for ln in lines[body_start:body_start + 4]:
    m = re.match(r"\s*\*\*(.+?)\*\*\s*$", ln)
    if m:
        subtitle = re.sub(r"[*_`]", "", m.group(1))
        break
body_md = "\n".join(lines[body_start:])

md = markdown.Markdown(
    extensions=["extra", "toc", "admonition", "sane_lists"],
    extension_configs={"toc": {"toc_depth": "2-4", "permalink": False}},
)
body_html = md.convert(body_md)
toc_html = md.toc

# module numerals (5e.tools "Ch. X" style prefix)
KEYMAP = [
    ("LIVING STATE", "I"), ("STORY SO FAR", "II"), ("MAIN QUEST", "III"),
    ("ACTIVE ARCS", "IV"), ("LOCATION GAZETTEER", "V"), ("NPC DOSSIER", "VI"),
    ("LORE", "VII"), ("REVELATION", "VIII"), ("SANDBOX RUN-KIT", "IX"),
]
def numeral(text):
    up = re.sub(r"<[^>]+>", "", text).upper()
    for kw, r in KEYMAP:
        if kw in up:
            return r
    return None

def classify_blockquotes(h):
    def repl(m):
        inner = m.group(1)
        flat = re.sub(r"<[^>]+>", "", inner).upper()
        if "DM ONLY" in flat or "DM-ONLY" in flat:
            cls, tag = "dmonly", "DM Only"
        elif "READ ALOUD" in flat or "READ-ALOUD" in flat:
            cls, tag = "read", "Read Aloud"
        else:
            cls, tag = "note", ""
        badge = f'<span class="cotag">{tag}</span>' if tag else ""
        return f'<blockquote class="{cls}">{badge}{inner}</blockquote>'
    return re.sub(r"<blockquote>(.*?)</blockquote>", repl, h, flags=re.S)

def decorate_headings(h):
    def repl(m):
        attrs, text = m.group(1), m.group(2)
        r = numeral(text)
        if not r:
            return m.group(0)
        return f'<h2{attrs} class="module"><span class="mnum">{r}</span>{text}</h2>'
    return re.sub(r"<h2([^>]*)>(.*?)</h2>", repl, h, flags=re.S)

body_html = classify_blockquotes(body_html)
body_html = decorate_headings(body_html)

page_title = html.escape(title)
sub = html.escape(subtitle) if subtitle else "Descent into Avernus"

CSS = r"""
:root{
  --bg:#111214; --bg2:#17181b; --panel:#1b1c20; --panel2:#212228; --panel3:#282a31;
  --border:#2f3037; --border2:#3b3d45;
  --ink:#dcd8cb; --ink2:#bdb8aa; --muted:#8b8678;
  --head:#b0472f; --head2:#c66a4c; --accent:#c9a24a;
  --link:#6fa8cc; --good:#79b579; --warn:#d6a64e; --bad:#cf5b48;
  --readbg:#1d2024; --readbd:#4a3b2a; --dmbg:#221619; --notebg:#1a1b1f;
  --serif:'PT Serif','Georgia',serif;
  --head-f:'Libre Baskerville','Georgia',serif;
  --mono:'JetBrains Mono','Consolas',monospace;
  --measure:76ch;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--serif);font-size:17px;line-height:1.62;
  -webkit-font-smoothing:antialiased}
a{color:var(--link);text-decoration:none}
a:hover{text-decoration:underline}
#prog{position:fixed;top:0;left:0;height:2px;width:0;z-index:60;background:var(--head)}

/* layout */
.layout{display:grid;grid-template-columns:300px minmax(0,1fr)}
nav.sidebar{position:sticky;top:0;height:100vh;overflow-y:auto;padding:16px 10px 80px;background:var(--bg2);
  border-right:1px solid var(--border);scrollbar-width:thin;scrollbar-color:var(--border2) transparent;font-size:13px}
nav.sidebar::-webkit-scrollbar{width:8px}nav.sidebar::-webkit-scrollbar-thumb{background:var(--border2);border-radius:4px}
nav .brand{font-family:var(--head-f);font-weight:700;font-variant:small-caps;font-size:16px;color:var(--head);margin:4px 8px 2px;line-height:1.2}
nav .sub{color:var(--muted);font-size:11px;margin:0 8px 12px;padding-bottom:12px;border-bottom:1px solid var(--border);font-style:italic}
.tools{display:flex;gap:6px;margin:0 6px 10px}
.tools button{flex:1;font-family:var(--serif);font-size:11px;background:var(--panel2);border:1px solid var(--border2);
  color:var(--ink2);padding:5px;border-radius:3px;cursor:pointer}
.tools button:hover{background:var(--panel3);color:var(--ink)}
nav .toc ul{list-style:none;padding-left:0;margin:0}
nav .toc>ul>li{margin:0}
nav .toc a{display:block;padding:4px 10px;border-radius:3px;color:var(--ink2);line-height:1.35;border-left:2px solid transparent}
nav .toc a:hover{background:var(--panel);color:var(--ink);text-decoration:none}
nav .toc a.active{background:var(--panel2);border-left-color:var(--head);color:var(--head2);font-weight:700}
nav .toc>ul>li>a{color:var(--ink);font-family:var(--head-f);font-variant:small-caps;font-size:13.5px;letter-spacing:.3px;margin-top:4px}
nav .toc ul ul a{font-size:12.5px;color:var(--muted);padding-left:22px}
nav .toc ul ul ul a{padding-left:34px;font-size:12px;opacity:.85}
/* collapsible */
nav .toc li.branch{position:relative}
nav .toc li.branch>a{padding-left:22px}
nav .toc .tw{position:absolute;left:2px;top:5px;width:15px;height:15px;display:inline-flex;align-items:center;justify-content:center;
  font-family:var(--mono);font-size:12px;line-height:1;color:var(--muted);cursor:pointer;user-select:none;z-index:2}
nav .toc .tw:hover{color:var(--head2)}
nav .toc li.branch.collapsed>ul{display:none}

main{min-width:0}
.wrap{max-width:960px;padding:0 46px 140px}

/* masthead + chapter nav */
header.title{position:sticky;top:0;z-index:30;background:var(--bg);border-bottom:1px solid var(--border);padding:14px 46px 0}
header.title h1{font-family:var(--head-f);font-weight:700;font-variant:small-caps;font-size:27px;color:var(--head);margin:0 0 2px;letter-spacing:.5px}
header.title .msub{font-size:12px;color:var(--muted);margin:0 0 10px;font-style:italic}
.chapnav{display:flex;align-items:center;gap:10px;padding:4px 0 10px}
.chapnav button,.chapnav .ent{font-family:var(--serif);font-size:12px;background:var(--panel);border:1px solid var(--border2);
  color:var(--ink2);padding:6px 14px;border-radius:3px;cursor:pointer;white-space:nowrap}
.chapnav button:hover,.chapnav .ent:hover{background:var(--panel3);color:var(--ink);text-decoration:none}
.chapnav .cur{flex:1;text-align:center;font-family:var(--head-f);font-variant:small-caps;font-size:14px;letter-spacing:.5px;
  color:var(--head2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}

/* headings */
h2,h3,h4{scroll-margin-top:120px}
.wrap>h1{font-family:var(--head-f);font-variant:small-caps;font-size:24px;color:#fff;background:var(--head);
  padding:10px 18px;border-radius:3px;margin:56px 0 18px}
h2{font-family:var(--head-f);font-weight:700;font-variant:small-caps;font-size:26px;color:var(--head);letter-spacing:.4px;
  margin:52px 0 12px;padding-bottom:7px;border-bottom:2px solid var(--border2)}
h2.module .mnum{color:var(--muted);font-weight:400;margin-right:12px}
h3{font-family:var(--head-f);font-weight:700;font-variant:small-caps;font-size:19px;color:var(--head2);margin:30px 0 8px;letter-spacing:.3px}
h4{font-family:var(--head-f);font-weight:700;font-variant:small-caps;font-size:15px;color:var(--head2);margin:22px 0 6px;letter-spacing:.5px}

/* body */
.wrap>p,.wrap>ul,.wrap>ol,.wrap>h3,.wrap>h4,.wrap>blockquote{max-width:var(--measure)}
p{margin:12px 0}
strong{color:#efe9da;font-weight:700}
em{color:var(--ink2)}
ul,ol{margin:12px 0;padding-left:24px}
li{margin:5px 0}
li::marker{color:var(--head2)}
li input[type=checkbox]{margin-right:7px;accent-color:var(--head);vertical-align:-1px}
hr{border:0;height:1px;background:var(--border2);margin:30px 0;max-width:var(--measure)}
code{background:var(--panel2);border:1px solid var(--border);border-radius:3px;padding:1px 5px;font-family:var(--mono);font-size:12.5px;color:#c7b98f}
pre{background:#0d0e10;border:1px solid var(--border);border-left:3px solid var(--head);border-radius:4px;padding:14px 16px;overflow-x:auto;margin:16px 0;max-width:var(--measure)}
pre code{background:none;border:none;padding:0;color:var(--ink);font-size:12.5px;white-space:pre}
.dm-inline{color:#e0a99c}

/* callout boxes (5e.tools inset style) */
blockquote{margin:18px 0;max-width:var(--measure)}
blockquote p:first-child{margin-top:0}blockquote p:last-child{margin-bottom:0}
.cotag{display:inline-block;font-family:var(--head-f);font-variant:small-caps;font-size:11px;letter-spacing:.5px;font-weight:700;
  padding:2px 10px;border-radius:2px;margin-bottom:8px}
blockquote.read{background:var(--readbg);border:1px solid var(--border2);border-left:4px solid var(--accent);padding:13px 18px;
  font-style:italic;color:var(--ink);border-radius:2px}
blockquote.read .cotag{background:var(--accent);color:#1a1408}
blockquote.dmonly{background:var(--dmbg);border:1px solid #4a2a2a;border-left:4px solid var(--bad);padding:12px 18px;color:#e2c8c1;border-radius:2px}
blockquote.dmonly .cotag{background:var(--bad);color:#fff}
blockquote.dmonly strong{color:#f2c0b6}
blockquote.note{background:var(--notebg);border:1px solid var(--border);border-left:4px solid var(--border2);padding:12px 18px;color:var(--ink2);border-radius:2px}

.admonition{margin:18px 0;border:1px solid var(--border2);border-radius:4px;background:var(--panel);padding:0 0 12px}
.admonition>.admonition-title{font-family:var(--head-f);font-variant:small-caps;padding:8px 16px;margin:0;background:var(--panel2);border-bottom:1px solid var(--border);color:var(--head2)}
.admonition>*:not(.admonition-title){padding:0 16px}

/* tables (plain, 5e.tools) */
table{border-collapse:collapse;width:100%;margin:18px 0;font-size:15px}
th{font-family:var(--head-f);font-variant:small-caps;color:var(--head);text-align:left;padding:8px 12px;border:1px solid var(--border2);background:var(--panel2);letter-spacing:.3px;font-weight:700}
td{padding:8px 12px;border:1px solid var(--border);vertical-align:top}
tbody tr:nth-child(even){background:var(--panel)}
table code{font-size:12px}table strong{color:#efe9da}

/* stat block */
.statblock{background:#f0e6d2;color:#2a1c0e;border:1px solid #c9a96f;border-left:4px solid #7a200d;border-radius:3px;
  padding:14px 18px;margin:18px 0;font-family:var(--serif);font-size:14.5px;line-height:1.5}
.statblock .sb-name{font-family:var(--head-f);font-variant:small-caps;color:#7a200d;font-size:20px;font-weight:700}
.statblock strong{color:#3a1a0c}.statblock a{color:#7a200d}

#totop{position:fixed;right:24px;bottom:24px;z-index:40;width:44px;height:44px;border-radius:50%;background:var(--panel2);
  border:1px solid var(--border2);color:var(--head2);font-size:19px;cursor:pointer;display:none;align-items:center;justify-content:center}
#totop:hover{background:var(--head);color:#fff}#totop.show{display:flex}

@media (max-width:1000px){.layout{grid-template-columns:1fr}nav.sidebar{display:none}.wrap,header.title{padding-left:18px;padding-right:18px}}
@media print{
  :root{--measure:none}.layout{grid-template-columns:1fr}nav.sidebar,.chapnav,#totop,#prog{display:none}
  html,body{background:#fff;color:#1a1410;font-size:11pt}
  header.title{position:static;border:none;padding:0}header.title h1{color:#7a1010}
  .wrap{max-width:none;padding:0}.wrap>h1{background:#7a1010}
  h2,h3,h4{color:#7a1010}
  blockquote.read{background:#f4ecdc;color:#1a1410}blockquote.dmonly{background:#f7eaea;color:#3a1410}blockquote.note{background:#f4f2ec}
  th{background:#eadfc9;color:#3a2018}tbody tr:nth-child(even){background:#faf6ee}
  a{color:#1a1410}pre{background:#f2ede2;color:#1a1410}
}
"""

JS = r"""
var bt=document.getElementById('totop'),pr=document.getElementById('prog');
addEventListener('scroll',function(){
  bt.classList.toggle('show',scrollY>500);
  var h=document.documentElement,max=h.scrollHeight-h.clientHeight;
  pr.style.width=(max>0?(scrollY/max*100):0)+'%';
});
document.querySelectorAll('nav .toc li').forEach(function(li){
  var sub=li.querySelector(':scope > ul');if(!sub)return;
  li.classList.add('branch','collapsed');
  var tw=document.createElement('span');tw.className='tw';tw.textContent='+';
  tw.addEventListener('click',function(e){e.stopPropagation();e.preventDefault();
    var c=li.classList.toggle('collapsed');tw.textContent=c?'+':'−';});
  li.insertBefore(tw,li.firstChild);
});
function setAll(c){document.querySelectorAll('nav .toc li.branch').forEach(function(li){
  li.classList.toggle('collapsed',c);var t=li.querySelector(':scope > .tw');if(t)t.textContent=c?'+':'−';});}
var ea=document.getElementById('expandAll'),ca=document.getElementById('collapseAll');
if(ea)ea.onclick=function(){setAll(false)};if(ca)ca.onclick=function(){setAll(true)};
var links={};document.querySelectorAll('nav .toc a').forEach(function(a){
  var id=a.getAttribute('href');if(id&&id[0]==='#')links[id.slice(1)]=a;});
var heads=[].slice.call(document.querySelectorAll('.wrap h2,.wrap h3')).filter(function(h){return h.id});
var spy=new IntersectionObserver(function(es){
  es.forEach(function(e){if(e.isIntersecting){
    Object.values(links).forEach(function(a){a.classList.remove('active')});
    var a=links[e.target.id];if(!a)return;a.classList.add('active');
    var p=a.closest('li');
    while(p){if(p.classList.contains('branch')){p.classList.remove('collapsed');
      var t=p.querySelector(':scope > .tw');if(t)t.textContent='−';}
      p=p.parentElement?p.parentElement.closest('li'):null;}
    a.scrollIntoView({block:'nearest'});
  }});
},{rootMargin:'-130px 0px -74% 0px',threshold:0});
heads.forEach(function(h){spy.observe(h)});
var secs=[].slice.call(document.querySelectorAll('.wrap h2')).filter(function(h){return h.id});
function curIdx(){var y=scrollY+150,idx=0;secs.forEach(function(h,i){if(h.offsetTop<=y)idx=i});return idx;}
function go(d){var i=Math.max(0,Math.min(secs.length-1,curIdx()+d));secs[i].scrollIntoView();}
var pv=document.getElementById('prevSec'),nx=document.getElementById('nextSec'),cs=document.getElementById('curSec');
if(pv)pv.onclick=function(){go(-1)};if(nx)nx.onclick=function(){go(1)};
function updNav(){if(!cs)return;var h=secs[curIdx()];if(h)cs.textContent=h.textContent.replace(/\s+/g,' ').trim().slice(0,54);}
addEventListener('scroll',updNav);updNav();
document.querySelectorAll('.wrap li,.wrap p').forEach(function(el){
  var t=(el.textContent||'').trim().toUpperCase();
  if(t.indexOf('DM ONLY')===0||t.indexOf('DM-ONLY')===0)el.classList.add('dm-inline');
});
"""

doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{page_title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<div id="prog"></div>
<span id="top"></span>
<div class="layout">
  <nav class="sidebar">
    <div class="brand">{page_title}</div>
    <div class="sub">{sub}</div>
    <div class="tools"><button id="expandAll">Expand all</button><button id="collapseAll">Collapse all</button></div>
    <div class="toc">{toc_html}</div>
  </nav>
  <main>
    <header class="title">
      <h1>{page_title}</h1>
      <div class="msub">{sub}</div>
      <div class="chapnav">
        <button id="prevSec">&#8249;&nbsp;Prev</button>
        <span id="curSec" class="cur"></span>
        <button id="nextSec">Next&nbsp;&#8250;</button>
        <a class="ent" href="#top">Entire&nbsp;Tome</a>
      </div>
    </header>
    <div class="wrap">
      {body_html}
    </div>
  </main>
</div>
<button id="totop" title="Back to top">&uarr;</button>
<script>{JS}</script>
</body>
</html>
"""

open(OUT, "w", encoding="utf-8").write(doc)
print("WROTE", os.path.abspath(OUT))
try:
    webbrowser.open("file:///" + os.path.abspath(OUT).replace("\\", "/"))
except Exception:
    pass
