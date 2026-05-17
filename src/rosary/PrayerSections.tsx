import type { SequenceItem } from "./sequence";

type Props = {
  sequence: SequenceItem[];
  currentStep: number;
  accentColor: string;
  onJump: (idx: number) => void;
};

// Circular state-diagram stepper for linear (non-rosary) prayer sets. Each
// step is a node placed clockwise around a circle starting at the top; arcs
// with arrowheads connect consecutive nodes. Repeated prayers (Ave María ×3,
// Cor Iesu ×3) appear as that many nodes — counting nodes around the ring
// shows progress without a numeric counter. Active node is filled in the
// accent color; traversed nodes + their outgoing arrows tint into accent;
// future nodes + arrows stay muted. Tap a node to jump to that step.
export default function PrayerSections({ sequence, currentStep, accentColor, onJump }: Props) {
  const stepIndices: number[] = [];
  sequence.forEach((it, idx) => { if (it.section) stepIndices.push(idx); });
  if (stepIndices.length === 0) return null;

  const N = stepIndices.length;
  const cx = 50;
  const cy = 50;
  const R = 37; // chip-center radius in viewBox units (0–100)
  const muted = "#CFD8DC";
  const ringFaint = "#E6EAED";

  // Angle for chip i, starting at 12 o'clock and going clockwise.
  const angleOf = (i: number) => -Math.PI / 2 + (i / N) * 2 * Math.PI;
  const posOf = (i: number) => {
    const a = angleOf(i);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), a };
  };

  // Retract each arc endpoint by this many degrees so the arrow doesn't
  // overlap the chip pill it points to.
  const retractDeg = 12;
  const retract = (retractDeg * Math.PI) / 180;

  return (
    <div style={{
      position: "relative",
      width: "100%",
      maxWidth: 360,
      aspectRatio: "1 / 1",
      margin: "0 auto 4px",
    }}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <defs>
          <marker
            id="ps-arrow-done"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accentColor} />
          </marker>
          <marker
            id="ps-arrow-future"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={muted} />
          </marker>
        </defs>

        {/* Faint background ring — visual anchor for the chips. */}
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={ringFaint} strokeWidth="0.6" />

        {/* Directed arc between each pair of consecutive nodes. The arc is
            drawn on the chip-center circle but retracted by `retractDeg` on
            each side so the chip pills don't cover the arrowhead. */}
        {stepIndices.slice(0, -1).map((_, i) => {
          const nextIdx = stepIndices[i + 1]!;
          const arrowDone = currentStep >= nextIdx;
          const color = arrowDone ? accentColor : muted;
          const a1 = angleOf(i) + retract;
          const a2 = angleOf(i + 1) - retract;
          const x1 = cx + R * Math.cos(a1);
          const y1 = cy + R * Math.sin(a1);
          const x2 = cx + R * Math.cos(a2);
          const y2 = cy + R * Math.sin(a2);
          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={color}
              strokeWidth="0.9"
              markerEnd={`url(#${arrowDone ? "ps-arrow-done" : "ps-arrow-future"})`}
            />
          );
        })}
      </svg>

      <div role="navigation" aria-label="Sekce modlitby" style={{ position: "absolute", inset: 0 }}>
        {stepIndices.map((idx, i) => {
          const item = sequence[idx]!;
          const isActive = idx === currentStep;
          const isDone = idx < currentStep;
          const p = posOf(i);
          const bg = isActive ? accentColor : isDone ? accentColor + "22" : "white";
          const fg = isActive ? "white" : isDone ? accentColor : "#90A4AE";
          const border = isActive ? accentColor : isDone ? accentColor + "55" : "#CFD8DC";
          return (
            <button
              key={idx}
              onClick={() => onJump(idx)}
              aria-current={isActive ? "step" : undefined}
              aria-label={`Skočit na ${item.section}`}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
                padding: "4px 10px",
                borderRadius: 20,
                border: `1px solid ${border}`,
                background: bg,
                color: fg,
                fontFamily: "Arial, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.4,
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                zIndex: isActive ? 2 : 1,
                boxShadow: isActive ? `0 2px 8px ${accentColor}55` : "none",
              }}
            >
              {item.section}
            </button>
          );
        })}
      </div>
    </div>
  );
}
