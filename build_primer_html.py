#!/usr/bin/env python3
"""Convert a campaign primer .md into a styled, navigable HTML handout.
Deep TOC + scroll-spy + quick-jump bar + styled callouts + generous spacing."""
import sys, html, webbrowser, os
import markdown

SRC = sys.argv[1] if len(sys.argv) > 1 else "session-6-bels-forge-primer.md"
OUT = SRC.rsplit(".", 1)[0] + ".html"

raw = open(SRC, encoding="utf-8").read()

# First H1 = page title; the rest is the body.
lines = raw.split("\n")
title, body_start = "Session Primer", 0
for i, ln in enumerate(lines):
    if ln.startswith("# "):
        title = ln[2:].split("{")[0].strip()
        body_start = i + 1
        break
body_md = "\n".join(lines[body_start:])

md = markdown.Markdown(
    extensions=["extra", "toc", "admonition", "sane_lists"],
    extension_configs={"toc": {"toc_depth": "1-3", "permalink": False}},
)
body_html = md.convert(body_md)
toc_html = md.toc

# Read-aloud styling for plain blockquotes.
body_html = body_html.replace("<blockquote>", '<blockquote class="read">')

page_title = html.escape(title)

# Quick-jump landmarks (stable ids set in the source).
if "bels-forge" in os.path.basename(SRC):
    JUMPS = [
        ("Top", "#top"), ("How to Run", "#run-order"), ("Recap", "#where-we-are"),
        ("Part A", "#part-a"), ("The Ambush", "#ambush"),
        ("Part B", "#part-b"), ("Bel", "#statblock-bel"), ("Reference", "#reference"),
    ]
else:
    JUMPS = [("Top", "#top")]
jump_bar = "".join(f'<a href="{href}">{html.escape(label)}</a>' for label, href in JUMPS)

