import { useState, useEffect, useCallback, useRef } from "react";

const MYSTERIES = {
  radostny: {
    name: "Mysteria Gaudiosa",
    color: "#2E7D32",
    mysteries: [
      "quem, Virgo, de Spiritu Sancto concepísti",
      "quem, Virgo, visitándo Elisabeth portásti",
      "quem, Virgo, genuísti in Betlehem",
      "quem, Virgo, in templo præsentásti",
      "quem, Virgo, in templo invenísti",
    ],
  },
  bolestny: {
    name: "Mysteria Dolorosa",
    color: "#C62828",
    mysteries: [
      "qui pro nobis Sanguinem sudávit",
      "qui pro nobis flagellátus est",
      "qui pro nobis spinis coronátus est",
      "qui pro nobis crucem bajulávit",
      "qui pro nobis crucifíxus est",
    ],
  },
  slavny: {
    name: "Mysteria Gloriosa",
    color: "#F9A825",
    mysteries: [
      "qui resurréxit a mortuis",
      "qui in cælum ascéndit",
      "qui Spiritum Sanctum misit",
      "qui te, o Virgo, in cælum assúmpsit",
      "qui te, o Virgo, in cælis coronávit",
    ],
  },
};

// Rosary structure:
// Opening: Sign of Cross + Creed + Our Father + 3 Hail Marys + Glory Be = positions 0-6
// Each decade: Our Father + 10 Hail Marys + Glory Be + Fatima = 13
// Closing: Salve Regina + Sign of Cross
// Total: 7 + 5*13 + 2 = 74 positions

const PRAYER_TYPES = {
  SIGN_OF_CROSS: "sign_of_cross",
  CREED: "creed",
  OUR_FATHER: "our_father",
  HAIL_MARY: "hail_mary",
  GLORY_BE: "glory_be",
  FATIMA: "fatima",
  SALVE_REGINA: "salve_regina",
};

function buildRosarySequence(mysterySet) {
  const seq = [];
  // Opening
  seq.push({ type: PRAYER_TYPES.SIGN_OF_CROSS, label: "Signum Crucis" });
  seq.push({ type: PRAYER_TYPES.CREED, label: "Credo" });
  seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY, label: "Ave Maria", mystery: "qui adaúgeat nobis fidem" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY, label: "Ave Maria", mystery: "qui corróboret nobis spem" });
  seq.push({ type: PRAYER_TYPES.HAIL_MARY, label: "Ave Maria", mystery: "qui perfíciat nobis caritátem" });
  seq.push({ type: PRAYER_TYPES.GLORY_BE, label: "Gloria Patri" });

  // 5 decades
  for (let d = 0; d < 5; d++) {
    seq.push({ type: PRAYER_TYPES.OUR_FATHER, label: "Pater Noster" });
    for (let h = 1; h <= 10; h++) {
      seq.push({
        type: PRAYER_TYPES.HAIL_MARY,
        label: "Ave Maria",
        decade: d,
        num: h,
        mystery: mysterySet.mysteries[d],
      });
    }
    seq.push({ type: PRAYER_TYPES.GLORY_BE, label: "Gloria Patri" });
    seq.push({ type: PRAYER_TYPES.FATIMA, label: "O mi Jesu" });
  }

  seq.push({ type: PRAYER_TYPES.SALVE_REGINA, label: "Salve Regina" });
  seq.push({ type: PRAYER_TYPES.SIGN_OF_CROSS, label: "Signum Crucis" });
  return seq;
}

