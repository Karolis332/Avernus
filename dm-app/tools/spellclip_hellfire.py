"""Spell clip for the DM app: Dumal breathes Hellfire of Cania (blue-white cone).

Procedural, no source art: numpy + Pillow draw every frame, ffmpeg encodes.
  python tools/spellclip_hellfire.py                      -> art/generated/dumal-hellfire-of-cania.mp4 (+ poster .webp)
  python tools/spellclip_hellfire.py --sheet 0.6,1.3,2.4  -> contact sheet of those seconds (fast check)
Tune the constants below, re-run the sheet, then render.
"""
import argparse, math, os, subprocess, tempfile
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

FPS, DUR = 30, 6.0
T_BLAST, T_END = 1.15, 3.7          # fire starts / starts dying (seconds)
ASPECT = 16 / 9                     # frame is ASPECT wide, 1.0 tall
HORIZON, FEET_Y = 0.70, 0.86
FIG_X, FIG_H = 0.42, 0.50           # figure's feet x, figure height
MOUTH = (0.188, 0.90)               # figure-local (x right, y up, height = 1)
ALPHA, TILT, RMAX = 0.42, 0.05, 1.6  # cone half-angle, downward tilt (rad), reach
OUT = os.path.join(os.path.dirname(__file__), "..", "art", "generated", "dumal-hellfire-of-cania")


def smooth(a, b, x):
    t = np.clip((x - a) / (b - a), 0, 1)
    return t * t * (3 - 2 * t)


def _hash(ix, iy):
    n = np.sin(ix * 127.1 + iy * 311.7) * 43758.5453
    return n - np.floor(n)


def vnoise(x, y):
    ix, iy = np.floor(x), np.floor(y)
    fx, fy = x - ix, y - iy
    ux, uy = fx * fx * (3 - 2 * fx), fy * fy * (3 - 2 * fy)
    a, b, c, d = _hash(ix, iy), _hash(ix + 1, iy), _hash(ix, iy + 1), _hash(ix + 1, iy + 1)
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy


def fbm(x, y, octaves=5):
    v, amp = 0.0, 0.5
    for _ in range(octaves):
        v = v + amp * vnoise(x, y)
        x, y, amp = x * 2.02 + 17.3, y * 2.03 + 9.1, amp * 0.5
    return v


def power(t):
    return float(smooth(T_BLAST, T_BLAST + 0.12, t) * (1 - smooth(T_END, T_END + 0.9, t)))


def charge(t):
    return float(smooth(0.15, T_BLAST, t)) if t < T_BLAST else 0.0


