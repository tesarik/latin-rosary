# App-store reviews of rosary and Catholic prayer apps: what users praise, criticize and ask for

## Method and corpus (read this first)

Apple and Google Play review pages could not be fetched directly: Apple returned HTTP 429, justuseapp returned 403, and Play pages came back without reviews. So the corpus is **Apple's public customer-review RSS feed** (US store, sorted most recent, up to 500 reviews per app), pulled for 19 apps on 2026-11-13. That gave 5,201 unique reviews, **2,912 of them dated 2023-01-01 to 2026-11-12**, and only those 2,912 are counted below. App IDs come from the iTunes Search API.

Feed URL pattern: `https://itunes.apple.com/us/rss/customerreviews/page=N/id=<ID>/sortby=mostrecent/json`. Listing pattern: `https://apps.apple.com/us/app/id<ID>`.

| App (ID) | Total ratings (iTunes API, Nov 2026) | Avg | Reviews 2023+ in corpus | Date span |
|---|---|---|---|---|
| Hallow (1405323394) | 383,190 | 4.89 | 500 | 2026-03 to 2026-11 only |
| Amen (1573298413) | 45,347 | 4.92 | 500 | 2024-02 to 2026-10 |
| Oremus (6569225353) | 14,781 | 4.91 | 500 | 2025-12 to 2026-11 |
| Relevant Radio Catholic Rosary (597930318) | 57,296 | 4.91 | 339 | 2023 to 2026 |
| iRosary (1579750518) | 9,903 | 4.90 | 267 | 2023 to 2026 |
| Sanctifica (6446094171) | 2,761 | 4.91 | 197 | 2023-12 to 2026 |
| Laudate (499428207) | 3,802 | 3.98 | 185 | 2023 to 2026 |
| Daily Holy Rosary Prayer App (1085163534) | 12,535 | 4.83 | 89 | 2023 to 2026 |
| Catholic Prayers: Official (1131116859) | 24,963 | 4.87 | 76 | 2023 to 2026 |
| Holy Rosary – Standard Edition (980806882) | 1,818 | 4.82 | 49 | 2023 to 2026 |
| Rosario – Pray the Rosary (1619096568) | 950 | 4.91 | 46 | 2024 to 2026 |
| Divine Mercy (410696366) | 400 | 4.23 | 41 | 2023 to 2026 |
| Scriptural Rosary (416544127) | 373 | 4.62 | 37 | 2023 to 2026 |
| Interactive Rosary with audio (1499112817) | 4,110 | 4.85 | 33 | 2023 to 2026 |
| The Catholic Rosary (1388444058) | 162 | 3.52 | 17 | 2023 to 2026 |
| Chaplet of Divine Mercy Audio (1299502202) | 848 | 4.88 | 16 | 2023 to 2026 |
| Pocket Rosary (808485912) | 157 | 4.87 | 9 | 2024 to 2026 |
| Click To Pray (934935942) | 138 | 3.67 | 6 | 2023 to 2025 |
| My Rosary (Audio) (1485494438) | 188 | 4.46 | 5 | 2023 to 2025 |

**How the frequencies were counted:** keyword-regex matches over title and body, given as a share of the 2,912 reviews. They are rough, not a validated classification, and they skew to the apps with 500 reviews (Hallow, Amen, Oremus). Every quote below is under 15 words and comes from the feed of the app named. "Latin rosary" App Store searches found only tiny apps (Mediatrix: Rosary in Latin, 2 ratings; Latin Prayer Trainer, 1 rating), so none could be sampled.

