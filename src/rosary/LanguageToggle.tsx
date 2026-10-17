import { useEffect, useRef, useState } from "react";
import { STRINGS, type Locale } from "./i18n";

// Header prayer-language control, next to the text-size button: one compact
// button with a globe and the language the prayer body is in now ("La", or "CZ"/"EN"),
// which opens a small menu offering both. Picking one closes the menu;
// outside-click / Escape closes it too. Mirrors FontSizeControl's look.
export default function LanguageToggle({ showTranslation, onChange, accentColor, locale }: {
  showTranslation: boolean;
  onChange: (showTranslation: boolean) => void;
  accentColor: string;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const options: { code: string; translation: boolean; lang?: string }[] = [
    { code: "La", translation: false },
    { code: t.prayerLanguageShort, translation: true, lang: locale },
  ];
  const current = showTranslation ? t.prayerLanguageShort : "La";

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.prayerLanguageAria}: ${current}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          width: 52,
          height: 30,
          padding: 0,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          background: open ? "var(--surface)" : "rgba(255,255,255,0.2)",
          color: open ? accentColor : "white",
          fontFamily: "Arial, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1,
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        {/* Globe: marks this as the language switch, not just a label. */}
        <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z" />
        </svg>
        {current}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.prayerLanguageAria}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            margin: 0,
            padding: 6,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 12,
            boxShadow: "0 6px 24px rgba(0,0,0,0.16)",
            zIndex: 30,
          }}
        >
          {options.map((o) => {
            const active = o.translation === showTranslation;
            return (
              <li key={o.code}>
                <button
                  role="option"
                  aria-selected={active}
                  lang={o.lang}
                  onClick={() => { onChange(o.translation); setOpen(false); }}
                  style={{
                    width: 48,
                    height: 36,
                    border: `1px solid ${active ? accentColor : "var(--border-strong)"}`,
                    borderRadius: 10,
                    background: active ? accentColor : "var(--surface)",
                    color: active ? "white" : accentColor,
                    cursor: "pointer",
                    fontFamily: "Arial, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                            }}
                >
                  {o.code}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
