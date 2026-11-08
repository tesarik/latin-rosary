import type { Locale } from "./i18n";
import { PRAYERS_CS } from "./prayers.cs";
import { PRAYERS_EN } from "./prayers.en";
import type { TranslationTable } from "./translations";

// Every translation table at once, for the static pages (built in Node) and
// the tests. The app loads them one by one through translations.ts instead;
// don't import this from app code. Keyed by UI locale, so a new locale in
// i18n.ts fails to compile here until its table exists.
export const PRAYER_TRANSLATIONS: Record<Locale, TranslationTable> = {
  cs: PRAYERS_CS,
  en: PRAYERS_EN,
};
