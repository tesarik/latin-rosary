import { useEffect, useState } from "react";
import { STRINGS, type Locale } from "./i18n";
import {
  MAX_PLANS,
  MAX_PLAN_LENGTH,
  MAX_PLAN_NAME,
  MAX_PLAN_STEPS,
  MAX_REPEAT,
  PLAN_COLOR,
  PLAN_ITEM_GROUPS,
  newPlanId,
  planItemName,
  planKeyOf,
  planLength,
  planShareUrl,
  requestPersistentStorage,
  type Plan,
  type PlanItemKey,
  type PlanStep,
} from "./plans";
import type { PrayerSetKey } from "./navigation";

type Props = {
  plans: Plan[];
  onChange: (plans: Plan[]) => void;
  onStart: (key: PrayerSetKey) => void;
  onClose: () => void;
  locale: Locale;
};

// The prayer-plan screen: a list of the user's saved plans, and the editor that
// builds one. Reached from the "Prayer plans" tile on the start screen, so it
// is only ever open when nothing is in progress — editing a plan can therefore
// never desync a saved position (starting a set is what leaves this screen).
export default function PlansScreen({ plans, onChange, onStart, onClose, locale }: Props) {
  const t = STRINGS[locale];
  const [draft, setDraft] = useState<Plan | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(id);
  }, [toast]);

  const commit = (plan: Plan) => {
    const exists = plans.some((p) => p.id === plan.id);
    onChange(exists ? plans.map((p) => (p.id === plan.id ? plan : p)) : [...plans, plan]);
    requestPersistentStorage();
    setDraft(null);
  };

  const remove = (plan: Plan) => {
    if (!window.confirm(t.planDeleteConfirm(plan.name))) return;
    onChange(plans.filter((p) => p.id !== plan.id));
  };

  // Native share sheet where there is one (mobile), clipboard otherwise, and a
  // prompt as the last resort so the link is always reachable by hand.
  const share = async (plan: Plan) => {
    const url = planShareUrl(plan);
    try {
      if (navigator.share) {
        await navigator.share({ title: plan.name, url });
        return;
      }
    } catch {
      return; // user dismissed the sheet
    }
    try {
      await navigator.clipboard.writeText(url);
      setToast(t.planShareCopied);
      return;
    } catch {}
    window.prompt(t.planShareFallback, url);
  };

  const startNew = () => {
    if (plans.length >= MAX_PLANS) {
      setToast(t.planLimitReached);
      return;
    }
    setDraft({ id: newPlanId(plans), name: "", steps: [] });
  };

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Arial, sans-serif" }}>
      <Header
        title={draft ? t.planNew : t.plansTitle}
        backLabel={draft ? t.planCancel : t.back}
        backAria={draft ? t.planCancel : t.planBackAria}
        onBack={() => (draft ? setDraft(null) : onClose())}
      />

      <div style={{ maxWidth: 420, margin: "0 auto", padding: "16px 16px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        {draft ? (
          <PlanEditor draft={draft} onDraftChange={setDraft} onSave={commit} onNotice={setToast} locale={locale} />
        ) : (
          <>
            {plans.length === 0 && (
              <p style={{ margin: "8px 4px 4px", color: "var(--text-soft)", fontSize: 15, lineHeight: 1.55 }}>
                {t.plansEmpty}
              </p>
            )}

            {plans.map((plan) => (
              <PlanRow
                key={plan.id}
                plan={plan}
                locale={locale}
                onStart={() => onStart(planKeyOf(plan.id))}
                onEdit={() => setDraft({ ...plan, steps: plan.steps.map((s) => ({ ...s })) })}
                onShare={() => share(plan)}
                onDelete={() => remove(plan)}
              />
            ))}

            <button
              onClick={startNew}
              style={{
                padding: "16px 20px",
                borderRadius: 16,
                border: "1.5px dashed var(--border-strong)",
                background: "transparent",
                color: PLAN_COLOR,
                fontFamily: "Arial, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              + {t.planNew}
            </button>
          </>
        )}
      </div>

      {toast && (
        <div
          role="status"
          style={{
            position: "fixed",
            left: "50%",
            bottom: 24,
            transform: "translateX(-50%)",
            maxWidth: "min(92vw, 420px)",
            padding: "12px 18px",
            borderRadius: 12,
            background: "var(--text-strong)",
            // NOT --bg: that token is a gradient, so it's invalid for `color`
            // and the text would silently fall back to the inherited (dark) one.
            color: "var(--surface)",
            fontSize: 14,
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function Header({ title, backLabel, backAria, onBack }: {
  title: string;
  backLabel: string;
  backAria: string;
  onBack: () => void;
}) {
  return (
    <div style={{
      background: PLAN_COLOR,
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: 12,
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <button
        onClick={onBack}
        aria-label={backAria}
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
        ← {backLabel}
      </button>
      <div style={{ flex: 1, textAlign: "center", color: "white", fontSize: 20, fontWeight: 600 }}>
        {title}
      </div>
      {/* Spacer keeps the title optically centred against the back button. */}
      <div aria-hidden="true" style={{ width: 56 }} />
    </div>
  );
}

function PlanRow({ plan, locale, onStart, onEdit, onShare, onDelete }: {
  plan: Plan;
  locale: Locale;
  onStart: () => void;
  onEdit: () => void;
  onShare: () => void;
  onDelete: () => void;
}) {
  const t = STRINGS[locale];
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border)",
      borderRadius: 16,
      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      overflow: "hidden",
    }}>
      <button
        onClick={onStart}
        aria-label={t.startPrayerAria(plan.name)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "16px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div style={{
          width: 40, height: 40, borderRadius: 12, background: PLAN_COLOR + "18",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <PlanIcon color={PLAN_COLOR} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--text-strong)", overflowWrap: "anywhere" }}>
            {plan.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>
            {t.planCount(planLength(plan.steps))}
          </div>
        </div>
      </button>

      <div style={{ display: "flex", borderTop: "1px solid var(--border)" }}>
        <RowAction label={t.planEdit} aria={t.planEditAria(plan.name)} onClick={onEdit} />
        <RowAction label={t.planShare} aria={t.planShareAria(plan.name)} onClick={onShare} />
        <RowAction label={t.planDelete} aria={t.planDeleteAria(plan.name)} onClick={onDelete} danger />
      </div>
    </div>
  );
}

function RowAction({ label, aria, onClick, danger }: {
  label: string;
  aria: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={aria}
      style={{
        flex: 1,
        padding: "11px 8px",
        background: "transparent",
        border: "none",
        borderLeft: "1px solid var(--border)",
        color: danger ? "var(--rubric)" : "var(--text-soft)",
        fontFamily: "Arial, sans-serif",
        fontSize: 14,
        cursor: "pointer",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {label}
    </button>
  );
}

// The editor works on a draft copy; nothing reaches storage until Save.
function PlanEditor({ draft, onDraftChange, onSave, onNotice, locale }: {
  draft: Plan;
  onDraftChange: (plan: Plan) => void;
  onSave: (plan: Plan) => void;
  onNotice: (message: string) => void;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const [pickerOpen, setPickerOpen] = useState(draft.steps.length === 0);

  const setSteps = (steps: Plan["steps"]) => onDraftChange({ ...draft, steps });

  // Both limits are enforced here as well as on load: a plan that overflows
  // MAX_PLAN_LENGTH would be dropped by sanitizePlan on the next reload, so it
  // must never become saveable in the first place.
  const fits = (steps: PlanStep[]) =>
    steps.length <= MAX_PLAN_STEPS && planLength(steps) <= MAX_PLAN_LENGTH;

  const add = (key: PlanItemKey) => {
    const steps = [...draft.steps, { key, repeat: 1 }];
    if (!fits(steps)) {
      onNotice(t.planStepLimitReached);
      return;
    }
    setSteps(steps);
    setPickerOpen(false);
  };

  const move = (i: number, delta: number) => {
    const j = i + delta;
    if (j < 0 || j >= draft.steps.length) return;
    const steps = [...draft.steps];
    [steps[i], steps[j]] = [steps[j]!, steps[i]!];
    setSteps(steps);
  };

  const setRepeat = (i: number, repeat: number) => {
    const clamped = Math.min(MAX_REPEAT, Math.max(1, repeat));
    const steps = draft.steps.map((s, k) => (k === i ? { ...s, repeat: clamped } : s));
    if (!fits(steps)) {
      onNotice(t.planStepLimitReached);
      return;
    }
    setSteps(steps);
  };

  const save = () => onSave({ ...draft, name: draft.name.trim() || t.planUnnamed });

  return (
    <>
      <input
        value={draft.name}
        onChange={(e) => onDraftChange({ ...draft, name: e.target.value.slice(0, MAX_PLAN_NAME) })}
        placeholder={t.planNamePlaceholder}
        aria-label={t.planNamePlaceholder}
        style={{
          padding: "14px 16px",
          borderRadius: 14,
          border: "1px solid var(--border-strong)",
          background: "var(--surface)",
          color: "var(--text-strong)",
          fontFamily: "Arial, sans-serif",
          fontSize: 17,
          fontWeight: 600,
        }}
      />

      {draft.steps.map((step, i) => (
        <div
          key={`${step.key}-${i}`}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 13, color: "var(--text-muted)", flexShrink: 0 }}>{i + 1}.</span>
            <span style={{ fontSize: 15, color: "var(--text-strong)", overflowWrap: "anywhere" }}>
              {planItemName(step.key)}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StepButton label="−" aria={t.planRepeatDecreaseAria} disabled={step.repeat <= 1} onClick={() => setRepeat(i, step.repeat - 1)} />
            <span style={{ minWidth: 34, textAlign: "center", fontSize: 14, color: "var(--text)" }}>
              ×{step.repeat}
            </span>
            <StepButton label="+" aria={t.planRepeatIncreaseAria} disabled={step.repeat >= MAX_REPEAT} onClick={() => setRepeat(i, step.repeat + 1)} />
            <div style={{ flex: 1 }} />
            <StepButton label="↑" aria={t.planMoveUpAria} disabled={i === 0} onClick={() => move(i, -1)} />
            <StepButton label="↓" aria={t.planMoveDownAria} disabled={i === draft.steps.length - 1} onClick={() => move(i, 1)} />
            <StepButton label="×" aria={t.planRemoveAria} danger onClick={() => setSteps(draft.steps.filter((_, k) => k !== i))} />
          </div>
        </div>
      ))}

      {pickerOpen ? (
        <PrayerPicker onPick={add} onClose={() => setPickerOpen(false)} closeLabel={t.planCancel} />
      ) : (
        <button
          onClick={() => setPickerOpen(true)}
          style={{
            padding: "14px 20px",
            borderRadius: 14,
            border: "1.5px dashed var(--border-strong)",
            background: "transparent",
            color: PLAN_COLOR,
            fontFamily: "Arial, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + {t.planAddPrayer}
        </button>
      )}

      <button
        onClick={save}
        disabled={draft.steps.length === 0}
        style={{
          marginTop: 4,
          padding: "15px 20px",
          borderRadius: 14,
          border: "none",
          background: draft.steps.length === 0 ? "var(--border-strong)" : PLAN_COLOR,
          color: "white",
          fontFamily: "Arial, sans-serif",
          fontSize: 16,
          fontWeight: 600,
          cursor: draft.steps.length === 0 ? "default" : "pointer",
        }}
      >
        {t.planSave}
      </button>
    </>
  );
}

function StepButton({ label, aria, onClick, disabled, danger }: {
  label: string;
  aria: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={aria}
      style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        border: "1px solid var(--border-strong)",
        background: "var(--surface)",
        color: disabled ? "var(--border-strong)" : danger ? "var(--rubric)" : "var(--text-soft)",
        fontSize: 16,
        lineHeight: 1,
        cursor: disabled ? "default" : "pointer",
        flexShrink: 0,
      }}
    >
      {label}
    </button>
  );
}

// The prayer catalogue a plan may draw on: the ordinary prayers and the
// litanies, in the same two groups the start screen uses. The rosary and the
// linear devotions are deliberately absent (see plans.ts).
function PrayerPicker({ onPick, onClose, closeLabel }: {
  onPick: (key: PlanItemKey) => void;
  onClose: () => void;
  closeLabel: string;
}) {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-strong)",
      borderRadius: 14,
      overflow: "hidden",
      animation: "rolldown 0.22s ease",
    }}>
      <div style={{ maxHeight: "46vh", overflowY: "auto" }}>
        {PLAN_ITEM_GROUPS.map((group) => (
          <div key={group.title}>
            <div style={{
              padding: "10px 16px 6px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: "uppercase",
              color: "var(--text-muted)",
              background: "var(--surface)",
              position: "sticky",
              top: 0,
            }}>
              {group.title}
            </div>
            {group.keys.map((key) => (
              <button
                key={key}
                onClick={() => onPick(key)}
                style={{
                  width: "100%",
                  display: "block",
                  textAlign: "left",
                  padding: "11px 16px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Arial, sans-serif",
                  fontSize: 15,
                  color: "var(--text)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {planItemName(key)}
              </button>
            ))}
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        style={{
          width: "100%",
          padding: "11px 16px",
          borderTop: "1px solid var(--border)",
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          fontFamily: "Arial, sans-serif",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        {closeLabel}
      </button>
    </div>
  );
}

// Sheet-with-lines glyph — deliberately unlike the rosary ring and the plain
// cross used by the other start-screen tiles.
export function PlanIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="3.5" y="2.5" width="13" height="15" rx="2.5" fill="none" stroke={color} strokeWidth="1.5" />
      <line x1="6.75" y1="7" x2="13.25" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.75" y1="10.5" x2="13.25" y2="10.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="6.75" y1="14" x2="10.75" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
