import { useEffect, useRef } from "react";
import { STRINGS, type Locale } from "./i18n";
import { SERIF } from "./fonts";
import { currentLook } from "./look";
import { MissalArt } from "./MissalArt";

// What the help explains, one short paragraph per topic, in every UI locale
// (the Record makes a missing locale a compile error). Keep it in step with
// the app: a new control or screen gets a line here.
const HELP: Record<Locale, { title: string; text: string }[]> = {
  cs: [
    { title: "Modlitba krok za krokem", text: "Další modlitbu otevřete ťuknutím na text nebo na Další, přejetím prstem doleva jdete dál, doprava zpět. Na počítači fungují šipky, mezerník a Enter. Tlačítko Další ukazuje, co přijde." },
    { title: "Korálky", text: "U růžence a korunky ťuknutím na korálek Otčenáše skočíte na začátek desátku. U litanií, pobožností a mše ťuknutím na větší korálek skočíte na danou část." },
    { title: "Latina a překlad", text: "Tlačítko La | Cz v hlavičce přepne text modlitby mezi latinou a češtinou. Aplikace si volbu pamatuje." },
    { title: "Nedokončené modlitby", text: "Šipkou ← se vrátíte do nabídky a aplikace si místo zapamatuje. Modlitba se pak nabídne nahoře jako nedokončená; křížkem × ji odtud odeberete. Tlačítko ↺ začne znovu od začátku." },
    { title: "Záložky dole", text: "Růženec: tajemství, dnešní jako první, a korunka k Božímu milosrdenství. Modlitby: hledání a skupiny modliteb; karta V tuto dobu ukazuje, co se hodí k dnešnímu dni. Moje: oblíbené modlitby a vlastní plány." },
    { title: "Oblíbené", text: "Hvězdičkou ☆ v hlavičce modlitby ji přidáte do Oblíbených v záložce Moje. Dalším ťuknutím ji odeberete." },
    { title: "Modlitební plány", text: "Sestavte si vlastní pořadí modliteb, klidně i s vlastními texty, a modlete se je jako jednu sadu. Plán můžete poslat odkazem a všechny plány zálohovat do souboru." },
    { title: "Nastavení ⋯", text: "V hlavičce modlitby: velikost písma, tmavý režim, ztlumení obrazovky do kostela a vibrace při každém kroku." },
    { title: "Na ploše a bez internetu", text: "Aplikaci si můžete přidat na plochu: v Safari Sdílet → Přidat na plochu, v Chromu nabídka → Nainstalovat aplikaci. Po prvním otevření funguje i bez připojení. Vše, co si uložíte, zůstává jen v tomto zařízení." },
  ],
  en: [
    { title: "Praying step by step", text: "Tap the prayer or Next for the next one; swipe left to go on and right to go back. On a computer, use the arrow keys, Space or Enter. The Next button shows what comes next." },
    { title: "The beads", text: "In the rosary and the chaplet, tap an Our Father bead to jump to the start of its decade. In litanies, devotions and the Mass, tap a larger bead to jump to that part." },
    { title: "Latin and translation", text: "The La | En button in the header switches the prayer between Latin and English. The app remembers your choice." },
    { title: "Unfinished prayers", text: "The ← arrow takes you back to the menu and keeps your place; the prayer is then offered at the top as unfinished, and its × removes it. The ↺ button starts again from the beginning." },
    { title: "The tabs at the bottom", text: "Rosary: the mysteries, today's first, and the Chaplet of Divine Mercy. Prayers: the search and the groups of prayers; the In season card shows what suits the day. Mine: your favourites and your own plans." },
    { title: "Favourites", text: "The star ☆ in a prayer's header adds it to your Favourites under Mine. Tap it again to remove it." },
    { title: "Prayer plans", text: "Put prayers together in your own order, with texts of your own if you like, and pray them as one set. You can send a plan as a link and back up all your plans to a file." },
    { title: "Settings ⋯", text: "In a prayer's header: text size, dark mode, a dimmed screen for church and the vibration on each step." },
    { title: "On the home screen, offline", text: "Add the app to your home screen: in Safari, Share → Add to Home Screen; in Chrome, the menu → Install app. Once opened, it works without a connection. Everything you save stays on this device only." },
  ],
};

type Props = { locale: Locale; onClose: () => void };

// Modal help panel opened from the start screen, beside About: how to move
// through a prayer and where everything is. Backdrop click or Escape closes
// it; it scrolls within itself on a small screen.
export default function HelpDialog({ locale, onClose }: Props) {
  const t = STRINGS[locale];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus into the dialog on open, Tab kept within it, focus back on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.helpTitle}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 440,
          maxHeight: "86dvh",
          display: "flex",
          flexDirection: "column",
          // The rounded box clips; the text scrolls in the box inside it, so
          // the scrollbar never squares off the corners.
          overflow: "hidden",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={t.aboutClose}
          style={{
            position: "absolute", top: 8, right: 10, zIndex: 1,
            width: 36, height: 36, border: "none", background: "transparent",
            color: "var(--text-muted)", fontSize: 22, lineHeight: 1, cursor: "pointer",
          }}
        >
          ×
        </button>
        <div style={{ overflowY: "auto", padding: "22px 22px 18px", scrollbarWidth: "thin" }}>
          <h2 style={{ fontFamily: SERIF, fontSize: 28, fontWeight: 600, color: "var(--text-strong)", margin: "0 0 12px" }}>{t.helpTitle}</h2>
          {currentLook() === "missal" && <MissalArt name="euntes" style={{ margin: "0 0 14px" }} />}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {HELP[locale].map((item) => (
              <section key={item.title}>
                <h3 style={{ fontFamily: SERIF, fontSize: 19, fontWeight: 600, color: "var(--text-strong)", margin: "0 0 2px" }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.45, color: "var(--text)", margin: 0 }}>{item.text}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
