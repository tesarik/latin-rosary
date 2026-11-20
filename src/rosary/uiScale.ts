// The size of the app's own text — buttons, labels, names, menus — chosen
// on the start screen's Settings tab, in three steps. The prayer body has its
// own size (fontSize.ts, the ⋯'s A−/A+); this one leaves it alone. Every
// fixed size in the UI goes through `ui(px)` in fonts.ts, which multiplies it
// by --ui-k, set here on <html> (and before first paint by index.html's
// script — keep the two in step). Its own key, like the other preferences:
// not versioned, kept across resets, carried by the backup.
const UI_SCALE_KEY = "ruzenec_ui_scale";

export const UI_SCALES = [1, 1.12, 1.25] as const;
export type UiScale = 0 | 1 | 2;
export const DEFAULT_UI_SCALE: UiScale = 0;

const isUiScale = (n: number): n is UiScale => n === 0 || n === 1 || n === 2;

export function loadUiScale(): UiScale {
  try {
    const n = Number(localStorage.getItem(UI_SCALE_KEY));
    return isUiScale(n) ? n : DEFAULT_UI_SCALE;
  } catch {
    return DEFAULT_UI_SCALE;
  }
}

export function saveUiScale(s: UiScale): void {
  try {
    if (s === DEFAULT_UI_SCALE) localStorage.removeItem(UI_SCALE_KEY);
    else localStorage.setItem(UI_SCALE_KEY, String(s));
  } catch {}
}

export function applyUiScale(s: UiScale): void {
  document.documentElement.style.setProperty("--ui-k", String(UI_SCALES[s]));
}
