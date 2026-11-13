# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- **The full rosary, fifteen decades in one** (*Psaltérium Mariánum* · Celý růženec), on the *Růženec* tab under the three sets of mysteries: one opening, the joyful, sorrowful and glorious decades in turn, one closing — 204 steps. The bead ring shows the set being prayed, the label names it (*Mysteria Dolorosa · II. …*), and like the rosary it keeps its place.

## [0.39.0]

### Added
- **The fruit of the mystery and a verse of Scripture** at each decade of the rosary, switched on in the ⋯ settings (off by default). Above the decade's *Pater noster*: a verse from the Vulgate — in Czech from Sýkora's New Testament as revised by Hejčl, in English from the Douay-Rheims — with its reference, and the decade's fruit after St. Louis de Montfort (*humílitas* · pokora, *cáritas erga próximum* · láska k bližnímu, …). It follows the language switch, the translation under the Latin in the middle position.

## [0.38.0]

### Added
- **An intention for each prayer.** On the first step of a rosary, chaplet or litany, *+ Úmysl* lets you write for whom or what you pray. It shows under the prayer's name throughout, and stays for next time until you change it. It never leaves the device, and the backup carries it.
- **A daily reminder in your calendar.** Under *Moje → Připomínka*, choose the Angelus, the Chaplet of Divine Mercy or the rosary and an hour, and add a daily event to your calendar (an .ics file, or Google Calendar). Its link opens the prayer — the rosary with the day's mysteries. The app itself still sends no notifications and keeps nothing of it.

## [0.37.0]

### Added
- **Back up everything.** The backup now holds your favourites, unfinished prayers and settings as well as the plans, and has moved to the *Moje* tab, under *Záloha*. Loading a backup only adds — plans, favourites, places in prayers you haven't started here — and never deletes. Backups saved by earlier versions still load.
- **Pronouncing the Latin.** Help explains the Roman pronunciation in a short table: *cæli* → *čéli*, *Agnus* → *Aňus*, *grátia* → *grácia*, and where the accent falls.
- **About says it plainly:** free, no ads, no account, no tracking, offline, your data on your device; and where the pictures come from: the paintings and the Immaculate Heart were made with the help of AI, the Misál's woodcuts come from a Roman Missal of 1883–1887. The prayer pages say it too.

## [0.36.0]

### Added
- **Latin with the translation under it.** The language switch in a prayer's header has a third position, between *La* and *Cz* / *En*: the Latin stays the text you pray, with the translation under each line in smaller italics — psalms and versicles line by line, the litanies invocation by invocation, with both responses in the ℟ band. The app remembers the choice.

## [0.35.2]

### Fixed
- **Only https://rosarium.lat/.** Plain http and www.rosarium.lat now redirect there: over http the app had no offline mode and couldn't be installed, and each address kept its own plans and favourites.

## [0.35.1]

