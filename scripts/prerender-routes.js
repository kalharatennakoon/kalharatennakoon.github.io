// Writes dist/<route>/index.html for each page, plus dist/404.html.
//
// GitHub Pages only serves real files, so without these a refresh on
// /projects/ would 404. Each copy also gets its own title, description,
// canonical URL and Open Graph/Twitter tags, so search results and link
// previews show the right page instead of the home page.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://kalharatennakoon.com'
const NAME = 'Kalhara Tennakoon'
const DIST = 'dist'

const routes = [
  {
    path: 'projects/',
    title: `Projects | ${NAME}`,
    description:
      'Projects by Kalhara Tennakoon: full-stack apps, machine learning systems, RAG assistants and Kubernetes security tooling.',
  },
  {
    path: 'achievements/',
    title: `Achievements & Certifications | ${NAME}`,
    description:
      'Awards, hackathon results, scholarships, certifications and community activities of Kalhara Tennakoon.',
  },
  {
    path: 'blog/',
    title: `Writing | ${NAME}`,
    description:
      'Articles by Kalhara Tennakoon on Kubernetes, CI/CD, DevOps and working in tech.',
  },
]

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Replace the content of one tag, failing loudly if index.html changes shape. */
function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-routes: could not find ${label} in index.html`)
  return html.replace(pattern, replacement)
}

function pageHtml(base, { path, title, description }) {
  const url = `${SITE}/${path}`
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  let html = base
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>')
  html = swap(html, /(<meta name="description" content=")[^"]*/, `$1${d}`, 'meta description')
  html = swap(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`, 'canonical')
  html = swap(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`, 'og:url')
  html = swap(html, /(<meta property="og:type" content=")[^"]*/, '$1website', 'og:type')
  html = swap(html, /(<meta property="og:title" content=")[^"]*/, `$1${t}`, 'og:title')
  html = swap(html, /(<meta property="og:description" content=")[^"]*/, `$1${d}`, 'og:description')
  html = swap(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${t}`, 'twitter:title')
  html = swap(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${d}`, 'twitter:description')
  return html
}

const base = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const route of routes) {
  const dir = join(DIST, route.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), pageHtml(base, route))
  console.log(`prerender-routes: wrote ${join(dir, 'index.html')}`)
}

// Unknown paths load the app, which shows its own "page not found" screen.
// noindex keeps any stray URL out of search results.
const notFound = swap(
  base,
  /<meta name="robots" content="[^"]*" \/>/,
  '<meta name="robots" content="noindex" />',
  'meta robots',
)
writeFileSync(join(DIST, '404.html'), notFound)
console.log('prerender-routes: wrote dist/404.html')
