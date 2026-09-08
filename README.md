# Sagar Kumar Portfolio — Full-Stack & QA Automation Engineer

A modern, professional single-page-style portfolio running fully on **GitHub Pages**.
Themed around the **SDLC / engineering lifecycle** to showcase QA automation,
API testing, and CI/CD expertise alongside full-stack development.

## Features

- **Engineering Lifecycle themed** sections (Requirements → Design → Development → Testing → Deployment → Maintenance)
- **Terminal-style hero** with typewriter animation and live metrics
- **Dark / light theme** with toggle (dark by default)
- Reactive scroll-reveal animations and hover micro-interactions
- Projects, experience, skills (grouped by discipline), and blog
- **Admin panel** (localStorage-backed) to manage content live
- Contact form that saves messages for review in the admin panel

## How It Works

Static-only, runs fully in the browser:

- Public pages read data from localStorage (seeded from `defaultContent.js`).
- Admin panel updates localStorage directly.
- Uploaded images/resume are stored as data URLs in localStorage.
- Contact form submissions are saved in localStorage (current browser only).

## Important Limitation

Because this is static-only:

- Data is saved per browser/device.
- If user clears site storage, data resets.
- Updates are not shared globally unless you commit code changes and redeploy.

## Stack

- React + Vite + React Router (`BrowserRouter` with clean URLs; `404.html` SPA fallback for GitHub Pages)
- CSS animations + responsive layout (Space Grotesk, Source Sans 3, JetBrains Mono)
- GitHub Actions for Pages deployment

## Local Development

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

Open `http://localhost:5173`.

## Admin Login (Static Mode)

Default values (client-side only):

- Email: `admin@sagarkumar.dev`
- Password: `ChangeMe123!`

You can override at build time using env variables:

```env
VITE_ADMIN_EMAIL=admin@sagarkumar.dev
VITE_ADMIN_PASSWORD=ChangeMe123!
VITE_BASE_PATH=/
```

## Build

```bash
npm --prefix frontend run build
```

Output: `frontend/dist`

## GitHub Pages Deployment

A workflow is included:

- `.github/workflows/deploy-pages.yml`

### Steps

1. Push this repo to GitHub (`main` or `master`).
2. In repo settings: `Settings -> Pages -> Source = GitHub Actions`.
3. Optional secrets (if you want custom admin creds in deployed build):
   - `VITE_ADMIN_EMAIL`
   - `VITE_ADMIN_PASSWORD`
4. Push again (or run workflow manually).

If repository is `sagarkumar446.github.io`, URL will be:

- `https://sagarkumar446.github.io/`

## SEO Files

- `frontend/public/robots.txt`
- `frontend/public/sitemap.xml`
- `frontend/src/hooks/usePageMeta.js` — per-page title, description, canonical, Open Graph, Twitter, and JSON-LD.
- Per-page JSON-LD: `Person` (homepage), `BlogPosting` (blog posts).

## Routing & GitHub Pages

The app uses `BrowserRouter` with clean URLs (`/`, `/about`, `/projects`, `/experience`,
`/skills`, `/blog`, `/contact`). GitHub Pages has no server-side rewrite rules, so the
build copies `dist/index.html` to `dist/404.html`. Unknown paths are served the SPA,
letting React Router render the correct route. Old `#/route` hash links are
automatically migrated to clean URLs on load (`src/main.jsx`).

> Note: deep links still technically respond with HTTP 404 on GitHub Pages while
> rendering the correct SPA content. This is the standard SPA-on-Pages limitation;
> indexable content is served, but a custom domain with real rewrites would remove it.

## Directory Note

The old Bootstrap template (`index.html`, `assets/`) and the `backend/` folder
were removed — they are **not required** for GitHub Pages static deployment. The
live site is built and deployed from `frontend/`.

