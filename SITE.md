# SITE.md — sintijadance.lv

The agent's map for this repo. Read this first, every job. This is a single-page **Eleventy (11ty)** site: edit `src/`, the build generates `_site/`, which is what Cloudflare Pages serves. Mirrors the proven structured-source setup at `resonatekit-web`.

## Build
- Install: `npm ci` (or `npm install`)
- Build: `npm run build`  (Eleventy, `src/` → `_site/`)
- Output served to Pages: `_site/`
- **NEVER edit files in `_site/`** — they are generated. Edit `src/` only.

## Single source of truth — edit these, the build propagates
| To change…                                  | Edit this file                  |
|---------------------------------------------|---------------------------------|
| Brand name / email / phone / location / Instagram / colors | `src/_data/site.json` |
| Navigation / mobile menu                    | `src/_includes/nav.njk`         |
| Footer                                      | `src/_includes/footer.njk`      |
| Everything else (all page sections + JS)    | `src/index.njk`                 |

## Layout
- `src/index.njk` is the whole page, copied VERBATIM from the original flat `index.html` with only two swaps: the `<nav>` → `{% include "nav.njk" %}` and the `<footer>` → `{% include "footer.njk" %}`. Everything else (head, Tailwind CDN + config, all sections, all inline `<script>`, all forms) is byte-identical.
- **Heavily interactive — keep the inline JS in `src/index.njk` intact.** It powers: mobile menu (`#menu-btn`/`#menu`), reveal-on-scroll, the klātiene class cards (`openKlatiene`/`closeKlatiene`/`toggleSolo`), the program cards (`openCourse`/`closeEnquiry`), the podcast carousel (`scrollPodcast`), and the Web3Forms enquiry + gift-card submit handlers. The mobile-menu and card ids/handlers live in `nav.njk` + `index.njk` and must stay in sync.

## Section ids (single-page anchors)
`#top` (hero), `#klatiene` (in-person classes), `#programmas` (online programs + enquiry form), `#trenere` (coach), `#podkasts` (podcast carousel), `#atsauksmes` (testimonials), `#instagram`, `#davanu` (gift cards), `#kontakti` (contact). Nav links point to these.

## Assets / images
- Images live in `src/static/images/` and are passthrough-copied to **`/images/`** (the page references them as relative `images/x.jpg`, which resolves to `/images/x.jpg` at site root).
- `favicon.svg` + `favicon-180.png` live in `src/static/` → copied to site root (`/favicon.svg`, `/favicon-180.png`).
- `src/assets/_original/` holds the full-resolution source photos + spare/unreferenced originals (~160MB: the `121022-*.jpg` shoot, raw `Hero`/`Bali`/`trenere`, `stiepsanas.*`, `vingrosana.*`, `balets.jpg`). These are a stash, NOT referenced by the page, and are **intentionally NOT shipped** — `.eleventy.js` does not passthrough-copy `src/assets`. Re-enable that line only if a page starts referencing `/assets/*`.

## Forms
Both forms (program enquiry in `#programmas`, gift card in `#davanu`) post to Web3Forms with access key `9ea0f0c5-...` (in the inline JS); submissions e-mail `sdfinfo8@gmail.com`. No backend.

## Deploy
- `git push main` → GitHub Actions (`.github/workflows/deploy.yml`) → `npm ci && npx @11ty/eleventy && wrangler pages deploy _site/` → Cloudflare Pages.
- **The Pages project name is the PLACEHOLDER `sintija-dance`** in `deploy.yml`. It MUST match the real Cloudflare Pages project name once that project is created (update `deploy.yml` if you name it differently). Repo secrets needed: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
- Tailwind is via CDN — no CSS build step.

## Known follow-ups (not yet done — good "one-line edit" candidates)
This pass intentionally kept all cards/lists HARDCODED in `src/index.njk` for low risk. Future structured-source extractions (mirroring how resonatekit drives blog cards from `posts.json`):
- **Online program cards** (`#programmas`, 4 cards) + their `COURSES` JS object → `src/_data/programs.json` + a loop, so price/title/details edit in one place.
- **Klātiene class cards** (`#klatiene`, 6 cards) + the `KLATIENE` JS object → `src/_data/klatiene.json` + a loop.
- **Podcast episodes** (`#podkasts`, 10 hardcoded cards) → `src/_data/podcast.json` + a loop (each has YouTube id, title, ep number, optional Spotify link).
- **Instagram tiles** (`#instagram`, 5 hardcoded) → `src/_data/instagram.json`, or wire up the Behold.so live widget noted in the HTML comment.
