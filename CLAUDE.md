# Hunter Seriph App: notes for Claude

The Android app (and Windows PC version) for Hunter Seriph, a Souls-like YouTuber and Twitch streamer. Tabs: Home, Live, Videos, Games, Projects, Shop. Plain HTML/CSS/JS in `www/`, wrapped with Capacitor 7 for Android and Electron (`desktop/`) for PC.

## Working with Hunter
- He is a beginner. He tests on a real Android phone and on PC, and sends screenshots. Those are the most reliable bug reports.
- Claude pushes straight to `main`. Every push runs `.github/workflows/build-apk.yml`, which publishes a release `build-N` containing `Hunter-Seriph.apk` and `Hunter-Seriph-PC.exe` (portable, no install). If a push does not start a run, start it with `gh workflow run build-apk.yml --ref main`.
- Deliver like this: one line on what you are about to do, quiet work, then a few sentences on what changed and what you could not verify. Never claim something works on his phone or PC unless you saw it. Say "tested in desktop Chromium" instead.
- Content he asks to be put in the app goes in the app. Do not just reply with it.
- Dev logs and the README are written in his own first-person voice, never AI-sounding.
- British spelling in game text: armour, defence, colour.

## Never
- Never put the Twitch Client Secret or the YouTube API key anywhere: app, repo, APK, chat. Twitch uses public embeds, YouTube the public RSS feed.
- Never change the Capacitor hostname/scheme (`hunterseriph.app`, https) or the PC port (`localhost:47621`). Game saves live in localStorage under that origin; a new origin wipes them.
- Never change the signing key in `tools/patch-android.js`. Builds must install over the previous one.
- Never rename, soften or censor his names and quotes. They are deliberately rude (TB's Suck n' Fuck, Cum Café, Cumpuccino, Master Bates). Keep every quote exactly as written.

## Look and feel
- Dark gothic, black and blood red, hand-made and specific, never glossy or generic. His first web version "looked too AI generated".
- His red moon banner is the art that feels most like him. Mascot: Cumhead (cream droplet in a gothic outfit), with Spermaid (droplet mermaid).
- Colours: background #070405, panel #0e0708, line #4a1a1c, red #c4121c, hot red #ff2630, bone #f1e7d0, ash #a6968f, gold #ffe36a for drops/tokens/highlights.
- Fonts: Pirata One for titles, Press Start 2P for pixel text in games, Archivo Narrow for the app body. Bundled offline by `tools/prepare.js` into `www/fonts/` (games link `../fonts/fonts.css`).
- New pixel art must match: dark outline (#12040a / rgb(42,5,9)), limited palette, no smooth gradients on sprites. Do not redraw a character he supplied in a different style.
- Menus fill the whole screen in portrait, landscape and desktop. In Cumheads Quest: shop screens show name and quote only; item rows show name and price only (descriptions on the quantity screen); reputation bars live in each row of the Characters list in Spermaid Sanctum (his layout).

## The games (`www/games/`)
- **Cumheads Quest** (`cumheads-quest.html`, ~750 KB, one file). Dragon Crystal style roguelike, 50 floors (60 deep, endless beyond). The original source folder is gone, so edit the HTML directly. Function declarations hoist and the textually last one wins; several are redefined on purpose, so grep for later definitions. Test hook: `window.__cq` (and `__cq.X`). Saves: `cq-meta`, `cq-opt`, `cq-save`. The run autosaves every 5 turns mid-floor (update 20 block), and dying wipes the save at once.
- **Load Legacy** (`load-legacy.html`). Rogue Legacy style, built on the Spermhog engine. **Do not edit the HTML**: edit `tools/load-legacy/src/*` and run `python3 tools/load-legacy/build.py`. Test hook: `window.__ll`. Saves: `ll-meta`, `ll-run`.
- **Cumhead the Spermhog** (`spermhog.html`, hook `window.__ch`), **Meatnado Escape**, **Spermaid Survivors**: edit directly.

## Lore and rules he fixed
- Cumheads Quest: only Cumhead is playable at first; others are hired at 100% reputation. Master Bates appears only in the dungeon behind secret walls; you leave him by the door or the stairs (closing his dialog must not push you down). The Sausage is Amy's weapon; the Meatnado Scroll drops that same item. Shop stock is fixed per run. Every shop uses the hub-style door. Leaderboard runs carry signed proof codes.
- Spermaid Survivors: only Spermaid. Journey to the Void (planned turn-based RPG): Cumhead and Spermaid together.
- Load Legacy: four heirs (Cumhead, Spermaid, Greebo, Homunculus). The first run is always Cumhead, then choose from two, never the heir who just went. Areas: castle (start), roof (up), dungeon (down), city (right). Bosses: Cum-starved Beast, Legion of Semen Demon, Brothers Load Piggy, Sperminator; then Blumhead from the starting room; 5 Blumhead wins unlocks Super Blumhead after him. Illusion walls hide alcoves and sparkle when you walk behind them. Greebo fires a big straight pie with half Cumhead's reach.

## Shop quotes (keep exact)
Joff's Pineapple Pizzaria "Pineapple belongs on pizza. Fight me." · T's Hussy House "Come in, darling. I'll get the doors." · Bonjo's BJ Boutique "Welcome, welcome. Let me get the door." · Greebo's Gourmet Goonery "Fresh cream pies. Don't ask what's in them." · Amy's Willy Chilli "Mild, hot or dynamite?" · Uncle Beeb's Tavern "Sit down, lad. First one's always warm." · PulsarOctopus Beats "Just vibes, friend. Free of charge." · Saba's Hitless Hemporium "Hitless runs only. Take a look, my friend." · TB's Suck n' Fuck "Sit. Stay a while. Don't mind the stains." · Kaya & Elden's Cum Café "Welcome in! Kaya's on the coffee, Elden's on the grill." · Potbelly Arcade "Cabinets are free, kid. Play all you like." · Spermaid's Sanctum Stall "Sweetie! Even down here I keep a little stall." · Jessiah's "An empty stomach makes a hollow man. Eat." · Nattyboro Enchanting "A blade without a bite is merely a stick." · Judgement Spells "Light or shadow. Both have a price." · Ali's Garlic Grub "Nuggets? Garlic bread? Everything is better with garlic." · Harold's Mad Tea Party "Potions? Tea? Same thing, really. Sit, sit!" · Stacked Fate's Table "The deck was never yours. Neither was your fate." · Master Bates Emporium "One must clear one's head before one proceeds."

## Recurring chores
- Dev logs: he pastes notes for his High School DxD New Fight revival and translation project. Rewrite them in first person and add a new DxD log section in `www/index.html`, updating the "OF N" counters and the Projects link list.
- Shop tab: 13 Fourthwall products hand-built in `index.html` with photos in `www/assets/shop/*.webp` (3:4 tiles). New products need a photo and a tile.
- Balance numbers in every game are guesses. Expect tweak requests.

## Open ideas
- Journey to the Void: named, not started.
- "Ejaculand": an older idea with no details. Ask him.
- Live Fourthwall catalogue (needs a public storefront token), a server-side leaderboard key, and a restyled YouTube player were offered but never requested.

## Testing
Headless Chromium via Playwright (preinstalled, `/opt/pw-browsers`; never run `playwright install`). Open games by `file://`, abort font requests, and check three sizes when touching UI: portrait 430x900 (touch), landscape 890x400, desktop 900x520. Look at the screenshots. For Cumheads Quest, set `G.state='play'` after scripted kills (a level-up menu otherwise covers screenshots). The PC build runs `electron . --smoke` in CI, which loads the app and every game and fails on script errors.
