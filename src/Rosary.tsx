import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { finisFor } from "./rosary/missalArt";
import { type SequenceItem } from "./rosary/sequence";
import { loadSavedState, saveState } from "./rosary/storage";
import { getPrayerSetMeta, buildSequence, isBuiltInKey, isChapletKey, isPersistableKey, isRosaryKey, resolveSession, resumeStep, canGoToStep, type PrayerSetKey } from "./rosary/navigation";
import { MYSTERIES, PRAYER_TYPES } from "./rosary/prayers";
import { STRINGS, detectLocale, loadSavedLocale, saveLocale, loadSavedPrayerLanguage, savePrayerLanguage, type Locale, type PrayerLanguage } from "./rosary/i18n";
import { DEFAULT_FONT_SCALE, clampFontScale, fontSizeClamp, loadSavedFontScale, saveFontScale } from "./rosary/fontSize";
import { accentText, applyTheme, loadSavedTheme, resolveTheme, saveTheme, systemTheme, type Theme } from "./rosary/theme";
import { track } from "./rosary/analytics";
import {
  isPlanKey,
  planKeyOf,
  loadPlans,
  savePlans,
  newPlanId,
  readSharedPlanFromHash,
  requestPersistentStorage,
  MAX_PLANS,
  PLAN_COLOR,
  type Plan,
} from "./rosary/plans";
import RosaryBeads from "./rosary/RosaryBeads";
import PrayerCard from "./rosary/PrayerCard";
import PrayerSections from "./rosary/PrayerSections";
import SettingsMenu from "./rosary/SettingsMenu";
import { applyLook, headerStyles, ink, loadSavedLook, saveLook, type Look } from "./rosary/look";
import { hintToShow, loadDim, loadHintsSeen, loadVibrate, loadWelcomeSeen, saveDim, saveHintDone, saveVibrate, saveWelcomeSeen, type Hint, type HintsSeen, loadMeditation, saveMeditation } from "./rosary/prefs";
import LanguageToggle from "./rosary/LanguageToggle";
import StarIcon from "./rosary/StarIcon";
import { loadFavorites, saveFavorites, toggleFavorite } from "./rosary/favorites";
import { loadIntentions, saveIntentions, withIntention, type Intentions } from "./rosary/intentions";
import IntentionLine from "./rosary/IntentionLine";
import { MEDITATIONS } from "./rosary/meditations";
import { mysteriesOfDay } from "./rosary/liturgy";
import { chapletToOpen, loadSavedChapletFull } from "./rosary/chaplet";
import { isMenuKey, type MenuKey } from "./rosary/menu";
import MysteryMenu from "./rosary/MysteryMenu";
import PlansScreen from "./rosary/PlansScreen";
import UpdateToast from "./rosary/UpdateToast";
import { askConfirm } from "./rosary/ConfirmDialog";
import { useServiceWorkerUpdate } from "./rosary/useServiceWorkerUpdate";

type TouchSample = { x: number; y: number; time: number };

const ROMAN = ["I", "II", "III", "IV", "V"] as const;

