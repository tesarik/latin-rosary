// UI strings and the supported UI languages (Czech and English).
//
// The Latin prayer texts in prayers.ts are never localized; the *translations*
// beside them (PRAYER_TRANSLATIONS) are keyed by exactly these locales, so
// adding a locale here means adding a full translation of every prayer.

export const SUPPORTED_LOCALES = ["cs", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "cs";

type Strings = {
  appTitle: string;
  back: string;
  previous: string;
  next: string;
  finish: string;
  exitToMenuAria: string;
  restartAria: string;
  confirmRestart: string;
  // Under an unfinished set on the start screen: "Continue · 23/74".
  resumeAt: (step: number, total: number) => string;
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
  aboutBuilt: string;
  localeName: string;
  // Two-letter badge on the prayer card's language toggle (LA ↔ this).
  prayerLanguageShort: string;
  otherPrayersHeading: string;
  ordinaryGroupName: string;
  litaniesGroupName: string;
  startRosaryAria: (mysteryName: string) => string;
  startPrayerAria: (prayerName: string) => string;
  stepXofY: (step: number, total: number) => string;
  jumpToOpeningPaterNoster: (step: number, total: number) => string;
  jumpToDecade: (n: number) => string;
  rosaryAria: (step: number, total: number) => string;
  prayerSectionsAria: string;
  jumpToSection: (name: string) => string;
  prayerLanguageAria: string;
  errorTitle: string;
  errorMessage: string;
  errorReload: string;
  errorReset: string;
  updateAvailable: string;
  updateAction: string;
  updateDismissAria: string;
  plansTitle: string;
  plansTileHint: string;
  plansEmpty: string;
  planNew: string;
  planNamePlaceholder: string;
  planUnnamed: string;
  planAddPrayer: string;
  planSave: string;
  planCancel: string;
  planDelete: string;
  planEdit: string;
  planShare: string;
  planShareCopied: string;
  planShareFallback: string;
  planLimitReached: string;
  planStepLimitReached: string;
  planCount: (n: number) => string;
  plansCount: (n: number) => string;
  planImportConfirm: (name: string) => string;
  planDeleteConfirm: (name: string) => string;
  plansOpenAria: string;
  planBackAria: string;
  planMoveUpAria: string;
  planMoveDownAria: string;
  planRemoveAria: string;
  planRepeatDecreaseAria: string;
  planRepeatIncreaseAria: string;
  planEditAria: (name: string) => string;
  planShareAria: (name: string) => string;
  planDeleteAria: (name: string) => string;
};

export const STRINGS: Record<Locale, Strings> = {
  cs: {
    appTitle: "Latinský růženec",
    back: "Zpět",
    previous: "Předchozí",
    next: "Další",
    finish: "Dokončit",
    exitToMenuAria: "Zpět do menu, postup zůstane uložen",
    restartAria: "Začít modlitbu znovu",
    confirmRestart: "Začít modlitbu znovu od začátku?",
    resumeAt: (step, total) => `Pokračovat · ${step}/${total}`,
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
    aboutBuilt: "sestaveno",
    localeName: "Čeština",
    prayerLanguageShort: "CZ",
    otherPrayersHeading: "Další latinské modlitby",
    ordinaryGroupName: "Základní modlitby",
    litaniesGroupName: "Litanie",
    startRosaryAria: (n) => `Začít růženec — ${n}`,
    startPrayerAria: (n) => `Začít modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočit na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočit na ${n}. desátek`,
    rosaryAria: (s, t) => `Růženec, krok ${s} z ${t}`,
    prayerSectionsAria: "Sekce modlitby",
    jumpToSection: (n) => `Skočit na ${n}`,
    prayerLanguageAria: "Jazyk modlitby",
    errorTitle: "Něco se pokazilo",
    errorMessage: "V aplikaci nastala neočekávaná chyba.",
    errorReload: "Načíst znovu",
    errorReset: "Vymazat uložený postup a načíst znovu",
    updateAvailable: "K dispozici je nová verze.",
    updateAction: "Aktualizovat",
    updateDismissAria: "Zavřít oznámení",
    plansTitle: "Modlitební plány",
    plansTileHint: "Vlastní pořadí modliteb",
    plansEmpty: "Zatím nemáte žádný plán. Sestavte si vlastní pořadí z jednotlivých modliteb a litanií.",
    planNew: "Nový plán",
    planNamePlaceholder: "Název plánu",
    planUnnamed: "Bez názvu",
    planAddPrayer: "Přidat modlitbu",
    planSave: "Uložit",
    planCancel: "Zrušit",
    planDelete: "Smazat",
    planEdit: "Upravit",
    planShare: "Sdílet",
    planShareCopied: "Odkaz zkopírován do schránky.",
    planShareFallback: "Odkaz na plán:",
    planLimitReached: "Více plánů už uložit nelze.",
    planStepLimitReached: "Plán je už příliš dlouhý.",
    planCount: (n) => `${n} ${n === 1 ? "krok" : n < 5 ? "kroky" : "kroků"}`,
    plansCount: (n) => `${n} ${n === 1 ? "plán" : n < 5 ? "plány" : "plánů"}`,
    planImportConfirm: (n) => `Přidat sdílený plán „${n}“?`,
    planDeleteConfirm: (n) => `Smazat plán „${n}“?`,
    plansOpenAria: "Otevřít modlitební plány",
    planBackAria: "Zpět do menu",
    planMoveUpAria: "Posunout nahoru",
    planMoveDownAria: "Posunout dolů",
    planRemoveAria: "Odebrat modlitbu",
    planRepeatDecreaseAria: "Snížit počet opakování",
    planRepeatIncreaseAria: "Zvýšit počet opakování",
    planEditAria: (n) => `Upravit plán ${n}`,
    planShareAria: (n) => `Sdílet plán ${n}`,
    planDeleteAria: (n) => `Smazat plán ${n}`,
  },
  en: {
    appTitle: "Latin Rosary",
    back: "Back",
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    exitToMenuAria: "Back to menu, your progress is kept",
    restartAria: "Start the prayer again",
    confirmRestart: "Start this prayer again from the beginning?",
    resumeAt: (step, total) => `Continue · ${step}/${total}`,
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
    aboutText: "Praying the rosary and other prayers in Latin, with an English translation.",
    aboutCreator: "Created by",
    aboutFeedback: "Send errors and improvements to",
    aboutAnalytics: "Anonymous, cookieless usage statistics are collected.",
    aboutClose: "Close",
    aboutBuilt: "built",
    localeName: "English",
    prayerLanguageShort: "EN",
    otherPrayersHeading: "Other Latin prayers",
    ordinaryGroupName: "Essential prayers",
    litaniesGroupName: "Litanies",
    startRosaryAria: (n) => `Start rosary — ${n}`,
    startPrayerAria: (n) => `Start prayer — ${n}`,
    stepXofY: (s, t) => `step ${s} of ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Jump to opening Pater Noster, step ${s} of ${t}`,
    jumpToDecade: (n) => `Jump to decade ${n}`,
    rosaryAria: (s, t) => `Rosary, step ${s} of ${t}`,
    prayerSectionsAria: "Prayer sections",
    jumpToSection: (n) => `Jump to ${n}`,
    prayerLanguageAria: "Prayer language",
    errorTitle: "Something went wrong",
    errorMessage: "The app ran into an unexpected problem.",
    errorReload: "Reload",
    errorReset: "Clear saved progress and reload",
    updateAvailable: "A new version is available.",
    updateAction: "Update",
    updateDismissAria: "Dismiss notification",
    plansTitle: "Prayer plans",
    plansTileHint: "Your own order of prayers",
    plansEmpty: "No plans yet. Build your own order from the single prayers and the litanies.",
    planNew: "New plan",
    planNamePlaceholder: "Plan name",
    planUnnamed: "Untitled",
    planAddPrayer: "Add prayer",
    planSave: "Save",
    planCancel: "Cancel",
    planDelete: "Delete",
    planEdit: "Edit",
    planShare: "Share",
    planShareCopied: "Link copied to the clipboard.",
    planShareFallback: "Link to the plan:",
    planLimitReached: "No room for more plans.",
    planStepLimitReached: "This plan is already too long.",
    planCount: (n) => `${n} ${n === 1 ? "step" : "steps"}`,
    plansCount: (n) => `${n} ${n === 1 ? "plan" : "plans"}`,
    planImportConfirm: (n) => `Add the shared plan “${n}”?`,
    planDeleteConfirm: (n) => `Delete the plan “${n}”?`,
    plansOpenAria: "Open prayer plans",
    planBackAria: "Back to menu",
    planMoveUpAria: "Move up",
    planMoveDownAria: "Move down",
    planRemoveAria: "Remove prayer",
    planRepeatDecreaseAria: "Decrease repetitions",
    planRepeatIncreaseAria: "Increase repetitions",
    planEditAria: (n) => `Edit plan ${n}`,
    planShareAria: (n) => `Share plan ${n}`,
    planDeleteAria: (n) => `Delete plan ${n}`,
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

// Prayer-body language: Latin (false) or the translation (true). Its own key,
// independent of the session and of the UI locale above — mirrors the font-size
// and theme preferences.
const PRAYER_LANGUAGE_STORAGE_KEY = "ruzenec_prayer_language";

export function loadSavedShowTranslation(): boolean | null {
  try {
    const raw = localStorage.getItem(PRAYER_LANGUAGE_STORAGE_KEY);
    if (raw === "translation") return true;
    if (raw === "latin") return false;
  } catch {}
  return null;
}

export function saveShowTranslation(showTranslation: boolean): void {
  try {
    localStorage.setItem(PRAYER_LANGUAGE_STORAGE_KEY, showTranslation ? "translation" : "latin");
  } catch {}
}
