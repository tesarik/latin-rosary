import type { SequenceItem } from "./sequence";
import { STRINGS, type Locale } from "./i18n";

type Props = {
  sequence: SequenceItem[];
  currentStep: number;
  accentColor: string;
  onJump: (idx: number) => void;
  locale: Locale;
};

// Compact horizontal bead strand for linear (non-rosary) prayer sets — styled
// like the rosary's beaded string, NOT labeled pills. One bead per prayer, laid
// left→right on a faint thread; no text labels (the current prayer's name shows
// in the chip above the card). The active bead glows in the accent color,
// traversed beads + thread tint, future beads stay muted.
//
// Section-start beads (items carrying a `section` — e.g. each St. Bridget
// shedding's meditation, or every Leonine prayer) are drawn larger and are
// tappable to jump; the sub-step beads between them (Pater Noster / Ave María)
// are small and inert, exactly like the rosary's non-jumpable Hail Mary beads.
// So a St. Bridget shedding reads as one big bead followed by two small ones.
export default function PrayerSections({ sequence, currentStep, accentColor, onJump, locale }: Props) {
  const t = STRINGS[locale];
  const N = sequence.length;
  if (N === 0) return null;

  const W = 320, H = 36, pad = 12, y = H / 2;
  const xOf = (i: number) => (N === 1 ? W / 2 : pad + (W - 2 * pad) * (i / (N - 1)));

  return (
    <div
      role="navigation"
      aria-label={t.prayerSectionsAria}
      style={{ width: "100%", maxWidth: 332, margin: "0 auto 4px" }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block" }}>
        {/* Thread between consecutive beads; tints into accent once traversed. */}
        {sequence.slice(0, -1).map((_, i) => {
          const done = currentStep >= i + 1;
          return (
            <line
              key={`thread-${i}`}
              x1={xOf(i)} y1={y} x2={xOf(i + 1)} y2={y}
              strokeWidth={1.5}
              style={{ stroke: done ? accentColor : "var(--thread)", transition: "stroke 0.3s ease" }}
            />
          );
        })}

        {sequence.map((item, i) => {
          const isActive = i === currentStep;
          const isPast = i < currentStep;
          const isPrimary = !!item.section;
          const fill = isActive ? accentColor : isPast ? "var(--bead-past)" : "var(--bead-future)";
          const r = isActive ? (isPrimary ? 6.5 : 5) : isPrimary ? 5.5 : 3.4;
          return (
            <g key={i}>
              <circle
                cx={xOf(i)} cy={y} r={r}
                strokeWidth={isActive ? 2 : 0}
                style={{ fill, stroke: isActive ? accentColor : "none", transition: "all 0.3s ease", filter: isActive ? `drop-shadow(0 0 5px ${accentColor})` : "none" }}
              />
              {/* Only section-start beads jump (avoids stray taps on the small
                  sub-step beads during swipes — same rule as the rosary). */}
              {isPrimary && (
                <circle
                  cx={xOf(i)} cy={y} r={9}
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
