"""
Phase 11: Assemble Chain Devils v3 cut with lore-accurate shots.

Shot sources:
- v2 stills (unchanged): 1, 2, 3, 5, 6, 7, 8, 11, 12
- v3 stills (lore-fixed): 4, 9, 10, 13, 14, 15
- v2 motion clips (unchanged): 03, 07, 08, 12
- v3 motion clips (lore-fixed): 04, 10, 13, 14

Audio: added in a separate pass (11b) via fal MMAudio.
"""
from pathlib import Path
from moviepy import (
    ImageClip,
    VideoFileClip,
    concatenate_videoclips,
    CompositeVideoClip,
    vfx,
)

HERE = Path(__file__).parent
V2_STILLS = HERE.parent / "generated" / "05_scene_shots_v2"
V3_STILLS = HERE.parent / "generated" / "09_stills_v3"
V2_MOTION = HERE.parent / "generated" / "06_motion_clips_v2"
V3_MOTION = HERE.parent / "generated" / "10_motion_v3"
OUT_PATH = HERE.parent / "generated" / "chain-devils-v3-silent.mp4"

TARGET_SIZE = (1920, 1080)
FPS = 24
FADE = 0.4

# (shot_num, filename_slug, duration, kind, still_dir, motion_dir, motion_slug_override)
# motion_slug_override lets v3 motion clips use different slugs than v2 stills
TIMELINE = [
    (1,  "01-ext-tunnel-mouth",                   3.5, "still", V2_STILLS, None, None),
    (2,  "02-aurora-arcane-eye-cast",             3.0, "still", V2_STILLS, None, None),
    (3,  "03-pov-eye-drift",                      5.0, "motion", None, V2_MOTION, "03-pov-eye-drift"),
    (4,  "04-pov-reveal-chain-devils",            4.5, "motion", None, V3_MOTION, "04-pov-reveal-kytons"),
    (5,  "05-aurora-breaks-concentration",        2.5, "still", V2_STILLS, None, None),
    (6,  "06-party-on-lady-v-deck",               3.5, "still", V2_STILLS, None, None),
    (7,  "07-cannon-fires-force-blast",           5.0, "motion", None, V2_MOTION, "07-cannon-fires-force-blast"),
    (8,  "08-tunnel-collapse-impact",             5.0, "motion", None, V2_MOTION, "08-tunnel-collapse-impact"),
    (9,  "09-devils-emerge-through-dust",         3.5, "still", V3_STILLS, None, None),
    (10, "10-drenwal-radiance-of-dawn-vs-kytons", 5.0, "motion", None, V3_MOTION, "10-radiance-of-dawn-vs-kytons"),
    (11, "11-aurora-nocks-radiant-arrow",         2.5, "still", V2_STILLS, None, None),
    (12, "12-arrow-flight-impact",                5.0, "motion", None, V2_MOTION, "12-arrow-flight-impact"),
    (13, "13-asimov-rises-from-shadow",           4.0, "motion", None, V3_MOTION, "13-asimov-emerges"),
    (14, "14-asimov-sneak-attack",                5.0, "motion", None, V3_MOTION, "14-sneak-attack-vs-kyton"),
    (15, "15-aftermath-way-forward",              4.5, "still", V3_STILLS, None, None),
]


def ken_burns_still(path: Path, duration: float, zoom_rate: float = 0.05):
    clip = ImageClip(str(path)).with_duration(duration).resized(TARGET_SIZE)

    def scale_fn(t):
        return 1.0 + (zoom_rate * t / duration)

    clip = clip.resized(scale_fn).with_position("center")
    clip = CompositeVideoClip([clip], size=TARGET_SIZE).with_duration(duration)
    return clip


def load_motion(path: Path, duration: float):
    clip = VideoFileClip(str(path)).without_audio()
    if clip.duration > duration:
        clip = clip.subclipped(0, duration)
    clip = clip.resized(TARGET_SIZE)
    return clip


def main():
    clips = []
    print(f"Building v3 timeline...")
    for i, (num, slug, dur, kind, still_dir, motion_dir, motion_slug) in enumerate(TIMELINE):
        print(f"  [{i+1}/{len(TIMELINE)}] shot {num} ({kind}, {dur}s) — {slug}")
        if kind == "still":
            src = still_dir / f"shot-{slug}.png"
            if not src.exists():
                # Fall back to V2 if V3 missing
                alt = V2_STILLS / f"shot-{slug}.png"
                if alt.exists():
                    print(f"    using V2 fallback: {alt}")
                    src = alt
                else:
                    print(f"    MISSING: {src}")
                    continue
            clip = ken_burns_still(src, dur)
        else:
            src = motion_dir / f"clip-{motion_slug}.mp4"
            if not src.exists():
                print(f"    MISSING: {src}")
                # Fall back: try v2 motion
                alt_slug_candidates = [slug, motion_slug]
                for alt_slug in alt_slug_candidates:
                    alt = V2_MOTION / f"clip-{alt_slug}.mp4"
                    if alt.exists():
                        print(f"    using V2 fallback: {alt}")
                        src = alt
                        break
                else:
                    continue
            clip = load_motion(src, dur)
        if i > 0:
            clip = clip.with_effects([vfx.CrossFadeIn(FADE)])
        clips.append(clip)

    print(f"\nConcatenating {len(clips)} clips with {FADE}s crossfades...")
    video = concatenate_videoclips(clips, method="compose", padding=-FADE)
    video = video.with_effects([vfx.FadeIn(0.6), vfx.FadeOut(0.8)])

    print(f"Video duration: {video.duration:.1f}s")
    print(f"\nRendering to {OUT_PATH}...")
    video.write_videofile(
        str(OUT_PATH),
        fps=FPS,
        codec="libx264",
        preset="medium",
        bitrate="8000k",
        audio=False,
        threads=4,
    )
    size_mb = OUT_PATH.stat().st_size / (1024 * 1024)
    print(f"\n[OK] {OUT_PATH} ({size_mb:.1f} MB, {video.duration:.1f}s)")


if __name__ == "__main__":
    main()
