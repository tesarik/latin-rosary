// User-defined prayer plans: a named, ordered list of prayers the user picks
// from the *Orationes utilissimæ*, the litanies and the Leonine prayers,
// prayed as one linear set. A multi-step entry (a litany, the Leonine
// prayers) is inlined as its own steps. The rosary is deliberately NOT
// selectable — nesting a 74-step rosary inside a plan would lose the bead
// ring that makes it a rosary — and neither are the St. Bridget prayers,
// whose Pater/Ave sub-steps would each become a bead of the plan's strand.
//
// Plans live under their OWN localStorage key, not inside `ruzenec_state`:
// that key is discarded on every STATE_VERSION bump and cleared on reset, which
// is right for an in-progress position but would silently destroy user data.
// Hence a separate PLANS_VERSION, bumped only when this shape changes.
//
// Nothing here touches React; the DOM appears only in the share helpers, which
// read `location`. Covered by plans.test.ts.

import type { Locale } from "./i18n";
import { PRAYER_TYPES } from "./prayers";
import {
  ORDINARY_PRAYERS,
  ORDINARY_GROUPS,
  ordinaryGroupEntries,
  LITANIES,
  OTHER_PRAYER_SETS,
  type OrdinaryPrayerKey,
  type LitanyKey,
  type SequenceItem,
} from "./sequence";

// The linear devotions a plan may include — each step of theirs already is a
// section, so they inline cleanly.
const PLAN_DEVOTIONS = { leonine: OTHER_PRAYER_SETS.leonine, defuncti: OTHER_PRAYER_SETS.defuncti } as const;
type PlanDevotionKey = keyof typeof PLAN_DEVOTIONS;

// What a plan may contain: any ordinary prayer, any litany, the Leonine
// prayers or the prayers for the dead.
export type PlanItemKey = OrdinaryPrayerKey | LitanyKey | PlanDevotionKey;

// A prayer the user writes into a plan: a title, its Latin text, and
// optionally a translation (written in the UI language of the time) that the
// header's language button switches to, as for every other prayer. It
// lives inside its plan — deleted with it, shared with it — and a step
// refers to it as `custom:<id>`.
export type CustomPrayer = { id: string; title: string; text: string; textTr?: string };
export type CustomKey = `custom:${string}`;
export type PlanStepKey = PlanItemKey | CustomKey;

export type PlanStep = { key: PlanStepKey; repeat: number };
export type Plan = { id: string; name: string; steps: PlanStep[]; custom?: CustomPrayer[] };

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
// Caps on a plan's own prayers. The text caps keep a share link — which
// carries the text — short enough for chat apps that truncate long URLs.
export const MAX_CUSTOM_PRAYERS = 10;
export const MAX_CUSTOM_TITLE = 60;
export const MAX_CUSTOM_TEXT = 2000;

const PLANS_STORAGE_KEY = "ruzenec_plans";
const ID_RE = /^[a-z0-9]{1,24}$/;
const PLAN_PREFIX = "plan:";
const CUSTOM_PREFIX = "custom:";
const CUSTOM_ID_RE = /^[a-z0-9]{1,8}$/;

export const isCustomKey = (k: string): k is CustomKey => k.startsWith(CUSTOM_PREFIX);
export const customKeyOf = (id: string): CustomKey => `${CUSTOM_PREFIX}${id}`;
const customIdOf = (k: CustomKey): string => k.slice(CUSTOM_PREFIX.length);

export const findCustom = (plan: Pick<Plan, "custom">, k: CustomKey): CustomPrayer | null =>
  plan.custom?.find((c) => c.id === customIdOf(k)) ?? null;

// A fresh id for a plan's own prayer, unique within that plan.
export function newCustomId(plan: Pick<Plan, "custom">): string {
  const taken = new Set((plan.custom ?? []).map((c) => c.id));
  let n = taken.size + 1;
  while (taken.has(`c${n}`)) n++;
  return `c${n}`;
}

// Own-property check, NOT `in` — same reason as navigation.ts: a corrupt or
// hostile key like "toString" must not resolve to a prototype member.
const has = (obj: object, k: string): boolean => Object.prototype.hasOwnProperty.call(obj, k);

export const isPlanItemKey = (k: string): k is PlanItemKey =>
  has(ORDINARY_PRAYERS, k) || has(LITANIES, k) || has(PLAN_DEVOTIONS, k);

const planEntry = (k: PlanItemKey) =>
  has(ORDINARY_PRAYERS, k)
    ? ORDINARY_PRAYERS[k as OrdinaryPrayerKey]
    : has(LITANIES, k)
      ? LITANIES[k as LitanyKey]
      : PLAN_DEVOTIONS[k as PlanDevotionKey];

export const planItemName = (k: PlanItemKey): string => planEntry(k).name;

