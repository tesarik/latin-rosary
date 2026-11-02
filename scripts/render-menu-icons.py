"""Render the start screen's tile icons from art/menu-icons/*.webp.

    python3 scripts/render-menu-icons.py

The sources are 506 px paintings, one per mystery set, the Divine Mercy
chaplet, each prayer group (named by its GroupIconName in menu.ts) and the
prayer plans. The tiles draw them at 40 px, so they are written at 96 px
(sharp up to 2.4× density) to public/icons/<name>.webp. Needs Pillow.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SIZE = 96
out = ROOT / "public" / "icons"
out.mkdir(exist_ok=True)
for src in sorted((ROOT / "art" / "menu-icons").glob("*.webp")):
    Image.open(src).convert("RGB").resize((SIZE, SIZE), Image.LANCZOS).save(out / src.name, quality=86, method=6)
    print(src.name)
