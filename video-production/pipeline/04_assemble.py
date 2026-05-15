"""
Phase 4: Assemble the v1 Chain Devils cut.

Timeline:
- 22 shots total
- 7 motion clips (Kling, 5s each) replace the matching stills
- 15 stills get Ken Burns pan-zoom (2-3s each)
- Crossfades between shots
- Fade in/out at scene boundaries
- Export 1080p H.264 MP4

No music or voiceover in v1 — silent cut for aesthetic approval.
Audio pass is Phase 5 (Suno music + freesound SFX).
"""
import sys
from pathlib import Path
from moviepy import (
    ImageClip,
    VideoFileClip,
    concatenate_videoclips,
    CompositeVideoClip,
    vfx,
)

HERE = Path(__file__).parent
STILLS_DIR = HERE.parent / "generated" / "02_scene_shots"
MOTION_DIR = HERE.parent / "generated" / "03_motion_clips"
OUT_PATH = HERE.parent / "generated" / "chain-devils-v1.mp4"

TARGET_SIZE = (1920, 1080)  # 16:9 Full HD
FPS = 24
FADE = 0.4  # seconds crossfade between shots

# (shot_num, slug, duration, kind)  kind = "still" | "motion"
TIMELINE = [
    (1,  "01-card-title",                 3.0, "still"),
    (2,  "02-corridor-empty",             2.5, "still"),
    (3,  "03-chain-devil-drops",          5.0, "motion"),
    (4,  "04-three-chain-devils",         2.5, "still"),
    (5,  "05-drenwal-shield-raised",      2.5, "still"),
    (6,  "06-shield-closeup",             1.8, "still"),
    (7,  "07-word-of-radiance",           5.0, "motion"),
    (8,  "08-chain-devils-recoil",        2.2, "still"),
    (9,  "09-aurora-draws-bow",           2.5, "still"),
    (10, "10-arrow-materializes",         5.0, "motion"),
    (11, "11-aurora-eyes-starlight",      1.8, "still"),
    (12, "12-arrow-flight",               5.0, "motion"),
    (13, "13-chain-devil-impact",         5.0, "motion"),
    (14, "14-ceiling-shadows",            2.2, "still"),
    (15, "15-asimov-drops",               2.5, "still"),
    (16, "16-soul-capacitor-pulse",       2.0, "still"),
    (17, "17-psychic-daggers-form",       5.0, "motion"),
    (18, "18-asimov-emerges",             2.5, "still"),
    (19, "19-sneak-attack-strike",        5.0, "motion"),
    (20, "20-chain-devil-collapse",       2.2, "still"),
    (21, "21-aftermath-three-silhouettes", 3.0, "still"),
    (22, "22-card-ending",                3.0, "still"),
]


def ken_burns_still(path: Path, duration: float, zoom_rate: float = 0.04):
    """
    ImageClip with slow zoom-in Ken Burns effect.
    zoom_rate: fractional zoom added across duration. 0.04 = 4% across clip length.
    """
    clip = ImageClip(str(path)).with_duration(duration).resized(TARGET_SIZE)

    # Slow zoom-in by applying time-varying resize
    # start at 1.0 scale, end at 1.0 + zoom_rate
    def scale_fn(t):
        return 1.0 + (zoom_rate * t / duration)

    clip = clip.resized(scale_fn)
    # Re-center in frame (resize from center)
    clip = clip.with_position("center")
    # Crop back to target size since resize grows outside frame
    clip = CompositeVideoClip([clip], size=TARGET_SIZE).with_duration(duration)
    return clip


def load_motion(path: Path, duration: float):
    clip = VideoFileClip(str(path))
    # Trim or extend to target duration
    if clip.duration > duration:
        clip = clip.subclipped(0, duration)
    clip = clip.resized(TARGET_SIZE)
    return clip


def build_timeline():
    clips = []
    for i, (num, slug, dur, kind) in enumerate(TIMELINE):
        print(f"  [{i+1}/{len(TIMELINE)}] shot {num} ({kind}, {dur}s) — {slug}")
        if kind == "still":
            src = STILLS_DIR / f"shot-{slug}.png"
            if not src.exists():
                print(f"    MISSING: {src}")
                continue
            clip = ken_burns_still(src, dur)
        else:  # motion
            src = MOTION_DIR / f"clip-{slug}.mp4"
            if not src.exists():
                print(f"    MISSING: {src}")
                continue
            clip = load_motion(src, dur)
        # Crossfade transitions (except first clip)
        if i > 0:
            clip = clip.with_effects([vfx.CrossFadeIn(FADE)])
        clips.append(clip)
    return clips


def main():
    print("Building timeline...")
    clips = build_timeline()
    print(f"\nConcatenating {len(clips)} clips with {FADE}s crossfades...")
    final = concatenate_videoclips(clips, method="compose", padding=-FADE)

    # Fade in opening and fade out ending
    final = final.with_effects([vfx.FadeIn(0.6), vfx.FadeOut(0.8)])

    total = final.duration
    print(f"Final duration: {total:.1f}s")
    print(f"\nRendering to {OUT_PATH}...")

    final.write_videofile(
        str(OUT_PATH),
        fps=FPS,
        codec="libx264",
        preset="medium",
        bitrate="8000k",
        audio=False,
        threads=4,
    )
    size_mb = OUT_PATH.stat().st_size / (1024 * 1024)
    print(f"\n[OK] {OUT_PATH} ({size_mb:.1f} MB, {total:.1f}s)")


if __name__ == "__main__":
    main()
