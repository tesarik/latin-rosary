import type { CSSProperties } from "react";
import { accentText, type Theme } from "./theme";

// The app's look, chosen in the settings, each in a light and a dark theme:
//   base   — Základ / Basic: the look up to 0.30: cool greys, Arial names, a
//            solid header bar of the set's colour, cards with a soft shadow.
//   paper  — Papír / Paper: warm paper, Garamond names with italic
//            translations, red small-capital headings, flat cards.
//   missal — Misál / Missal: a white page, black and red only — every set's
//            colour becomes the rubric red — and rules instead of boxes.
// The palette and the type live in index.css under `data-look` on <html>
// (set early by the inline script in index.html); this module keeps the
// current look for the few things CSS can't reach: the set colours, which are
// raw hex strings in JS (`ink`), and the prayer header, which is built
// differently in each look (`headerStyles`). Persisted under its own key.
export type Look = "base" | "paper" | "missal";
export const LOOKS: readonly Look[] = ["base", "paper", "missal"];
export const DEFAULT_LOOK: Look = "paper";

const LOOK_STORAGE_KEY = "ruzenec_look";

// With no look saved yet, someone who has used the app before (anything of
// ours in storage) keeps the look they know, Základ; a newcomer gets Papír.
// The choice is saved at once, so it is made only on the first launch of a
// version with looks. index.html's pre-paint script does the same.
export function loadSavedLook(): Look {
  try {
    const v = localStorage.getItem(LOOK_STORAGE_KEY);
    if (v === "base" || v === "paper" || v === "missal") return v;
    let returning = false;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.startsWith("ruzenec_")) { returning = true; break; }
    }
    const look: Look = returning ? "base" : DEFAULT_LOOK;
    localStorage.setItem(LOOK_STORAGE_KEY, look);
    return look;
  } catch {}
  return DEFAULT_LOOK;
}

export function saveLook(look: Look): void {
  try {
    localStorage.setItem(LOOK_STORAGE_KEY, look);
  } catch {}
}

let current: Look = typeof document !== "undefined" ? lookOf(document.documentElement.dataset.look) : DEFAULT_LOOK;

function lookOf(v: string | undefined): Look {
  return v === "base" || v === "paper" || v === "missal" ? v : DEFAULT_LOOK;
}

export const currentLook = (): Look => current;

// The browser's bar (Android's status bar, the installed app's title bar)
// takes the page's background. Keep in step with --bg in index.css and, for
// the default look, theme-color in index.html and the manifest.
export const THEME_BAR_COLOR: Record<Look, Record<Theme, string>> = {
  base: { light: "#ECEFF1", dark: "#101216" },
  paper: { light: "#F2ECE0", dark: "#14120F" },
  missal: { light: "#FFFFFF", dark: "#0B0B0B" },
};

export function applyBarColor(theme: Theme): void {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BAR_COLOR[current][theme]);
}

export function applyLook(look: Look, theme: Theme): void {
  current = look;
  document.documentElement.dataset.look = look;
  applyBarColor(theme);
}

// The missal's red — every set's colour in the missal look. Raw, like the
// other set colours: `accentText` lightens it for text on the dark page.
export const MISSAL_RED = "#C0141C";

// A set's colour as the current look shows it.
export const ink = (color: string): string => (current === "missal" ? MISSAL_RED : color);

// The tinted square behind a line symbol: none in the missal, where the
// symbol stands in red on the page.
export const iconBg = (color: string): string => (current === "missal" ? "transparent" : ink(color) + "18");

// The prayer header in each look. `accent` is the set's colour (already
// through `ink`); `ruled` asks for the rule under the header, which the
// rosary leaves to its progress bar.
export function headerStyles(accent: string, theme: Theme, ruled: boolean) {
  const text = accentText(accent, theme);
  if (current === "base") {
    return {
      bar: { background: accent } as CSSProperties,
      button: { background: "rgba(255,255,255,0.2)", color: "white" } as CSSProperties,
      buttonOn: { background: "white", color: accent } as CSSProperties,
      name: { color: "white", fontFamily: "Arial, sans-serif", fontSize: 20, lineHeight: 1.25 } as CSSProperties,
      toggle: { wrap: "rgba(255,255,255,0.2)", wrapBorder: "none", on: "white", onInk: accent, offInk: "rgba(255,255,255,0.85)" },
    };
  }
  if (current === "missal") {
    return {
      bar: { background: "var(--surface)", borderBottom: ruled ? `3px double ${accent}` : "none" } as CSSProperties,
      button: { background: "transparent", color: "var(--text-strong)", boxShadow: "inset 0 0 0 1px var(--text-strong)" } as CSSProperties,
      buttonOn: { background: "var(--text-strong)", color: "var(--surface)" } as CSSProperties,
      name: { color: "var(--text-strong)", fontFamily: "var(--name-font)", fontSize: 25, lineHeight: 1.15 } as CSSProperties,
      toggle: { wrap: "transparent", wrapBorder: "1px solid var(--text-strong)", on: "var(--text-strong)", onInk: "var(--surface)", offInk: "var(--text-strong)" },
    };
  }
  return {
    bar: { background: "var(--surface)", borderBottom: ruled ? `3px solid ${accent}` : "none" } as CSSProperties,
    button: { background: accent + "1c", color: text } as CSSProperties,
    buttonOn: { background: accent, color: "white" } as CSSProperties,
    name: { color: "var(--text-strong)", fontFamily: "var(--name-font)", fontSize: 25, lineHeight: 1.15 } as CSSProperties,
    toggle: { wrap: accent + "1c", wrapBorder: "none", on: accent, onInk: "white", offInk: text },
  };
}
