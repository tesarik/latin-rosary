import { useEffect, useRef } from "react";
import { STRINGS, type Locale } from "./i18n";
import { analyticsConfigured } from "./analytics";

// ─── Edit these to set what the About panel shows ──────────────────────────
const CREATOR = {
  name: "Jaroslav Tesařík",
  website: "jaroslavtesarik.cz",
  websiteUrl: "https://jaroslavtesarik.cz",
  feedbackEmail: "info@jaroslavtesarik.cz",
};
// ───────────────────────────────────────────────────────────────────────────

const linkStyle = { color: "#1565C0", textDecoration: "none" } as const;

// Build timestamp (ISO, injected in vite.config.ts) formatted for the locale.
// Returns null if the value is missing or unparsable, so the line is just omitted.
function formatBuildDate(locale: Locale): string | null {
  const d = new Date(__BUILD_DATE__);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

type Props = { locale: Locale; onClose: () => void };

// Modal "About" panel opened from the start screen. Backdrop click or Escape
// closes it. Themed; the version is injected at build time (vite.config.ts).
export default function AboutDialog({ locale, onClose }: Props) {
  const t = STRINGS[locale];
  const buildDate = formatBuildDate(locale);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus management: move focus into the dialog on open, trap Tab within it,
  // and return focus to whatever was focused before (the About button) on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.aboutTitle}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 360,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          padding: "28px 24px 24px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={t.aboutClose}
          style={{
            position: "absolute", top: 8, right: 10,
            width: 32, height: 32, border: "none", background: "transparent",
            color: "var(--text-muted)", fontSize: 22, lineHeight: 1, cursor: "pointer",
          }}
        >
          ×
        </button>

        <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" style={{ display: "block", margin: "0 auto 10px" }}>
          <line x1="24" y1="6" x2="24" y2="42" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="18" x2="36" y2="18" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <div style={{ textAlign: "center", fontSize: 22, fontWeight: 700, color: "var(--text-strong)" }}>{t.appTitle}</div>
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
          v{__APP_VERSION__}
          {buildDate && ` · ${t.aboutBuilt} ${buildDate}`}
        </div>
        <div style={{ textAlign: "center", fontSize: 14, color: "var(--text)", margin: "12px 0 14px", lineHeight: 1.4 }}>{t.aboutText}</div>

        <div style={{ fontSize: 14, color: "var(--text)" }}>
          <span style={{ color: "var(--text-muted)" }}>{t.aboutCreator}: </span>
          {CREATOR.name}
          {" · "}
          <a href={CREATOR.websiteUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{CREATOR.website}</a>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", marginTop: 14, paddingTop: 14, fontSize: 13, color: "var(--text-muted)" }}>
          {t.aboutFeedback}{" "}
          <a href={`mailto:${CREATOR.feedbackEmail}`} style={linkStyle}>{CREATOR.feedbackEmail}</a>
        </div>

        {analyticsConfigured && (
          <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-muted)", textAlign: "center" }}>
            {t.aboutAnalytics}
          </div>
        )}
      </div>
    </div>
  );
}
