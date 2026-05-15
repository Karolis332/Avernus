"""
Try each image model discovered on this key to find one with free quota.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types

HERE = Path(__file__).parent
load_dotenv(HERE / ".env")
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

prompt = "A tiny silver moon sigil on parchment, minimal dark fantasy aesthetic."
out_dir = HERE.parent / "generated" / "00_smoke_test"
out_dir.mkdir(parents=True, exist_ok=True)

# Models accessible via generateContent
GEN_CONTENT_MODELS = [
    "gemini-3.1-flash-image-preview",
    "gemini-3-pro-image-preview",
    "gemini-2.5-flash-image",
]

# Imagen models use a different API (generate_images)
IMAGEN_MODELS = [
    "imagen-4.0-fast-generate-001",
    "imagen-4.0-generate-001",
    "imagen-4.0-ultra-generate-001",
]

print("=== generateContent (Gemini native image models) ===")
for model in GEN_CONTENT_MODELS:
    print(f"\n-- {model} --")
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(response_modalities=["IMAGE"]),
        )
        saved = False
        for part in response.parts:
            if part.inline_data:
                out = out_dir / f"gemini_{model.replace('.', '_').replace('/', '_')}.png"
                part.as_image().save(out)
                print(f"  [OK] {out.name} ({out.stat().st_size // 1024} KB) -- FREE TIER WORKS")
                saved = True
                break
        if not saved:
            print(f"  [empty response]")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:200]}")

print("\n=== Imagen (generate_images API) ===")
for model in IMAGEN_MODELS:
    print(f"\n-- {model} --")
    try:
        response = client.models.generate_images(
            model=model,
            prompt=prompt,
            config=types.GenerateImagesConfig(number_of_images=1),
        )
        if response.generated_images:
            out = out_dir / f"imagen_{model.replace('.', '_').replace('/', '_')}.png"
            response.generated_images[0].image.save(str(out))
            print(f"  [OK] {out.name} ({out.stat().st_size // 1024} KB) -- FREE TIER WORKS")
        else:
            print(f"  [empty response]")
    except Exception as e:
        print(f"  [FAIL] {str(e)[:200]}")
