// User-defined prayer plans: a named, ordered list of prayers the user picks
// from the *Orationes utilissimæ* and the litanies, prayed as one linear set.
// The rosary and the linear devotions (Leonine, St. Bridget) are deliberately
// NOT selectable — a plan strings together short prayers; nesting a 74-step
// rosary inside one would lose the bead ring that makes it a rosary.
//
// Plans live under their OWN localStorage key, not inside `ruzenec_state`:
// that key is discarded on every STATE_VERSION bump and cleared on reset, which
// is right for an in-progress position but would silently destroy user data.
// Hence a separate PLANS_VERSION, bumped only when this shape changes.
//
// Nothing here touches React; the DOM appears only in the share helpers, which
// read `location`. Covered by plans.test.ts.

import {
  ORDINARY_PRAYERS,
  LITANIES,
  type OrdinaryPrayerKey,
  type LitanyKey,
  type SequenceItem,
} from "./sequence";

// What a plan may contain: any ordinary prayer or any litany.
export type PlanItemKey = OrdinaryPrayerKey | LitanyKey;
export type PlanStep = { key: PlanItemKey; repeat: number };
export type Plan = { id: string; name: string; steps: PlanStep[] };

// A plan's prayer-set key is prefixed so it can never collide with a registry
// key (see navigation.PrayerSetKey).
export type PlanSetKey = `plan:${string}`;

export const PLANS_VERSION = 1;

// Shared accent for every plan — a plan has no liturgical color of its own, and
// a per-plan color picker would be chrome the editor doesn't need.
export const PLAN_COLOR = "#00695C";

export const MAX_PLANS = 20;
export const MAX_PLAN_STEPS = 30;
export const MAX_REPEAT = 15;
export const MAX_PLAN_NAME = 40;
// Hard ceiling on the *built* sequence, so a hand-crafted share link can't hand
// the bead strand a thousand beads. Steps past it are dropped on load.
export const MAX_PLAN_LENGTH = 200;

const PLANS_STORAGE_KEY = "ruzenec_plans";
const ID_RE = /^[a-z0-9]{1,24}$/;
const PLAN_PREFIX = "plan:";

// Own-property check, NOT `in` — same reason as navigation.ts: a corrupt or
// hostile key like "toString" must not resolve to a prototype member.
const has = (obj: object, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export const isPlanItemKey = (k: string): k is PlanItemKey =>
  has(ORDINARY_PRAYERS, k) || has(LITANIES, k);

const planEntry = (k: PlanItemKey) =>
  has(ORDINARY_PRAYERS, k)
    ? ORDINARY_PRAYERS[k as OrdinaryPrayerKey]
    : LITANIES[k as LitanyKey];

export const planItemName = (k: PlanItemKey): string => planEntry(k).name;

// The two groups the editor's prayer picker offers, each sorted by name.
const byName = <K extends PlanItemKey>(keys: K[], reg: Record<K, { name: string }>): K[] =>
  [...keys].sort((a, b) => reg[a].name.localeCompare(reg[b].name));

export const PLAN_ITEM_GROUPS: { title: string; keys: PlanItemKey[] }[] = [
  {
    title: "Orationes utilissimæ",
    keys: byName(Object.keys(ORDINARY_PRAYERS) as OrdinaryPrayerKey[], ORDINARY_PRAYERS),
  },
  {
    title: "Litaníæ",
    keys: byName(Object.keys(LITANIES) as LitanyKey[], LITANIES),
  },
];

export const isPlanKey = (k: string): k is PlanSetKey => k.startsWith(PLAN_PREFIX);
export const planKeyOf = (id: string): PlanSetKey => `${PLAN_PREFIX}${id}`;
export const planIdOf = (k: PlanSetKey): string => k.slice(PLAN_PREFIX.length);

export const findPlan = (plans: Plan[], key: PlanSetKey): Plan | null =>
  plans.find((p) => p.id === planIdOf(key)) ?? null;

// Validate anything claiming to be a plan — parsed JSON from localStorage or a
// decoded share link. Unknown / prototype step keys are dropped, repeats are
// clamped, and a plan left with no steps is rejected outright rather than
// resurfacing as an unprayable empty set.
export function sanitizePlan(raw: unknown): Plan | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Partial<Plan>;
  if (typeof p.id !== "string" || !ID_RE.test(p.id)) return null;
  if (typeof p.name !== "string") return null;
  const name = p.name.trim().slice(0, MAX_PLAN_NAME);
  if (!name) return null;
  if (!Array.isArray(p.steps)) return null;

  const steps: PlanStep[] = [];
  let length = 0;
  for (const raw of p.steps) {
    if (steps.length >= MAX_PLAN_STEPS) break;
    if (!raw || typeof raw !== "object") continue;
    const { key, repeat } = raw as Partial<PlanStep>;
    if (typeof key !== "string" || !isPlanItemKey(key)) continue;
    const n =
      typeof repeat === "number" && Number.isFinite(repeat)
        ? Math.min(MAX_REPEAT, Math.max(1, Math.floor(repeat)))
        : 1;
    const cost = planEntry(key).build().length * n;
    if (length + cost > MAX_PLAN_LENGTH) break;
    length += cost;
    steps.push({ key, repeat: n });
  }
  if (steps.length === 0) return null;
  return { id: p.id, name, steps };
}

