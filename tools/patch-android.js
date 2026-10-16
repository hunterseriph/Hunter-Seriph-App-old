// Runs after `npx cap add android`. Applies the app icon, dark splash/theme colours and
// status bar colours to the generated Android project.
const fs = require('fs'), path = require('path');
const res = path.join('android', 'app', 'src', 'main', 'res');
function write(p, t) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, t); }

// 1. icons
const iconRoot = path.join('resources', 'android');
for (const dir of fs.readdirSync(iconRoot)) {
  const from = path.join(iconRoot, dir), to = path.join(res, dir);
  if (!fs.statSync(from).isDirectory()) continue;
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) fs.copyFileSync(path.join(from, f), path.join(to, f));
}
write(path.join(res, 'values', 'hs_colors.xml'), '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n  <color name="hs_icon_bg">#0E0406</color>\n</resources>\n');
const adaptive = '<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n  <background android:drawable="@color/hs_icon_bg"/>\n  <foreground android:drawable="@mipmap/hs_foreground"/>\n</adaptive-icon>\n';
write(path.join(res, 'mipmap-anydpi-v26', 'ic_launcher.xml'), adaptive);
write(path.join(res, 'mipmap-anydpi-v26', 'ic_launcher_round.xml'), adaptive);

// 2. theme / splash
const stylesPath = path.join(res, 'values', 'styles.xml');
if (fs.existsSync(stylesPath)) {
  let s = fs.readFileSync(stylesPath, 'utf8');
  s = s.replace(/@drawable\/splash/g, '@color/hs_icon_bg');
  s = s.replace(/(<item name="windowSplashScreenBackground">)[^<]*(<\/item>)/g, '$1@color/hs_icon_bg$2');
  s = s.replace(/(<style name="AppTheme[^"]*"[^>]*>)/g, '$1\n        <item name="android:statusBarColor">@color/hs_icon_bg</item>\n        <item name="android:navigationBarColor">@color/hs_icon_bg</item>\n        <item name="android:windowOptOutEdgeToEdgeEnforcement">true</item>');
  fs.writeFileSync(stylesPath, s);
  console.log('styles.xml patched');
} else console.warn('WARNING: styles.xml not found');
// 3. let embedded Twitch/YouTube players share the sign-in cookie (needed for 18+ streams)
const javaDir = path.join('android', 'app', 'src', 'main', 'java', 'com', 'hunterseriph', 'app');
write(path.join(javaDir, 'MainActivity.java'), `package com.hunterseriph.app;

import android.os.Bundle;
import android.webkit.CookieManager;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CookieManager cm = CookieManager.getInstance();
        cm.setAcceptCookie(true);
        cm.setAcceptThirdPartyCookies(getBridge().getWebView(), true);
    }
    @Override
    public void onPause() {
        super.onPause();
        CookieManager.getInstance().flush();
    }
}
`);
console.log('android project patched');
