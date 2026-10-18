import { describe, it, expect } from "vitest";
import { easterSunday, adventSunday, seasonOf, mysteriesOfDay, marianAntiphon } from "./liturgy";

const d = (y: number, m: number, day: number) => new Date(y, m - 1, day, 12);
const iso = (n: number) => new Date(n * 86_400_000).toISOString().slice(0, 10);

describe("calendar anchors", () => {
  it("computes Easter Sunday", () => {
    expect(iso(easterSunday(2024))).toBe("2024-03-31");
    expect(iso(easterSunday(2025))).toBe("2025-04-20");
    expect(iso(easterSunday(2026))).toBe("2026-04-05");
    expect(iso(easterSunday(2027))).toBe("2027-03-28");
    expect(iso(easterSunday(2038))).toBe("2038-04-25");
  });

  it("computes the First Sunday of Advent", () => {
    expect(iso(adventSunday(2025))).toBe("2025-11-30");
    expect(iso(adventSunday(2026))).toBe("2026-11-29");
    // Christmas on a Sunday: Advent IV is 18 December, Advent I 27 November.
    expect(iso(adventSunday(2022))).toBe("2022-11-27");
  });
});

describe("seasonOf", () => {
  it("places days in their seasons", () => {
    expect(seasonOf(d(2026, 12, 6))).toBe("advent");
    expect(seasonOf(d(2026, 12, 25))).toBe("christmas");
    expect(seasonOf(d(2027, 1, 5))).toBe("christmas");
    expect(seasonOf(d(2026, 2, 18))).toBe("lent"); // Ash Wednesday 2026
    expect(seasonOf(d(2026, 2, 17))).toBe("ordinary");
    expect(seasonOf(d(2026, 4, 4))).toBe("lent"); // Holy Saturday
    expect(seasonOf(d(2026, 4, 5))).toBe("easter");
    expect(seasonOf(d(2026, 5, 24))).toBe("easter"); // Pentecost
    expect(seasonOf(d(2026, 5, 25))).toBe("ordinary");
    expect(seasonOf(d(2026, 10, 18))).toBe("ordinary");
  });
});

describe("mysteriesOfDay", () => {
  it("follows the weekday", () => {
    expect(mysteriesOfDay(d(2026, 10, 19))).toBe("radostny"); // Monday
    expect(mysteriesOfDay(d(2026, 10, 20))).toBe("bolestny"); // Tuesday
    expect(mysteriesOfDay(d(2026, 10, 21))).toBe("slavny"); // Wednesday
    expect(mysteriesOfDay(d(2026, 10, 22))).toBe("radostny"); // Thursday
    expect(mysteriesOfDay(d(2026, 10, 23))).toBe("bolestny"); // Friday
    expect(mysteriesOfDay(d(2026, 10, 24))).toBe("slavny"); // Saturday
  });

  it("follows the season on Sunday", () => {
    expect(mysteriesOfDay(d(2026, 10, 18))).toBe("slavny"); // ordinary time
    expect(mysteriesOfDay(d(2026, 12, 6))).toBe("radostny"); // Advent
    expect(mysteriesOfDay(d(2027, 1, 3))).toBe("radostny"); // Christmastide
    expect(mysteriesOfDay(d(2026, 3, 1))).toBe("bolestny"); // Lent
    expect(mysteriesOfDay(d(2026, 4, 12))).toBe("slavny"); // Eastertide
  });
});

describe("marianAntiphon", () => {
  it("follows the antiphons' own seasons", () => {
    expect(marianAntiphon(d(2026, 11, 28))).toBe("salve_regina");
    expect(marianAntiphon(d(2026, 11, 29))).toBe("alma_redemptoris"); // Advent I
    expect(marianAntiphon(d(2027, 2, 1))).toBe("alma_redemptoris");
    expect(marianAntiphon(d(2027, 2, 2))).toBe("ave_regina_caelorum"); // Purification
    expect(marianAntiphon(d(2026, 4, 4))).toBe("ave_regina_caelorum"); // Holy Saturday
    expect(marianAntiphon(d(2026, 4, 5))).toBe("regina_caeli"); // Easter
    expect(marianAntiphon(d(2026, 5, 30))).toBe("regina_caeli"); // Saturday after Pentecost
    expect(marianAntiphon(d(2026, 5, 31))).toBe("salve_regina"); // Trinity Sunday
  });
});
