import { useRef } from "react";
import { STRINGS, type Locale } from "./i18n";
import { CARD } from "./fonts";
import { ink } from "./look";
import { PLAN_COLOR, requestPersistentStorage } from "./plans";
import { askConfirm } from "./ConfirmDialog";
import { applyBackup, exportBackup, parseBackup, summarizeBackup } from "./backup";

// The Mine tab's backup card: everything the app keeps in this browser —
// plans, favourites, kept places, settings — to a JSON file, and back. Loading
// adds and never deletes (backup.ts), then reloads the page so every screen
// reads the merged data.
export default function BackupCard({ locale }: { locale: Locale }) {
  const t = STRINGS[locale];
  const fileInput = useRef<HTMLInputElement | null>(null);
  const color = ink(PLAN_COLOR);

  const save = () => {
    const blob = new Blob([exportBackup()], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `${t.backupFileName}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    requestPersistentStorage();
  };

  const load = async (file: File) => {
    const backup = parseBackup(await file.text());
    if (!backup) {
      await askConfirm({ message: t.backupInvalid, confirmLabel: t.dialogOk, cancelLabel: null, color });
      return;
    }
    const summary = summarizeBackup(backup);
    if (!summary.plans && !summary.favorites && !summary.places && !summary.prefs) {
      await askConfirm({ message: t.backupNothing, confirmLabel: t.dialogOk, cancelLabel: null, color });
      return;
    }
    if (!(await askConfirm({ message: t.backupConfirm, detail: t.backupContents(summary), confirmLabel: t.backupLoad, cancelLabel: t.planCancel, color }))) return;
    applyBackup(backup);
    requestPersistentStorage();
    location.reload();
  };

  const button: React.CSSProperties = {
    flex: 1,
    minHeight: 40,
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid var(--border-strong)",
    background: "var(--surface)",
    color,
    fontFamily: "Arial, sans-serif",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  };

  return (
    <div style={{ ...CARD, padding: "12px var(--card-px) 14px" }}>
      <p style={{ margin: "0 0 10px", color: "var(--text-soft)", fontFamily: "Arial, sans-serif", fontSize: 13, lineHeight: 1.5 }}>
        {t.backupHint}
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={save} style={button}>{t.backupExport}</button>
        <button onClick={() => fileInput.current?.click()} style={button}>{t.backupImport}</button>
      </div>
      <input
        ref={fileInput}
        type="file"
        accept="application/json,.json"
        aria-label={t.backupImport}
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) void load(file);
        }}
      />
    </div>
  );
}
