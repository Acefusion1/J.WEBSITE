# Umhlanga Jewish Centre website (redesign)

Plain HTML, CSS and JS. Open the folder in VS Code and use the Live Server extension to preview `index.html`.

## Structure
- `index.html` – the whole site (one page, sections linked from the menu)
- `css/style.css` – all styling; colours and fonts are at the top under `:root`
- `js/main.js` – mobile menu + live Shabbat times from Hebcal
- `images/` – already included: `favicon.svg`, `apple-touch-icon.png`, `og-image.jpg` (WhatsApp/Facebook link preview, 1200x630)
- `images/` – still to add (compress to WebP/JPG under ~200KB each, e.g. with squoosh.app):
  - `logo.png` – the UJC logo (from the current site)
  - `hero.jpg` – a wide photo of the shul or campus (sits behind the blue hero overlay)
  - `zapper-qr.png` – the Zapper donation QR code
  - `campus-shul.jpg`, `campus-school.jpg`, `campus-mikveh.jpg`, `campus-library.jpg` – landscape photos (about 1200x800) for the On campus section. Missing photos hide themselves.

## Before going live
- Confirm the service times with the UJC office (marked `TODO` in `index.html`)
- Confirm the regular programmes (Shabbat kiddush, Wednesday shiur, youth programme)
- Confirm the exact EFT account holder name
- If the UJC is a registered PBO, un-comment the Section 18A note in the donate section and add the NPO/PBO number in the footer
- Put the real Facebook/Instagram links in the footer (and a WhatsApp cellphone number if there is one)
- Check the `og:url` / `og:image` domain in the `<head>` matches the live site
