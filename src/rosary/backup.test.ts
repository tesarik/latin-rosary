import { describe, it, expect, beforeEach } from "vitest";
import { BACKUP_DATA_KEYS, BACKUP_PREF_KEYS, applyBackup, exportBackup, parseBackup, summarizeBackup } from "./backup";
import { loadPlans, savePlans, type Plan } from "./plans";
import { loadFavorites, saveFavorites } from "./favorites";
import { loadSavedState, saveState, STATE_VERSION } from "./storage";

// The test environment is node, with no localStorage: a minimal in-memory one.
const store = new Map<string, string>();
globalThis.localStorage = {
  getItem: (k: string) => store.get(k) ?? null,
  setItem: (k: string, v: string) => void store.set(k, v),
  removeItem: (k: string) => void store.delete(k),
  clear: () => store.clear(),
  key: () => null,
  get length() { return store.size; },
} as Storage;

const plans: Plan[] = [
  { id: "p1", name: "Ráno", steps: [{ key: "angelus", repeat: 1 }] },
  {
    id: "p2",
    name: "Večer",
    steps: [{ key: "loreto", repeat: 1 }, { key: "custom:c1", repeat: 1 }],
    custom: [{ id: "c1", title: "Za rodinu", text: "Amen." }],
  },
];

describe("the backup", () => {
  beforeEach(() => store.clear());

  it("carries the plans, favourites, kept places and settings", () => {
    savePlans(plans);
    saveFavorites(["angelus", "loreto"]);
    saveState("radostny", { radostny: 23, "plan:p2": 3 });
    store.set("ruzenec_look", "missal");
    store.set("ruzenec_prayer_language", "both");
    const backup = parseBackup(exportBackup())!;
    expect(backup.plans).toEqual(plans);
    expect(backup.favorites).toEqual(["angelus", "loreto"]);
    expect(backup.progress).toEqual({ radostny: 23, "plan:p2": 3 });
    expect(backup.active).toBe("radostny");
    expect(backup.prefs).toEqual({ ruzenec_look: "missal", ruzenec_prayer_language: "both" });
  });

  it("restores everything into an empty browser, a plan's place following its new id", () => {
    savePlans(plans);
    saveFavorites(["angelus"]);
    saveState("plan:p2", { radostny: 23, "plan:p2": 3 });
    store.set("ruzenec_theme", "dark");
    const json = exportBackup();
    store.clear();
    expect(applyBackup(parseBackup(json)!)).toEqual({ plans: 2, favorites: 1, places: 2, prefs: true });
    const restored = loadPlans();
    expect(restored.map((p) => p.name)).toEqual(["Ráno", "Večer"]);
    const evening = restored.find((p) => p.name === "Večer")!;
    const state = loadSavedState()!;
    expect(state.progress).toEqual({ radostny: 23, [`plan:${evening.id}`]: 3 });
    expect(state.active).toBe(`plan:${evening.id}`);
    expect(loadFavorites()).toEqual(["angelus"]);
    expect(store.get("ruzenec_theme")).toBe("dark");
  });

  it("adds to what is here and never removes or overwrites it", () => {
    savePlans([plans[0]!]);
    saveFavorites(["loreto"]);
    saveState("bolestny", { bolestny: 5, radostny: 40 });
    const backup = parseBackup(JSON.stringify({
      app: "latin-rosary", version: 1, plans: [plans[1]],
      favorites: ["angelus", "loreto"],
      state: { version: STATE_VERSION, active: "radostny", progress: { radostny: 23, slavny: 9 } },
    }))!;
    expect(summarizeBackup(backup)).toEqual({ plans: 1, favorites: 1, places: 1, prefs: false });
    applyBackup(backup);
    expect(loadPlans().map((p) => p.name)).toEqual(["Ráno", "Večer"]);
    expect(new Set(loadPlans().map((p) => p.id)).size).toBe(2);
    expect(loadFavorites()).toEqual(["loreto", "angelus"]);
    // The place here wins; the set open here stays the one reopened.
    expect(loadSavedState()).toEqual({ version: STATE_VERSION, active: "bolestny", progress: { bolestny: 5, radostny: 40, slavny: 9 } });
  });

  it("still reads a plans-only backup of an older version", () => {
    const backup = parseBackup(JSON.stringify({ app: "latin-rosary", version: 1, plans }))!;
    expect(backup.plans.map((p) => p.name)).toEqual(["Ráno", "Večer"]);
    expect(backup.favorites).toEqual([]);
    expect(backup.progress).toEqual({});
    expect(backup.prefs).toEqual({});
  });

  it("rejects anything that isn't a backup of this app", () => {
    expect(parseBackup("not json")).toBeNull();
    expect(parseBackup(JSON.stringify({ plans }))).toBeNull();
    expect(parseBackup(JSON.stringify({ app: "other", version: 1, plans }))).toBeNull();
  });

  it("drops what is broken and keeps the rest", () => {
    const backup = parseBackup(JSON.stringify({
      app: "latin-rosary", version: 1,
      plans: [plans[0], { name: "", steps: [] }, null],
      favorites: ["angelus", "toString", 7],
      state: { version: STATE_VERSION, active: 5, progress: { radostny: 0, slavny: -1, bolestny: 3, "": 4 } },
      prefs: { ruzenec_look: "paper", ruzenec_unknown: "x", ruzenec_theme: 1, toString: "x" },
    }))!;
    expect(backup.plans.map((p) => p.name)).toEqual(["Ráno"]);
    expect(backup.favorites).toEqual(["angelus"]);
    expect(backup.progress).toEqual({ bolestny: 3 });
    expect(backup.active).toBeNull();
    expect(backup.prefs).toEqual({ ruzenec_look: "paper" });
  });

  it("ignores places counted in another version's sequences", () => {
    const backup = parseBackup(JSON.stringify({
      app: "latin-rosary", version: 1, plans: [],
      state: { version: STATE_VERSION - 1, active: "radostny", progress: { radostny: 23 } },
    }))!;
    expect(backup.progress).toEqual({});
  });

  it("covers every key the app stores", () => {
    // Every module's source, as text (Vite's glob import).
    const sources = import.meta.glob<string>(["./*.ts", "./*.tsx", "!./*.test.*"], { query: "?raw", import: "default", eager: true });
    const keys = new Set<string>();
    for (const src of Object.values(sources)) {
      for (const m of src.matchAll(/"(ruzenec_[a-z_]+)"/g)) keys.add(m[1]!);
    }
    expect(keys.size).toBeGreaterThan(10);
    const covered = new Set<string>([...BACKUP_PREF_KEYS, ...BACKUP_DATA_KEYS]);
    expect([...keys].filter((k) => !covered.has(k))).toEqual([]);
  });
});
