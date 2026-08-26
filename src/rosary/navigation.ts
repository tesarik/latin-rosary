// Pure session/navigation logic, extracted from the Rosary orchestrator so it
// can be unit-tested without a DOM. Nothing here touches React or the browser:
// `resolveInitialState` takes an already-loaded SavedState, and the step-bounds
// predicate is a plain function. Rosary wires these to `localStorage` and state.
//
// User-defined plans aren't a static registry — they're loaded from storage and
// can be edited or deleted — so the functions that need them take the current
// plan list as an argument rather than reaching for it themselves.

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
import {
  buildPlanSequence,
  findPlan,
  isPlanKey,
  PLAN_COLOR,
  type Plan,
  type PlanSetKey,
} from "./plans";
import type { SavedState } from "./storage";

export type PrayerSetKey = MysteryKey | OtherPrayerKey | OrdinaryPrayerKey | LitanyKey | PlanSetKey;
export type PrayerSetKind = "rosary" | "linear" | "single";

// Own-property check, NOT `in`: `in` walks the prototype chain, so `"toString"`
// / `"constructor"` would falsely match a registry and a corrupt saved key
// could resolve to a prototype function (and crash `buildSequence`).
const has = (obj: object, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export const isRosaryKey = (k: PrayerSetKey): k is MysteryKey => has(MYSTERIES, k);
export const isOrdinaryKey = (k: PrayerSetKey): k is OrdinaryPrayerKey => has(ORDINARY_PRAYERS, k);
export const isLitanyKey = (k: PrayerSetKey): k is LitanyKey => has(LITANIES, k);

export function getPrayerSetMeta(
  key: PrayerSetKey,
  plans: Plan[] = []
): { name: string; color: string; kind: PrayerSetKind } {
  if (isPlanKey(key)) {
    // A plan deleted mid-session leaves no name; callers gate on the sequence
    // being non-empty, so this is a display fallback rather than a live state.
    return { name: findPlan(plans, key)?.name ?? "", color: PLAN_COLOR, kind: "linear" };
  }
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
    return { name: o.name, color: o.color, kind: o.kind ?? "single" };
  }
  const o = OTHER_PRAYER_SETS[key];
  return { name: o.name, color: o.color, kind: "linear" };
}

export function buildSequence(key: PrayerSetKey, plans: Plan[] = []): SequenceItem[] {
  if (isPlanKey(key)) {
    const plan = findPlan(plans, key);
    return plan ? buildPlanSequence(plan) : [];
  }
  if (isRosaryKey(key)) return buildRosarySequence(MYSTERIES[key]);
  if (isOrdinaryKey(key)) return ORDINARY_PRAYERS[key].build();
  if (isLitanyKey(key)) return LITANIES[key].build();
  return OTHER_PRAYER_SETS[key].build();
}

// Only multi-step sets are worth persisting across reloads: the rosary, the
// linear devotions (Leonine, St. Bridget), any litany that declares itself
// linear (the Litany of the Saints), and a user plan that still exists. Single-
// prayer sets — the ordinary prayers and the one-card litanies — have no
// progress to resume, so they stay session-only.
export const isPersistableKey = (
  k: string,
  plans: Plan[] = []
): k is MysteryKey | OtherPrayerKey | LitanyKey | PlanSetKey =>
  has(MYSTERIES, k) ||
  has(OTHER_PRAYER_SETS, k) ||
  (has(LITANIES, k) && LITANIES[k as LitanyKey].kind === "linear") ||
  (isPlanKey(k) && !!findPlan(plans, k));

// Turn a raw saved state into a ready-to-use initial state, or null if there's
// nothing to resume: no saved state, a key that's no longer a persistable set
// (a deleted plan included), or a step out of range for the current sequence
// (e.g. the sequence shrank without a STATE_VERSION bump).
export function resolveInitialState(
  saved: SavedState | null,
  plans: Plan[] = []
): { key: PrayerSetKey; step: number; sequence: SequenceItem[] } | null {
  if (!saved || !isPersistableKey(saved.selectedSet, plans)) return null;
  const sequence = buildSequence(saved.selectedSet, plans);
  if (saved.currentStep < 0 || saved.currentStep >= sequence.length) return null;
  return { key: saved.selectedSet, step: saved.currentStep, sequence };
}

// A move is valid only if it lands on a real, different step. Used by next /
// prev / jumpTo so the ends of the sequence and no-op taps are rejected.
export const canGoToStep = (idx: number, currentStep: number, length: number): boolean =>
  idx >= 0 && idx < length && idx !== currentStep;
