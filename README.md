# Hunter Seriph app (Android)

Twitch live, YouTube videos, Currently 4 in-app games, project update logs and the merch store, all in the Hunter Seriph look.


## How it works

- `www/` is the whole app (plain HTML/CSS/JS).
- Capacitor wraps `www/` into an Android app. The Android project is generated fresh by the workflow, so nothing Android-specific is kept in the repo.
- Games are in `www/games/` and run offline.
- Twitch live uses Twitch's public player and chat embeds. YouTube videos come from Youtubes public RSS feed. No API keys or secrets are used anywhere in the app.
- Icon sources are in `resources/`; fonts are fetched from npm during the build.

The APK is a "debug" build: fine for installing and sharing directly. A Google Play release needs a signing key, which I can add later.
