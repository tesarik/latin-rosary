import { useState, useEffect, useCallback, useRef } from "react";
import { MYSTERIES, type MysteryKey } from "./rosary/prayers";
import { buildRosarySequence, type SequenceItem } from "./rosary/sequence";
import { loadSavedState, saveState } from "./rosary/storage";
import { STRINGS, detectLocale, loadSavedLocale, saveLocale, type Locale } from "./rosary/i18n";
import RosaryBeads from "./rosary/RosaryBeads";
import PrayerCard from "./rosary/PrayerCard";
import MysteryMenu from "./rosary/MysteryMenu";

type TouchSample = { x: number; y: number; time: number };

export default function Rosary() {
  const saved = useRef(loadSavedState());

  const [selectedMystery, setSelectedMystery] = useState<MysteryKey | null>(saved.current?.selectedMystery ?? null);
  const [currentStep, setCurrentStep] = useState<number>(saved.current?.currentStep ?? 0);
  const [sequence, setSequence] = useState<SequenceItem[]>(() => {
    if (saved.current?.selectedMystery) {
      return buildRosarySequence(MYSTERIES[saved.current.selectedMystery]);
    }
    return [];
  });
  const [started, setStarted] = useState<boolean>(!!saved.current);
  const [locale, setLocaleState] = useState<Locale>(() => loadSavedLocale() ?? detectLocale());
  const t = STRINGS[locale];
  const prayerRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<TouchSample | null>(null);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    saveLocale(next);
  }, []);

  // Persist on every change
  useEffect(() => {
    saveState(started ? selectedMystery : null, currentStep);
  }, [selectedMystery, currentStep, started]);

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

  const startRosary = useCallback((key: MysteryKey) => {
    setSelectedMystery(key);
    setSequence(buildRosarySequence(MYSTERIES[key]));
    setCurrentStep(0);
    setStarted(true);
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
    setSelectedMystery(null);
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

  if (!started || !selectedMystery) {
    return <MysteryMenu onStart={startRosary} locale={locale} onLocaleChange={setLocale} />;
  }

  const mysterySet = MYSTERIES[selectedMystery];
  const currentPrayer = sequence[currentStep];
  const accentColor = mysterySet.color;
  const progress = sequence.length > 0 ? ((currentStep + 1) / sequence.length) * 100 : 0;

  return (
    <div style={{
      height: "100dvh",
      overflow: "hidden",
      background: "linear-gradient(160deg, #ECEFF1 0%, #FAFAFA 50%, #E8EAF6 100%)",
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
            <div style={{
              color: "white",
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              fontWeight: 600,
            }}>
              {mysterySet.name}
            </div>
          </div>
          <div style={{ width: 60 }} />
        </div>

        {/* Progress bar */}
        <div style={{ height: 7, background: "rgba(0,0,0,0.1)" }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: accentColor,
            transition: "width 0.3s ease",
          }} />
        </div>
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
          <RosaryBeads currentStep={currentStep} sequence={sequence} accentColor={accentColor} onJump={jumpTo} locale={locale} />

          {/* Prayer label */}
          <div style={{ textAlign: "center", marginTop: 8, marginBottom: 4 }}>
            <span style={{
              display: "inline-block",
              background: accentColor + "15",
              color: accentColor,
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
        background: "linear-gradient(transparent, #ECEFF1)",
      }}>
        <button
          onClick={prev}
          disabled={currentStep === 0}
          aria-label={t.previousAria}
          style={{
            padding: "14px 32px",
            borderRadius: 14,
            border: "1px solid #CFD8DC",
            background: "white",
            color: currentStep === 0 ? "#CFD8DC" : "#546E7A",
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
