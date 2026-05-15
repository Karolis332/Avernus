"""
Phase 8: Assemble Chain Devils v2 cut with audio.

Timeline: 15 shots, 7 stills (Ken Burns) + 8 motion clips.
Audio: ambient bed + per-shot SFX from Pixabay CC0 library.

Output: chain-devils-v2.mp4 (1080p, 24fps, ~62s, with audio).
"""
from pathlib import Path
from moviepy import (
    ImageClip,
    VideoFileClip,
    AudioFileClip,
    CompositeAudioClip,
    concatenate_videoclips,
    CompositeVideoClip,
    vfx,
    afx,
)

HERE = Path(__file__).parent
STILLS_DIR = HERE.parent / "generated" / "05_scene_shots_v2"
MOTION_DIR = HERE.parent / "generated" / "06_motion_clips_v2"
SFX_DIR = HERE.parent / "generated" / "07_sfx"
OUT_PATH = HERE.parent / "generated" / "chain-devils-v2.mp4"

TARGET_SIZE = (1920, 1080)
FPS = 24
FADE = 0.4

# (shot_num, slug, duration, kind, sfx_list)
# Each sfx is (sfx_slug, start_offset_seconds_relative_to_shot, volume 0-1)
TIMELINE = [
    (1,  "01-ext-tunnel-mouth",                   3.5, "still",
        [("ambient-dungeon-wind", 0.0, 0.5), ("parchment-turn", 0.5, 0.7)]),
    (2,  "02-aurora-arcane-eye-cast",             3.0, "still",
        [("magic-spell-arcane-cast", 0.3, 0.8)]),
    (3,  "03-pov-eye-drift",                      5.0, "motion",
        [("ambient-dungeon-wind", 0.0, 0.6)]),
    (4,  "04-pov-reveal-chain-devils",            4.5, "motion",
        [("chains-rattle-1", 0.5, 0.8), ("magic-crackle-psionic", 3.0, 0.4)]),
    (5,  "05-aurora-breaks-concentration",        2.5, "still",
        [("parchment-turn", 0.8, 0.6)]),
    (6,  "06-party-on-lady-v-deck",               3.5, "still",
        [("ambient-dungeon-wind", 0.0, 0.4)]),
    (7,  "07-cannon-fires-force-blast",           5.0, "motion",
        [("cannon-fire-deep", 0.2, 1.0)]),
    (8,  "08-tunnel-collapse-impact",             5.0, "motion",
        [("explosion-impact-heavy", 0.0, 1.0)]),
    (9,  "09-devils-emerge-through-dust",         3.5, "still",
        [("chains-rattle-1", 0.3, 0.7)]),
    (10, "10-drenwal-word-of-radiance-vs-devils", 5.0, "motion",
        [("magic-whoosh-divine", 0.1, 1.0)]),
    (11, "11-aurora-nocks-radiant-arrow",         2.5, "still",
        [("magic-spell-arcane-cast", 0.0, 0.5)]),
    (12, "12-arrow-flight-impact",                5.0, "motion",
        [("arrow-release-radiant", 0.0, 1.0),
         ("arrow-impact-flesh", 2.5, 0.9),
         ("body-fall-wet", 4.0, 0.7)]),
    (13, "13-asimov-rises-from-shadow",           4.0, "motion",
        [("magic-crackle-psionic", 0.3, 0.8)]),
    (14, "14-asimov-sneak-attack",                5.0, "motion",
        [("magic-crackle-psionic", 0.0, 0.8),
         ("dagger-strike-wet", 1.5, 1.0),
         ("body-fall-wet", 3.5, 0.8)]),
    (15, "15-aftermath-way-forward",              4.5, "still",
        [("ambient-dungeon-wind", 0.0, 0.5), ("parchment-turn", 2.0, 0.7)]),
]


def ken_burns_still(path: Path, duration: float, zoom_rate: float = 0.05):
    clip = ImageClip(str(path)).with_duration(duration).resized(TARGET_SIZE)

    def scale_fn(t):
        return 1.0 + (zoom_rate * t / duration)

    clip = clip.resized(scale_fn)
    clip = clip.with_position("center")
    clip = CompositeVideoClip([clip], size=TARGET_SIZE).with_duration(duration)
    return clip


def load_motion(path: Path, duration: float):
    clip = VideoFileClip(str(path)).without_audio()
    if clip.duration > duration:
        clip = clip.subclipped(0, duration)
    clip = clip.resized(TARGET_SIZE)
    return clip


def build_video_timeline():
    clips = []
    shot_start_times = []  # cumulative start time of each shot (before crossfade overlap)
    running = 0.0
    for i, row in enumerate(TIMELINE):
        num, slug, dur, kind, _sfx = row
        shot_start_times.append(running - (FADE if i > 0 else 0))
        running += dur - (FADE if i > 0 else 0)

        print(f"  [{i+1}/{len(TIMELINE)}] shot {num} ({kind}, {dur}s) — {slug}")
        if kind == "still":
            src = STILLS_DIR / f"shot-{slug}.png"
            if not src.exists():
                print(f"    MISSING: {src}")
                continue
            clip = ken_burns_still(src, dur)
        else:
            src = MOTION_DIR / f"clip-{slug}.mp4"
            if not src.exists():
                print(f"    MISSING: {src}")
                continue
            clip = load_motion(src, dur)
        if i > 0:
            clip = clip.with_effects([vfx.CrossFadeIn(FADE)])
        clips.append(clip)
    return clips, shot_start_times


def build_audio_tracks(shot_start_times, final_duration):
    """Build a CompositeAudioClip with all SFX placed on the timeline."""
    audio_clips = []
    for i, row in enumerate(TIMELINE):
        num, slug, dur, kind, sfx_list = row
        shot_start = shot_start_times[i]
        for sfx_slug, offset, volume in sfx_list:
            sfx_path = SFX_DIR / f"{sfx_slug}.mp3"
            if not sfx_path.exists():
                print(f"    [sfx missing] {sfx_slug}")
                continue
            try:
                a = AudioFileClip(str(sfx_path))
            except Exception as e:
                print(f"    [sfx error] {sfx_slug}: {e}")
                continue
            # Cap duration to shot duration
            max_dur = dur - offset
            if a.duration > max_dur:
                a = a.subclipped(0, max_dur)
            a = a.with_effects([afx.MultiplyVolume(volume)])
            a = a.with_start(shot_start + offset)
            audio_clips.append(a)
    if not audio_clips:
        return None
    return CompositeAudioClip(audio_clips)


def main():
    print("Building video timeline...")
    clips, shot_start_times = build_video_timeline()
    print(f"\nConcatenating {len(clips)} clips with {FADE}s crossfades...")
    video = concatenate_videoclips(clips, method="compose", padding=-FADE)
    video = video.with_effects([vfx.FadeIn(0.6), vfx.FadeOut(0.8)])

    print(f"Video duration: {video.duration:.1f}s")

    print("\nBuilding SFX audio tracks...")
    audio = build_audio_tracks(shot_start_times, video.duration)
    if audio is not None:
        video = video.with_audio(audio)
        print(f"  [OK] {len(audio.clips)} sfx events placed")
    else:
        print("  [WARN] no audio produced")

    print(f"\nRendering to {OUT_PATH}...")
    video.write_videofile(
        str(OUT_PATH),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        preset="medium",
        bitrate="8000k",
        threads=4,
    )
    size_mb = OUT_PATH.stat().st_size / (1024 * 1024)
    print(f"\n[OK] {OUT_PATH} ({size_mb:.1f} MB, {video.duration:.1f}s)")


if __name__ == "__main__":
    main()
