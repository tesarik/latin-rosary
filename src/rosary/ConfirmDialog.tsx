import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// In-app replacement for window.confirm / alert / prompt: a small themed
// modal instead of the browser's own box, which looks foreign on a phone and
// can be suppressed in an installed app. Imperative on purpose —
// `askConfirm(...)` returns a promise and mounts its own root, so it works
// from event handlers and effects alike, with no provider to thread through.

export type ConfirmOptions = {
  message: string;
  // Extra text shown selectable under the message (e.g. a link to copy).
  detail?: string;
  confirmLabel: string;
  // Null for an alert: a single button that resolves to true.
  cancelLabel: string | null;
  // Fill of the confirm button: the set's accent, or the rubric red for a
  // destructive action.
  color: string;
};

export function askConfirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const restoreFocus = document.activeElement as HTMLElement | null;
    const close = (answer: boolean) => {
      root.unmount();
      host.remove();
      restoreFocus?.focus?.();
      resolve(answer);
    };
    root.render(<ConfirmDialog {...options} onClose={close} />);
  });
}

// Mounted only by askConfirm, never rendered by the app tree, so fast refresh
// has nothing to preserve here.
// eslint-disable-next-line react-refresh/only-export-components
function ConfirmDialog({ message, detail, confirmLabel, cancelLabel, color, onClose }: ConfirmOptions & {
  onClose: (answer: boolean) => void;
}) {
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    confirmRef.current?.focus();
    // One capturing listener on window: Escape cancels, and every other key
    // (bar Tab, for moving between the two buttons) stops here, so the prayer
    // screen's own handler (Space/Enter = next) never sees keys meant for the
    // dialog. stopImmediatePropagation also covers events aimed at window
    // itself, where a capture listener alone would not keep later listeners
    // from firing. A focused button still gets its Enter/Space click: that is
    // the default action, which this does not prevent.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") return;
      e.stopImmediatePropagation();
      if (e.key === "Escape") onClose(cancelLabel === null);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose, cancelLabel]);

  const button = (filled: boolean): React.CSSProperties => ({
    flex: 1,
    minHeight: 44,
    padding: "10px 14px",
    borderRadius: 12,
    border: filled ? "none" : "1px solid var(--border-strong)",
    background: filled ? color : "var(--surface)",
    color: filled ? "white" : "var(--text-soft)",
    fontFamily: "Arial, sans-serif",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  });

  return (
    <div
      onClick={() => onClose(cancelLabel === null)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={message}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 360,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          padding: "20px 18px 16px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p style={{ margin: 0, color: "var(--text-strong)", fontSize: 16, lineHeight: 1.45 }}>{message}</p>
        {detail && (
          <p style={{
            margin: "10px 0 0",
            padding: "8px 10px",
            borderRadius: 8,
            background: "var(--surface-hover)",
            color: "var(--text-soft)",
            fontSize: 13,
            overflowWrap: "anywhere",
            userSelect: "all",
          }}>
            {detail}
          </p>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          {cancelLabel !== null && (
            <button onClick={() => onClose(false)} style={button(false)}>{cancelLabel}</button>
          )}
          <button ref={confirmRef} onClick={() => onClose(true)} style={button(true)}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
