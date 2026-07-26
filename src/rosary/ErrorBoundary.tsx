import { Component, type ReactNode } from "react";
import { STRINGS, loadSavedLocale, detectLocale } from "./i18n";
import { saveState } from "./storage";

type Props = { children: ReactNode };
type State = { error: Error | null };

// The whole app is a single component tree, so an uncaught render error would
// blank the screen mid-prayer. This boundary catches it and offers recovery —
// a plain reload, or clearing possibly-corrupt saved progress before reloading
// (the most likely trigger, given the versioned localStorage schema).
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    // Log for local diagnostics only. Analytics is deliberately PII-free, so we
    // never ship error details off-device.
    console.error("Rosary crashed:", error);
  }

  private reload = () => window.location.reload();

  private resetAndReload = () => {
    saveState(null, 0); // clears the ruzenec_state key via the storage module
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    // No React context is available here, so read the persisted locale directly.
    const t = STRINGS[loadSavedLocale() ?? detectLocale()];

    const buttonBase = {
      padding: "12px 20px",
      borderRadius: 12,
      fontSize: 15,
      fontWeight: 600,
      fontFamily: "Arial, sans-serif",
      cursor: "pointer",
    } as const;

    return (
      <div
        role="alert"
        style={{
          minHeight: "100dvh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 360,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            padding: "28px 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            textAlign: "center",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 48 48" aria-hidden="true" style={{ display: "block", margin: "0 auto 14px" }}>
            <line x1="24" y1="6" x2="24" y2="42" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--text-muted)" }} />
            <line x1="12" y1="18" x2="36" y2="18" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" style={{ stroke: "var(--text-muted)" }} />
          </svg>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-strong)" }}>{t.errorTitle}</div>
          <div style={{ fontSize: 14, color: "var(--text)", margin: "10px 0 20px", lineHeight: 1.4 }}>{t.errorMessage}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button onClick={this.reload} style={{ ...buttonBase, border: "none", background: "#1565C0", color: "white" }}>
              {t.errorReload}
            </button>
            <button
              onClick={this.resetAndReload}
              style={{ ...buttonBase, border: "1px solid var(--border-strong)", background: "var(--surface)", color: "var(--text-soft)" }}
            >
              {t.errorReset}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
