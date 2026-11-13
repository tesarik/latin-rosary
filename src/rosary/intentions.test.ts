import { describe, it, expect } from "vitest";
import { MAX_INTENTION, sanitizeIntentions, withIntention } from "./intentions";

describe("intentions", () => {
  it("keeps text entries, trimmed and capped, and nothing else", () => {
    expect(sanitizeIntentions({ radostny: "  za rodinu ", loreto: "", slavny: 5, toString: "x", "": "y" }))
      .toEqual({ radostny: "za rodinu" });
    expect(sanitizeIntentions({ radostny: "a".repeat(MAX_INTENTION + 10) }).radostny).toHaveLength(MAX_INTENTION);
    expect(sanitizeIntentions(null)).toEqual({});
    expect(sanitizeIntentions(["za rodinu"])).toEqual({});
  });

  it("sets an intention, and clears it with an empty text", () => {
    const one = withIntention({}, "radostny", " za rodinu ");
    expect(one).toEqual({ radostny: "za rodinu" });
    expect(withIntention(one, "radostny", "   ")).toEqual({});
  });
});
