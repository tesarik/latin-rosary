import { SERIF } from "./fonts";
import { MissalArt } from "./MissalArt";
import { currentLook } from "./look";
import type { CSSProperties, ReactNode, Ref } from "react";
import { PRAYER_TYPES, PRAYERS, getHailMary, getHailMaryTr } from "./prayers";
import { useTranslation } from "./translations";
import { sliceLines, type SequenceItem } from "./sequence";
import { STRINGS, type Locale, type PrayerLanguage } from "./i18n";
import { accentText, type Theme } from "./theme";
import { parseLitany, type LitanyBlock } from "./litany";

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
// With `tr` (the Latin with the translation, PrayerLanguage "both"), each line
// is followed by its translation, and a band carries both responses; that
// needs the two texts to parse alike (they keep one line structure, so they
// do), otherwise the translation follows the whole Latin.
function renderLitany(text: string, accent: string, tr?: { text: string; locale: Locale }): ReactNode {
  const blocks = parseLitany(text);
  const trBlocks = tr ? parseLitany(tr.text) : undefined;
  const paired = !!trBlocks && sameShape(blocks, trBlocks);
  if (tr && !paired) {
    return <>
      {renderLitany(text, accent)}
      <div lang={tr.locale} style={{ ...TR_STYLE, marginTop: "1em" }}>{renderLitany(tr.text, accent)}</div>
    </>;
  }
  const under = (node: ReactNode) => paired
    ? <div lang={tr!.locale} style={TR_STYLE}>{node}</div>
    : null;
  return blocks.map((b, i) => {
    const t = trBlocks?.[i];
    switch (b.kind) {
      case "blank":
        return <div key={i} aria-hidden="true" style={{ height: "0.6em" }} />;
      case "plain":
        return (
          <div key={i} style={{ margin: paired ? "3px 0 7px" : "3px 0" }}>
            {withRubrics(b.line)}
            {t?.kind === "plain" && under(withRubrics(t.line))}
          </div>
        );
      case "single":
        return (
          <div key={i} style={{ margin: paired ? "3px 0 7px" : "3px 0" }}>
            {b.invocation} <span style={{ color: accent, fontWeight: 600 }}>{b.response}</span>
            {t?.kind === "single" && under(<>{t.invocation} <span style={{ color: accent, fontWeight: 600 }}>{t.response}</span></>)}
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
              {t?.kind === "run" && <div lang={tr!.locale} style={{ ...TR_STYLE, color: accent, fontStyle: "normal" }}>{t.response}</div>}
            </div>
            {b.invocations.map((inv, j) => (
              <div key={j} style={{ margin: paired ? "3px 0 7px" : "3px 0" }}>
                {inv}
                {t?.kind === "run" && under(t.invocations[j])}
              </div>
            ))}
          </div>
        );
    }
  });
}

// Two litany texts parse alike: the same blocks, runs of the same length.
function sameShape(a: LitanyBlock[], b: LitanyBlock[]): boolean {
  return a.length === b.length && a.every((x, i) => {
    const y = b[i]!;
    return x.kind === y.kind && (x.kind !== "run" || (y.kind === "run" && x.invocations.length === y.invocations.length));
  });
}

// A litany renders with the line-by-line layout above instead of one centered
// block. New litanies (PRAYER_TYPES.LITANY_*) pick this up automatically.
const isLitanyType = (type: string) => type.startsWith("litany_");

const bodyStyle = {
  textAlign: "center" as const,
  lineHeight: 1.35,
  fontFamily: SERIF,
};

// The translation under the Latin (PrayerLanguage "both"): smaller, italic
// and softer, so the Latin stays the text that is prayed.
const TR_STYLE: CSSProperties = {
  fontSize: "0.8em",
  fontStyle: "italic",
  color: "var(--text-soft)",
  lineHeight: 1.3,
  marginTop: 2,
};

// The Latin with its translation under it. Texts that keep one line structure
// (psalms, the Salve Regína's sections, versicles) pair line by line; a
// one-paragraph prayer gets its translation under the whole paragraph.
function Interlinear({ latin, tr, locale }: { latin: string; tr: string; locale: Locale }) {
  const la = latin.split("\n");
  const tl = tr.split("\n");
  if (la.length > 1 && la.length === tl.length) {
    return <>{la.map((line, i) => line.trim() === ""
      ? <div key={i} aria-hidden="true" style={{ height: "0.5em" }} />
      : (
        <div key={i} style={{ marginBottom: "0.55em" }}>
          <div className={i === 0 ? "initial" : undefined} style={{ color: "var(--text)" }}>{withRubrics(line)}</div>
          <div lang={locale} style={TR_STYLE}>{withRubrics(tl[i]!)}</div>
        </div>
      ))}</>;
  }
  return <>
    <div className="initial" style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{withRubrics(latin)}</div>
    <div lang={locale} style={{ ...TR_STYLE, whiteSpace: "pre-line", marginTop: "0.6em" }}>{withRubrics(tr)}</div>
  </>;
}