CSS = r"""
:root{
  --bg:#0d0a0a; --surface:#181311; --surface2:#221a18; --surface3:#2c211d;
  --border:#3a2c28; --border2:#4a3832;
  --ink:#ece0d2; --muted:#a4948440; --muted2:#a49484; --accent:#d4af6a;
  --silver:#b8c8d8; --blood:#a02424; --bone:#d8c6a4; --hell:#e0631f;
  --good:#6bbf6b; --warn:#e6ab44; --crit:#e05050; --celest:#aeb8e0; --homebrew:#b07fd0;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);
  font-family:'Inter','Segoe UI',system-ui,sans-serif;line-height:1.72;font-size:15.5px;
  -webkit-font-smoothing:antialiased}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}

/* ---- layout ---- */
.layout{display:grid;grid-template-columns:300px minmax(0,1fr)}
nav.sidebar{position:sticky;top:0;height:100vh;overflow-y:auto;background:var(--surface);
  border-right:1px solid var(--border);padding:24px 14px 60px}
nav .brand{font-family:'Cinzel','Georgia',serif;font-size:16px;color:var(--accent);
  margin:0 0 4px;letter-spacing:.5px;line-height:1.35}
nav .sub{color:var(--muted2);font-size:11px;margin-bottom:16px;font-style:italic;
  padding-bottom:14px;border-bottom:1px solid var(--border)}
nav .toctitle{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted2);
  margin:6px 8px 8px}
nav .toc ul{list-style:none;padding-left:0;margin:0}
nav .toc>ul>li{margin:1px 0}
nav .toc a{display:block;padding:5px 10px;border-radius:5px;color:var(--ink);font-size:13px;
  border-left:2px solid transparent;line-height:1.4}
nav .toc a:hover{background:var(--surface2);text-decoration:none}
nav .toc a.active{background:var(--surface3);border-left-color:var(--accent);color:var(--accent);font-weight:600}
nav .toc ul ul a{font-size:12px;color:var(--muted2);padding-left:22px}
nav .toc ul ul ul a{font-size:11.5px;padding-left:34px;opacity:.85}
/* h1 PART headers in the toc: bold accent */
nav .toc>ul>li>a{font-family:'Cinzel',serif;font-size:12px;letter-spacing:.5px;
  text-transform:uppercase;color:var(--hell);margin-top:10px}

main{min-width:0}
.wrap{max-width:920px;padding:0 48px 120px}

/* ---- sticky title + quick-jump ---- */
header.title{position:sticky;top:0;z-index:30;background:var(--bg);
  padding:22px 48px 0;border-bottom:1px solid var(--border)}
header.title h1{font-family:'Cinzel','Georgia',serif;font-size:30px;color:var(--accent);
  margin:0 0 12px;letter-spacing:1.5px;line-height:1.2}
.jumpbar{display:flex;flex-wrap:wrap;gap:6px;padding-bottom:12px}
.jumpbar a{font-size:12px;padding:5px 12px;border-radius:20px;background:var(--surface);
  border:1px solid var(--border2);color:var(--bone);white-space:nowrap}
.jumpbar a:hover{background:var(--accent);color:#1a1208;border-color:var(--accent);text-decoration:none}

/* ---- headings: strong vertical rhythm ---- */
h1,h2,h3,h4{scroll-margin-top:140px}
.wrap>h1{font-family:'Cinzel',serif;font-size:25px;color:#fff;letter-spacing:2px;text-transform:uppercase;
  margin:64px 0 22px;padding:16px 20px;background:linear-gradient(100deg,var(--blood),#3a1010);
  border-radius:8px;box-shadow:0 4px 18px rgba(0,0,0,.45)}
h2{font-family:'Cinzel',serif;font-size:22px;color:var(--accent);
  margin:48px 0 16px;padding-bottom:9px;border-bottom:1px solid var(--border2);letter-spacing:.5px}
h3{font-family:'Cinzel',serif;font-size:17px;color:var(--bone);margin:30px 0 10px}
h4{font-size:12px;color:var(--hell);margin:22px 0 8px;text-transform:uppercase;letter-spacing:1.5px;
  font-weight:700}
p{margin:13px 0}
strong{color:var(--bone);font-weight:600}
hr{border:none;height:1px;background:linear-gradient(90deg,transparent,var(--border2),transparent);
  margin:40px 0}
ul,ol{margin:13px 0;padding-left:26px}
li{margin:7px 0}
li::marker{color:var(--accent)}
/* task checkboxes */
li input[type=checkbox]{margin-right:8px;accent-color:var(--accent);width:15px;height:15px;vertical-align:-2px}

code{background:var(--surface2);border:1px solid var(--border);border-radius:4px;
  padding:1.5px 6px;font-family:'JetBrains Mono','Consolas',monospace;font-size:12.5px;color:var(--celest)}
pre{background:#0a0707;border:1px solid var(--border);border-left:3px solid var(--accent);
  border-radius:6px;padding:16px 18px;overflow-x:auto;margin:18px 0;line-height:1.5}
pre code{background:none;border:none;padding:0;color:var(--bone);font-size:12.5px;white-space:pre}

/* ---- read-aloud ---- */
blockquote.read{background:var(--surface);border-left:4px solid var(--accent);padding:16px 22px;
  margin:20px 0;font-style:italic;color:var(--bone);border-radius:0 8px 8px 0;line-height:1.7}
blockquote.read em{color:var(--accent);font-style:normal;font-weight:600}
blockquote.read strong{color:var(--hell)}
blockquote.read p:first-child{margin-top:0}
blockquote.read p:last-child{margin-bottom:0}

/* ---- admonition callouts ---- */
.admonition{margin:22px 0;padding:0 0 14px;border:1px solid var(--border2);border-radius:8px;
  background:var(--surface);overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.25)}
.admonition>.admonition-title{font-family:'Cinzel',serif;font-size:12px;letter-spacing:1.5px;
  text-transform:uppercase;padding:10px 18px;margin:0;background:var(--surface2);
  border-bottom:1px solid var(--border);color:var(--accent);font-weight:700}
.admonition>*:not(.admonition-title){padding-left:18px;padding-right:18px}
.admonition p:first-of-type{margin-top:12px}
.admonition p:last-child{margin-bottom:0}
.admonition ul{margin:10px 0}
.admonition.howto{border-color:var(--celest)}
.admonition.howto>.admonition-title{color:var(--celest);background:#1a1d2a}
.admonition.run>.admonition-title{color:var(--accent)}
.admonition.mechanics{border-color:var(--good)}
.admonition.mechanics>.admonition-title{color:var(--good);background:#13201380}
.admonition.mechanics>.admonition-title:before{content:"🎲 "}
.admonition.dial{border-color:var(--warn)}
.admonition.dial>.admonition-title{color:var(--warn);background:#2a200f}
.admonition.dial>.admonition-title:before{content:"🎲 "}
.admonition.homebrew{border-color:var(--homebrew)}
.admonition.homebrew>.admonition-title{color:var(--homebrew);background:#20162a}
.admonition.danger{border-color:var(--crit)}
.admonition.danger>.admonition-title{color:var(--crit);background:#2a1313}
.admonition.danger>.admonition-title:before{content:"⚠ "}

/* ---- tables ---- */
table{width:100%;border-collapse:separate;border-spacing:0;margin:20px 0;background:var(--surface);
  border:1px solid var(--border2);border-radius:8px;overflow:hidden;font-size:13.5px}
th{background:var(--surface2);color:var(--accent);font-family:'Cinzel',serif;text-align:left;
  padding:11px 13px;font-size:11.5px;text-transform:uppercase;letter-spacing:.6px;
  border-bottom:2px solid var(--border2)}
td{padding:10px 13px;border-bottom:1px solid var(--border);vertical-align:top}
tr:last-child td{border-bottom:none}
tbody tr:hover td{background:var(--surface2)}
table code{font-size:11.5px}

/* ---- 5e adventure stat block ---- */
.statblock{
  --sb-maroon:#7a200d; --sb-rule:#922610; --sb-ink:#2a1c0e; --sb-sub:#5c4326;
  position:relative;background:#fdf1dc;
  background-image:radial-gradient(ellipse at 50% 0,#fdf6e6,#f1e2c2);
  color:var(--sb-ink);border:1px solid #d9c39a;border-radius:6px;
  box-shadow:0 0 0 2px #c9a96f inset,0 6px 22px rgba(0,0,0,.55);
  padding:18px 22px;margin:18px 0 30px;font-size:13.5px;line-height:1.55;
  break-inside:avoid}
.statblock::before,.statblock::after{content:"";position:absolute;left:0;right:0;height:5px;
  background:linear-gradient(90deg,#7a200d,#c9442a,#7a200d)}
.statblock::before{top:0;border-radius:6px 6px 0 0}
.statblock::after{bottom:0;border-radius:0 0 6px 6px}
.statblock .sb-name{font-family:'Cinzel',serif;color:var(--sb-maroon);font-size:23px;
  font-weight:700;letter-spacing:.5px;line-height:1.12;margin:2px 0 0}
.statblock .sb-type{font-style:italic;color:var(--sb-sub);font-size:12.5px;margin:2px 0 8px}
.statblock .sb-rule{height:5px;border:0;margin:9px 0;background:var(--sb-rule);
  clip-path:polygon(0 50%,7px 0,calc(100% - 7px) 0,100% 50%,calc(100% - 7px) 100%,7px 100%)}
.statblock .sb-line{margin:2px 0;color:#3a1a0c}
.statblock .sb-attr{color:var(--sb-maroon);font-weight:700}
.statblock .sb-abilities{display:grid;grid-template-columns:repeat(6,1fr);text-align:center;margin:7px 0}
.statblock .sb-abilities .ab{font-family:'Cinzel',serif;color:var(--sb-maroon);font-weight:700;
  font-size:11.5px;letter-spacing:.5px}
.statblock .sb-abilities .sc{color:#3a1a0c;font-size:13px}
.statblock .sb-section{font-family:'Cinzel',serif;color:var(--sb-maroon);font-size:15.5px;font-weight:700;
  letter-spacing:.5px;margin:14px 0 5px;padding-bottom:3px;border-bottom:2px solid var(--sb-rule)}
.statblock .sb-entry{margin:5px 0;color:#241a0e}
.statblock strong,.statblock .sb-entry strong{color:#3a1a0c;font-weight:700}
.statblock .sb-entry .sb-attr,.statblock .sb-line .sb-attr{color:var(--sb-maroon)}
.statblock em{color:#6a3a1a;font-style:italic}
.statblock a{color:var(--sb-maroon);text-decoration:underline}
.statblock .sb-tag{display:inline-block;font-family:'Cinzel',serif;font-size:9.5px;letter-spacing:1px;
  text-transform:uppercase;color:#fdf1dc;background:var(--sb-maroon);padding:2px 9px;border-radius:10px;
  vertical-align:middle;margin-left:8px;font-weight:700}
.statblock .sb-phase{background:#fbe6d0;border-left:3px solid var(--sb-maroon);padding:6px 12px;
  margin:7px 0;border-radius:0 4px 4px 0}

/* ---- back to top ---- */
#totop{position:fixed;right:26px;bottom:26px;z-index:40;width:46px;height:46px;border-radius:50%;
  background:var(--surface2);border:1px solid var(--border2);color:var(--accent);font-size:20px;
  cursor:pointer;display:none;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(0,0,0,.5)}
#totop:hover{background:var(--accent);color:#1a1208}
#totop.show{display:flex}

/* ---- responsive ---- */
@media (max-width:980px){
  .layout{grid-template-columns:1fr}
  nav.sidebar{display:none}
  .wrap,header.title{padding-left:18px;padding-right:18px}
}
@media print{
  .layout{grid-template-columns:1fr}
  nav.sidebar,.jumpbar,#totop{display:none}
  html,body{background:#fff;color:#1a1410;font-size:11pt}
  header.title{position:static;border:none;padding:0}
  header.title h1{color:#7a1010}
  .wrap{max-width:none;padding:0}
  .wrap>h1{background:#7a1010;color:#fff;box-shadow:none}
  h2,h3{color:#3a2018}h4{color:#7a1010}
  blockquote.read{background:#f4ecdc;color:#1a1410}
  .admonition{background:#f7f2e9;border-color:#bbb}
  .admonition>.admonition-title{background:#eadfc9;color:#3a2018}
  table{background:#fff}th{background:#eadfc9;color:#3a2018}
  pre{background:#f2ede2;color:#1a1410}code{background:#eee;color:#3a2018}
  a{color:#1a1410}
  .statblock{background:#fff;box-shadow:none;border:1px solid #999}
  .statblock .sb-name,.statblock .sb-attr,.statblock .sb-section,
  .statblock .sb-abilities .ab{color:#7a200d}
  .statblock::before,.statblock::after{background:#922610}
  .statblock a{color:#7a200d}
}
"""

