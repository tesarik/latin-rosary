import { beforeEach, describe, expect, it } from "vitest";
import { HINT_JUMP_FROM, HINT_KEEP_FROM, hintToShow, loadDim, loadHintsSeen, loadHintSeen, loadVibrate, loadWelcomeSeen, saveDim, saveHintDone, saveHintSeen, saveVibrate, saveWelcomeSeen } from "./prefs";

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

describe("the prayer screen's hints", () => {
  const none = { step: false, jump: false, keep: false };
  const rosary = (step: number) => ({ kind: "rosary" as const, persistable: true, step, length: 74 });

  it("start with how to step, on the very first step", () => {
    expect(hintToShow(none, rosary(0))).toBe("step");
  });

  it("then the jump, a few steps in, only where there are beads", () => {
    const seen = { ...none, step: true };
    expect(hintToShow(seen, rosary(HINT_JUMP_FROM - 1))).toBeNull();
    expect(hintToShow(seen, rosary(HINT_JUMP_FROM))).toBe("jump");
    expect(hintToShow(seen, { kind: "single", persistable: false, step: 0, length: 1 })).toBeNull();
  });

  it("then that the place is kept, further on, only in a set that keeps one", () => {
    const seen = { step: true, jump: true, keep: false };
    expect(hintToShow(seen, rosary(HINT_KEEP_FROM - 1))).toBeNull();
    expect(hintToShow(seen, rosary(HINT_KEEP_FROM))).toBe("keep");
    expect(hintToShow(seen, { ...rosary(HINT_KEEP_FROM), persistable: false })).toBeNull();
  });

  it("never on the last step, nor once all are seen", () => {
    expect(hintToShow({ ...none, step: true }, rosary(73))).toBeNull();
    expect(hintToShow({ step: true, jump: true, keep: true }, rosary(20))).toBeNull();
  });

  it("remember each one closed", () => {
    saveHintDone("jump");
    expect(loadHintsSeen()).toEqual({ step: false, jump: true, keep: false });
    saveHintDone("step"); saveHintDone("keep");
    expect(loadHintsSeen()).toEqual({ step: true, jump: true, keep: true });
  });
});
