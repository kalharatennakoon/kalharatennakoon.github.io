// Production build with prerendering.
//
// 1. Client build (same as plain `vite build`).
// 2. SSR build of src/entry-server.tsx into dist-ssr/.
// 3. Render the page and put the HTML inside <div id="root"> in dist/index.html,
//    so crawlers that don't run JavaScript still see the full content.
//
// Accepts --base like `vite build` does. The deploy workflow runs
// `npm run build -- --base="/academic/"`, and npm appends that flag to this
// script, so it has to be passed on to both Vite builds here.
import { build } from 'vite'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
let base = '/'
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--base=')) base = args[i].slice('--base='.length)
  else if (args[i] === '--base' && args[i + 1]) base = args[++i]
}

await build({ base })
await build({
  base,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: 'dist-ssr', emptyOutDir: true },
})

const { render } = await import(new URL('../dist-ssr/entry-server.js', import.meta.url).href)

const file = join('dist', 'index.html')
const html = readFileSync(file, 'utf8')
const empty = '<div id="root"></div>'
if (!html.includes(empty)) throw new Error('prerender: could not find empty <div id="root"> in dist/index.html')
writeFileSync(file, html.replace(empty, `<div id="root">${render()}</div>`))
console.log(`prerender: wrote ${file} (base ${base})`)
