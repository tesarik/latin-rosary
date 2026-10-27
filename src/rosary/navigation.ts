// Pure session/navigation logic, extracted from the Rosary orchestrator so it
// can be unit-tested without a DOM. Nothing here touches React or the browser:
// `resolveSession` takes an already-loaded SavedState, and the step-bounds
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

// A key of one of the built-in prayer sets (not a user plan). Used for the
// `#pray=<key>` links from the static prayer pages.
export const isBuiltInKey = (k: string): k is MysteryKey | OtherPrayerKey | OrdinaryPrayerKey | LitanyKey =>
  has(MYSTERIES, k) || has(OTHER_PRAYER_SETS, k) || has(ORDINARY_PRAYERS, k) || has(LITANIES, k);

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

// Validate a raw saved state against the live registries and plans. Every
// progress entry must name a set that is still persistable (a deleted plan is
// not), at a step past the first and inside the current sequence (it may have
// shrunk, e.g. an edited plan); anything else is dropped. Step 0 is never kept:
// there is nothing to resume. `active` reopens the set that was on screen,
// at its saved step, or at the start if it had none.
export function resolveSession(
  saved: SavedState | null,
  plans: Plan[] = []
): {
  active: { key: PrayerSetKey; step: number; sequence: SequenceItem[] } | null;
  progress: Record<string, number>;
} {
  const progress: Record<string, number> = {};
  for (const [k, step] of Object.entries(saved?.progress ?? {})) {
    if (resumeStep(k, step, plans) !== null) progress[k] = step;
  }
  const key = saved?.active;
  if (!key || !isPersistableKey(key, plans)) return { active: null, progress };
  const step = has(progress, key) ? progress[key]! : 0;
  return { active: { key, step, sequence: buildSequence(key, plans) }, progress };
}

// The step to resume a set at, or null if a saved step is not worth resuming:
// a set that isn't persistable, the first step, or past the end of the
// sequence as it is built now.
export function resumeStep(key: string, step: number, plans: Plan[] = []): number | null {
  if (!isPersistableKey(key, plans) || step <= 0) return null;
  return step < buildSequence(key, plans).length ? step : null;
}

// A move is valid only if it lands on a real, different step. Used by next /
// prev / jumpTo so the ends of the sequence and no-op taps are rejected.
export const canGoToStep = (idx: number, currentStep: number, length: number): boolean =>
  idx >= 0 && idx < length && idx !== currentStep;
