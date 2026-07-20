const STORAGE_KEY = "ruzenec_state";

// Bump on any structural change to the prayer sequence (or this schema) so stale
// saved progress is discarded cleanly instead of silently desyncing positions.
export const STATE_VERSION = 4;

// The saved set key is stored as a plain string; the caller (Rosary) validates
// it against the live prayer-set registries and rebuilds the sequence, so this
// module stays free of any dependency on the prayer data.
export type SavedState = {
  version: number;
  selectedSet: string;
  currentStep: number;
};

export function loadSavedState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<SavedState>;
    if (saved.version !== STATE_VERSION) return null;
    if (typeof saved.selectedSet !== "string" || !saved.selectedSet) return null;
    if (typeof saved.currentStep !== "number" || saved.currentStep < 0) return null;
    return { version: STATE_VERSION, selectedSet: saved.selectedSet, currentStep: saved.currentStep };
  } catch {}
  return null;
}

export function saveState(selectedSet: string | null, currentStep: number): void {
  try {
    if (selectedSet) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, selectedSet, currentStep }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}
