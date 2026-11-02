"""Cut the app icon's art out of its white field: art/icon-source.png → art/icon-heart.png.

    python3 scripts/cut-icon.py

The source paints the Immaculate Heart on a near-white field, which the glory
of rays fades into. The cut-out keeps the heart, flames, sword, leaves and
white roses opaque and turns the field transparent, the rays fading out by
"colour to alpha" against white, so render-icons.py can lay the art on any
background. Needs Pillow and NumPy. Only re-run it when icon-source.png
changes, and check the result: the rose garland's box below is tied to this
painting.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
a = np.asarray(Image.open(ROOT / "art" / "icon-source.png").convert("RGB")).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]

# What the field's flood fill may not cross: reds and oranges (heart, flames)
# and anything dark (outlines, leaves, the sword). Yellow rays let it through.
barrier = ((r > 120) & (g < 150) & (r - b > 80)) | (a.max(2) < 140)


def outside_of(k):
    """The field reachable from the corner once the barrier is thickened by k px."""
    thick = Image.fromarray((barrier * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(k))
    fill = Image.fromarray(np.where(np.asarray(thick) > 0, 0, 255).astype(np.uint8), "L").copy()
    ImageDraw.floodfill(fill, (0, 0), 128)
    grown = Image.fromarray(((np.asarray(fill) == 128) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(k))
    return np.asarray(grown) > 0


# A thick barrier seals the roses' outlines but also traps white pockets
# between the rays; a thin one reaches those pockets but leaks into a rose.
# So pure white reached by the thin fill is field too, except inside the
# garland, where only large white areas count (a rose's highlights are small).
white = a.min(2) > 246
white_large = np.asarray(
    Image.fromarray((white * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(11)).filter(ImageFilter.MaxFilter(13))
) > 0
garland = np.zeros(white.shape, bool)
garland[600:920, 190:1070] = True
outside = outside_of(21) | (outside_of(9) & np.where(garland, white_large, white))

solid = np.asarray(Image.fromarray(((~outside) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.5))) / 255.0
key = np.array([254.0, 254.0, 254.0])
alpha = np.maximum(np.clip(((key - a) / key).max(axis=2), 0, 1), solid)
colour = np.clip(key - (key - a) / np.maximum(alpha, 1e-6)[..., None], 0, 255)
colour = colour * (1 - solid[..., None]) + a * solid[..., None]
Image.fromarray(np.dstack([colour, alpha * 255]).astype(np.uint8), "RGBA").save(
    ROOT / "art" / "icon-heart.png", optimize=True
)
print("icon-heart.png")
