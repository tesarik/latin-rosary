import { useId } from "react";
import { STRINGS, type Locale } from "./i18n";
import { LOOKS, type Look } from "./look";

// The look's chooser — Základ / Papír / Misál — as three segments under a
// "Vzhled" caption: in the prayer header's ⋯ settings and in the start
// screen's Moje tab. Each name is set in its own look's face, a hint of what
// it brings.
const SAMPLE_FONT: Record<Look, string> = {
  base: "Arial, sans-serif",
  paper: "'EB Garamond', Georgia, serif",
  missal: "'EB Garamond', Georgia, serif",
};

export default function LookPicker({ look, onChange, locale }: { look: Look; onChange: (look: Look) => void; locale: Locale }) {
  const t = STRINGS[locale];
  const labelId = useId();
  return (
    <div>
      <div id={labelId} style={{ fontSize: 15, color: "var(--text)", marginBottom: 6, fontFamily: "Arial, sans-serif" }}>{t.lookHeading}</div>
      <div role="radiogroup" aria-labelledby={labelId} style={{
        display: "grid",
        gridTemplateColumns: `repeat(${LOOKS.length}, 1fr)`,
        gap: 3,
        padding: 3,
        borderRadius: 10,
        border: "1px solid var(--border-strong)",
      }}>
        {LOOKS.map((l) => {
          const on = l === look;
          return (
            <button
              key={l}
              role="radio"
              aria-checked={on}
              onClick={() => onChange(l)}
              style={{
                minHeight: 36,
                padding: "0 6px",
                border: "none",
                borderRadius: 7,
                cursor: "pointer",
                background: on ? "var(--text-strong)" : "transparent",
                color: on ? "var(--surface)" : "var(--text)",
                fontFamily: SAMPLE_FONT[l],
                fontSize: l === "base" ? 14 : 17,
                fontWeight: 600,
                transition: "background 0.2s ease, color 0.2s ease",
              }}
            >
              {t.lookNames[l]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