export function loadPlans(): Plan[] {
  try {
    const raw = localStorage.getItem(PLANS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { version?: number; plans?: unknown };
    if (parsed.version !== PLANS_VERSION || !Array.isArray(parsed.plans)) return [];
    const seen = new Set<string>();
    const plans: Plan[] = [];
    for (const candidate of parsed.plans) {
      const plan = sanitizePlan(candidate);
      if (!plan || seen.has(plan.id)) continue;
      seen.add(plan.id);
      plans.push(plan);
      if (plans.length >= MAX_PLANS) break;
    }
    return plans;
  } catch {}
  return [];
}

export function savePlans(plans: Plan[]): void {
  try {
    localStorage.setItem(
      PLANS_STORAGE_KEY,
      JSON.stringify({ version: PLANS_VERSION, plans: plans.slice(0, MAX_PLANS) })
    );
  } catch {}
}

// localStorage in an installed PWA can be evicted under storage pressure. Ask
// once, when the user first commits real data; declined or unsupported is fine.
export function requestPersistentStorage(): void {
  try {
    navigator.storage?.persist?.().catch(() => {});
  } catch {}
}

export function newPlanId(existing: Plan[]): string {
  const taken = new Set(existing.map((p) => p.id));
  let id: string;
  do {
    id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  } while (taken.has(id) || !ID_RE.test(id));
  return id;
}

// Flatten a plan into a prayer sequence. Every entry becomes a section start, so
// each gets a large, tappable bead in the strand; a repeated prayer yields one
// bead per repetition. The Litany of the Saints is the one multi-step entry —
// its fifteen sections keep their own labels and land inline.
export function buildPlanSequence(plan: Plan): SequenceItem[] {
  const seq: SequenceItem[] = [];
  for (const step of plan.steps) {
    for (let i = 0; i < step.repeat; i++) {
      for (const item of planEntry(step.key).build()) {
        seq.push({ ...item, section: item.section ?? item.label });
      }
    }
  }
  return seq;
}

// How many prayer-card steps a list of steps is worth, without building it.
// Takes the steps rather than a whole Plan so the editor can measure a
// candidate list before committing it.
export const planLength = (steps: PlanStep[]): number =>
  steps.reduce((n, s) => n + planEntry(s.key).build().length * s.repeat, 0);

// --- Sharing ---------------------------------------------------------------
// A plan is a list of short registry keys, so it fits comfortably in a URL
// fragment: #plan=<name>;<key>[*<repeat>],<key>,…  The fragment never reaches a
// server. `encodeURIComponent` escapes both separators, so a name containing
// ";" or "," survives the round trip.

const SHARE_PARAM = "plan";

export function encodePlan(plan: Plan): string {
  const steps = plan.steps
    .map((s) => (s.repeat > 1 ? `${s.key}*${s.repeat}` : s.key))
    .join(",");
  return `${encodeURIComponent(plan.name)};${steps}`;
}

export function planShareUrl(plan: Plan): string {
  const { origin, pathname, search } = window.location;
  return `${origin}${pathname}${search}#${SHARE_PARAM}=${encodePlan(plan)}`;
}

// Decode a shared payload into a plan WITHOUT an id — the importer assigns a
// fresh one, so a shared plan can never overwrite a local one.
export function decodePlan(payload: string): Omit<Plan, "id"> | null {
  const sep = payload.indexOf(";");
  if (sep < 0) return null;
  let name: string;
  try {
    name = decodeURIComponent(payload.slice(0, sep));
  } catch {
    return null;
  }
  const steps = payload
    .slice(sep + 1)
    .split(",")
    .map((token) => {
      const [key, count] = token.split("*");
      return { key, repeat: count ? Number(count) : 1 };
    });
  // Reuse the same validation the stored plans go through; the id is a stand-in.
  const plan = sanitizePlan({ id: "shared", name, steps });
  return plan ? { name: plan.name, steps: plan.steps } : null;
}

export function readSharedPlanFromHash(hash: string): Omit<Plan, "id"> | null {
  const match = new RegExp(`(?:^|[#&])${SHARE_PARAM}=([^&]*)`).exec(hash);
  return match ? decodePlan(match[1]!) : null;
}
