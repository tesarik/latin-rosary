"""Render the app icons from art/icon-source.png (the Immaculate Heart).

    python3 scripts/render-icons.py

The art is full-bleed: the heart in a glory of rays on a blue field, 1254 px
square. Writes public/icon-48.png (favicon), icon-180.png (iOS, which rounds
the corners) and icon-192.png / icon-512.png (manifest, "any") from the whole
picture, and icon-maskable-192.png / icon-maskable-512.png (manifest,
"maskable") with the picture scaled to 80%, so the flames' tips and the
sword's pommel stay inside Android's safe zone (a circle of 80% of the
width). The margin around it is the field's own blue, sampled from the
picture's border and lightening towards the centre as the painting does, with
the art's edge feathered into it, so no seam shows. Needs Pillow and NumPy.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SCALE = 0.8  # of the canvas, for the maskable icons
FEATHER = 0.14  # of the scaled art's width, faded into the margin

src = Image.open(ROOT / "art" / "icon-source.png").convert("RGB")
px = np.asarray(src).astype(float)
EDGE = np.concatenate([px[:8].reshape(-1, 3), px[-8:].reshape(-1, 3), px[:, :8].reshape(-1, 3), px[:, -8:].reshape(-1, 3)]).mean(0)
CENTRE = EDGE * 1.25


def field(size):
    """The blue field, a little lighter in the middle, for the maskable margin."""
    y, x = np.mgrid[0:size, 0:size]
    t = np.clip(np.hypot(x - size / 2, y - size / 2) / (size * 0.71), 0, 1)[..., None]
    return Image.fromarray((CENTRE * (1 - t) + EDGE * t).clip(0, 255).round().astype(np.uint8), "RGB")


def save(img, name):
    img.save(ROOT / "public" / name, optimize=True)
    print(name)


for size in (48, 180, 192, 512):
    save(src.resize((size, size), Image.LANCZOS), f"icon-{size}.png")

for size in (192, 512):
    canvas = field(size)
    inner = round(size * SCALE)
    art = src.resize((inner, inner), Image.LANCZOS)
    mask = Image.new("L", (inner, inner), 0)
    edge = max(1, round(inner * FEATHER))
    draw = ImageDraw.Draw(mask)
    for i in range(edge):  # a linear fade over the outer `edge` pixels
        draw.rectangle((i, i, inner - 1 - i, inner - 1 - i), fill=round(255 * (i + 1) / edge))
    canvas.paste(art, ((size - inner) // 2, (size - inner) // 2), mask)
    save(canvas, f"icon-maskable-{size}.png")
