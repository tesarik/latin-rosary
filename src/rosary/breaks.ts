// Break points for the Latin with its translation under it (PrayerLanguage
// "both"). A prayer written as one paragraph may carry `{/}` at the points
// where its Latin and each translation can be paired phrase by phrase — the
// same number in every language (prayers.test.ts checks it). Shown alone, a
// text loses them (`stripBreaks`: the marker sits right before a word, after
// its space, so removing it restores the text exactly); shown under each
// other, the Latin and the translation are cut at them (`segments`).
export const BREAK = "{/}";

export const stripBreaks = (text: string): string => text.split(BREAK).join("");

// A text's pairable pieces: its lines, and each line cut at its break points.
// A blank line stays a blank piece (a paragraph's gap).
export const segments = (text: string): string[] =>
  text.split("\n").flatMap((line) => line.includes(BREAK) ? line.split(BREAK).map((s) => s.trim()) : [line]);
