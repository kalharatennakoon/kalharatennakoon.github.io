# kalharatennakoon.com

Source for [kalharatennakoon.com](https://kalharatennakoon.com), the portfolio of Kalhara Tennakoon, a Software, DevOps & AI/ML Engineer.

## Stack

- **React 19 + TypeScript**, built with **Vite** and styled with **Tailwind CSS**
- **React Router** for the `/`, `/projects/`, `/achievements/` and `/blog/` pages
- **Build-time prerendering**: each route is server-rendered to static HTML (`src/entry-server.tsx` + `scripts/prerender-routes.js`), so search engines and link previews get full content, per-page titles, canonical URLs and Open Graph tags without running JavaScript
- **Cloudflare Worker** (`worker/`) at `api.kalharatennakoon.com` handling the contact form, with Turnstile spam protection and delivery through Cloudflare Email Routing
- **Medium feed** pulled at build time into `public/blog-posts.json` (`scripts/fetch-medium-posts.js`)

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`, and weekly to refresh blog posts. One Pages site serves two branches:

| Branch | Path |
|---|---|
| `main` | `/` |
| `academic-cv` | `/academic/` |

DNS and email routing run on Cloudflare.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check, client build, SSR build, prerender
npm run preview    # serve the production build
npm run lint
```

To test the contact form locally, copy `.env.example` to `.env.local` and run the Worker:

```bash
cd worker
npm install
npm run dev        # http://localhost:8787
```

## Project layout

```
src/
  pages/           route-level pages
  components/      page sections (Hero, Projects, Experience, ...)
  data/profile.ts  profile content
  terminal/        interactive terminal commands
  entry-server.tsx SSR entry used for prerendering
scripts/           build-time scripts (prerender, Medium feed)
worker/            contact form Cloudflare Worker
public/            static assets, CV, sitemap, robots.txt
```
