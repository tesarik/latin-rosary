import { describe, it, expect } from "vitest";
import { PRAYER_NOTES, noteFor } from "./notes";
import { isBuiltInKey } from "./navigation";

describe("PRAYER_NOTES", () => {
  it("names only built-in prayer sets, each with a note in some language", () => {
    for (const [key, note] of Object.entries(PRAYER_NOTES)) {
      expect(isBuiltInKey(key), key).toBe(true);
      expect(Object.values(note).some((t) => !!t), key).toBe(true);
    }
  });

  it("gives nothing for the rosary, and a form its set's note", () => {
    expect(noteFor("radostny", "cs")).toBeUndefined();
    expect(noteFor("toString", "cs")).toBeUndefined();
    expect(noteFor("brigit-brevis", "en")).toBe(noteFor("brigit", "en"));
  });
});
