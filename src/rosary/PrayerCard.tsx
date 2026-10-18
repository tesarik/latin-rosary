import type { ReactNode, Ref } from "react";
import { PRAYER_TYPES, PRAYERS, PRAYER_TRANSLATIONS, getHailMary, getHailMaryTr } from "./prayers";
import { sliceLines, type SequenceItem } from "./sequence";
import { STRINGS, type Locale } from "./i18n";
import { accentText, type Theme } from "./theme";
import { parseLitany } from "./litany";

// Render prayer text, turning `{r}…{/r}` spans into red liturgical rubrics
// (missal-style seasonal labels). Newlines are handled by the container's
// `whiteSpace: pre-line`. Plain text without markup passes through unchanged.
function withRubrics(text: string): ReactNode {
  const out: ReactNode[] = [];
  const re = /\{r\}([\s\S]*?)\{\/r\}/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<span key={key++} style={{ color: "var(--rubric)" }}>{m[1]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

// Litanies read like a printed litany book rather than a centered prayer card:
// left-aligned, one invocation per line. A run of invocations sharing a
// response shows that response once, in a band above them that sticks to the
// top while the run scrolls past; a lone invocation keeps its response inline,
// styled like the band (accent colour, upright). See `parseLitany` in litany.ts.
function renderLitany(text: string, accent: string): ReactNode {
  return parseLitany(text).map((b, i) => {
    switch (b.kind) {
      case "blank":
        return <div key={i} aria-hidden="true" style={{ height: "0.6em" }} />;
      case "plain":
        return <div key={i} style={{ margin: "3px 0" }}>{withRubrics(b.line)}</div>;
      case "single":
        return (
          <div key={i} style={{ margin: "3px 0" }}>
            {b.invocation} <span style={{ color: accent, fontWeight: 600 }}>{b.response}</span>
          </div>
        );
      case "run":
        return (
          <div key={i}>
            <div style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              background: "var(--surface)",
              color: accent,
              textAlign: "right",
              fontWeight: 600,
              padding: "4px 0",
              margin: "2px 0",
              borderBottom: "1px solid var(--border)",
            }}>
              ℟ {b.response}
            </div>
            {b.invocations.map((inv, j) => (
              <div key={j} style={{ margin: "3px 0" }}>{inv}</div>
            ))}
          </div>
        );
    }
  });
}

// A litany renders with the line-by-line layout above instead of one centered
// block. New litanies (PRAYER_TYPES.LITANY_*) pick this up automatically.
const isLitanyType = (type: string) => type.startsWith("litany_");

const bodyStyle = {
  textAlign: "center" as const,
  lineHeight: 1.35,
  fontFamily: "'EB Garamond', Georgia, serif",
};

function PrayerBody({ currentPrayer, accentColor, locale, showTranslation, fontSizeClamp, theme }: { currentPrayer: SequenceItem | undefined; accentColor: string; locale: Locale; showTranslation: boolean; fontSizeClamp: string; theme: Theme }) {
  if (!currentPrayer) return null;
  const sizedBodyStyle = { ...bodyStyle, fontSize: fontSizeClamp };
  const clauseColor = accentText(accentColor, theme);
  // Only the translation is language-tagged (the UI locale). Latin is left
  // UNTAGGED on purpose: lang="la" makes EB Garamond apply its Latin localized
  // forms (`locl`) and render u→v, and font-feature-settings can't reliably turn
  // that off across browsers (mobile Safari ignores it). So never tag lang="la".
  const bodyLang = showTranslation ? locale : undefined;

  if (currentPrayer.type === PRAYER_TYPES.HAIL_MARY) {
    const hm = showTranslation
      ? getHailMaryTr(locale, currentPrayer.mysteryTr?.[locale])
      : getHailMary(currentPrayer.mystery);
    return (
      <div lang={bodyLang} style={sizedBodyStyle}>
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

  const full = showTranslation ? PRAYER_TRANSLATIONS[locale][currentPrayer.type] : PRAYERS[currentPrayer.type];
  // A litany step may be one section of a longer text: the same line range in
  // every language, since the translations keep the Latin's line structure.
  const text = currentPrayer.lines ? sliceLines(full, currentPrayer.lines) : full;
  if (isLitanyType(currentPrayer.type)) {
    return (
      <div lang={bodyLang} style={{ ...sizedBodyStyle, textAlign: "left" }}>
        <div style={{ color: "var(--text)" }}>{renderLitany(text, clauseColor)}</div>
      </div>
    );
  }
  return (
    <div lang={bodyLang} style={sizedBodyStyle}>
      <div style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{withRubrics(text)}</div>
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
  fontSizeClamp: string;
  theme: Theme;
  // Contained: the card fills the height it is given and scrolls its text
  // inside, so its rounded top and shadow never scroll away; `scrollRef`
  // then points at that inner scroller. Otherwise the card grows with its
  // text and the page scrolls (the rosary, where the bead ring scrolls too).
  contained?: boolean;
  scrollRef?: Ref<HTMLDivElement>;
};

// The tappable white card that wraps the current prayer's text.
// Click anywhere on the card to advance — except when the user is selecting
// text or interacting with the language select, in which case the parent's
// click handler bails out. Which language the body shows (Latin or the active
// UI language) is chosen by the LanguageToggle in the label row above the card.
export default function PrayerCard({ currentPrayer, accentColor, currentStep, totalSteps, onClick, locale, showTranslation, fontSizeClamp, theme, contained, scrollRef }: Props) {
  const t = STRINGS[locale];
  const body = <PrayerBody currentPrayer={currentPrayer} accentColor={accentColor} locale={locale} showTranslation={showTranslation} fontSizeClamp={fontSizeClamp} theme={theme} />;
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
        ...(contained
          ? { display: "flex", flexDirection: "column", maxHeight: "100%", minHeight: 0, overflow: "hidden" }
          : { padding: "20px 18px", margin: "6px 0 12px" }),
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        border: "1px solid var(--border)",
        cursor: "pointer",
        userSelect: "text",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {contained ? (
        // Only side padding on the scroller itself: a sticky ℟ band sticks at
        // the scroller's padding edge, so vertical padding would leave a strip
        // above it for text to show through. The vertical space is inside.
        <div ref={scrollRef} style={{ overflowY: "auto", minHeight: 0, padding: "0 18px" }}>
          <div style={{ padding: "20px 0" }}>{body}</div>
        </div>
      ) : body}
    </div>
  );
}
