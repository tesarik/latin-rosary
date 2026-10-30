import { describe, it, expect } from "vitest";
import { chapletKey, chapletToOpen } from "./chaplet";

describe("chapletToOpen", () => {
  it("follows the switch when no chaplet has a kept place", () => {
    expect(chapletToOpen(false, [])).toBe("misericordia");
    expect(chapletToOpen(true, ["radostny"])).toBe("misericordia-plena");
    expect(chapletKey(true)).toBe("misericordia-plena");
  });

  it("resumes a kept place in the other form, whatever the switch says", () => {
    expect(chapletToOpen(true, ["misericordia"])).toBe("misericordia");
    expect(chapletToOpen(false, ["misericordia-plena", "slavny"])).toBe("misericordia-plena");
  });

  it("of two kept places, opens the more recent (later) one", () => {
    expect(chapletToOpen(false, ["misericordia", "misericordia-plena"])).toBe("misericordia-plena");
    expect(chapletToOpen(true, ["misericordia-plena", "misericordia"])).toBe("misericordia");
  });
});
