import { MAX_PLANS, PLANS_VERSION, loadPlans, newPlanId, sanitizePlan, savePlans, type Plan } from "./plans";
import { MAX_FAVORITES, loadFavorites, sanitizeFavorites, saveFavorites } from "./favorites";
import { loadSavedState, saveState, STATE_VERSION } from "./storage";
import type { MenuKey } from "./menu";
import { loadIntentions, sanitizeIntentions, saveIntentions, type Intentions } from "./intentions";

// --- Backup of everything the app keeps --------------------------------------
// It all lives only in this browser's localStorage (per origin), so clearing
// site data, changing phones or a new address loses it. A backup is a plain
// JSON file the user saves and later loads back; nothing leaves the device.
//
// The file keeps the shape of the old plans-only backup (`app`, `version`,
// `plans`), so an older copy of the app still reads its plans, and adds the
// starred prayers, the places kept in unfinished prayers and the preferences.

const BACKUP_APP = "latin-rosary";

// The preferences, each under its own key and validated by its own loader on
// the next launch, so they are carried as the raw strings. backup.test.ts
// checks that every `ruzenec_*` key in the source is here or handled above.
export const BACKUP_PREF_KEYS = [
  "ruzenec_look",
  "ruzenec_theme",
  "ruzenec_locale",
  "ruzenec_prayer_language",
  "ruzenec_font_size",
  "ruzenec_vibrate",
  "ruzenec_dim",
  "ruzenec_meditation",
  "ruzenec_chaplet_full",
  "ruzenec_hint_seen",
  "ruzenec_hint_jump_seen",
  "ruzenec_hint_keep_seen",
  "ruzenec_welcome_seen",
] as const;

// The keys whose data the backup carries structurally (above the prefs).
export const BACKUP_DATA_KEYS = ["ruzenec_plans", "ruzenec_favorites", "ruzenec_state", "ruzenec_intentions"] as const;

export type Backup = {
  plans: Plan[]; // with the ids they had, so kept places can follow them
  favorites: MenuKey[];
  progress: Record<string, number>;
  active: string | null;
  intentions: Intentions;
  prefs: Record<string, string>;
};

const MAX_PREF_LENGTH = 40;

export function exportBackup(): string {
  const prefs: Record<string, string> = {};
  for (const key of BACKUP_PREF_KEYS) {
    try {
      const v = localStorage.getItem(key);
      if (v !== null) prefs[key] = v;
    } catch {}
  }
  const state = loadSavedState();
  return JSON.stringify({
    app: BACKUP_APP,
    version: PLANS_VERSION,
    plans: loadPlans(),
    favorites: loadFavorites(),
    intentions: loadIntentions(),
    state: state ? { version: STATE_VERSION, active: state.active, progress: state.progress } : null,
    prefs,
  }, null, 2);
}

const isStep = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v > 0;

// A backup file, validated piece by piece: what is broken is dropped, the
// rest kept. Null if the file isn't a backup of this app at all. A plans-only
// backup of an older version reads as one with no other data.
export function parseBackup(json: string): Backup | null {
  try {
    const parsed = JSON.parse(json) as Record<string, unknown> | null;
    if (!parsed || parsed.app !== BACKUP_APP || parsed.version !== PLANS_VERSION || !Array.isArray(parsed.plans)) return null;
    const plans: Plan[] = [];
    parsed.plans.forEach((candidate, i) => {
      const id = (candidate as { id?: unknown } | null)?.id;
      const plan = sanitizePlan({ ...(candidate as object), id: typeof id === "string" && id ? id : `imported-${i}` });
      if (plan && !plans.some((p) => p.id === plan.id)) plans.push(plan);
    });
    const favorites = sanitizeFavorites(parsed.favorites);
    const progress: Record<string, number> = {};
    let active: string | null = null;
    const state = parsed.state as { version?: unknown; active?: unknown; progress?: unknown } | null | undefined;
    // A place counted in another version's sequences might not line up: only
    // a state of today's version is restored (as loadSavedState would).
    if (state && typeof state === "object" && state.version === STATE_VERSION) {
      if (state.progress && typeof state.progress === "object") {
        for (const [k, v] of Object.entries(state.progress)) if (k && isStep(v)) progress[k] = v;
      }
      if (typeof state.active === "string" && state.active) active = state.active;
    }
    const prefs: Record<string, string> = {};
    const rawPrefs = parsed.prefs as Record<string, unknown> | undefined;
    if (rawPrefs && typeof rawPrefs === "object") {
      for (const key of BACKUP_PREF_KEYS) {
        const v = Object.prototype.hasOwnProperty.call(rawPrefs, key) ? rawPrefs[key] : undefined;
        if (typeof v === "string" && v.length <= MAX_PREF_LENGTH) prefs[key] = v;
      }
    }
    return { plans, favorites, progress, active, intentions: sanitizeIntentions(parsed.intentions), prefs };
  } catch {
    return null;
  }
}

