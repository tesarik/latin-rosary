import { describe, expect, it } from "vitest";
import { MAX_FAVORITES, sanitizeFavorites, toggleFavorite } from "./favorites";
import { MENU_GROUPS, groupKeys } from "./menu";

describe("sanitizeFavorites", () => {
  it("keeps menu keys in order, once each", () => {
    expect(sanitizeFavorites(["memorare", "loreto", "memorare", "ioseph"])).toEqual(["memorare", "loreto", "ioseph"]);
  });

  it("drops what the menu doesn't list: mystery sets, the chaplet, plans, prototype names, non-strings", () => {
    expect(sanitizeFavorites(["radostny", "misericordia", "plan:abc", "toString", "__proto__", 3, null, "angelus"]))
      .toEqual(["angelus"]);
  });

  it("rejects anything but an array", () => {
    expect(sanitizeFavorites({ 0: "memorare" })).toEqual([]);
    expect(sanitizeFavorites("memorare")).toEqual([]);
    expect(sanitizeFavorites(null)).toEqual([]);
  });

  it("accepts every key the menu lists, and caps the list", () => {
    const all = MENU_GROUPS.flatMap(groupKeys);
    expect(sanitizeFavorites(all)).toEqual(all);
    expect(all.length).toBeLessThan(MAX_FAVORITES);
  });
});

describe("toggleFavorite", () => {
  it("adds at the end and removes in place", () => {
    expect(toggleFavorite(["memorare"], "loreto")).toEqual(["memorare", "loreto"]);
    expect(toggleFavorite(["memorare", "loreto", "ioseph"], "loreto")).toEqual(["memorare", "ioseph"]);
  });
});
