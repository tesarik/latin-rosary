const STORAGE_KEY = "ruzenec_state";

// Bump on any structural change to the prayer sequence (or this schema) so stale
// saved progress is discarded cleanly instead of silently desyncing positions.
export const STATE_VERSION = 5;

// Version 4 stored a single `{ selectedSet, currentStep }`. Its sequences are
// identical to version 5's, so it is migrated rather than discarded — dropping
// it would lose every in-progress rosary on update.
const LEGACY_SINGLE_SESSION_VERSION = 4;

// `progress` holds the saved step of every multi-step set that was left
// unfinished, so praying something else in between never loses a place.
// `active` is the set that was open when the app closed, reopened on launch.
// Keys are stored as plain strings; the caller (navigation.resolveSession)
// validates them against the live registries and plans and rebuilds the
// sequences, so this module stays free of any dependency on the prayer data.
export type SavedState = {
  version: number;
  active: string | null;
  progress: Record<string, number>;
};

const isStep = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v >= 0;

export function loadSavedState(): SavedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Record<string, unknown> | null;
    if (!saved || typeof saved !== "object") return null;

    if (saved.version === LEGACY_SINGLE_SESSION_VERSION) {
      const { selectedSet, currentStep } = saved;
      if (typeof selectedSet !== "string" || !selectedSet || !isStep(currentStep)) return null;
      return { version: STATE_VERSION, active: selectedSet, progress: { [selectedSet]: currentStep } };
    }

    if (saved.version !== STATE_VERSION) return null;
    const active = typeof saved.active === "string" && saved.active ? saved.active : null;
    const progress: Record<string, number> = {};
    if (saved.progress && typeof saved.progress === "object") {
      for (const [k, v] of Object.entries(saved.progress)) {
        if (k && isStep(v)) progress[k] = v;
      }
    }
    return { version: STATE_VERSION, active, progress };
  } catch {}
  return null;
}

export function saveState(active: string | null, progress: Record<string, number>): void {
  try {
    if (active || Object.keys(progress).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, active, progress }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

export function clearSavedState(): void {
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
}
