import type { PrayerSetKind } from "./navigation";

// Small on/off preferences of the prayer screen, each under its own key like
// the theme or text size: not versioned, kept across resets.
//   ruzenec_vibrate  — the haptic tick on every step (on by default; off for a
//                      quiet church, where a buzz can be heard)
//   ruzenec_dim      — a dark veil over the prayer screen, dimmer than the
//                      dark theme alone (off by default)
//   ruzenec_hint_seen — the first-run "tap or swipe" hint was shown and closed
//   ruzenec_hint_jump_seen — the later hint on jumping by a larger bead
//   ruzenec_hint_keep_seen — the later hint that ← keeps the place
//   ruzenec_welcome_seen — the start screen's welcome card was closed, or a
//                      prayer was opened (someone who has prayed before —
//                      the hint seen — never gets it)
const VIBRATE_KEY = "ruzenec_vibrate";
const DIM_KEY = "ruzenec_dim";
const HINT_KEY = "ruzenec_hint_seen";
const WELCOME_KEY = "ruzenec_welcome_seen";
const JUMP_HINT_KEY = "ruzenec_hint_jump_seen";
const KEEP_HINT_KEY = "ruzenec_hint_keep_seen";

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

// The prayer screen's one-time hints, one at a time, in this order: how to
// step (from the first step), how to jump by a larger bead (where there are
// beads to tap, once a few steps have been taken) and that ← keeps the place
// (in a set that keeps one, further on). Each is closed by its Rozumím or by
// doing what it explains.
export type Hint = "step" | "jump" | "keep";
export type HintsSeen = Record<Hint, boolean>;
export const HINT_JUMP_FROM = 3;
export const HINT_KEEP_FROM = 8;

const HINT_KEYS: Record<Hint, string> = { step: HINT_KEY, jump: JUMP_HINT_KEY, keep: KEEP_HINT_KEY };

export const loadHintsSeen = (): HintsSeen => ({
  step: loadHintSeen(),
  jump: loadFlag(JUMP_HINT_KEY, false),
  keep: loadFlag(KEEP_HINT_KEY, false),
});
export const saveHintDone = (hint: Hint): void => saveFlag(HINT_KEYS[hint], true);

export function hintToShow(
  seen: HintsSeen,
  set: { kind: PrayerSetKind; persistable: boolean; step: number; length: number },
): Hint | null {
  if (!seen.step) return "step";
  const last = set.step >= set.length - 1;
  if (!seen.jump && set.kind !== "single" && set.step >= HINT_JUMP_FROM && !last) return "jump";
  if (seen.jump && !seen.keep && set.persistable && set.step >= HINT_KEEP_FROM && !last) return "keep";
  return null;
}
