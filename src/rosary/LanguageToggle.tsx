import { STRINGS, type Locale } from "./i18n";
import type { Theme } from "./theme";
import { headerStyles } from "./look";

// Header prayer-language switch: two segments, "La" and "Cz" (or "En"), the
// active one filled in the set's colour. The Latin side shows the translation
// under the Latin when the ⋯ settings say so (PrayerLanguage "both"); that is
// the caller's business — this switch only picks the side.
export default function LanguageToggle({ translation, onChange, accentColor, theme, locale }: {
  translation: boolean;
  onChange: (translation: boolean) => void;
  accentColor: string;
  theme: Theme;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  // Its colours are the header's, in the look's manner (look.ts).
  const tg = headerStyles(accentColor, theme, false).toggle;
  const segment = (side: boolean, text: string, name: string, lang?: string) => {
    const active = side === translation;
    return (
      <button
        role="radio"
        aria-checked={active}
        aria-label={name}
        onClick={() => onChange(side)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 30,
          padding: "0 7px",
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
        <span lang={lang}>{text}</span>
      </button>
    );
  };
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
      {segment(false, "La", t.prayerLanguageLatin)}
      {segment(true, t.prayerLanguageShort, t.prayerLanguageTranslation, locale)}
    </div>
  );
}
