import { useEffect } from "react";
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

type Props = { locale: Locale; onClose: () => void };

// Modal "About" panel opened from the start screen. Backdrop click or Escape
// closes it. Themed; the version is injected at build time (vite.config.ts).
export default function AboutDialog({ locale, onClose }: Props) {
  const t = STRINGS[locale];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>v{__APP_VERSION__}</div>
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
