# Umhlanga Jewish Centre website

Plain HTML, CSS and JS. Open the folder in VS Code and preview with the Live Server extension.

## Pages
| File | Page |
|---|---|
| `index.html` | Home: live Shabbat times, service times, quick links, programmes |
| `about.html` | About us: story, rabbi and team, campus |
| `lifecycle.html` | Life cycle overview (births, bar/bat mitzvah, weddings, bereavement) |
| `bar-mitzvah.html` | Bar Mitzvah booking info (under the Life cycle dropdown) |
| `bat-mitzvah.html` | Bat Mitzvah booking info (under the Life cycle dropdown) |
| `commemoration.html` | Yahrzeit, Kaddish, memorial plaques, dedications, Yizkor |
| `gallery.html` | Photo gallery (tap a photo to enlarge) |
| `donate.html` | Zapper, card and EFT |
| `contact.html` | Address, numbers, map, office hours |

The header, footer and WhatsApp bubble are copied into every page, so if you change one, change them all (VS Code: Ctrl+Shift+H to find and replace across files).

## Filling in the gaps
Every missing detail is in a gold dashed box. In VS Code, search all files (Ctrl+Shift+F) for `info-needed` to find them. Replace the box with the real content.

Also replace `27000000000` (the WhatsApp number) everywhere with the UJC cellphone number in international format, e.g. 082 123 4567 becomes `27821234567`.

## Images to add (in `images/`)
- `logo.png`, `hero.jpg`, `zapper-qr.png`
- `campus-shul.jpg`, `campus-school.jpg`, `campus-mikveh.jpg`, `campus-library.jpg`
- `team-rabbi.jpg` etc. for the About page
- `gallery/gallery-01.jpg` to `gallery-09.jpg`
