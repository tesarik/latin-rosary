const STORAGE_KEY = "ruzenec_state";

// Bump on any structural change to the prayer sequence (or this schema) so stale
// saved progress is discarded cleanly instead of silently desyncing positions.
export const STATE_VERSION = 6;

// Older saves are migrated rather than discarded, which would lose every
// in-progress rosary on update. Version 4 stored a single
// `{ selectedSet, currentStep }`; version 5 has today's shape. In both, only
// user plans have a different sequence now (version 6 split the one-card
// litanies into sections, so a plan containing one got longer), so the places
// kept in plans are dropped and everything else carries over.
const V4_SINGLE_SESSION = 4;
const V5_PROGRESS_MAP = 5;
const isStalePlanKey = (k: string): boolean => k.startsWith("plan:");

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

    if (saved.version === V4_SINGLE_SESSION) {
      const { selectedSet, currentStep } = saved;
      if (typeof selectedSet !== "string" || !selectedSet || !isStep(currentStep)) return null;
      if (isStalePlanKey(selectedSet)) return null;
      return { version: STATE_VERSION, active: selectedSet, progress: { [selectedSet]: currentStep } };
    }

    const migrating = saved.version === V5_PROGRESS_MAP;
    if (saved.version !== STATE_VERSION && !migrating) return null;
    let active = typeof saved.active === "string" && saved.active ? saved.active : null;
    if (migrating && active && isStalePlanKey(active)) active = null;
    const progress: Record<string, number> = {};
    if (saved.progress && typeof saved.progress === "object") {
      for (const [k, v] of Object.entries(saved.progress)) {
        if (k && isStep(v) && !(migrating && isStalePlanKey(k))) progress[k] = v;
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
