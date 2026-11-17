import type { BrigitShortKey } from "./sequence";

// The "with the optional prayers" switch on the first step of St. Bridget's
// prayers: with it, the opening prayer and the seven meditations (`brigit`,
// the form the menu lists); without, only the seven Paters and Aves
// (`brigit-brevis`). Like the chaplet's (chaplet.ts): a UI preference under
// its own key, not versioned, kept across resets, off by default.
const BRIGIT_FULL_STORAGE_KEY = "ruzenec_brigit_full";

export type BrigitKey = "brigit" | BrigitShortKey;

export const isBrigitKey = (k: string): k is BrigitKey => k === "brigit" || k === "brigit-brevis";

export function loadSavedBrigitFull(): boolean {
  try {
    return localStorage.getItem(BRIGIT_FULL_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function saveBrigitFull(full: boolean): void {
  try {
    localStorage.setItem(BRIGIT_FULL_STORAGE_KEY, full ? "1" : "0");
  } catch {}
}

export const brigitKey = (full: boolean): BrigitKey => (full ? "brigit" : "brigit-brevis");

// The form opening St. Bridget's prayers starts: a kept place in either form
// wins over the switch (of two, the later in `kept`, the progress map's
// order); otherwise the switch decides.
export function brigitToOpen(full: boolean, kept: readonly string[]): BrigitKey {
  const last = kept.filter(isBrigitKey).at(-1);
  return last ?? brigitKey(full);
}
