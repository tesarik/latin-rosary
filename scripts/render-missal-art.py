#!/usr/bin/env python3
"""Renders the Misál look's engravings, art/missal/*.jpg, to public/missal/*.webp.

The sources are the woodcuts of 1880s Roman missals (public domain), scanned
in grey on white. Each is cleaned to pure black ink on pure white paper and
saved in grey (the red ornaments, RED below, as a mask instead): the app lays it on the page with `mix-blend-mode: multiply`, so
the white vanishes into whatever the page's colour is, and in the dark theme
inverts it and blends with `screen` (light ink on the dark page). A grey
picture is half the size of one with an alpha channel. Headpieces keep the
scans' 615 px, the tailpiece is 320 px and the in-season vignette 440.

    python3 scripts/render-missal-art.py
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "art" / "missal"
OUT = ROOT / "public" / "missal"
WIDTH = {"finis": 320, "tempus": 440, "stella": 400, "crux": 240, "pax": 440}
# Ornaments drawn in the rubric red: saved as black ink with an alpha channel
# (the alpha is the scan's darkness), which the app uses as a mask over the
# red, so they are red in either theme.
RED = {"finis", "stella", "crux"}

OUT.mkdir(parents=True, exist_ok=True)
for src in sorted(SRC.glob("*.jpg")):
    grey = Image.open(src).convert("L")
    w = WIDTH.get(src.stem, 720)
    if grey.width > w:
        grey = grey.resize((w, round(grey.height * w / grey.width)), Image.LANCZOS)
    # Stretch the scan so its paper is pure white and its ink pure black.
    grey = ImageOps.autocontrast(grey, cutoff=1)
    grey = grey.point(lambda v: 255 if v > 232 else v)
    dst = OUT / (src.stem + ".webp")
    if src.stem in RED:
        ink = Image.new("RGBA", grey.size, (0, 0, 0, 0))
        # Full ink where the scan is dark at all: the red then reads as solid.
        ink.putalpha(ImageOps.invert(grey).point(lambda v: min(255, v * 2)))
        ink.save(dst, "WEBP", quality=80, method=6)
    else:
        grey.save(dst, "WEBP", quality=55, method=6)
    print(f"{dst.relative_to(ROOT)}  {grey.width}x{grey.height}  {dst.stat().st_size // 1024} kB")
