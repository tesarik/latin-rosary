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
  aboutBuilt: string;
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
    aboutBuilt: "sestaveno",
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
    aboutBuilt: "built",
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
    aboutBuilt: "zostavené",
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
    errorTitle: "Niečo sa pokazilo",
    errorMessage: "V aplikácii nastala neočakávaná chyba.",
    errorReload: "Načítať znova",
    errorReset: "Vymazať uložený postup a načítať znova",
    updateAvailable: "K dispozícii je nová verzia.",
    updateAction: "Aktualizovať",
    updateDismissAria: "Zavrieť oznámenie",
    plansTitle: "Modlitebné plány",
    plansTileHint: "Vlastné poradie modlitieb",
    plansEmpty: "Zatiaľ nemáte žiadny plán. Zostavte si vlastné poradie z jednotlivých modlitieb a litánií.",
    planNew: "Nový plán",
    planNamePlaceholder: "Názov plánu",
    planUnnamed: "Bez názvu",
    planAddPrayer: "Pridať modlitbu",
    planSave: "Uložiť",
    planCancel: "Zrušiť",
    planDelete: "Zmazať",
    planEdit: "Upraviť",
    planShare: "Zdieľať",
    planShareCopied: "Odkaz skopírovaný do schránky.",
    planShareFallback: "Odkaz na plán:",
    planLimitReached: "Viac plánov už uložiť nemožno.",
    planStepLimitReached: "Plán je už príliš dlhý.",
    planCount: (n) => `${n} ${n === 1 ? "krok" : n < 5 ? "kroky" : "krokov"}`,
    plansCount: (n) => `${n} ${n === 1 ? "plán" : n < 5 ? "plány" : "plánov"}`,
    planImportConfirm: (n) => `Pridať zdieľaný plán „${n}“?`,
    planDeleteConfirm: (n) => `Zmazať plán „${n}“?`,
    plansOpenAria: "Otvoriť modlitebné plány",
    planBackAria: "Späť do menu",
    planMoveUpAria: "Posunúť nahor",
    planMoveDownAria: "Posunúť nadol",
    planRemoveAria: "Odobrať modlitbu",
    planRepeatDecreaseAria: "Znížiť počet opakovaní",
    planRepeatIncreaseAria: "Zvýšiť počet opakovaní",
    planEditAria: (n) => `Upraviť plán ${n}`,
    planShareAria: (n) => `Zdieľať plán ${n}`,
    planDeleteAria: (n) => `Zmazať plán ${n}`,
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
    aboutBuilt: "erstellt",
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
    errorTitle: "Etwas ist schiefgelaufen",
    errorMessage: "In der App ist ein unerwarteter Fehler aufgetreten.",
    errorReload: "Neu laden",
    errorReset: "Gespeicherten Fortschritt löschen und neu laden",
    updateAvailable: "Eine neue Version ist verfügbar.",
    updateAction: "Aktualisieren",
    updateDismissAria: "Benachrichtigung schließen",
    plansTitle: "Gebetspläne",
    plansTileHint: "Eigene Reihenfolge der Gebete",
    plansEmpty: "Noch keine Pläne. Stellen Sie Ihre eigene Reihenfolge aus den einzelnen Gebeten und Litaneien zusammen.",
    planNew: "Neuer Plan",
    planNamePlaceholder: "Name des Plans",
    planUnnamed: "Ohne Titel",
    planAddPrayer: "Gebet hinzufügen",
    planSave: "Speichern",
    planCancel: "Abbrechen",
    planDelete: "Löschen",
    planEdit: "Bearbeiten",
    planShare: "Teilen",
    planShareCopied: "Link in die Zwischenablage kopiert.",
    planShareFallback: "Link zum Plan:",
    planLimitReached: "Es können keine weiteren Pläne gespeichert werden.",
    planStepLimitReached: "Dieser Plan ist bereits zu lang.",
    planCount: (n) => `${n} ${n === 1 ? "Schritt" : "Schritte"}`,
    plansCount: (n) => `${n} ${n === 1 ? "Plan" : "Pläne"}`,
    planImportConfirm: (n) => `Geteilten Plan „${n}“ hinzufügen?`,
    planDeleteConfirm: (n) => `Plan „${n}“ löschen?`,
    plansOpenAria: "Gebetspläne öffnen",
    planBackAria: "Zurück zum Menü",
    planMoveUpAria: "Nach oben",
    planMoveDownAria: "Nach unten",
    planRemoveAria: "Gebet entfernen",
    planRepeatDecreaseAria: "Wiederholungen verringern",
    planRepeatIncreaseAria: "Wiederholungen erhöhen",
    planEditAria: (n) => `Plan ${n} bearbeiten`,
    planShareAria: (n) => `Plan ${n} teilen`,
    planDeleteAria: (n) => `Plan ${n} löschen`,
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
    aboutBuilt: "zbudowano",
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
    errorTitle: "Coś poszło nie tak",
    errorMessage: "W aplikacji wystąpił nieoczekiwany błąd.",
    errorReload: "Załaduj ponownie",
    errorReset: "Wyczyść zapisany postęp i załaduj ponownie",
    updateAvailable: "Dostępna jest nowa wersja.",
    updateAction: "Aktualizuj",
    updateDismissAria: "Zamknij powiadomienie",
    plansTitle: "Plany modlitewne",
    plansTileHint: "Własna kolejność modlitw",
    plansEmpty: "Nie masz jeszcze żadnego planu. Ułóż własną kolejność z pojedynczych modlitw i litanii.",
    planNew: "Nowy plan",
    planNamePlaceholder: "Nazwa planu",
    planUnnamed: "Bez nazwy",
    planAddPrayer: "Dodaj modlitwę",
    planSave: "Zapisz",
    planCancel: "Anuluj",
    planDelete: "Usuń",
    planEdit: "Edytuj",
    planShare: "Udostępnij",
    planShareCopied: "Link skopiowany do schowka.",
    planShareFallback: "Link do planu:",
    planLimitReached: "Nie można zapisać więcej planów.",
    planStepLimitReached: "Ten plan jest już za długi.",
    planCount: (n) => { const d = n % 10, h = n % 100; return `${n} ${n === 1 ? "krok" : d >= 2 && d <= 4 && (h < 12 || h > 14) ? "kroki" : "kroków"}`; },
    plansCount: (n) => { const d = n % 10, h = n % 100; return `${n} ${n === 1 ? "plan" : d >= 2 && d <= 4 && (h < 12 || h > 14) ? "plany" : "planów"}`; },
    planImportConfirm: (n) => `Dodać udostępniony plan „${n}”?`,
    planDeleteConfirm: (n) => `Usunąć plan „${n}”?`,
    plansOpenAria: "Otwórz plany modlitewne",
    planBackAria: "Powrót do menu",
    planMoveUpAria: "Przesuń w górę",
    planMoveDownAria: "Przesuń w dół",
    planRemoveAria: "Usuń modlitwę",
    planRepeatDecreaseAria: "Zmniejsz liczbę powtórzeń",
    planRepeatIncreaseAria: "Zwiększ liczbę powtórzeń",
    planEditAria: (n) => `Edytuj plan ${n}`,
    planShareAria: (n) => `Udostępnij plan ${n}`,
    planDeleteAria: (n) => `Usunąć plan ${n}`,
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
