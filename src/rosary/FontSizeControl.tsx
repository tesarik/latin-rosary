import { useEffect, useRef, useState, type CSSProperties } from "react";
import { FONT_SCALE_MIN, FONT_SCALE_MAX } from "./fontSize";
import { STRINGS, type Locale } from "./i18n";

type Props = {
  value: number;
  onChange: (index: number) => void;
  accentColor: string;
  locale: Locale;
};

// Header text-size control: a single compact "Aa" button (small A + big A) that
// opens a popover with two nudge buttons — a small A to shrink and a big A to
// grow the prayer body. The popover stays open after each tap so you can keep
// nudging; outside-click / Escape closes it. Buttons disable at the bounds.
// Replaces the old three-segment A / A / A control to save header space.
export default function FontSizeControl({ value, onChange, accentColor, locale }: Props) {
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

  const atMin = value <= FONT_SCALE_MIN;
  const atMax = value >= FONT_SCALE_MAX;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={t.textSizeAria}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: 42,
          height: 30,
          padding: 0,
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          background: open ? "var(--surface)" : "rgba(255,255,255,0.2)",
          color: open ? accentColor : "white",
          fontFamily: "Arial, sans-serif",
          fontWeight: 700,
          lineHeight: 1,
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        <span style={{ fontSize: 11 }}>A</span>
        <span style={{ fontSize: 17 }}>A</span>
      </button>

      {open && (
        <div
          role="group"
          aria-label={t.textSizeAria}
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            display: "flex",
            gap: 6,
            padding: 6,
            background: "var(--surface)",
            border: "1px solid var(--border-strong)",
            borderRadius: 12,
            boxShadow: "0 6px 24px rgba(0,0,0,0.16)",
            zIndex: 30,
          }}
        >
          <button
            onClick={() => onChange(value - 1)}
            disabled={atMin}
            aria-label={t.textSizeDecreaseAria}
            style={nudgeStyle(atMin, accentColor)}
          >
            <span style={{ fontSize: 15 }}>A</span>
          </button>
          <button
            onClick={() => onChange(value + 1)}
            disabled={atMax}
            aria-label={t.textSizeIncreaseAria}
            style={nudgeStyle(atMax, accentColor)}
          >
            <span style={{ fontSize: 25 }}>A</span>
          </button>
        </div>
      )}
    </div>
  );
}

function nudgeStyle(disabled: boolean, accent: string): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    padding: 0,
    border: `1px solid ${disabled ? "var(--border)" : "var(--border-strong)"}`,
    borderRadius: 10,
    background: disabled ? "var(--surface-hover)" : "var(--surface)",
    color: disabled ? "var(--border-strong)" : accent,
    cursor: disabled ? "default" : "pointer",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    lineHeight: 1,
  };
}
