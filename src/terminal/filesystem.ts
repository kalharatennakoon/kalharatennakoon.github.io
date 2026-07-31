/**
 * A virtual filesystem backing the shell.
 *
 * Directories and files are generated from the profile data, so `cd`, `ls`,
 * `cat`, `pwd` and `tree` behave the way they would on a real machine — you
 * walk into `projects/`, list it, walk into one, and read its README.
 */

import {
  achievements,
  certifications,
  community,
  education,
  experience,
  identity,
  links,
  projects,
  resumePath,
  skills,
} from '../data/profile'
import { blank, heading, hint, line, link, paragraph, s } from './format'
import { defaultConfig, renderPipelineYaml } from './pipeline'
import type { Segment } from './types'

export const HOME = '/home/kalhara'

export interface FsFile {
  type: 'file'
  name: string
  /** Shown in the right-hand column of `ls -l`. */
  meta: string
  /** Rendered by `cat`. */
  render: () => Segment[][]
  /** When set, `cat` opens this URL instead of printing. */
  open?: string
}

export interface FsDir {
  type: 'dir'
  name: string
  meta: string
  children: Record<string, FsNode>
  /** Page section this directory mirrors — `cd` scrolls there too. */
  sectionId?: string
}

export type FsNode = FsFile | FsDir

const file = (name: string, meta: string, render: () => Segment[][], open?: string): FsFile => ({
  type: 'file',
  name,
  meta,
  render,
  open,
})

const dir = (
  name: string,
  meta: string,
  children: Record<string, FsNode>,
  sectionId?: string,
): FsDir => ({ type: 'dir', name, meta, children, sectionId })

/** Turn a list of nodes into the keyed record a directory needs. */
const index = (nodes: FsNode[]): Record<string, FsNode> =>
  Object.fromEntries(nodes.map((n) => [n.name, n]))

/* ────────────────────────────────────────────────────────────────────────────
 * File contents
 * ──────────────────────────────────────────────────────────────────────────*/

const readme = (): Segment[][] => [
  [s(`# ${identity.name}`, 'cyan', true)],
  blank,
  ...paragraph(
    `${identity.role} — ${identity.location}. This portfolio ships with a working shell. ` +
      'Everything you can read here comes from the same data that renders the page.',
  ),
  blank,
  [s('  Quick start', 'yellow', true)],
  ...['ls', 'cd projects', 'ls', 'cat solarcast/README.md', 'pipeline run'].map((c) => [
    s('    $ ', 'dim'),
    s(c, 'green'),
  ]),
  blank,
  hint('Run `help` for the full command list, or `tree` to see the layout.'),
]

const aboutMd = (): Segment[][] => [
  heading('professional summary'),
  blank,
  ...paragraph(identity.summary),
  blank,
  [s('  Focus     ', 'dim'), s(identity.focus.join(', '))],
  [s('  Location  ', 'dim'), s(identity.location)],
  [s('  Status    ', 'dim'), s('Open to opportunities', 'green')],
]

const contactMd = (): Segment[][] => {
  const rows: Segment[][] = [
    heading('contact'),
    blank,
    [s('  email'.padEnd(16), 'dim'), link(identity.email, `mailto:${identity.email}`)],
  ]
  for (const l of links) {
    rows.push([s(`  ${l.label.toLowerCase()}`.padEnd(16), 'dim'), link(l.url, l.url)])
  }
  rows.push(blank, hint('Machine-readable: `curl /api/contact`'))
  return rows
}

const skillsYaml = (): Segment[][] => {
  const rows: Segment[][] = [line('skills:', 'magenta')]
  for (const group of skills) {
    rows.push([s(`  ${group.id}:`, 'cyan')])
    for (const item of group.items) rows.push([s('    - ', 'dim'), s(item)])
  }
  return rows
}

/* ────────────────────────────────────────────────────────────────────────────
 * Directory trees
 * ──────────────────────────────────────────────────────────────────────────*/

const projectDirs = index(
  projects.map((p) =>
    dir(p.name, p.tagline, index([
      file('README.md', 'overview', () => [
        [s(`# ${p.name}`, 'cyan', true)],
        blank,
        ...paragraph(p.tagline, 'yellow'),
        blank,
        ...paragraph(p.description),
        blank,
        [s('  Status  ', 'dim'), s(p.status, p.status === 'Running' ? 'green' : 'white')],
        [s('  Period  ', 'dim'), s(p.period)],
        ...(p.github ? [[s('  Source  ', 'dim'), link(p.github, p.github)]] : []),
      ]),
      file('stack.txt', `${p.stack.length} technologies`, () =>
        p.stack.map((t) => [s('  ' + t, 'yellow')]),
      ),
      file('status.txt', p.status.toLowerCase(), () => [
        [s('  status: ', 'dim'), s(p.status, p.status === 'Running' ? 'green' : 'white')],
        [s('  period: ', 'dim'), s(p.period)],
      ]),
    ])),
  ),
)

const experienceDirs = index(
  experience.map((e) =>
    dir(e.id, `${e.title} · ${e.period}`, index([
      file('README.md', 'role overview', () => [
        [s(e.title, 'cyan', true)],
        [s(e.company, 'white'), s('  ·  ', 'dim'), s(e.location, 'dim')],
        blank,
        [s('  Period  ', 'dim'), s(e.period)],
        [s('  Type    ', 'dim'), s(e.type)],
      ]),
      file('highlights.txt', `${e.highlights.length} entries`, () =>
        e.highlights.flatMap((h) => paragraph(`• ${h}`, undefined, 74, '  ')),
      ),
    ])),
  ),
)