| Theme (keyword match) | Reviews | Share | Of these ≤3★ | Apps where it comes up most |
|---|---|---|---|---|
| Audio / voice / listening | 474 | 16.3% | 77 | Relevant Radio, Amen, Hallow, iRosary |
| Meditations / scripture / reflections | 310 | 10.6% | 20 | Amen, Hallow, Laudate, Oremus |
| Images / art / pictures | 241 | 8.3% | 23 | Amen, Hallow, iRosary, Relevant Radio |
| Subscription / paywall / charges | 151 | 5.2% | 95 | Hallow (91), iRosary, Sanctifica |
| Community / intentions / together | 128 | 4.4% | 12 | Relevant Radio, Hallow, Amen |
| Hands-free: driving, walking, commute | 100 | 3.4% | 8 | Relevant Radio, Hallow, Holy Rosary Std |
| Reminders / notifications | 84 | 2.9% | 7 | Oremus, Hallow, Amen |
| Music / background sound / chant | 84 | 2.9% | 5 | Amen |
| Simplicity / clutter / ease of use | 79 | 2.7% | 7 | Amen, iRosary, Laudate |
| Ads | 70 | 2.4% | 40 | Catholic Prayers Official, Oremus, The Catholic Rosary |
| Bugs / crashes | 66 | 2.3% | 34 | Hallow, Laudate, Amen |
| Speed / pace of narration | 59 | 2.0% | 16 | iRosary, Amen, Holy Rosary Std |
| Latin | 57 | 2.0% | 4 | Sanctifica, Laudate, iRosary, Oremus |
| Languages (Spanish, Arabic, French…) | 57 | 2.0% | 10 | Amen, Laudate, iRosary |
| Mysteries (luminous, day's mysteries) | 56 | 1.9% | 8 | iRosary |
| Account / login | 41 | 1.4% | 26 | Hallow |
| Custom prayers / skip / choose | 36 | 1.2% | 12 | Hallow, iRosary |
| Losing or keeping one's place, tap/swipe | 31 | 1.1% | 6 | iRosary |
| Older users / parents | 29 | 1.0% | 4 | Amen, iRosary |
| Text size / readability / vision | 20 | 0.7% | 3 | iRosary, Relevant Radio |
| Widget / watch | 13 | 0.4% | 4 | Hallow |
| Streaks / stats | 10 | 0.3% | 3 | Hallow, Sanctifica |
| Privacy / data collection | 4 | 0.1% | 4 | Hallow, Laudate, Amen |
| Dark mode | 2 | 0.1% | 0 | Laudate |
| Offline | 2 | 0.1% | 0 | — |

## Navigating while praying: bead counters, tap/swipe, losing place, screen-off, one-handed, hands-free

### Takeaway
People rarely write about navigation, but when they do it is mostly praise, for three things: the app **keeping the place** when you step away, **stepping bead by bead with a haptic tick** so you needn't look at the screen, and **skipping or jumping** to a decade. The complaints are an app that won't move forwards or backwards, that restarts the rosary, or that drops a setting such as vibrating on every bead. Hands-free use (car, walking, gym) is common, but it comes with audio apps.

### Cited Findings
- Keeping the place is praised specifically: "it holds my place if I have to step away" (iRosary, 2023-03, 5★); "it keeps my place so I can get back" (iRosary, 2025-10, 5★); "it stays right where you left off" (Pocket Rosary, 2024-10, 5★) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Pocket Rosary](https://apps.apple.com/us/app/id808485912)
- Not keeping it is a complaint: "It doesn't saved from where I left off yesterday" (Daily Holy Rosary, 2026-05, 3★); a Divine Mercy user asks to "go back to when I stopped praying" (2023-02, 4★) — [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534), [Divine Mercy](https://apps.apple.com/us/app/id410696366)
- Forward/back control is wanted: "cannot reverse or forward Rosary… the rosary starts over" (Laudate, 2026-10, 3★); "can't skip forward beads… pray a living rosary with a group" (iRosary, 2024-11, 5★); "skip, rewind or start at a specific place" (Laudate, 2024-07, 4★) — [Laudate](https://apps.apple.com/us/app/id499428207), [iRosary](https://apps.apple.com/us/app/id1579750518)
- Praying a decade or two at a time is asked for: "only want to pray a decade or two at a time" (iRosary, 2026-08, 4★) — [iRosary](https://apps.apple.com/us/app/id1579750518)
- Haptic, eyes-free stepping is loved: "just swipe and feel the vibration, similar to… the beads" (Pocket Rosary, 2026-02, 5★); "the soft taps in my phone as I progress" (iRosary, 2026-07, 5★). Losing it is resented: "no longer vibrates on every bead. Only at the decades" (Pocket Rosary, 2026-07, 4★). One user of Catholic Prayers: Official could not find how to turn haptics off (2024-08) — [Pocket Rosary](https://apps.apple.com/us/app/id808485912), [iRosary](https://apps.apple.com/us/app/id1579750518), [Catholic Prayers](https://apps.apple.com/us/app/id1131116859)
- One user asks for distinct beeps for the small and the large beads (iRosary, 2023-06) — [iRosary](https://apps.apple.com/us/app/id1579750518)
- An app is used instead of a physical rosary because fingers lose count: "cannot hold my rosary and I lose my place" (iRosary, 2024-03, 5★); paper booklets mean "flip back and forth and lose my place" (iRosary, 2023-05) — [iRosary](https://apps.apple.com/us/app/id1579750518)
- An "interactive" bead rosary can be worse than a plain list: "The interactive rosary is a pain to use… simple scroll down" (Laudate, 2025-10, 2★, after switching from Android to iPhone) — [Laudate](https://apps.apple.com/us/app/id499428207)
- Hands-free use comes up in 100 reviews (3.4%), almost all positive (8 at ≤3★): "while walking, at the gym, and in the car" (Holy Rosary Std, 2026-01). CarPlay is requested: "navigate on the bigger car screen than fiddling with the phone" (Amen, 2026-09) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Amen](https://apps.apple.com/us/app/id1573298413)
- Screen-off / background playback is a bug class in audio apps: "the voice stops if you aren't in the app" (Daily Holy Rosary, 2026-02, 1★); "you can't [leave] the app or the prayer stops" (Interactive Rosary, 2023-11, 2★); "When my phone auto locks the podcast feed stops" (Relevant Radio, 2024-01) — [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534), [Interactive Rosary](https://apps.apple.com/us/app/id1499112817), [Relevant Radio](https://apps.apple.com/us/app/id597930318)
- Using the app in the dark is praised: "I love that I can use it in a dark room!" (iRosary, 2025-02) — [iRosary](https://apps.apple.com/us/app/id1579750518)

### Inferences
- For a text-first rosary, the review evidence backs: an automatically kept place, tap/swipe stepping with an optional per-bead vibration and a distinct one at decade ends, jumping to a decade, and never forcing a restart. Users who pray in groups ("living rosary") need to start at any decade.
- Screen-off problems are reported almost only for audio playback. For a text app the matching worry is the screen dimming mid-prayer, but no review mentioned wake lock either way.

### Gaps
- One-handed use is never mentioned explicitly. No reviews talk about where the buttons sit.
- Google Play reviews were not reachable, and Android users may weigh navigation differently (one review says Laudate's simple rosary was better on Android).

## Audio: guided audio, voices, speed, offline, Latin audio — wanted or clutter?

### Takeaway
Audio is the biggest single theme (16% of reviews), and most of it is praise for calm, human voices and for "feeling like a small group". The recurring complaints are **AI or robotic voices**, **no speed control** (too fast or too slow), **a familiar narrator replaced**, and **no text to read along with** the audio. A minority actively values apps with *no* music and no narration.

### Cited Findings
- Human, calm voices are praised: "I love the voices, I feel like I am in a small group!" (Holy Rosary Std, 2023-02); "a leader and group responding. No background music. No frills." (Holy Rosary Std, 2025-06) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882)
- AI or robotic voices are rejected in at least 12 reviews across 6 apps: "I cannot concentrate/meditate with that voice!" (Daily Holy Rosary, 2025-01, 3★); "The ai voice is awful" (Sanctifica, 2024-11); "I want to listen to a real human being" (Hallow, 2026-04, 3★); "I like everything but the robotic voice" (Scriptural Rosary, 2024-07, 3★); "The computer voice is horrible!" (My Rosary Audio, 2023-05, 1★) — [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534), [Sanctifica](https://apps.apple.com/us/app/id6446094171), [Hallow](https://apps.apple.com/us/app/id1405323394), [Scriptural Rosary](https://apps.apple.com/us/app/id416544127), [My Rosary](https://apps.apple.com/us/app/id1485494438)
- Speed control (59 reviews, 2.0%) cuts both ways: "I wish there was a way to adjust the speed" (iRosary, 2026-02); "your rosary prayers are so Much slower… hard to follow" (Hallow, 2026-08, 3★); "so many Aps say it too fast for me" (Holy Rosary Std, 2023-01); and for a son with Down syndrome, "a setting to adjust the speed" (Interactive Rosary, 2023-03) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Hallow](https://apps.apple.com/us/app/id1405323394), [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Interactive Rosary](https://apps.apple.com/us/app/id1499112817)
- Changing the narrator causes revolts: the Divine Mercy app's 2023 voice change drew a run of 1–2★ reviews: "Please bring back the older voice"; "the new voice… is distracting. Why change something that works?" (2023-08 to 2024-02) — [Divine Mercy](https://apps.apple.com/us/app/id410696366)
- Voice choice is asked for: "Maybe a couple of choices of voices to choose???" (iRosary, 2025-11); "maybe have a male voice too" (Holy Rosary Std, 2023-05) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Holy Rosary Std](https://apps.apple.com/us/app/id980806882)
- Audio without text frustrates learners, a recurring Amen request (at least 8 reviews): "add the words to the prayers so we can read/pray along" (2024-02); "I would give it 5 stars if the prayers [had] text" (2025-02, 4★); "access to all the words" (Chaplet DM Audio, 2026-03) — [Amen](https://apps.apple.com/us/app/id1573298413), [Chaplet DM Audio](https://apps.apple.com/us/app/id1299502202)
- The reverse, text without audio, is also requested, for poor eyesight: "my eyes aren't what they used to be… lose my place" (Scriptural Rosary, 2025-09, 2★) — [Scriptural Rosary](https://apps.apple.com/us/app/id416544127)
- Music splits users: Amen users praise selectable background music ("choral chants as my go-to", 2026-04), while others value "no distracting music in the background" (Holy Rosary Std, 2024-07) and "NOT barraging you with… random music / AI bots" (Pocket Rosary, 2025-09) — [Amen](https://apps.apple.com/us/app/id1573298413), [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Pocket Rosary](https://apps.apple.com/us/app/id808485912)
- Latin audio is asked for: "add Holy prayers and Rosary in Latin with audio" (Oremus, 2025-12); "Latin chance that we could play in the background" (iRosary, 2025-04). Sanctifica's Latin rosary audio is praised (2025-03, 2025-07), but its incomplete Latin voiceovers draw complaints (2025-06, 1★) — [Oremus](https://apps.apple.com/us/app/id6569225353), [iRosary](https://apps.apple.com/us/app/id1579750518), [Sanctifica](https://apps.apple.com/us/app/id6446094171)
- Audio interrupted by attribution or extra talk: "meditation is interrupted by a spoken commercial attribution" (Laudate, 2025-03, 3★); a Relevant Radio user found off-topic chatter in the rosary "distracting" (2026-06, 1★) — [Laudate](https://apps.apple.com/us/app/id499428207), [Relevant Radio](https://apps.apple.com/us/app/id597930318)

### Inferences
- Audio is the top draw for the big apps, but a text app aimed at people who pray rather than listen is not missing something users demand. The read-along requests show that **text with the audio** is what learners actually lack. Recorded audio would need human voices, speed control, and a never-changing default voice.
- The no-music, no-AI, "just the rosary" camp is real and vocal, which fits a minimalist Latin app.

### Gaps
- Offline audio was mentioned only twice, positively (downloads in Amen), so I cannot gauge demand.
- No review compared Latin pronunciation (ecclesiastical vs classical).

## Meditations, images per mystery, scripture per bead, art

### Takeaway
Content around the mysteries is a strong positive (meditations and scripture in 10.6% of reviews, images and art in 8.3%, very rarely negative). Users ask for more pictures, a meditation or scripture verse per Hail Mary, the "fruit" of each mystery, and real rather than AI-generated art.

### Cited Findings
- Scripture per bead is valued: "scripture before each Hail Mary… my soul gets more out of" it (Scriptural Rosary, 2026-10, 4★); and requested: "add the verses for each bead" (Amen, 2025-03, 3★); "small meditations with each hail mary" (iRosary, 2024-03) — [Scriptural Rosary](https://apps.apple.com/us/app/id416544127), [Amen](https://apps.apple.com/us/app/id1573298413), [iRosary](https://apps.apple.com/us/app/id1579750518)
- Being able to switch scripture off is also praised: "you can have the option to use scripture or not" (Scriptural Rosary, 2024-10) — [Scriptural Rosary](https://apps.apple.com/us/app/id416544127)
- Images help focus: "The illustrations… let me concentrate on the mysteries" (Holy Rosary Std, 2023-05); "I wish they had more pictures/images of each mystery" (iRosary, 2025-03, 3★); one asks to zoom: "be able to enlarge it to see more detail" (iRosary, 2026-08) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [iRosary](https://apps.apple.com/us/app/id1579750518)
- Provenance matters: "I wish you would tell us where the artwork is from" (Holy Rosary Std, 2024-08); and "it uses AI art sometimes, I would love if it… use[d] the art from the artists" (Oremus, 2026-10) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Oremus](https://apps.apple.com/us/app/id6569225353)
- Fruits of the mysteries: "they should announce the fruit of the mysteries" (Holy Rosary Std, 2023-05, 4★); "I love how there is a fruit… for each mystery" (2024-08) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882)
- Motion can distract: "I wish it didn't have that moving text… the mystery could just be still" (Daily Holy Rosary, 2024-04, 3★) — [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534)
- Divine Mercy image while praying: "the image of our Lord… visible when using the chaplet" (Divine Mercy, 2023-03) — [Divine Mercy](https://apps.apple.com/us/app/id410696366)
- Flashy design is disliked: "a simple format without distractingly vibrant colors and graphics. Please don't ever change it!" (Laudate, 2025-03) — [Laudate](https://apps.apple.com/us/app/id499428207)

### Inferences
- Public-domain historical art with stated sources (as in the Misál woodcuts) answers the provenance and anti-AI-art concerns. A short meditation or scripture line per mystery, which users can switch off, is the most requested content addition.

### Gaps
- No quantitative split between "more images" and "fewer images" users. Both camps exist.

## Reminders, streaks, statistics — welcomed or resented?

### Takeaway
Reminders are mostly welcome (84 mentions, 7 negative): people ask for fixed-time alerts for the Angelus, the 3 pm Divine Mercy hour and the Hours. Streaks are a minor theme (10 mentions), nearly all about Hallow's streak **resetting wrongly**, which causes real frustration. One user suggested a percentage of days prayed instead of resetting to zero.

### Cited Findings
- Time-sensitive reminders praised: "time sensitive notifications for the Angelus and Divine Mercy hour" (Oremus, 2026-03); requested: "alarms for the Angelus" (Sanctifica, 2024-08); "alarms… to pray vespers compline" (Sanctifica, 2026-03, 3★) — [Oremus](https://apps.apple.com/us/app/id6569225353), [Sanctifica](https://apps.apple.com/us/app/id6446094171)
- A broken reminder is noticed: "I used to get notifications @3pm to pray the chaplet" (Divine Mercy, 2023-08) — [Divine Mercy](https://apps.apple.com/us/app/id410696366)
- Click To Pray users want to set notification times themselves (2025-07, 3★) — [Click To Pray](https://apps.apple.com/us/app/id934935942)
- Streak failures in Hallow (May 2026 cluster): "my streak has been reset to one" (5★); "continuously loses my streaks… The whole point… is to keep a prayer record" (2026-10, 1★) — [Hallow](https://apps.apple.com/us/app/id1405323394)
- An alternative to streaks: "Instead of going back to 0… A percentage of days prayed would be better for morale" (Hallow, 2026-05, 4★) — [Hallow](https://apps.apple.com/us/app/id1405323394)
- Streaks requested by some: "Would love to see a daily st[r]eak feature" (Daily Holy Rosary, 2026-09); "turn the Saint of the day, rosary, etc into a slide to complete streak. So fun" (Sanctifica, 2025-04); "Just needs a streak widget!" (Hallow, 2026-05) — [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534), [Sanctifica](https://apps.apple.com/us/app/id6446094171), [Hallow](https://apps.apple.com/us/app/id1405323394)
- Gamification can grate: "The games can be cumbersome to manage" (Oremus, 2025-12, 4★) — [Oremus](https://apps.apple.com/us/app/id6569225353)
- Accountability is a common reason for liking Hallow ("helps me stay accountable with my prayer life", 2026-06) — [Hallow](https://apps.apple.com/us/app/id1405323394)

### Inferences
- Streaks are low-demand and high-risk: they please a few and anger many when they break. An optional reminder at liturgical times (Angelus, 3 pm) is the low-risk, frequently requested piece.

### Gaps
- No review explicitly said streaks feel inappropriate for prayer. The resentment I found is about streaks breaking, not about streaks as such.

## Communal prayer, intentions, sharing

### Takeaway
"Community" mostly means the *feeling* of praying with a group (recorded group responses, live radio rosaries) and private intention journals, more than social features. Explicit social requests are rare: adding friends (Hallow), joining a parish as a minor.

### Cited Findings
- The group-voice feeling: "comforting to have others to the lead with the prayers" (Holy Rosary Std, 2023-02); joining "Family Rosary Across America at 8pm" live (Relevant Radio, 2026-05) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Relevant Radio](https://apps.apple.com/us/app/id597930318)
- Intentions as private notes: "I can put my intentions for the rosary or make notes" (Amen journal, 2024-04) — [Amen](https://apps.apple.com/us/app/id1573298413)
- Social requests: "wish we could add friends" (Hallow, 2026-06, 4★); "join my church as a 17yr old" (Hallow, 2026-09, 3★); Hallow intentions' word limit counts punctuation (2026-06, 3★) — [Hallow](https://apps.apple.com/us/app/id1405323394)
- Living-rosary groups need to start at an assigned decade (iRosary, 2024-11) — [iRosary](https://apps.apple.com/us/app/id1579750518)
- Sharing: "share with others easily" listed as a plus (Pocket Rosary, 2026-10) — [Pocket Rosary](https://apps.apple.com/us/app/id808485912)
- Click To Pray (the Pope's prayer network app) has few US reviews (6 since 2023). Its complaints are a confusing redesign ("How can we pray the rosary now?", 2024-07, 2★), a broken login and bugs — [Click To Pray](https://apps.apple.com/us/app/id934935942)

### Inferences
- A solo text app loses little by not having social features. Being able to start at a given decade, and sharing a plan or link, serve the communal use that reviews actually describe.

### Gaps
- No data on how much intention walls (Click To Pray, Hallow) are used, only a handful of reviews.

## Customization: text size, dark mode, choosing prayers, own prayers, languages

### Takeaway
Customization requests are scattered but consistent. Users want to add their own prayers and order favourites, choose which prayers and mysteries are included (Luminous or not, 15 vs 20 decades, litanies, Divine Mercy in the same format), have correct current texts (the new Pope's name, Creed wording), more languages (Spanish above all, also Arabic and French) and Latin–English side by side. Text size and dark mode are rarely mentioned, but where an app lacks them they are named as the biggest gripe.

### Cited Findings
- Latin is wanted *in rosary apps that lack it* (57 mentions, 2%, almost all positive or requests): "I wish it had a Latin English side-by-side option" (iRosary, 2025-04); "would be better if we could have a Latin Rosary option" (Oremus, 2026-10, 4★); "add an option to learn the prayers in Latin?" (The Catholic Rosary, 2026-09); "I would just like to ask you to add Latin" (iRosary, 2026-01); "those… trying to learn the Latin prayers will be sad" (iRosary, 2026-08, 4★) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Oremus](https://apps.apple.com/us/app/id6569225353), [The Catholic Rosary](https://apps.apple.com/us/app/id1388444058)
- Latin as a learning tool: "profoundly helpful… learning how to pray in Latin" (Sanctifica, 2025-04); "I want to try to learn them in Latin" (Laudate, 2023-12). Toggling Latin off is valued too: "I can turn off the Latin so it's not distracting" (Sanctifica, 2025-07) — [Sanctifica](https://apps.apple.com/us/app/id6446094171), [Laudate](https://apps.apple.com/us/app/id499428207)
- Missing or incomplete Latin is noticed: "some Latin prayers… taken off, or incomplete like tantum ergo, litany of humility" (Laudate, 2024-11, 4★). Bookmarks don't carry across language switches: "switching between Latin, Spanish and English… you'll lose your bookmark" (Laudate, 2024-04) — [Laudate](https://apps.apple.com/us/app/id499428207)
- Own prayers and ordering: "ability to re-order the prayers I have bookmarked" (Laudate, 2023-08, 4★); "added prayers could be listed in alphabetical order" (Laudate, 2026-09); "add my own photos to the prayers" (iRosary, 2025-12); "organizing and customizing our favorites… while commuting" (Hallow, 2026-10) — [Laudate](https://apps.apple.com/us/app/id499428207), [iRosary](https://apps.apple.com/us/app/id1579750518), [Hallow](https://apps.apple.com/us/app/id1405323394)
- Sync of own prayers across devices: "none of the ones I added on my phone are there" on iPad (Laudate, 2023-06) — [Laudate](https://apps.apple.com/us/app/id499428207)
- Prayer set choice: "a whole 15 decade Rosary… so we don't have to keep restarting" (Sanctifica, 2025-07, 4★); "traditional mysteries on their days" (Interactive Rosary, 2023-10); "Wish you included the litanies" (Daily Holy Rosary, 2024-03); "include the Litany of Loreto in the rosary" (Sanctifica, 2025-06); "add the 7 Sorrows rosary" (Amen, 2025-01); "Please add the Holy Wounds" (iRosary, 2026-09); "Divine Mercy chaplet & other prayers in the same format" (Daily Holy Rosary, 2026-01) — [Sanctifica](https://apps.apple.com/us/app/id6446094171), [Interactive Rosary](https://apps.apple.com/us/app/id1499112817), [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534), [Amen](https://apps.apple.com/us/app/id1573298413), [iRosary](https://apps.apple.com/us/app/id1579750518)
- Accuracy of text is a 3★ trigger: Pope's name still Francis (Scriptural Rosary, 2025-10 to 2026-10, several reviews; Laudate, 2025-09 and 2026-07); Creed or Glory Be wording out of date or a word omitted (Pocket Rosary, 2024-02; Daily Holy Rosary, 2023-11; Holy Rosary Std, 2023-08; Divine Mercy, 2023-08) — [Scriptural Rosary](https://apps.apple.com/us/app/id416544127), [Laudate](https://apps.apple.com/us/app/id499428207), [Pocket Rosary](https://apps.apple.com/us/app/id808485912), [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Divine Mercy](https://apps.apple.com/us/app/id410696366)
- Text size and dark mode: "The biggest gripe is that there is no dark mode. It is also hard to read the small font" (Laudate, 2025-01, 4★); "font size is so small" (Catholic Prayers: Official, 2026-02, 2★); praised: "enlarge the text to desired size and the haptic responses" (iRosary, 2025-04, 4★, set up "on my mom's phone") — [Laudate](https://apps.apple.com/us/app/id499428207), [Catholic Prayers](https://apps.apple.com/us/app/id1131116859), [iRosary](https://apps.apple.com/us/app/id1579750518)
- Accent colour: "letting users change the accent color" (Pocket Rosary, 2025-09) — [Pocket Rosary](https://apps.apple.com/us/app/id808485912)
- Layout and orientation: no landscape mode (iRosary, 2024-07, 1★); "on the newer iphones the app looks terrible" (iRosary, 2026-05, 2★); iPad versions requested (Sanctifica, 2025-05); a Laudate back button too low-contrast to find (2025-05, 4★) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Sanctifica](https://apps.apple.com/us/app/id6446094171), [Laudate](https://apps.apple.com/us/app/id499428207)
- Languages: Spanish is the most requested (Amen, several 2024–2026; Sanctifica, 2025-07); Arabic (Laudate, 2023-10 and 2026-10); French (iRosary, 2026-01) — [Amen](https://apps.apple.com/us/app/id1573298413), [Laudate](https://apps.apple.com/us/app/id499428207), [iRosary](https://apps.apple.com/us/app/id1579750518)
- A default start page: "select a default page to start" (Laudate, 2024-10, 3★, "The UI is old and tired looking") — [Laudate](https://apps.apple.com/us/app/id499428207)

### Inferences
- A Latin rosary with a one-tap translation answers an unmet request that shows up across *several* major rosary apps (iRosary, Oremus, The Catholic Rosary, Amen). Side-by-side Latin and vernacular is specifically named.
- Keeping prayer texts current (the Pope's name in prayers, the current Creed wording) is a cheap way to avoid 3★ reviews.

### Gaps
- Too few mentions to rank text size against dark mode. Both seem expected rather than requested.

## Complaints: ads, subscriptions/paywalls, accounts, data, bugs, clutter

### Takeaway
Money is the dominant source of negative reviews. **Subscriptions** (151 mentions, 95 of them ≤3★) are overwhelmingly Hallow, about charges after free trials, hard cancellation and too much content behind the paywall. **Ads** (70 mentions, 40 ≤3★) hit the small free rosary apps hard: loud ads overriding silent mode during Adoration, ads that can't be closed, inappropriate ads. Many users explicitly ask to *pay once* to remove ads. Accounts and logins and redesigns that break familiar flows are secondary irritants. "Simple, no frills" is a frequent reason for 5★.

### Cited Findings
- Hallow: of 500 recent reviews (Mar–Nov 2026), 105 are ≤2★, and 57 of those mention subscription, charges or trials: "Do not do the free trial, I was charged despite canceling it" (2026-08, 1★); "everything on here costs a subscription price" (2026-07, 3★); "Price said .99$ a month. Then they charged me 69.99$" (2026-04, 1★); "you have to cancel in app not on your Apple account" (2026-09, 1★) — [Hallow](https://apps.apple.com/us/app/id1405323394)
- Hallow also draws criticism over its investors and advertising (Peter Thiel, Tucker Carlson; several 1★ in 2026) and its privacy policy: "data to be shared with Hallow investors" (2026-07, 1★) — [Hallow](https://apps.apple.com/us/app/id1405323394)
- The free alternative is praised in contrast: "So many beautiful resources without complicated logins or high payments" (Amen, 2024-12); "no ads, and completely free" (Amen, 2025-04); "no reason to pay $70… plenty of free ones available. Laud[ate]" (Hallow, 2026-03, 1★) — [Amen](https://apps.apple.com/us/app/id1573298413), [Hallow](https://apps.apple.com/us/app/id1405323394)
- Sanctifica moved features behind a paywall and was marked down for it: "much of the benefits were recently moved behind the paywall" (2025-12, 4★) — [Sanctifica](https://apps.apple.com/us/app/id6446094171)
- Ads in rosary apps: "even though I have my phone silenced, the ads blast" at Adoration (The Catholic Rosary, 2024-01, 1★); "ads became obnoxious and unskipable" (2026-10, 2★); "now the ads lock the app" (2026-08, 1★); "frequent, annoying, and sometimes inappropriate, so I had to delete it" (2026-02, 1★) — [The Catholic Rosary](https://apps.apple.com/us/app/id1388444058)
- Pay-once wishes: "Why not have option to pay a few bucks and NOT… watch ridiculous ads" (The Catholic Rosary, 2024-08, 3★); "Get rid of the ads, and make it a purchased app" (2026-02, 4★); "I would take a paid version" (2023-01, 3★) — [The Catholic Rosary](https://apps.apple.com/us/app/id1388444058)
- Other ad complaints: "ads during a prayer? Deleted." (Catholic Prayers: Official, 2023-05, 3★); "ads start popping up every 5 seconds" (2023-12, 1★); Oremus: the opening quote is cut off "before an ad pops up" (2026-03); the ad close button is unreachable on iPhone Air (2026-03, 1★); "the ads take away from the sanctity of the rosary" (Interactive Rosary, 2023-09, 1★); "a phone hack" ad made one user delete Daily Holy Rosary (2026-01, 3★) — [Catholic Prayers](https://apps.apple.com/us/app/id1131116859), [Oremus](https://apps.apple.com/us/app/id6569225353), [Interactive Rosary](https://apps.apple.com/us/app/id1499112817), [Daily Holy Rosary](https://apps.apple.com/us/app/id1085163534)
- No ads is a selling point: "No ads popping up constantly, you're not forced to get a subscription" (iRosary, 2026-09); "Ads scare me because of indecency" (Amen, 2024-08) — [iRosary](https://apps.apple.com/us/app/id1579750518), [Amen](https://apps.apple.com/us/app/id1573298413)
- Accounts and logins: Rosario users locked out by an email/phone association (2024-04, 2024-07, 1★); Click To Pray "Unable to Login After Creating an Account" (2025-03, 1★); Sanctifica sessions expiring mid-audio (2024-11) — [Rosario](https://apps.apple.com/us/app/id1619096568), [Click To Pray](https://apps.apple.com/us/app/id934935942), [Sanctifica](https://apps.apple.com/us/app/id6446094171)
- Privacy pop-ups: "usccb privacy notice… won't go away" (Laudate, 2025-10, 1★); Amen "tried to track me" (2024-10, 2★) — [Laudate](https://apps.apple.com/us/app/id499428207), [Amen](https://apps.apple.com/us/app/id1573298413)
- Redesigns that break things: "Upgrades making the app worse… now is confusing" (Click To Pray, 2024-07, 2★); "wish that there was a choice to up grade or not" (Divine Mercy, 2023-08, 1★); "developers always feel like they have to make things new" (Sanctifica, 2026-10) — [Click To Pray](https://apps.apple.com/us/app/id934935942), [Divine Mercy](https://apps.apple.com/us/app/id410696366), [Sanctifica](https://apps.apple.com/us/app/id6446094171)
- Bugs (66 mentions, 34 ≤3★): Laudate "locks up all the time" (2024-12, 2★); Holy Rosary Std shows "a white cross and black background" and won't open (2026-01); Scriptural Rosary "just crashes" (2025-04, 2★) — [Laudate](https://apps.apple.com/us/app/id499428207), [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Scriptural Rosary](https://apps.apple.com/us/app/id416544127)
- Simplicity praised (79 mentions, few negative): "no bells and whistles, but it's all I need" (Holy Rosary Std, 2026-05); "It's just the rosary. That's it. I love it." (Pocket Rosary, 2025-09); "Its lack of bells and whistles… makes it easier to navigate" (Laudate, 2025-06); Hallow is "difficult to move around in" (2026-04, 1★) — [Holy Rosary Std](https://apps.apple.com/us/app/id980806882), [Pocket Rosary](https://apps.apple.com/us/app/id808485912), [Laudate](https://apps.apple.com/us/app/id499428207), [Hallow](https://apps.apple.com/us/app/id1405323394)

### Inferences
- A free, ad-free, account-free app with no paywall sits exactly where review sentiment is warmest. Stating it plainly (no ads, no account, no tracking) is itself a selling point in this category.
- Big redesigns of a prayer app are risky. Users want the familiar flow kept, or an option to keep it.

### Gaps
- Google Play complaints (often more about ads on Android) could not be sampled.
- justuseapp and AppFollow summaries were blocked (403/429), so no third-party cross-check.

## Accessibility (vision, screen readers, older users)

### Takeaway
Accessibility mentions are few but concrete: large adjustable text, haptics, and audio (for weak eyes) are bought or installed *for parents*. Speed control helps users with disabilities. Low-contrast navigation and tiny fonts are named as reasons people stop using an app. No review in the sample mentioned VoiceOver or screen readers.

### Cited Findings
- "Put it on my mom's phone for the great accessibility options… enlarge the text… haptic responses" (iRosary, 2025-04, 4★) — [iRosary](https://apps.apple.com/us/app/id1579750518)
- "my eyes aren't what they used to be" — wants audio added to the text app (Scriptural Rosary, 2025-09, 2★) — [Scriptural Rosary](https://apps.apple.com/us/app/id416544127)
- "having very difficult to reading and reciting [with] small fonts" (Catholic Prayers: Official, 2026-02, 2★) — [Catholic Prayers](https://apps.apple.com/us/app/id1131116859)
- Low contrast: friends "could not find the text to press to go back" because of the header colour (Laudate, 2025-05, 4★) — [Laudate](https://apps.apple.com/us/app/id499428207)
- Older users confused by background music still playing after a task (Amen, 2024-02, 4★) — [Amen](https://apps.apple.com/us/app/id1573298413)
- A child with Down syndrome follows along; parents want a speed setting (Interactive Rosary, 2023-03) — [Interactive Rosary](https://apps.apple.com/us/app/id1499112817)
- ADHD: a user relied on the app at Adoration to stay focused until ads broke it (The Catholic Rosary, 2024-01) — [The Catholic Rosary](https://apps.apple.com/us/app/id1388444058)
- Homebound and hospitalized listeners are named as a key audience (Relevant Radio, 2026-06; Amen, 2026-02, "serving the elderly, sick and homebound… captions so that we could read along") — [Relevant Radio](https://apps.apple.com/us/app/id597930318), [Amen](https://apps.apple.com/us/app/id1573298413)

### Inferences
- Large adjustable text, strong contrast on navigation controls, and haptics carry the most weight for the older users who are a visible share of this audience (29 explicit mentions of parents, the elderly or age).

### Gaps
- No review discussed VoiceOver/TalkBack, so I have no evidence on screen-reader use in this category. Vision-impaired users may simply choose audio apps.
