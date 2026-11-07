import { STRINGS, type Locale } from "./i18n";
import type { Theme } from "./theme";
import { headerStyles } from "./look";

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
  // Its colours are the header's, in the look's manner (look.ts).
  const tg = headerStyles(accentColor, theme, false).toggle;
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
        background: active ? tg.on : "transparent",
        color: active ? tg.onInk : tg.offInk,
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
        border: tg.wrapBorder,
        borderRadius: 10,
        background: tg.wrap,
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
