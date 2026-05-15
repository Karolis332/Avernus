"""
Phase 15 (v5): All-motion assembly. Every shot is a Kling video clip.
No more Ken Burns, no more stills. Continuous animation throughout.

Uses motion-interpolated 30 fps clips for smoother playback.
"""
from pathlib import Path
import subprocess
import imageio_ffmpeg
from moviepy import (
    VideoFileClip,
    concatenate_videoclips,
    vfx,
)

HERE = Path(__file__).parent
V2_MOTION = HERE.parent / "generated" / "06_motion_clips_v2"
V3_MOTION = HERE.parent / "generated" / "10_motion_v3"
NEW_MOTION = HERE.parent / "generated" / "14_motion_stills_converted"
INTERP = HERE.parent / "generated" / "15_motion_interpolated_v5"
INTERP.mkdir(parents=True, exist_ok=True)

OUT_PATH = HERE.parent / "generated" / "chain-devils-v5.mp4"
V3_AUDIO_SRC = HERE.parent / "generated" / "chain-devils-v3.mp4"

FPS = 30
FADE = 0.3
TARGET_SIZE = (1920, 1080)
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def interpolate(src: Path, dst: Path, target_fps: int = 30):
    if dst.exists() and dst.stat().st_size > 0:
        return dst
    print(f"  interpolating {src.name} -> {target_fps} fps...")
    cmd = [
        FFMPEG, "-y",
        "-i", str(src),
        "-vf", f"minterpolate=fps={target_fps}:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1",
        "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-an",
        str(dst),
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        cmd2 = [FFMPEG, "-y", "-i", str(src),
                "-vf", f"fps={target_fps}",
                "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-an", str(dst)]
        subprocess.run(cmd2, check=True, capture_output=True)
    return dst


# (shot_num, source_dir, filename_slug, duration)
TIMELINE = [
    (1,  NEW_MOTION, "01-ext-tunnel-mouth",                   4.0),
    (2,  NEW_MOTION, "02-aurora-arcane-eye-cast",             3.5),
    (3,  V2_MOTION,  "03-pov-eye-drift",                      5.0),
    (4,  V3_MOTION,  "04-pov-reveal-kytons",                  4.5),
    (5,  NEW_MOTION, "05-aurora-breaks-concentration",        2.8),
    (6,  NEW_MOTION, "06-party-on-lady-v-deck",               3.8),
    (7,  V2_MOTION,  "07-cannon-fires-force-blast",           5.0),
    (8,  V2_MOTION,  "08-tunnel-collapse-impact",             5.0),
    (9,  NEW_MOTION, "09-devils-emerge-through-dust",         3.8),
    (10, V3_MOTION,  "10-radiance-of-dawn-vs-kytons",         5.0),
    (11, NEW_MOTION, "11-aurora-nocks-radiant-arrow",         2.8),
    (12, V2_MOTION,  "12-arrow-flight-impact",                5.0),
    (13, V3_MOTION,  "13-asimov-emerges",                     4.0),
    (14, V3_MOTION,  "14-sneak-attack-vs-kyton",              5.0),
    (15, NEW_MOTION, "15-aftermath-way-forward",              5.0),
]


def load(path: Path, duration: float):
    c = VideoFileClip(str(path)).without_audio()
    if c.duration > duration:
        c = c.subclipped(0, duration)
    c = c.resized(TARGET_SIZE)
    return c


def main():
    print("v5 all-motion assembly — no Ken Burns, no stills\n")
    clips = []
    for i, (num, src_dir, slug, dur) in enumerate(TIMELINE):
        print(f"[{i+1}/{len(TIMELINE)}] shot {num} (motion, {dur}s) — {slug}")
        raw = src_dir / f"clip-{slug}.mp4"
        if not raw.exists():
            print(f"  MISSING: {raw}")
            continue
        interp = INTERP / f"{slug}_30fps.mp4"
        interpolate(raw, interp, FPS)
        clip = load(interp, dur)
        if i > 0:
            clip = clip.with_effects([vfx.CrossFadeIn(FADE)])
        clips.append(clip)

    print(f"\nConcatenating {len(clips)} motion clips...")
    video = concatenate_videoclips(clips, method="compose", padding=-FADE)
    video = video.with_effects([vfx.FadeIn(0.6), vfx.FadeOut(0.8)])
    print(f"Duration: {video.duration:.1f}s")

    # Attach audio from v3 if available
    if V3_AUDIO_SRC.exists():
        try:
            src = VideoFileClip(str(V3_AUDIO_SRC))
            if src.audio is not None:
                a = src.audio
                if a.duration > video.duration:
                    a = a.subclipped(0, video.duration)
                video = video.with_audio(a)
                print("Attached audio from v3 (MMAudio output)")
        except Exception as e:
            print(f"  audio attach failed: {e}")

    print(f"\nRendering to {OUT_PATH}...")
    video.write_videofile(
        str(OUT_PATH),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        preset="medium",
        bitrate="10000k",
        threads=4,
    )
    mb = OUT_PATH.stat().st_size / (1024 * 1024)
    print(f"\n[OK] {OUT_PATH} ({mb:.1f} MB, {video.duration:.1f}s, {FPS} fps, ALL MOTION)")


if __name__ == "__main__":
    main()
