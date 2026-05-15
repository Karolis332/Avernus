"""
Phase 12: Generate synced audio for the v3 silent video using fal MMAudio v2.

Tries upload via fal.ai storage -> falls back to downscaled temp upload via
catbox.moe (free, no auth) if fal storage 403s.
"""
from pathlib import Path
from dotenv import load_dotenv
import base64
import os
import subprocess
import fal_client
import requests
import imageio_ffmpeg

HERE = Path(__file__).parent
SILENT_VIDEO = HERE.parent / "generated" / "chain-devils-v3-silent.mp4"
DOWNSCALED = HERE.parent / "generated" / "chain-devils-v3-silent-720p.mp4"
OUT_PATH = HERE.parent / "generated" / "chain-devils-v3.mp4"
load_dotenv(HERE / ".env")

AUDIO_PROMPT = (
    "Dark fantasy D&D battle scene soundscape. Distant dungeon ambient wind. "
    "Heavy metallic chains rattling and clanking. Arcane magical energies - "
    "crackling electrical discharge, sapphire force-blast detonation, deep "
    "radiant holy whoosh of angelic light, psionic purple-violet crackle. "
    "Stone and bone tunnel collapse rumble. Bow release twang, arrow flight "
    "whoosh, radiant impact burst. Cinematic dungeon combat foley. No music, "
    "no voice acting, only SFX and ambient. Dense but ordered audio layering."
)


def downscale_video(src: Path, dst: Path):
    """Re-encode to 720p, lower bitrate, for smaller upload."""
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg,
        "-y",
        "-i", str(src),
        "-vf", "scale=1280:720",
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "28",
        "-an",
        str(dst),
    ]
    print(f"  Downscaling to 720p (smaller upload)...")
    subprocess.run(cmd, check=True, capture_output=True)
    mb = dst.stat().st_size / (1024 * 1024)
    print(f"  Downscaled: {dst.name} ({mb:.1f} MB)")


def upload_catbox(path: Path) -> str:
    """Upload to catbox.moe (free, no auth required). Returns URL."""
    print(f"  Uploading to catbox.moe ({path.name}, {path.stat().st_size / (1024*1024):.1f} MB)...")
    with open(path, "rb") as f:
        r = requests.post(
            "https://catbox.moe/user/api.php",
            data={"reqtype": "fileupload"},
            files={"fileToUpload": (path.name, f, "video/mp4")},
            timeout=300,
        )
    r.raise_for_status()
    url = r.text.strip()
    print(f"  Uploaded: {url}")
    return url


def main():
    if not SILENT_VIDEO.exists():
        print(f"ERROR: silent video not found at {SILENT_VIDEO}")
        return

    # Try fal upload first
    video_url = None
    try:
        video_url = fal_client.upload_file(str(SILENT_VIDEO))
        print(f"[ok] fal upload succeeded: {video_url[:80]}...")
    except Exception as e:
        print(f"[info] fal upload 403 expected - falling back to catbox.moe")

    if video_url is None:
        # Downscale to reduce upload size
        if not DOWNSCALED.exists():
            try:
                downscale_video(SILENT_VIDEO, DOWNSCALED)
            except subprocess.CalledProcessError as e:
                print(f"  ffmpeg downscale failed, using original")
                DOWNSCALED_PATH = SILENT_VIDEO
            else:
                DOWNSCALED_PATH = DOWNSCALED
        else:
            DOWNSCALED_PATH = DOWNSCALED

        try:
            video_url = upload_catbox(DOWNSCALED_PATH)
        except Exception as e:
            print(f"  catbox upload failed: {e}")
            return

    print(f"\nRunning MMAudio v2...")
    print(f"  Prompt: {AUDIO_PROMPT[:100]}...")
    try:
        result = fal_client.subscribe(
            "fal-ai/mmaudio-v2",
            arguments={
                "video_url": video_url,
                "prompt": AUDIO_PROMPT,
                "num_steps": 25,
                "duration": 56,
                "cfg_strength": 4.5,
            },
            with_logs=False,
        )
        audio_video_url = result["video"]["url"]
        print(f"  [OK] audio-enhanced URL: {audio_video_url[:80]}...")
    except Exception as e:
        print(f"  [FAIL] MMAudio: {str(e)[:300]}")
        return

    print(f"\nDownloading audio-enhanced video...")
    resp = requests.get(audio_video_url, timeout=300)
    resp.raise_for_status()
    OUT_PATH.write_bytes(resp.content)
    mb = OUT_PATH.stat().st_size / (1024 * 1024)
    print(f"\n[OK] {OUT_PATH} ({mb:.1f} MB)")


if __name__ == "__main__":
    main()