### Changed
- **A new address: [rosarium.lat](https://rosarium.lat/).** The old one, jaroslavtesarik.cz/latin-rosary/, redirects there, prayer pages included. Plans, favourites and unfinished prayers saved at the old address don't move with it.

## [0.35.0]

### Added
- **Woodcuts in the Misál look.** Engravings from Roman missals of the 1880s now head each prayer group on the *Modlitby* tab (the in-season card, the daily prayers, Our Lady, the Mass, the Blessed Sacrament, the litanies, the dead, the devotions and St. Joseph), the *Moje* tab, the prayer plans, Help and About. A prayer's last step closes with a red tailpiece — a thorn-crowned cross after the sorrowful mysteries, the Seven Sorrows, the Precious Blood, St. Bridget, Stabat Mater, the Miserére and the prayers for the dead — and a red star stands above the footer. In the dark theme the engravings turn to light ink.

### Changed
- **The light/dark toggle and the language on every tab.** They used to sit only atop the *Růženec* tab; now they are in the top corners of all three, and the language button shows just its flag until opened.

## [0.34.0]

### Added
- **Hints while praying.** After the first hint on stepping, a newcomer gets two more, one at a time and once each: a few steps in, that tapping a larger bead jumps to another decade (or another part of a litany or devotion); further on, that the ← arrow goes back to the menu and keeps the place. Each goes with *Rozumím* or once you do what it says.

### Changed
- **An easier welcome.** The welcome card's three points are numbered, each with a short heading over its text; the *La | Cz* switch is drawn as it looks in the header, and *Rozumím* is a filled button under a rule, beside *Víc v nápovědě*.

## [0.33.0]

### Added
- **A welcome on first launch.** The start screen opens with a short *Vítejte* card: where to start and how to step through a prayer, the *La | Cz* switch, and where the other prayers, favourites and plans are, with a link to *Nápověda*. It goes away with *Rozumím* or once you open a prayer, and someone who has already prayed never sees it.

### Fixed
- **Clearer sections on the start screen.** A section inside a group (*Ad sanctum Ioseph*, the Mass's *Sequéntiæ*) now starts under a rule with more room above its heading, instead of reading as part of the prayer before it; and when an unfinished prayer is offered, the rosary and the chaplet below it get their own heading, *Růženec a korunka*. With no favourites yet, the note on how to star a prayer stands in a *Oblíbené* card like the other entries, rather than loose above them.

## [0.32.0]

### Added
- **Four more prayers.** *Ave, maris stella* joins the prayers to Our Lady; *O sacrum convívium* and *Panis angélicus* the hymns to the Blessed Sacrament (offered in Corpus Christi week too); and the *Miserére*, Psalm 50, the daily prayers (offered in Lent). Their Czech comes from prayer books in the Czech National Library's digital library: *Cesta k věčné spáse* ([1932]), *Modleme se!* (1916), *Posvátné zpěvy a modlitby* (1888) and *Malé hodinky k nejblahoslavenější Panně Marii* (1937).

## [0.31.1]

### Changed
- **Základ is the default look again.** A new install starts in Základ; Papír and Misál stay a tap away in the ⋯ settings or under *Moje*. A look already chosen (or given by 0.31.0) is kept.

## [0.31.0]

### Changed
- **A faster first start.** The app loads the prayer translations only for the language it is shown in, the other one in the background, and keeps React apart from the app so an update downloads less.
- **„Nedokončená modlitba“.** The tile with the last unfinished prayer is now called *Nedokončená modlitba* rather than *Rozepsaná modlitba*.
- **The look of a missal** (*Papír*, the new default look). The Latin names — of the rosary, the groups, every prayer and the open prayer's header — are set in the same Garamond as the prayers. The pages take warm paper tones instead of a cool grey (and candlelight ones in the dark theme), and each prayer opens with a red initial.
- **Red headings, flat cards.** The start screen's headings are red small capitals, like a missal's rubrics, and the translations under the Latin names are in Garamond italic. The cards lie flat with a thin rule instead of a shadow.
- **A quieter prayer header.** Instead of a solid coloured bar, the header sits on the page with a line of the prayer's colour under it and softly tinted buttons; the plans screen's header too.

### Added
- **Hymns to the Blessed Sacrament and the Te Deum.** A new group, *Ad Sanctíssimum Sacraméntum*, holds *Adóro te devóte*, *Ave verum*, *O salutáris Hóstia*, *Pange lingua* and *Tantum ergo* with the versicle and collect before Benediction; the *Te Deum* joins the daily prayers. Pange lingua is offered in Corpus Christi week. Their Czech comes from *Příručka katolických pobožností* (1935), *Katechismus modliteb* (1937) and *Cesta k věčné spáse* (1915), the Ave verum's from Collegium Strahoviense.
- **Tabs at the bottom.** The start screen is split into three tabs: *Růženec* (the mysteries and the chaplet), *Modlitby* (search, *V tuto dobu* and the groups of prayers) and *Moje* (favourites, prayer plans and settings). Each tab keeps its own scroll, and coming back from a prayer opens the tab you left.
- **Help.** A *Nápověda* page explains how to pray step by step, the beads, the translation, unfinished prayers, the tabs, favourites, plans and the settings. It and *O aplikaci* are at the foot of every tab.
- **Three looks.** Choose how the app looks in a prayer's ⋯ settings or under *Moje*: **Papír**, the new missal look on warm paper; **Misál**, a white page in black and red only, with rules instead of boxes; or **Základ**, the look the app had until now. Each comes in light and dark. If you already use the app, it stays in Základ until you choose another; a new install starts in Papír.
- **Forget an unfinished prayer.** The *Unfinished prayer* tile on the start screen has a × that, after a confirm, forgets where you left off.

### Fixed
- **The update prompt comes on time.** The server's CDN kept the old service worker for up to three days, so a new version often went unnoticed, or was offered days late. Each build now registers its worker under its own address, and the installed app checks for a new version whenever it comes back to the foreground.

## [0.30.1]

### Fixed
- **The new app icon reaches every phone.** The server lets browsers keep pictures for a month, and Safari kept the old icon even when the app was removed from the home screen and added again. Every icon and picture is now linked with a fingerprint of its content, so a changed picture is fetched afresh.

## [0.30.0]

### Added
- **Search.** A search field above the other Latin prayers finds a prayer by its Latin, Czech or English name, with or without accents (*memorare*, *pomni*, the creeds by *credo*).
- **The next prayer on the Next button.** Under *Další* / *Next* the button names the step it leads to (at Mass: *Sursum corda*, *Sanctus*…), and a litany or devotion shows where you are (*5 z 11*).
- **Quiet settings for church.** *Dim the screen* lays a dark veil over the prayer, dimmer than the dark theme alone, and the vibration on each step can be switched off.
- **A hint the first time.** The first prayer opened explains that a tap or a swipe moves on; it goes once closed or once you have stepped on.

### Changed
- **A tidier prayer header.** Text size and dark mode moved, with the new settings, under one ⋯ button; the header keeps back, restart, the star and the language.
- **Today's mysteries first.** On the start screen today's mysteries are the large tile, the other two side by side under it.

## [0.29.0]

### Added
- **The whole Mass to step through.** *Ordo Missæ* at the top of the *Missa* group opens the people's parts of the Mass as one sequence, in the order of the Mass and with the *Credo*: tap or swipe on to the next part, as in the rosary, without going back to the menu. It keeps its place like the other devotions. The parts can still be opened one by one below it.

### Changed
- **The heart on the start screen stands on its own.** The app icon keeps its blue field on the home screen, but inside the app (the start screen and the About dialog) the heart, its flames, sword, roses and glory of rays are now shown on the page's own background, in the light and the dark theme alike.
- **Favourites and prayer plans under their own heading.** *My prayers*, right below the rosary and the chaplet, holds the Favourites card and the prayer plans, apart from the other Latin prayers.
- **Prayers listed alphabetically.** Within each group the prayers are now in alphabetical order of their Latin names. The Mass keeps the order of the Mass.
- **A line between the prayers** of an open group, across the whole card, so the rows are easier to tell apart.
- **Back where you left the start screen.** Coming back from a prayer or the prayer plans, the start screen is scrolled to where you opened it, not to the top.
- **Darker grey for the translated names.** The Czech or English name under each Latin one, and the other small grey captions, are darker in the light theme (and a little lighter in the dark one), so they read better.

## [0.28.1]

### Changed
- **The start screen's type is back to its earlier size** (titles 20 px, prayer names 16 px); the tiles stay compact.
- **The heart is centred in the app icon.** In the painting the glory of rays round the heart sat below the middle, the flames touching the top edge; every icon now shows it a little smaller, the glory centred, on the same blue field, the home-screen icons on Android and iOS too.

## [0.28.0]

### Added
- **Favourites.** A star in the prayer header (☆) adds the open prayer, litany or devotion to a *Favourites* card on the start screen, open at the top of the other prayers; tap it again to remove it. The list is kept in the browser and survives updates and resets.
- **Five more prayers to St. Joseph**, with *Ad te, beáte Ioseph* and his sorrows and joys under a new *Ad sanctum Ioseph* heading among the devotions: his *Memoráre*, St. Bernardine's *Meménto nostri*, *O Ioseph, virgo Pater Iesu*, the invocation *Fac nos innócuam* and his commemoration (*Ecce fidélis servus* with its versicle and collect). The Latin and English are from the *Raccolta* (1910) and *Preces et pia opera* (1929), the Czech from *Příručka katolických pobožností* (1935) and *Cesta k věčné spáse* (1915). The Latin of the *Memoráre* is ours, since the prayer is Italian and no printed Latin was found.

## [0.27.0]

### Changed
- **A new app icon.** The Immaculate Heart is painted on a blue field instead of a white square, in the icon, the favicon and the link preview. Android gets its own maskable icon, so its round crop no longer cuts the flames or the sword.

## [0.26.0]

### Changed
- **Painted icons for the rosary and the chaplet.** The three mystery sets and the Chaplet of Divine Mercy have a picture instead of the line symbol: the Annunciation, the Man of Sorrows, the Resurrection and the Divine Mercy image. The prayer groups keep their symbols.
- **A more compact start screen.** The tiles are lower, with smaller padding, titles and gaps, so more of the menu fits on a phone screen.

## [0.25.1]

### Changed
- **The About dialog shows the app icon** too, instead of the plain cross.

## [0.25.0]

### Added
- **St. Michael's chaplet is in season on his feast**, 29 September.

### Changed
- **The start screen shows the app icon**, the Immaculate Heart, above the title instead of the plain cross, and a line under the title: *a jiné modlitby* / *and other prayers*.
- **The English Chaplet of the Holy Spirit is now the Raccolta's** (1910): the act of contrition, the collect, and each mystery's meditation and application. Only the sign of the cross and the line-for-line *Veni Creator* remain our own.

## [0.24.0]

### Added
- **The Chaplet of the Holy Spirit** (*Corona Spíritus Sancti*) among the devotions, prayed step by step: the sign of the cross and an act of contrition, the *Veni, Creátor*, five mysteries with a meditation and an exercise, each followed by an Our Father, a Hail Mary and seven Glory Bes, and the Creed. Latin from *Preces et pia opera* (1929), Czech from *Příručka katolických pobožností* (1935); the English is our own translation. In season through the Pentecost octave.
- **Four chaplets from the Raccolta** among the devotions, each prayed step by step with its prayers counted in the label:
  - **The Chaplet of St. Michael** (*Corona Angélica*): nine salutations to the choirs of angels, each with an Our Father and three Hail Marys, four Our Fathers, the antiphon and the collect.
  - **The Rosary of the Seven Sorrows** (*Corona Septem Dolórum*), the Servite form: an act of contrition, seven sorrows of an Our Father and seven Hail Marys, three Hail Marys for Our Lady's tears, and the collect. In season on the feasts of Our Lady of Sorrows and in Lent.
  - **The Chaplet of the Precious Blood** (*Corona Pretiosíssimi Sánguinis*): seven mysteries with 33 Our Fathers in all, then the prayer and the collect. In season in July.
  - **The Chaplet of the Sacred Heart** (*Corona Sacratíssimi Cordis Iesu*): five considerations of the Heart, each with an Our Father, five Glory Bes and the aspiration, a prayer to Our Lady and the collect. In season in June and on first Fridays.
  - **Sources:** the Czech is from *Cesta k věčné spáse* (1915) and, for the Seven Sorrows, *Poutní kniha* (1893); the English is the Raccolta's (1910, the Sacred Heart 1878). No Latin text could be found, so **the Latin is our own translation**, except the versicles and collects, which are the Missal's or the Raccolta's.

### Changed
- **The *In season* card starts closed**, like the groups below it; tap it to see what the day calls for.

## [0.23.0]

### Added
- **More prayers**, with Latin, Czech and English:
  - **Daily prayers:** grace before and after meals (*Benedíctio mensæ*, *Gratiárum áctio*), St. Ignatius's *Súscipe*, St. Thomas Aquinas's prayer before study *Creátor ineffábilis* (its Czech is our own translation), and *Nunc dimíttis* for the night.
  - **To Our Lady:** the *Memoráre* and the *Magníficat*.
  - **The Mass:** Psalm 42 *Iúdica me*, which now opens the *Ordo Missæ*.
  - **Devotions:** the prayer to St. Joseph *Ad te, beáte Ioseph*, also in season through March.
  - **Sources:** the Czech is from *Příručka katolických pobožností* (1935), *Katechismus modliteb* (1937) and *Cesta k věčné spáse* (1915), and *Iúdica me* from Schaller. The Latin was checked against preces-latinae.
- **An *In season* card** on top of the groups with what the day calls for: the Marian antiphon of the season, *Víctimæ pascháli* in the Easter octave, *Veni, Sancte Spíritus* in the Pentecost octave, *Lauda Sion* in Corpus Christi week, *Stabat Mater* on the two feasts of Our Lady of Sorrows, the Litany of the Saints on All Saints, the prayers for the dead through November, the litany of the month's devotion (St. Joseph with his sorrows and joys in March, the Sacred Heart in June and on first Fridays, the Precious Blood in July, the Holy Name in January, Loreto in May and October) and the St. Bridget prayers in Lent. Each is also marked *nyní* in its group.

### Changed
- **Czech capitals follow the Latin:** *Duch Svatý* everywhere (the Creed, the Angelus, the Loreto litany, the canticles), and pronouns for God in lower case where the Latin has them so (*tě prosíme, uslyš nás* in the Litany of the Saints, the Súscipe, the Holy Name collect). The Salve Regína keeps *k Tobě*.
- **A new app icon: the Immaculate Heart** with its flames, the sword and white roses, in a glory of rays, which also heads the link preview beside *Rosarium Latinum*. It replaces the drawn rosary.
- **Each group on the start screen has its own symbol and colour:** a calendar for *In season*, a sun for the daily prayers, the Marian M, the IHS monogram for the Mass, a cross for the dead, a heart for the devotions.
- **The start screen is regrouped by occasion.** Below the rosary and the chaplet: *Orationes cotidiánæ* (daily prayers), *Ad Beátam Maríam Vírginem* (the Marian antiphons, Sub tuum, Stabat Mater), *Missa* (the Ordo Missæ in the order of the Mass, the sequences, the Leonine prayers after Mass), *Litaníæ*, *Pro defúnctis* (all the prayers for the dead together) and *Devotiónes* (St. Bridget, St. Joseph). The separate tiles for the devotions are gone, and every prayer is in exactly one place. The plan editor and the prayer pages' index follow the same groups. Links, saved places and plans are unchanged.

## [0.22.0]

### Added
- **Ordo Missæ**, a new group on the start screen with the people's parts of the traditional Latin Mass in the order of the Mass: *Confíteor* (with the *Misereátur* and *Indulgéntiam*), *Kýrie*, *Glória in excélsis*, the dialogue before the Preface (*Sursum corda*), *Sanctus* with the *Benedíctus*, *Agnus Dei*, the priest's prayers before Communion (with *Panem cæléstem accípiam*), *Dómine, non sum dignus*, and the priest's prayers after Communion (*Quod ore súmpsimus*, *Corpus tuum*).
- **Sequéntiæ**, a group with the missal's sequences: *Víctimæ pascháli laudes*, *Veni, Sancte Spíritus*, *Lauda Sion* and *Stabat Mater*, joined by *Dies iræ*, which moves here from the *Orationes utilissimæ* (its page and plan steps are unchanged).
- All of them in Czech from Schaller's *Římský misál* (1931) and in English from the *Saint Andrew Daily Missal*. Each has its own web page, and both groups are offered in the plan editor.

### Changed
- **The Czech Litany of the Saints now follows Schaller's *Římský misál* (1931)**, the traditional Czech text, instead of our own translation: the Kyrie, every saint the traditional form names, the deprecations and intercessions (*Tě prosíme, uslyš nás*), Psalm 69, the versicles and all ten collects. Only the saints our fuller Latin adds to that form (Abraham, the later martyrs, doctors, founders and holy women) remain in our own Czech.
- **The closing prayer of the Czech Litany of the Holy Name** is now Schaller's, so the whole litany is sourced.

### Fixed
- **A group on the start screen stays open** when you open a prayer from it and come back, instead of closing every time.

## [0.21.0]

### Added
- **Prayers for the dead**, in time for All Souls: *De profúndis* (Psalm 129, with the versicles and the prayer *Fidélium, Deus* it is said with for the dead) and the sequence *Dies iræ* from the Requiem Mass, among the *Orationes utilissimæ*. The Czech *Dies iræ*, versicles and prayer follow Schaller's *Římský misál* (1931), the Czech psalm the burial rite (*Manuale rituum*, 1955), and the English *Dies iræ* is Irons' translation from the *Saint Andrew Daily Missal*. Through November, the month of the holy souls, the start screen marks them, and the Réquiem, as in season.
- **Preces pro defunctis**, the prayers for the dead step by step among the other devotions: an Our Father, a Hail Mary, *De profúndis*, its versicles and the prayer *Fidélium, Deus*. It can be added to a prayer plan.

### Changed
- **The Czech prayer *Fidélium, Deus* in the Litany of the Saints** now follows Schaller's missal, as in *De profúndis*.

## [0.20.1]

### Changed
- **The chaplet's Latin name is now *Corona Divínæ Misericórdiæ*,** the title the Latin prayer collections use, instead of *Coronula*. Its page on the web moves with it, before ever having been published.
- **The switch for the chaplet's optional prayers sits inside the chaplet's box,** under a thin line, instead of below it.

## [0.20.0]

### Added
- **The Chaplet of Divine Mercy** (*Coronula Divínæ Misericórdiæ*), under the rosary's mysteries on the start screen, prayed on the same ring of beads: *Pater ætérne* on the large beads, *Pro dolorósa* on the small ones, *Sanctus Deus* three times to close. A switch under it adds the optional prayers from St. Faustina's Diary: *Expirásti, Iesu* and three *O Sanguis et Aqua* to open, *Ætérne Deus* and *Iesu, in te confído* to close. The switch is remembered, and a chaplet left half-prayed resumes in the form it was started in. It has its own page with the texts on the web too.
- **The Seven Sorrows and Joys of St. Joseph** (*Septem Dolóres et Gáudia Sancti Ioseph*), among the other devotions, in its short Latin form: seven headings, each with an Our Father, a Hail Mary and a Glory Be, and the prayer *Vírginum custos* for purity to close. It has its own page on the web.

## [0.19.0]

### Added
- **The prayer texts on the web.** Every prayer, litany and devotion now has its own page in English and in Czech, with the Latin beside the translation, so search engines can find them (for *Litany of Loreto Latin*, *Salve Regina text* and the like). The rosary's page gives its prayers and every mystery. A button opens the prayer straight in the app. The pages are listed at `en/` and `cs/`, and *About* links to them.
- **Link previews.** A link to the app shared on Facebook, WhatsApp, Messenger and the like now shows a picture of the rosary with *Rosarium Latinum* and a short description in English and Czech, instead of a bare address. Search engines get the description too.

### Fixed
- **The home-screen icon shows the whole rosary.** The PNG icons used on Android and iPhone were missing the ring of beads, leaving only a thin circle above the cross.

## [0.18.0]

### Changed
- **English for visitors in other languages.** A browser set to German, Polish, Spanish or any language the app doesn't speak now gets the English interface; before, it got Czech. A Slovak browser gets Czech. A language once chosen in the app still wins.
- **The installed app is called *Rosarium*.** The home-screen name (*Rosarium*, in full *Rosarium Latinum*) is Latin instead of Czech (*Růženec*), so it reads the same in every country. The browser tab still shows the name in the chosen language.

### Fixed
- **The installed app turns to landscape on Android.** The app manifest locked it upright, so the landscape layout from 0.17.0 showed only in the browser.

## [0.17.1]

### Fixed
- **ǽ in the Latin prayers is set in EB Garamond.** On Android it could show in a heavier system serif (e.g. *sǽcula* in the Gloria Patri). It is the only character from the font's Latin Extended subset on most Latin screens, so that file was downloaded only when the letter first appeared, and the system font filled in until it arrived, or for good when the download failed offline. The subset is now loaded when the app starts, so the service worker caches it in advance.

## [0.17.0]

### Added
- **The decade and its mystery are shown while praying the rosary.** Within a decade, the label under the ring names the decade and quotes its mystery in full. It follows the La | Cz switch: *II. quem, Virgo, visitándo Elisabeth portásti* in Latin (just the number, as Latin prayer books head them), *2. desátek: s kterým jsi, Panno, Alžbětu navštívila* in Czech (*Decade 2: …* in English). Before, it read just *Ave María*. The label stays up through the Pater Noster, Gloria and Fatima prayer too, where the mystery isn't otherwise shown.
- **The end of a decade can be felt.** Reaching a decade's Gloria Patri gives a double vibration, while every other step gives a single short one.
- **Landscape layout.** On a phone turned on its side, or on a tablet, the rosary ring (or the bead strand) and the label sit in a column on the left, with the prayer beside them. The ring may grow larger there.

### Changed
- **Touch-sized header buttons.** ←, ↺, ☾, Aa and the language switch are 40 px tall (from 30 px), so they are easier to hit and harder to confuse.
- **The language switch is one tap.** It shows both sides, **La | Cz**, with the active one filled white, so it reads as a toggle. It no longer opens a menu.
- **In-app dialogs.** Restarting a prayer, deleting a plan, importing a shared plan or a backup, and the share-link fallback use a dialog in the app's own style instead of the browser's system box. While a dialog is open, keys no longer move the prayer on.

## [0.16.0]

### Added
- **"Rozepsaná modlitba" at the top of the start screen.** When a prayer is unfinished, the most recently prayed one is offered first, one tap away. Before, it could sit inside the collapsed *Litaníæ* group or on the plans screen. Its own row further down still shows its place too.

### Changed
- **EB Garamond is bundled with the app** (`@fontsource/eb-garamond`) instead of being loaded from Google Fonts. Offline, the prayers used to fall back to another typeface, because the service worker could not cache Google's stylesheet. Bundled files are cached like the rest of the app. No request goes to Google any more, so visitors' IP addresses no longer reach a third party (a GDPR concern in the EU). Only the subsets in use are downloaded.

## [0.15.0]

### Added
- **Prayers of your own in a plan.** *+ Vlastní modlitba* in the plan editor adds a prayer you write: a title, its Latin text and an optional Czech/English text, which the header's language button switches to. It is prayed as one card and can be repeated, reordered and edited (✎) like any other step. It lives inside its plan, so it is deleted with the plan and shared with it: the share link carries the text, and warns when the link gets long. It is always shown as plain text. Limits: 10 per plan, 60 characters per title, 2,000 per text.
- **Plan backup.** Plans exist only in this browser, so clearing site data or changing phones loses them. *Zálohovat plány* saves them all to a JSON file, and *Načíst zálohu* adds the plans from such a file, on any device. Imported plans get fresh ids, so a local plan is never overwritten.
- **The Leonine prayers can be added to a prayer plan**, under a new *Aliæ preces* group in the editor. Like a litany, they inline as their own nine steps. The rosary and the St. Bridget prayers stay out: the rosary would lose its bead ring, and St. Bridget's Pater/Ave sub-steps would each become a bead.

### Changed
- The back button in the plans screen is an arrow only (←), like the one in the prayer header. When editing a plan, the screen's title reads *Upravit* instead of *Nový plán*.

## [0.14.0]

### Added
- **Today's mysteries are marked on the start screen.** A *dnes* pill tags the set traditionally prayed today: joyful on Monday and Thursday, sorrowful on Tuesday and Friday, glorious on Wednesday and Saturday. On Sunday it follows the season: joyful in Advent and Christmastide, sorrowful in Lent, glorious otherwise.
- **The Marian antiphon in season is marked.** Under *Orationes utilissimæ*, a *nyní* pill marks Alma Redemptóris (Advent to 1 February), Ave Regína Cælórum (2 February to Easter), Regína Cæli (Eastertide) or Salve Regína (Trinity Sunday to Advent). In Eastertide the Angelus row notes that the Regína Cæli is prayed instead. A new `liturgy.ts` computes Easter, Advent and the seasons, and is unit-tested.

### Changed
- **The rosary's bead ring is pinned too.** As with the other prayers, the ring and label stay put and a long prayer (the Credo, Salve Regína at a large text size) scrolls inside its card, so the card's top no longer scrolls away. The ring's height is capped so it fits small phones. Every card now sits right under its label instead of centred in the space left.
- **A lone litany response is styled like the band:** in the accent colour and upright, no longer italic.

## [0.13.1]

### Added
- **Light/dark toggle in the prayer header**, so the theme can be switched mid-prayer without going back to the start screen. It shares its sun/moon glyph (`ThemeIcon`) with the start-screen toggle.

### Fixed
- **One response band per section in the Litany of the Saints.** It alternates *ora pro nobis* (one saint) and *oráte pro nobis* (a group) line by line, and each switch started a new band, so a section like Mártyres had three bands stacked up and several lines still carrying their response. Both forms now count as one response, labelled ***ora(te) pro nobis*** (*oroduj(te) za nás*), so every saints' section has a single band.

### Changed
- **The prayer header has two rows.** The buttons sit in one row on top: ← and ↺ on the left; ☾, Aa and 🌐 La on the right. The prayer's name runs across the full width below them, so a long litany name no longer wraps to three lines between the buttons.

## [0.13.0]

### Added
- **Litanies step through their sections, with the response shown once.** Every litany now has the bead strand and progress, like the Leonine prayers: Loreto in six parts (Kyrie → Sancta María → Virgo → Spéculum iustítiæ → Regína → Agnus Dei), the others in three to six. Within a section, consecutive invocations sharing a response show it **once**, in a coloured, right-aligned ℟ band that stays at the top while you scroll, instead of repeating *ora pro nobis* on every line; a lone response (the Agnus Dei, *Propítius esto*) stays in the line. For every prayer but the rosary, the bead strand and label now stay pinned and the card scrolls its text inside itself, so a long section never scrolls the progress away or cuts off the card's rounded top. Litanies keep their place like any other multi-step prayer, and a plan containing one now steps through its sections.
- **Unfinished prayers keep their place.** Leaving a prayer with the back button (←) no longer discards it (and no longer asks): the start screen shows *Pokračovat · 23/74* under it, and opening it again resumes there. Every multi-step set — the rosary, the Leonine and St. Bridget prayers, the Litany of the Saints, prayer plans — keeps its own place, so you can stop the rosary, pray the Leonine prayers and come back. *Dokončit* on the last step forgets the place; a new ↺ button in the header starts over (with a confirm). Editing or deleting a plan drops that plan's place.
- **English translations of every prayer** (`PRAYERS_EN`, ~50 texts including all seven litanies and the fifteen sections of the Litany of the Saints) plus English mystery clauses and Ave María halves. The prayer card's language toggle is no longer LA↔CZ but **LA↔the chosen UI language**, so an English UI prays the English text. Unlike much of the Czech, these are **our own rendering** of the received traditional English forms rather than a transcription — banner-flagged in `prayers.ts` like the `BRIGIT_*` entries, to be replaced verbatim if an English edition is obtained.
- English texts **spot-checked against online witnesses** after writing (vatican.va for Loreto, preces-latinae.org for the Litany of the Saints, EWTN for the Precious Blood / Holy Name / Humility, USCCB for St. Joseph). Loreto, the Litany of the Saints and the Precious Blood match line for line; the corrections applied were *All ye holy popes and confessors* (the English said "bishops" where the Latin reads *Pontífices* and the Czech *papežové*), *thrust into hell* / *prowl about the world* in the St. Michael prayer, *spirit of fornication* for *spíritu fornicatiónis* in two litanies, *zealous lover of souls*, and four wordings in the Litany of Humility brought into line with the Merry del Val text the Czech already follows. What was and wasn't checked is recorded in the banner above `PRAYERS_EN`.
- Second verification pass: the **Nicene Creed** was replaced outright with the current Roman Missal (ICEL 2011) text — the app's Czech is the current missal, so the English should be too (*consubstantial with the Father*, not *of one substance with*); **Psalm 69** in the Litany of the Saints had its ℣/℟ split corrected to follow the Latin's, which the Czech already did; and the Ánima Christi reads *malignant enemy* for *hoste malígno*. The Angelus, Regina Cæli and Sub tuum præsídium were checked and needed nothing.
- Third pass: the **closing versicles and ten collects of the Litany of the Saints** were our own translation and now follow the traditional thee/thou text (*whose property is always to have mercy and to spare*, *Inflame, O Lord, our desire and heart*, *Direct, we beseech thee*). Where that witness departs from the Latin, the Latin wins: there is no *and the intercession of Mary* in the final versicle. The **Leonine collect** now reads *look down with favour* and *our holy Mother the Church*. Angele Dei, Réquiem and the Decalogue were checked and needed nothing. The two Marian antiphons, **Alma Redemptóris** and **Ave Regína Cælórum**, which were our own wording, now take their English from the **Liturgy of the Hours** (ICEL, Night Prayer): the prose *Loving mother of the Redeemer* and the rhymed *Hail, O Queen of heaven enthroned*. Their seasonal versicles and collects are unchanged.
- **Localized names for every prayer** — each mystery set, ordinary prayer, litany, linear devotion and the two collapsible group headers now carries a `nameTr` (cs/en). The start screen and the plan editor's picker show the Latin name with its name in the UI language beneath it in muted grey, the same two-line shape the prayer-plan tile already used.

### Changed
- **The LA ↔ CZ/EN switch moved off the prayer card into the header**, next to "Aa": one button with a globe icon and the current language, which opens a small menu with both. On the card it sat over the text (and over the new ℟ band). To make room, the header's back button is now just an arrow (←).
- `STATE_VERSION` is 6: a plan containing a litany got longer, so saved places in plans are dropped on update; every other place (rosaries, the Leonine and St. Bridget prayers, the Litany of the Saints) carries over.
- Saved state (`ruzenec_state`) is now `{ version: 5, active, progress }` — the open set plus a map of every unfinished set's step. A version-4 save (one set and step) is migrated, not discarded, so an in-progress rosary survives the update.
- **The language picker offers Czech and English only.** `sk`/`de`/`pl` are gone: their UI strings existed but no prayer translation did, so choosing them only ever localized the chrome. A saved locale that is no longer supported falls back to the detected one. `SUPPORTED_LOCALES` now drives `PRAYER_TRANSLATIONS`, so adding a locale fails to compile until its full prayer table exists.
- Prayer translations are keyed by locale throughout: `PRAYERS_CS` is joined by `PRAYERS_EN` under `PRAYER_TRANSLATIONS`, `getHailMaryCs` becomes `getHailMaryTr(locale, …)`, `MysterySet.mysteriesCs` becomes `mysteriesTr`, and `SequenceItem.mysteryCs` becomes `mysteryTr`. `STATE_VERSION` is unchanged — no sequence's shape or length moved.

### Fixed
- **A litany collect containing response words is no longer part-italicized.** `renderLitany` took any known response phrase anywhere in the line, so an English collect ending "…and deliver us from the punishments which we deserve for them." italicized from *deliver us* onward. A response must now end its line, bar a short vocative (", O Lord."), and among the candidates the longest wins — needed for English, where "That thou wouldst spare us, we beseech thee, hear us." must split at *we beseech thee*, not at *spare us*.
- **Service worker no longer wipes other apps' offline caches** — every app on the same domain shares one Cache Storage, and `activate` deleted every cache except its own, so updating the rosary broke offline mode of other apps deployed next to it (and vice versa). It now deletes only its own old `ruzenec-*` builds.
- **App icon on iPhone** — iOS ignores an SVG `apple-touch-icon` and shows a page screenshot or a letter on the home screen instead. The icon is now also rendered to PNG (`icon-180.png` for iOS, `icon-192.png` / `icon-512.png` in the manifest for Android), from `icon.svg` with Inkscape.

## [0.12.0]

### Added
- **Prayer plans** — a new start-screen tile (*Modlitební plány*) where you build your own named order of prayers and pray it as one set. A plan is an ordered list of *Orationes utilissimæ* and litanies, each with a repeat count (3× Ave María, and so on); it runs as a `linear` set, so it gets the bead strand, tap-a-bead jumping, and resumes where you left off. The rosary and the linear devotions (Leonine, St. Bridget) are deliberately not selectable — nesting them would flatten away the bead ring and the sections that make them what they are. The Litany of the Saints *is* selectable and inlines as its fifteen sections. New `src/rosary/plans.ts` (data, validation, sequence builder, share codec) and `src/rosary/PlansScreen.tsx` (list + editor); localized in all 5 locales.
- **Plans are shareable by link** — Share hands out `…/#plan=<name>;<key>*<n>,…`, which never reaches a server: the fragment carries the short registry keys, and the receiving app asks before importing, assigning a fresh id so a shared plan can never overwrite a local one. This is also the only way to move plans between devices, since there is no backend to sync through.
- Plans live under their **own `localStorage` key** (`ruzenec_plans`, own `PLANS_VERSION`), not inside `ruzenec_state` — that key is discarded on every `STATE_VERSION` bump and cleared on reset, which is right for an in-progress position but would silently destroy user data. `STATE_VERSION` is therefore *not* bumped in 0.12.0: no existing sequence changed, and bumping would needlessly discard an in-progress rosary. Every plan is re-validated on load (`sanitizePlan`), so a renamed registry key degrades a plan instead of crashing the app, and `navigator.storage.persist()` is requested when the first plan is saved so an installed PWA doesn't lose them to storage pressure.

### Changed
- The `navigation.ts` helpers that can meet a `plan:<id>` key (`getPrayerSetMeta`, `buildSequence`, `isPersistableKey`, `resolveInitialState`) now take the live plan list as a second argument. Plans aren't a static registry — they're edited and deleted at runtime — so the module stays free of storage access and remains unit-testable.
- The bead strand (`PrayerSections`) scales its beads down once they would overlap, so a long plan stays legible where the fixed radii were tuned for the 15-section Litany of the Saints.

## [0.11.0]

### Added
- **Litany of the Saints** (*Litaníæ Omnium Sanctórum*) — completes all six litanies approved for public recitation, and the first litany that isn't a single card: it steps through **fifteen sections** (Supplicátio → the eight saint groups → Ad Christum → Necessitátes → Conclúsio → Psalmus LXIX → Versículi → Collectæ), so it gets the bead-strand stepper and resumes where you left off. Litany registry entries now take an optional `kind`, and `isPersistableKey` accepts a litany that declares itself linear. The **traditional** form, complete: 102 saint invocations, 23 deprecations, 17 intercessions, and the full conclusion including the Pater noster, Psalm 69, the versicles and all eleven collects — 225 lines per language, by far the longest text in the app. Latin verbatim from preces-latinae.org (*Varia Pietatis Exercitia*, 1754, with later saints folded in), accents ours, two evident source typos corrected. **The Czech is our own translation**, banner-flagged like the St. Bridget prayers: no Czech edition of the traditional litany exists to transcribe, the Czech books having only the modern short form.
- **Litany of the Most Precious Blood** (*Litaníæ Pretiosíssimi Sánguinis D.N.I.C.*) — the sixth litany, completing five of the six approved for public recitation (only the Litany of the Saints is left). 24 invocations with the `salva nos` / *buď naší spásou* response, which is new to `LITANY_RESPONSES`. Latin from sanctamissa.pl; Czech from modlitba.cz, with one invocation and the three Agnus Dei responses from the pravover.cz leaflet where modlitba.cz is short.
- **Litany of St. Joseph** (*Litaníæ Sancti Ioseph*) — the fifth litany, including the seven invocations Francis added on 1 May 2021 (*Custos Redemptóris*, *Serve Christi*, *Miníster salútis*, *Fúlcimen in difficultátibus*, *Patróne éxsulum / afflictórum / páuperum*), interleaved in their official positions rather than appended. Latin from the Roman Ritual with the 2021 placements per wdtprs.com; Czech from the farni-musle.cz leaflet cross-checked against prayerbook.weebly.com, with the 2021 renderings from oessh.cz. Three Czech lines are ours (`Opora rodin`, `Podporo v obtížích`, `Patrone vyhnanců`) because no Czech witness carried them — flagged in `prayers.ts`.
- **Litany of Humility** (*Litaníæ Humilitátis*) — the fourth litany: the opening `exáudi me`, eight `A desidério … líbera me, Iesu` petitions, eight `A timóre …`, and seven `Ut álii …, Iesu, da mihi grátiam ita desiderándi`. Unlike the other three this is a private devotion, not one approved for public liturgical use, and its Latin is **ours rather than a sourced original** — no authoritative Latin exists (the devotion is modern, its author unknown, published in 1880 as a translation from the French). Pointing assembled from catholicmall.net and prayrosary.info; Czech is the standard Merry del Val translation from ikatolici.cz. Flagged with a banner comment in `prayers.ts`, as with the St. Bridget prayers.
- **Litany of the Holy Name of Jesus** (*Litaníæ Sanctíssimi Nóminis Iesu*) — the third litany, appearing automatically under "Litaníæ" on the start screen. 38 `Iesu` invocations plus a structure the other two don't have: the *Propítius esto* pair, seven `líbera nos, Iesu` deprecations, and fourteen per-mystery petitions. Latin structure cross-checked against sanctamissa.pl and commandercrossrosary.com; Czech invocations from prayerbook.weebly.com, with the closing collect in our own wording — the one litany not Kancionál-verified, flagged as such in `prayers.ts`.

### Fixed
- **Litany responses containing a comma are no longer cut mid-phrase** — `renderLitany` italicized everything after the *last* comma, so `líbera nos, Iesu` and the new `parce nobis, Dómine` Agnus Dei responses rendered with only the address (`Iesu` / `Dómine`) in italics. The response is now located by matching a known phrase instead.
- **Both litanies now open and close with the full liturgical text** — the `Christe, audi nos. / Christe, exáudi nos.` acclamations after the Kyrie were missing, and the Agnus Dei was collapsed to `miserére nobis` ×3; it now has its three distinct responses (*parce nobis, Dómine* / *exáudi nos, Dómine* / *miserére nobis*). Applied to Loreto and the Sacred Heart in both Latin and Czech — the two Czech additions depart from the Kancionál base text (which shortens both places) for structural parity with the Latin, and are documented as such in `prayers.ts`.
- **The Kyrie no longer renders half-italic** — `renderLitany` italicizes whatever follows the last comma as the congregation's response, which mangled the opening acclamations (`Kyrie,` + *`eléison. 2×`*). Those lines are repeated whole, so they now render unsplit.
- **The prayer-text language (LA/CZ) is now remembered** — the card's language toggle was plain component state: it reset to Latin on every reload *and* on every newly started prayer set, so a translation reader had to re-pick it each time. The choice now persists under its own `ruzenec_prayer_language` key (`loadSavedShowTranslation` / `saveShowTranslation` in `i18n.ts`), alongside the locale, font-size, and theme preferences.

## [0.10.0]

### Added
- **Build date in the About panel** — the version line now reads `v0.10.0 · sestaveno 30. července 2026`. A new `__BUILD_DATE__` define (ISO timestamp, set in `vite.config.ts` alongside `__APP_VERSION__`) is formatted with `toLocaleDateString` in the active UI locale; the label is localized in all 5 locales, and the date is omitted if the value can't be parsed.

## [0.9.0]

### Added
- **Error boundary** — a top-level boundary (`src/rosary/ErrorBoundary.tsx`) catches any uncaught render error (previously a blank screen mid-prayer) and shows a themed, localized recovery card: **Reload**, or **clear saved progress and reload** for the likely corrupt-`localStorage` case. Localized in all 5 locales.
- **"Update available" prompt for the PWA** — the service worker no longer `skipWaiting()`s on its own; a new build waits until the user accepts an in-app bottom prompt (`UpdateToast`), which swaps in the new version and reloads once. New `useServiceWorkerUpdate` hook (SW registration moved here from `main.tsx`); a `controllerchange` guard avoids a spurious reload on first install. Localized in all 5 locales.
- **Unit tests for the navigation/persistence logic** — a second Vitest suite (`src/rosary/navigation.test.ts`) covers `isPersistableKey`, `resolveInitialState` (resume / reject non-persistable / out-of-range / negative steps), the `canGoToStep` bounds check, and `getPrayerSetMeta` kinds — the branching logic behind resuming and stepping, previously untested.
- **ESLint** — flat config (`eslint.config.js`) with `@eslint/js` + typescript-eslint recommended + `react-hooks` + `react-refresh`, a `npm run lint` script, and a `lint` step in CI (`typecheck → lint → test → build`).

### Changed
- **Extracted the orchestrator's session logic into `src/rosary/navigation.ts`** (pure, no React/DOM) so it can be unit-tested: set-key guards, `getPrayerSetMeta`, `buildSequence`, `isPersistableKey`, `resolveInitialState`, `canGoToStep`. `Rosary.tsx` and `MysteryMenu.tsx` now import `PrayerSetKey` from there (removing a duplicated type).
- **Reduced-motion support** — a `prefers-reduced-motion: reduce` stylesheet rule neutralizes transitions/animations (bead glow, progress bar, roll-down), and `Rosary.goToStep` uses instant (not smooth) scrolling when the setting is on.
- **Dialog focus management** — the About modal now moves focus inside on open, traps Tab within the dialog, and returns focus to the opener on close.

### Fixed
- **Corrupt saved-state crash.** Registry membership used `k in MYSTERIES`, which walks the prototype chain — so a saved `selectedSet` of `"toString"` / `"constructor"` passed the persistability check and then resolved to a prototype function, crashing on load. The guards now use an own-property check (`hasOwnProperty`). Found by the new navigation tests.

## [0.8.0]

### Changed
- **Linear devotions now resume after a reload.** Progress persistence was rosary-only; it now covers every multi-step set — including the St. Bridget and Leonine prayers — so reopening the app returns you to where you left off. Single-prayer sets (litanies, ordinary prayers) stay session-only (nothing to resume). The saved schema now stores a generic `selectedSet` key; `storage.ts` is decoupled from the prayer data, and `Rosary` validates the key + step against the live registries. `STATE_VERSION` bumped 3 → 4 (old saved progress is discarded once).

## [0.7.0]

- **Usage analytics (GoatCounter)** — cookieless, no personal data, no consent banner. New `src/rosary/analytics.ts`: loads the beacon **only in production**, **never under Do-Not-Track**, and no-ops until `GOATCOUNTER_CODE` is set (so it's fully inert by default). Tracks a pageview on load plus a `pray/<set>` event when a prayer set is opened (`track()` in `Rosary.startSet`). A localized privacy note appears in the About panel once configured. Provider-agnostic call site, so swapping tools later changes only this file.
- **About panel** — an info button at the foot of the start screen opens a themed modal with the app name, version, a short description, and a creator/contact section (Escape or backdrop click to close); localized in all 5 locales. The version is injected at build time via a Vite `define` (`__APP_VERSION__`); creator name + contact are set in `AboutDialog.tsx` (contact line hidden until filled). New `src/rosary/AboutDialog.tsx`.
- **Litany of the Most Sacred Heart of Jesus** (Litaníæ Sacratíssimi Cordis Iesu) added to the Litaníæ group — full 33 invocations + Agnus Dei + versicle + collect. Czech sourced verbatim from the ČBK Kancionál (065); Latin is the canonical 1899 text (cross-checked against EWTN / Sancta Missa, rule-pointed; fetch tools blocked verbatim reproduction). `LITANY_SACRED_HEART` type + `LITANIES` entry — no UI changes, as designed.
- **Litany of Loreto** (Litaníæ Lauretánæ) in a new collapsible **"Litaníæ"** group on the start screen — same single-prayer model as Orationes utilissimæ, with a new `LITANIES` / `LitanyKey` registry that's extensible for more litanies. Full current (2020) invocation set + Agnus Dei + the default ending and **three seasonal endings** (Advent / Christmas / Easter) as red rubrics. Latin sourced from en.wikipedia (rule-pointed); Czech from the ČBK Kancionál (067) with the three 2020 invocations (*Matko milosrdenství / naděje / Útěcho migrujících*) slotted into their official spots. The menu's accordion was generalized into a reusable `CollapsiblePrayers` (title + entries), now used for both groups.
- **Red liturgical rubrics** in prayer text: `{r}…{/r}` markup in a prayer body renders in a missal-style red (new `--rubric` theme token, light + dark), parsed in `PrayerCard`. Used for the seasonal labels in Alma Redemptóris.
- **Ave Regína Cælórum** (Marian antiphon, Candlemas → Holy Week) added to the Orationes utilissimæ group — Latin + Czech (rhymed) from cs.wikipedia.org/wiki/Ave_Regina_caelorum, plus its versicle + *Orémus* collect (canonical Latin; Czech collect is our translation). Completes the four seasonal Marian antiphons (with Salve Regína, Regína Cæli, Alma Redemptóris). Latin pointing is rule-derived (verified), as no pointed source is online.
- **Alma Redemptóris Mater** (Marian antiphon, Advent → Candlemas) added to the Orationes utilissimæ group — antiphon Latin (accents matched to en.wikipedia's pointed text) + Czech (official liturgical translation), plus **both** seasonal versicle + *Orémus* collects (Advent and Christmas→Candlemas) with the season labels as red rubrics. Collects are canonical Latin; the Advent Czech reuses the sourced Angelus text, the post-Christmas Czech collect is our translation. Source: cs.wikipedia.org/wiki/Alma_Redemptoris_Mater.
- **Symbolum Athanasiánum** (the Athanasian Creed / *Quicumque*) added to the Orationes utilissimæ group — full Latin + Czech, split into the creed's three sections. New `ATHANASIAN_CREED` prayer type. Source: cs.wikipedia.org/wiki/Vyznání_Quicumque (Latin rendered in the app's pointed `æ`/`œ` orthography to match the other creeds; Czech verbatim).
- **Tests + CI.** A Vitest suite (`src/rosary/prayers.test.ts`, `vitest.config.ts`, `npm test`) asserts the data invariants — `PRAYERS`/`PRAYERS_CS` key parity, every prayer in every set resolves to non-empty Latin **and** Czech text, the rosary's 74-step structure + exact `beadId` set, and one step per ordinary prayer. New `.github/workflows/ci.yml` runs typecheck → test → build on push/PR.

### Changed
- **Litanies now read like a printed litany book** instead of one centered block: left-aligned, one invocation per line, with the repeated response (the part after the final comma — *ora pro nobis*, *miserére nobis*, *oroduj za nás*…) set in italic. Versicle/response lines (℣/℟), the *Orémus* / *Modleme se* collect, and the seasonal red rubric labels keep their normal styling. Applies automatically to any `LITANY_*` prayer (`renderLitany` in `PrayerCard`).
- Localized the last three hardcoded-Czech aria labels (`PrayerSections` group + jump, `PrayerCard` language picker) via new `i18n` strings, so screen-reader labels follow the chosen UI language in all 5 locales.
- Stopped tagging the Latin prayer body with `lang="la"`: it triggers EB Garamond's Latin localized forms (`locl`), rendering u→v (Roman style), and `font-feature-settings: "locl" 0` does **not** reliably suppress a language-triggered feature on mobile (Safari ignores it). Latin is now left untagged so modern ecclesiastical Latin keeps its u (`Iesus`, not `Iesvs`); only the translation is `lang`-tagged (the UI locale).

### Fixed
- Long prayers (the Creeds, Decalogue, Salve Regína + collect — especially at large font sizes) could be clipped at the top and unscrollable: the prayer area centered content with a flex auto-margin, which hides overflow above the fold. Reworked to a `min-height: 100%` centering wrapper inside the scroll container, so short prayers stay centered while long ones scroll from the top.

## [0.6.0]

### Added
- **"Orationes utilissimæ" group** on the start screen (under the "Other Latin prayers" heading, above Orationes Leonis): a collapsible card that rolls down small links to standalone single prayers (sorted alphabetically by name). Populated from `orationes.pdf`, `angelus-domini-anima-christi.pdf`, and `regina-caeli-anima-christi.pdf` (Latin + Czech): Signum Crucis, Pater Noster, Ave María, Gloria Patri, Symbolum Apostolórum, Symbolum Nicænum, Salve Regína, Sub tuum præsídium, Angelus Dómini, Regína Cæli, Ánima Christi, Angele Dei, Sancte Míchael, Pro defunctis (Réquiem), Decálogus. New `ORDINARY_PRAYERS` registry + `OrdinaryPrayerKey` in `sequence.ts` (existing prayers reuse their type; new ones — Nicene Creed, Sub tuum, Angele Dei, Réquiem, Decalogue — added to `prayers.ts`); each entry builds a one-step sequence. Adds a third prayer-set `kind` (`single`) in `Rosary.tsx` that renders no bead ring / section stepper / progress bar — just the label chip + prayer card. Not persisted.
- **Dark mode.** Neutral colors moved to light/dark CSS custom-property tokens in `index.css`; components reference them as `var(--…)`, so the palette flips by toggling `data-theme` on `<html>`. New `src/rosary/theme.ts` (preference under `ruzenec_theme`, defaults to the OS setting, follows OS changes until the user picks) + an anti-FOUC inline script in `index.html` that sets the theme before first paint. Sun/moon toggle on the start screen (top-left, mirroring the language picker). Mystery accents stay liturgical; dark accents are lightened (`accentText`) only where used as text on the dark card (highlighted clause, label chip) so they stay legible. Localized toggle aria label for all 5 locales.

## [0.5.0] - 2026-06-05

### Added
- **Seven Prayers of St. Bridget** (twelve-year devotion honoring the seven sheddings of the Precious Blood) as a new entry in the "Other Latin prayers" block. Opening prayer + 7 sheddings, each: meditation prayer + Pater Noster + Ave María (22 steps, 8-node section ring). New `brigit` key in `OTHER_PRAYER_SETS` + `buildBrigitPrayers()`, and eight `BRIGIT_*` prayer types in `prayers.ts`. **The meditation texts (Latin and Czech) are our own faithful translation, not a sourced edition** — this devotion has no stable authoritative Latin original; the divergence is flagged in code above the `BRIGIT_*` entries so the text can be replaced verbatim if a trustworthy booklet is obtained.
- **Prayer-text size setting**: a compact "Aa" button in the header opens a popover with smaller-A / bigger-A nudge buttons that step the prayer-body text through a bounded scale (the popover stays open for repeated taps; buttons disable at the min/max). The choice persists under its own `localStorage` key (`ruzenec_font_size`, a numeric step index), survives reloads and applies to every prayer set. New `src/rosary/fontSize.ts` (bounded step model + `fontSizeClamp()` + load/save) and `src/rosary/FontSizeControl.tsx`; only the prayer body rescales, UI chrome stays fixed. Localized aria labels added for all 5 locales.

### Changed
- **Unified all prayer texts to a single Latin orthography (Leonine "I" style: `Iesus` / `María` / `lacrymárum` / `Evæ` / `eius` / `baiulávit`).** The Ave María and the Salve Regína antiphon, which previously had two diverging copies (rosary vs. Leonine), are now each a single shared source: `getHailMary`/`getHailMaryCs` serve both the rosary decades and the Leonine prayers (the Leonine Ave passes no mystery clause), and `SALVE_REGINA_ANTIPHON`(`_CS`) backs both `SALVE_REGINA` (which appends the rosary's Orémus collect) and `SALVE_REGINA_LEONINE`. Removed the now-redundant `HAIL_MARY_LEONINE` prayer type; the Leonine Ave María reuses `HAIL_MARY`. Bead/sequence structure is unchanged, so `STATE_VERSION` stays at 3.
- `PrayerSections` (the stepper for linear prayer sets) is now a **compact horizontal bead strand** styled like the rosary's beaded string instead of large labeled pills: one bead per prayer on a faint thread, **no text labels** (the current prayer's name already shows in the chip above the card). Active bead glows in the accent color, traversed beads + thread tint, future beads stay muted. Section-start beads (each St. Bridget shedding's meditation, every Leonine prayer) are larger and tappable to jump; the sub-step Pater Noster / Ave María beads are small and inert — so a shedding reads as one big bead followed by two small ones, like a rosary decade. Replaces the oversized 360px circular layout.

## [0.4.0] - 2026-05-17

### Added
- "Další latinské modlitby" block on the start screen, separate from the rosary. First entry: **Orationes Leonis XIII** (Modlitby Lva XIII., post-Mass Leonine prayers) with full Latin + Czech texts sourced from `orationes-leonis-xiii.pdf`. Adds `HAIL_MARY_LEONINE`, `SALVE_REGINA_LEONINE`, `LEONINE_OREMUS`, `ST_MICHAEL`, `COR_IESU` to `PRAYER_TYPES`, plus an `OTHER_PRAYER_SETS` registry in `sequence.ts` and `buildLeoninePrayers()`.
- Generalized prayer-set dispatch in `Rosary.tsx`: `PrayerSetKey = MysteryKey | OtherPrayerKey`, `getPrayerSetMeta()` and `buildSequence()` route by kind. The rosary still uses `buildRosarySequence` + bead ring; linear sets use the new sequence builder + `PrayerSections` stepper.
- `PrayerSections` (new component): horizontal segmented stepper above the prayer card showing the prayer's sections. Current section filled in the accent color, completed sections tinted, future sections muted; tap a segment to jump to its first step. Replaces the bead ring for linear (non-rosary) prayer sets.
- `section?: string` on `SequenceItem` — drives the stepper. Leonine Prayers split into 5 sections: "Ave María" (3 Aves), "Salve Regína", "Orémus", "S. Míchael", "Cor Iesu" (×3).
- Localized "Other Latin prayers" heading on the start screen for all 5 supported locales (`otherPrayersHeading` in `i18n.ts`), plus `startPrayerAria` for the new buttons.

### Changed
- The horizontal progress bar at the top is now rosary-only. Linear prayer sets show the section stepper instead.
- `localStorage` persistence is now scoped to rosary sessions only — starting a Leonine prayer doesn't save; reloading mid-prayer drops back to the menu (intentional, since these sets are short).
- Header title is always Latin (`lang="la"`) regardless of UI locale, to match the prayer text on the card.

## [0.3.0] - 2026-05-15

### Added
- Czech counterparts for every Latin prayer text (`PRAYERS_CS`, `getHailMaryCs` in `src/rosary/prayers.ts`, plus `mysteriesCs` on each `MysterySet`). The opening trio's `fidem` / `spem` / `caritátem` clauses get Czech equivalents stamped onto sequence items via `mysteryCs`.
- `LA` / `CZ` select in the top-right of the prayer card to switch the prayer body between Latin and Czech. Clicks on the select don't propagate to the card's advance-on-tap handler.

## [0.2.1] - 2026-05-14

### Fixed
- Removed lang="la" from `PrayerBody`. It causes to replace u with v as if in ancient Latin, but we use ecclestical latin and this is not desired. 

## [0.2.0] - 2026-05-14

### Added
- UI localization (`src/rosary/i18n.ts`): Czech, English, Slovak, German, Polish. Default locale auto-detected from `navigator.language`; user can override via a flag dropdown on the start screen (custom button + listbox, outside-click + Escape to close). Choice persists to `localStorage` (`ruzenec_locale`). Latin prayer texts and mystery clauses are untouched.
- Inline SVG flags for the picker (`src/rosary/Flag.tsx`) — CZ, GB, SK, DE, PL at a uniform 24×16 viewBox. Slovak shield is retained so it doesn't read as the Russian tricolor.
- Tap any Pater Noster bead (tail or ring) to jump straight to that point in the rosary.
- Accessibility: `role="img"` + step count on the rosary SVG, `aria-live="polite"` region around the prayer card, `lang="la"` on prayer text, `aria-label`s on nav / back / mystery-selection buttons, decorative SVGs marked `aria-hidden`, bottom navigation wrapped in `<nav>`.
- Confirmation prompt before the header back button discards mid-rosary progress.
- TypeScript in strict mode across the project (`tsconfig.app.json` + `tsconfig.node.json`); all source files migrated to `.ts` / `.tsx`. Exported types: `MysteryKey`, `MysterySet`, `PrayerType`, `StaticPrayerType`, `HailMary`, `SequenceItem`, `SavedState`. `npm run typecheck` runs `tsc -b --noEmit`; `npm run build` now type-checks first.

### Changed
- Source split into `src/rosary/` modules: `prayers`, `sequence`, `storage`, `RosaryBeads`, `PrayerCard`, `MysteryMenu`. `Ruzenec.jsx` renamed to `src/Rosary.tsx` and shrunk to a ~300-line orchestrator.
- Bead layout is now driven by a `beadId` on each sequence item and a `beadId → seqIdx` map in `RosaryBeads`; the old magic-number index arithmetic (`7 + d*13`, tail `idx 1..5`, etc.) is gone.
- Top progress bar height bumped from 3px to 7px so it's actually visible.
- Header + progress bar are now wrapped in a single `position: sticky` container so the progress indicator stays pinned to the top of the viewport regardless of scroll position.
- Prayer screen is now strictly viewport-bounded: outer container uses `height: 100dvh` + `overflow: hidden`, and the scrolling middle section has `min-height: 0` so accumulated paddings can't push the layout past the viewport.
- Service-worker cache name is stamped at build time as `ruzenec-<pkg.version>-<build-id>` (Vite plugin in `vite.config.ts`), so each production build gets its own cache bucket and stale assets are dropped on activate.

## [0.1.0] - 2026-05-09

### Added
- Latin rosary prayers (Signum Crucis, Credo, Pater Noster, Ave Maria, Gloria Patri, O mi Jesu, Salve Regina with versicle/response and Orémus) sourced from `Posvátný růženec latinsko – česky.pdf`.
- Three traditional mystery insertions in the opening Hail Marys (`qui adaúgeat nobis fidem` / `corróboret nobis spem` / `perfíciat nobis caritátem`).
- Fatima prayer (O mi Jesu) after each decade's Gloria Patri.
- Sign of the Cross at the very start and very end of the rosary; cross icon in the SVG glows when this prayer is active.
- PWA: `manifest.webmanifest`, service worker (`sw.js`), full-rosary SVG icon, install/offline support.
- Keep-screen-on via the Wake Lock API while a rosary is in progress.
- Mobile interactions: tap the prayer card to advance, swipe right/left to go back/forward, haptic tick (`navigator.vibrate`) on every step.
- Keyboard navigation (`←` / `→` / `Space` / `Enter`).
- Configurable deploy sub-path via `BASE_PATH` env var (e.g. `BASE_PATH=/latin-rosary/`); manifest, icons, and SW registration all derive from it.
- `.gitignore`, `.env.example`.

### Changed
- Prayer text font: EB Garamond (Adobe Garamond Pro alike) for prayer body only; UI chrome stays in Arial.
- Prayer texts collapsed to single paragraphs so the browser handles wrapping; Salve Regina keeps its three real sections (main prayer / versicle+response / Orémus).
- SVG rosary visualization: 5 Pater Noster + 50 Ave Maria beads on the ring with a single uniform inter-decade gap; first Pater Noster sits exactly at the tail junction.
- Saved-state versioning (`STATE_VERSION`) so structural changes invalidate stale `localStorage` entries cleanly.
- Mobile spacing tightened across the prayer screen (paddings, margins, prayer card).

### Removed
- Mystery announcement step ("MYSTERIUM 1." card before each Pater Noster) — the mystery is still inserted in each Hail Mary.
- Mid-screen step counter (the SVG rosary's active bead and the top progress bar already indicate position).
- "Rozjímej o tomto tajemství..." meditation prompt.