const PRAYERS = {
  [PRAYER_TYPES.SIGN_OF_CROSS]: `In nómine ☩ Patris et Fílii et Spíritus Sancti. Amen.`,

  [PRAYER_TYPES.CREED]: `Credo in Deum, Patrem omnipoténtem, Creatórem cæli et terræ. Et in Jesum Christum, Fílium ejus únicum, Dóminum nostrum: qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifíxus, mórtuus, et sepúltus: descéndit ad ínferos; tértia die resurréxit a mórtuis; ascéndit ad cælos; sedet ad déxteram Dei Patris omnipoténtis: inde ventúrus est iudicáre vivos et mórtuos. Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, Sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam ætérnam. Amen.`,

  [PRAYER_TYPES.OUR_FATHER]: `Pater noster, qui es in cælis, sanctificétur nomen tuum. Advéniat regnum tuum. Fiat volúntas tua, sicut in cælo et in terra. Panem nostrum quotidiánum da nobis hódie: et dimítte nobis débita nostra, sicut et nos dimíttimus debitóribus nostris. Et ne nos indúcas in tentatiónem: sed líbera nos a malo. Amen.`,

  [PRAYER_TYPES.GLORY_BE]: `Glória Patri, et Fílio, et Spirítui Sancto. Sicut erat in princípio, et nunc, et semper, et in sǽcula sæculórum. Amen.`,

  [PRAYER_TYPES.FATIMA]: `O mi Jesu, indúlge peccáta nostra, consérva nos ab ígne inférni, duc ómnes ad cæli glóriam, præcípue misericordia túa máxime indigéntes.`,

  [PRAYER_TYPES.SALVE_REGINA]: `Salve Regina, Mater misericórdiæ; Vita, dulcédo, et spes nóstra, salve. Ad te clamámus exsules fílii Hevæ. Ad te suspirámus, geméntes et flentes in hac lacrimárum valle. Eia ergo, Advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Jesum, benedíctum fructum ventris tui, nobis post hoc exsílium osténde. O clemens, o pia, o dulcis Virgo María.

℣ Ora pro nobis, sancta Dei Genitrix.
℟ Ut digni efficiámur promissiónibus Christi.

Orémus:
Deus, cuius Unigénitus per vitam, mortem et resurrectiónem suam nobis salútis ætérnæ præmia comparávit: concéde, quæsumus; ut hæc mysteria sacratíssimo beátæ Maríæ Virginis Rosário recoléntes, et imitémur quod continent, et quod promíttunt, assequámur. Per eúndem Christum Dóminum nostrum. Amen.`,
};

function getHailMary(mystery) {
  return {
    before: `Ave Maria, grátia plena, Dóminus tecum; benedícta tu in muliéribus, et benedíctus fructus ventris tui, Jesus,`,
    mystery: mystery || "",
    after: `Sancta María, Mater Dei, ora pro nobis peccatóribus, nunc et in hora mortis nostræ. Amen.`,
  };
}

// Helper: get bead color/style
function beadStyle(seqIdx, currentStep, accentColor) {
  const isActive = seqIdx === currentStep;
  const isPast = seqIdx < currentStep;
  return {
    fill: isActive ? accentColor : isPast ? "#90A4AE" : "#CFD8DC",
    stroke: isActive ? accentColor : "none",
    strokeWidth: isActive ? 2.5 : 0,
    filter: isActive ? `drop-shadow(0 0 8px ${accentColor})` : "none",
  };
}

