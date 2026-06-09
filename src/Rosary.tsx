import { useState, useEffect, useCallback, useRef } from "react";
import { MYSTERIES, type MysteryKey } from "./rosary/prayers";
import { buildRosarySequence, OTHER_PRAYER_SETS, ORDINARY_PRAYERS, type OtherPrayerKey, type OrdinaryPrayerKey, type SequenceItem } from "./rosary/sequence";
import { loadSavedState, saveState } from "./rosary/storage";
import { STRINGS, detectLocale, loadSavedLocale, saveLocale, type Locale } from "./rosary/i18n";
import { DEFAULT_FONT_SCALE, clampFontScale, fontSizeClamp, loadSavedFontScale, saveFontScale } from "./rosary/fontSize";
import { accentText, applyTheme, loadSavedTheme, resolveTheme, saveTheme, systemTheme, type Theme } from "./rosary/theme";
import RosaryBeads from "./rosary/RosaryBeads";
import PrayerCard from "./rosary/PrayerCard";
import PrayerSections from "./rosary/PrayerSections";
import FontSizeControl from "./rosary/FontSizeControl";
import MysteryMenu from "./rosary/MysteryMenu";

type TouchSample = { x: number; y: number; time: number };

export type PrayerSetKey = MysteryKey | OtherPrayerKey | OrdinaryPrayerKey;

const isRosaryKey = (k: PrayerSetKey): k is MysteryKey => k in MYSTERIES;
const isOrdinaryKey = (k: PrayerSetKey): k is OrdinaryPrayerKey => k in ORDINARY_PRAYERS;

function getPrayerSetMeta(key: PrayerSetKey): { name: string; color: string; kind: "rosary" | "linear" | "single" } {
  if (isRosaryKey(key)) {
    const m = MYSTERIES[key];
    return { name: m.name, color: m.color, kind: "rosary" };
  }
  if (isOrdinaryKey(key)) {
    const o = ORDINARY_PRAYERS[key];
    return { name: o.name, color: o.color, kind: "single" };
  }
  const o = OTHER_PRAYER_SETS[key];
  return { name: o.name, color: o.color, kind: "linear" };
}

function buildSequence(key: PrayerSetKey): SequenceItem[] {
  if (isRosaryKey(key)) return buildRosarySequence(MYSTERIES[key]);
  if (isOrdinaryKey(key)) return ORDINARY_PRAYERS[key].build();
  return OTHER_PRAYER_SETS[key].build();
}

export default function Rosary() {
  const saved = useRef(loadSavedState());

  const [selectedSet, setSelectedSet] = useState<PrayerSetKey | null>(saved.current?.selectedMystery ?? null);
  const [currentStep, setCurrentStep] = useState<number>(saved.current?.currentStep ?? 0);
  const [sequence, setSequence] = useState<SequenceItem[]>(() => {
    if (saved.current?.selectedMystery) {
      return buildRosarySequence(MYSTERIES[saved.current.selectedMystery]);
    }
    return [];
  });
  const [started, setStarted] = useState<boolean>(!!saved.current);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [locale, setLocaleState] = useState<Locale>(() => loadSavedLocale() ?? detectLocale());
  const [fontScale, setFontScaleState] = useState<number>(() => loadSavedFontScale() ?? DEFAULT_FONT_SCALE);
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme());
  const t = STRINGS[locale];
  const prayerRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<TouchSample | null>(null);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
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

  // Persist on every change — only the rosary survives a reload. Linear
  // prayer sets (Leonine, etc.) are short and intentionally session-only:
  // refreshing mid-prayer drops you back to the menu.
  useEffect(() => {
    const rosaryKey = started && selectedSet && isRosaryKey(selectedSet) ? selectedSet : null;
    saveState(rosaryKey, currentStep);
  }, [selectedSet, currentStep, started]);

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

  const startSet = useCallback((key: PrayerSetKey) => {
    setSelectedSet(key);
    setSequence(buildSequence(key));
    setCurrentStep(0);
    setStarted(true);
    setShowTranslation(false);
  }, []);

  const buzz = () => { try { navigator.vibrate?.(25); } catch {} };

  const goToStep = (idx: number) => {
    if (idx >= 0 && idx < sequence.length && idx !== currentStep) {
      buzz();
      setCurrentStep(idx);
      prayerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const next = () => goToStep(currentStep + 1);
  const prev = () => goToStep(currentStep - 1);
  const jumpTo = (idx: number) => goToStep(idx);

  const reset = () => {
    setStarted(false);
    setSelectedSet(null);
    setCurrentStep(0);
    setSequence([]);
    saveState(null, 0);
  };

  const confirmReset = () => {
    if (currentStep === 0 || window.confirm(t.confirmExit)) {
      reset();
    }
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

  if (!started || !selectedSet) {
    return <MysteryMenu onStart={startSet} locale={locale} onLocaleChange={setLocale} theme={theme} onToggleTheme={toggleTheme} />;
  }

  const setMeta = getPrayerSetMeta(selectedSet);
  const currentPrayer = sequence[currentStep];
  const accentColor = setMeta.color;
  const progress = sequence.length > 0 ? ((currentStep + 1) / sequence.length) * 100 : 0;

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
          gap: 12,
        }}>
          <button
            onClick={confirmReset}
            aria-label={t.exitToMenuAria}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              color: "white",
              fontSize: 14,
              fontFamily: "Arial, sans-serif",
            }}
          >
            ← {t.back}
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div lang="la" style={{
              color: "white",
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              fontWeight: 600,
            }}>
              {setMeta.name}
            </div>
          </div>
          <FontSizeControl value={fontScale} onChange={setFontScale} accentColor={accentColor} locale={locale} />
        </div>

        {/* Progress bar — only the rosary has a sequence long enough to
            warrant one; linear sets use the section stepper instead. */}
        {setMeta.kind === "rosary" && (
          <div style={{ height: 7, background: "var(--track)" }}>
            <div style={{
              height: "100%",
              width: `${progress}%`,
              background: accentColor,
              transition: "width 0.3s ease",
            }} />
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        ref={prayerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          flex: 1,
          minHeight: 0,
          overflow: "auto",
          padding: "8px 14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "auto 0", width: "100%" }}>
          {setMeta.kind === "rosary" ? (
            <RosaryBeads currentStep={currentStep} sequence={sequence} accentColor={accentColor} onJump={jumpTo} locale={locale} />
          ) : setMeta.kind === "linear" ? (
            <PrayerSections sequence={sequence} currentStep={currentStep} accentColor={accentColor} onJump={jumpTo} />
          ) : null}

          {/* Prayer label */}
          <div style={{ textAlign: "center", marginTop: 8, marginBottom: 4 }}>
            <span lang="la" style={{
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

          <PrayerCard
            currentPrayer={currentPrayer}
            accentColor={accentColor}
            currentStep={currentStep}
            totalSteps={sequence.length}
            onClick={onPrayerCardClick}
            locale={locale}
            showTranslation={showTranslation}
            onLanguageChange={setShowTranslation}
            fontSizeClamp={fontSizeClamp(fontScale)}
            theme={theme}
          />
        </div>
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
            onClick={reset}
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
    </div>
  );
}
