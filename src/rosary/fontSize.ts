// Prayer-body text-size preference. Three discrete levels picked via the
// A / A / A control in the header. Persisted independently of the prayer
// session (its own localStorage key), mirroring the locale preference in
// i18n.ts — the choice survives reloads and applies to every prayer set.

export const FONT_SIZES = ["small", "medium", "large"] as const;
export type FontSize = (typeof FONT_SIZES)[number];

export const DEFAULT_FONT_SIZE: FontSize = "medium";

// Responsive clamp() applied to the prayer body in PrayerCard. `medium` keeps
// the original sizing; `small` / `large` scale the whole clamp band so the text
// stays fluid across viewport widths at every level.
export const FONT_SIZE_CLAMP: Record<FontSize, string> = {
  small: "clamp(15px, 4.2vw, 19px)",
  medium: "clamp(17px, 5vw, 22px)",
  large: "clamp(20px, 6vw, 27px)",
};

const FONT_SIZE_STORAGE_KEY = "ruzenec_font_size";

export function loadSavedFontSize(): FontSize | null {
  try {
    const raw = localStorage.getItem(FONT_SIZE_STORAGE_KEY);
    if (raw && (FONT_SIZES as readonly string[]).includes(raw)) {
      return raw as FontSize;
    }
  } catch {}
  return null;
}

export function saveFontSize(size: FontSize): void {
  try {
    localStorage.setItem(FONT_SIZE_STORAGE_KEY, size);
  } catch {}
}