// Side-by-side layout (progress left, card right): a phone on its side or a
// tablet. Below this a portrait phone stacks them.
const WIDE_LAYOUT = "(orientation: landscape) and (min-width: 640px)";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => typeof matchMedia !== "undefined" && matchMedia(query).matches);
  useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function Rosary() {
  // Plans are user data loaded from their own storage key; the navigation
  // helpers take the live list rather than reading storage themselves.
  const [plans, setPlansState] = useState<Plan[]>(loadPlans);
  const [plansOpen, setPlansOpen] = useState(false);
  // The starred prayers (favorites.ts), user data under their own key.
  const [favorites, setFavoritesState] = useState<MenuKey[]>(loadFavorites);
  // Each prayer's private intention (intentions.ts), shown under its label.
  const [intentions, setIntentionsState] = useState<Intentions>(loadIntentions);
  const setIntention = useCallback((key: string, text: string) => {
    setIntentionsState((prev) => {
      const next = withIntention(prev, key, text);
      saveIntentions(next);
      return next;
    });
  }, []);
  const saved = useRef(resolveSession(loadSavedState(), plans));

  const [selectedSet, setSelectedSet] = useState<PrayerSetKey | null>(saved.current.active?.key ?? null);
  const [currentStep, setCurrentStep] = useState<number>(saved.current.active?.step ?? 0);
  const [sequence, setSequence] = useState<SequenceItem[]>(saved.current.active?.sequence ?? []);
  const [started, setStarted] = useState<boolean>(!!saved.current.active);
  // Saved step of every unfinished multi-step set, so leaving one to pray
  // something else never loses its place. Kept in step with currentStep below.
  const [progress, setProgress] = useState<Record<string, number>>(saved.current.progress);
  const [prayerLanguage, setPrayerLanguageState] = useState<PrayerLanguage>(() => loadSavedPrayerLanguage() ?? "latin");
  const showTranslation = prayerLanguage === "translation";
  const [locale, setLocaleState] = useState<Locale>(() => loadSavedLocale() ?? detectLocale());
  const [fontScale, setFontScaleState] = useState<number>(() => loadSavedFontScale() ?? DEFAULT_FONT_SCALE);
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme());
  const [look, setLookState] = useState<Look>(() => loadSavedLook());
  // The prayer screen's quieter settings (prefs.ts), in the header's ⋯ menu.
  const [vibrate, setVibrateState] = useState<boolean>(loadVibrate);
  const [dim, setDimState] = useState<boolean>(loadDim);
  const [meditation, setMeditationState] = useState<boolean>(loadMeditation);
  // The prayer screen's one-time hints (prefs.ts: how to step, how to jump,
  // that ← keeps the place), each until closed or put to use.
  const [hintsSeen, setHintsSeen] = useState<HintsSeen>(loadHintsSeen);
  // The start screen's welcome card, until closed or a prayer is opened.
  const [welcomeSeen, setWelcomeSeen] = useState<boolean>(loadWelcomeSeen);
  const dismissWelcome = useCallback(() => { setWelcomeSeen(true); saveWelcomeSeen(); }, []);
  const { updateReady, applyUpdate, dismissUpdate } = useServiceWorkerUpdate();
  const t = STRINGS[locale];
  const wide = useMediaQuery(WIDE_LAYOUT);
  const prayerRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<TouchSample | null>(null);

  // Saving plans also forgets the place in any plan that was edited or
  // deleted: its saved step pointed into a sequence that no longer exists.
  const setPlans = useCallback((next: Plan[]) => {
    savePlans(next);
    const unchanged = new Set(
      next
        .filter((p) => {
          const old = plans.find((o) => o.id === p.id);
          return old && JSON.stringify(old.steps) === JSON.stringify(p.steps);
        })
        .map((p) => planKeyOf(p.id))
    );
    setProgress((prev) => {
      const stale = Object.keys(prev).filter((k) => isPlanKey(k) && !unchanged.has(k));
      if (stale.length === 0) return prev;
      const kept = { ...prev };
      for (const k of stale) delete kept[k];
      return kept;
    });
    // A deleted plan's intention goes with it.
    const live = new Set(next.map((p) => planKeyOf(p.id)));
    setIntentionsState((prev) => {
      const gone = Object.keys(prev).filter((k) => isPlanKey(k) && !live.has(k));
      if (gone.length === 0) return prev;
      const kept = { ...prev };
      for (const k of gone) delete kept[k];
      saveIntentions(kept);
      return kept;
    });
    setPlansState(next);
  }, [plans]);

  const toggleFavoriteKey = useCallback((key: MenuKey) => {
    setFavoritesState((prev) => {
      const next = toggleFavorite(prev, key);
      saveFavorites(next);
      return next;
    });
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  const setPrayerLanguage = useCallback((next: PrayerLanguage) => {
    setPrayerLanguageState(next);
    savePrayerLanguage(next);
  }, []);

  const setFontScale = useCallback((next: number) => {
    const c = clampFontScale(next);
    setFontScaleState(c);
    saveFontScale(c);
  }, []);

  const setVibrate = useCallback((on: boolean) => { setVibrateState(on); saveVibrate(on); }, []);
  const setDim = useCallback((on: boolean) => { setDimState(on); saveDim(on); }, []);
  const setMeditation = useCallback((on: boolean) => { setMeditationState(on); saveMeditation(on); }, []);
  const closeHint = useCallback((hint: Hint) => {
    setHintsSeen((prev) => (prev[hint] ? prev : { ...prev, [hint]: true }));
    saveHintDone(hint);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      saveTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  // The look is applied before the state changes, not in an effect: `ink`
  // and `headerStyles` read it while the next render runs.
  const setLook = useCallback((next: Look) => {
    saveLook(next);
    applyLook(next, theme);
    setLookState(next);
  }, [theme]);

  // Reflect the active theme on <html> (and the browser bar's colour, which
  // depends on the look too), and follow OS changes until the user has made
  // an explicit choice.
  useEffect(() => {
    applyTheme(theme);
    applyLook(look, theme);
  }, [theme, look]);

  useEffect(() => {
    if (typeof matchMedia === "undefined") return;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (!loadSavedTheme()) setThemeState(systemTheme()); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Record the open set's step in the progress map. Only multi-step sets (the
  // rosary, the linear devotions, the linear litany, plans) are tracked;
  // single-prayer sets have nothing to resume. Step 0 is "not started", so it
  // is removed rather than stored. The set just prayed moves to the END of
  // the map (delete, then re-add): object keys keep insertion order, through
  // JSON too, so the last key is the most recently prayed set — the one the
  // start screen's "continue" tile offers.
  useEffect(() => {
    if (!started || !selectedSet || !isPersistableKey(selectedSet, plans)) return;
    setProgress((prev) => {
      if (currentStep > 0 ? prev[selectedSet] === currentStep : !Object.hasOwn(prev, selectedSet)) return prev;
      const next = { ...prev };
      delete next[selectedSet];
      if (currentStep > 0) next[selectedSet] = currentStep;
      return next;
    });
  }, [selectedSet, currentStep, started, plans]);

  // Persist on every change: the progress map, plus the open set so a reload
  // reopens it (a single-prayer set reloads to the menu instead).
  useEffect(() => {
    const active = started && selectedSet && isPersistableKey(selectedSet, plans) ? selectedSet : null;
    saveState(active, progress);
  }, [selectedSet, started, progress, plans]);

  // What the start screen shows under each unfinished set: "Continue · 23/74".
  // Entries a plan edit or deletion has made unresumable are left out.
  const resume = useMemo(() => {
    const out: Record<string, { step: number; total: number }> = {};
    for (const [k, step] of Object.entries(progress)) {
      if (resumeStep(k, step, plans) !== null) out[k] = { step: step + 1, total: buildSequence(k as PrayerSetKey, plans).length };
    }
    return out;
  }, [progress, plans]);

  // The most recently prayed unfinished set, for the start screen's tile.
  const continueWith = useMemo(() => {
    const key = Object.keys(resume).at(-1) as PrayerSetKey | undefined;
    if (!key) return null;
    const meta = getPrayerSetMeta(key, plans);
    return { key, name: meta.name, color: meta.color, ...resume[key]! };
  }, [resume, plans]);

  // A shared plan arrives in the URL fragment (#plan=…). Import it once, on
  // mount: the fragment is cleared first so a reload — or a declined import —
  // can't re-prompt, and the plan gets a fresh id so a shared plan can never
  // overwrite a local one.
  useEffect(() => {
    const draft = readSharedPlanFromHash(window.location.hash);
    if (!draft) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (plans.length >= MAX_PLANS) {
      void askConfirm({ message: t.planLimitReached, confirmLabel: t.dialogOk, cancelLabel: null, color: PLAN_COLOR });
      return;
    }
    void askConfirm({ message: t.planImportConfirm(draft.name), confirmLabel: t.planImportAdd, cancelLabel: t.planCancel, color: PLAN_COLOR })
      .then((ok) => {
        if (!ok) return;
        setPlans([...plans, { ...draft, id: newPlanId(plans) }]);
        requestPersistentStorage();
        setPlansOpen(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reflect locale in the document so screen readers + browser UI pick it up.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t.appTitle;
  }, [locale, t.appTitle]);

  // Keep the screen on while praying. Re-acquire on visibilitychange because
  // browsers drop the lock when the tab is backgrounded.
  useEffect(() => {
    if (!started) return;
    let wakeLock: WakeLockSentinel | null = null;
    let alive = true;
    const acquire = async () => {
      if (!("wakeLock" in navigator) || !alive) return;
      try { wakeLock = await navigator.wakeLock.request("screen"); } catch {}
    };
    acquire();
    const onVis = () => { if (document.visibilityState === "visible") acquire(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      document.removeEventListener("visibilitychange", onVis);
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, [started]);

  // Opening a set resumes it where it was left, if it was left unfinished.
  const startSet = useCallback((key: PrayerSetKey) => {
    dismissWelcome();
    setSelectedSet(key);
    setSequence(buildSequence(key, plans));
    setCurrentStep(resumeStep(key, progress[key] ?? 0, plans) ?? 0);
    setStarted(true);
    // Plan ids are per-device and unbounded — report plans as one bucket.
    track(`pray/${isPlanKey(key) ? "plan" : key}`);
  }, [plans, progress, dismissWelcome]);

  // The static prayer pages link to a set as #pray=<key>: open it once, on
  // mount. The fragment is cleared first, so a reload doesn't reopen it. A
  // calendar reminder (reminder.ts) may also name `rosarium` — today's
  // mysteries, whatever the day — or `corona`, the chaplet in the form the
  // start screen would open.
  useEffect(() => {
    const m = /^#pray=([\w-]+)$/.exec(window.location.hash);
    if (!m) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    const key = m[1] === "rosarium" ? mysteriesOfDay(new Date())
      : m[1] === "corona" ? chapletToOpen(loadSavedChapletFull(), Object.keys(progress))
      : m[1]!;
    if (isBuiltInKey(key)) startSet(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A short tick on every step; a double pulse on reaching a decade's Gloria
  // Patri (the chaplet's tenth Pro dolorósa), so the end of a decade can be
  // felt without looking at the screen.
  const buzz = (item: SequenceItem | undefined) => {
    const decadeEnd = item?.decade !== undefined &&
      (item.type === PRAYER_TYPES.GLORY_BE || (item.type === PRAYER_TYPES.CHAPLET_PASSION && item.num === 10));
    if (!vibrate) return;
    try { navigator.vibrate?.(decadeEnd ? [35, 90, 35] : 25); } catch {}
  };

  const goToStep = (idx: number) => {
    if (canGoToStep(idx, currentStep, sequence.length)) {
      buzz(sequence[idx]);
      setCurrentStep(idx);
      // Having stepped, the first hint has done its job.
      if (!hintsSeen.step) closeHint("step");
      const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
      prayerRef.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const next = () => goToStep(currentStep + 1);
  const prev = () => goToStep(currentStep - 1);
  // A tap on a bead: the jump hint is no longer needed.
  const jumpTo = (idx: number) => {
    if (!hintsSeen.jump) closeHint("jump");
    goToStep(idx);
  };

  // Back to the menu. The set's progress stays in the map, so opening it
  // again resumes where it was left.
  const exitToMenu = () => {
    // Leaving a set part-way keeps its place: the keep hint has been shown in action.
    if (!hintsSeen.keep && hintsSeen.jump && currentStep > 0 && selectedSet && isPersistableKey(selectedSet, plans)) closeHint("keep");
    setStarted(false);
    setSelectedSet(null);
    setCurrentStep(0);
    setSequence([]);
  };

  // The start screen's × on the unfinished prayer: forget its place, after a
  // confirm (the tile then offers the previous unfinished one, if any).
  const discardProgress = async (key: PrayerSetKey) => {
    const ok = await askConfirm({ message: t.confirmDiscard, confirmLabel: t.discardLabel, cancelLabel: t.planCancel, color: getPrayerSetMeta(key, plans).color });
    if (!ok) return;
    setProgress((prev) => {
      if (!Object.hasOwn(prev, key)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  // Finishing a set forgets its progress; the next time it starts from the top.
  const finish = () => {
    if (selectedSet) {
      setProgress((prev) => {
        if (!Object.hasOwn(prev, selectedSet)) return prev;
        const next = { ...prev };
        delete next[selectedSet];
        return next;
      });
    }
    exitToMenu();
  };

  const confirmRestart = async () => {
    const ok = await askConfirm({ message: t.confirmRestart, confirmLabel: t.restartLabel, cancelLabel: t.planCancel, color: getPrayerSetMeta(selectedSet!, plans).color });
    if (ok) goToStep(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
      // An open in-app dialog owns the keyboard (it also stops keys itself,
      // but only once its effect has run).
      if (document.querySelector('[role="alertdialog"]')) return;
      // Nor do the header's settings, while focus is in them.
      if (target?.closest('[role="dialog"]')) return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, currentStep, sequence.length]);

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0]!;
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0]!;
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;
    touchStart.current = null;
    if (dt < 600 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) prev(); else next();
    }
  };

  const onPrayerCardClick = () => {
    if (window.getSelection?.()?.toString()) return;
    next();
  };

  const updateToast = updateReady ? (
    <UpdateToast locale={locale} onUpdate={applyUpdate} onDismiss={dismissUpdate} />
  ) : null;

  if (!started || !selectedSet) {
    return (
      <>
        {plansOpen ? (
          <PlansScreen
            plans={plans}
            onChange={setPlans}
            onStart={startSet}
            onClose={() => setPlansOpen(false)}
            resume={resume}
            theme={theme}
            locale={locale}
          />
        ) : (
          <MysteryMenu
            onStart={startSet}
            resume={resume}
            continueWith={continueWith}
            onDiscard={discardProgress}
            onOpenPlans={() => setPlansOpen(true)}
            planCount={plans.length}
            favorites={favorites}
            locale={locale}
            onLocaleChange={setLocale}
            theme={theme}
            onToggleTheme={toggleTheme}
            look={look}
            onLook={setLook}
            showWelcome={!welcomeSeen}
            onDismissWelcome={dismissWelcome}
          />
        )}
        {updateToast}
      </>
    );
  }

  const setMeta = getPrayerSetMeta(selectedSet, plans);
  const currentPrayer = sequence[currentStep];
  const accentColor = ink(setMeta.color);
  const hint = hintToShow(hintsSeen, {
    kind: setMeta.kind,
    persistable: isPersistableKey(selectedSet, plans),
    step: currentStep,
    length: sequence.length,
  });
  const hintText = hint === "step" ? t.hintText
    : hint === "jump" ? (setMeta.kind === "rosary" ? t.hintJumpRosary : t.hintJumpSections)
    : t.hintKeep;
  const progressPct = sequence.length > 0 ? ((currentStep + 1) / sequence.length) * 100 : 0;

  // Within a rosary decade the chip names the decade and quotes its mystery in
  // full, in the language the prayer is shown in (the La / Cz switch): in
  // Latin just the number, as Latin prayer books head them ("II. quem, Virgo,
  // visitándo Elisabeth portásti"); translated, "2. desátek: s kterým jsi,
  // Panno, Alžbětu navštívila". The prayer itself is plain from the
  // card. The chaplet's decades have no mystery: "III. Pro dolorósa".
  // Everywhere else the chip names the current prayer or section.
  const decade = currentPrayer?.decade;
  // The mystery set a decade belongs to: the open set, or in the full rosary
  // the item's part.
  const decadeSet = decade === undefined ? undefined
    : currentPrayer?.part ?? (isRosaryKey(selectedSet) ? selectedSet : undefined);
  // In the full rosary the set's name leads, so its fifteen decades read
  // "Mysteria Dolorosa · II. qui pro nobis…".
  const partName = currentPrayer?.part
    ? `${showTranslation ? MYSTERIES[currentPrayer.part].nameTr[locale] : MYSTERIES[currentPrayer.part].name} · `
    : "";
  const chipText = decade !== undefined && decadeSet
    ? partName + (showTranslation
      ? t.decadeLabel(decade + 1, MYSTERIES[decadeSet].mysteriesTr[locale][decade]!)
      : `${ROMAN[decade]}. ${MYSTERIES[decadeSet].mysteries[decade]}`)
    : decade !== undefined && isChapletKey(selectedSet)
      ? `${ROMAN[decade]}. ${currentPrayer!.label}`
      : currentPrayer?.label;

  const labelChip = (
    <div style={{ textAlign: "center", marginTop: 8, marginBottom: 4 }}>
      {/* A decade's chip quotes its mystery, so it may wrap to two lines. It
          is set in Arial, so the Latin may carry lang="la" here (the u→v
          issue is EB Garamond's alone — see Typography). */}
      <span
        lang={decadeSet ? (showTranslation ? locale : "la") : undefined}
        style={{
          display: "inline-block",
          maxWidth: "100%",
          background: accentColor + "15",
          color: accentText(accentColor, theme),
          padding: "5px 14px",
          borderRadius: 16,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: 0.3,
          lineHeight: 1.35,
        }}
      >
        {chipText}
      </span>
      {/* Where in a linear set you are, "5 z 11" (the rosary has its bar). */}
      {setMeta.kind === "linear" && (
        <span style={{ marginLeft: 8, fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>
          {t.stepCount(currentStep + 1, sequence.length)}
        </span>
      )}
      {/* The private intention, for a prayer of several steps: offered on
          the first step, then shown on every step once written. */}
      {setMeta.kind !== "single" && (
        <IntentionLine
          key={selectedSet}
          text={intentions[selectedSet]}
          offerAdd={currentStep === 0}
          onChange={(text) => setIntention(selectedSet, text)}
          color={accentText(accentColor, theme)}
          locale={locale}
        />
      )}
    </div>
  );

  // The header in the look's manner (look.ts): on the paper with a rule of
  // the set's colour and tinted buttons (Papír), a red double rule and
  // outlined buttons (Misál), or a solid bar of the set's colour (Základ).
  // The rosary's progress bar is its rule.
  const hs = headerStyles(accentColor, theme, setMeta.kind !== "rosary");

  // The next step's name, under "Next" on its button, so you know where a tap
  // leads (at Mass: which part comes next).
  const nextLabel = sequence[currentStep + 1]?.label;

  // The fruit of the mystery and a verse, at each rosary decade's Pater
  // Noster, when switched on in the ⋯ settings (meditations.ts).
  const decadeMeditation = meditation && decadeSet && currentPrayer?.type === PRAYER_TYPES.OUR_FATHER && decade !== undefined
    ? MEDITATIONS[decadeSet][decade]
    : undefined;

  const card = (
    <PrayerCard
      meditation={decadeMeditation}
      finis={finisFor(selectedSet)}
      currentPrayer={currentPrayer}
      accentColor={accentColor}
      currentStep={currentStep}
      totalSteps={sequence.length}
      onClick={onPrayerCardClick}
      locale={locale}
      language={prayerLanguage}
      fontSizeClamp={fontSizeClamp(fontScale)}
      theme={theme}
      contained
      scrollRef={prayerRef}
    />
  );

  return (
    <div style={{
      height: "100dvh",
      overflow: "hidden",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
    }}>

      {/* Sticky top: header + progress bar move together */}
      <div style={{ position: "sticky", top: 0, zIndex: 10 }}>
        {/* Two rows: the controls on top (back + restart left; the star,
            the ⋯ settings and the language right), the set's name across the full width
            below, so a long litany name never has to squeeze between buttons. */}
        <div style={{
          ...hs.bar,
          padding: "10px 14px 12px",
        }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={exitToMenu}
            aria-label={t.exitToMenuAria}
            title={t.exitToMenuAria}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 44,
              height: 40,
              padding: 0,
              border: "none",
              borderRadius: 10,
              cursor: "pointer",
              ...hs.button,
              fontSize: 18,
              fontFamily: "Arial, sans-serif",
            }}
          >
            ←
          </button>
          {/* Restart: with progress now kept across visits, this is the way
              back to the first step. Hidden on step 0, where it would do nothing. */}
          {currentStep > 0 && (
            <button
              onClick={confirmRestart}
              aria-label={t.restartAria}
              title={t.restartAria}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 40,
                padding: 0,
                border: "none",
                borderRadius: 10,
                cursor: "pointer",
                ...hs.button,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 3v6h6" />
              </svg>
            </button>
          )}
          <div style={{ flex: 1 }} />
          {isMenuKey(selectedSet) && (() => {
            const starred = favorites.includes(selectedSet);
            const label = starred ? t.favoriteRemove : t.favoriteAdd;
            return (
              <button
                onClick={() => toggleFavoriteKey(selectedSet)}
                aria-label={label}
                aria-pressed={starred}
                title={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  width: 44,
                  height: 40,
                  padding: 0,
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                  ...(starred ? hs.buttonOn : hs.button),
                }}
              >
                <StarIcon filled={starred} size={18} />
              </button>
            );
          })()}
          <SettingsMenu
            theme={theme}
            onToggleTheme={toggleTheme}
            fontScale={fontScale}
            onFontScale={setFontScale}
            vibrate={vibrate}
            onVibrate={setVibrate}
            dim={dim}
            meditation={meditation}
            onMeditation={setMeditation}
            onDim={setDim}
            look={look}
            onLook={setLook}
            accentColor={accentColor}
            locale={locale}
          />
          <LanguageToggle value={prayerLanguage} onChange={setPrayerLanguage} accentColor={accentColor} theme={theme} locale={locale} />
        </div>
        <div style={{
          marginTop: 8,
          textAlign: "center",
          ...hs.name,
          fontWeight: 600,
        }}>
          {setMeta.name}
        </div>
        </div>

        {/* Progress bar — only the rosary has a sequence long enough to
            warrant one; linear sets use the section stepper instead. */}
        {setMeta.kind === "rosary" && (
          <div style={{ height: 7, background: "var(--track)" }}>
            <div style={{
              height: "100%",
              width: `${progressPct}%`,
              background: accentColor,
              transition: "width 0.3s ease",
            }} />
          </div>
        )}
      </div>

      {/* Main content. Swipes are caught on the whole area, strand included.
          Portrait: the progress (the rosary's bead ring, or a linear set's
          strand) and the label are pinned above a card that scrolls its text
          inside, so a long prayer never scrolls the progress, or the card's
          rounded top, out of view. Landscape (a phone on its side, a tablet):
          the progress gets a column of its own on the left, beside the card. */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: wide ? "row" : "column" }}
      >
        <div style={wide
          ? { flex: "0 0 38%", maxWidth: 440, minHeight: 0, overflow: "auto", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 8px 12px 20px" }
          : { flexShrink: 0, padding: "8px 14px 0" }}
        >
          {setMeta.kind === "rosary" ? (
            <RosaryBeads
              currentStep={currentStep}
              sequence={sequence}
              accentColor={accentColor}
              onJump={jumpTo}
              locale={locale}
              {...(wide ? { maxHeight: "60dvh", maxWidth: 320 } : {})}
            />
          ) : setMeta.kind === "linear" ? (
            <PrayerSections sequence={sequence} currentStep={currentStep} accentColor={accentColor} onJump={jumpTo} locale={locale} />
          ) : null}
          {labelChip}
        </div>
        {/* The card sits right under the label (portrait) rather than centred
            in the space left, so it stays next to the progress and doesn't
            move as the text length changes from step to step. */}
        <div style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: wide ? "center" : "flex-start",
          padding: wide ? "12px 20px 12px 8px" : "6px 14px 12px",
        }}>
          {card}
        </div>
      </div>

      {/* The one-time hints (prefs.ts hintToShow): how to move on, how to
          jump by a bead, that ← keeps the place; one at a time. */}
      {hint && (
        <div role="note" style={{
          margin: "0 14px 2px",
          padding: "8px 8px 8px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "var(--surface)",
          border: "1px solid var(--border-strong)",
          borderRadius: 12,
          fontSize: 13,
          lineHeight: 1.35,
          color: "var(--text)",
        }}>
          <span style={{ flex: 1 }}>{hintText}</span>
          <button
            onClick={() => closeHint(hint)}
            style={{
              flexShrink: 0,
              minHeight: 36,
              padding: "0 12px",
              border: "none",
              borderRadius: 10,
              background: accentColor + "18",
              color: accentText(accentColor, theme),
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "Arial, sans-serif",
            }}
          >
            {t.hintDismiss}
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav aria-label={t.navAria} style={{
        padding: "10px 16px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "var(--nav-fade)",
      }}>
        <button
          onClick={prev}
          disabled={currentStep === 0}
          aria-label={t.previousAria}
          style={{
            padding: "14px 32px",
            borderRadius: 14,
            border: "1px solid var(--border-strong)",
            background: "var(--surface)",
            color: currentStep === 0 ? "var(--border-strong)" : "var(--text-soft)",
            cursor: currentStep === 0 ? "default" : "pointer",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          {t.previous}
        </button>

        {currentStep < sequence.length - 1 ? (
          <button
            onClick={next}
            aria-label={nextLabel ? t.nextStepAria(nextLabel) : t.nextAria}
            style={{
              minWidth: 0,
              maxWidth: 230,
              padding: nextLabel ? "7px 28px" : "14px 40px",
              borderRadius: 14,
              border: "none",
              background: accentColor,
              color: "white",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
              boxShadow: `0 4px 16px ${accentColor}40`,
              transition: "all 0.2s ease",
            }}
          >
            <div>{t.next}</div>
            {nextLabel && (
              <div style={{ fontSize: 12, fontWeight: 400, opacity: 0.9, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {nextLabel}
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={finish}
            aria-label={t.finishAria}
            style={{
              padding: "14px 40px",
              borderRadius: 14,
              border: "none",
              background: accentColor,
              color: "white",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
              boxShadow: `0 4px 16px ${accentColor}40`,
            }}
          >
            {t.finish} ✝
          </button>
        )}
      </nav>

      {/* The dimmed screen: a dark veil over everything, letting taps through. */}
      {dim && (
        <div aria-hidden="true" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", pointerEvents: "none", zIndex: 50 }} />
      )}

      {updateToast}
    </div>
  );
}
