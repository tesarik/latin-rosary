// Prayer-body text-size preference. A bounded stepped scale (finer than the old
// three fixed levels) that the user nudges smaller / bigger from the header
// control. The chosen step index is persisted under its own localStorage key,
// independent of the prayer session — mirrors the locale preference in i18n.ts.

// Multipliers applied to the base (medium) clamp band. Index 2 (== 1.0) is the
// original default size; the array ends are the lower/upper bounds.
const FONT_SCALES = [0.8, 0.9, 1.0, 1.12, 1.26, 1.42, 1.6] as const;

export const FONT_SCALE_MIN = 0;
export const FONT_SCALE_MAX = FONT_SCALES.length - 1;
export const DEFAULT_FONT_SCALE = 2;

export const clampFontScale = (i: number): number =>
  Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, Math.round(i)));

// Responsive clamp() for a given step, scaling the base 17 / 5vw / 22 band so
// the text stays fluid across viewport widths at every step.
export function fontSizeClamp(index: number): string {
  const m = FONT_SCALES[clampFontScale(index)]!;
  return `clamp(${(17 * m).toFixed(1)}px, ${(5 * m).toFixed(2)}vw, ${(22 * m).toFixed(1)}px)`;
}

const FONT_SCALE_STORAGE_KEY = "ruzenec_font_size";

// Back-compat: 0.5.0 stored the named level "small" | "medium" | "large".
const LEGACY: Record<string, number> = { small: 1, medium: 2, large: 4 };

export function loadSavedFontScale(): number | null {
  try {
    const raw = localStorage.getItem(FONT_SCALE_STORAGE_KEY);
    if (raw === null) return null;
    if (raw in LEGACY) return LEGACY[raw]!;
    const n = Number.parseInt(raw, 10);
    if (Number.isFinite(n)) return clampFontScale(n);
  } catch {}
  return null;
}

export function saveFontScale(index: number): void {
  try {
    localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(clampFontScale(index)));
  } catch {}
}
