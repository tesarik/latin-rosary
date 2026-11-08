import { useEffect, useState } from "react";
import type { Locale } from "./i18n";
import type { StaticPrayerType } from "./prayers";

// The prayer texts in each UI language, loaded on demand: each table
// (prayers.cs.ts, prayers.en.ts — some 100 kB apiece) is its own chunk, so
// the app starts with only the Latin and fetches the shown language's table
// at once and the others when the browser is idle (`preloadTranslations`, from
// main.tsx). Fetched once, every chunk is kept by the service worker, so all
// languages work offline. The static pages and the tests, which want every
// table at once, import allTranslations.ts instead — the app must not, or the
// tables would be bundled back in.
export type TranslationTable = Record<StaticPrayerType, string>;

const LOADERS: Record<Locale, () => Promise<TranslationTable>> = {
  cs: () => import("./prayers.cs").then((m) => m.PRAYERS_CS),
  en: () => import("./prayers.en").then((m) => m.PRAYERS_EN),
};

const loaded: Partial<Record<Locale, TranslationTable>> = {};
const pending: Partial<Record<Locale, Promise<TranslationTable>>> = {};

export function loadTranslation(locale: Locale): Promise<TranslationTable> {
  const done = loaded[locale];
  if (done) return Promise.resolve(done);
  return (pending[locale] ??= LOADERS[locale]().then(
    (table) => (loaded[locale] = table),
    (err) => { delete pending[locale]; throw err; },
  ));
}

// The shown language now, the others once the browser is idle.
export function preloadTranslations(first: Locale): void {
  void loadTranslation(first).catch(() => {});
  const rest = () => {
    for (const l of Object.keys(LOADERS) as Locale[]) void loadTranslation(l).catch(() => {});
  };
  if (typeof requestIdleCallback === "function") requestIdleCallback(rest, { timeout: 5000 });
  else setTimeout(rest, 2000);
}

// The table for `locale`, or undefined while it loads (the card shows the
// Latin meanwhile); re-renders once it arrives.
export function useTranslation(locale: Locale): TranslationTable | undefined {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (loaded[locale]) return;
    let live = true;
    loadTranslation(locale).then(() => { if (live) setTick((n) => n + 1); }, () => {});
    return () => { live = false; };
  }, [locale]);
  return loaded[locale];
}