function PrayerBody({ currentPrayer, accentColor, locale, language, fontSizeClamp, theme }: { currentPrayer: SequenceItem | undefined; accentColor: string; locale: Locale; language: PrayerLanguage; fontSizeClamp: string; theme: Theme }) {
  // The shown language's table, loaded on demand (translations.ts); until it
  // arrives a translated prayer shows its Latin.
  const table = useTranslation(locale);
  if (!currentPrayer) return null;
  const sizedBodyStyle = { ...bodyStyle, fontSize: fontSizeClamp };
  const clauseColor = accentText(accentColor, theme);
  const showTranslation = language === "translation";
  const both = language === "both";
  // Only the translation is language-tagged (the UI locale). Latin is left
  // UNTAGGED on purpose: lang="la" makes EB Garamond apply its Latin localized
  // forms (`locl`) and render u→v, and font-feature-settings can't reliably turn
  // that off across browsers (mobile Safari ignores it). So never tag lang="la".
  const bodyLang = showTranslation ? locale : undefined;

  if (currentPrayer.type === PRAYER_TYPES.HAIL_MARY) {
    const la = getHailMary(currentPrayer.mystery);
    const tr = getHailMaryTr(locale, currentPrayer.mysteryTr?.[locale]);
    const hm = showTranslation ? tr : la;
    const under = (text: string, style?: CSSProperties) =>
      both ? <div lang={locale} style={{ ...TR_STYLE, whiteSpace: "pre-line", marginBottom: "0.45em", ...style }}>{text}</div> : null;
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
        <div className="initial" style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{hm.before}</div>
        {under(tr.before)}
        {hm.mystery && <div style={{ color: clauseColor, fontWeight: 600, margin: "4px 0" }}>{hm.mystery}.</div>}
        {hm.mystery && tr.mystery && under(`${tr.mystery}.`, { color: clauseColor })}
        <div style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{hm.after}</div>
        {under(tr.after, { marginBottom: 0 })}
      </div>
    );
  }

  // A user's own prayer: plain text, never parsed for rubrics or litany
  // responses. The language button switches to its second version if it has
  // one, and otherwise leaves the one text up (untagged: its language is
  // whatever the user wrote it in).
  if (currentPrayer.type === PRAYER_TYPES.CUSTOM) {
    const custom = currentPrayer.custom;
    const useTr = showTranslation && !!custom?.textTr;
    return (
      <div lang={useTr ? locale : undefined} style={sizedBodyStyle}>
        <div className="initial" style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{useTr ? custom!.textTr : custom?.text}</div>
        {both && custom?.textTr && (
          <div lang={locale} style={{ ...TR_STYLE, whiteSpace: "pre-line", marginTop: "0.6em" }}>{custom.textTr}</div>
        )}
      </div>
    );
  }

  // A litany step may be one section of a longer text: the same line range in
  // every language, since the translations keep the Latin's line structure.
  const cut = (full: string) => currentPrayer.lines ? sliceLines(full, currentPrayer.lines) : full;
  const latin = cut(PRAYERS[currentPrayer.type]);
  const trFull = language !== "latin" ? table?.[currentPrayer.type] : undefined;
  const trText = trFull !== undefined ? cut(trFull) : undefined;
  if (both && trText !== undefined) {
    if (isLitanyType(currentPrayer.type)) {
      return (
        <div style={{ ...sizedBodyStyle, textAlign: "left" }}>
          <div style={{ color: "var(--text)" }}>{renderLitany(latin, clauseColor, { text: trText, locale })}</div>
        </div>
      );
    }
    return (
      <div style={sizedBodyStyle}>
        <Interlinear latin={latin} tr={trText} locale={locale} />
      </div>
    );
  }
  const tr = showTranslation ? trText : undefined;
  const text = tr ?? latin;
  if (isLitanyType(currentPrayer.type)) {
    return (
      <div lang={tr ? locale : undefined} style={{ ...sizedBodyStyle, textAlign: "left" }}>
        <div style={{ color: "var(--text)" }}>{renderLitany(text, clauseColor)}</div>
      </div>
    );
  }
  return (
    <div lang={tr ? locale : undefined} style={sizedBodyStyle}>
      <div className="initial" style={{ whiteSpace: "pre-line", color: "var(--text)" }}>{withRubrics(text)}</div>
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
  language: PrayerLanguage;
  fontSizeClamp: string;
  theme: Theme;
  // Contained: the card fills the height it is given and scrolls its text
  // inside, so its rounded top and shadow never scroll away; `scrollRef`
  // then points at that inner scroller. Otherwise the card grows with its
  // text and the page scrolls (the rosary, where the bead ring scrolls too).
  contained?: boolean;
  scrollRef?: Ref<HTMLDivElement>;
  // The Misál look's tailpiece on the last step (missalArt.ts finisFor).
  finis?: string;
};

// The tappable white card that wraps the current prayer's text.
// Click anywhere on the card to advance — except when the user is selecting
// text or interacting with the language select, in which case the parent's
// click handler bails out. Which language the body shows (Latin or the active
// UI language) is chosen by the LanguageToggle in the label row above the card.
export default function PrayerCard({ currentPrayer, accentColor, currentStep, totalSteps, onClick, locale, language, fontSizeClamp, theme, contained, scrollRef, finis: finisArt = "finis" }: Props) {
  const t = STRINGS[locale];
  // In the Misál look the last step closes with a tailpiece, as a chapter
  // ends in an old book.
  const finis = currentLook() === "missal" && currentStep === totalSteps - 1;
  const body = <>
    <PrayerBody currentPrayer={currentPrayer} accentColor={accentColor} locale={locale} language={language} fontSizeClamp={fontSizeClamp} theme={theme} />
    {finis && <MissalArt name={finisArt} style={{ marginTop: 22 }} />}
  </>;
  return (
    <div
      onClick={onClick}
      role="region"
      aria-live="polite"
      aria-label={`${currentPrayer?.label ?? ""}, ${t.stepXofY(currentStep + 1, totalSteps)}`}
      style={{
        position: "relative",
        // A card in Základ and Papír; the bare page in Misál (index.css).
        background: "var(--prayer-bg)",
        borderRadius: 18,
        ...(contained
          ? { display: "flex", flexDirection: "column", maxHeight: "100%", minHeight: 0, overflow: "hidden" }
          : { padding: "20px 18px", margin: "6px 0 12px" }),
        boxShadow: "var(--prayer-shadow)",
        border: "var(--prayer-border)",
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
