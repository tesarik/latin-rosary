import { describe, it, expect, afterEach, vi } from "vitest";
import { detectLocale } from "./i18n";

const browser = (...languages: string[]) =>
  vi.stubGlobal("navigator", { languages, language: languages[0] });

describe("detectLocale", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("picks a supported locale from the browser, region ignored", () => {
    browser("cs-CZ");
    expect(detectLocale()).toBe("cs");
    browser("en-US");
    expect(detectLocale()).toBe("en");
  });

  it("serves Slovak readers Czech", () => {
    browser("sk-SK");
    expect(detectLocale()).toBe("cs");
  });

  it("takes the first preferred language it can serve", () => {
    browser("de-DE", "cs", "en");
    expect(detectLocale()).toBe("cs");
    browser("pl", "en-GB", "cs");
    expect(detectLocale()).toBe("en");
  });

  it("falls back to English for any other language", () => {
    browser("de-DE", "fr");
    expect(detectLocale()).toBe("en");
    browser();
    expect(detectLocale()).toBe("en");
  });

  it("ignores prototype names", () => {
    browser("constructor");
    expect(detectLocale()).toBe("en");
  });
});
