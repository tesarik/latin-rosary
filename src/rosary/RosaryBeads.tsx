import type { ReactElement } from "react";
import { PRAYER_TYPES } from "./prayers";
import type { SequenceItem } from "./sequence";

type Props = {
  currentStep: number;
  sequence: SequenceItem[];
  accentColor: string;
  onJump?: (idx: number) => void;
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

function beadStyle(seqIdx: number, currentStep: number, accentColor: string) {
  const isActive = seqIdx === currentStep;
  const isPast = seqIdx < currentStep;
  return {
    fill: isActive ? accentColor : isPast ? "#90A4AE" : "#CFD8DC",
    stroke: isActive ? accentColor : "none",
    strokeWidth: isActive ? 2.5 : 0,
    filter: isActive ? `drop-shadow(0 0 8px ${accentColor})` : "none",
  };
}

// SVG Rosary Bead Ring.
// Physical layout (bottom to top):
//   Cross → Creed → [gap] → Our Father → HM → HM → HM → junction (Gloria, no bead) → Ring
// All bead-to-sequence mapping goes through beadIdx[beadId] so the layout
// stays decoupled from buildRosarySequence's index arithmetic.
export default function RosaryBeads({ currentStep, sequence, accentColor, onJump }: Props) {
  const cx = 150, cy = 128, r = 105;
  const elements: ReactElement[] = [];

  // Build a beadId → sequence index map from the live sequence.
  const beadIdx: Record<string, number> = {};
  sequence.forEach((step, i) => {
    if (step.beadId) beadIdx[step.beadId] = i;
  });

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

  const lineColor = "#B0BEC5";
  const lw = 1.5;

  // Tail connecting lines - from junction point down to first bead, then between beads
  elements.push(
    <line key="tline-junc" x1={cx} y1={junctionY} x2={cx} y2={tailPositions[0]!.y}
      stroke={lineColor} strokeWidth={lw} />
  );
  for (let i = 0; i < tailPositions.length - 1; i++) {
    const from = tailPositions[i]!;
    const to = tailPositions[i + 1]!;
    const isDashed = (from.beadId === "tail-of" && to.beadId === "tail-creed");
    elements.push(
      <line key={`tline-${i}`} x1={cx} y1={from.y} x2={cx} y2={to.y}
        stroke={lineColor} strokeWidth={lw}
        strokeDasharray={isDashed ? "3,4" : "none"} />
    );
  }

  // Cross below Creed
  const creedY = tailPositions[tailPositions.length - 1]!.y;
  const crossTop = creedY + 11;
  const crossMid = crossTop + 8;
  const crossBot = crossTop + 20;

  elements.push(<line key="tline-cross" x1={cx} y1={creedY} x2={cx} y2={crossTop} stroke={lineColor} strokeWidth={lw} />);
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
    if (idx === undefined) return;
    const bs = beadStyle(idx, currentStep, accentColor);
    elements.push(
      <circle key={`tail-${beadId}`} cx={cx} cy={y} r={rad}
        fill={bs.fill} stroke={bs.stroke} strokeWidth={bs.strokeWidth}
        style={{ transition: "all 0.3s ease", filter: bs.filter }} />
    );
    if (jumpable && onJump) {
      elements.push(
        <circle key={`tail-hit-${beadId}`} cx={cx} cy={y} r={12}
          fill="transparent" style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onJump(idx); }}
          role="button"
          aria-label={`Skočit na Pater Noster úvodu, krok ${idx + 1} z ${sequence.length}`}
        />
      );
    }
  });

  // --- RING ---
  const totalBeads = 55;
  const decadeGapAngle = 0.08; // uniform gap between decades (also bridging end → start)
  const totalGapsAngle = 5 * decadeGapAngle;
  const usableAngle = 2 * Math.PI - totalGapsAngle;
  const beadAngle = usableAngle / totalBeads;

  let angle = Math.PI / 2; // first OF sits exactly at the junction (bottom-center)
  const ringBeadPositions: RingBead[] = [];

  for (let d = 0; d < 5; d++) {
    ringBeadPositions.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      seqIdx: beadIdx[`ring-of-${d}`],
      radius: 6,
      key: `ring-of-${d}`,
      isOf: true,
      decade: d,
    });
    angle += beadAngle;

    for (let h = 0; h < 10; h++) {
      ringBeadPositions.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        seqIdx: beadIdx[`ring-hm-${d}-${h}`],
        radius: 4,
        key: `ring-hm-${d}-${h}`,
        isOf: false,
        decade: d,
      });
      angle += beadAngle;
    }

    angle += decadeGapAngle;
  }

  // Draw connecting lines between consecutive beads within each decade
  let ringCursor = 0;
  for (let d = 0; d < 5; d++) {
    const decadeStart = ringCursor;
    const decadeEnd = ringCursor + 11; // 1 OF + 10 HM
    for (let i = decadeStart; i < decadeEnd - 1; i++) {
      const a = ringBeadPositions[i]!;
      const b = ringBeadPositions[i + 1]!;
      elements.push(
        <line key={`rline-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={lineColor} strokeWidth={lw} />
      );
    }
    ringCursor += 11;
  }

  // Lines connecting decades (last HM of decade N → first OF of decade N+1)
  for (let d = 0; d < 4; d++) {
    const lastOfPrev = d * 11 + 10;
    const firstOfNext = (d + 1) * 11;
    const a = ringBeadPositions[lastOfPrev]!;
    const b = ringBeadPositions[firstOfNext]!;
    elements.push(
      <line key={`rline-gap-${d}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke={lineColor} strokeWidth={lw} />
    );
  }

  // Last ring bead loops back across the end gap to the junction
  const lastRingBead = ringBeadPositions[ringBeadPositions.length - 1]!;
  elements.push(
    <line key="rline-to-junc-r" x1={lastRingBead.x} y1={lastRingBead.y} x2={cx} y2={junctionY}
      stroke={lineColor} strokeWidth={lw} />
  );

  // Ring beads ON TOP of lines (with optional jump hit-circle for Pater Noster)
  ringBeadPositions.forEach((bead) => {
    if (bead.seqIdx === undefined) return;
    const bs = beadStyle(bead.seqIdx, currentStep, accentColor);
    elements.push(
      <circle key={bead.key} cx={bead.x} cy={bead.y} r={bead.radius}
        fill={bs.fill} stroke={bs.stroke} strokeWidth={bs.strokeWidth}
        style={{ transition: "all 0.3s ease", filter: bs.filter }} />
    );
    if (bead.isOf && onJump) {
      const targetIdx = bead.seqIdx;
      elements.push(
        <circle key={`hit-${bead.key}`} cx={bead.x} cy={bead.y} r={11}
          fill="transparent" style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); onJump(targetIdx); }}
          role="button"
          aria-label={`Skočit na ${bead.decade + 1}. desátek`}
        />
      );
    }
  });

  // Tightly fit the viewBox to actual content (top of ring beads → bottom of cross stroke)
  const vbTop = cy - r - 6;
  const vbBottom = crossBot + 3;
  const vbHeight = vbBottom - vbTop;

  return (
    <svg viewBox={`0 ${vbTop} 300 ${vbHeight}`}
      style={{ width: "100%", maxWidth: 220, margin: "0 auto", display: "block" }}
      role="img"
      aria-label={`Růženec, krok ${currentStep + 1} z ${sequence.length}`}>
      {elements}
    </svg>
  );
}
