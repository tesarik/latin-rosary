import { useEffect, useRef, useState } from "react";
import { STRINGS, type Locale } from "./i18n";
import {
  MAX_PLANS,
  MAX_CUSTOM_PRAYERS,
  MAX_CUSTOM_TEXT,
  MAX_CUSTOM_TITLE,
  LONG_SHARE_URL,
  MAX_PLAN_LENGTH,
  MAX_PLAN_NAME,
  MAX_PLAN_STEPS,
  MAX_REPEAT,
  PLAN_COLOR,
  PLAN_ITEM_GROUPS,
  newPlanId,
  planItemName,
  planItemNameTr,
  planKeyOf,
  planLength,
  planShareUrl,
  requestPersistentStorage,
  customKeyOf,
  exportPlans,
  findCustom,
  isCustomKey,
  newCustomId,
  parsePlansBackup,
  stepName,
  type CustomPrayer,
  type Plan,
  type PlanItemKey,
  type PlanStep,
} from "./plans";
import type { PrayerSetKey } from "./navigation";
import type { Theme } from "./theme";
import ResumeLine, { type ResumeInfo } from "./ResumeLine";
import { askConfirm } from "./ConfirmDialog";

type Props = {
  plans: Plan[];
  onChange: (plans: Plan[]) => void;
  onStart: (key: PrayerSetKey) => void;
  onClose: () => void;
  resume: ResumeInfo;
  theme: Theme;
  locale: Locale;
};

