import { STRINGS, type Locale } from "./i18n";

type Props = {
  locale: Locale;
  onUpdate: () => void;
  onDismiss: () => void;
};

// Bottom "a new version is available" prompt, shown by Rosary when the service
// worker reports a waiting update. Themed + localized; tapping Update swaps in
// the new build (and reloads), × dismisses until the next detection.
export default function UpdateToast({ locale, onUpdate, onDismiss }: Props) {
  const t = STRINGS[locale];
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "max(16px, env(safe-area-inset-bottom))",
        transform: "translateX(-50%)",
        zIndex: 60,
        width: "calc(100% - 32px)",
        maxWidth: 360,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 12px 12px 16px",
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
        borderRadius: 14,
        boxShadow: "0 8px 30px rgba(0,0,0,0.28)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <span style={{ flex: 1, fontSize: 14, color: "var(--text)" }}>{t.updateAvailable}</span>
      <button
        onClick={onUpdate}
        style={{
          border: "none",
          background: "#1565C0",
          color: "white",
          borderRadius: 10,
          padding: "8px 16px",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {t.updateAction}
      </button>
      <button
        onClick={onDismiss}
        aria-label={t.updateDismissAria}
        style={{
          border: "none",
          background: "transparent",
          color: "var(--text-muted)",
          fontSize: 20,
          lineHeight: 1,
          width: 28,
          height: 28,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
