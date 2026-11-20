import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_UI_SCALE, loadUiScale, saveUiScale } from "./uiScale";

const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
});

describe("the app's text size", () => {
  it("is the normal size until chosen", () => {
    expect(loadUiScale()).toBe(DEFAULT_UI_SCALE);
  });

  it("round-trips each step, and the default leaves nothing stored", () => {
    saveUiScale(2);
    expect(loadUiScale()).toBe(2);
    saveUiScale(1);
    expect(loadUiScale()).toBe(1);
    saveUiScale(0);
    expect(store.has("ruzenec_ui_scale")).toBe(false);
  });

  it("ignores a stray value", () => {
    for (const v of ["3", "-1", "1.5", "big", ""]) {
      store.set("ruzenec_ui_scale", v);
      expect(loadUiScale()).toBe(DEFAULT_UI_SCALE);
    }
  });
});
