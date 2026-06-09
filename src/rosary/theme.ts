// Light/dark theme preference. The palette itself lives in CSS custom
// properties (see index.css); this module only decides which one is active by
// toggling `data-theme` on <html>. Persisted under its own localStorage key
// (kept in sync with the anti-FOUC script in index.html), defaulting to the OS
// setting until the user picks explicitly — mirrors the locale preference.

export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "ruzenec_theme";

export function systemTheme(): Theme {
  return typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function loadSavedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(THEME_STORAGE_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {}
  return null;
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
}

// Saved preference wins; otherwise follow the OS.
export const resolveTheme = (): Theme => loadSavedTheme() ?? systemTheme();

// Mystery accents are tuned for light backgrounds; the darker ones (deep red,
// green) read poorly as *text* on the dark card. Lighten the accent toward
// white for dark-theme text use (highlighted mystery clause, label chip).
// Solid fills — header, active bead, buttons, progress — keep the raw accent.
export function accentText(accent: string, theme: Theme): string {
  if (theme !== "dark") return accent;
  const m = /^#?([0-9a-fA-F]{6})$/.exec(accent);
  if (!m) return accent;
  const n = parseInt(m[1]!, 16);
  const amt = 0.42;
  const mix = (c: number) => Math.round(c + (255 - c) * amt);
  const r = mix((n >> 16) & 255), g = mix((n >> 8) & 255), b = mix(n & 255);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
