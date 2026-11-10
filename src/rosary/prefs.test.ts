import { beforeEach, describe, expect, it } from "vitest";
import { loadDim, loadHintSeen, loadVibrate, loadWelcomeSeen, saveDim, saveHintSeen, saveVibrate, saveWelcomeSeen } from "./prefs";

const store = new Map<string, string>();
beforeEach(() => {
  store.clear();
  (globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
  };
});

describe("prayer-screen preferences", () => {
  it("default to vibration on, no dimming, hint not yet seen", () => {
    expect(loadVibrate()).toBe(true);
    expect(loadDim()).toBe(false);
    expect(loadHintSeen()).toBe(false);
  });

  it("round-trip each choice", () => {
    saveVibrate(false); saveDim(true); saveHintSeen();
    expect(loadVibrate()).toBe(false);
    expect(loadDim()).toBe(true);
    expect(loadHintSeen()).toBe(true);
  });

  it("show the welcome card to a newcomer until it is closed", () => {
    expect(loadWelcomeSeen()).toBe(false);
    saveWelcomeSeen();
    expect(loadWelcomeSeen()).toBe(true);
  });

  it("never welcome someone who has already prayed (the hint seen)", () => {
    saveHintSeen();
    expect(loadWelcomeSeen()).toBe(true);
  });

  it("fall back to the default on a stray value", () => {
    store.set("ruzenec_vibrate", "maybe");
    expect(loadVibrate()).toBe(true);
  });
});