class Scene:
    def __init__(self, scale=1.0):
        self.H = int(round(720 * scale / 2)) * 2
        self.W = int(round(self.H * ASPECT / 2)) * 2
        H, W = self.H, self.W
        self.Y, self.X = np.mgrid[0:H, 0:W].astype(np.float64) / H
        self.mouth = (FIG_X + MOUTH[0] * FIG_H, FEET_Y - MOUTH[1] * FIG_H)
        dx, dy = self.X - self.mouth[0], self.Y - self.mouth[1]
        self.u = dx * math.cos(TILT) + dy * math.sin(TILT)
        self.v = -dx * math.sin(TILT) + dy * math.cos(TILT)
        self.r = np.hypot(self.u, self.v)
        self.s = np.arctan2(self.v, self.u) / ALPHA
        self.c0 = max(0, int((self.mouth[0] - 0.06) * H))      # fire lives right of here
        self.fy = int(FEET_Y * H)
        self.bg = self._background()
        self.frost_tex = (1 - np.abs(2 * fbm(self.X * 14, self.Y * 70, 4) - 1)) ** 6
        self.rng = np.random.default_rng(7)
        self.sparks = self._spark_table(320)
        self.motes = self._mote_table(80)

    # ---------- static backdrop: Avernus sky, two crag lines, black ice ----------
    def _background(self):
        X, Y = self.X, self.Y
        g = np.clip(Y / HORIZON, 0, 1) ** 2.2
        top, low = np.array([0.035, 0.008, 0.015]), np.array([0.42, 0.085, 0.035])
        sky = top + (low - top) * g[..., None]
        sky = sky * (0.45 + 1.1 * fbm(X * 2.2, Y * 4.5, 4))[..., None]
        sky += (np.exp(-((X - 1.35) / 0.5) ** 2 - ((Y - HORIZON) / 0.12) ** 2) * 0.22)[..., None] * np.array([1.0, 0.35, 0.1])
        col = sky
        x1 = X[0]
        ridged = lambda x: 1 - np.abs(2 * vnoise(x, x * 0 + 0.5) - 1)
        for amp, base, seed, shade in ((0.22, 0.02, 3.0, (0.10, 0.025, 0.03)), (0.11, -0.01, 11.0, (0.045, 0.012, 0.02))):
            h = HORIZON - base - amp * (0.7 * ridged(x1 * 1.9 + seed) + 0.3 * ridged(x1 * 7.3 + seed)) ** 2
            m = smooth(-0.003, 0.003, Y - h[None, :])[..., None]
            col = col * (1 - m) + np.array(shade) * m
        d = np.clip((Y - HORIZON) / (1 - HORIZON), 0, 1)[..., None]
        ice = np.array([0.12, 0.03, 0.03]) * (1 - d) + np.array([0.02, 0.012, 0.022]) * d
        ice = ice * (0.7 + 0.6 * fbm(X * 3, (Y - HORIZON) * 40, 3))[..., None]
        gm = smooth(-0.002, 0.002, Y - HORIZON)[..., None]
        return col * (1 - gm) + ice * gm

    def _spark_table(self, n):
        r = self.rng
        return dict(tb=r.uniform(T_BLAST, T_END + 0.2, n), ang=r.uniform(-0.95, 0.95, n) * ALPHA + TILT,
                    speed=r.uniform(0.7, 1.7, n), life=r.uniform(0.5, 1.2, n), size=r.uniform(1.0, 2.6, n),
                    ph=r.uniform(0, 6.28, n))

    def _mote_table(self, n):
        r = self.rng
        return dict(ts=r.uniform(0.1, 0.8, n), ang=r.uniform(-1.3, 1.3, n), rad=r.uniform(0.12, 0.42, n))

    # ---------- Dumal: silhouette built from parts, cape moves ----------
    def figure(self, t, p):
        ss = 2
        img = Image.new("L", (self.W * ss, self.H * ss), 0)
        d = ImageDraw.Draw(img)
        k = self.H * ss
        P = lambda x, y: ((FIG_X + x * FIG_H) * k, (FEET_Y - y * FIG_H) * k)
        poly = lambda pts: d.polygon([P(*q) for q in pts], fill=255)

        def limb(pts, widths):
            for (a, b), w in zip(zip(pts, pts[1:]), widths):
                d.line([P(*a), P(*b)], fill=255, width=int(w * FIG_H * k))
            for q, w in zip(pts, list(widths) + [widths[-1]]):
                cx, cy = P(*q); rr = w * FIG_H * k / 2
                d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=255)

        def cape_pt(x, y, wgt, ph):
            wave = 0.035 * wgt * math.sin(t * 5.5 - ph) + 0.02 * wgt * math.sin(t * 9.1 - 2 * ph)
            return (x - 0.13 * p * wgt, y + wave + 0.10 * p * wgt)

        poly([(0.03, 0.87), (-0.10, 0.86), cape_pt(-0.26, 0.74, .3, .6), cape_pt(-0.44, 0.58, .6, 1.3),
              cape_pt(-0.60, 0.36, 1, 2.1), cape_pt(-0.50, 0.31, .9, 2.3), cape_pt(-0.55, 0.15, 1, 2.9),
              cape_pt(-0.41, 0.21, .8, 2.6), cape_pt(-0.40, 0.05, .9, 3.3), cape_pt(-0.27, 0.19, .5, 2.4),
              cape_pt(-0.21, 0.07, .5, 3.0), (-0.10, 0.30), (-0.05, 0.50)])
        d.line([P(-0.30, 0.0), P(-0.12, 1.45)], fill=255, width=max(2, int(0.016 * FIG_H * k)))          # lance shaft
        poly([(-0.150, 1.20), (-0.172, 1.27), (-0.112, 1.52), (-0.118, 1.26)])                            # lance blade
        poly([(-0.185, 1.185), (-0.115, 1.20), (-0.118, 1.22), (-0.188, 1.205)])                          # collar
        limb([(0.0, 0.82), (-0.12, 0.72), (-0.213, 0.70)], (0.062, 0.05))                                 # back arm
        limb([(-0.02, 0.47), (-0.13, 0.27), (-0.24, 0.04)], (0.10, 0.074))                                # back leg
        poly([(-0.27, 0.055), (-0.20, 0.065), (-0.14, 0.0), (-0.31, 0.0)])
        limb([(0.02, 0.47), (0.16, 0.29), (0.15, 0.04)], (0.10, 0.074))                                   # front leg
        poly([(0.12, 0.065), (0.18, 0.065), (0.28, 0.0), (0.11, 0.0)])
        poly([(-0.085, 0.52), (0.085, 0.54), (0.105, 0.36), (0.03, 0.33), (-0.03, 0.36), (-0.10, 0.34)])  # tassets
        poly([(-0.075, 0.50), (0.07, 0.52), (0.135, 0.70), (0.13, 0.80), (0.07, 0.87), (-0.03, 0.86), (-0.07, 0.76)])
        limb([(0.06, 0.84), (0.12, 0.89)], (0.046,))                                                      # neck
        cx, cy = P(0.135, 0.925); rx, ry = 0.043 * FIG_H * k, 0.05 * FIG_H * k
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)                                         # head
        poly([(0.16, 0.96), (0.187, 0.925), (0.175, 0.905), (0.182, 0.878), (0.15, 0.868), (0.12, 0.89)])  # face
        poly([(0.15, 0.975), (0.10, 0.987), (0.03, 0.968), cape_pt(-0.04, 0.935, .25, .2), (0.02, 0.92), (0.07, 0.90)])  # hair
        cx, cy = P(0.05, 0.84); rx, ry = 0.078 * FIG_H * k, 0.052 * FIG_H * k
        d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)                                         # pauldron
        poly([(0.0, 0.87), (-0.04, 0.965), (0.035, 0.885)]); poly([(-0.02, 0.85), (-0.095, 0.925), (0.0, 0.87)])
        limb([(0.09, 0.81), (0.19, 0.66), (0.25, 0.56)], (0.062, 0.05))                                   # front arm
        for fx, fy in ((0.288, 0.525), (0.295, 0.555), (0.283, 0.588)):
            d.line([P(0.25, 0.56), P(fx, fy)], fill=255, width=max(2, int(0.012 * FIG_H * k)))
        return np.asarray(img.resize((self.W, self.H), Image.LANCZOS), dtype=np.float64) / 255

    # ---------- the cone ----------
    def fire(self, t, p):
        I = np.zeros((self.H, self.W))
        if p <= 0:
            return I
        sl = (slice(None), slice(self.c0, None))
        r, s = self.r[sl], self.s[sl]
        R = RMAX * (1 - math.exp(-(t - T_BLAST) * 3.0))
        nx, ny = r * 7.0 - t * 4.6, s * 3.5
        q = fbm(nx * 0.6 + 3.1, ny * 0.6 + t * 0.3, 3)
        n = fbm(nx + 2.0 * q, ny + 2.0 * q - t * 0.5, 5)
        n = 0.5 * n + 0.5 * smooth(0.28, 0.72, n)          # harder tongues
        edge = smooth(1.05, 0.15, np.abs(s) + (n - 0.5) * 1.1)
        front = smooth(R, R - 0.35, r + (n - 0.5) * 0.45)
        f = edge * front * (0.30 + 1.5 * n) * (1 - 0.3 * np.clip(r / RMAX, 0, 1)) * (1 + 0.9 * np.exp(-(s / 0.38) ** 2))
        I[sl] = (f + 1.3 * np.exp(-r * r / 0.0012)) * p
        return I

    @staticmethod
    def fire_rgb(I):
        fringe = 0.06 * smooth(0.0, 0.25, I) * smooth(0.7, 0.3, I)
        return np.stack([np.clip(I * 1.25 - 0.62, 0, 3) + fringe, np.clip(I * 1.25 - 0.22, 0, 3), np.clip(I * 1.5, 0, 3)], -1)

    def particles(self, t):
        img = Image.new("RGB", (self.W, self.H))
        d = ImageDraw.Draw(img)
        H, (mx, my) = self.H, self.mouth
        sp = self.sparks
        for i in range(len(sp["tb"])):
            age = t - sp["tb"][i]
            if not 0 < age < sp["life"][i]:
                continue
            pts = []
            for a in (age, max(0.0, age - 0.035)):
                dist = sp["speed"][i] * a * (1 - 0.25 * a)
                wob = 0.012 * math.sin(a * 20 + sp["ph"][i])
                ang = sp["ang"][i]
                pts.append(((mx + math.cos(ang) * dist - math.sin(ang) * wob) * H, (my + math.sin(ang) * dist + math.cos(ang) * wob) * H))
            if pts[0][1] > (FEET_Y + 0.02) * H:
                continue
            fade = 1 - age / sp["life"][i]
            c = (int(150 * fade), int(215 * fade), int(255 * fade))
            d.line(pts, fill=c, width=max(1, int(sp["size"][i] * H / 720)))
        mo = self.motes
        for i in range(len(mo["ts"])):                      # inhale: motes drawn into the mouth
            e = (t - mo["ts"][i]) / 0.55
            if not 0 < e < 1 or t > T_BLAST:
                continue
            pts = []
            for ee in (e, max(0.0, e - 0.08)):
                rad = mo["rad"][i] * (1 - ee) ** 1.6
                pts.append(((mx + math.cos(mo["ang"][i]) * rad) * H, (my + math.sin(mo["ang"][i]) * rad) * H))
            d.line(pts, fill=(int(90 * e), int(150 * e), int(220 * e)), width=max(1, int(1.5 * H / 720)))
        return np.asarray(img, dtype=np.float64) / 255 * 2.0

    def glow_lines(self, t, p, c):
        """Rime on the lance and the eye, as an additive layer."""
        img = Image.new("RGB", (self.W, self.H))
        d = ImageDraw.Draw(img)
        H = self.H
        P = lambda x, y: ((FIG_X + x * FIG_H) * H, (FEET_Y - y * FIG_H) * H)
        rime = 0.3 + 0.7 * max(c, p)
        col = (int(110 * rime), int(190 * rime), int(255 * rime))
        d.line([P(-0.215, 0.70), P(-0.145, 1.25)], fill=col, width=max(1, H // 360))
        d.line([P(-0.145, 1.25), P(-0.113, 1.51)], fill=col, width=max(2, H // 240))
        lit = max(c * 0.7, p)
        eye = (int(255 * (1 - lit) + 180 * lit), int(40 * (1 - lit) + 230 * lit), int(15 * (1 - lit) + 255 * lit))
        ex, ey = P(0.166, 0.934); rr = max(1.2, H / 420)
        d.ellipse([ex - rr, ey - rr, ex + rr, ey + rr], fill=eye)
        soft = img.filter(ImageFilter.GaussianBlur(H / 180))
        return (np.asarray(img, dtype=np.float64) + 1.6 * np.asarray(soft, dtype=np.float64)) / 255

    def blur(self, a, radius, gain=4.0):
        img = Image.fromarray((np.clip(a / gain, 0, 1) * 255).astype(np.uint8))
        return np.asarray(img.filter(ImageFilter.GaussianBlur(radius * self.H / 720)), dtype=np.float64) / 255 * gain

    def frame(self, t):
        X, Y, H, fy = self.X, self.Y, self.H, self.fy
        p, c = power(t), charge(t)
        col = self.bg.copy()
        I = self.fire(t, p)

        # frost left on the ice, then let go before the loop point
        frost_a = float(smooth(T_BLAST + 0.2, T_BLAST + 1.3, t) * (1 - smooth(DUR - 0.9, DUR - 0.1, t)))
        if frost_a > 0:
            reach = RMAX * (1 - math.exp(-max(0.0, t - T_BLAST) * 3.0)) if t < T_END else RMAX
            band = smooth(0.05, 0.12, self.u) * smooth(reach, reach - 0.3, self.u) * \
                np.exp(-((Y - FEET_Y - 0.03) / (0.035 + 0.07 * np.clip(self.u, 0, 2))) ** 2) * (Y > HORIZON)
            col += (band * frost_a * (0.10 + 0.55 * self.frost_tex))[..., None] * np.array([0.55, 0.8, 1.0])

        m = self.figure(t, p)
        col *= (1 - 0.6 * np.exp(-((X - FIG_X) / 0.16) ** 2 - ((Y - FEET_Y - 0.005) / 0.012) ** 2))[..., None]
        refl = np.zeros_like(m); n = min(fy, H - fy)
        refl[fy:fy + n] = m[fy - 1::-1][:n] * np.exp(-np.arange(n) / (0.10 * H))[:, None]
        col *= (1 - 0.5 * refl)[..., None]
        k = max(1, H // 260)
        light = max(p, 0.6 * c)
        rim_r = m * (1 - np.roll(m, -k, 1))
        rim_l = m * (1 - np.roll(m, k, 1)) * 0.5 + m * (1 - np.roll(m, k, 0)) * 0.3
        col = col * (1 - m[..., None]) + np.array([0.045, 0.012, 0.016]) * m[..., None]
        col += rim_l[..., None] * np.array([0.55, 0.10, 0.05]) * (0.6 - 0.3 * light)
        col += rim_r[..., None] * np.array([0.5, 0.8, 1.0]) * light * 1.3
        col += self.glow_lines(t, p, c)

        # fire, its reflection, the gathered breath, the flash
        main = I * smooth(FEET_Y + 0.04, FEET_Y - 0.02, Y)
        rf = np.zeros_like(I)
        rf[fy:fy + n] = I[fy - 1::-1][:n] * 0.45 * np.exp(-np.arange(n) / (0.12 * H))[:, None]
        fire = self.fire_rgb(main) + self.fire_rgb(rf) * 0.6
        fire += (np.exp(-self.r ** 2 / (0.018 + 0.03 * c) ** 2) * c * 1.6)[..., None] * np.array([0.5, 0.8, 1.0])
        if t >= T_BLAST:
            fire += (np.exp(-self.r * 1.2) * math.exp(-(t - T_BLAST) * 9))[..., None] * np.array([0.35, 0.5, 0.7])
        col += fire + self.particles(t)

        bright = np.clip(col - 0.6, 0, None)
        col += 0.9 * self.blur(bright, 14) + 0.7 * self.blur(bright, 48)

        fog_a = float(smooth(T_END - 0.4, T_END + 0.6, t) * (1 - smooth(DUR - 1.1, DUR, t)))
        if fog_a > 0:
            dens = fbm(X * 2.5 - t * 0.08, Y * 5 + t * 0.15, 4) * np.exp(-((Y - FEET_Y + 0.03) / 0.16) ** 2) * smooth(0.0, 0.2, self.u)
            a = (dens * 0.6 * fog_a)[..., None]
            col = col * (1 - a) + np.array([0.45, 0.62, 0.8]) * a

        amp = 5 * H / 720 * p
        col = np.roll(col, (int(amp * math.sin(t * 93.7 + 1)), int(amp * math.sin(t * 71.3))), (0, 1))
        col = 1 - np.exp(-1.25 * col)
        vig = 1 - 0.5 * (((X - ASPECT / 2) / (ASPECT / 2)) ** 2 + ((Y - 0.5) / 0.5) ** 2) ** 1.3 * 0.6
        col = col * vig[..., None] + np.random.default_rng(int(t * 1000)).normal(0, 0.012, col.shape)
        return (np.clip(col, 0, 1) * 255).astype(np.uint8)


def sheet(times, path):
    sc = Scene(0.5)
    frames = [Image.fromarray(sc.frame(t)) for t in times]
    cols = 3; rows = -(-len(frames) // cols)
    out = Image.new("RGB", (sc.W * cols, sc.H * rows))
    for i, f in enumerate(frames):
        out.paste(f, ((i % cols) * sc.W, (i // cols) * sc.H))
    out.save(path, quality=88)
    print("sheet:", path)


def render(out):
    sc = Scene(1.0)
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{sc.W}x{sc.H}", "-r", str(FPS),
           "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-preset", "slow", "-movflags", "+faststart", out + ".mp4"]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    total = int(DUR * FPS)
    for i in range(total):
        fr = sc.frame(i / FPS)
        proc.stdin.write(fr.tobytes())
        if i == int(2.4 * FPS):
            Image.fromarray(fr).save(out + ".webp", quality=85)
        if i % 30 == 0:
            print(f"frame {i}/{total}", flush=True)
    proc.stdin.close()
    if proc.wait() != 0:
        raise SystemExit("ffmpeg failed")
    print("wrote", os.path.normpath(out + ".mp4"))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--sheet", help="comma-separated seconds; writes a contact sheet instead of the clip")
    ap.add_argument("--out", default=OUT)
    a = ap.parse_args()
    if a.sheet:
        sheet([float(x) for x in a.sheet.split(",")], os.path.join(tempfile.gettempdir(), "hellfire-sheet.jpg"))
    else:
        render(a.out)
