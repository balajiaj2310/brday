# 🎀 Dreamy Birthday Invitation Website

A static, mobile-first invitation site (HTML + CSS + vanilla JS). No build step, no paid services.

```
birthday-invitation/
├── index.html
├── css/style.css
├── js/config.js     ← ✏️ YOU EDIT THIS ONE
├── js/script.js
├── assets/images/   ← put your photos here
├── assets/music/    ← put your .mp3 here
└── README.md
```

## 1. Customise (only `js/config.js`)
Open `js/config.js`. Every line marked `← CHANGE ME` is yours:
name, age, tagline, intro paragraphs, event date/time/venue/map link, dress code,
the letter (wishes / memories / final message / signature / P.S.), surprise notes,
photo list, RSVP texts, music, wishes, thank-you text, button labels and theme colours.

- **Date format:** `"2026-12-20T18:00:00"` (YYYY-MM-DDTHH:MM:SS, 24-hour). Empty = countdown shows a friendly fallback.
- **Typewriter:** copy a sentence from your letter *exactly* into `letter.typewriter: ["..."]`.
- **Letter text** ships as placeholders — nothing about you is invented.

## 2. Add your photos
1. Copy images into `assets/images/` (JPG/PNG/WebP, ideally ≤ 1200 px wide, ≤ 300 KB each).
2. In `config.js`, edit the `photos` list: `src`, `caption` (or `""`), `size` (`sm`/`md`/`lg`), `tilt` (degrees).
3. Add or remove lines freely. Photos are square-cropped in the Polaroid frames.

## 3. Music
Copy an `.mp3` to `assets/music/`, set `music.file: "assets/music/yourfile.mp3"`.
Playback starts only when a guest taps play (browsers block autoplay, and it's kinder). Use only music you have the rights to share.
You can also set `music.playlistLink` to a Spotify/YouTube link (opens in a new tab; embedded playback isn't used).

## 4. RSVP & wishes — how replies reach you (important, honest version)
A static site has no server, so choose one:

| Option | Setup | Result |
|---|---|---|
| **WhatsApp** | `rsvp.whatsappNumber: "919876543210"` (country code + number, digits only) | After submitting, the guest taps a button that opens WhatsApp with the reply pre-written to you. Zero signup. |
| **Email form** | Create a free form at formspree.io (or web3forms.com), paste its URL in `rsvp.formEndpoint` | Replies arrive in your email automatically. |
| **Neither** | — | Reply is saved only on the guest's own device and the page *says so*. |

If both are set, the form endpoint is used. Wishes use the same route.

## 5. Run locally in VS Code
1. Install VS Code and the **Live Server** extension.
2. File → Open Folder → `birthday-invitation`.
3. Right-click `index.html` → **Open with Live Server**.
(Double-clicking `index.html` also works; only the Google Fonts need internet and fall back to system fonts offline.)

## 6. Publish free (shareable link)
**GitHub Pages**
1. Create a GitHub repo, upload the folder contents (so `index.html` is at the top level).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
3. After ~1 minute your link is `https://<username>.github.io/<repo>/`. Share it on WhatsApp/Instagram.

**Easiest alternative:** drag the folder onto **netlify.com/drop** or **Cloudflare Pages** for an instant URL.

## Limitations
- RSVP/wishes need option 4A or 4B to reach you.
- Music needs a visitor tap; large mp3s load slowly on mobile data (keep under ~4 MB).
- Fonts come from Google Fonts; offline they fall back gracefully.
- Previews on WhatsApp show the page title; for a custom preview image add an `og:image` tag in `index.html` once hosted.