// SVG Rosary Bead Ring
// Physical layout (bottom to top):
//   Cross → Creed bead(0) → [gap] → Our Father(1) → HM(2) → HM(3) → HM(4) → Glory Be junction(5) → Ring
function RosaryBeads({ currentStep, sequence, accentColor }) {
  const cx = 150, cy = 128, r = 105;
  const elements = [];

  // Junction: bottom of the ring where tail connects
  // There is NO bead for Glory Be - it's just a prayer said at the junction
  const junctionY = cy + r;

  // Tail layout going down from junction
  const sp = 13; // spacing
  const gap = 9; // extra gap between 3 HMs and Our Father

  // Tail beads: HM3 is closest to ring, then HM2, HM1, gap, Our Father, Creed
  // Sequence positions: 0=Sign of Cross (no bead), 1=Creed, 2=OF, 3-5=HMs
  const tailPositions = [
    { y: junctionY + sp,           idx: 5, rad: 4.5 },   // Hail Mary 3
    { y: junctionY + sp * 2,       idx: 4, rad: 4.5 },   // Hail Mary 2
    { y: junctionY + sp * 3,       idx: 3, rad: 4.5 },   // Hail Mary 1
    { y: junctionY + sp * 3 + sp + gap, idx: 2, rad: 6.5 }, // Our Father (after gap)
    { y: junctionY + sp * 3 + sp * 2 + gap, idx: 1, rad: 5.5 }, // Creed
  ];

  const lineColor = "#B0BEC5";
  const lw = 1.5;

  // Tail connecting lines - from junction point down to first bead, then between beads
  // Junction to HM3
  elements.push(
    <line key="tline-junc" x1={cx} y1={junctionY} x2={cx} y2={tailPositions[0].y}
      stroke={lineColor} strokeWidth={lw} />
  );
  for (let i = 0; i < tailPositions.length - 1; i++) {
    const from = tailPositions[i];
    const to = tailPositions[i + 1];
    // Dashed line for the gap between HM1 and Our Father
    const isDashed = (from.idx === 2 && to.idx === 1);
    elements.push(
      <line key={`tline-${i}`} x1={cx} y1={from.y} x2={cx} y2={to.y}
        stroke={lineColor} strokeWidth={lw}
        strokeDasharray={isDashed ? "3,4" : "none"} />
    );
  }

  // Cross below Creed
  const creedY = tailPositions[tailPositions.length - 1].y;
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
  tailPositions.forEach(({ y, idx, rad }) => {
    const bs = beadStyle(idx, currentStep, accentColor);
    elements.push(
      <circle key={`tail-${idx}`} cx={cx} cy={y} r={rad}
        fill={bs.fill} stroke={bs.stroke} strokeWidth={bs.strokeWidth}
        style={{ transition: "all 0.3s ease", filter: bs.filter }} />
    );
  });

  // --- RING ---
  // No background circle/arc. Instead, draw lines between consecutive beads.
  // First, compute all bead positions, then draw lines, then beads.

  const totalBeads = 55;
  const decadeGapAngle = 0.08; // uniform gap between decades (also bridging end → start)
  const totalGapsAngle = 5 * decadeGapAngle;
  const usableAngle = 2 * Math.PI - totalGapsAngle;
  const beadAngle = usableAngle / totalBeads;

  let angle = Math.PI / 2; // first OF sits exactly at the junction (bottom-center)

  const ringBeadPositions = []; // {x, y, seqIdx, radius}

  for (let d = 0; d < 5; d++) {
    // Our Father bead (larger)
    const ofSeqIdx = 7 + d * 13;
    ringBeadPositions.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      seqIdx: ofSeqIdx,
      radius: 6,
      key: `ring-of-${d}`,
    });
    angle += beadAngle;

    // 10 Hail Mary beads
    for (let h = 0; h < 10; h++) {
      const hmSeqIdx = 7 + d * 13 + 1 + h;
      ringBeadPositions.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
        seqIdx: hmSeqIdx,
        radius: 4,
        key: `ring-hm-${d}-${h}`,
      });
      angle += beadAngle;
    }

    angle += decadeGapAngle;
  }

  // Draw connecting lines between consecutive beads within each decade
  let beadIdx = 0;
  for (let d = 0; d < 5; d++) {
    const decadeStart = beadIdx;
    const decadeEnd = beadIdx + 11; // 1 OF + 10 HM
    for (let i = decadeStart; i < decadeEnd - 1; i++) {
      const a = ringBeadPositions[i];
      const b = ringBeadPositions[i + 1];
      elements.push(
        <line key={`rline-${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={lineColor} strokeWidth={lw} />
      );
    }
    beadIdx += 11;
  }

  // Also draw lines connecting decades (last HM of decade N to first OF of decade N+1)
  // These go across the decade gap
  for (let d = 0; d < 4; d++) {
    const lastOfPrev = d * 11 + 10; // last HM of decade d
    const firstOfNext = (d + 1) * 11; // OF of decade d+1
    const a = ringBeadPositions[lastOfPrev];
    const b = ringBeadPositions[firstOfNext];
    elements.push(
      <line key={`rline-gap-${d}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
        stroke={lineColor} strokeWidth={lw} />
    );
  }

  // Last ring bead loops back across the end gap to the junction (where the first bead sits)
  const lastRingBead = ringBeadPositions[ringBeadPositions.length - 1];
  elements.push(
    <line key="rline-to-junc-r" x1={lastRingBead.x} y1={lastRingBead.y} x2={cx} y2={junctionY}
      stroke={lineColor} strokeWidth={lw} />
  );

  // Draw ring beads ON TOP of lines
  ringBeadPositions.forEach((bead) => {
    const bs = beadStyle(bead.seqIdx, currentStep, accentColor);
    elements.push(
      <circle key={bead.key} cx={bead.x} cy={bead.y} r={bead.radius}
        fill={bs.fill} stroke={bs.stroke} strokeWidth={bs.strokeWidth}
        style={{ transition: "all 0.3s ease", filter: bs.filter }} />
    );
  });

  // Tightly fit the viewBox to actual content (top of ring beads → bottom of cross stroke)
  // instead of starting at y=0; crops ~22 SVG units of empty padding inside the SVG.
  const vbTop = cy - r - 6; // ring top is at cy-r=23; bead radius 4, stroke padding ≈2
  const vbBottom = crossBot + 3;
  const vbHeight = vbBottom - vbTop;

  return (
    <svg viewBox={`0 ${vbTop} 300 ${vbHeight}`} style={{ width: "100%", maxWidth: 220, margin: "0 auto", display: "block" }}>
      {elements}
    </svg>
  );
}

const STORAGE_KEY = "ruzenec_state";
const STATE_VERSION = 3;

function loadSavedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved.version !== STATE_VERSION) return null;
    if (!saved.selectedMystery || !MYSTERIES[saved.selectedMystery]) return null;
    const seqLen = buildRosarySequence(MYSTERIES[saved.selectedMystery]).length;
    if (typeof saved.currentStep !== "number" || saved.currentStep < 0 || saved.currentStep >= seqLen) return null;
    return saved;
  } catch {}
  return null;
}

