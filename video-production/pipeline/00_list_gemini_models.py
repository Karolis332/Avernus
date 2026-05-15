"""
List ALL models available to this Gemini API key and their supported methods.
Helps us find which image-generation models are actually accessible.
"""
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

HERE = Path(__file__).parent
load_dotenv(HERE / ".env")
client = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

print("Listing all models available to this key...\n")
image_models = []
for model in client.models.list():
    name = model.name
    methods = getattr(model, "supported_actions", None) or getattr(model, "supported_generation_methods", [])
    if "image" in name.lower() or "imagen" in name.lower():
        image_models.append((name, methods))
        print(f"  IMAGE: {name}  methods={methods}")

print(f"\n{len(image_models)} image-related models found.")