// The prayer-plan screen: a list of the user's saved plans, and the editor that
// builds one. Reached from the "Prayer plans" tile on the start screen. A plan
// may have a saved place; `Rosary.setPlans` drops it when the plan is edited or
// deleted, since the steps it pointed into have changed.
export default function PlansScreen({ plans, onChange, onStart, onClose, resume, theme, locale }: Props) {
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

  const remove = async (plan: Plan) => {
    if (!(await askConfirm({ message: t.planDeleteConfirm(plan.name), confirmLabel: t.planDelete, cancelLabel: t.planCancel, color: "var(--rubric)" }))) return;
    onChange(plans.filter((p) => p.id !== plan.id));
  };

  // Native share sheet where there is one (mobile), clipboard otherwise, and a
  // prompt as the last resort so the link is always reachable by hand.
  // A plan's own prayers travel in the link, so a long one is flagged: some
  // chat apps cut long URLs short.
  const share = async (plan: Plan) => {
    const url = planShareUrl(plan);
    const long = url.length > LONG_SHARE_URL;
    try {
      if (navigator.share) {
        await navigator.share({ title: plan.name, url });
        if (long) setToast(t.planShareLong);
        return;
      }
    } catch {
      return; // user dismissed the sheet
    }
    try {
      await navigator.clipboard.writeText(url);
      setToast(long ? t.planShareLong : t.planShareCopied);
      return;
    } catch {}
    void askConfirm({ message: t.planShareFallback, detail: url, confirmLabel: t.dialogOk, cancelLabel: null, color: PLAN_COLOR });
  };

  const startNew = () => {
    if (plans.length >= MAX_PLANS) {
      setToast(t.planLimitReached);
      return;
    }
    setDraft({ id: newPlanId(plans), name: "", steps: [] });
  };

  // Backup: every plan to a JSON file the user keeps, and back. Imported
  // plans are added with fresh ids — never overwriting a local plan — up to
  // the plan limit.
  const fileInput = useRef<HTMLInputElement | null>(null);

  const exportAll = () => {
    const blob = new Blob([exportPlans(plans)], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `ruzenec-plany-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  const importFile = async (file: File) => {
    const parsed = parsePlansBackup(await file.text());
    if (!parsed) {
      setToast(t.planImportInvalid);
      return;
    }
    const take = parsed.slice(0, Math.max(0, MAX_PLANS - plans.length));
    if (take.length === 0) {
      setToast(t.planImportNone);
      return;
    }
    if (!(await askConfirm({ message: t.planImportBackupConfirm(take.length), confirmLabel: t.planImportAdd, cancelLabel: t.planCancel, color: PLAN_COLOR }))) return;
    const next = [...plans];
    for (const p of take) next.push({ ...p, id: newPlanId(next) });
    onChange(next);
    requestPersistentStorage();
    setToast(t.planImportDone(take.length));
  };

  return (
    <div style={{ minHeight: "100dvh", background: "var(--bg)", fontFamily: "Arial, sans-serif" }}>
      <Header
        title={draft ? (plans.some((p) => p.id === draft.id) ? t.planEdit : t.planNew) : t.plansTitle}
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
                resume={resume[planKeyOf(plan.id)]}
                theme={theme}
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

            <div style={{ marginTop: 12, padding: "14px 16px", borderRadius: 14, background: "var(--surface)", border: "1px solid var(--border)" }}>
              <p style={{ margin: "0 0 10px", color: "var(--text-soft)", fontSize: 13, lineHeight: 1.5 }}>
                {t.planBackupHint}
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={exportAll} disabled={plans.length === 0} style={backupButton(plans.length === 0)}>
                  {t.planExport}
                </button>
                <button onClick={() => fileInput.current?.click()} style={backupButton(false)}>
                  {t.planImport}
                </button>
              </div>
              <input
                ref={fileInput}
                type="file"
                accept="application/json,.json"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = "";
                  if (file) void importFile(file);
                }}
              />
            </div>
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
      {/* Arrow only, like the prayer header's back button; the label is for
          screen readers and the tooltip ("Back" or, in the editor, "Cancel"). */}
      <button
        onClick={onBack}
        aria-label={backAria}
        title={backLabel}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          width: 44,
          height: 40,
          padding: 0,
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          color: "white",
          fontSize: 18,
          fontFamily: "Arial, sans-serif",
        }}
      >
        ←
      </button>
      <div style={{ flex: 1, textAlign: "center", color: "white", fontSize: 20, fontWeight: 600 }}>
        {title}
      </div>
      {/* Spacer keeps the title optically centred against the back button. */}
      <div aria-hidden="true" style={{ width: 44, flexShrink: 0 }} />
    </div>
  );
}

function PlanRow({ plan, resume, theme, locale, onStart, onEdit, onShare, onDelete }: {
  plan: Plan;
  resume: ResumeInfo[string] | undefined;
  theme: Theme;
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
          <ResumeLine info={resume} color={PLAN_COLOR} theme={theme} locale={locale} />
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
  // The own-prayer form: a new prayer (no id) or the one being edited.
  const [customForm, setCustomForm] = useState<Omit<CustomPrayer, "id"> & { id?: string } | null>(null);

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

  const openCustomForm = () => {
    if ((draft.custom?.length ?? 0) >= MAX_CUSTOM_PRAYERS) {
      onNotice(t.planCustomLimit);
      return;
    }
    setPickerOpen(false);
    setCustomForm({ title: "", text: "", textTr: "" });
  };

  // Add a new own prayer as the plan's next step, or update an edited one in
  // place (every step using it shows the change).
  const saveCustom = (form: Omit<CustomPrayer, "id"> & { id?: string }) => {
    const textTr = form.textTr?.trim();
    const prayer = (id: string): CustomPrayer =>
      textTr ? { id, title: form.title.trim(), text: form.text.trim(), textTr } : { id, title: form.title.trim(), text: form.text.trim() };
    if (form.id) {
      const id = form.id;
      onDraftChange({ ...draft, custom: (draft.custom ?? []).map((c) => (c.id === id ? prayer(id) : c)) });
    } else {
      const id = newCustomId(draft);
      const steps = [...draft.steps, { key: customKeyOf(id), repeat: 1 }];
      if (!fits(steps)) {
        onNotice(t.planStepLimitReached);
        return;
      }
      onDraftChange({ ...draft, steps, custom: [...(draft.custom ?? []), prayer(id)] });
    }
    setCustomForm(null);
  };

  // Removing a step drops its own prayer too once no other step uses it.
  const removeStep = (i: number) => {
    const steps = draft.steps.filter((_, k) => k !== i);
    const custom = (draft.custom ?? []).filter((c) => steps.some((st) => st.key === customKeyOf(c.id)));
    onDraftChange({ ...draft, steps, custom });
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

  const save = () => {
    // Only keep the own prayers some step still uses.
    const custom = (draft.custom ?? []).filter((c) => draft.steps.some((st) => st.key === customKeyOf(c.id)));
    const name = draft.name.trim() || t.planUnnamed;
    onSave(custom.length > 0 ? { ...draft, name, custom } : { id: draft.id, name, steps: draft.steps });
  };

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
              {stepName(draft, step.key)}
              <span style={{ color: "var(--text-muted)" }}> · {isCustomKey(step.key) ? t.planCustomTag : planItemNameTr(step.key, locale)}</span>
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
            {isCustomKey(step.key) && (
              <StepButton
                label="✎"
                aria={t.planCustomEditAria(stepName(draft, step.key))}
                onClick={() => {
                  const c = isCustomKey(step.key) ? findCustom(draft, step.key) : null;
                  if (c) { setPickerOpen(false); setCustomForm({ ...c, textTr: c.textTr ?? "" }); }
                }}
              />
            )}
            <StepButton label="×" aria={t.planRemoveAria} danger onClick={() => removeStep(i)} />
          </div>
        </div>
      ))}

      {customForm ? (
        <CustomPrayerForm
          initial={customForm}
          onSave={saveCustom}
          onCancel={() => setCustomForm(null)}
          locale={locale}
        />
      ) : pickerOpen ? (
        <PrayerPicker onPick={add} onClose={() => setPickerOpen(false)} closeLabel={t.planCancel} locale={locale} />
      ) : (
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setPickerOpen(true)} style={addButton}>
            + {t.planAddPrayer}
          </button>
          <button onClick={openCustomForm} style={addButton}>
            + {t.planCustomAdd}
          </button>
        </div>
      )}

      {/* Hidden while an own prayer is being written: its form has its own
          Save, and two Save buttons on screen would be ambiguous. */}
      {!customForm && (
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
      )}
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
function PrayerPicker({ onPick, onClose, closeLabel, locale }: {
  onPick: (key: PlanItemKey) => void;
  onClose: () => void;
  closeLabel: string;
  locale: Locale;
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
                <div>{planItemName(key)}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 1 }}>
                  {planItemNameTr(key, locale)}
                </div>
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

function backupButton(disabled: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid var(--border-strong)",
    background: "var(--surface)",
    color: disabled ? "var(--border-strong)" : PLAN_COLOR,
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: disabled ? "default" : "pointer",
  };
}

const addButton: React.CSSProperties = {
  flex: 1,
  padding: "14px 12px",
  borderRadius: 14,
  border: "1.5px dashed var(--border-strong)",
  background: "transparent",
  color: PLAN_COLOR,
  fontFamily: "Arial, sans-serif",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
};

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 12px",
  borderRadius: 10,
  border: "1px solid var(--border-strong)",
  background: "var(--surface)",
  color: "var(--text-strong)",
  fontFamily: "Arial, sans-serif",
  fontSize: 15,
};

// Write or edit a plan's own prayer: a title, its text, and an optional second
// version for the language button. Shown as plain text when prayed — never as
// markup — so anything typed (or received in a shared link) is safe.
function CustomPrayerForm({ initial, onSave, onCancel, locale }: {
  initial: Omit<CustomPrayer, "id"> & { id?: string };
  onSave: (form: Omit<CustomPrayer, "id"> & { id?: string }) => void;
  onCancel: () => void;
  locale: Locale;
}) {
  const t = STRINGS[locale];
  const [form, setForm] = useState(initial);
  const ready = form.title.trim() !== "" && form.text.trim() !== "";
  const label = (text: string) => (
    <span style={{ display: "block", margin: "0 0 4px", fontSize: 13, color: "var(--text-soft)" }}>{text}</span>
  );
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-strong)",
      borderRadius: 14,
      padding: 14,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      animation: "rolldown 0.22s ease",
    }}>
      <label>
        {label(t.planCustomTitle)}
        <input
          value={form.title}
          maxLength={MAX_CUSTOM_TITLE}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          style={fieldStyle}
        />
      </label>
      <label>
        {label(t.planCustomText)}
        <textarea
          value={form.text}
          maxLength={MAX_CUSTOM_TEXT}
          rows={6}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.45 }}
        />
      </label>
      <label>
        {label(t.planCustomTextTr)}
        <textarea
          value={form.textTr ?? ""}
          maxLength={MAX_CUSTOM_TEXT}
          rows={4}
          onChange={(e) => setForm({ ...form, textTr: e.target.value })}
          style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.45 }}
        />
        <span style={{ display: "block", marginTop: 4, fontSize: 12, color: "var(--text-muted)" }}>{t.planCustomTextTrHint}</span>
      </label>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onCancel} style={{ ...addButton, border: "1px solid var(--border-strong)", color: "var(--text-soft)" }}>
          {t.planCancel}
        </button>
        <button
          onClick={() => ready && onSave(form)}
          disabled={!ready}
          style={{
            ...addButton,
            border: "none",
            background: ready ? PLAN_COLOR : "var(--border-strong)",
            color: "white",
            cursor: ready ? "pointer" : "default",
          }}
        >
          {initial.id ? t.planSave : t.planCustomAddToPlan}
        </button>
      </div>
    </div>
  );
}