// A step's name in the editor: the registry name, or a custom prayer's title.
export const stepName = (plan: Pick<Plan, "custom">, k: PlanStepKey): string =>
  isCustomKey(k) ? findCustom(plan, k)?.title ?? "" : planItemName(k);

// How many prayer-card steps one repetition of a step is worth. A custom
// prayer is one card.
const stepCost = (k: PlanStepKey): number => (isCustomKey(k) ? 1 : planEntry(k).build().length);

// The same prayer's name in the UI language — the muted second line under the
// Latin one in the editor's picker, matching the start screen.
export const planItemNameTr = (k: PlanItemKey, locale: Locale): string =>
  planEntry(k).nameTr[locale];

// The groups the editor's prayer picker offers: the start screen's single-prayer
// groups in their own order (ordinaryGroupEntries), then the rest by name.
const byName = <K extends PlanItemKey>(keys: K[], reg: Record<K, { name: string }>): K[] =>
  [...keys].sort((a, b) => reg[a].name.localeCompare(reg[b].name));

export const PLAN_ITEM_GROUPS: { title: string; keys: PlanItemKey[] }[] = [
  ...ORDINARY_GROUPS.map(({ group, title }) => ({
    title,
    keys: ordinaryGroupEntries(group).map(([k]) => k) as PlanItemKey[],
  })),
  {
    title: "Litaníæ",
    keys: byName(Object.keys(LITANIES) as LitanyKey[], LITANIES),
  },
  {
    title: "Aliæ preces",
    keys: byName(Object.keys(PLAN_DEVOTIONS) as PlanDevotionKey[], PLAN_DEVOTIONS),
  },
];

export const isPlanKey = (k: string): k is PlanSetKey => k.startsWith(PLAN_PREFIX);
export const planKeyOf = (id: string): PlanSetKey => `${PLAN_PREFIX}${id}`;
export const planIdOf = (k: PlanSetKey): string => k.slice(PLAN_PREFIX.length);

export const findPlan = (plans: Plan[], key: PlanSetKey): Plan | null =>
  plans.find((p) => p.id === planIdOf(key)) ?? null;

// Validate anything claiming to be a plan — parsed JSON from localStorage, a
// backup file or a decoded share link. Unknown / prototype step keys are
// dropped, repeats are clamped, custom prayers are trimmed to their caps (and
// dropped when empty or unused), a step naming a custom prayer the plan lacks
// is dropped, and a plan left with no steps is rejected outright rather than
// resurfacing as an unprayable empty set.
export function sanitizePlan(raw: unknown): Plan | null {
  if (!raw || typeof raw !== "object") return null;
  const p = raw as Partial<Plan>;
  if (typeof p.id !== "string" || !ID_RE.test(p.id)) return null;
  if (typeof p.name !== "string") return null;
  const name = p.name.trim().slice(0, MAX_PLAN_NAME);
  if (!name) return null;
  if (!Array.isArray(p.steps)) return null;

  const custom = sanitizeCustom(p.custom);
  const steps: PlanStep[] = [];
  let length = 0;
  for (const raw of p.steps) {
    if (steps.length >= MAX_PLAN_STEPS) break;
    if (!raw || typeof raw !== "object") continue;
    const { key, repeat } = raw as Partial<PlanStep>;
    if (typeof key !== "string") continue;
    if (isCustomKey(key) ? !findCustom({ custom }, key) : !isPlanItemKey(key)) continue;
    const n =
      typeof repeat === "number" && Number.isFinite(repeat)
        ? Math.min(MAX_REPEAT, Math.max(1, Math.floor(repeat)))
        : 1;
    const cost = stepCost(key) * n;
    if (length + cost > MAX_PLAN_LENGTH) break;
    length += cost;
    steps.push({ key, repeat: n });
  }
  if (steps.length === 0) return null;
  const used = custom.filter((c) => steps.some((s) => s.key === customKeyOf(c.id)));
  return used.length > 0 ? { id: p.id, name, steps, custom: used } : { id: p.id, name, steps };
}

const cleanText = (v: unknown, max: number): string =>
  typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim().slice(0, max) : "";

