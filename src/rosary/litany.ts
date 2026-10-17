// Pure litany layout logic, kept apart from PrayerCard so it can be unit-tested
// without a DOM. `parseLitany` turns a litany's text into display blocks; the
// card only renders them.

// Litanies read like a printed litany book rather than a centered prayer card:
// left-aligned, one invocation per line, with the repeated response (the part
// after the final comma — "ora pro nobis", "miserére nobis", "oroduj za nás"…)
// set in italic. Versicle/response lines (℣/℟), the Orémus/Modleme se collect,
// blank spacers and red rubric labels keep their normal styling.
// The congregation's response, italicized in the litany layout. Matching a known
// response phrase beats splitting at the last comma: responses that carry a comma
// of their own ("líbera nos, Iesu", "parce nobis, Dómine") would otherwise be cut
// mid-phrase, leaving only the address in italics.
export const LITANY_RESPONSES = [
  "miserére nobis", "ora pro nobis", "parce nobis", "exáudi nos", "líbera nos",
  "smiluj se nad námi", "oroduj za nás", "odpusť nám", "vyslyš nás", "vysvoboď nás",
  // Litany of Humility — first person, and its third section answers with a full
  // clause rather than a short response.
  "líbera me", "exáudi me", "Iesu, da mihi grátiam ita desiderándi",
  "osvoboď mě", "vyslyš mě", "Ježíši, dej mi milost po tom toužit",
  // Precious Blood
  "salva nos", "buď naší spásou",
  // Litany of the Saints — plural saints take "oráte"/"intercédite", and its
  // intercessions answer with a two-part clause. The full phrases must be listed,
  // not just their tails, so the earliest-match rule picks the whole response.
  "oráte pro nobis", "intercédite pro nobis", "te rogámus, audi nos",
  "orodujte za nás", "přimlouvejte se za nás", "prosíme tě, vyslyš nás",
  // English. Bare "hear us" is deliberately NOT listed: it also occurs inside
  // petitions ("…vouchsafe to hear us, we beseech thee, hear us."), where the
  // earliest-match rule would cut the line at the wrong place. The two phrases
  // that actually end a line are listed in full instead.
  "have mercy on us", "pray for us", "spare us", "graciously hear us",
  "deliver us", "save us", "intercede for us", "we beseech thee, hear us",
  // Litany of Humility — first person, and a full clause for its third section.
  "deliver me", "hear me", "Jesus, grant me the grace to desire it",
];

// A response has to END the line — bar a short vocative address (", Dómine.",
// ", O Jesus.") — or a collect that happens to contain the words would be
// italicized from there to its full stop ("…and deliver us from the punishments
// which we deserve for them."). Anything with more text after it isn't a response.
const MAX_RESPONSE_TAIL = 12;

// Index where the response starts, or -1. Among the phrases that end the line,
// the LONGEST wins (ties broken by the earliest position), because a short
// response can sit inside a petition closing with a longer one: "That thou
// wouldst spare us, we beseech thee, hear us." splits at "we beseech thee".
export function responseStart(line: string): number {
  let at = -1;
  let best = 0;
  for (const r of LITANY_RESPONSES) {
    const i = line.indexOf(r);
    if (i <= 0) continue;
    if (line.length - (i + r.length) > MAX_RESPONSE_TAIL) continue;
    if (r.length > best || (r.length === best && i < at)) {
      at = i;
      best = r.length;
    }
  }
  return at;
}

// Acclamations the whole assembly repeats verbatim — the Kyrie, and the "audi nos"
// pair, which is "Christe" in Loreto / Sacred Heart but "Iesu" in the Holy Name
// litany. Matched on the full phrase, since every Holy Name invocation also opens
// with "Iesu," / "Ježíši," and those do take a response.
export const LITANY_ACCLAMATION =
  /^(Kyrie|Christe|Pane|Kriste), (eléison|smiluj se)\.|^(Christe|Iesu|Kriste|Ježíši), (ex)?(áudi|audi|slyš|uslyš|vyslyš) (nos|nás)\.|^(Lord|Christ), have mercy\.|^(Christ|Jesus), (graciously )?hear us\./;

// A known response, as the line carries it, minus closing punctuation — the
// key a run of lines is grouped by ("ora pro nobis.", "ora pro nobis" → same).
const responseKey = (response: string): string => response.replace(/[.!;:,\s]+$/, "");

export type LitanyBlock =
  | { kind: "blank" }
  // A line shown as is: the Kyrie, ℣/℟, the collect, a rubric label, prose.
  | { kind: "plain"; line: string }
  // One invocation with its own response, set in italics after it.
  | { kind: "single"; invocation: string; response: string }
  // Consecutive invocations sharing one response: the response is shown once,
  // above them, and the lines carry only the invocation, without the comma
  // that led into the response.
  | { kind: "run"; response: string; invocations: string[] };

const bare = (invocation: string): string => invocation.replace(/,$/, "");

const isStructural = (trimmed: string): boolean =>
  trimmed.startsWith("℣") ||
  trimmed.startsWith("℟") ||
  trimmed.startsWith("Orémus") ||
  trimmed.startsWith("Modleme se") ||
  trimmed.startsWith("Let us pray") ||
  trimmed.includes("{r}") ||
  LITANY_ACCLAMATION.test(trimmed);

// Split a litany (or one section of it) into display blocks. Two or more
// consecutive invocations with the same response become a `run`; a lone one
// keeps its response inline, so a response is never shown above a single line.
export function parseLitany(text: string): LitanyBlock[] {
  const blocks: LitanyBlock[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "") { blocks.push({ kind: "blank" }); continue; }
    const at = isStructural(trimmed) ? -1 : responseStart(line);
    if (at === -1) { blocks.push({ kind: "plain", line }); continue; }
    const invocation = line.slice(0, at).trimEnd();
    const response = line.slice(at).trim();
    const prev = blocks[blocks.length - 1];
    if (prev?.kind === "run" && responseKey(prev.response) === responseKey(response)) {
      prev.invocations.push(bare(invocation));
    } else if (prev?.kind === "single" && responseKey(prev.response) === responseKey(response)) {
      blocks[blocks.length - 1] = { kind: "run", response: responseKey(response), invocations: [bare(prev.invocation), bare(invocation)] };
    } else {
      blocks.push({ kind: "single", invocation, response });
    }
  }
  return blocks;
}
