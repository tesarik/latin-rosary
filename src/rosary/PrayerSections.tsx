import type { SequenceItem } from "./sequence";

type Props = {
  sequence: SequenceItem[];
  currentStep: number;
  accentColor: string;
  onJump: (idx: number) => void;
};

// One chip per step in a linear (non-rosary) sequence. Repeated prayers
// (Ave María ×3, Cor Iesu ×3) render as that many identical chips so the user
// counts chips visually instead of decoding a 1/3 counter. Active chip is
// filled in the accent color, completed chips are tinted, future ones stay
// muted. Chips wrap to multiple rows on narrow viewports.
export default function PrayerSections({ sequence, currentStep, accentColor, onJump }: Props) {
  const hasSections = sequence.some((it) => it.section);
  if (!hasSections) return null;

  return (
    <div
      role="navigation"
      aria-label="Sekce modlitby"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 6,
        padding: "4px 0 14px",
        width: "100%",
        justifyContent: "center",
      }}
    >
      {sequence.map((item, idx) => {
        if (!item.section) return null;
        const isActive = idx === currentStep;
        const isDone = idx < currentStep;
        const bg = isActive ? accentColor : isDone ? accentColor + "22" : "transparent";
        const fg = isActive ? "white" : isDone ? accentColor : "#90A4AE";
        const border = isActive ? accentColor : isDone ? accentColor + "44" : "#CFD8DC";
        return (
          <button
            key={idx}
            onClick={() => onJump(idx)}
            aria-current={isActive ? "step" : undefined}
            aria-label={`Skočit na ${item.section}`}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: `1px solid ${border}`,
              background: bg,
              color: fg,
              fontFamily: "Arial, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.5,
              cursor: "pointer",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            {item.section}
          </button>
        );
      })}
    </div>
  );
}
