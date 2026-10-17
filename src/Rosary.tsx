import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { type SequenceItem } from "./rosary/sequence";
import { loadSavedState, saveState } from "./rosary/storage";
import { getPrayerSetMeta, buildSequence, isPersistableKey, resolveSession, resumeStep, canGoToStep, type PrayerSetKey } from "./rosary/navigation";
import { STRINGS, detectLocale, loadSavedLocale, saveLocale, loadSavedShowTranslation, saveShowTranslation, type Locale } from "./rosary/i18n";
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
  type Plan,
} from "./rosary/plans";
import RosaryBeads from "./rosary/RosaryBeads";
import PrayerCard from "./rosary/PrayerCard";
import PrayerSections from "./rosary/PrayerSections";
import FontSizeControl from "./rosary/FontSizeControl";
import LanguageToggle from "./rosary/LanguageToggle";
import MysteryMenu from "./rosary/MysteryMenu";
import PlansScreen from "./rosary/PlansScreen";
import UpdateToast from "./rosary/UpdateToast";
import { useServiceWorkerUpdate } from "./rosary/useServiceWorkerUpdate";

type TouchSample = { x: number; y: number; time: number };

export default function Rosary() {
  // Plans are user data loaded from their own storage key; the navigation
  // helpers take the live list rather than reading storage themselves.
  const [plans, setPlansState] = useState<Plan[]>(loadPlans);
  const [plansOpen, setPlansOpen] = useState(false);
  const saved = useRef(resolveSession(loadSavedState(), plans));

  const [selectedSet, setSelectedSet] = useState<PrayerSetKey | null>(saved.current.active?.key ?? null);
  const [currentStep, setCurrentStep] = useState<number>(saved.current.active?.step ?? 0);
  const [sequence, setSequence] = useState<SequenceItem[]>(saved.current.active?.sequence ?? []);
  const [started, setStarted] = useState<boolean>(!!saved.current.active);
  // Saved step of every unfinished multi-step set, so leaving one to pray
  // something else never loses its place. Kept in step with currentStep below.
  const [progress, setProgress] = useState<Record<string, number>>(saved.current.progress);
  const [showTranslation, setShowTranslationState] = useState<boolean>(() => loadSavedShowTranslation() ?? false);
  const [locale, setLocaleState] = useState<Locale>(() => loadSavedLocale() ?? detectLocale());
  const [fontScale, setFontScaleState] = useState<number>(() => loadSavedFontScale() ?? DEFAULT_FONT_SCALE);
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme());
  const { updateReady, applyUpdate, dismissUpdate } = useServiceWorkerUpdate();
  const t = STRINGS[locale];
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
    setPlansState(next);
  }, [plans]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  const setShowTranslation = useCallback((next: boolean) => {
    setShowTranslationState(next);
    saveShowTranslation(next);
  }, []);

  const setFontScale = useCallback((next: number) => {
    const c = clampFontScale(next);
    setFontScaleState(c);
    saveFontScale(c);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      saveTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  // Reflect the active theme on <html>, and follow OS changes until the user
  // has made an explicit choice.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

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
  // is removed rather than stored.
  useEffect(() => {
    if (!started || !selectedSet || !isPersistableKey(selectedSet, plans)) return;
    setProgress((prev) => {
      if (currentStep > 0 ? prev[selectedSet] === currentStep : !Object.hasOwn(prev, selectedSet)) return prev;
      const next = { ...prev };
      if (currentStep > 0) next[selectedSet] = currentStep;
      else delete next[selectedSet];
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

  // A shared plan arrives in the URL fragment (#plan=…). Import it once, on
  // mount: the fragment is cleared first so a reload — or a declined import —
  // can't re-prompt, and the plan gets a fresh id so a shared plan can never
  // overwrite a local one.
  useEffect(() => {
    const draft = readSharedPlanFromHash(window.location.hash);
    if (!draft) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
    if (plans.length >= MAX_PLANS) {
      window.alert(t.planLimitReached);
      return;
    }
    if (!window.confirm(t.planImportConfirm(draft.name))) return;
    setPlans([...plans, { ...draft, id: newPlanId(plans) }]);
    requestPersistentStorage();
    setPlansOpen(true);
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
    setSelectedSet(key);
    setSequence(buildSequence(key, plans));
    setCurrentStep(resumeStep(key, progress[key] ?? 0, plans) ?? 0);
    setStarted(true);
    // Plan ids are per-device and unbounded — report plans as one bucket.
    track(`pray/${isPlanKey(key) ? "plan" : key}`);
  }, [plans, progress]);

  const buzz = () => { try { navigator.vibrate?.(25); } catch {} };

  const goToStep = (idx: number) => {
    if (canGoToStep(idx, currentStep, sequence.length)) {
      buzz();
      setCurrentStep(idx);
      const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
      prayerRef.current?.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const next = () => goToStep(currentStep + 1);
  const prev = () => goToStep(currentStep - 1);
  const jumpTo = (idx: number) => goToStep(idx);

  // Back to the menu. The set's progress stays in the map, so opening it
  // again resumes where it was left.
  const exitToMenu = () => {
    setStarted(false);
    setSelectedSet(null);
    setCurrentStep(0);
    setSequence([]);
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

  const confirmRestart = () => {
    if (window.confirm(t.confirmRestart)) goToStep(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!started) return;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
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
            onOpenPlans={() => setPlansOpen(true)}
            planCount={plans.length}
            locale={locale}
            onLocaleChange={setLocale}
            theme={theme}
            onToggleTheme={toggleTheme}
          />
        )}
        {updateToast}
      </>
    );
  }

  const setMeta = getPrayerSetMeta(selectedSet, plans);
  const currentPrayer = sequence[currentStep];
  const accentColor = setMeta.color;
  const progressPct = sequence.length > 0 ? ((currentStep + 1) / sequence.length) * 100 : 0;

  const labelChip = (
    <div style={{ textAlign: "center", marginTop: 8, marginBottom: 4 }}>
      <span style={{
        display: "inline-block",
        background: accentColor + "15",
        color: accentText(accentColor, theme),
        padding: "5px 14px",
        borderRadius: 20,
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: 0.5,
      }}>
        {currentPrayer?.label}
      </span>
    </div>
  );

  const pinned = setMeta.kind !== "rosary";
  const card = (
    <PrayerCard
      currentPrayer={currentPrayer}
      accentColor={accentColor}
      currentStep={currentStep}
      totalSteps={sequence.length}
      onClick={onPrayerCardClick}
      locale={locale}
      showTranslation={showTranslation}
      fontSizeClamp={fontSizeClamp(fontScale)}
      theme={theme}
      contained={pinned}
      scrollRef={pinned ? prayerRef : undefined}
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
        <div style={{
          background: accentColor,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          <button
            onClick={exitToMenu}
            aria-label={t.exitToMenuAria}
            title={t.exitToMenuAria}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              width: 38,
              height: 30,
              padding: 0,
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              color: "white",
              fontSize: 18,
              fontFamily: "Arial, sans-serif",
            }}
          >
            ←
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{
              color: "white",
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              fontWeight: 600,
            }}>
              {setMeta.name}
            </div>
          </div>
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
                width: 34,
                height: 30,
                padding: 0,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                background: "rgba(255,255,255,0.2)",
                color: "white",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7" />
                <path d="M3 3v6h6" />
              </svg>
            </button>
          )}
          <LanguageToggle showTranslation={showTranslation} onChange={setShowTranslation} accentColor={accentColor} locale={locale} />
          <FontSizeControl value={fontScale} onChange={setFontScale} accentColor={accentColor} locale={locale} />
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

      {/* Main content. Swipes are caught on the whole area, strand included. */}
      <div
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}
      >
        {pinned ? (
          <>
            {/* Everything but the rosary pins its progress (the bead strand,
                for linear sets) and label above a card that scrolls its text
                inside — so a long litany section never scrolls the progress,
                or the card's own rounded top, out of view. */}
            <div style={{ flexShrink: 0, padding: "8px 14px 0" }}>
              {setMeta.kind === "linear" && (
                <PrayerSections sequence={sequence} currentStep={currentStep} accentColor={accentColor} onJump={jumpTo} locale={locale} />
              )}
              {labelChip}
            </div>
            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "6px 14px 12px" }}>
              {card}
            </div>
          </>
        ) : (
          // The rosary: the bead ring is too tall to pin, so ring, label and
          // card scroll together.
          <div
            ref={prayerRef}
            style={{
              flex: 1,
              minHeight: 0,
              overflow: "auto",
            }}
          >
            {/* Centering wrapper: `min-height: 100%` centers short content but
                grows past the viewport for long prayers, so the top stays
                scrollable — avoids the flex auto-margin clipping trap. */}
            <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "8px 14px" }}>
              <div style={{ width: "100%" }}>
                <RosaryBeads currentStep={currentStep} sequence={sequence} accentColor={accentColor} onJump={jumpTo} locale={locale} />
                {labelChip}
                {card}
              </div>
            </div>
          </div>
        )}
      </div>

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
            aria-label={t.nextAria}
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
              transition: "all 0.2s ease",
            }}
          >
            {t.next}
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

      {updateToast}
    </div>
  );
}
