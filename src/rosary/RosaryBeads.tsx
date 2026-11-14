import type { ReactElement } from "react";
import { PRAYER_TYPES } from "./prayers";
import type { SequenceItem } from "./sequence";
import { STRINGS, type Locale } from "./i18n";

type Props = {
  // Size caps: on a phone in portrait the ring shares the height with the
  // card, so it is kept small; in landscape it has a column of its own.
  maxHeight?: string;
  maxWidth?: number;
  currentStep: number;
  sequence: SequenceItem[];
  accentColor: string;
  onJump?: (idx: number) => void;
  locale: Locale;
};

type TailBead = {
  y: number;
  beadId: string;
  rad: number;
  jumpable: boolean;
};

type RingBead = {
  x: number;
  y: number;
  seqIdx: number | undefined;
  radius: number;
  key: string;
  isOf: boolean;
  decade: number;
};

function beadStyle(seqIdx: number, currentStep: number, accentColor: string, small = false) {
  const isActive = seqIdx === currentStep;
  const isPast = seqIdx < currentStep;
  return {
    fill: isActive ? accentColor : isPast ? "var(--bead-past)" : "var(--bead-future)",
    stroke: isActive ? accentColor : "none",
    strokeWidth: isActive ? (small ? 2 : 2.5) : 0,
    filter: isActive ? `drop-shadow(0 0 ${small ? 5 : 8}px ${accentColor})` : "none",
  };
}

