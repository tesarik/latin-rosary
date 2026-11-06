import { STRINGS, type Locale } from "./i18n";
import { accentText, type Theme } from "./theme";

// Header prayer-language switch: one button showing BOTH choices as two
// segments, "La | Cz" (or "La | En"), with the active one filled in the set's colour — so
// it reads as a toggle at a glance, and one tap flips it. A switch rather
// than a menu, since there are only ever two sides.
export default function LanguageToggle({ showTranslation, onChange, accentColor, theme, locale }: {
  showTranslation: boolean;
  onChange: (showTranslation: boolean) => void;
  accentColor: string;
  theme: Theme;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const segment = (label: string, active: boolean, lang?: string) => (
    <span
      lang={lang}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 30,
        padding: "0 7px",
        borderRadius: 7,
        background: active ? accentColor : "transparent",
        color: active ? "white" : accentText(accentColor, theme),
        fontWeight: 700,
        transition: "background 0.2s ease, color 0.2s ease",
      }}
    >
      {label}
    </span>
  );
  return (
    <button
      role="switch"
      aria-checked={showTranslation}
      aria-label={`${t.prayerLanguageAria}: ${showTranslation ? t.prayerLanguageShort : "La"}`}
      title={t.prayerLanguageAria}
      onClick={() => onChange(!showTranslation)}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        height: 40,
        padding: 3,
        border: "none",
        borderRadius: 10,
        background: accentColor + "1c",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {segment("La", !showTranslation)}
      {segment(t.prayerLanguageShort, showTranslation, locale)}
    </button>
  );
}
