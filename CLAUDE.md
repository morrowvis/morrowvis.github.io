# Morrowind Visualisation Project — site notes

Static site, hosted on **GitHub Pages** (`morrowvis.com`). No build step, no
server, no framework. Plain HTML/CSS/JS.

## Architecture

- **Shared nav + footer** are injected client-side by `nav.js` into
  `<div id="navbarMount">` / `<div id="footerMount">`. Each page sets
  `window.SITE_BASE` (path back to root) and `data-page` on `<body>`.
- **Because injection is client-side, anything a link-preview scraper or search
  engine must see has to be real HTML in the page** — `<title>`, `<meta>`, og
  tags. JS-injected tags are invisible to them. That's also why every page
  repeats its own og tags rather than sharing them.
- Pages use extension-less, directory-index URLs (`/download`, `/documentation/`).
- Doc pages (`documentation/*/`) load `doc-sidebar.js` and a per-page `*-data.js`.

## Responsive breakpoints (keep these consistent)

- **1024px** (+ short-landscape `(orientation: landscape) and (max-height: 500px)`):
  navbar → burger, doc sidebar → drawer, credit grid → 1 column.
- **1400px**: docked doc content stays constrained; below it goes full-width via
  the drawer. (Two separate doc media blocks — the 1400 one must come *before*
  the 1024 one; order is load-bearing.)
- **600px**: phone padding reductions.
- `nav.js` has a `matchMedia('(max-width: 1024px), ...)` query that **must match
  the CSS navbar breakpoint string exactly** — it resets menu state on resize.

## Cascade order is load-bearing in a few places

Equal-specificity rules where the later one must win — don't reorder:
- `.credits-panel h2/h3` scroll-margin (175/110px) sits after `.doc-content h3`.
- The `body[data-page=home/tools] ... nav-links > li > a` black-hover rules.
- `.lightbox.is-loading` / nav rules in the gallery block.

## Gallery

Pipeline lives in the **separate** repo/folder
`E:\Work\Websites\morrowvis.com\` (`build_gallery.bat` + `build_gallery.ps1`,
IrfanView engine).

- Drop images in `E:\Work\Websites\morrowvis.com\Gallery`, run the bat.
- It writes into `gallery/`: `full/` (originals; JPGs copied byte-for-byte, PNGs
  converted), `thumbs/` (1600px), and `gallery-data.js` (the manifest).
- **`gallery/index.html` and `gallery/gallery.js` are hand-written and live in
  that same folder.** The clean step only wipes `full/` and `thumbs/` — never the
  folder root. Don't widen it.
- Re-run the bat after adding/removing images; nothing auto-discovers files
  (static host has no directory listing).
- The manifest declares a global `const GALLERY`, so **one gallery per page**.
- Gallery is unlisted (`noindex`, not in nav) but shareable.

## Credits colour sweep (documentation/credits/index.html)

Panel tints are computed in the page's own script as one continuous hue sweep
(yellow → slate), sampled from `screenshots/Overview.jpg` (via `HUE_START` etc.).
It re-flows automatically as groups are added/removed.

**Trap:** `.doc-nav-card--credits` in `style.css` hardcodes the sweep's *start*
colour (`rgba(171,137,32,...)`) so the doc-index card previews the credits page.
It is derived-but-not-linked — if you retune the sweep constants, re-derive it.

## Conventions

- Page `<title>` format: `Page - Morrowind Visualisation Project` (dash, not pipe).
  Homepage is the bare brand name.
- `images/og-image.jpg` is the shared link-preview image (a 2400×1260 crop of
  Overview.jpg). Regenerate with the small PIL script if the source changes.
- Comments: one line max for inline notes; short file headers are fine.
- Hero images live in `images/hero-*.jpg` (copies of screenshots, page-named).

## Known issue

Hero images are **4–17 MB each** (originals, 3839px wide). This is the biggest
outstanding perf problem. Not yet optimised because the owner wants full-res.
