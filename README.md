# Hunter Seriph App

This is my Android app. It's got my Twitch stream, my YouTube videos, my merch store, the dev logs for what I'm working on, and the games I've been making, all in the black and red look I use everywhere else.

## Install it

1. Go to the **Releases** page on the right side of this repo.
2. Open the newest release on your Android phone and download **Hunter-Seriph.apk**.
3. Tap it to install. Android will probably ask you to allow installs from your browser, so say yes.

It's an Android app only for now, and it's a direct download rather than something from the Play Store.

## What's in it

- **Live:** watch my Twitch stream and chat without leaving the app
- **Videos:** my latest YouTube uploads
- **Games:** the games I make, which all work offline
- **Projects:** dev logs and updates on what I'm building
- **Shop:** my Fourthwall merch

## Coding used

The whole app is plain HTML, CSS and JS in `www/`, wrapped into an Android app with Capacitor. The games are in `www/games/`. A GitHub Action builds the APK every time something is pushed. You can also run it by hand from the **Actions** tab.

There are no API keys or secrets in this repo or in the app. Twitch uses their public embeds and YouTube comes from my channel's public feed.

## Find me

- YouTube: [@hunterseriph](https://youtube.com/@hunterseriph)
- Twitch: [hunterseriph](https://twitch.tv/hunterseriph)
- Merch: [hunter-seriph-shop.fourthwall.com](https://hunter-seriph-shop.fourthwall.com)
