import { STRINGS, PRAYER_LANGUAGES, type Locale, type PrayerLanguage } from "./i18n";
import type { Theme } from "./theme";
import { headerStyles } from "./look";

// Header prayer-language switch: three segments side by side — "La", the
// Latin over the translation ("La" above "Cz", as the text then reads), and
// "Cz" (or "En") — the active one filled in the set's colour, so it reads as
// a switch at a glance; a tap on a segment picks it.
export default function LanguageToggle({ value, onChange, accentColor, theme, locale }: {
  value: PrayerLanguage;
  onChange: (value: PrayerLanguage) => void;
  accentColor: string;
  theme: Theme;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  // Its colours are the header's, in the look's manner (look.ts).
  const tg = headerStyles(accentColor, theme, false).toggle;
  const names: Record<PrayerLanguage, string> = {
    latin: t.prayerLanguageLatin,
    both: t.prayerLanguageBoth,
    translation: t.prayerLanguageTranslation,
  };
  const content = (lang: PrayerLanguage) =>
    lang === "latin" ? "La"
    : lang === "translation" ? <span lang={locale}>{t.prayerLanguageShort}</span>
    : (
      <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: 9.5, lineHeight: 1.05 }}>
        <span>La</span>
        <span style={{ fontWeight: 400 }}>{t.prayerLanguageShort}</span>
      </span>
    );
  return (
    <div
      role="radiogroup"
      aria-label={t.prayerLanguageAria}
      title={t.prayerLanguageAria}
      style={{
        display: "flex",
        alignItems: "stretch",
        gap: 2,
        flexShrink: 0,
        height: 40,
        padding: 3,
        border: tg.wrapBorder,
        borderRadius: 10,
        background: tg.wrap,
        fontFamily: "Arial, sans-serif",
        fontSize: 13,
        lineHeight: 1,
      }}
    >
      {PRAYER_LANGUAGES.map((lang) => {
        const active = lang === value;
        return (
          <button
            key={lang}
            role="radio"
            aria-checked={active}
            aria-label={names[lang]}
            onClick={() => onChange(lang)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 28,
              padding: "0 6px",
              border: "none",
              borderRadius: 7,
              background: active ? tg.on : "transparent",
              color: active ? tg.onInk : tg.offInk,
              font: "inherit",
              fontWeight: 700,
              cursor: "pointer",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
          >
            {content(lang)}
          </button>
        );
      })}
    </div>
  );
}
