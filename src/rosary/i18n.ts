// UI strings and the supported UI languages (Czech and English).
//
// The Latin prayer texts in prayers.ts are never localized; the *translations*
// beside them (prayers.<locale>.ts, see translations.ts) are keyed by exactly
// these locales, so
// adding a locale here means adding a full translation of every prayer.

export const SUPPORTED_LOCALES = ["cs", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// For a browser in any other language: English is the one more visitors read.
export const DEFAULT_LOCALE: Locale = "en";

// Languages close enough to a supported one to be served it rather than the
// default.
const LOCALE_FALLBACKS: Record<string, Locale> = { sk: "cs" };

type Strings = {
  appTitle: string;
  // The start screen's line under the title.
  appSubtitle: string;
  back: string;
  previous: string;
  next: string;
  finish: string;
  exitToMenuAria: string;
  restartAria: string;
  confirmRestart: string;
  // Under an unfinished set on the start screen: "Continue · 23/74".
  resumeAt: (step: number, total: number) => string;
  // Small heading over the start screen's tile for the last unfinished prayer.
  continueHeading: string;
  welcomeTitle: string;
  welcomePoints: readonly (readonly [string, string])[];
  welcomeDismiss: string;
  welcomeSubtitle: string;
  welcomeMore: string;
  rosaryHeading: string;
  discardAria: (name: string) => string;
  confirmDiscard: string;
  discardLabel: string;
  // In-app dialogs.
  dialogOk: string;
  restartLabel: string;
  planImportAdd: string;
  // Label chip within a rosary decade (translation shown): its number and the
  // mystery in full. With Latin shown, the chip is Latin ("II. quem, …").
  decadeLabel: (n: number, mystery: string) => string;
  navAria: string;
  previousAria: string;
  nextAria: string;
  finishAria: string;
  languagePickerAria: string;
  textSizeAria: string;
  textSizeDecreaseAria: string;
  textSizeIncreaseAria: string;
  settingsAria: string;
  settingsDarkMode: string;
  settingsVibrate: string;
  lookHeading: string;
  lookNames: Record<"base" | "paper" | "missal", string>;
  settingsHeading: string;
  settingsDim: string;
  hintText: string;
  hintDismiss: string;
  hintJumpRosary: string;
  hintJumpSections: string;
  hintKeep: string;
  nextStepAria: (name: string) => string;
  stepCount: (step: number, total: number) => string;
  searchPlaceholder: string;
  searchClear: string;
  searchNoResults: string;
  searchResults: (n: number) => string;
  themeToggleAria: string;
  aboutTitle: string;
  helpTitle: string;
  aboutText: string;
  // What the app never asks of you, under the description.
  aboutPromise: string;
  // Where the pictures come from.
  aboutArt: string;
  aboutCreator: string;
  aboutFeedback: string;
  aboutAnalytics: string;
  aboutClose: string;
  aboutBuilt: string;
  // Link from About to the static prayer pages (texts to read and share).
  aboutPrayerTexts: string;
  localeName: string;
  // Two-letter code on the header language button (La ↔ this).
  prayerLanguageShort: string;
  otherPrayersHeading: string;
  myPrayersHeading: string;
  tabRosary: string;
  tabPrayers: string;
  tabMine: string;
  tabsAria: string;
  tabPrayersTitle: string;
  favoritesEmpty: string;
  // Tag on the mysteries prayed today, and on the Marian antiphon of the season.
  todayBadge: string;
  seasonBadge: string;
  inSeasonHeading: string;
  favoritesHeading: string;
  favoritesSubtitle: string;
  favoriteAdd: string;
  favoriteRemove: string;
  inSeasonSubtitle: string;
  // Under the Angelus in Eastertide, when the Regína Cæli takes its place.
  angelusEastertide: string;
  // The switch under the Chaplet of Divine Mercy that adds its optional
  // opening and closing prayers.
  chapletOptional: string;
  startRosaryAria: (mysteryName: string) => string;
  startPrayerAria: (prayerName: string) => string;
  stepXofY: (step: number, total: number) => string;
  jumpToOpeningPaterNoster: (step: number, total: number) => string;
  jumpToDecade: (n: number) => string;
  rosaryAria: (step: number, total: number) => string;
  prayerSectionsAria: string;
  jumpToSection: (name: string) => string;
  prayerLanguageAria: string;
  // The three sides of the header's language switch, for screen readers.
  prayerLanguageLatin: string;
  prayerLanguageBoth: string;
  prayerLanguageTranslation: string;
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
  // A plan's own prayers.
  planCustomAdd: string;
  planCustomTag: string;
  planCustomTitle: string;
  planCustomText: string;
  planCustomTextTr: string;
  planCustomTextTrHint: string;
  planCustomAddToPlan: string;
  planCustomLimit: string;
  planCustomEditAria: (title: string) => string;
  planShareLong: string;
  // Backup of all plans as a file.
  // The Mine tab's backup card (BackupCard).
  backupHeading: string;
  backupHint: string;
  backupExport: string;
  backupImport: string;
  backupFileName: string;
  backupConfirm: string;
  backupContents: (s: { plans: number; favorites: number; places: number; prefs: boolean }) => string;
  backupLoad: string;
  backupNothing: string;
  backupInvalid: string;
};

export const STRINGS: Record<Locale, Strings> = {
  cs: {
    appTitle: "Latinský růženec",
    appSubtitle: "a jiné modlitby",
    back: "Zpět",
    previous: "Předchozí",
    next: "Další",
    finish: "Dokončit",
    exitToMenuAria: "Zpět do menu, postup zůstane uložen",
    restartAria: "Začít modlitbu znovu",
    confirmRestart: "Začít modlitbu znovu od začátku?",
    resumeAt: (step, total) => `Pokračovat · ${step}/${total}`,
    continueHeading: "Nedokončená modlitba",
    welcomeTitle: "Vítejte",
    welcomePoints: [
      ["Začněte modlitbou", "Dnešní tajemství růžence jsou hned pod touto kartou. Dál se postupuje ťuknutím na text nebo přejetím prstem."],
      ["Latina a překlad", "Přepínač La | Cz v záhlaví modlitby ukáže latinu, latinu s překladem pod každým řádkem, nebo jen češtinu."],
      ["Další modlitby", "Litanie, hymny a mešní texty jsou na kartě Modlitby. Oblíbené a vlastní plány na kartě Moje."],
    ],
    welcomeDismiss: "Rozumím",
    welcomeSubtitle: "Tři věci na začátek",
    welcomeMore: "Víc v nápovědě",
    rosaryHeading: "Růženec a korunka",
    discardAria: (name) => `Odebrat nedokončenou modlitbu ${name}`,
    confirmDiscard: "Zapomenout, kde jste skončili? Modlitba pak začne od začátku.",
    discardLabel: "Zapomenout",
    dialogOk: "OK",
    restartLabel: "Začít znovu",
    planImportAdd: "Přidat",
    decadeLabel: (n, m) => `${n}. desátek: ${m}`,
    navAria: "Navigace modlitby",
    previousAria: "Předchozí modlitba",
    nextAria: "Další modlitba",
    finishAria: "Dokončit modlitbu",
    languagePickerAria: "Volba jazyka",
    textSizeAria: "Velikost písma",
    textSizeDecreaseAria: "Zmenšit písmo",
    textSizeIncreaseAria: "Zvětšit písmo",
    settingsAria: "Nastavení zobrazení",
    settingsDarkMode: "Tmavý režim",
    settingsVibrate: "Vibrace při každém kroku",
    lookHeading: "Vzhled",
    lookNames: { base: "Základ", paper: "Papír", missal: "Misál" },
    settingsHeading: "Nastavení",
    settingsDim: "Ztlumit obrazovku",
    hintText: "Další modlitbu otevřete ťuknutím na text nebo přejetím prstem doleva, předchozí přejetím doprava.",
    hintDismiss: "Rozumím",
    hintJumpRosary: "Ťuknutím na větší korálek přeskočíte na jiný desátek.",
    hintJumpSections: "Ťuknutím na větší korálek nahoře přeskočíte na jinou část modlitby.",
    hintKeep: "Šipkou ← se vrátíte do nabídky a místo zůstane uložené. Příště budete pokračovat tam, kde jste skončili.",
    nextStepAria: (name) => `Další modlitba: ${name}`,
    stepCount: (step, total) => `${step} z ${total}`,
    searchPlaceholder: "Hledat modlitbu",
    searchClear: "Vymazat hledání",
    searchNoResults: "Žádná modlitba neodpovídá hledání.",
    searchResults: (n) => `Nalezeno: ${n}`,
    themeToggleAria: "Přepnout tmavý režim",
    aboutTitle: "O aplikaci",
    helpTitle: "Nápověda",
    aboutText: "Modlitba růžence a dalších modliteb v latině s českým překladem.",
    aboutPromise: "Zdarma, bez reklam, bez účtu a bez sledování. Funguje i bez internetu a vše, co si uložíte, zůstává ve vašem zařízení.",
    aboutArt: "Dřevoryty ve vzhledu Misál pocházejí z římského misálu z let 1883–1887.",
    aboutCreator: "Tvůrce",
    aboutFeedback: "Chyby a návrhy posílejte na",
    aboutAnalytics: "Sbírají se anonymní statistiky používání, bez cookies.",
    aboutClose: "Zavřít",
    aboutBuilt: "sestaveno",
    aboutPrayerTexts: "Texty modliteb na webu",
    localeName: "Čeština",
    prayerLanguageShort: "Cz",
    otherPrayersHeading: "Další latinské modlitby",
    myPrayersHeading: "Moje modlitby",
    tabRosary: "Růženec",
    tabPrayers: "Modlitby",
    tabMine: "Moje",
    tabsAria: "Části aplikace",
    tabPrayersTitle: "Latinské modlitby",
    favoritesEmpty: "Modlitbu přidáte do oblíbených hvězdičkou ☆ v její hlavičce. Najdete ji pak tady.",
    todayBadge: "dnes",
    seasonBadge: "nyní",
    inSeasonHeading: "V tuto dobu",
    favoritesHeading: "Oblíbené",
    favoritesSubtitle: "Modlitby označené hvězdičkou",
    favoriteAdd: "Přidat do oblíbených",
    favoriteRemove: "Odebrat z oblíbených",
    inSeasonSubtitle: "Antifona doby, svátky a měsíce",
    angelusEastertide: "V době velikonoční se místo něj modlí Regína Cæli",
    chapletOptional: "S nepovinnými modlitbami",
    startRosaryAria: (n) => `Začít růženec — ${n}`,
    startPrayerAria: (n) => `Začít modlitbu — ${n}`,
    stepXofY: (s, t) => `krok ${s} z ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Skočit na Pater Noster úvodu, krok ${s} z ${t}`,
    jumpToDecade: (n) => `Skočit na ${n}. desátek`,
    rosaryAria: (s, t) => `Růženec, krok ${s} z ${t}`,
    prayerSectionsAria: "Sekce modlitby",
    jumpToSection: (n) => `Skočit na ${n}`,
    prayerLanguageAria: "Jazyk modlitby",
    prayerLanguageLatin: "Latinsky",
    prayerLanguageBoth: "Latinsky s překladem",
    prayerLanguageTranslation: "Česky",
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
    planCustomAdd: "Vlastní modlitba",
    planCustomTag: "vlastní modlitba",
    planCustomTitle: "Název modlitby",
    planCustomText: "Text latinsky",
    planCustomTextTr: "Text česky (nepovinné)",
    planCustomTextTrHint: "Tlačítko jazyka v hlavičce pak přepíná mezi latinou a češtinou.",
    planCustomAddToPlan: "Přidat do plánu",
    planCustomLimit: "Plán může mít nejvýš 10 vlastních modliteb.",
    planCustomEditAria: (n) => `Upravit modlitbu ${n}`,
    planShareLong: "Odkaz je dlouhý – některé aplikace ho mohou zkrátit.",
    backupHeading: "Záloha",
    backupHint: "Plány, oblíbené, rozmodlené modlitby i nastavení jsou uložené jen v tomto prohlížeči. Uložte si je jako soubor a později je načtěte zpět, třeba v jiném zařízení.",
    backupExport: "Uložit zálohu",
    backupImport: "Načíst zálohu",
    backupFileName: "rosarium-zaloha",
    backupConfirm: "Načíst zálohu? Nic se nesmaže, jen se přidá:",
    backupContents: ({ plans, favorites, places, prefs }) => [
      plans > 0 && `plány: ${plans}`,
      favorites > 0 && `oblíbené: ${favorites}`,
      places > 0 && `rozmodlené modlitby: ${places}`,
      prefs && "nastavení ze zálohy",
    ].filter(Boolean).join(" · "),
    backupLoad: "Načíst",
    backupNothing: "V záloze není nic, co by tu už nebylo.",
    backupInvalid: "Tento soubor není záloha této aplikace.",
  },
  en: {
    appTitle: "Latin Rosary",
    appSubtitle: "and other prayers",
    back: "Back",
    previous: "Previous",
    next: "Next",
    finish: "Finish",
    exitToMenuAria: "Back to menu, your progress is kept",
    restartAria: "Start the prayer again",
    confirmRestart: "Start this prayer again from the beginning?",
    resumeAt: (step, total) => `Continue · ${step}/${total}`,
    continueHeading: "Unfinished prayer",
    welcomeTitle: "Welcome",
    welcomePoints: [
      ["Start with a prayer", "Today's mysteries of the rosary are just below this card. Tap the text or swipe to move on."],
      ["Latin and translation", "The La | En switch in a prayer's header shows the Latin, the Latin with the English under each line, or the English alone."],
      ["More prayers", "Litanies, hymns and the texts of the Mass are under Prayers. Favourites and your own plans under Mine."],
    ],
    welcomeDismiss: "Got it",
    welcomeSubtitle: "Three things to start with",
    welcomeMore: "More in Help",
    rosaryHeading: "Rosary and chaplet",
    discardAria: (name) => `Remove the unfinished ${name}`,
    confirmDiscard: "Forget where you left off? The prayer will then start from the beginning.",
    discardLabel: "Forget",
    dialogOk: "OK",
    restartLabel: "Start again",
    planImportAdd: "Add",
    decadeLabel: (n, m) => `Decade ${n}: ${m}`,
    navAria: "Prayer navigation",
    previousAria: "Previous prayer",
    nextAria: "Next prayer",
    finishAria: "Finish prayer",
    languagePickerAria: "Language",
    textSizeAria: "Text size",
    textSizeDecreaseAria: "Decrease text size",
    textSizeIncreaseAria: "Increase text size",
    settingsAria: "Display settings",
    settingsDarkMode: "Dark mode",
    settingsVibrate: "Vibrate on every step",
    lookHeading: "Look",
    lookNames: { base: "Basic", paper: "Paper", missal: "Missal" },
    settingsHeading: "Settings",
    settingsDim: "Dim the screen",
    hintText: "Tap the prayer or swipe left for the next one; swipe right to go back.",
    hintDismiss: "Got it",
    hintJumpRosary: "Tap a larger bead to jump to another decade.",
    hintJumpSections: "Tap a larger bead above to jump to another part of the prayer.",
    hintKeep: "The ← arrow takes you back to the menu and keeps your place, so next time you carry on where you stopped.",
    nextStepAria: (name) => `Next prayer: ${name}`,
    stepCount: (step, total) => `${step} of ${total}`,
    searchPlaceholder: "Search prayers",
    searchClear: "Clear search",
    searchNoResults: "No prayer matches the search.",
    searchResults: (n) => `Found: ${n}`,
    themeToggleAria: "Toggle dark mode",
    aboutTitle: "About",
    helpTitle: "Help",
    aboutText: "Praying the rosary and other prayers in Latin, with an English translation.",
    aboutPromise: "Free, with no ads, no account and no tracking. It works offline, and everything you save stays on your device.",
    aboutArt: "The woodcuts of the Missal look come from a Roman Missal of 1883–1887.",
    aboutCreator: "Created by",
    aboutFeedback: "Send errors and improvements to",
    aboutAnalytics: "Anonymous, cookieless usage statistics are collected.",
    aboutClose: "Close",
    aboutBuilt: "built",
    aboutPrayerTexts: "The prayer texts on the web",
    localeName: "English",
    prayerLanguageShort: "En",
    otherPrayersHeading: "Other Latin prayers",
    myPrayersHeading: "My prayers",
    tabRosary: "Rosary",
    tabPrayers: "Prayers",
    tabMine: "Mine",
    tabsAria: "Sections of the app",
    tabPrayersTitle: "Latin prayers",
    favoritesEmpty: "Star a prayer with the ☆ in its header and it will appear here.",
    todayBadge: "today",
    seasonBadge: "now",
    inSeasonHeading: "In season",
    favoritesHeading: "Favourites",
    favoritesSubtitle: "The prayers you starred",
    favoriteAdd: "Add to favourites",
    favoriteRemove: "Remove from favourites",
    inSeasonSubtitle: "The antiphon of the season, feasts and months",
    angelusEastertide: "In Eastertide the Regína Cæli is prayed instead",
    chapletOptional: "With the optional prayers",
    startRosaryAria: (n) => `Start rosary — ${n}`,
    startPrayerAria: (n) => `Start prayer — ${n}`,
    stepXofY: (s, t) => `step ${s} of ${t}`,
    jumpToOpeningPaterNoster: (s, t) => `Jump to opening Pater Noster, step ${s} of ${t}`,
    jumpToDecade: (n) => `Jump to decade ${n}`,
    rosaryAria: (s, t) => `Rosary, step ${s} of ${t}`,
    prayerSectionsAria: "Prayer sections",
    jumpToSection: (n) => `Jump to ${n}`,
    prayerLanguageAria: "Prayer language",
    prayerLanguageLatin: "Latin",
    prayerLanguageBoth: "Latin with translation",
    prayerLanguageTranslation: "English",
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
    planCustomAdd: "Own prayer",
    planCustomTag: "own prayer",
    planCustomTitle: "Prayer title",
    planCustomText: "Latin text",
    planCustomTextTr: "English text (optional)",
    planCustomTextTrHint: "The language button in the header then switches between the Latin and the English.",
    planCustomAddToPlan: "Add to plan",
    planCustomLimit: "A plan can hold at most 10 prayers of your own.",
    planCustomEditAria: (n) => `Edit prayer ${n}`,
    planShareLong: "The link is long; some apps may cut it short.",
    backupHeading: "Backup",
    backupHint: "Your plans, favourites, unfinished prayers and settings are stored only in this browser. Save them as a file and load them back later, on another device too.",
    backupExport: "Save a backup",
    backupImport: "Load a backup",
    backupFileName: "rosarium-backup",
    backupConfirm: "Load the backup? Nothing is deleted; it adds:",
    backupContents: ({ plans, favorites, places, prefs }) => [
      plans > 0 && `plans: ${plans}`,
      favorites > 0 && `favourites: ${favorites}`,
      places > 0 && `unfinished prayers: ${places}`,
      prefs && "the backup's settings",
    ].filter(Boolean).join(" · "),
    backupLoad: "Load",
    backupNothing: "The backup holds nothing that isn't here already.",
    backupInvalid: "This file is not a backup of this app.",
  },
};

// Match navigator.language(s) to a supported locale, or to a close one (Slovak
// → Czech); fall back to DEFAULT_LOCALE.
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
    if (tag && Object.prototype.hasOwnProperty.call(LOCALE_FALLBACKS, tag)) {
      return LOCALE_FALLBACKS[tag];
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

// Prayer-body language: the Latin, the Latin with the translation under each
// line ("both"), or the translation. It stores which side, not which language,
// so it survives a locale change. Its own key, independent of the session and
// of the UI locale above — mirrors the font-size and theme preferences.
export type PrayerLanguage = "latin" | "both" | "translation";
export const PRAYER_LANGUAGES: readonly PrayerLanguage[] = ["latin", "both", "translation"];
const PRAYER_LANGUAGE_STORAGE_KEY = "ruzenec_prayer_language";

export function loadSavedPrayerLanguage(): PrayerLanguage | null {
  try {
    const raw = localStorage.getItem(PRAYER_LANGUAGE_STORAGE_KEY);
    if ((PRAYER_LANGUAGES as readonly string[]).includes(raw ?? "")) return raw as PrayerLanguage;
  } catch {}
  return null;
}

export function savePrayerLanguage(lang: PrayerLanguage): void {
  try {
    localStorage.setItem(PRAYER_LANGUAGE_STORAGE_KEY, lang);
  } catch {}
}
