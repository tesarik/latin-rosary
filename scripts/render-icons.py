"""Render the app icons from art/icon-source.png (the Immaculate Heart).

    python3 scripts/render-icons.py

The art is full-bleed: the heart in a glory of rays on a blue field, 1254 px
square. Writes public/icon-48.png (favicon), icon-180.png (iOS, which rounds
the corners) and icon-192.png / icon-512.png (manifest, "any") with the
picture scaled to 88%, and icon-maskable-192.png / icon-maskable-512.png
(manifest, "maskable") scaled to 78%, so the flames' tips and the sword's
pommel stay inside Android's safe zone (a circle of 80% of the width). Each
centres the glory of rays, which sits below the middle of the painting. The
margin around it is the field's own blue, sampled from the picture's border
and lightening towards the centre as the painting does, with the art's edge
feathered into it, so no seam shows. Also writes public/heart-192.webp, the
heart the app itself shows, from art/icon-heart.png (run scripts/cut-heart.py
first). Needs Pillow and NumPy.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
# The centre of the glory of rays round the heart, in source pixels (its rays
# reach x 34-1216, y 98-1230). Each icon centres it: in the painting it sits
# below the middle, and centring the flames-to-point figure instead would push
# it lower still.
GLORY_X, GLORY_Y = 625, 664
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
    """The art scaled onto the field, its glory centred, its edge feathered in."""
    canvas = field(size)
    inner = round(size * scale)
    art = src.resize((inner, inner), Image.LANCZOS)
    mask = Image.new("L", (inner, inner), 0)
    edge = max(1, round(inner * FEATHER))
    draw = ImageDraw.Draw(mask)
    for i in range(edge):  # a linear fade over the outer `edge` pixels
        draw.rectangle((i, i, inner - 1 - i, inner - 1 - i), fill=round(255 * (i + 1) / edge))
    x = round(size / 2 - GLORY_X / src.width * inner)
    y = round(size / 2 - GLORY_Y / src.height * inner)
    canvas.paste(art, (x, y), mask)
    return canvas


for size in (48, 180, 192, 512):
    save(compose(size, SCALE_ANY), f"icon-{size}.png")

for size in (192, 512):
    save(compose(size, SCALE_MASKABLE), f"icon-maskable-{size}.png")

# Inside the app (the start screen, the About dialog) the heart stands on the
# page's own background: art/icon-heart.png, cut out by scripts/cut-heart.py,
# cropped square round the glory of rays (as far as the bottom edge allows).
heart = Image.open(ROOT / "art" / "icon-heart.png").convert("RGBA")
half = min(GLORY_X, GLORY_Y, heart.width - GLORY_X, heart.height - GLORY_Y)
heart = heart.crop((GLORY_X - half, GLORY_Y - half, GLORY_X + half, GLORY_Y + half))
heart.resize((192, 192), Image.LANCZOS).save(ROOT / "public" / "heart-192.webp", quality=88, method=6)
print("heart-192.webp")
