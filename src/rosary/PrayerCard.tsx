import { PRAYER_TYPES, PRAYERS, getHailMary } from "./prayers";
import type { SequenceItem } from "./sequence";
import { STRINGS, type Locale } from "./i18n";

const bodyStyle = {
  textAlign: "center" as const,
  lineHeight: 1.35,
  fontFamily: "'EB Garamond', Georgia, serif",
  fontSize: "clamp(17px, 5vw, 22px)",
};

function PrayerBody({ currentPrayer, accentColor, locale }: { currentPrayer: SequenceItem | undefined; accentColor: string; locale: Locale }) {
  if (!currentPrayer) return null;

  if (currentPrayer.type === PRAYER_TYPES.HAIL_MARY) {
    const hm = getHailMary(currentPrayer.mystery);
    return (
      <div lang="la" style={bodyStyle}>
        {currentPrayer.num !== undefined && (
          <div lang={locale} aria-hidden="true" style={{
            fontSize: 12, color: "#90A4AE", marginBottom: 8,
            fontFamily: "Arial, sans-serif", letterSpacing: 1,
          }}>
            {currentPrayer.num} / 10
          </div>
        )}
        <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{hm.before}</div>
        <div style={{ color: accentColor, fontWeight: 600, margin: "4px 0" }}>{hm.mystery}.</div>
        <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{hm.after}</div>
      </div>
    );
  }

  const text = PRAYERS[currentPrayer.type];
  return (
    <div lang="la" style={bodyStyle}>
      <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{text}</div>
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
};

// The tappable white card that wraps the current prayer's Latin text.
// Click anywhere on the card to advance — except when the user is selecting
// text, in which case the parent's handler bails out.
export default function PrayerCard({ currentPrayer, accentColor, currentStep, totalSteps, onClick, locale }: Props) {
  const t = STRINGS[locale];
  return (
    <div
      onClick={onClick}
      role="region"
      aria-live="polite"
      aria-label={`${currentPrayer?.label ?? ""}, ${t.stepXofY(currentStep + 1, totalSteps)}`}
      style={{
        background: "white",
        borderRadius: 18,
        padding: "20px 18px",
        margin: "6px 0 12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid #ECEFF1",
        cursor: "pointer",
        userSelect: "text",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <PrayerBody currentPrayer={currentPrayer} accentColor={accentColor} locale={locale} />
    </div>
  );
}
