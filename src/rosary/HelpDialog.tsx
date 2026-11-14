import { useEffect, useRef } from "react";
import { STRINGS, type Locale } from "./i18n";
import { SERIF } from "./fonts";
import { currentLook } from "./look";
import { MissalArt } from "./MissalArt";

// What the help explains, one short paragraph per topic, in every UI locale
// (the Record makes a missing locale a compile error). Keep it in step with
// the app: a new control or screen gets a line here. `rules` (the Latin
// pronunciation) is a short table under the text: a rule, then an example.
type HelpItem = { title: string; text: string; rules?: readonly (readonly [string, string])[] };
const HELP: Record<Locale, HelpItem[]> = {
  cs: [
    { title: "Modlitba krok za krokem", text: "Další modlitbu otevřete ťuknutím na text nebo na Další, přejetím prstem doleva jdete dál, doprava zpět. Na počítači fungují šipky, mezerník a Enter. Tlačítko Další ukazuje, co přijde." },
    { title: "Korálky", text: "U růžence a korunky ťuknutím na korálek Otčenáše skočíte na začátek desátku. U litanií, pobožností a mše ťuknutím na větší korálek skočíte na danou část." },
    { title: "Latina a překlad", text: "Přepínač v hlavičce má tři polohy: La je jen latina, prostřední latina s českým překladem pod každým řádkem, Cz jen čeština. Aplikace si volbu pamatuje." },
    {
      title: "Výslovnost latiny",
      text: "Církev doporučuje římskou (italskou) výslovnost; v českých kostelích se dodnes setkáte i s tradiční českou. Čárka nad samohláskou značí přízvuk, ne délku: Dóminus se čte s důrazem na první slabice, krátce.",
      rules: [
        ["c před e, i, æ, œ = č", "cæli → čéli"],
        ["g před e, i, æ, œ = dž", "Génitrix → Dženitrix"],
        ["sc před e, i = š", "descéndit → dešéndit"],
        ["gn = ň", "Agnus → Aňus"],
        ["ti před samohláskou = ci", "grátia → grácia"],
        ["æ, œ = é", "pœna → péna"],
        ["ch = k, ph = f, th = t", "Christus → Kristus"],
        ["qu = kv", "qui → kvi"],
        ["h se nečte, v mihi a nihil = k", "mihi → miki"],
        ["i na začátku před samohláskou = j", "Iesus → Jezus"],
        ["s mezi samohláskami zní jako z", "rosa → roza"],
      ],
    },
    { title: "Nedokončené modlitby", text: "Šipkou ← se vrátíte do nabídky a aplikace si místo zapamatuje. Modlitba se pak nabídne nahoře jako nedokončená; křížkem × ji odtud odeberete. Tlačítko ↺ začne znovu od začátku." },
    { title: "Záložky dole", text: "Růženec: tajemství, dnešní jako první, celý růženec o patnácti desátcích a korunka k Božímu milosrdenství. Modlitby: hledání a skupiny modliteb; karta V tuto dobu ukazuje, co se hodí k dnešnímu dni. Moje: oblíbené modlitby, vlastní plány, vzhled a záloha." },
    { title: "Úmysl", text: "Na prvním kroku růžence, korunky nebo litanie můžete pod názvem modlitby zapsat úmysl, za koho nebo za co se modlíte. Zobrazuje se pak po celou modlitbu a zůstane i příště, dokud ho nezměníte; ťuknutím ho upravíte, smazáním textu odstraníte. Zůstává jen v tomto zařízení." },
    { title: "Oblíbené", text: "Hvězdičkou ☆ v hlavičce modlitby ji přidáte do Oblíbených v záložce Moje. Dalším ťuknutím ji odeberete." },
    { title: "Modlitební plány", text: "Sestavte si vlastní pořadí modliteb, klidně i s vlastními texty, a modlete se je jako jednu sadu. Plán můžete poslat odkazem." },
    { title: "Připomínka", text: "V záložce Moje si přidáte do kalendáře každodenní připomínku Anděla Páně, korunky nebo růžence v čase, který si zvolíte. Odkaz v události modlitbu rovnou otevře, u růžence s tajemstvím toho dne." },
    { title: "Nastavení ⋯", text: "V hlavičce modlitby: velikost písma, tmavý režim, ztlumení obrazovky do kostela, ovoce tajemství a verš z Písma u každého desátku růžence a vibrace při každém kroku." },
    { title: "Na ploše a bez internetu", text: "Aplikaci si můžete přidat na plochu: v Safari Sdílet → Přidat na plochu, v Chromu nabídka → Nainstalovat aplikaci. Po prvním otevření funguje i bez připojení. Vše, co si uložíte, zůstává jen v tomto zařízení; v záložce Moje si to můžete zálohovat do souboru a načíst třeba v novém telefonu." },
  ],
  en: [
    { title: "Praying step by step", text: "Tap the prayer or Next for the next one; swipe left to go on and right to go back. On a computer, use the arrow keys, Space or Enter. The Next button shows what comes next." },
    { title: "The beads", text: "In the rosary and the chaplet, tap an Our Father bead to jump to the start of its decade. In litanies, devotions and the Mass, tap a larger bead to jump to that part." },
    { title: "Latin and translation", text: "The switch in the header has three positions: La is the Latin alone, the middle one the Latin with the English under each line, En the English alone. The app remembers your choice." },
    {
      title: "Pronouncing the Latin",
      text: "The Church recommends the Roman (Italian) pronunciation. Vowels are pure, as in Italian: a as in father, e as in they, i as in machine, o as in for, u as in rule. An accent mark shows the stress, not length: Dóminus is stressed on its first syllable.",
      rules: [
        ["c before e, i, æ, œ = ch", "cæli → chay-lee"],
        ["g before e, i, æ, œ = j", "Génitrix → jay-nee-trix"],
        ["sc before e, i = sh", "descéndit → day-shen-dit"],
        ["gn = ny", "Agnus → ah-nyoos"],
        ["ti before a vowel = tsee", "grátia → grah-tsee-ah"],
        ["æ, œ = e as in they", "pœna → pay-nah"],
        ["ch = k, ph = f, th = t", "Christus → kree-stoos"],
        ["qu = kw", "qui → kwee"],
        ["h is silent; in mihi and nihil = k", "mihi → mee-kee"],
        ["i before a vowel at the start = y", "Iesus → yay-zoos"],
        ["s between vowels sounds like z", "rosa → roh-zah"],
      ],
    },
    { title: "Unfinished prayers", text: "The ← arrow takes you back to the menu and keeps your place; the prayer is then offered at the top as unfinished, and its × removes it. The ↺ button starts again from the beginning." },
    { title: "The tabs at the bottom", text: "Rosary: the mysteries, today's first, the full rosary of fifteen decades and the Chaplet of Divine Mercy. Prayers: the search and the groups of prayers; the In season card shows what suits the day. Mine: your favourites, your own plans, the look and the backup." },
    { title: "Intention", text: "On the first step of a rosary, chaplet or litany you can write an intention under the prayer's name: for whom or what you pray. It then shows throughout the prayer and stays for next time until you change it; tap it to edit, empty it to remove it. It stays on this device only." },
    { title: "Favourites", text: "The star ☆ in a prayer's header adds it to your Favourites under Mine. Tap it again to remove it." },
    { title: "Prayer plans", text: "Put prayers together in your own order, with texts of your own if you like, and pray them as one set. You can send a plan as a link." },
    { title: "Reminder", text: "Under Mine, add a daily reminder of the Angelus, the chaplet or the rosary to your calendar, at the hour you choose. The event's link opens the prayer, the rosary with the day's mysteries." },
    { title: "Settings ⋯", text: "In a prayer's header: text size, dark mode, a dimmed screen for church, the fruit of the mystery and a verse of Scripture at each decade of the rosary, and the vibration on each step." },
    { title: "On the home screen, offline", text: "Add the app to your home screen: in Safari, Share → Add to Home Screen; in Chrome, the menu → Install app. Once opened, it works without a connection. Everything you save stays on this device only; under Mine you can back it up to a file and load it on a new phone, say." },
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
                {item.rules && (
                  <dl style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", columnGap: 10, rowGap: 3, margin: "8px 0 0", fontSize: 13, lineHeight: 1.35 }}>
                    {item.rules.map(([rule, example]) => (
                      <div key={rule} style={{ display: "contents" }}>
                        <dt style={{ color: "var(--text)" }}>{rule}</dt>
                        <dd style={{ margin: 0, fontFamily: SERIF, fontSize: 15, fontStyle: "italic", color: "var(--text-soft)", whiteSpace: "nowrap" }}>{example}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