export type BackupSummary = { plans: number; favorites: number; places: number; intentions: number; prefs: boolean };

// What loading a backup into the current data would add: plans up to the
// limit, favourites not starred yet, places in prayers that have none here.
export function summarizeBackup(backup: Backup): BackupSummary {
  return mergeBackup(backup).summary;
}

// Loads a backup into this browser. It adds, never removes: its plans come in
// with fresh ids (a backup can't overwrite a local plan) up to the limit, its
// favourites after the ones starred here, and its places and intentions only
// in prayers that have none here (a plan's place follows the plan's new id). Its preferences
// replace the ones here: loading a backup on a new phone should bring them.
// The caller reloads the page, so every screen reads the new data.
export function applyBackup(backup: Backup): BackupSummary {
  const { plans, favorites, progress, active, intentions, summary } = mergeBackup(backup);
  savePlans(plans);
  saveFavorites(favorites);
  saveIntentions(intentions);
  saveState(active, progress);
  for (const [key, value] of Object.entries(backup.prefs)) {
    try { localStorage.setItem(key, value); } catch {}
  }
  return summary;
}

function mergeBackup(backup: Backup) {
  const plans = loadPlans();
  const idOf = new Map<string, string>();
  let added = 0;
  for (const plan of backup.plans) {
    if (plans.length >= MAX_PLANS) break;
    const id = newPlanId(plans);
    idOf.set(plan.id, id);
    plans.push({ ...plan, id });
    added++;
  }
  // A plan's key follows its new id; a place in a plan that didn't come in
  // (over the limit) is dropped.
  const remap = (key: string): string | null =>
    key.startsWith("plan:") ? (idOf.has(key.slice(5)) ? `plan:${idOf.get(key.slice(5))}` : null) : key;

  const local = loadFavorites();
  const favorites = [...local, ...backup.favorites.filter((k) => !local.includes(k))].slice(0, MAX_FAVORITES);

  const saved = loadSavedState();
  const progress = { ...(saved?.progress ?? {}) };
  let places = 0;
  for (const [k, step] of Object.entries(backup.progress)) {
    const key = remap(k);
    if (key && !(key in progress)) { progress[key] = step; places++; }
  }
  // Intentions like places: only for prayers without one here.
  const intentions = { ...loadIntentions() };
  let intentionsAdded = 0;
  for (const [k, text] of Object.entries(backup.intentions)) {
    const key = remap(k);
    if (key && !(key in intentions)) { intentions[key] = text; intentionsAdded++; }
  }
  const backupActive = backup.active ? remap(backup.active) : null;
  const active = saved?.active ?? backupActive;

  return {
    plans,
    favorites,
    progress,
    active,
    intentions,
    summary: {
      plans: added,
      favorites: favorites.length - local.length,
      places,
      intentions: intentionsAdded,
      prefs: Object.keys(backup.prefs).length > 0,
    },
  };
}
