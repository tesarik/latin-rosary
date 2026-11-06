import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { FONT_SCALE_MIN, FONT_SCALE_MAX } from "./fontSize";
import { STRINGS, type Locale } from "./i18n";
import type { Theme } from "./theme";

type Props = {
  theme: Theme;
  onToggleTheme: () => void;
  fontScale: number;
  onFontScale: (index: number) => void;
  vibrate: boolean;
  onVibrate: (on: boolean) => void;
  dim: boolean;
  onDim: (on: boolean) => void;
  accentColor: string;
  locale: Locale;
};

// The prayer header's "⋯" button: the settings changed now and then, kept out
// of the header so it holds only what is used while praying (back, restart,
// the star, the language). A popover with the dark theme, the text size
// (smaller-A / bigger-A, stays open for repeated taps), the haptic tick and
// the dimmed screen. Outside click or Escape closes it.
export default function SettingsMenu({ theme, onToggleTheme, fontScale, onFontScale, vibrate, onVibrate, dim, onDim, accentColor, locale }: Props) {
  const t = STRINGS[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const atMin = fontScale <= FONT_SCALE_MIN;
  const atMax = fontScale >= FONT_SCALE_MAX;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.settingsAria}
        title={t.settingsAria}
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
          background: open ? "var(--surface)" : "rgba(255,255,255,0.2)",
          color: open ? accentColor : "white",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="currentColor">
          <circle cx="4" cy="10" r="1.9" />
          <circle cx="10" cy="10" r="1.9" />
          <circle cx="16" cy="10" r="1.9" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-label={t.settingsAria}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            width: 260,
            padding: "6px 0",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 14,
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
            zIndex: 30,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <Row label={t.textSizeAria}>
            <div role="group" aria-label={t.textSizeAria} style={{ display: "flex", gap: 6 }}>
              <button onClick={() => onFontScale(fontScale - 1)} disabled={atMin} aria-label={t.textSizeDecreaseAria} style={nudgeStyle(atMin, accentColor)}>
                <span style={{ fontSize: 14 }}>A</span>
              </button>
              <button onClick={() => onFontScale(fontScale + 1)} disabled={atMax} aria-label={t.textSizeIncreaseAria} style={nudgeStyle(atMax, accentColor)}>
                <span style={{ fontSize: 22 }}>A</span>
              </button>
            </div>
          </Row>
          <SwitchRow label={t.settingsDarkMode} checked={theme === "dark"} onChange={onToggleTheme} color={accentColor} />
          <SwitchRow label={t.settingsDim} checked={dim} onChange={() => onDim(!dim)} color={accentColor} />
          <SwitchRow label={t.settingsVibrate} checked={vibrate} onChange={() => onVibrate(!vibrate)} color={accentColor} />
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "6px 14px", minHeight: 48 }}>
      <span style={{ fontSize: 15, color: "var(--text)" }}>{label}</span>
      {children}
    </div>
  );
}

// A whole row is the switch, so the label is a tap target too.
function SwitchRow({ label, checked, onChange, color }: { label: string; checked: boolean; onChange: () => void; color: string }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "6px 14px",
        minHeight: 48,
        background: "transparent",
        border: "none",
        borderTop: "1px solid var(--border)",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontSize: 15,
        color: "var(--text)",
        textAlign: "left",
      }}
    >
      {label}
      <span aria-hidden="true" style={{
        position: "relative",
        width: 40,
        height: 24,
        borderRadius: 12,
        background: checked ? color : "var(--border-strong)",
        transition: "background 0.2s ease",
        flexShrink: 0,
      }}>
        <span style={{
          position: "absolute",
          top: 2,
          left: checked ? 18 : 2,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          transition: "left 0.2s ease",
        }} />
      </span>
    </button>
  );
}

function nudgeStyle(disabled: boolean, accent: string): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 40,
    padding: 0,
    border: `1px solid ${disabled ? "var(--border)" : "var(--border-strong)"}`,
    borderRadius: 10,
    background: disabled ? "var(--surface-hover)" : "var(--surface)",
    color: disabled ? "var(--border-strong)" : accent,
    cursor: disabled ? "default" : "pointer",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    lineHeight: 1,
  };
}
