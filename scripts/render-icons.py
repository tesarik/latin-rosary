"""Render the app icons from art/icon-source.png (the Immaculate Heart).

    python3 scripts/render-icons.py

Writes public/icon-180.png (iOS), icon-192.png, icon-512.png (manifest,
"any maskable") and icon-48.png (favicon). The source sits on a near-white
field; it is scaled down onto a full-bleed square of the same colour so the
heart, flames and sword stay inside the maskable safe zone (a circle of 80%
of the width) — Android crops to a circle or squircle, iOS rounds the corners.
Needs Pillow.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "art" / "icon-source.png"
SCALE = 0.8  # of the canvas: keeps the flames' tips and the sword's pommel in the safe zone

src = Image.open(SRC).convert("RGB")
field = src.getpixel((2, 2))
for size in (48, 180, 192, 512):
    canvas = Image.new("RGB", (size, size), field)
    inner = round(size * SCALE)
    art = src.resize((inner, inner), Image.LANCZOS)
    canvas.paste(art, ((size - inner) // 2, (size - inner) // 2))
    canvas.save(ROOT / "public" / f"icon-{size}.png", optimize=True)
    print(f"icon-{size}.png")
