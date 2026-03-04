# Sagar Kumar Portfolio (GitHub Pages Static Mode)

This project is now configured to run fully on **GitHub Pages only**.

- No Node.js backend required for runtime
- No MongoDB required for runtime
- Public site + admin panel run entirely in the browser
- All editable content is stored in browser `localStorage`

## How It Works

- Public pages read data from localStorage.
- Admin panel updates localStorage directly.
- Uploaded images/resume are stored as data URLs in localStorage.
- Contact form submissions are saved in localStorage (current browser only).

## Important Limitation

Because this is static-only:

- Data is saved per browser/device.
- If user clears site storage, data resets.
- Updates are not shared globally unless you commit code changes and redeploy.

## Stack

- React + Vite + React Router (`HashRouter` for Pages compatibility)
- CSS animations + responsive layout
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

or Pages-targeted build:

```bash
npm --prefix frontend run build:pages
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

## Note About Backend Folder

The `backend/` folder may still exist in repo history/workspace, but it is **not required** for GitHub Pages static deployment.