const certGroups = index([
  dir('cloud-devops', 'cloud, DevOps & platform', index([
    file('README.md', 'certification list', () =>
      certifications
        .filter((c) => c.group === 'cloud-devops')
        .map((c) => [s('  ' + c.name.padEnd(42), 'cyan'), s(c.issuer.padEnd(20)), s(c.date, 'dim')]),
    ),
  ])),
  dir('ai-data', 'AI & data', index([
    file('README.md', 'certification list', () =>
      certifications
        .filter((c) => c.group === 'ai-data')
        .map((c) => [s('  ' + c.name.padEnd(42), 'cyan'), s(c.issuer.padEnd(20)), s(c.date, 'dim')]),
    ),
  ])),
])

export const root: FsDir = dir('~', 'home', index([
  file('README.md', 'start here', readme),
  file('about.md', 'professional summary', aboutMd),
  file('skills.yaml', `${skills.reduce((n, g) => n + g.items.length, 0)} skills`, skillsYaml),
  file('contact.md', `${links.length + 1} ways to reach me`, contactMd),
  file('pipeline.yaml', 'Tekton PipelineRun', () => [
    ...renderPipelineYaml(defaultConfig),
    blank,
    hint('Defaults shown. `pipeline run --cluster=gke --dry-run` resolves it with your flags.'),
  ]),
  file('resume.pdf', 'downloadable CV', () => [
    line('resume.pdf: binary file — opening in a new tab…', 'dim'),
  ], resumePath),

  dir('projects', `${projects.length} projects`, projectDirs, 'projects'),
  dir('experience', `${experience.length} roles`, experienceDirs, 'experience'),
  dir('certifications', `${certifications.length} certifications`, certGroups, 'certifications'),

  dir('education', 'degree & coursework', index([
    file('README.md', 'degree detail', () => [
      [s(education.degree, 'cyan', true)],
      [s(education.honours, 'green')],
      blank,
      [s('  University  ', 'dim'), s(education.university)],
      [s('  Delivery    ', 'dim'), s(education.delivery)],
      [s('  Graduation  ', 'dim'), s(education.graduation)],
      blank,
      [s('  Final year project:', 'dim')],
      ...paragraph(education.finalYearProject, 'yellow', 74, '    '),
    ]),
    file('coursework.txt', `${education.coursework.length} modules`, () =>
      education.coursework.map((c) => [s('  • ', 'cyan'), s(c)]),
    ),
  ]), 'education'),

  dir('achievements', `${achievements.length} awards`, index([
    file('README.md', 'award list', () =>
      achievements.flatMap((a) => [
        [s('  ' + a.title, 'cyan', true), s('  ' + a.date, 'dim')],
        ...paragraph(a.detail, undefined, 74, '    '),
        blank,
      ]),
    ),
  ]), 'achievements'),

  dir('community', 'writing & volunteering', index([
    file('README.md', 'community roles', () =>
      community.flatMap((c) => [
        [s('  ' + c.role, 'cyan', true), s('  ·  ', 'dim'), s(c.org), s('  ' + c.period, 'dim')],
        ...paragraph(c.detail, undefined, 74, '    '),
        blank,
      ]),
    ),
    file('writing.md', '50+ articles, 150K+ views', () => [
      heading('technical writing'),
      blank,
      ...paragraph(
        '50+ articles on DevOps, cloud-native technologies, and software engineering, ' +
          'with 150K+ total views.',
      ),
      blank,
      [s('  medium  ', 'dim'), link('kalharatennakoon.medium.com', 'https://kalharatennakoon.medium.com')],
    ]),
  ]), 'activities'),
]))

/* ────────────────────────────────────────────────────────────────────────────
 * Path resolution
 * ──────────────────────────────────────────────────────────────────────────*/

/** Split a path into segments, collapsing `.` and applying `..`. */
export function normalize(cwd: string[], path: string): string[] | null {
  const absolute = path.startsWith('/') || path.startsWith('~')
  const cleaned = path.replace(/^~\/?/, '').replace(new RegExp(`^${HOME}/?`), '').replace(/^\//, '')

  const start = absolute ? [] : [...cwd]
  const parts = cleaned.split('/').filter((p) => p !== '' && p !== '.')

  for (const part of parts) {
    if (part === '..') {
      if (start.length === 0) return null
      start.pop()
    } else {
      start.push(part)
    }
  }
  return start
}

/** Walk `segments` from the root, returning the node or null. */
export function lookup(segments: string[]): FsNode | null {
  let node: FsNode = root
  for (const segment of segments) {
    if (node.type !== 'dir') return null
    const next: FsNode | undefined = node.children[segment]
    if (!next) return null
    node = next
  }
  return node
}

/** Resolve a user-supplied path against `cwd`. */
export function resolvePath(
  cwd: string[],
  path: string,
): { segments: string[]; node: FsNode } | null {
  const segments = normalize(cwd, path)
  if (!segments) return null
  const node = lookup(segments)
  if (!node) return null
  return { segments, node }
}

/** `~/projects/solarcast` — the display form used in the prompt. */
export function displayPath(segments: string[]): string {
  return segments.length ? `~/${segments.join('/')}` : '~'
}

/** Directory entries sorted the way `ls` sorts them: directories first. */
export function entries(node: FsDir): FsNode[] {
  return Object.values(node.children).sort((a, b) => {
    if (a.type !== b.type) return a.type === 'dir' ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

/** Names under `cwd`, for tab completion. */
export function completionsFor(cwd: string[], includeFiles = true): string[] {
  const node = lookup(cwd)
  if (!node || node.type !== 'dir') return []
  return entries(node)
    .filter((n) => includeFiles || n.type === 'dir')
    .map((n) => (n.type === 'dir' ? n.name + '/' : n.name))
}
