import { stripBreaks } from "./breaks";
import type { Locale } from "./i18n";
import { MENU_GROUPS, foldName, groupKeys, menuEntry, type MenuKey } from "./menu";
import { PRAYERS, PRAYER_TYPES, getHailMary, getHailMaryTr, type PrayerType, type StaticPrayerType } from "./prayers";
import { sliceLines, type SequenceItem } from "./sequence";
import type { TranslationTable } from "./translations";

// The start screen's search in the prayers' own words (searchMenu in menu.ts
// finds them by name): every step of every listed prayer, in Latin and in the
// translation of the UI language when its table has loaded. A text shared by
// several prayers — the Pater Noster inside every chaplet, the Stabat Mater's
// stanzas in the Way of the Cross — is found only where it is at home: the
// prayer that is that text alone if there is one, else the first in the
// menu's order. Each hit names the step it is on, so the prayer opens there.

export type TextHit = {
  key: MenuKey;
  step: number;
  // A stretch of the text round the match, on one line, with the matched
  // words' [start, end) ranges in it; `tr` when it is the translation's.
  snippet: string;
  marks: [number, number][];
  tr: boolean;
};

// Shorter queries would match half the texts as they are typed.
export const MIN_TEXT_QUERY = 3;
export const MAX_TEXT_HITS = 30;

type Folded = { text: string; folded: string; at: number[] };
// Each unit's texts, folded once (the translation again only when the
// locale or its table changes).
type Unit = {
  key: MenuKey; step: number; item: SequenceItem;
  la?: Folded;
  tr?: Folded & { locale: Locale; table: TranslationTable | undefined };
};

let units: Unit[] | null = null;

// One unit per step, each prayer type kept only at its home.
function allUnits(): Unit[] {
  if (units) return units;
  const keys = MENU_GROUPS.flatMap(groupKeys);
  const seqs = new Map(keys.map((k) => [k, menuEntry(k).build()] as const));
  const home = new Map<PrayerType, MenuKey>();
  // A prayer that is that one text alone is its home first …
  for (const [k, seq] of seqs) if (seq.length === 1 && !home.has(seq[0]!.type)) home.set(seq[0]!.type, k);
  // … else the first prayer, in the menu's order, that holds it.
  for (const [k, seq] of seqs) for (const it of seq) if (!home.has(it.type)) home.set(it.type, k);
  units = [];
  for (const [k, seq] of seqs) {
    seq.forEach((item, step) => {
      if (home.get(item.type) === k) units!.push({ key: k, step, item });
    });
  }
  return units;
}

// What a step shows, rubric and break markup removed.
function plain(text: string): string {
  return stripBreaks(text).replace(/\{\/?r\}/g, "");
}

function latinOf(item: SequenceItem): string {
  if (item.type === PRAYER_TYPES.HAIL_MARY) {
    const h = getHailMary(item.mystery);
    return [h.before, h.mystery, h.after].filter(Boolean).join(" ");
  }
  if (item.type === PRAYER_TYPES.CUSTOM) return "";
  const full = PRAYERS[item.type as StaticPrayerType];
  return plain(item.lines ? sliceLines(full, item.lines) : full);
}

function translationOf(item: SequenceItem, locale: Locale, table: TranslationTable | undefined): string {
  if (item.type === PRAYER_TYPES.HAIL_MARY) {
    const h = getHailMaryTr(locale, item.mysteryTr?.[locale]);
    return [h.before, h.mystery, h.after].filter(Boolean).join(" ");
  }
  if (item.type === PRAYER_TYPES.CUSTOM || !table) return "";
  const full = table[item.type as StaticPrayerType];
  return plain(item.lines ? sliceLines(full, item.lines) : full);
}

// The text folded as foldName folds it, with each folded character's index
// in the original, so a match found in the one can be shown in the other.
function foldWithMap(text: string): { folded: string; at: number[] } {
  let folded = "";
  const at: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const f = foldName(text[i]!);
    folded += f;
    for (let j = 0; j < f.length; j++) at.push(i);
  }
  return { folded, at };
}

const wordsOf = (query: string): string[] => foldName(query).split(/[^\p{L}\p{N}]+/u).filter(Boolean);

// The stretch round the first word's match: about 40 characters before it and
// 70 after, cut at spaces, on one line, with an ellipsis where it was cut.
function snippetOf(text: string, start: number, words: string[]): { snippet: string; marks: [number, number][] } {
  let from = Math.max(0, start - 40);
  let to = Math.min(text.length, start + 70);
  if (from > 0) { const s = text.indexOf(" ", from); if (s !== -1 && s < start) from = s + 1; }
  if (to < text.length) { const s = text.lastIndexOf(" ", to); if (s > start) to = s; }
  const body = text.slice(from, to).replace(/\s+/g, " ");
  const snippet = (from > 0 ? "…" : "") + body + (to < text.length ? "…" : "");
  const offset = from > 0 ? 1 : 0;
  const { folded, at } = foldWithMap(body);
  const marks: [number, number][] = [];
  for (const w of words) {
    let i = folded.indexOf(w);
    while (i !== -1) {
      marks.push([at[i]! + offset, at[i + w.length - 1]! + 1 + offset]);
      i = folded.indexOf(w, i + w.length);
    }
  }
  marks.sort((a, b) => a[0] - b[0]);
  return { snippet, marks };
}

const folding = (text: string): Folded => ({ text, ...foldWithMap(text) });

function match({ text, folded, at }: Folded, words: string[]): number | null {
  if (!text || !words.every((w) => folded.includes(w))) return null;
  return at[folded.indexOf(words[0]!)]!;
}

// Every listed prayer whose text holds each word of the query on one step
// (the Latin first, then the translation), its first such step, sorted as
// the menu sorts by Latin name; none for a query under MIN_TEXT_QUERY
// characters, and those `skip` names (found by name already) left out.
export function searchTexts(query: string, locale: Locale, table: TranslationTable | undefined, skip: readonly MenuKey[] = []): TextHit[] {
  const words = wordsOf(query);
  if (words.join("").length < MIN_TEXT_QUERY) return [];
  const hits = new Map<MenuKey, TextHit>();
  for (const u of allUnits()) {
    if (hits.has(u.key) || skip.includes(u.key)) continue;
    u.la ??= folding(latinOf(u.item));
    const laAt = match(u.la, words);
    if (laAt !== null) { hits.set(u.key, { key: u.key, step: u.step, ...snippetOf(u.la.text, laAt, words), tr: false }); continue; }
    if (u.tr?.locale !== locale || u.tr.table !== table) u.tr = { ...folding(translationOf(u.item, locale, table)), locale, table };
    const trAt = match(u.tr, words);
    if (trAt !== null) hits.set(u.key, { key: u.key, step: u.step, ...snippetOf(u.tr.text, trAt, words), tr: true });
  }
  return [...hits.values()]
    .sort((a, b) => foldName(menuEntry(a.key).name).localeCompare(foldName(menuEntry(b.key).name)))
    .slice(0, MAX_TEXT_HITS);
}
