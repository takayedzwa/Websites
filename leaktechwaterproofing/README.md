# LeakTech Waterproofing — Static Website

A fast, responsive, mobile-first static website built with **HTML, CSS and vanilla JavaScript** — no frameworks, no build step, no database. Ready to upload to any shared hosting (cPanel, FTP, Netlify, GitHub Pages, etc.).

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Projects | `projects.html` |
| Gallery | `gallery.html` |
| Contact | `contact.html` |

## Folder structure

```
leaktechwaterproofing/
├── index.html, about.html, services.html, projects.html, gallery.html, contact.html
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
│           ├── roof-*, interior-*, flat-roof-*, courtyard-*, backyard-*, home-front-* (jpg + webp) — featured on projects.html
│           └── site-work-* (jpg + webp) — additional on-site photos shown on gallery.html
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
- **Image gallery with lightbox** — click to enlarge, arrow-key + Esc support, WebP-with-JPEG-fallback served via `<picture>`, neighbours preloaded for instant navigation. Featured work lives on `projects.html`; additional on-site photos live on `gallery.html`.
- **Prominent contact actions** — top bar, header "Call Now" button, sticky floating call button on mobile, repeated CTAs.
- **Google Maps** — embedded on the Contact page (no API key required).
- **Fast loading** — WebP + JPEG photos via `<picture>`, deferred JS, preloaded CSS, gzip + caching via `.htaccess`.

## Before you go live

1. **Update the domain** — search-and-replace `https://leaktechwaterproofing.co.za/` across the HTML files, `robots.txt` and `sitemap.xml` with your real domain.
2. **Project photos** — the gallery, team strip, and split-media sections in `index.html`, `projects.html`, `services.html` and `about.html` use real JPG + WebP photos in `assets/images/`. Drop replacements into the same folders using the same kebab-case filenames (`roof-...`, `flat-roof-...`, `interior-...`, etc.) and the site will pick them up. The lightbox auto-prefers WebP on browsers that support it. Featured tiles live in `assets/images/projects/` (`roof-*`, `flat-roof-*`, `interior-*`); the broader `site-work-*` set powers the `gallery.html` page.
3. **Quote form** — the form is wired to [FormSubmit](https://formsubmit.co) (free, no account, no backend, ~50 submissions/month on the free tier with spam filtering). After the first submission you'll receive a one-time confirmation email; future submissions are forwarded directly to `info@leaktechwaterproofing.co.za`. To switch providers, replace the form's `action` attribute and the `_next` URL in `contact.html`.
4. **Verify the map** — the Contact map queries the street address. Confirm it shows the correct pin, or replace the `src` with a Google Maps "Share → Embed a map" iframe.

## How to upload to Elitehost (cPanel, from your Mac)

These steps upload the site **without installing any software** — everything happens in your browser using the Elitehost control panel.

### Before you start

Gather these from the Elitehost welcome email (sent when you signed up):

- **cPanel URL** — usually `https://cpanel.your-elitehost-server.co.za` or `https://elitehost.co.za:2083`. The exact URL is in the welcome email labelled "Control panel".
- **cPanel username** and **password** — same as your Elitehost account.
- **Domain** — confirm the domain you want the site to live on is pointed at Elitehost (the welcome email says "Nameservers" or "DNS"). If you bought the domain through Elitehost this is already done.

### Step 1 — Open cPanel File Manager

1. Open Safari (or any browser) and go to your cPanel URL.
2. Log in with the cPanel username and password.
3. Scroll to the **Files** section. Click **File Manager**.
4. In the top-right of File Manager, click **Settings** and tick **Show hidden files (dotfiles)** — this lets you see `.htaccess`, `robots.txt`, etc. Save.
5. In the left sidebar, double-click **`public_html`** to open it. This is your website's root folder.
   - If your account has multiple domains, you'll also see folders per domain. Use the **main** `public_html` if `leaktechwaterproofing.co.za` is the primary domain on the account; otherwise open the folder that matches your domain.

### Step 2 — Prepare your site for upload

In **Finder** on your Mac:

1. Open the `leaktechwaterproofing/` folder you have locally at `/Users/takayedzwagavaza/Work/Websites/leaktechwaterproofing/`.
2. Select everything **inside** the folder (the 5 HTML files, the `css/`, `js/`, `assets/`, plus `robots.txt`, `sitemap.xml`, `.htaccess`). **Do not select the parent folder itself.**
3. Right-click → **Compress N items**. macOS makes `Archive.zip` next to the files.

> Important: open the zip after creating it and confirm `index.html` is at the top level — not nested in a subfolder. If it is, your unzip on the server will put everything in a subdirectory and the site won't load at the root domain. Re-zip with just the contents.

### Step 3 — Upload the zip

1. Back in cPanel File Manager, inside `public_html`, click **Upload** in the top toolbar.
2. A new tab opens. Drag `Archive.zip` onto it, or click "Select File" and choose it.
3. Wait for the progress bar to finish. The file `Archive.zip` will appear in `public_html/`.
4. **Right-click** `Archive.zip` in File Manager → **Extract**.
5. Confirm the destination is `/home/<your-cpanel-user>/public_html` (it should be pre-filled). Click **Extract Files**.
6. After extraction, you should see `index.html` directly inside `public_html/`, alongside `css/`, `js/`, `assets/`, `robots.txt`, `sitemap.xml`, `.htaccess`.
7. **Delete** `Archive.zip` from the server (right-click → Delete) — leaving it there is harmless but tidier without it.

### Step 4 — First-visit sanity check

1. Open Safari and visit `http://leaktechwaterproofing.co.za` (use `http://` the first time — HTTPS gets configured in step 5).
2. You should see the home page with the logo, services, gallery and team strip.
3. Click a gallery image — the lightbox should open, keyboard arrows should navigate.
4. Visit `/contact.html` and submit a **test** quote request with your real email.
5. Check the inbox of `info@leaktechwaterproofing.co.za`. The first submission triggers a **confirmation email from FormSubmit** — click the confirmation link inside it **once**. After that, all real submissions land in your inbox automatically.

### Step 5 — Turn on HTTPS (free, recommended)

Elitehost includes free AutoSSL on most cPanel accounts:

1. In cPanel, scroll to **Security** → **SSL/TLS Status**.
2. Click **Run AutoSSL** for your domain. Wait 2–5 minutes.
3. Once active, in cPanel go to **Domains** → **Force HTTPS Redirect** for your domain — this redirects all `http://` traffic to `https://`.

After AutoSSL is active, change the site-internal links to HTTPS so the browser doesn't show a "mixed content" warning:

1. Open each of the 5 HTML files in your local copy.
2. Search-and-replace `http://leaktechwaterproofing.co.za` → `https://leaktechwaterproofing.co.za` (the canonical URL and OG/Twitter meta tags in `<head>`).
3. Re-zip and re-upload only the changed files (in File Manager you can just drag new files over the old ones — they'll overwrite).

### Optional — point a subdomain or add a redirect

- **Add `www.`** — in cPanel go to **Domains** → **Domains** and toggle "Redirect `leaktechwaterproofing.co.za` to `www.leaktechwaterproofing.co.za`" (or vice-versa), whichever matches your preference. Then update the canonical and OG tags to whichever you chose.
- **`/admin`, `/cpanel`, webmail** — these aren't part of the website. Elitehost's autoSSL certs and HTTP→HTTPS redirect don't affect them.

### Rolling back

If something goes wrong, your previous site is intact (or `public_html` was empty before upload, in which case there's nothing to break). To undo: in File Manager, delete the files you uploaded and re-upload the previous version's zip. Keep one local backup of each version before uploading.

## Local preview

Just open `index.html` in a browser. For the map and some browser features to work correctly, serve via a tiny local server:

```bash
cd /Users/takayedzwagavaza/Work/Websites/leaktechwaterproofing
python3 -m http.server 8000
# then visit http://localhost:8000
```

---
LeakTech Waterproofing — Waterproofing • Painting • Roofing
Quality workmanship you can trust. Your property. Our protection.