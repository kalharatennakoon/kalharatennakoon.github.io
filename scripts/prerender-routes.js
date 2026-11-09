// Writes dist/<route>/index.html for each page, plus dist/404.html.
//
// Each page's <div id="root"> is filled with that page rendered to HTML
// (via the SSR build of src/entry-server.tsx in dist-ssr/), so crawlers that
// don't run JavaScript still see the full content.
//
// GitHub Pages only serves real files, so without these a refresh on
// /projects/ would 404. Each copy also gets its own title, description,
// canonical URL and Open Graph/Twitter tags, so search results and link
// previews show the right page instead of the home page.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const { render, caseStudies } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href)

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

// One page per case study, from the same data the pages render
// (src/data/caseStudies.ts). Each gets its project screenshot as the link
// preview and Article structured data naming Kalhara as the author.
for (const study of caseStudies) {
  const url = `${SITE}/projects/${study.slug}/`
  const image = `${SITE}${study.cover}`
  routes.push({
    path: `projects/${study.slug}/`,
    title: `${study.name} case study | ${NAME}`,
    description: study.description,
    type: 'article',
    image: { url: image, width: 960, height: 600, alt: `Screenshot of ${study.name}` },
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'TechArticle',
          '@id': `${url}#article`,
          headline: study.title,
          description: study.description,
          url,
          image,
          datePublished: study.published,
          inLanguage: 'en',
          author: { '@id': `${SITE}/#person` },
          publisher: { '@id': `${SITE}/#person` },
          isPartOf: { '@id': `${SITE}/#website` },
          mainEntityOfPage: url,
          keywords: study.stack.join(', '),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/projects/` },
            { '@type': 'ListItem', position: 3, name: study.name, item: url },
          ],
        },
      ],
    },
  })
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** Replace the content of one tag, failing loudly if index.html changes shape. */
function swap(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`prerender-routes: could not find ${label} in index.html`)
  return html.replace(pattern, replacement)
}

function pageHtml(base, { path, title, description, type = 'website', image, jsonLd }) {
  const url = `${SITE}/${path}`
  const t = escapeAttr(title)
  const d = escapeAttr(description)
  let html = base
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${t}</title>`, '<title>')
  html = swap(html, /(<meta name="description" content=")[^"]*/, `$1${d}`, 'meta description')
  html = swap(html, /(<link rel="canonical" href=")[^"]*/, `$1${url}`, 'canonical')
  html = swap(html, /(<meta property="og:url" content=")[^"]*/, `$1${url}`, 'og:url')
  html = swap(html, /(<meta property="og:type" content=")[^"]*/, `$1${type}`, 'og:type')
  html = swap(html, /(<meta property="og:title" content=")[^"]*/, `$1${t}`, 'og:title')
  html = swap(html, /(<meta property="og:description" content=")[^"]*/, `$1${d}`, 'og:description')
  html = swap(html, /(<meta name="twitter:title" content=")[^"]*/, `$1${t}`, 'twitter:title')
  html = swap(html, /(<meta name="twitter:description" content=")[^"]*/, `$1${d}`, 'twitter:description')
  if (image) {
    const alt = escapeAttr(image.alt)
    html = swap(html, /(<meta property="og:image" content=")[^"]*/, `$1${image.url}`, 'og:image')
    html = swap(html, /(<meta property="og:image:secure_url" content=")[^"]*/, `$1${image.url}`, 'og:image:secure_url')
    html = swap(html, /(<meta property="og:image:width" content=")[^"]*/, `$1${image.width}`, 'og:image:width')
    html = swap(html, /(<meta property="og:image:height" content=")[^"]*/, `$1${image.height}`, 'og:image:height')
    html = swap(html, /(<meta property="og:image:alt" content=")[^"]*/, `$1${alt}`, 'og:image:alt')
    html = swap(html, /(<meta name="twitter:image" content=")[^"]*/, `$1${image.url}`, 'twitter:image')
    html = swap(html, /(<meta name="twitter:image:alt" content=")[^"]*/, `$1${alt}`, 'twitter:image:alt')
  }
  if (jsonLd) {
    // Escape "<" so text in the data can never close the script tag.
    const json = JSON.stringify(jsonLd).replace(/</g, '\\u003c')
    html = swap(html, /<\/head>/, `<script type="application/ld+json">${json}</script>\n  </head>`, '</head>')
  }
  return html
}

/** Fill the empty #root with the server-rendered page for `url`. */
function withBody(html, url) {
  return swap(html, /<div id="root"><\/div>/, `<div id="root">${render(url)}</div>`, 'empty <div id="root">')
}

const base = readFileSync(join(DIST, 'index.html'), 'utf8')

writeFileSync(join(DIST, 'index.html'), withBody(base, '/'))
console.log(`prerender-routes: wrote ${join(DIST, 'index.html')}`)

for (const route of routes) {
  const dir = join(DIST, route.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), withBody(pageHtml(base, route), `/${route.path}`))
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
