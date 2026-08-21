# LeakTech Waterproofing — Static Website

A fast, responsive, mobile-first static website built with **HTML, CSS and vanilla JavaScript** — no frameworks, no build step, no database. Ready to upload to any shared hosting (cPanel, FTP, Netlify, GitHub Pages, etc.).

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Contact | `contact.html` |

## Folder structure

```
leaktechwaterproofing/
├── index.html, about.html, services.html, projects.html, contact.html
├── css/
│   └── styles.css          # All styles (design tokens at the top)
├── js/
│   └── main.js             # Nav toggle, lightbox, FAQ accordion, quote form
├── assets/
│   ├── logo.svg            # Brand logo
│   ├── favicon.svg         # Browser tab icon
│   ├── hero-pattern.svg    # Subtle hero background
│   ├── og-image.svg        # Social share image
│   └── gallery-1 … 8.svg   # Gallery / project illustrations
├── robots.txt
├── sitemap.xml
└── .htaccess               # Apache compression + caching (optional)
```

## Features

- **Responsive & mobile-first** — works from small phones up to wide desktops.
- **Accessible** — semantic HTML5, skip link, ARIA labels, keyboard-navigable nav/lightbox/FAQ, focus styles, `prefers-reduced-motion` support.
- **SEO** — unique `<title>`, meta description, canonical, `robots.txt`, `sitemap.xml`, and JSON-LD `LocalBusiness` structured data on the home and contact pages.
- **Open Graph / Twitter cards** — social share previews on every page.
- **Quote request form** — client-side validation; on submit it opens the visitor's email app pre-filled to `leaktechwaterworx@gmail.com` (no backend needed). Shows a confirmation message.
- **Image gallery with lightbox** — click to enlarge, arrow-key + Esc support.
- **Prominent contact actions** — top bar, header "Call Now" button, sticky floating call button on mobile, repeated CTAs.
- **Google Maps** — embedded on the Contact page (no API key required).
- **Fast loading** — tiny SVG assets, deferred JS, preloaded CSS, gzip + caching via `.htaccess`.

## Before you go live

1. **Update the domain** — search-and-replace `https://leaktechwaterproofing.co.za/` across the HTML files, `robots.txt` and `sitemap.xml` with your real domain.
2. **Replace placeholder images** — the gallery SVGs are illustrations. Swap the files in `assets/` for real project photos (JPG/WebP recommended for photos). Keep the same filenames, or update the `<img src>` and `data-full` attributes in `projects.html` / `index.html`.
   - If you switch to raster photos, also update the `og:image` meta tags to a 1200×630 PNG/JPG (SVG OG images aren't rendered by all social platforms).
3. **Quote form** — the form currently sends via the visitor's email app (`mailto:`). If your host supports PHP or a form service (Formspree, Netlify Forms, etc.), point the form action there instead and remove the `mailto` fallback in `js/main.js`.
4. **Verify the map** — the Contact map queries the street address. Confirm it shows the correct pin, or replace the `src` with a Google Maps "Share → Embed a map" iframe.

## How to upload (shared hosting / cPanel)

1. Zip the **contents** of this folder (not the folder itself) and upload via cPanel File Manager, or connect via FTP and copy everything into `public_html/`.
2. Ensure `index.html` is at the root of `public_html/`.
3. Visit your domain — the site should load immediately.

## Local preview

Just open `index.html` in a browser. For the map and some browser features to work correctly, serve via a tiny local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---
LeakTech Waterproofing — Waterproofing • Painting • Roofing
Quality workmanship you can trust. Your property. Our protection.