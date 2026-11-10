// Small on/off preferences of the prayer screen, each under its own key like
// the theme or text size: not versioned, kept across resets.
//   ruzenec_vibrate  — the haptic tick on every step (on by default; off for a
//                      quiet church, where a buzz can be heard)
//   ruzenec_dim      — a dark veil over the prayer screen, dimmer than the
//                      dark theme alone (off by default)
//   ruzenec_hint_seen — the first-run "tap or swipe" hint was shown and closed
//   ruzenec_welcome_seen — the start screen's welcome card was closed, or a
//                      prayer was opened (someone who has prayed before —
//                      the hint seen — never gets it)
const VIBRATE_KEY = "ruzenec_vibrate";
const DIM_KEY = "ruzenec_dim";
const HINT_KEY = "ruzenec_hint_seen";
const WELCOME_KEY = "ruzenec_welcome_seen";

function loadFlag(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === "1" ? true : v === "0" ? false : fallback;
  } catch {
    return fallback;
  }
}

function saveFlag(key: string, on: boolean): void {
  try {
    localStorage.setItem(key, on ? "1" : "0");
  } catch {}
}

export const loadVibrate = (): boolean => loadFlag(VIBRATE_KEY, true);
export const saveVibrate = (on: boolean): void => saveFlag(VIBRATE_KEY, on);
export const loadDim = (): boolean => loadFlag(DIM_KEY, false);
export const saveDim = (on: boolean): void => saveFlag(DIM_KEY, on);
export const loadHintSeen = (): boolean => loadFlag(HINT_KEY, false);
export const saveHintSeen = (): void => saveFlag(HINT_KEY, true);
export const loadWelcomeSeen = (): boolean => loadFlag(WELCOME_KEY, false) || loadHintSeen();
export const saveWelcomeSeen = (): void => saveFlag(WELCOME_KEY, true);
