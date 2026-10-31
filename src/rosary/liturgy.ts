// The liturgical calendar, as far as the start screen needs it: which
// mysteries are prayed today, and which Marian antiphon belongs to the
// season. Pure date arithmetic on local calendar days — no React, no
// browser — so it is unit-tested in liturgy.test.ts.

import type { MysteryKey } from "./prayers";

// A local calendar day as a sortable number, so date comparisons ignore the
// time of day and time zones.
const dayNumber = (d: Date): number => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86_400_000;
const day = (year: number, month: number, date: number): number => Date.UTC(year, month - 1, date) / 86_400_000;

// Easter Sunday (Gregorian), by the anonymous Gregorian algorithm
// (Meeus/Jones/Butcher).
export function easterSunday(year: number): number {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const date = ((h + l - 7 * m + 114) % 31) + 1;
  return day(year, month, date);
}

// The First Sunday of Advent: the fourth Sunday before Christmas.
export function adventSunday(year: number): number {
  const christmas = day(year, 12, 25);
  // Day 0 of the epoch (1 Jan 1970) was a Thursday; Sunday is offset 3.
  const weekday = (((christmas + 4) % 7) + 7) % 7; // 0 = Sunday
  return christmas - (weekday === 0 ? 7 : weekday) - 21;
}

// The Baptism of the Lord, which closes Christmastide: the Sunday after
// 6 January (or 7 January when the Epiphany Sunday falls there).
function baptismOfTheLord(year: number): number {
  const epiphany = day(year, 1, 6);
  const weekday = (((epiphany + 4) % 7) + 7) % 7;
  return epiphany + (7 - weekday);
}

export type Season = "advent" | "christmas" | "lent" | "easter" | "ordinary";

// The season a day falls in. Lent runs from Ash Wednesday to Holy Saturday;
// Eastertide from Easter Sunday to Pentecost.
export function seasonOf(date: Date): Season {
  const n = dayNumber(date);
  const year = date.getFullYear();
  const easter = easterSunday(year);
  if (n >= adventSunday(year) && n < day(year, 12, 25)) return "advent";
  if (n >= day(year, 12, 25) || n <= baptismOfTheLord(year)) return "christmas";
  if (n >= easter - 46 && n < easter) return "lent";
  if (n >= easter && n <= easter + 49) return "easter";
  return "ordinary";
}

// The mysteries traditionally prayed on a day: joyful on Monday and
// Thursday, sorrowful on Tuesday and Friday, glorious on Wednesday and
// Saturday. On Sunday they follow the season: joyful in Advent and
// Christmastide, sorrowful in Lent, glorious otherwise.
export function mysteriesOfDay(date: Date): MysteryKey {
  switch (date.getDay()) {
    case 1: case 4: return "radostny";
    case 2: case 5: return "bolestny";
    case 3: case 6: return "slavny";
    default: {
      const season = seasonOf(date);
      if (season === "advent" || season === "christmas") return "radostny";
      if (season === "lent") return "bolestny";
      return "slavny";
    }
  }
}

export type MarianAntiphon = "alma_redemptoris" | "ave_regina_caelorum" | "regina_caeli" | "salve_regina";

// The seasonal Marian antiphon, by the rubrics printed with each:
// Alma Redemptóris from the First Sunday of Advent until the Purification
// (2 February), Ave Regína Cælórum from the Purification until Easter (the
// rubric says "until Holy Week"; the Triduum has no antiphon of its own, so
// Ave Regína simply runs on until Easter here),
// Regína Cæli from Easter until the Saturday after Pentecost, and Salve
// Regína from Trinity Sunday until Advent.
export function marianAntiphon(date: Date): MarianAntiphon {
  const n = dayNumber(date);
  const year = date.getFullYear();
  const easter = easterSunday(year);
  if (n >= adventSunday(year) || n < day(year, 2, 2)) return "alma_redemptoris";
  if (n < easter) return "ave_regina_caelorum";
  if (n <= easter + 55) return "regina_caeli";
  return "salve_regina";
}

// November, the month the Church gives to the holy souls (All Souls on
// 2 November opens it): the start screen tags the prayers for the dead.
export const monthOfTheDead = (date: Date): boolean => date.getMonth() === 10;
