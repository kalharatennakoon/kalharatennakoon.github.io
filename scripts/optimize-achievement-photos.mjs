// Resizes achievement photos for the web and writes the list the page reads.
//
//   1. Put the original photos in photos/achievements/<achievement id>/
//      (ids are listed in src/components/Achievements.tsx). The photos/ folder is
//      git-ignored, so full-size originals never reach the repository.
//   2. Run: npm run photos
//
// For each photo it writes, under public/achievements/<id>/:
//   <name>.webp        up to 1600 px on the long side, for the viewer
//   <name>-thumb.webp  480 x 360 crop, for the strip on the card
// Photos are turned upright from their EXIF orientation, and all metadata
// (camera, date, GPS location) is dropped.
//
// Photos are shown in file-name order, so name them 01-…, 02-… to choose the order.
// Re-running replaces the output for every id that has a folder in photos/achievements/.
// The list (src/data/achievementPhotos.json) is rebuilt from public/achievements/,
// so it stays correct on a machine that does not have the originals.

import { readdir, mkdir, rm, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const SRC = path.join(ROOT, 'photos', 'achievements')
const OUT = path.join(ROOT, 'public', 'achievements')
const MANIFEST = path.join(ROOT, 'src', 'data', 'achievementPhotos.json')

const FULL_MAX = 1600
const THUMB = { width: 480, height: 360 }
const INPUT = /\.(jpe?g|png|webp|avif|tiff?)$/i

const exists = (p) => stat(p).then(() => true, () => false)
const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

async function processFolder(id) {
  const dir = path.join(SRC, id)
  const files = (await readdir(dir)).filter((f) => !f.startsWith('.')).sort()
  const out = path.join(OUT, id)
  await rm(out, { recursive: true, force: true })
  await mkdir(out, { recursive: true })

  for (const file of files) {
    if (!INPUT.test(file)) {
      console.warn(`  skipped ${id}/${file}: export it as JPEG or PNG first (HEIC is not supported)`)
      continue
    }
    const name = slugify(file)
    const input = path.join(dir, file)
    await sharp(input)
      .rotate()
      .resize({ width: FULL_MAX, height: FULL_MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(out, `${name}.webp`))
    await sharp(input)
      .rotate()
      .resize({ ...THUMB, fit: 'cover', position: sharp.strategy.attention })
      .webp({ quality: 72 })
      .toFile(path.join(out, `${name}-thumb.webp`))
    const full = await stat(path.join(out, `${name}.webp`))
    console.log(`  ${id}/${file} -> ${name}.webp (${Math.round(full.size / 1024)} KB)`)
  }
}

async function buildManifest() {
  const manifest = {}
  if (!(await exists(OUT))) return manifest
  for (const id of (await readdir(OUT)).sort()) {
    const dir = path.join(OUT, id)
    if (!(await stat(dir)).isDirectory()) continue
    const names = (await readdir(dir))
      .filter((f) => f.endsWith('.webp') && !f.endsWith('-thumb.webp'))
      .sort()
    const photos = []
    for (const f of names) {
      const name = f.replace(/\.webp$/, '')
      const { width, height } = await sharp(path.join(dir, f)).metadata()
      photos.push({
        name,
        src: `/achievements/${id}/${name}.webp`,
        thumb: `/achievements/${id}/${name}-thumb.webp`,
        width,
        height,
      })
    }
    if (photos.length) manifest[id] = photos
  }
  return manifest
}

if (await exists(SRC)) {
  for (const id of (await readdir(SRC)).sort()) {
    if ((await stat(path.join(SRC, id))).isDirectory()) {
      console.log(`${id}:`)
      await processFolder(id)
    }
  }
} else {
  console.log('No photos/achievements/ folder; only rebuilding the list.')
}

const manifest = await buildManifest()
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
const count = Object.values(manifest).reduce((n, list) => n + list.length, 0)
console.log(`Wrote src/data/achievementPhotos.json: ${count} photo(s) across ${Object.keys(manifest).length} achievement(s).`)
