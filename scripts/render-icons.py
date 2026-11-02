"""Render the app icons from art/icon-heart.png (the Immaculate Heart).

    python3 scripts/render-icons.py

Writes public/icon-180.png (iOS), icon-192.png, icon-512.png (manifest,
"any maskable") and icon-48.png (favicon). The art, cut out of its white
field by cut-icon.py, is scaled down onto a full-bleed blue-grey square
lightening towards the centre, so the heart, flames and sword stay inside the
maskable safe zone (a circle of 80% of the width) — Android crops to a circle
or squircle, iOS rounds the corners. Needs Pillow and NumPy.
"""
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ART = ROOT / "art" / "icon-heart.png"
SCALE = 0.8  # of the canvas: keeps the flames' tips and the sword's pommel in the safe zone
EDGE = np.array([30, 44, 74])     # #1E2C4A, the corners
CENTRE = np.array([76, 98, 138])   # #4C628A, behind the heart

art = Image.open(ART).convert("RGBA")
for size in (48, 180, 192, 512):
    y, x = np.mgrid[0:size, 0:size]
    t = np.clip(np.hypot(x - size / 2, y - size / 2) / (size * 0.72), 0, 1)[..., None]
    canvas = Image.fromarray((CENTRE * (1 - t) + EDGE * t).round().astype(np.uint8), "RGB").convert("RGBA")
    inner = round(size * SCALE)
    canvas.alpha_composite(art.resize((inner, inner), Image.LANCZOS), ((size - inner) // 2, (size - inner) // 2))
    canvas.convert("RGB").save(ROOT / "public" / f"icon-{size}.png", optimize=True)
    print(f"icon-{size}.png")
