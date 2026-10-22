# Hunter Seriph app (Android)

Twitch live, YouTube videos, five in-app games, project update logs and the merch store, all in the dark gothic look.

## Get the APK

1. Open the **Actions** tab of this repo and run **Build Android APK** (it also runs on every push).
2. When it finishes (about 5-10 minutes), open **Releases** on the repo home page.
3. On your Android phone, open the newest release and tap **Hunter-Seriph.apk**. Allow "install unknown apps" for your browser if asked.

## How it works

- `www/` is the whole app (plain HTML/CSS/JS). Edit it and push, and a new APK is built.
- Capacitor wraps `www/` into an Android app. The Android project is generated fresh by the workflow, so nothing Android-specific is kept in the repo.
- Games are in `www/games/` and run offline.
- Twitch live uses Twitch's public player and chat embeds. YouTube videos come from your channel's public RSS feed. No API keys or secrets are used anywhere in the app.
- Icon sources are in `resources/`; fonts are fetched from npm during the build.

The APK is a "debug" build: fine for installing on your own phone and sharing directly. A Google Play release needs a signing key, which we can add later.
