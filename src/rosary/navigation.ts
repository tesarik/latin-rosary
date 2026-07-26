// Pure session/navigation logic, extracted from the Rosary orchestrator so it
// can be unit-tested without a DOM. Nothing here touches React or the browser:
// `resolveInitialState` takes an already-loaded SavedState, and the step-bounds
// predicate is a plain function. Rosary wires these to `localStorage` and state.

import { MYSTERIES, type MysteryKey } from "./prayers";
import {
  buildRosarySequence,
  OTHER_PRAYER_SETS,
  ORDINARY_PRAYERS,
  LITANIES,
  type OtherPrayerKey,
  type OrdinaryPrayerKey,
  type LitanyKey,
  type SequenceItem,
} from "./sequence";
import type { SavedState } from "./storage";

export type PrayerSetKey = MysteryKey | OtherPrayerKey | OrdinaryPrayerKey | LitanyKey;
export type PrayerSetKind = "rosary" | "linear" | "single";

// Own-property check, NOT `in`: `in` walks the prototype chain, so `"toString"`
// / `"constructor"` would falsely match a registry and a corrupt saved key
// could resolve to a prototype function (and crash `buildSequence`).
const has = (obj: object, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export const isRosaryKey = (k: PrayerSetKey): k is MysteryKey => has(MYSTERIES, k);
export const isOrdinaryKey = (k: PrayerSetKey): k is OrdinaryPrayerKey => has(ORDINARY_PRAYERS, k);
export const isLitanyKey = (k: PrayerSetKey): k is LitanyKey => has(LITANIES, k);

export function getPrayerSetMeta(key: PrayerSetKey): { name: string; color: string; kind: PrayerSetKind } {
  if (isRosaryKey(key)) {
    const m = MYSTERIES[key];
    return { name: m.name, color: m.color, kind: "rosary" };
  }
  if (isOrdinaryKey(key)) {
    const o = ORDINARY_PRAYERS[key];
    return { name: o.name, color: o.color, kind: "single" };
  }
  if (isLitanyKey(key)) {
    const o = LITANIES[key];
    return { name: o.name, color: o.color, kind: "single" };
  }
  const o = OTHER_PRAYER_SETS[key];
  return { name: o.name, color: o.color, kind: "linear" };
}

export function buildSequence(key: PrayerSetKey): SequenceItem[] {
  if (isRosaryKey(key)) return buildRosarySequence(MYSTERIES[key]);
  if (isOrdinaryKey(key)) return ORDINARY_PRAYERS[key].build();
  if (isLitanyKey(key)) return LITANIES[key].build();
  return OTHER_PRAYER_SETS[key].build();
}

// Only multi-step sets are worth persisting across reloads: the rosary and the
// linear devotions (Leonine, St. Bridget). Single-prayer sets (litanies,
// ordinary prayers) have no progress to resume, so they stay session-only.
export const isPersistableKey = (k: string): k is MysteryKey | OtherPrayerKey =>
  has(MYSTERIES, k) || has(OTHER_PRAYER_SETS, k);

// Turn a raw saved state into a ready-to-use initial state, or null if there's
// nothing to resume: no saved state, a key that's no longer a persistable set,
// or a step out of range for the current sequence (e.g. the sequence shrank
// without a STATE_VERSION bump).
export function resolveInitialState(
  saved: SavedState | null
): { key: PrayerSetKey; step: number; sequence: SequenceItem[] } | null {
  if (!saved || !isPersistableKey(saved.selectedSet)) return null;
  const sequence = buildSequence(saved.selectedSet);
  if (saved.currentStep < 0 || saved.currentStep >= sequence.length) return null;
  return { key: saved.selectedSet, step: saved.currentStep, sequence };
}

// A move is valid only if it lands on a real, different step. Used by next /
// prev / jumpTo so the ends of the sequence and no-op taps are rejected.
export const canGoToStep = (idx: number, currentStep: number, length: number): boolean =>
  idx >= 0 && idx < length && idx !== currentStep;
