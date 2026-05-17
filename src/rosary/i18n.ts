// UI strings. Only Czech labels are localized — Latin prayer texts in
// prayers.ts and the mystery clauses are untouched.

export const SUPPORTED_LOCALES = ["cs", "en", "sk", "de", "pl"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "cs";

type Strings = {
  appTitle: string;
  back: string;
  previous: string;
  next: string;
  finish: string;
  confirmExit: string;
  exitToMenuAria: string;
  navAria: string;
  previousAria: string;
  nextAria: string;
  finishAria: string;
  languagePickerAria: string;
  localeName: string;
  otherPrayersHeading: string;
  startRosaryAria: (mysteryName: string) => string;
  startPrayerAria: (prayerName: string) => string;
  stepXofY: (step: number, total: number) => string;
  jumpToOpeningPaterNoster: (step: number, total: number) => string;
  jumpToDecade: (n: number) => string;
  rosaryAria: (step: number, total: number) => string;
};

export const STRINGS: Record<Locale, Strings> = {
  cs: {
    appTitle: "Latinský růženec",
    back: "Zpět",
    previous: "Předchozí",
    next: "Další",
    finish: "Dokončit",
    confirmExit: "Opravdu chcete ukončit modlitbu? Postup bude ztracen.",
    exitToMenuAria: "Ukončit modlitbu a zpět do menu",
    navAria: "Navigace modlitby",
    previousAria: "Předchozí modlitba",
    nextAria: "Další modlitba",
    finishAria: "Dokončit modlitbu",
    languagePickerAria: "Volba jazyka",
    localeName: "Čeština",
    otherPrayersHeading: "Další latinské modlitby",
    startRosaryAria: (n) => `Začít růženec — ${n}`,
    startPrayerAria: (n) => `Začít modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočit na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočit na ${n}. desátek`,
    rosaryAria: (s, t) => `Růženec, krok ${s} z ${t}`,
  },
  en: {
    appTitle: "Latin Rosary",
    back: "Back",
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    confirmExit: "End the prayer? Your progress will be lost.",
    exitToMenuAria: "End prayer and return to menu",
    navAria: "Prayer navigation",
    previousAria: "Previous prayer",
    nextAria: "Next prayer",
    finishAria: "Finish prayer",
    languagePickerAria: "Language",
    localeName: "English",
    otherPrayersHeading: "Other Latin prayers",
    startRosaryAria: (n) => `Start rosary — ${n}`,
    startPrayerAria: (n) => `Start prayer — ${n}`,
    stepXofY: (s, t) => `step ${s} of ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Jump to opening Pater Noster, step ${s} of ${t}`,
    jumpToDecade: (n) => `Jump to decade ${n}`,
    rosaryAria: (s, t) => `Rosary, step ${s} of ${t}`,
  },
  sk: {
    appTitle: "Latinský ruženec",
    back: "Späť",
    previous: "Predchádzajúce",
    next: "Ďalšie",
    finish: "Dokončiť",
    confirmExit: "Naozaj chcete ukončiť modlitbu? Postup sa stratí.",
    exitToMenuAria: "Ukončiť modlitbu a späť do menu",
    navAria: "Navigácia modlitby",
    previousAria: "Predchádzajúca modlitba",
    nextAria: "Ďalšia modlitba",
    finishAria: "Dokončiť modlitbu",
    languagePickerAria: "Voľba jazyka",
    localeName: "Slovenčina",
    otherPrayersHeading: "Ďalšie latinské modlitby",
    startRosaryAria: (n) => `Začať ruženec — ${n}`,
    startPrayerAria: (n) => `Začať modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočiť na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočiť na ${n}. desiatok`,
    rosaryAria: (s, t) => `Ruženec, krok ${s} z ${t}`,
  },
  de: {
    appTitle: "Lateinischer Rosenkranz",
    back: "Zurück",
    previous: "Vorherige",
    next: "Weiter",
    finish: "Beenden",
    confirmExit: "Gebet wirklich beenden? Der Fortschritt geht verloren.",
    exitToMenuAria: "Gebet beenden und zurück zum Menü",
    navAria: "Gebetsnavigation",
    previousAria: "Vorheriges Gebet",
    nextAria: "Nächstes Gebet",
    finishAria: "Gebet beenden",
    languagePickerAria: "Sprache",
    localeName: "Deutsch",
    otherPrayersHeading: "Weitere lateinische Gebete",
    startRosaryAria: (n) => `Rosenkranz beginnen — ${n}`,
    startPrayerAria: (n) => `Gebet beginnen — ${n}`,
    stepXofY: (s, t) => `Schritt ${s} von ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Zum einleitenden Pater Noster springen, Schritt ${s} von ${t}`,
    jumpToDecade: (n) => `Zum ${n}. Gesätz springen`,
    rosaryAria: (s, t) => `Rosenkranz, Schritt ${s} von ${t}`,
  },
  pl: {
    appTitle: "Łaciński różaniec",
    back: "Wstecz",
    previous: "Poprzednia",
    next: "Następna",
    finish: "Zakończ",
    confirmExit: "Czy na pewno zakończyć modlitwę? Postęp zostanie utracony.",
    exitToMenuAria: "Zakończ modlitwę i wróć do menu",
    navAria: "Nawigacja modlitwy",
    previousAria: "Poprzednia modlitwa",
    nextAria: "Następna modlitwa",
    finishAria: "Zakończ modlitwę",
    languagePickerAria: "Język",
    localeName: "Polski",
    otherPrayersHeading: "Inne łacińskie modlitwy",
    startRosaryAria: (n) => `Rozpocznij różaniec — ${n}`,
    startPrayerAria: (n) => `Rozpocznij modlitwę — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Przeskocz do wprowadzającego Pater Noster, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Przeskocz do ${n}. dziesiątki`,
    rosaryAria: (s, t) => `Różaniec, krok ${s} z ${t}`,
  },
};

// Match navigator.language(s) to a supported locale; fall back to DEFAULT_LOCALE.
export function detectLocale(): Locale {
  const candidates: string[] = [];
  if (typeof navigator !== "undefined") {
    if (navigator.languages) candidates.push(...navigator.languages);
    if (navigator.language) candidates.push(navigator.language);
  }
  for (const raw of candidates) {
    const tag = raw.toLowerCase().split(/[-_]/)[0];
    if (tag && (SUPPORTED_LOCALES as readonly string[]).includes(tag)) {
      return tag as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

const LOCALE_STORAGE_KEY = "ruzenec_locale";

export function loadSavedLocale(): Locale | null {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw && (SUPPORTED_LOCALES as readonly string[]).includes(raw)) {
      return raw as Locale;
    }
  } catch {}
  return null;
}

export function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {}
}
