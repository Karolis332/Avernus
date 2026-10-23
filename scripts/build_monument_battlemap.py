"""Build the Session 9 battlemap: the ground before the maw of the Monument to Tiamat.

40 x 30 squares at 5 ft/square (200 ft x 150 ft), 40 px/square -> 1600 x 1200.

The skull is colossal: only its open maw fits on the map, as a ring of teeth down
the left edge, each tooth taller than a man. Canon (BGDIA ch. 3) has Arkhan's
followers living in chambers inside the skull, so the whole skull can never fit on
a battlemap -- this shows the ground in front of it, where the fight happens.

Layout, left to right:
  the throat (black)  |  soot-slick maw floor + prayer tent  |  TEETH  |
  open ground: Arkhan's tent, bone throne, Devil's Ride  |
  the spine-and-rib maze with three braziers  |  rocky rise to the ridge

Output: maps/monument-battlemap.webp (+ .png)
"""

import math
import os
import random
from PIL import Image, ImageDraw, ImageFilter, ImageChops

SQ = 40                      # px per 5 ft square
W, H = 40 * SQ, 30 * SQ      # 1600 x 1200
FT = SQ / 5.0                # px per foot

# --- palette ---------------------------------------------------------------
GROUND_DK = (48, 23, 19)
GROUND_LT = (108, 50, 34)
STICKY = (28, 11, 13)
BONE_SH = (86, 74, 58)
BONE_MD = (150, 134, 106)
BONE_LT = (198, 184, 152)
BONE_HI = (226, 215, 188)
THROAT = (6, 4, 5)
FLOOR = (78, 68, 62)
HIDE = (34, 29, 31)
HIDE_LT = (62, 55, 58)
IRON = (46, 43, 48)
GOLD = (186, 148, 66)

MAW_CX, MAW_CY = -230.0, 600.0   # arc centre, off-map left
TOOTH_R = 600.0                  # radius at the tooth roots
FLOOR_R = 300.0                  # inside this: throat

rnd = random.Random(20261011)


