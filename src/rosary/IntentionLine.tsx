import { useEffect, useRef, useState } from "react";
import { STRINGS, type Locale } from "./i18n";
import { MAX_INTENTION } from "./intentions";

// The prayer's private intention under the label chip (intentions.ts): the
// text in small italics, tapped to edit; with none, a small "+ Intention" on
// the first step only, so it is offered before praying and never clutters
// the rest. Editing is an inline field: Enter or ✓ keeps it, Escape cancels,
// emptying it clears the intention.
export default function IntentionLine({ text, offerAdd, onChange, color, locale }: {
  text: string | undefined;
  offerAdd: boolean;
  onChange: (text: string) => void;
  color: string;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const input = useRef<HTMLInputElement | null>(null);
  useEffect(() => { if (editing) input.current?.focus(); }, [editing]);

  const open = () => { setDraft(text ?? ""); setEditing(true); };
  const save = () => { onChange(draft); setEditing(false); };

  const small: React.CSSProperties = {
    border: "none", background: "transparent", cursor: "pointer", padding: "4px 8px",
    fontFamily: "Arial, sans-serif", fontSize: 13, minHeight: 28,
  };

  if (editing) {
    return (
      <form
        onSubmit={(e) => { e.preventDefault(); save(); }}
        style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", margin: "6px auto 0", maxWidth: 420 }}
      >
        <input
          ref={input}
          value={draft}
          maxLength={MAX_INTENTION}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); setEditing(false); } }}
          placeholder={t.intentionPlaceholder}
          aria-label={t.intentionLabel}
          enterKeyHint="done"
          style={{
            flex: 1, minWidth: 0, height: 34, padding: "0 10px", borderRadius: 8,
            border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--text)",
            fontFamily: "Arial, sans-serif", fontSize: 16,
          }}
        />
        <button type="submit" aria-label={t.intentionSave} style={{ ...small, height: 34, borderRadius: 8, border: `1.5px solid ${color}`, color, fontWeight: 700 }}>✓</button>
      </form>
    );
  }
  if (text) {
    return (
      <div style={{ textAlign: "center", marginTop: 2 }}>
        <button
          onClick={open}
          aria-label={`${t.intentionLabel}: ${text}. ${t.intentionEdit}`}
          style={{
            ...small, maxWidth: "100%", color: "var(--text-soft)", fontStyle: "italic",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontStyle: "normal", color }}>{t.intentionLabel}:</span> {text}
        </button>
      </div>
    );
  }
  if (!offerAdd) return null;
  return (
    <div style={{ textAlign: "center", marginTop: 2 }}>
      <button onClick={open} style={{ ...small, color: "var(--text-muted)" }}>+ {t.intentionAdd}</button>
    </div>
  );
}
