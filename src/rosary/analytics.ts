// Privacy-first usage analytics via GoatCounter — cookieless, no personal data,
// no consent banner. It loads ONLY in production, ONLY when a site code is set,
// and NEVER when the visitor has Do-Not-Track enabled. Provider-agnostic call
// site (`track`), so swapping tools later means changing only this file.

// ─── Set this to your GoatCounter site code ────────────────────────────────
// Register a site at goatcounter.com; the code is the subdomain it gives you —
// e.g. "latinsky-ruzenec" for https://latinsky-ruzenec.goatcounter.com.
// Leave "" to keep analytics fully disabled (no script, no requests).
const GOATCOUNTER_CODE: string = "latin-rosary";
// ────────────────────────────────────────────────────────────────────────────

type GoatCounter = {
  endpoint?: string;
  count?: (vars: { path: string; title?: string; event?: boolean }) => void;
};
declare global {
  interface Window { goatcounter?: GoatCounter }
}

// True once a code is set — used to decide whether to show the privacy note.
export const analyticsConfigured = GOATCOUNTER_CODE !== "";

function doNotTrack(): boolean {
  const dnt = navigator.doNotTrack ?? (window as unknown as { doNotTrack?: string }).doNotTrack;
  return dnt === "1" || dnt === "yes";
}

const enabled = (): boolean => import.meta.env.PROD && analyticsConfigured && !doNotTrack();

// Inject the GoatCounter beacon (auto-counts the initial pageview). Idempotent.
export function initAnalytics(): void {
  if (!enabled() || window.goatcounter) return;
  window.goatcounter = { endpoint: `https://${GOATCOUNTER_CODE}.goatcounter.com/count` };
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  document.head.appendChild(s);
}

// Record a usage event (e.g. a prayer set being opened). No-ops until the
// beacon has loaded, and whenever analytics is disabled.
export function track(path: string): void {
  if (!enabled()) return;
  window.goatcounter?.count?.({ path, title: path, event: true });
}
