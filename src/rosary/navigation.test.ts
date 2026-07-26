import { describe, it, expect } from "vitest";
import {
  isPersistableKey,
  resolveInitialState,
  canGoToStep,
  buildSequence,
  getPrayerSetMeta,
} from "./navigation";
import { STATE_VERSION, type SavedState } from "./storage";
import { MYSTERIES } from "./prayers";
import { OTHER_PRAYER_SETS, ORDINARY_PRAYERS, LITANIES } from "./sequence";

const saved = (selectedSet: string, currentStep: number): SavedState => ({
  version: STATE_VERSION,
  selectedSet,
  currentStep,
});

describe("isPersistableKey", () => {
  it("accepts every rosary mystery set", () => {
    for (const k of Object.keys(MYSTERIES)) expect(isPersistableKey(k)).toBe(true);
  });

  it("accepts every linear devotion", () => {
    for (const k of Object.keys(OTHER_PRAYER_SETS)) expect(isPersistableKey(k)).toBe(true);
  });

  it("rejects single-prayer sets (litanies + ordinaries)", () => {
    for (const k of Object.keys(ORDINARY_PRAYERS)) expect(isPersistableKey(k)).toBe(false);
    for (const k of Object.keys(LITANIES)) expect(isPersistableKey(k)).toBe(false);
  });

  it("rejects unknown / garbage keys", () => {
    expect(isPersistableKey("")).toBe(false);
    expect(isPersistableKey("nope")).toBe(false);
    expect(isPersistableKey("constructor")).toBe(false);
    expect(isPersistableKey("toString")).toBe(false);
  });
});

describe("resolveInitialState", () => {
  it("returns null when there's nothing saved", () => {
    expect(resolveInitialState(null)).toBeNull();
  });

  it("resumes a valid rosary position with a rebuilt sequence", () => {
    const res = resolveInitialState(saved("radostny", 5));
    expect(res).not.toBeNull();
    expect(res!.key).toBe("radostny");
    expect(res!.step).toBe(5);
    expect(res!.sequence.length).toBe(74);
  });

  it("resumes a linear devotion", () => {
    const res = resolveInitialState(saved("brigit", 3));
    expect(res).not.toBeNull();
    expect(res!.key).toBe("brigit");
    expect(res!.sequence.length).toBe(buildSequence("brigit").length);
  });

  it("rejects a non-persistable key even if saved", () => {
    expect(resolveInitialState(saved("loreto", 0))).toBeNull();
    expect(resolveInitialState(saved("pater_noster", 0))).toBeNull();
  });

  it("rejects a step past the end of the (possibly shrunk) sequence", () => {
    const len = buildSequence("radostny").length;
    expect(resolveInitialState(saved("radostny", len))).toBeNull();
    expect(resolveInitialState(saved("radostny", len + 100))).toBeNull();
  });

  it("accepts the last valid step but not one beyond it", () => {
    const len = buildSequence("slavny").length;
    expect(resolveInitialState(saved("slavny", len - 1))).not.toBeNull();
    expect(resolveInitialState(saved("slavny", len))).toBeNull();
  });

  it("rejects a negative step", () => {
    expect(resolveInitialState(saved("radostny", -1))).toBeNull();
  });
});

describe("canGoToStep", () => {
  const LEN = 74;

  it("allows a move to a different in-range step", () => {
    expect(canGoToStep(5, 4, LEN)).toBe(true);
    expect(canGoToStep(0, 1, LEN)).toBe(true);
    expect(canGoToStep(LEN - 1, LEN - 2, LEN)).toBe(true);
  });

  it("rejects moving past the last step (next at the end)", () => {
    expect(canGoToStep(LEN, LEN - 1, LEN)).toBe(false);
  });

  it("rejects moving before the first step (prev at the start)", () => {
    expect(canGoToStep(-1, 0, LEN)).toBe(false);
  });

  it("rejects a no-op move to the current step", () => {
    expect(canGoToStep(3, 3, LEN)).toBe(false);
  });

  it("handles a single-step sequence (no valid moves)", () => {
    expect(canGoToStep(1, 0, 1)).toBe(false);
    expect(canGoToStep(-1, 0, 1)).toBe(false);
    expect(canGoToStep(0, 0, 1)).toBe(false);
  });
});

describe("getPrayerSetMeta", () => {
  it("classifies each registry into the right kind", () => {
    expect(getPrayerSetMeta("radostny").kind).toBe("rosary");
    expect(getPrayerSetMeta("leonine").kind).toBe("linear");
    expect(getPrayerSetMeta("brigit").kind).toBe("linear");
    expect(getPrayerSetMeta("pater_noster").kind).toBe("single");
    expect(getPrayerSetMeta("loreto").kind).toBe("single");
  });
});
