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
  textSizeAria: string;
  textSizeDecreaseAria: string;
  textSizeIncreaseAria: string;
  themeToggleAria: string;
  aboutTitle: string;
  aboutText: string;
  aboutCreator: string;
  aboutFeedback: string;
  aboutAnalytics: string;
  aboutClose: string;
  localeName: string;
  otherPrayersHeading: string;
  startRosaryAria: (mysteryName: string) => string;
  startPrayerAria: (prayerName: string) => string;
  stepXofY: (step: number, total: number) => string;
  jumpToOpeningPaterNoster: (step: number, total: number) => string;
  jumpToDecade: (n: number) => string;
  rosaryAria: (step: number, total: number) => string;
  prayerSectionsAria: string;
  jumpToSection: (name: string) => string;
  prayerLanguageAria: string;
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
    textSizeAria: "Velikost písma",
    textSizeDecreaseAria: "Zmenšit písmo",
    textSizeIncreaseAria: "Zvětšit písmo",
    themeToggleAria: "Přepnout tmavý režim",
    aboutTitle: "O aplikaci",
    aboutText: "Modlitba růžence a dalších modliteb v latině s českým překladem.",
    aboutCreator: "Tvůrce",
    aboutFeedback: "Chyby a návrhy posílejte na",
    aboutAnalytics: "Sbírají se anonymní statistiky používání, bez cookies.",
    aboutClose: "Zavřít",
    localeName: "Čeština",
    otherPrayersHeading: "Další latinské modlitby",
    startRosaryAria: (n) => `Začít růženec — ${n}`,
    startPrayerAria: (n) => `Začít modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočit na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočit na ${n}. desátek`,
    rosaryAria: (s, t) => `Růženec, krok ${s} z ${t}`,
    prayerSectionsAria: "Sekce modlitby",
    jumpToSection: (n) => `Skočit na ${n}`,
    prayerLanguageAria: "Jazyk modlitby",
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
    textSizeAria: "Text size",
    textSizeDecreaseAria: "Decrease text size",
    textSizeIncreaseAria: "Increase text size",
    themeToggleAria: "Toggle dark mode",
    aboutTitle: "About",
    aboutText: "Praying the rosary and other prayers in Latin, with Czech translation.",
    aboutCreator: "Created by",
    aboutFeedback: "Send errors and improvements to",
    aboutAnalytics: "Anonymous, cookieless usage statistics are collected.",
    aboutClose: "Close",
    localeName: "English",
    otherPrayersHeading: "Other Latin prayers",
    startRosaryAria: (n) => `Start rosary — ${n}`,
    startPrayerAria: (n) => `Start prayer — ${n}`,
    stepXofY: (s, t) => `step ${s} of ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Jump to opening Pater Noster, step ${s} of ${t}`,
    jumpToDecade: (n) => `Jump to decade ${n}`,
    rosaryAria: (s, t) => `Rosary, step ${s} of ${t}`,
    prayerSectionsAria: "Prayer sections",
    jumpToSection: (n) => `Jump to ${n}`,
    prayerLanguageAria: "Prayer language",
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
    textSizeAria: "Veľkosť písma",
    textSizeDecreaseAria: "Zmenšiť písmo",
    textSizeIncreaseAria: "Zväčšiť písmo",
    themeToggleAria: "Prepnúť tmavý režim",
    aboutTitle: "O aplikácii",
    aboutText: "Modlitba ruženca a ďalších modlitieb v latinčine s českým prekladom.",
    aboutCreator: "Tvorca",
    aboutFeedback: "Chyby a návrhy posielajte na",
    aboutAnalytics: "Zbierajú sa anonymné štatistiky používania, bez cookies.",
    aboutClose: "Zavrieť",
    localeName: "Slovenčina",
    otherPrayersHeading: "Ďalšie latinské modlitby",
    startRosaryAria: (n) => `Začať ruženec — ${n}`,
    startPrayerAria: (n) => `Začať modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočiť na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočiť na ${n}. desiatok`,
    rosaryAria: (s, t) => `Ruženec, krok ${s} z ${t}`,
    prayerSectionsAria: "Sekcie modlitby",
    jumpToSection: (n) => `Skočiť na ${n}`,
    prayerLanguageAria: "Jazyk modlitby",
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
    textSizeAria: "Schriftgröße",
    textSizeDecreaseAria: "Schrift verkleinern",
    textSizeIncreaseAria: "Schrift vergrößern",
    themeToggleAria: "Dunkelmodus umschalten",
    aboutTitle: "Über die App",
    aboutText: "Den Rosenkranz und weitere Gebete auf Latein beten, mit tschechischer Übersetzung.",
    aboutCreator: "Erstellt von",
    aboutFeedback: "Fehler und Verbesserungen senden Sie an",
    aboutAnalytics: "Es werden anonyme, cookiefreie Nutzungsstatistiken erfasst.",
    aboutClose: "Schließen",
    localeName: "Deutsch",
    otherPrayersHeading: "Weitere lateinische Gebete",
    startRosaryAria: (n) => `Rosenkranz beginnen — ${n}`,
    startPrayerAria: (n) => `Gebet beginnen — ${n}`,
    stepXofY: (s, t) => `Schritt ${s} von ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Zum einleitenden Pater Noster springen, Schritt ${s} von ${t}`,
    jumpToDecade: (n) => `Zum ${n}. Gesätz springen`,
    rosaryAria: (s, t) => `Rosenkranz, Schritt ${s} von ${t}`,
    prayerSectionsAria: "Gebetsabschnitte",
    jumpToSection: (n) => `Zu ${n} springen`,
    prayerLanguageAria: "Gebetssprache",
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
    textSizeAria: "Rozmiar tekstu",
    textSizeDecreaseAria: "Zmniejsz tekst",
    textSizeIncreaseAria: "Powiększ tekst",
    themeToggleAria: "Przełącz tryb ciemny",
    aboutTitle: "O aplikacji",
    aboutText: "Modlitwa różańca i innych modlitw po łacinie z czeskim tłumaczeniem.",
    aboutCreator: "Autor",
    aboutFeedback: "Błędy i propozycje wysyłaj na",
    aboutAnalytics: "Zbierane są anonimowe statystyki użycia, bez cookies.",
    aboutClose: "Zamknij",
    localeName: "Polski",
    otherPrayersHeading: "Inne łacińskie modlitwy",
    startRosaryAria: (n) => `Rozpocznij różaniec — ${n}`,
    startPrayerAria: (n) => `Rozpocznij modlitwę — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Przeskocz do wprowadzającego Pater Noster, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Przeskocz do ${n}. dziesiątki`,
    rosaryAria: (s, t) => `Różaniec, krok ${s} z ${t}`,
    prayerSectionsAria: "Sekcje modlitwy",
    jumpToSection: (n) => `Przejdź do ${n}`,
    prayerLanguageAria: "Język modlitwy",
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
