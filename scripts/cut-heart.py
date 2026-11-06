"""Cut the heart out of the app icon's blue field: art/icon-source.png → art/icon-heart.png.

    python3 scripts/cut-heart.py

The app icon keeps the painting whole, on its blue field; inside the app (the
start screen, the About dialog) the heart stands on the page's own background
instead. This keeps the heart, flames, sword, leaves and roses opaque and turns
the field transparent, the glory of rays fading out by "colour to alpha"
against the field's blue (estimated pixel by pixel, since the field is
textured and lighter towards the middle). Writes art/icon-heart.png, from
which render-icons.py renders public/heart-192.png. Needs Pillow and NumPy.
Re-run it when icon-source.png changes, and check the result.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
a = np.asarray(Image.open(ROOT / "art" / "icon-source.png").convert("RGB")).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
H, W = r.shape

# The field: blue, and darker than the rays.
blue = (b - r > 45) & (b - g > 20) & (a.max(2) < 170)


def box(x, k, axis):
    """A box blur of width 2k+1 along one axis, edges clamped."""
    pad = [(0, 0)] * x.ndim
    pad[axis] = (k + 1, k)
    c = np.cumsum(np.pad(x, pad, mode="edge"), axis=axis)
    n = x.shape[axis]
    return (np.take(c, range(2 * k + 1, 2 * k + 1 + n), axis) - np.take(c, range(n), axis)) / (2 * k + 1)


def blur(x, radius):
    """Three box passes each way, close to a Gaussian of about this radius."""
    k = max(1, round(radius / 1.7))
    for _ in range(3):
        x = box(box(x, k, 0), k, 1)
    return x


# The field's colour everywhere, by a normalized blur of the blue pixels only.
weight = blur(blue.astype(float), 40)
bg = np.dstack([blur(a[..., c] * blue, 40) for c in range(3)]) / np.maximum(weight, 1e-6)[..., None]
bg[weight < 1e-3] = a[blue].mean(0)

# What the outside may not cross: reds and oranges (heart, flames, the sword's
# shading) and anything dark that isn't the blue field (outlines, leaves).
barrier = ((r > 140) & (g < 110) & (r - b > 90)) | ((a.max(2) < 120) & ~blue)


def outside_of(k):
    """Everything reachable from the corner once the barrier is thickened by k px."""
    thick = Image.fromarray((barrier * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(k))
    fill = Image.fromarray(np.where(np.asarray(thick) > 0, 0, 255).astype(np.uint8), "L").copy()
    ImageDraw.floodfill(fill, (0, 0), 128)
    grown = Image.fromarray(((np.asarray(fill) == 128) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(k))
    return np.asarray(grown) > 0


# The dull blue-grey the painting shades beside each ray is field too, even
# where the rays enclose it (the leaves, though dark, are green, not grey).
shade = (b >= r - 10) & (b >= g - 15) & (a.max(2) < 160)
solid = blur((~outside_of(11) & ~blue & ~shade).astype(float), 1.5)

# Colour to alpha against the field, counting only what is lighter than it:
# the rays are light, and the darker blue the painting shades beside each ray
# belongs to the field. The field's own mottling stays under the threshold.
up = np.clip((a - bg) / np.maximum(255 - bg, 1), 0, 1)
alpha = np.clip((up.max(2) - 0.12) / 0.88, 0, 1)
alpha = np.maximum(alpha, solid)
colour = np.clip(bg + (a - bg) / np.maximum(alpha, 1e-6)[..., None], 0, 255)
colour = colour * (1 - solid[..., None]) + a * solid[..., None]
out = np.dstack([colour, alpha * 255]).round().astype(np.uint8)
Image.fromarray(out, "RGBA").save(ROOT / "art" / "icon-heart.png", optimize=True)
print("icon-heart.png")