JS = r"""
// back-to-top
var bt=document.getElementById('totop');
addEventListener('scroll',function(){bt.classList.toggle('show',scrollY>500)});
bt.onclick=function(){scrollTo({top:0,behavior:'smooth'})};
// scroll-spy: highlight the TOC link for the heading currently in view
var links={};document.querySelectorAll('nav .toc a').forEach(function(a){
  var id=a.getAttribute('href');if(id&&id[0]==='#')links[id.slice(1)]=a;});
var heads=[].slice.call(document.querySelectorAll('.wrap h1,.wrap h2,.wrap h3')).filter(function(h){return h.id});
var spy=new IntersectionObserver(function(es){
  es.forEach(function(e){
    if(e.isIntersecting){
      Object.values(links).forEach(function(a){a.classList.remove('active')});
      var a=links[e.target.id];
      if(a){a.classList.add('active');a.scrollIntoView({block:'nearest'});}
    }
  });
},{rootMargin:'-130px 0px -70% 0px',threshold:0});
heads.forEach(function(h){spy.observe(h)});
"""

doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{page_title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<span id="top"></span>
<div class="layout">
  <nav class="sidebar">
    <div class="brand">{page_title}</div>
    <div class="sub">Descent into Avernus — Bloodreina arc</div>
    <div class="toctitle">Contents</div>
    <div class="toc">{toc_html}</div>
  </nav>
  <main>
    <header class="title">
      <h1>{page_title}</h1>
      <div class="jumpbar">{jump_bar}</div>
    </header>
    <div class="wrap">
      {body_html}
    </div>
  </main>
</div>
<button id="totop" title="Back to top">↑</button>
<script>{JS}</script>
</body>
</html>
"""

open(OUT, "w", encoding="utf-8").write(doc)
print("WROTE", os.path.abspath(OUT))
webbrowser.open("file:///" + os.path.abspath(OUT).replace("\\", "/"))
