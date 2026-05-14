import { MYSTERIES, type MysteryKey } from "./prayers";
import { buildRosarySequence } from "./sequence";

const STORAGE_KEY = "ruzenec_state";

// Bump on any structural change to the prayer sequence so stale saved progress
// is discarded cleanly instead of silently desyncing the bead positions.
export const STATE_VERSION = 3;

export type SavedState = {
  version: number;
  selectedMystery: MysteryKey;
  currentStep: number;
};

export function loadSavedState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<SavedState>;
    if (saved.version !== STATE_VERSION) return null;
    if (!saved.selectedMystery || !(saved.selectedMystery in MYSTERIES)) return null;
    const seqLen = buildRosarySequence(MYSTERIES[saved.selectedMystery]).length;
    if (typeof saved.currentStep !== "number" || saved.currentStep < 0 || saved.currentStep >= seqLen) return null;
    return {
      version: saved.version,
      selectedMystery: saved.selectedMystery,
      currentStep: saved.currentStep,
    };
  } catch {}
  return null;
}

export function saveState(selectedMystery: MysteryKey | null, currentStep: number): void {
  try {
    if (selectedMystery) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, selectedMystery, currentStep }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}
