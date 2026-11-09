# kalharatennakoon.com

[![Deploy](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/deploy.yml)
[![Lighthouse](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/lighthouse.yml)
[![Check links](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/links.yml/badge.svg)](https://github.com/kalharatennakoon/kalharatennakoon.github.io/actions/workflows/links.yml)

Source for [kalharatennakoon.com](https://kalharatennakoon.com), the portfolio of Kalhara Tennakoon, a Software, DevOps & AI/ML Engineer.

## How this site is built

A static React site, prerendered to HTML at build time and served by GitHub Pages. Every push is audited, every link is checked weekly, and nothing is deployed by hand.

### Stack

- **React 19 + TypeScript**, built with **Vite** and styled with **Tailwind CSS**
- **React Router** for the `/`, `/projects/`, `/achievements/` and `/blog/` pages, plus case studies at `/projects/<slug>/`
- **Build-time prerendering**: each route is server-rendered to static HTML (`src/entry-server.tsx` + `scripts/prerender-routes.js`), so search engines and link previews get full content, per-page titles, canonical URLs and Open Graph tags without running JavaScript
- **Cloudflare Worker** (`worker/`) at `api.kalharatennakoon.com` handling the contact form, with Turnstile spam protection and delivery through Cloudflare Email Routing
- **Medium feed** pulled at build time into `public/blog-posts.json` (`scripts/fetch-medium-posts.js`)

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`, and weekly to refresh blog posts. One Pages site serves two branches:

| Branch | Path |
|---|---|
| `main` | `/` |
| `academic-cv` | `/academic/` |

DNS and email routing run on Cloudflare.

### Quality checks

| Workflow | When | What fails it |
|---|---|---|
| [Lighthouse](.github/workflows/lighthouse.yml) | Every push | Accessibility, best practices or SEO below the thresholds in [`lighthouserc.json`](lighthouserc.json) (median of 3 runs per page). Performance below 85 only warns, because CI machines vary. |
| [Check links](.github/workflows/links.yml) | Mondays, on pull requests that change content, and on demand | Any broken link in the built site: project demos, GitHub repos, certificates, articles, and the site's own pages and files. Settings in [`lychee.toml`](lychee.toml). |
| [Deploy](.github/workflows/deploy.yml) | Pushes to `main`, and Sundays to refresh blog posts | A failed install or build. Dependencies are installed with `npm ci` from the committed lockfile. |

All third-party actions in the quality workflows are pinned to a commit SHA.

To run the same Lighthouse audit locally after `npm run build`:

```bash
npx @lhci/cli@0.16.0 autorun
```

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
  data/caseStudies.ts  case study content (also drives their prerendered pages)
  terminal/        interactive terminal commands
  entry-server.tsx SSR entry used for prerendering
scripts/           build-time scripts (prerender, Medium feed)
worker/            contact form Cloudflare Worker
public/            static assets, CV, sitemap, robots.txt
```