function sanitizeCustom(raw: unknown): CustomPrayer[] {
  if (!Array.isArray(raw)) return [];
  const out: CustomPrayer[] = [];
  for (const c of raw) {
    if (out.length >= MAX_CUSTOM_PRAYERS) break;
    if (!c || typeof c !== "object") continue;
    const { id, title, text, textTr } = c as Partial<CustomPrayer>;
    if (typeof id !== "string" || !CUSTOM_ID_RE.test(id) || out.some((o) => o.id === id)) continue;
    const t = cleanText(title, MAX_CUSTOM_TITLE).replace(/\s+/g, " ");
    const body = cleanText(text, MAX_CUSTOM_TEXT);
    if (!t || !body) continue;
    const tr = cleanText(textTr, MAX_CUSTOM_TEXT);
    out.push(tr ? { id, title: t, text: body, textTr: tr } : { id, title: t, text: body });
  }
  return out;
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
      if (isCustomKey(step.key)) {
        const c = findCustom(plan, step.key);
        if (c) {
          seq.push({
            type: PRAYER_TYPES.CUSTOM,
            label: c.title,
            section: c.title,
            custom: c.textTr ? { text: c.text, textTr: c.textTr } : { text: c.text },
          });
        }
        continue;
      }
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
  steps.reduce((n, s) => n + stepCost(s.key) * s.repeat, 0);

// --- Sharing ---------------------------------------------------------------
// A plan is a list of short registry keys, so it fits comfortably in a URL
// fragment: #plan=<name>;<key>[*<repeat>],<key>,…[;<custom>,<custom>,…]
// where each custom prayer is <id>:<title>:<text>[:<textTr>]. The fragment
// never reaches a server. `encodeURIComponent` escapes every separator used
// here (";", ",", ":"), so any text survives the round trip; the step keys
// are plain ASCII and "custom:<id>" keeps its colon unescaped on purpose.

const SHARE_PARAM = "plan";

// Past this, a link may be cut short by chat apps; the editor warns.
export const LONG_SHARE_URL = 4000;

export function encodePlan(plan: Plan): string {
  const steps = plan.steps
    .map((s) => (s.repeat > 1 ? `${s.key}*${s.repeat}` : s.key))
    .join(",");
  const custom = (plan.custom ?? [])
    .map((c) => [c.id, c.title, c.text, ...(c.textTr ? [c.textTr] : [])].map(encodeURIComponent).join(":"))
    .join(",");
  return `${encodeURIComponent(plan.name)};${steps}${custom ? `;${custom}` : ""}`;
}

export function planShareUrl(plan: Plan): string {
  const { origin, pathname, search } = window.location;
  return `${origin}${pathname}${search}#${SHARE_PARAM}=${encodePlan(plan)}`;
}

// Decode a shared payload into a plan WITHOUT an id — the importer assigns a
// fresh one, so a shared plan can never overwrite a local one.
export function decodePlan(payload: string): Omit<Plan, "id"> | null {
  const [rawName, rawSteps, rawCustom] = payload.split(";");
  if (rawName === undefined || rawSteps === undefined) return null;
  try {
    const name = decodeURIComponent(rawName);
    const steps = rawSteps.split(",").map((token) => {
      const [key, count] = token.split("*");
      return { key, repeat: count ? Number(count) : 1 };
    });
    const custom = (rawCustom ? rawCustom.split(",") : []).map((token) => {
      const [id, title, text, textTr] = token.split(":").map(decodeURIComponent);
      return { id, title, text, textTr };
    });
    // Reuse the same validation the stored plans go through; the id is a stand-in.
    const plan = sanitizePlan({ id: "shared", name, steps, custom });
    return plan ? withoutId(plan) : null;
  } catch {
    return null;
  }
}

const withoutId = (plan: Plan): Omit<Plan, "id"> => {
  const rest: Partial<Plan> = { ...plan };
  delete rest.id;
  return rest as Omit<Plan, "id">;
};

export function readSharedPlanFromHash(hash: string): Omit<Plan, "id"> | null {
  const match = new RegExp(`(?:^|[#&])${SHARE_PARAM}=([^&]*)`).exec(hash);
  return match ? decodePlan(match[1]!) : null;
}

// --- Backup ----------------------------------------------------------------
// Plans live only in this browser's localStorage, so clearing site data or
// changing phones loses them. A backup is a plain JSON file the user saves
// and later loads back; nothing leaves the device.

const BACKUP_APP = "latin-rosary";

export function exportPlans(plans: Plan[]): string {
  return JSON.stringify({ app: BACKUP_APP, version: PLANS_VERSION, plans }, null, 2);
}

// The plans in a backup file, validated, WITHOUT ids — like a shared plan,
// each import gets a fresh id so it can never overwrite a local plan. Null if
// the file isn't a backup of this app.
export function parsePlansBackup(json: string): Omit<Plan, "id">[] | null {
  try {
    const parsed = JSON.parse(json) as { app?: unknown; version?: unknown; plans?: unknown };
    if (parsed?.app !== BACKUP_APP || parsed.version !== PLANS_VERSION || !Array.isArray(parsed.plans)) return null;
    const out: Omit<Plan, "id">[] = [];
    for (const candidate of parsed.plans) {
      const plan = sanitizePlan({ ...(candidate as object), id: "imported" });
      if (plan) out.push(withoutId(plan));
    }
    return out;
  } catch {
    return null;
  }
}
