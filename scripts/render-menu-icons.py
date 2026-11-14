"""Render the start screen's tile icons from art/menu-icons/*.webp.

    python3 scripts/render-menu-icons.py

The sources are 506 px paintings, one per mystery set and one for the
Divine Mercy chaplet. The tiles draw them at 40 px, so they are written at 96 px
(sharp up to 2.4× density) to public/icons/<name>.webp. Needs Pillow.

The full rosary's picture, psalterium.webp, is not a painting of its own: a
triptych of the three mystery sets' paintings (Our Lady of the Annunciation,
the Christ crowned with thorns, the risen Christ), composed here first, so a
changed painting changes it too.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SIZE = 96
ART = ROOT / "art" / "menu-icons"


def compose_psalterium() -> None:
    parts = [("radostny", 0.80), ("bolestny", 0.5), ("slavny", 0.5)]  # strip centre, as a share of the width
    ims = [Image.open(ART / f"{name}.webp").convert("RGB") for name, _ in parts]
    w, h = ims[0].size
    gap = 6
    strip = (w - 2 * gap) // 3
    out = Image.new("RGB", (w, h), (245, 240, 230))
    for i, (im, (_, centre)) in enumerate(zip(ims, parts)):
        x0 = max(0, min(im.width - strip, int(im.width * centre) - strip // 2))
        out.paste(im.crop((x0, 0, x0 + strip, h)), (i * (strip + gap), 0))
    out.save(ART / "psalterium.webp", quality=90, method=6)


compose_psalterium()
out = ROOT / "public" / "icons"
out.mkdir(exist_ok=True)
for src in sorted(ART.glob("*.webp")):
    Image.open(src).convert("RGB").resize((SIZE, SIZE), Image.LANCZOS).save(out / src.name, quality=86, method=6)
    print(src.name)
