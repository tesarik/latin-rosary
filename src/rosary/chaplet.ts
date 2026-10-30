import type { ChapletKey } from "./sequence";

// The start screen's "with the optional prayers" switch under the Chaplet of
// Divine Mercy. A UI preference like the theme or text size: its own key, not
// versioned, kept across resets. Off (the prescribed prayers only) by default.
const CHAPLET_FULL_STORAGE_KEY = "ruzenec_chaplet_full";

export function loadSavedChapletFull(): boolean {
  try {
    return localStorage.getItem(CHAPLET_FULL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveChapletFull(full: boolean): void {
  try {
    localStorage.setItem(CHAPLET_FULL_STORAGE_KEY, full ? "1" : "0");
  } catch {}
}

export const chapletKey = (full: boolean): ChapletKey => (full ? "misericordia-plena" : "misericordia");

// The form a tap on the chaplet opens. A kept place wins over the switch, so
// flipping it never strands a half-prayed chaplet: of two kept places, the
// later in `kept` (the progress map's order: most recent last). Otherwise the
// switch decides.
export function chapletToOpen(full: boolean, kept: readonly string[]): ChapletKey {
  const last = kept.filter((k) => k === "misericordia" || k === "misericordia-plena").at(-1);
  return (last as ChapletKey | undefined) ?? chapletKey(full);
}