# --- helpers ---------------------------------------------------------------
def noise(w, h, octaves=((8, 1.0), (28, 0.55), (110, 0.3))):
    acc = Image.new("L", (w, h), 0)
    for size, amp in octaves:
        small = Image.new("L", (max(2, w // size), max(2, h // size)))
        small.putdata([rnd.randrange(256) for _ in range(small.width * small.height)])
        acc = ImageChops.add(
            acc, small.resize((w, h), Image.BICUBIC).point(lambda v, a=amp: int(v * a)))
    return acc.filter(ImageFilter.GaussianBlur(2.0))


def lerp_img(c1, c2, mask):
    return Image.composite(Image.new("RGB", mask.size, c2),
                           Image.new("RGB", mask.size, c1), mask)


def mix(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def taper_bone(d, pts, w0, w1, lit=True):
    """A bone that tapers along its length, shaded dark-to-light."""
    n = len(pts) - 1
    for i in range(n):
        t = i / max(1, n - 1)
        w = w0 + (w1 - w0) * t
        a, b = pts[i], pts[i + 1]
        d.line([a, b], fill=(12, 9, 9), width=int(w + 5))
    for i in range(n):
        t = i / max(1, n - 1)
        w = w0 + (w1 - w0) * t
        a, b = pts[i], pts[i + 1]
        d.line([a, b], fill=BONE_SH, width=int(w + 2))
        d.line([a, b], fill=mix(BONE_MD, BONE_LT, t * 0.5), width=int(w))
        if lit and w > 6:
            d.line([(a[0], a[1] - w * 0.26), (b[0], b[1] - w * 0.26)],
                   fill=BONE_LT, width=max(1, int(w * 0.3)))
    for (cx, cy), w in ((pts[0], w0), (pts[-1], w1)):
        r = w / 2 + 1
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BONE_MD, outline=(12, 9, 9))


# --- 1. ground -------------------------------------------------------------
img = lerp_img(GROUND_DK, GROUND_LT, noise(W, H))
d = ImageDraw.Draw(img, "RGBA")

for _ in range(110):                                   # sticky dark patches
    x, y = rnd.randrange(W), rnd.randrange(H)
    rx, ry = rnd.randint(20, 100), rnd.randint(14, 66)
    d.ellipse([x - rx, y - ry, x + rx, y + ry], fill=STICKY + (rnd.randint(30, 90),))

for _ in range(150):                                   # cracks
    x, y = rnd.randrange(W), rnd.randrange(H)
    pts, a = [(x, y)], rnd.uniform(0, 6.28)
    for _ in range(rnd.randint(3, 9)):
        a += rnd.uniform(-0.6, 0.6)
        ln = rnd.randint(14, 48)
        x, y = x + math.cos(a) * ln, y + math.sin(a) * ln
        pts.append((x, y))
    d.line(pts, fill=(16, 7, 7, rnd.randint(60, 130)), width=rnd.choice((1, 1, 2)))

for _ in range(500):                                   # bone grit underfoot
    x, y = rnd.uniform(300, W), rnd.uniform(0, H)
    s = rnd.uniform(1.5, 4.5)
    d.ellipse([x - s, y - s * 0.6, x + s, y + s * 0.6],
              fill=mix(BONE_SH, BONE_MD, rnd.random()) + (rnd.randint(90, 170),))

# --- 2. rocky rise along the right edge -----------------------------------
edge = [(1404 + math.sin(t * 7.1) * 48 + math.sin(t * 2.3) * 32, H * t)
        for t in (i / 40 for i in range(41))]
d.polygon([(W, 0)] + edge + [(W, H)], fill=(36, 19, 18))
d.line(edge, fill=(18, 9, 9), width=6)
for _ in range(260):
    t = rnd.random()
    bx = 1404 + math.sin(t * 7.1) * 48 + math.sin(t * 2.3) * 32
    x, y = rnd.uniform(bx + 6, W), H * t + rnd.uniform(-22, 22)
    r, sh = rnd.randint(7, 28), rnd.randint(-16, 20)
    d.polygon([(x + rnd.randint(-r, r), y + rnd.randint(-r, r))
               for _ in range(rnd.randint(4, 6))],
              fill=(48 + sh, 27 + sh // 2, 24 + sh // 2), outline=(18, 9, 9))

# --- 3. the maw ------------------------------------------------------------
for r in range(int(TOOTH_R + 40), int(FLOOR_R), -2):   # maw floor, lit at the lip
    t = (r - FLOOR_R) / (TOOTH_R - FLOOR_R)
    d.pieslice([MAW_CX - r, MAW_CY - r, MAW_CX + r, MAW_CY + r], -90, 90,
               outline=mix(THROAT, FLOOR, min(1.0, t ** 0.7)), width=3)
d.pieslice([MAW_CX - FLOOR_R, MAW_CY - FLOOR_R, MAW_CX + FLOOR_R, MAW_CY + FLOOR_R],
           -90, 90, fill=THROAT)                        # the throat

for _ in range(90):                                     # offerings at the back teeth
    a = math.radians(rnd.uniform(-68, 68))
    r = TOOTH_R - rnd.uniform(60, 190)
    x, y = MAW_CX + r * math.cos(a), MAW_CY + r * math.sin(a)
    s = rnd.randint(2, 7)
    d.ellipse([x - s, y - s, x + s, y + s],
              fill=rnd.choice((GOLD, (150, 150, 162), (126, 94, 62), GOLD)))

# the teeth: 11-15 ft of tooth, unmistakably taller than a man
for i in range(21):
    a_deg = -82 + i * 8.2 + rnd.uniform(-1.4, 1.4)
    a = math.radians(a_deg)
    root = TOOTH_R - rnd.uniform(0, 18)
    tip_r = root + rnd.uniform(90, 126)
    half = math.radians(rnd.uniform(3.1, 4.0))
    ta = a + math.radians(rnd.uniform(-1.0, 1.0))

    def P(r, ang):
        return (MAW_CX + r * math.cos(ang), MAW_CY + r * math.sin(ang))

    b1, b2 = P(root, a - half), P(root, a + half)
    m1, m2 = P(root + (tip_r - root) * 0.5, a - half * 0.5), \
             P(root + (tip_r - root) * 0.5, a + half * 0.5)
    tip = P(tip_r, ta)
    d.polygon([b1, m1, tip, m2, b2], fill=(10, 7, 7))
    d.polygon([b1, m1, tip, m2, b2], fill=BONE_SH)
    d.polygon([b1, m1, tip], fill=BONE_MD)
    d.polygon([(b1[0] * 0.5 + m1[0] * 0.5, b1[1] * 0.5 + m1[1] * 0.5), m1, tip],
              fill=BONE_LT)
    d.line([m1, tip], fill=BONE_HI, width=3)

# upper-jaw shadow across the mouth
sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
ImageDraw.Draw(sh).pieslice(
    [MAW_CX - TOOTH_R - 40, MAW_CY - TOOTH_R - 40,
     MAW_CX + TOOTH_R + 40, MAW_CY + TOOTH_R + 40], -98, 98, fill=(0, 0, 0, 92))
img = Image.alpha_composite(img.convert("RGBA"),
                            sh.filter(ImageFilter.GaussianBlur(40))).convert("RGB")
d = ImageDraw.Draw(img, "RGBA")


# --- 4. tents --------------------------------------------------------------
def hide_tent(cx, cy, w, h):
    """A ridge tent seen from above: two sloped panels, a ridge pole, guy lines."""
    hw, hh = w / 2, h / 2
    for gx, gy in ((-hw - 16, -hh - 12), (hw + 16, -hh - 12),
                   (-hw - 16, hh + 12), (hw + 16, hh + 12)):
        d.line([(cx, cy), (cx + gx, cy + gy)], fill=(74, 66, 60, 150), width=2)
        d.ellipse([cx + gx - 3, cy + gy - 3, cx + gx + 3, cy + gy + 3], fill=(92, 84, 76))
    d.polygon([(cx - hw, cy - hh), (cx, cy - hh * 0.82), (cx, cy + hh * 0.82),
               (cx - hw, cy + hh)], fill=HIDE, outline=(10, 8, 9))
    d.polygon([(cx + hw, cy - hh), (cx, cy - hh * 0.82), (cx, cy + hh * 0.82),
               (cx + hw, cy + hh)], fill=HIDE_LT, outline=(10, 8, 9))
    d.line([(cx, cy - hh * 0.82), (cx, cy + hh * 0.82)], fill=(104, 94, 96), width=3)
    d.polygon([(cx - hw, cy + hh), (cx + hw, cy + hh),
               (cx + hw * 0.72, cy + hh + 14), (cx - hw * 0.72, cy + hh + 14)],
              fill=(14, 12, 13))


hide_tent(344, 600, 52, 74)        # the prayer-tent in the maw: the scale anchor
hide_tent(660, 596, 180, 250)      # Arkhan's black hide tent

# --- 5. bone throne --------------------------------------------------------
tx, ty = 826, 598
d.polygon([(tx - 36, ty + 50), (tx - 30, ty - 34), (tx + 30, ty - 34), (tx + 36, ty + 50)],
          fill=BONE_SH, outline=(12, 9, 9))
d.polygon([(tx - 26, ty + 40), (tx - 22, ty - 26), (tx + 22, ty - 26), (tx + 26, ty + 40)],
          fill=BONE_MD)
for off in (-24, -9, 9, 24):
    taper_bone(d, [(tx + off, ty - 30), (tx + off * 1.45, ty - 84)], 11, 6)
taper_bone(d, [(tx - 40, ty + 46), (tx + 40, ty + 46)], 12, 12)

# --- 6. the Devil's Ride ---------------------------------------------------
rx, ry = 566, 842
d.rounded_rectangle([rx - 54, ry - 16, rx + 54, ry + 16], radius=7, fill=IRON,
                    outline=(10, 10, 12))
d.line([(rx - 40, ry - 6), (rx + 40, ry - 6)], fill=(86, 82, 88), width=2)
for wx in (rx - 48, rx + 48):
    d.ellipse([wx - 23, ry - 23, wx + 23, ry + 23], fill=(18, 18, 20),
              outline=(78, 74, 78), width=3)
    d.ellipse([wx - 7, ry - 7, wx + 7, ry + 7], fill=(66, 62, 66))
for sx in range(-36, 37, 13):
    d.polygon([(rx + sx, ry - 16), (rx + sx + 5, ry - 30), (rx + sx + 10, ry - 16)],
              fill=(104, 100, 104))
d.ellipse([rx + 54, ry - 10, rx + 74, ry + 10], fill=BONE_MD, outline=(12, 9, 9))

# --- 7. the spine-and-rib maze --------------------------------------------
spine = [(1180 + math.sin(i / 3.6) * 46, 70 + i * 44) for i in range(26)]
for i in range(len(spine) - 1):
    taper_bone(d, [spine[i], spine[i + 1]], 30, 30, lit=False)
for i, (x, y) in enumerate(spine):
    d.ellipse([x - 17, y - 15, x + 17, y + 15], fill=BONE_MD, outline=(12, 9, 9))
    d.ellipse([x - 8, y - 7, x + 8, y + 7], fill=BONE_SH)
    taper_bone(d, [(x, y), (x + rnd.uniform(-30, 30), y - 34)], 10, 4)

for i, (sx, sy) in enumerate(spine):          # ribs sweeping left into corridors
    if i % 2 or not 2 <= i <= 23:
        continue
    span = 270 + 120 * math.sin(i / 3.1)
    droop = 160 * math.sin(i / 2.4)
    pts = [(sx, sy)]
    for k in range(1, 15):
        t = k / 14
        pts.append((sx - span * t,
                    sy + droop * t * t + 58 * math.sin(t * 2.4) * (1 if i % 4 else -1)))
    taper_bone(d, pts, 26, 9)

for _ in range(30):                            # loose bones on the maze floor
    x, y = rnd.uniform(880, 1400), rnd.uniform(30, 1170)
    a, ln = rnd.uniform(0, 6.28), rnd.uniform(44, 140)
    taper_bone(d, [(x, y), (x + math.cos(a) * ln, y + math.sin(a) * ln)],
               rnd.randint(9, 15), rnd.randint(6, 10))

# --- 8. braziers + firelight ----------------------------------------------
BRAZIERS = [(1016, 300), (1108, 622), (966, 906)]
gl = Image.new("RGB", (W, H), (0, 0, 0))
gd = ImageDraw.Draw(gl)
for bx, by in BRAZIERS:
    for r, c in ((150, (62, 24, 6)), (96, (104, 42, 10)), (52, (150, 68, 20))):
        gd.ellipse([bx - r, by - r, bx + r, by + r], fill=c)
img = ImageChops.screen(img, gl.filter(ImageFilter.GaussianBlur(52)))
d = ImageDraw.Draw(img, "RGBA")
for bx, by in BRAZIERS:
    for leg in (-16, 0, 16):
        d.line([(bx + leg, by + 20), (bx + leg * 1.6, by + 38)], fill=(26, 22, 22), width=5)
    d.polygon([(bx - 22, by + 22), (bx - 16, by - 8), (bx + 16, by - 8), (bx + 22, by + 22)],
              fill=(44, 38, 36), outline=(12, 9, 9))
    d.ellipse([bx - 18, by - 16, bx + 18, by + 2], fill=(206, 104, 34), outline=(62, 52, 48))
    d.ellipse([bx - 10, by - 12, bx + 10, by - 2], fill=(252, 206, 140))

# --- 9. grid (alpha-composited, not added, so it stays underfoot) ---------
for x in range(0, W + 1, SQ):
    d.line([(x, 0), (x, H)], fill=(255, 128, 56, 46), width=1)
for y in range(0, H + 1, SQ):
    d.line([(0, y), (W, y)], fill=(255, 128, 56, 46), width=1)

# --- 10. vignette ----------------------------------------------------------
vig = Image.new("L", (W, H), 0)
ImageDraw.Draw(vig).ellipse([-W * 0.36, -H * 0.36, W * 1.36, H * 1.36], fill=255)
img = Image.composite(img, Image.new("RGB", (W, H), (0, 0, 0)),
                      vig.filter(ImageFilter.GaussianBlur(210)))

out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "maps")
os.makedirs(out_dir, exist_ok=True)
out = os.path.join(out_dir, "monument-battlemap.webp")
img.save(out, "WEBP", quality=92, method=6)
img.save(out.replace(".webp", ".png"), "PNG")
print(f"wrote {out}  ({W}x{H} = {W // SQ}x{H // SQ} squares @ 5 ft)")