// SVG Rosary Bead Ring.
// Physical layout (bottom to top):
//   Cross → Creed → [gap] → Our Father → HM → HM → HM → junction (Gloria, no bead) → Ring
// All bead-to-sequence mapping goes through beadIdx[beadId] so the layout
// stays decoupled from buildRosarySequence's index arithmetic.
export default function RosaryBeads({ currentStep, sequence, accentColor, onJump, locale, maxHeight = "30dvh", maxWidth = 220 }: Props) {
  const t = STRINGS[locale];
  const cx = 150, cy = 128, r = 105;
  const elements: ReactElement[] = [];

  // Build a beadId → sequence index map from the live sequence.
  const beadIdx: Record<string, number> = {};
  sequence.forEach((step, i) => {
    if (step.beadId) beadIdx[step.beadId] = i;
  });
  // The full rosary (the Marian psalter) names fifteen decades. Its ring is
  // the set being prayed — the first in the opening, the last in the closing
  // — with the other two as small rings on a diagonal, in their order: the
  // lower-numbered top left, the other bottom right.
  const psalter = beadIdx["ring-of-5"] !== undefined;
  const part = !psalter ? 0
    : currentStep >= beadIdx["ring-of-10"]! ? 2
    : currentStep >= beadIdx["ring-of-5"]! ? 1
    : 0;

  // Junction: bottom of the ring where tail connects (no bead here — Gloria
  // Patri is "said at the junction").
  const junctionY = cy + r;

  // Tail layout going down from junction
  const sp = 13; // spacing
  const gap = 9; // extra gap between 3 HMs and Our Father

  const tailPositions: TailBead[] = [
    { y: junctionY + sp,                    beadId: "tail-hm-2",  rad: 4.5, jumpable: false },
    { y: junctionY + sp * 2,                beadId: "tail-hm-1",  rad: 4.5, jumpable: false },
    { y: junctionY + sp * 3,                beadId: "tail-hm-0",  rad: 4.5, jumpable: false },
    { y: junctionY + sp * 3 + sp + gap,     beadId: "tail-of",    rad: 6.5, jumpable: true  },
    { y: junctionY + sp * 3 + sp * 2 + gap, beadId: "tail-creed", rad: 5.5, jumpable: false },
  ];

  const lineColor = "var(--thread)";
  const lw = 1.5;

  // Tail connecting lines - from junction point down to first bead, then between beads
  elements.push(
    <line key="tline-junc" x1={cx} y1={junctionY} x2={cx} y2={tailPositions[0]!.y}
      strokeWidth={lw} style={{ stroke: lineColor }} />
  );
  for (let i = 0; i < tailPositions.length - 1; i++) {
    const from = tailPositions[i]!;
    const to = tailPositions[i + 1]!;
    const isDashed = (from.beadId === "tail-of" && to.beadId === "tail-creed");
    elements.push(
      <line key={`tline-${i}`} x1={cx} y1={from.y} x2={cx} y2={to.y}
        strokeWidth={lw} strokeDasharray={isDashed ? "3,4" : "none"}
        style={{ stroke: lineColor }} />
    );
  }

  // Cross below Creed
  const creedY = tailPositions[tailPositions.length - 1]!.y;
  const crossTop = creedY + 11;
  const crossMid = crossTop + 8;
  const crossBot = crossTop + 20;

  elements.push(<line key="tline-cross" x1={cx} y1={creedY} x2={cx} y2={crossTop} strokeWidth={lw} style={{ stroke: lineColor }} />);
  const currentType = sequence[currentStep]?.type;
  const crossActive = currentType === PRAYER_TYPES.SIGN_OF_CROSS;
  elements.push(
    <g key="cross" style={{ transition: "all 0.3s ease", filter: crossActive ? `drop-shadow(0 0 8px ${accentColor})` : "none" }}>
      <line x1={cx} y1={crossTop} x2={cx} y2={crossBot} stroke={accentColor} strokeWidth={crossActive ? 4.5 : 3.5} strokeLinecap="round" />
      <line x1={cx - 9} y1={crossMid} x2={cx + 9} y2={crossMid} stroke={accentColor} strokeWidth={crossActive ? 4.5 : 3.5} strokeLinecap="round" />
    </g>
  );

  // Tail beads
  tailPositions.forEach(({ y, beadId, rad, jumpable }) => {
    const idx = beadIdx[beadId];
    // A bead the sequence says nothing on (the chaplet's Credo bead and third
    // Ave) is still on the string: drawn faint, never lit.
    if (idx === undefined) {
      elements.push(
        <circle key={`tail-${beadId}`} cx={cx} cy={y} r={rad}
          style={{ fill: "var(--bead-future)", opacity: 0.45 }} />
      );
      return;
    }
    const bs = beadStyle(idx, currentStep, accentColor);
    elements.push(
      <circle key={`tail-${beadId}`} cx={cx} cy={y} r={rad}
        strokeWidth={bs.strokeWidth}
        style={{ fill: bs.fill, stroke: bs.stroke, transition: "all 0.3s ease", filter: bs.filter }} />
    );
    if (jumpable && onJump) {
      elements.push(
        <circle key={`tail-hit-${beadId}`} cx={cx} cy={y} r={12}
          fill="transparent" style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onJump(idx); }}
          role="button"
          aria-label={t.jumpToOpeningPaterNoster(idx + 1, sequence.length)}
        />
      );
    }
  });

  // --- RING ---
  // One ring of five decades round (rcx, rcy): a Pater Noster and ten Ave
  // Marías each, a gap between decades, the first Pater at the bottom. `first`
  // is its first decade's number on the full rosary's ring of fifteen.
  const drawRing = (rcx: number, rcy: number, rr: number, first: number, small: boolean) => {
    const decadeGapAngle = 0.08;
    const beadAngle = (2 * Math.PI - 5 * decadeGapAngle) / 55;
    const scale = small ? 0.52 : 1;
    const ringLw = small ? 1 : lw;
    let angle = Math.PI / 2;
    const beads: RingBead[] = [];
    for (let d = first; d < first + 5; d++) {
      beads.push({ x: rcx + rr * Math.cos(angle), y: rcy + rr * Math.sin(angle), seqIdx: beadIdx[`ring-of-${d}`], radius: 6 * scale, key: `ring-of-${d}`, isOf: true, decade: d });
      angle += beadAngle;
      for (let h = 0; h < 10; h++) {
        beads.push({ x: rcx + rr * Math.cos(angle), y: rcy + rr * Math.sin(angle), seqIdx: beadIdx[`ring-hm-${d}-${h}`], radius: 4 * scale, key: `ring-hm-${d}-${h}`, isOf: false, decade: d });
        angle += beadAngle;
      }
      angle += decadeGapAngle;
    }
    // The thread: within each decade, across the gaps, and back to the
    // junction (the big ring) or round to its start (a small one).
    for (let i = 0; i < beads.length - 1; i++) {
      const a = beads[i]!, b = beads[i + 1]!;
      elements.push(<line key={`rline-${a.key}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeWidth={ringLw} style={{ stroke: lineColor }} />);
    }
    const last = beads[beads.length - 1]!;
    const close = small ? beads[0]! : { x: rcx, y: rcy + rr };
    elements.push(<line key={`rline-close-${first}`} x1={last.x} y1={last.y} x2={close.x} y2={close.y} strokeWidth={ringLw} style={{ stroke: lineColor }} />);
    // The beads on top, a big ring's Pater Noster with a hit circle to jump.
    beads.forEach((bead) => {
      if (bead.seqIdx === undefined) return;
      const bs = beadStyle(bead.seqIdx, currentStep, accentColor, small);
      elements.push(
        <circle key={bead.key} cx={bead.x} cy={bead.y} r={bead.radius}
          strokeWidth={bs.strokeWidth * scale}
          style={{ fill: bs.fill, stroke: bs.stroke, transition: "all 0.3s ease", filter: bs.filter }} />
      );
      if (!small && bead.isOf && onJump) {
        const targetIdx = bead.seqIdx;
        elements.push(
          <circle key={`hit-${bead.key}`} cx={bead.x} cy={bead.y} r={11}
            fill="transparent" style={{ cursor: "pointer" }}
            onClick={(e) => { e.stopPropagation(); onJump(targetIdx); }}
            role="button"
            aria-label={t.jumpToDecade(bead.decade + 1)}
          />
        );
      }
    });
  };

  drawRing(cx, cy, r, part * 5, false);

  // The full rosary's other two sets: small rings on the diagonal, each with
  // its numeral, and tapped to jump to its first Pater Noster.
  const smallR = 54;
  const others = [0, 1, 2].filter((p) => p !== part);
  const smallRings = psalter
    ? [
        { p: others[0]!, x: cx - 172, y: cy - 66 },
        { p: others[1]!, x: cx + 172, y: cy + 98 },
      ]
    : [];
  smallRings.forEach(({ p, x, y }) => {
    drawRing(x, y, smallR, p * 5, true);
    elements.push(
      <text key={`num-${p}`} x={x} y={y + 7} textAnchor="middle"
        style={{ fill: "var(--text-muted)", fontFamily: "Georgia, serif", fontSize: 20 }}>
        {["I", "II", "III"][p]}
      </text>
    );
    const target = beadIdx[`ring-of-${p * 5}`];
    if (onJump && target !== undefined) {
      elements.push(
        <circle key={`hit-set-${p}`} cx={x} cy={y} r={smallR + 6}
          fill="transparent" style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onJump(target); }}
          role="button"
          aria-label={t.jumpToDecade(p * 5 + 1)}
        />
      );
    }
  });

  // Tightly fit the viewBox to actual content (top of ring beads → bottom of cross stroke)
  // (and, for the full rosary, out to its small rings on either side).
  const vbTop = Math.min(cy - r - 6, ...smallRings.map((s) => s.y - smallR - 6));
  const vbBottom = Math.max(crossBot + 3, ...smallRings.map((s) => s.y + smallR + 6));
  const vbHeight = vbBottom - vbTop;
  const vbLeft = Math.min(0, ...smallRings.map((s) => s.x - smallR - 6));
  const vbWidth = Math.max(300, ...smallRings.map((s) => s.x + smallR + 6)) - vbLeft;

  return (
    <svg viewBox={`${vbLeft} ${vbTop} ${vbWidth} ${vbHeight}`}
      style={{ width: "100%", maxWidth: maxWidth * vbWidth / 300, maxHeight, margin: "0 auto", display: "block" }}
      role="img"
      aria-label={t.rosaryAria(currentStep + 1, sequence.length)}>
      {elements}
    </svg>
  );
}
