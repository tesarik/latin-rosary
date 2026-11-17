import type { SequenceItem } from "./sequence";
import { useMemo } from "react";
import { STRINGS, type Locale } from "./i18n";
import { strandRows } from "./strand";

type Props = {
  sequence: SequenceItem[];
  currentStep: number;
  accentColor: string;
  onJump: (idx: number) => void;
  locale: Locale;
};

// Compact bead strand for linear (non-rosary) prayer sets — styled like the
// rosary's beaded string, NOT labeled pills. One bead per prayer on a faint
// thread; no text labels (the current prayer's name shows in the chip above
// the card). The active bead glows in the accent color, traversed beads +
// thread tint, future beads stay muted.
//
// Section-start beads (items carrying a `section` — e.g. each St. Bridget
// shedding's meditation, or every Leonine prayer) are drawn larger and are
// tappable to jump; the sub-step beads between them (Pater Noster / Ave María)
// are small and inert, exactly like the rosary's non-jumpable Hail Mary beads.
//
// A short set lies left→right on one line. A longer one winds like a snake —
// left→right, a half-turn at the end, back right→left — breaking where its
// parts start (strand.ts), so its beads keep their size and the big ones stay
// large enough to tap. The spacing is set by the longest row (in a snake at
// most SNAKE_GAP, the strand centred), and every row but the last reaches its
// half-turn (see pos).
export default function PrayerSections({ sequence, currentStep, accentColor, onJump, locale }: Props) {
  const t = STRINGS[locale];
  const rowStarts = useMemo(() => strandRows(sequence.map((i) => !!i.section)), [sequence]);
  const N = sequence.length;
  if (N === 0) return null;

  const W = 320;
  // The snake's rows sit a little closer than the line's beads could, and its
  // beads at most SNAKE_GAP apart, the whole centred: a strand, not a grid.
  const rowH = 18;
  const SNAKE_GAP = 14;
  const rows = rowStarts.length;
  const bounds = [...rowStarts, N];
  const longest = Math.max(...rowStarts.map((s, r) => bounds[r + 1]! - s));
  // Room at the ends for the half-turns (radius rowH / 2).
  const side = rows > 1 ? 12 + rowH / 2 : 12;
  const top = 18;
  const H = top * 2 + (rows - 1) * rowH;
  const fullGap = longest > 1 ? (W - 2 * side) / (longest - 1) : W;
  const gap = rows > 1 ? Math.min(SNAKE_GAP, fullGap) : fullGap;
  const left = (W - gap * (longest - 1)) / 2;
  const right = W - left;

  const rowOf = (i: number) => {
    let r = 0;
    while (r + 1 < rows && rowStarts[r + 1]! <= i) r++;
    return r;
  };
  // Rows meet at the half-turns, so every row but the last reaches its turn:
  // a short first row starts further in (the strand begins there), a short
  // middle row spreads its beads from turn to turn, and only the last may
  // end early, where the strand ends.
  const pos = (i: number) => {
    const r = rowOf(i);
    const k = i - rowStarts[r]!;
    const len = bounds[r + 1]! - rowStarts[r]!;
    let along = gap * k;
    if (rows > 1 && r === 0) along = gap * (longest - len + k);
    else if (rows > 1 && r < rows - 1 && len > 1) along = ((right - left) / (len - 1)) * k;
    const x = N === 1 ? W / 2 : r % 2 === 0 ? left + along : right - along;
    return { x, y: top + r * rowH, r };
  };

  // A user-built plan can run far longer than any built-in set, so shrink the
  // beads once they would otherwise touch. Below roughly 12px of spacing the
  // full-size beads start to overlap.
  const scale = Math.min(1, gap / 12);
  const hitRadius = Math.max(5, Math.min(9, gap / 2));

  return (
    <div
      role="navigation"
      aria-label={t.prayerSectionsAria}
      style={{ width: "100%", maxWidth: 332, margin: "0 auto 4px" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        {/* Thread between consecutive beads — straight within a row, a
            half-turn between rows; tints into accent once traversed. */}
        {sequence.slice(0, -1).map((_, i) => {
          const a = pos(i), b = pos(i + 1);
          const done = currentStep >= i + 1;
          const style = { stroke: done ? accentColor : "var(--thread)", transition: "stroke 0.3s ease", fill: "none" };
          if (a.r === b.r) {
            return <line key={`thread-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={1.5} style={style} />;
          }
          // Turning at the right end (even row) bulges right, at the left end
          // left; a row that ends early runs on to the turn first.
          const sweep = a.r % 2 === 0 ? 1 : 0;
          return (
            <path
              key={`thread-${i}`}
              d={`M ${a.x} ${a.y} L ${b.x} ${a.y} A ${rowH / 2} ${rowH / 2} 0 0 ${sweep} ${b.x} ${b.y}`}
              strokeWidth={1.5}
              style={style}
            />
          );
        })}

        {sequence.map((item, i) => {
          const { x, y } = pos(i);
          const isActive = i === currentStep;
          const isPast = i < currentStep;
          const isPrimary = !!item.section;
          const fill = isActive ? accentColor : isPast ? "var(--bead-past)" : "var(--bead-future)";
          const base = isActive ? (isPrimary ? 6.5 : 5) : isPrimary ? 5.5 : 3.4;
          const r = Math.max(1, base * scale);
          return (
            <g key={i}>
              <circle
                cx={x} cy={y} r={r}
                strokeWidth={isActive ? 2 : 0}
                style={{ fill, stroke: isActive ? accentColor : "none", transition: "all 0.3s ease", filter: isActive ? `drop-shadow(0 0 5px ${accentColor})` : "none" }}
              />
              {/* Only section-start beads jump (avoids stray taps on the small
                  sub-step beads during swipes — same rule as the rosary). */}
              {isPrimary && (
                <circle
                  cx={x} cy={y} r={hitRadius}
                  fill="transparent"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => { e.stopPropagation(); onJump(i); }}
                  role="button"
                  aria-current={isActive ? "step" : undefined}
                  aria-label={t.jumpToSection(item.section!)}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
