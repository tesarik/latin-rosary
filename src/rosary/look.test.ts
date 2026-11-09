import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_LOOK, LOOKS, THEME_BAR_COLOR, ink, loadSavedLook, saveLook } from "./look";

const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    get length() { return store.size; },
    key: (i: number) => [...store.keys()][i] ?? null,
  };
});

describe("look", () => {
  it("defaults to Základ and round-trips each look", () => {
    expect(DEFAULT_LOOK).toBe("base");
    expect(loadSavedLook()).toBe("base");
    for (const l of LOOKS) {
      saveLook(l);
      expect(loadSavedLook()).toBe(l);
    }
  });

  it("treats a stray saved value as no choice", () => {
    store.set("ruzenec_look", "toString");
    expect(loadSavedLook()).toBe("base");
  });

  it("has a browser-bar colour for every look and theme", () => {
    for (const l of LOOKS) {
      expect(THEME_BAR_COLOR[l].light).toMatch(/^#[0-9A-F]{6}$/i);
      expect(THEME_BAR_COLOR[l].dark).toMatch(/^#[0-9A-F]{6}$/i);
    }
  });

  it("keeps a set's colour outside the missal", () => {
    // No document here, so the look is the default.
    expect(ink("#2E7D32")).toBe("#2E7D32");
  });
});
