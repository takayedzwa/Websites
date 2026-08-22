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
│   ├── logo.svg            # Brand logo (SVG fallback kept)
│   ├── favicon.svg         # Browser tab icon
│   ├── hero-pattern.svg    # Subtle hero background
│   └── images/
│       ├── logo.jpeg + logo.webp          # Site logo (raster, used in headers/footers)
│       ├── team/                          # Team photos (raster)
│       │   ├── team-painting-crew.jpg / .webp
│       │   └── team-arrival-jackets.jpg / .webp
│       └── projects/                      # Project photos (raster)
│           └── roof-*, interior-*, flat-roof-*, courtyard-*, backyard-*, home-front-* (jpg + webp)
├── robots.txt
├── sitemap.xml
└── .htaccess               # Apache compression + caching (optional)
```

## Features

- **Responsive & mobile-first** — works from small phones up to wide desktops.
- **Accessible** — semantic HTML5, skip link, ARIA labels, keyboard-navigable nav/lightbox/FAQ, focus styles, `prefers-reduced-motion` support.
- **SEO** — unique `<title>`, meta description, canonical, `robots.txt`, `sitemap.xml`, and JSON-LD `LocalBusiness` structured data on the home and contact pages.
- **Open Graph / Twitter cards** — social share previews on every page.
- **Quote request form** — client-side validation; on submit the message is delivered to `info@leaktechwaterproofing.co.za` via [FormSubmit](https://formsubmit.co) (a free, no-account, no-backend service for static sites). After the first submission you'll be asked to confirm the email address once; everything after that goes straight through. The success box is shown both in-page and on the post-submit redirect back to `#thank-you`.
- **Working hours** — Mon–Sat 08:00–16:00. Surfaced in the topbar, footer, and a contact card; also published as `openingHoursSpecification` JSON-LD so search engines can show accurate hours.
- **Image gallery with lightbox** — click to enlarge, arrow-key + Esc support, WebP-with-JPEG-fallback served via `<picture>`, neighbours preloaded for instant navigation.
- **Prominent contact actions** — top bar, header "Call Now" button, sticky floating call button on mobile, repeated CTAs.
- **Google Maps** — embedded on the Contact page (no API key required).
- **Fast loading** — WebP + JPEG photos via `<picture>`, deferred JS, preloaded CSS, gzip + caching via `.htaccess`.

## Before you go live

1. **Update the domain** — search-and-replace `https://leaktechwaterproofing.co.za/` across the HTML files, `robots.txt` and `sitemap.xml` with your real domain.
2. **Project photos** — the gallery, team strip, and split-media sections in `index.html`, `projects.html`, `services.html` and `about.html` use real JPG + WebP photos in `assets/images/`. Drop replacements into the same folders using the same kebab-case filenames (`roof-...`, `flat-roof-...`, `interior-...`, etc.) and the site will pick them up. The lightbox auto-prefers WebP on browsers that support it.
3. **Quote form** — the form is wired to [FormSubmit](https://formsubmit.co) (free, no account, no backend, ~50 submissions/month on the free tier with spam filtering). After the first submission you'll receive a one-time confirmation email; future submissions are forwarded directly to `info@leaktechwaterproofing.co.za`. To switch providers, replace the form's `action` attribute and the `_next` URL in `contact.html`.
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