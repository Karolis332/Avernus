"""Generate DM outline maps (SVG) for Session 11: Menagerie overview, Vault + Killing Floor, Stygian Dock."""
import math, os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "art", "outlines")
PAPER, INK, ROOM, RED = "#f1e6c8", "#3b2a1a", "#e2cfa2", "#7a1f12"
WATER, IRON = "#1c1d22", "#55555c"
FONT = "Georgia, 'Times New Roman', serif"


class Svg:
    def __init__(self, w, h, title):
        self.w, self.h, self.parts = w, h, []
        self.add(f'<rect width="{w}" height="{h}" fill="{PAPER}"/>')
        self.title = title

    def add(self, s):
        self.parts.append(s)

    def grid(self, step, x0=0, y0=0, x1=None, y1=None, color="rgba(90,60,30,0.16)"):
        x1, y1 = x1 or self.w, y1 or self.h
        for x in range(x0, x1 + 1, step):
            self.add(f'<line x1="{x}" y1="{y0}" x2="{x}" y2="{y1}" stroke="{color}" stroke-width="1"/>')
        for y in range(y0, y1 + 1, step):
            self.add(f'<line x1="{x0}" y1="{y}" x2="{x1}" y2="{y}" stroke="{color}" stroke-width="1"/>')

    def rect(self, x, y, w, h, fill=ROOM, stroke=INK, sw=5, rx=0, extra=""):
        self.add(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')

    def circle(self, cx, cy, r, fill=ROOM, stroke=INK, sw=5, extra=""):
        self.add(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" {extra}/>')

    def line(self, x1, y1, x2, y2, stroke=INK, sw=3, dash=""):
        d = f'stroke-dasharray="{dash}"' if dash else ""
        self.add(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" {d} stroke-linecap="round"/>')

    def text(self, x, y, s, size=18, fill=INK, anchor="middle", weight="normal", italic=False):
        st = ' font-style="italic"' if italic else ""
        self.add(f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}"{st}>{s}</text>')

    def key(self, x, y, n):
        self.circle(x, y, 15, fill=RED, stroke=PAPER, sw=2)
        self.text(x, y + 6, str(n), size=17, fill="#fff", weight="bold")

    def door(self, x, y, vertical=False, w=40):
        if vertical:
            self.add(f'<rect x="{x - 5}" y="{y - w / 2}" width="10" height="{w}" fill="{PAPER}" stroke="{INK}" stroke-width="2"/>')
        else:
            self.add(f'<rect x="{x - w / 2}" y="{y - 5}" width="{w}" height="10" fill="{PAPER}" stroke="{INK}" stroke-width="2"/>')

    def grate(self, x, y, w, h):
        self.rect(x, y, w, h, fill="#5a4a3a", sw=2)
        for i in range(1, int(w // 8)):
            self.line(x + i * 8, y + 2, x + i * 8, y + h - 2, stroke="#c9b48a", sw=1.5)

    def chains(self, x1, y1, x2, y2, n=8):
        pts = []
        for i in range(n + 1):
            t = i / n
            off = 6 if i % 2 else -6
            dx, dy = x2 - x1, y2 - y1
            ln = math.hypot(dx, dy) or 1
            pts.append(f"{x1 + dx * t - dy / ln * off:.1f},{y1 + dy * t + dx / ln * off:.1f}")
        self.add(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#6b6b70" stroke-width="2.5"/>')

    def legend(self, x, y, w, rows, title="Key"):
        h = 46 + 26 * len(rows)
        self.rect(x, y, w, h, fill="#f7efd9", sw=2, rx=6)
        self.text(x + 14, y + 30, title, size=20, anchor="start", weight="bold")
        for i, (n, label) in enumerate(rows):
            yy = y + 58 + 26 * i
            if n is not None:
                self.key(x + 26, yy - 6, n)
            self.text(x + 50, yy, label, size=16, anchor="start")

    def frame(self, subtitle):
        self.rect(6, 6, self.w - 12, self.h - 12, fill="none", sw=4)
        self.text(24, 44, self.title, size=28, anchor="start", weight="bold")
        self.text(24, 70, subtitle, size=16, anchor="start", italic=True)

    def save(self, name):
        os.makedirs(OUT, exist_ok=True)
        body = "\n".join(self.parts)
        svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}">\n{body}\n</svg>\n'
        open(f"{OUT}/{name}", "w", encoding="utf-8", newline="\n").write(svg)
        print("wrote", name, len(svg), "bytes")


def menagerie():
    s = Svg(1200, 980, "The Scabrous Menagerie")
    s.grid(30)
    # road and Feonor's rock
    s.line(600, 980, 600, 812, stroke="#8a6d45", sw=26)
    s.text(600, 905, "road from the Grave", size=15, italic=True)
    s.circle(360, 850, 26, fill="#b9a27a", sw=3)
    s.text(360, 898, "Feonor's rock", size=15, italic=True)
    # Killing Floor (north)
    s.circle(600, 168, 92, fill="#c9a77a")
    s.circle(600, 168, 62, fill="#a7835a", sw=3)
    for a in range(0, 360, 60):
        r = math.radians(a)
        s.rect(600 + 92 * math.cos(r) - 9, 168 + 92 * math.sin(r) - 9, 18, 18, fill="#5a4a3a", sw=2)
    # Pens ring
    s.rect(180, 250, 840, 400, fill=ROOM)
    s.rect(410, 360, 380, 190, fill="#d6c08f")
    for x in range(200, 1000, 40):
        s.rect(x, 262, 32, 34, fill="#cdb98c", sw=2)
        s.rect(x, 604, 32, 34, fill="#cdb98c", sw=2) if not 560 <= x <= 640 else None
    for y in range(310, 600, 40):
        s.rect(192, y, 34, 32, fill="#cdb98c", sw=2)
    s.add(f'<rect x="250" y="320" width="700" height="270" fill="none" stroke="{RED}" stroke-width="2.5" stroke-dasharray="10 8"/>')
    # Trophy Vault (core)
    s.text(600, 445, "TROPHY VAULT", size=20, weight="bold")
    s.text(600, 470, "glass cabinets, brass plates", size=14, italic=True)
    s.door(600, 550, w=46)
    # Killing Floor link
    s.rect(575, 255, 50, 10, fill=PAPER, sw=0)
    s.line(600, 260, 600, 236, sw=24, stroke=ROOM)
    # Estate-Beast Wing (east)
    s.rect(1020, 340, 120, 220, fill=ROOM)
    for i, nm in enumerate(["Ash", "Gorse", "Thistle"]):
        s.rect(1035, 352 + i * 68, 90, 58, fill="#cdb98c", sw=2)
        s.text(1080, 388 + i * 68, nm, size=15, italic=True)
    s.door(1020, 450, vertical=True, w=44)
    # Feeding Chutes and Feonor's cage
    s.grate(300, 430, 48, 48)
    s.grate(860, 530, 48, 48)
    s.circle(324, 454, 13, fill="none", stroke=RED, sw=3)
    # Singing Aisle
    s.rect(560, 650, 80, 165, fill=ROOM)
    for y in range(660, 810, 30):
        s.rect(520, y, 34, 24, fill="#cdb98c", sw=2)
        s.rect(646, y, 34, 24, fill="#cdb98c", sw=2)
    s.door(600, 812, w=60)
    # keys
    for n, (x, y) in enumerate([(600, 860), (690, 735), (230, 300), (1080, 320), (600, 410), (276, 420), (600, 70 + 30), (360, 812)], 1):
        s.key(x, y, n)
    s.legend(760, 690, 420, [
        (1, "The Gate"),
        (2, "The Singing Aisle (DC 14 Wisdom save)"),
        (3, "The Pens (dashed red: handlers' round)"),
        (4, "Estate-Beast Wing: Ash, Gorse, Thistle"),
        (5, "Trophy Vault: Urexiel, the staff, the box"),
        (6, "Feeding Chutes (Feonor's cage, day 14+)"),
        (7, "The Killing Floor: arena pit, 6 drop-gates"),
        (8, "Feonor waits here (before day 14)"),
    ])
    s.frame("DM outline. Not to scale: 1 square is about 10 ft.")
    s.save("menagerie-outline.svg")


def vault():
    sq = 40
    s = Svg(1240, 840, "Trophy Vault and Killing Floor")
    s.grid(sq, 0, 80, 1240, 840)
    ox, oy = 40, 120
    # vault: 13 x 11 squares
    s.rect(ox, oy, 13 * sq, 11 * sq, fill=ROOM, sw=6)
    for i in range(1, 12):
        s.rect(ox + i * sq, oy + 8, 30, 26, fill="#c8d6d6", sw=2)
    for i in range(1, 10):
        s.rect(ox + 8, oy + i * sq, 26, 30, fill="#c8d6d6", sw=2)
    for wx in range(ox + 60, ox + 13 * sq - 40, 110):
        s.chains(wx, oy + 11 * sq - 4, wx + 50, oy + 11 * sq - 30, n=6)
    s.rect(ox + 5 * sq, oy + 1.2 * sq, 3 * sq, 30, fill="#8a5a3a", sw=2)
    s.text(ox + 6.5 * sq, oy + 1.2 * sq + 21, "STAFF", size=14, fill="#fff", weight="bold")
    s.circle(ox + 11 * sq, oy + 5.5 * sq, 18, fill="#cfe8c4", sw=3)
    s.text(ox + 11 * sq, oy + 5.5 * sq + 5, "R", size=16, weight="bold")
    s.rect(ox + 6 * sq, oy + 5 * sq, sq, sq, fill="#2a2a2f", sw=3)
    s.text(ox + 6.5 * sq, oy + 5.5 * sq + 6, "B", size=18, fill="#e9d9a8", weight="bold")
    s.rect(ox + 3 * sq, oy + 7 * sq, 2 * sq, sq, fill="#a07a4a", sw=2)
    s.text(ox + 4 * sq, oy + 7.5 * sq + 6, "desk", size=14, fill="#fff")
    s.circle(ox + 4 * sq, oy + 8.5 * sq, 16, fill=RED, stroke=PAPER, sw=2)
    s.text(ox + 4 * sq, oy + 8.5 * sq + 6, "U", size=16, fill="#fff", weight="bold")
    s.door(ox, oy + 5.5 * sq, vertical=True, w=sq)
    s.text(ox + 18, oy + 11 * sq + 34, "to the Pens", size=15, italic=True, anchor="start")
    # corridor to Killing Floor
    cx0 = ox + 13 * sq
    s.rect(cx0, oy + 4.5 * sq, 4 * sq, 2 * sq, fill=ROOM, sw=5)
    s.door(cx0, oy + 5.5 * sq, vertical=True, w=sq)
    s.grate(cx0 + 1 * sq, oy + 4.5 * sq + 4, 2 * sq, 2 * sq - 8)
    # Killing Floor: radius 6 squares
    kx, ky, kr = cx0 + 4 * sq + 6 * sq, oy + 5.5 * sq, 6 * sq
    s.circle(kx, ky, kr, fill="#c9a77a", sw=6)
    s.circle(kx, ky, kr - 50, fill="none", stroke="#8a6d45", sw=2, extra='stroke-dasharray="6 6"')
    for k, a in enumerate(range(30, 360, 60)):
        r = math.radians(a)
        gx, gy = kx + kr * math.cos(r), ky + kr * math.sin(r)
        s.rect(gx - 16, gy - 16, 32, 32, fill="#5a4a3a", sw=2)
        s.text(gx, gy + 6, "G", size=15, fill="#fff", weight="bold")
    s.text(kx, ky + 6, "THE KILLING FLOOR", size=20, weight="bold")
    s.text(kx, ky + 30, "sand pit, 10 ft down", size=14, italic=True)
    s.legend(40, 600, 560, [
        ("U", "Urexiel's start, at her desk (the ledger is at her hip)") if False else (None, "U  Urexiel's start, at her desk; the ledger hangs at her hip"),
        (None, "STAFF  Cinderbloom on velvet, behind glass"),
        (None, "R  The Green Remnant under its bell jar"),
        (None, "B  Kreeg's box on its stand (Trophy Light)"),
        (None, "Blue cases: cabinets. Grey zigzags: animated chains"),
        (None, "Grate: Feeding Chute (DC 15 Dex). G: drop-gates (Open a Pen)"),
    ], title="Key  (1 square = 5 ft)")
    s.frame("DM outline for the Urexiel fight. She falls back to the Killing Floor below half hit points.")
    s.save("vault-outline.svg")


def dock():
    sq = 40
    s = Svg(1240, 840, "The Stygian Dock")
    s.rect(0, 80, 1240, 760, fill=WATER, sw=0)
    for y in range(110, 840, 34):
        for x in range(380 + (y % 68), 1240, 140):
            s.add(f'<path d="M{x} {y} q 14 -8 28 0 t 28 0" fill="none" stroke="#3a3c46" stroke-width="2"/>')
    s.add(f'<path d="M0 80 L360 80 L372 200 L350 340 L380 520 L356 700 L370 840 L0 840 Z" fill="#b39a74" stroke="{INK}" stroke-width="4"/>')
    s.grid(sq, 0, 80, 1240, 840, color="rgba(240,230,200,0.10)")
    # tollhouse
    s.rect(60, 300, 240, 260, fill=ROOM, sw=6)
    for i in range(5):
        s.rect(78 + i * 42, 316, 34, 22, fill="#8a6a44", sw=2)
    s.rect(130, 400, 90, 46, fill="#a07a4a", sw=2)
    s.text(175, 429, "desk", size=14, fill="#fff")
    s.circle(175, 470, 16, fill=RED, stroke=PAPER, sw=2)
    s.text(175, 476, "K", size=16, fill="#fff", weight="bold")
    s.rect(84, 500, 36, 36, fill="#5a4a3a", sw=2)
    s.text(102, 524, "T", size=15, fill="#fff", weight="bold")
    s.door(300, 430, vertical=True, w=40)
    s.circle(324, 404, 10, fill="#c9a24a", stroke=INK, sw=2)
    # wharf
    s.rect(300, 400, 720, 80, fill=IRON, stroke="#2a2a2e", sw=4)
    s.rect(1000, 240, 80, 400, fill=IRON, stroke="#2a2a2e", sw=4)
    for x in range(330, 1000, 60):
        s.circle(x, 404, 6, fill="#2a2a2e", stroke="#aaa", sw=1.5)
        s.circle(x, 476, 6, fill="#2a2a2e", stroke="#aaa", sw=1.5)
    # barges
    for (x, y, w, h, n) in [(440, 250, 260, 110, 1), (740, 240, 220, 120, 2), (500, 530, 360, 120, 3)]:
        s.rect(x, y, w, h, fill="#4a3826", stroke="#a08560", sw=3, rx=50)
        for k in range(4):
            s.rect(x + 50 + k * (w - 100) / 4, y + h / 2 - 14, 28, 28, fill="#7a6040", sw=1.5)
        s.text(x + w / 2, y + h / 2 + 52 if y > 400 else y - 12, f"barge {n}", size=15, fill="#e9d9a8", italic=True)
    for (x1, y1, x2, y2) in [(560, 360, 560, 400), (850, 360, 850, 400), (680, 480, 680, 530)]:
        s.line(x1, y1, x2, y2, stroke="#c9b48a", sw=10)
        for t in range(3):
            s.circle(x1 + 8, y1 + 8 + t * 12 if y2 > y1 else y1 - t * 12, 4, fill="#d9a0a0", stroke="none", sw=0)
    for (x, y, lbl) in [(560, 440, "D"), (850, 440, "D"), (680, 440, "D")]:
        s.circle(x + 30, y, 15, fill="#a3271b", stroke=PAPER, sw=2)
        s.text(x + 30, y + 6, lbl, size=15, fill="#fff", weight="bold")
    s.text(700, 140, "THE RIVER STYX", size=26, fill="#e9d9a8", weight="bold")
    s.text(700, 166, "anything in the water: feeblemind, DC 20", size=15, fill="#e9d9a8", italic=True)
    s.legend(820, 660, 400, [
        (None, "K  Kreeg at his desk. Ledgers line the walls"),
        (None, "T  Trapdoor to the ledger room (Escape Clause)"),
        (None, "Gold dot: the Ashen Garden's gate bell"),
        (None, "D  Barbed devil guards; pink dots: lemure lines"),
        (None, "Black posts: mooring chains (Barge Chains)"),
    ], title="Key  (1 square = 5 ft)")
    s.frame("DM outline. Lair action The Styx Rises hits any 20-ft stretch of the wharf edge.")
    s.save("dock-outline.svg")


menagerie()
vault()
dock()
