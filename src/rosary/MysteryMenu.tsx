import { useEffect, useRef, useState } from "react";
import { MYSTERIES, type MysteryKey } from "./prayers";
import { OTHER_PRAYER_SETS, ORDINARY_PRAYERS, type OtherPrayerKey, type OrdinaryPrayerKey } from "./sequence";
import { STRINGS, SUPPORTED_LOCALES, type Locale } from "./i18n";
import type { Theme } from "./theme";
import Flag from "./Flag";

type PrayerSetKey = MysteryKey | OtherPrayerKey | OrdinaryPrayerKey;

type Props = {
  onStart: (key: PrayerSetKey) => void;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  theme: Theme;
  onToggleTheme: () => void;
};

// Sun/moon toggle in the top-left of the start screen, mirroring the language
// picker top-right. Shows the icon for the theme you'd switch TO.
function ThemeToggle({ theme, onToggle, locale }: { theme: Theme; onToggle: () => void; locale: Locale }) {
  const t = STRINGS[locale];
  const dark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={t.themeToggleAria}
      aria-pressed={dark}
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 40,
        borderRadius: 10,
        border: "1px solid var(--border-strong)",
        background: "var(--surface)",
        color: "var(--text-soft)",
        cursor: "pointer",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {dark ? (
        // Sun (tap to go light)
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        // Moon (tap to go dark)
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

// Custom flag dropdown. Native <select> can't render SVG inside <option>, so
// this is a button + listbox pattern with outside-click + Escape to close.
function LanguagePicker({ locale, onChange }: { locale: Locale; onChange: (l: Locale) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const t = STRINGS[locale];

  useEffect(() => {
    if (!open) return;
    const onDocDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: "absolute", top: 16, right: 16 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.languagePickerAria}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          borderRadius: 10,
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          cursor: "pointer",
          fontFamily: "Arial, sans-serif",
          fontSize: 13,
          color: "var(--text)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <Flag locale={locale} />
        <span lang={locale} style={{ fontWeight: 600 }}>{STRINGS[locale].localeName}</span>
        <span aria-hidden="true" style={{ fontSize: 10, marginLeft: 2, color: "var(--text-muted)" }}>{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={t.languagePickerAria}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            right: 0,
            minWidth: 170,
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 10,
            boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            zIndex: 20,
          }}
        >
          {SUPPORTED_LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code}>
                <button
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(code); setOpen(false); }}
                  lang={code}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    border: "none",
                    borderRadius: 6,
                    background: active ? "var(--surface-hover)" : "transparent",
                    color: "var(--text-strong)",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    cursor: active ? "default" : "pointer",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--surface-hover)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
                >
                  <Flag locale={code} />
                  <span>{STRINGS[code].localeName}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Collapsible "Ordinary prayers" group: a card whose header rolls down a few
// small links to standalone single prayers (Pater Noster, Ave María, …).
// Tapping a link starts that one-prayer "set".
function OrdinaryPrayers({ onStart, locale }: { onStart: (key: OrdinaryPrayerKey) => void; locale: Locale }) {
  const t = STRINGS[locale];
  const [open, setOpen] = useState(false);
  const entries = (Object.entries(ORDINARY_PRAYERS) as [OrdinaryPrayerKey, typeof ORDINARY_PRAYERS[OrdinaryPrayerKey]][])
    .sort((a, b) => a[1].name.localeCompare(b[1].name));
  const accent = entries[0]?.[1].color ?? "#1565C0";

  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "18px 24px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12, background: accent + "18",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            <circle cx="4" cy="6" r="1" fill={accent} />
            <circle cx="4" cy="10" r="1" fill={accent} />
            <circle cx="4" cy="14" r="1" fill={accent} />
            <line x1="8" y1="6" x2="16" y2="6" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="10" x2="16" y2="10" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="14" x2="16" y2="14" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <div lang="la" style={{ flex: 1, fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-strong)" }}>
          Orationes utilissimæ
        </div>
        <span aria-hidden="true" style={{
          fontSize: 14,
          color: "var(--text-muted)",
          transform: open ? "rotate(180deg)" : "none",
          transition: "transform 0.2s ease",
        }}>▾</span>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)", padding: "4px 0", animation: "rolldown 0.22s ease" }}>
          {entries.map(([key, val]) => (
            <button
              key={key}
              onClick={() => onStart(key)}
              aria-label={t.startPrayerAria(val.name)}
              lang="la"
              style={{
                width: "100%",
                display: "block",
                textAlign: "left",
                padding: "11px 24px 11px 80px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                color: "var(--text)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {val.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Start screen: title + one button per mystery set. Also hosts the language
// picker — language is locked in once a rosary starts.
// onStart(key) hands the chosen mystery key back to the parent.
export default function MysteryMenu({ onStart, locale, onLocaleChange, theme, onToggleTheme }: Props) {
  const t = STRINGS[locale];

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      padding: 24,
      position: "relative",
    }}>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} locale={locale} />
      <LanguagePicker locale={locale} onChange={onLocaleChange} />

      <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" style={{ marginBottom: 16 }}>
        <line x1="24" y1="6" x2="24" y2="42" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
        <line x1="12" y1="18" x2="36" y2="18" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
      </svg>

      <h1 style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 36,
        fontWeight: 700,
        color: "var(--text-strong)",
        marginBottom: 6,
        letterSpacing: -0.5,
      }}>
        {t.appTitle}
      </h1>

      <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
        {(Object.entries(MYSTERIES) as [MysteryKey, typeof MYSTERIES[MysteryKey]][]).map(([key, val]) => (
          <PrayerSetButton
            key={key}
            name={val.name}
            color={val.color}
            ariaLabel={t.startRosaryAria(val.name)}
            icon="rosary"
            onClick={() => onStart(key)}
          />
        ))}

        <h2 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--text-muted)",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          margin: "16px 4px 0",
        }}>
          {t.otherPrayersHeading}
        </h2>

        <OrdinaryPrayers onStart={onStart} locale={locale} />

        {(Object.entries(OTHER_PRAYER_SETS) as [OtherPrayerKey, typeof OTHER_PRAYER_SETS[OtherPrayerKey]][]).map(([key, val]) => (
          <PrayerSetButton
            key={key}
            name={val.name}
            color={val.color}
            ariaLabel={t.startPrayerAria(val.name)}
            icon="cross"
            onClick={() => onStart(key)}
          />
        ))}
      </div>
    </div>
  );
}

// Shared button used for both rosary mystery sets and the linear prayer block.
// The icon variant tells the rosary buttons apart from the linear ones at a
// glance — circle-with-cross for rosary, plain cross for linear prayers.
function PrayerSetButton({ name, color, ariaLabel, icon, onClick }: {
  name: string;
  color: string;
  ariaLabel: string;
  icon: "rosary" | "cross";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 24px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = "var(--border)";
      }}
    >
      <div style={{
        width: 40,
        height: 40,
        borderRadius: 12,
        background: color + "18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          {icon === "rosary" && (
            <circle cx="10" cy="10" r="8" fill="none" stroke={color} strokeWidth="1.5" />
          )}
          <line x1="10" y1={icon === "rosary" ? 5 : 3} x2="10" y2={icon === "rosary" ? 15 : 17} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={icon === "rosary" ? 6 : 5} y1={icon === "rosary" ? 9 : 8} x2={icon === "rosary" ? 14 : 15} y2={icon === "rosary" ? 9 : 8} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ textAlign: "left" }}>
        <div lang="la" style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-strong)" }}>
          {name}
        </div>
      </div>
    </button>
  );
}
