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
# The figure (the flames' tip to the heart's point) spans these rows of the
# source; each icon centres it, so it doesn't sit high with the flames at the
# edge.
FIGURE_TOP, FIGURE_BOTTOM = 15, 1145
SCALE_ANY = 0.88  # of the canvas, for the full icons
SCALE_MASKABLE = 0.78  # inside Android's safe zone, a circle of 80% of the width
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


def compose(size, scale):
    """The art scaled onto the field, its figure centred, its edge feathered in."""
    canvas = field(size)
    inner = round(size * scale)
    art = src.resize((inner, inner), Image.LANCZOS)
    mask = Image.new("L", (inner, inner), 0)
    edge = max(1, round(inner * FEATHER))
    draw = ImageDraw.Draw(mask)
    for i in range(edge):  # a linear fade over the outer `edge` pixels
        draw.rectangle((i, i, inner - 1 - i, inner - 1 - i), fill=round(255 * (i + 1) / edge))
    middle = (FIGURE_TOP + FIGURE_BOTTOM) / 2 / src.height * inner
    canvas.paste(art, ((size - inner) // 2, round(size / 2 - middle)), mask)
    return canvas


for size in (48, 180, 192, 512):
    save(compose(size, SCALE_ANY), f"icon-{size}.png")

for size in (192, 512):
    save(compose(size, SCALE_MASKABLE), f"icon-maskable-{size}.png")
