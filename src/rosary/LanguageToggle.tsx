import { STRINGS, PRAYER_LANGUAGES, type Locale, type PrayerLanguage } from "./i18n";
import type { Theme } from "./theme";
import { headerStyles } from "./look";

// Header prayer-language switch: a three-position slider, "La" on the left,
// "Cz" (or "En") on the right. The knob on the left is the Latin, in the
// middle the Latin with the translation under it, on the right the
// translation; the side not shown greys out. Each tap moves the knob one
// position on, round from the right back to the left.
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
  const pos = PRAYER_LANGUAGES.indexOf(value);
  const next = PRAYER_LANGUAGES[(pos + 1) % PRAYER_LANGUAGES.length]!;
  const label = (text: string, shown: boolean, lang?: string) => (
    <span lang={lang} style={{ opacity: shown ? 1 : 0.45, transition: "opacity 0.2s ease" }}>{text}</span>
  );
  const TRACK = 44, KNOB = 16, PAD = 2;
  return (
    <button
      onClick={() => onChange(next)}
      aria-label={`${t.prayerLanguageAria}: ${names[value]}`}
      title={`${t.prayerLanguageAria}: ${names[value]}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
        flexShrink: 0,
        height: 40,
        padding: "0 9px",
        border: tg.wrapBorder,
        borderRadius: 10,
        background: tg.wrap,
        color: tg.offInk,
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {label("La", value !== "translation")}
      <span aria-hidden="true" style={{ position: "relative", width: TRACK, height: KNOB + 2 * PAD, borderRadius: (KNOB + 2 * PAD) / 2 }}>
        {/* The track, in the label colour, faint. */}
        <span style={{ position: "absolute", inset: 0, borderRadius: "inherit", background: tg.offInk, opacity: 0.22 }} />
        <span style={{
          position: "absolute", top: PAD, width: KNOB, height: KNOB, borderRadius: KNOB / 2,
          left: PAD + pos * ((TRACK - KNOB - 2 * PAD) / 2),
          background: tg.on, boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
          transition: "left 0.2s ease",
        }} />
      </span>
      {label(t.prayerLanguageShort, value !== "latin", locale)}
    </button>
  );
}