function saveState(selectedMystery, currentStep) {
  try {
    if (selectedMystery) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: STATE_VERSION, selectedMystery, currentStep }));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {}
}

export default function Ruzenec() {
  const saved = useRef(loadSavedState());

  const [selectedMystery, setSelectedMystery] = useState(saved.current?.selectedMystery ?? null);
  const [currentStep, setCurrentStep] = useState(saved.current?.currentStep ?? 0);
  const [sequence, setSequence] = useState(() => {
    if (saved.current?.selectedMystery) {
      return buildRosarySequence(MYSTERIES[saved.current.selectedMystery]);
    }
    return [];
  });
  const [started, setStarted] = useState(!!saved.current);
  const prayerRef = useRef(null);
  const touchStart = useRef(null);

  // Persist state on changes
  useEffect(() => {
    saveState(started ? selectedMystery : null, currentStep);
  }, [selectedMystery, currentStep, started]);

  // Keep the screen on while praying
  useEffect(() => {
    if (!started) return;
    let wakeLock = null;
    let alive = true;
    const acquire = async () => {
      if (!("wakeLock" in navigator) || !alive) return;
      try { wakeLock = await navigator.wakeLock.request("screen"); } catch {}
    };
    acquire();
    const onVis = () => { if (document.visibilityState === "visible") acquire(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      alive = false;
      document.removeEventListener("visibilitychange", onVis);
      if (wakeLock) wakeLock.release().catch(() => {});
    };
  }, [started]);

  const startRosary = useCallback((key) => {
    setSelectedMystery(key);
    const seq = buildRosarySequence(MYSTERIES[key]);
    setSequence(seq);
    setCurrentStep(0);
    setStarted(true);
  }, []);

  const buzz = () => { try { navigator.vibrate?.(25); } catch {} };

  const next = () => {
    if (currentStep < sequence.length - 1) {
      buzz();
      setCurrentStep((s) => s + 1);
      prayerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      buzz();
      setCurrentStep((s) => s - 1);
      prayerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const reset = () => {
    setStarted(false);
    setSelectedMystery(null);
    setCurrentStep(0);
    setSequence([]);
    saveState(null, 0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!started) return;
    const onKey = (e) => {
      if (e.target?.tagName === "INPUT" || e.target?.tagName === "TEXTAREA") return;
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") { e.preventDefault(); next(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, currentStep, sequence.length]);

  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;
    touchStart.current = null;
    if (dt < 600 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) prev(); else next();
    }
  };

  const onPrayerCardClick = () => {
    if (window.getSelection?.()?.toString()) return;
    next();
  };

  const mysterySet = selectedMystery ? MYSTERIES[selectedMystery] : null;
  const currentPrayer = sequence[currentStep];
  const accentColor = mysterySet?.color || "#1565C0";

  // Render prayer text
  function renderPrayerText() {
    if (!currentPrayer) return null;

    if (currentPrayer.type === PRAYER_TYPES.HAIL_MARY) {
      const hm = getHailMary(currentPrayer.mystery);
      return (
        <div style={{ textAlign: "center", lineHeight: 1.35, fontFamily: "'EB Garamond', Georgia, serif", fontSize: "clamp(17px, 5vw, 22px)" }}>
          {currentPrayer.num && (
            <div style={{ fontSize: 12, color: "#90A4AE", marginBottom: 8, fontFamily: "Arial, sans-serif", letterSpacing: 1 }}>
              {currentPrayer.num} / 10
            </div>
          )}
          <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{hm.before}</div>
          <div style={{ color: accentColor, fontWeight: 600, margin: "4px 0" }}>{hm.mystery}.</div>
          <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{hm.after}</div>
        </div>
      );
    }

    const text = PRAYERS[currentPrayer.type];
    return (
      <div style={{ textAlign: "center", lineHeight: 1.35, fontFamily: "'EB Garamond', Georgia, serif", fontSize: "clamp(17px, 5vw, 22px)" }}>
        <div style={{ whiteSpace: "pre-line", color: "#37474F" }}>{text}</div>
      </div>
    );
  }

  // Menu screen
  if (!started) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #ECEFF1 0%, #FAFAFA 50%, #E8EAF6 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: 24,
      }}>
        
        {/* Cross icon */}
        <svg width="48" height="48" viewBox="0 0 48 48" style={{ marginBottom: 16 }}>
          <line x1="24" y1="6" x2="24" y2="42" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
          <line x1="12" y1="18" x2="36" y2="18" stroke="#1565C0" strokeWidth="4" strokeLinecap="round" />
        </svg>

        <h1 style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 36,
          fontWeight: 700,
          color: "#263238",
          marginBottom: 6,
          letterSpacing: -0.5,
        }}>
          Latinský růženec
        </h1>

        <div style={{ width: "100%", maxWidth: 380, display: "flex", flexDirection: "column", gap: 12 }}>
          {Object.entries(MYSTERIES).map(([key, val]) => (
            <button
              key={key}
              onClick={() => startRosary(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "18px 24px",
                background: "white",
                border: "1px solid #E0E0E0",
                borderRadius: 16,
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
                e.currentTarget.style.borderColor = val.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#E0E0E0";
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: val.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke={val.color} strokeWidth="1.5" />
                  <line x1="10" y1="5" x2="10" y2="15" stroke={val.color} strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="6" y1="9" x2="14" y2="9" stroke={val.color} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 20, fontWeight: 600, color: "#263238" }}>
                  {val.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const progress = sequence.length > 0 ? ((currentStep + 1) / sequence.length) * 100 : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #ECEFF1 0%, #FAFAFA 50%, #E8EAF6 100%)",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
    }}>

      {/* Header */}
      <div style={{
        background: accentColor,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <button
          onClick={reset}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: 8,
            padding: "6px 12px",
            cursor: "pointer",
            color: "white",
            fontSize: 14,
            fontFamily: "Arial, sans-serif",
          }}
        >
          ← Zpět
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{
            color: "white",
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            fontWeight: 600,
          }}>
            {mysterySet.name}
          </div>
        </div>
        <div style={{ width: 60 }} />
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(0,0,0,0.1)" }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: accentColor,
          transition: "width 0.3s ease",
        }} />
      </div>

      {/* Main content */}
      <div
        ref={prayerRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          flex: 1,
          overflow: "auto",
          padding: "8px 14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ margin: "auto 0", width: "100%" }}>
          {/* Rosary visualization */}
          <RosaryBeads currentStep={currentStep} sequence={sequence} accentColor={accentColor} />

          {/* Prayer label */}
          <div style={{
            textAlign: "center",
            marginTop: 8,
            marginBottom: 4,
          }}>
            <span style={{
              display: "inline-block",
              background: accentColor + "15",
              color: accentColor,
              padding: "5px 14px",
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}>
              {currentPrayer?.label}
            </span>
            {currentPrayer?.subtitle && (
              <div style={{ fontSize: 12, color: "#90A4AE", marginTop: 4 }}>
                {currentPrayer.subtitle}
              </div>
            )}
          </div>

          {/* Prayer text */}
          <div
            onClick={onPrayerCardClick}
            style={{
              background: "white",
              borderRadius: 18,
              padding: "20px 18px",
              margin: "6px 0 12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              border: "1px solid #ECEFF1",
              cursor: "pointer",
              userSelect: "text",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {renderPrayerText()}
          </div>

        </div>
      </div>

      {/* Navigation */}
      <div style={{
        padding: "10px 16px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "linear-gradient(transparent, #ECEFF1)",
      }}>
        <button
          onClick={prev}
          disabled={currentStep === 0}
          style={{
            padding: "14px 32px",
            borderRadius: 14,
            border: "1px solid #CFD8DC",
            background: "white",
            color: currentStep === 0 ? "#CFD8DC" : "#546E7A",
            cursor: currentStep === 0 ? "default" : "pointer",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "Arial, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          Předchozí
        </button>

        {currentStep < sequence.length - 1 ? (
          <button
            onClick={next}
            style={{
              padding: "14px 40px",
              borderRadius: 14,
              border: "none",
              background: accentColor,
              color: "white",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
              boxShadow: `0 4px 16px ${accentColor}40`,
              transition: "all 0.2s ease",
            }}
          >
            Další
          </button>
        ) : (
          <button
            onClick={reset}
            style={{
              padding: "14px 40px",
              borderRadius: 14,
              border: "none",
              background: accentColor,
              color: "white",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
              boxShadow: `0 4px 16px ${accentColor}40`,
            }}
          >
            Dokončit ✝
          </button>
        )}
      </div>
    </div>
  );
}
