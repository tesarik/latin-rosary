import { describe, it, expect, beforeEach } from "vitest";
import { loadSavedState, saveState, clearSavedState, STATE_VERSION } from "./storage";

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

const put = (v: unknown) => store.set("ruzenec_state", JSON.stringify(v));

describe("storage", () => {
  beforeEach(() => store.clear());

  it("round-trips the open set and the progress map", () => {
    saveState("radostny", { radostny: 23, leonine: 2 });
    expect(loadSavedState()).toEqual({ version: STATE_VERSION, active: "radostny", progress: { radostny: 23, leonine: 2 } });
  });

  it("removes the key when there is nothing to keep", () => {
    saveState("radostny", {});
    saveState(null, {});
    expect(store.has("ruzenec_state")).toBe(false);
  });

  it("migrates a version 4 single session instead of discarding it", () => {
    put({ version: 4, selectedSet: "slavny", currentStep: 40 });
    expect(loadSavedState()).toEqual({ version: STATE_VERSION, active: "slavny", progress: { slavny: 40 } });
  });

  it("migrates version 5, dropping only the places kept in plans", () => {
    put({ version: 5, active: "plan:abc", progress: { radostny: 30, "plan:abc": 4, leonine: 2 } });
    expect(loadSavedState()).toEqual({ version: STATE_VERSION, active: null, progress: { radostny: 30, leonine: 2 } });
  });

  it("discards older versions and malformed data", () => {
    put({ version: 3, selectedSet: "slavny", currentStep: 40 });
    expect(loadSavedState()).toBeNull();
    store.set("ruzenec_state", "{not json");
    expect(loadSavedState()).toBeNull();
  });

  it("drops progress entries that aren't non-negative integers", () => {
    put({ version: STATE_VERSION, active: 7, progress: { a: 3, b: -1, c: 1.5, d: "4" } });
    expect(loadSavedState()).toEqual({ version: STATE_VERSION, active: null, progress: { a: 3 } });
  });

  it("clears", () => {
    saveState("radostny", { radostny: 1 });
    clearSavedState();
    expect(loadSavedState()).toBeNull();
  });
});
