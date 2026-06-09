import { PRAYER_TYPES, PRAYERS, PRAYERS_CS, getHailMary, getHailMaryCs } from "./prayers";
import type { SequenceItem } from "./sequence";
import { STRINGS, type Locale } from "./i18n";
import { accentText, type Theme } from "./theme";

const bodyStyle = {
  textAlign: "center" as const,
  lineHeight: 1.35,
  fontFamily: "'EB Garamond', Georgia, serif",
};

function PrayerBody({ currentPrayer, accentColor, locale, showTranslation, fontSizeClamp, theme }: { currentPrayer: SequenceItem | undefined; accentColor: string; locale: Locale; showTranslation: boolean; fontSizeClamp: string; theme: Theme }) {
  if (!currentPrayer) return null;
  const sizedBodyStyle = { ...bodyStyle, fontSize: fontSizeClamp };
  const clauseColor = accentText(accentColor, theme);

  if (currentPrayer.type === PRAYER_TYPES.HAIL_MARY) {
    const hm = showTranslation
      ? getHailMaryCs(currentPrayer.mysteryCs)
      : getHailMary(currentPrayer.mystery);
    return (
      <div style={sizedBodyStyle}>
        {currentPrayer.num !== undefined && (
          <div lang={locale} aria-hidden="true" style={{
            fontSize: 12, color: "var(--text-muted)", marginBottom: 8,
            fontFamily: "Arial, sans-serif", letterSpacing: 1,
          }}>
            {currentPrayer.num} / 10
          </div>
        )}
        <div style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{hm.before}</div>
        {hm.mystery && <div style={{ color: clauseColor, fontWeight: 600, margin: "4px 0" }}>{hm.mystery}.</div>}
        <div style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{hm.after}</div>
      </div>
    );
  }

  const text = showTranslation ? PRAYERS_CS[currentPrayer.type] : PRAYERS[currentPrayer.type];
  return (
    <div style={sizedBodyStyle}>
      <div style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{text}</div>
    </div>
  );
}

type Props = {
  currentPrayer: SequenceItem | undefined;
  accentColor: string;
  currentStep: number;
  totalSteps: number;
  onClick: () => void;
  locale: Locale;
  showTranslation: boolean;
  onLanguageChange: (showTranslation: boolean) => void;
  fontSizeClamp: string;
  theme: Theme;
};

// The tappable white card that wraps the current prayer's text.
// Click anywhere on the card to advance — except when the user is selecting
// text or interacting with the language select, in which case the parent's
// click handler bails out. The select in the corner switches the body between
// Latin and Czech.
export default function PrayerCard({ currentPrayer, accentColor, currentStep, totalSteps, onClick, locale, showTranslation, onLanguageChange, fontSizeClamp, theme }: Props) {
  const t = STRINGS[locale];
  return (
    <div
      onClick={onClick}
      role="region"
      aria-live="polite"
      aria-label={`${currentPrayer?.label ?? ""}, ${t.stepXofY(currentStep + 1, totalSteps)}`}
      style={{
        position: "relative",
        background: "var(--surface)",
        borderRadius: 18,
        padding: "20px 18px",
        margin: "6px 0 12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        userSelect: "text",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <select
        value={showTranslation ? "cs" : "la"}
        onChange={(e) => onLanguageChange(e.target.value === "cs")}
        onClick={(e) => e.stopPropagation()}
        aria-label="Jazyk modlitby"
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          background: "transparent",
          border: "1px solid var(--border)",
          borderRadius: 6,
          padding: "2px 6px",
          fontSize: 11,
          letterSpacing: 1,
          color: "var(--text-muted)",
          fontFamily: "Arial, sans-serif",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <option value="la">LA</option>
        <option value="cs">CZ</option>
      </select>
      <PrayerBody currentPrayer={currentPrayer} accentColor={accentColor} locale={locale} showTranslation={showTranslation} fontSizeClamp={fontSizeClamp} theme={theme} />
    </div>
  );
}
