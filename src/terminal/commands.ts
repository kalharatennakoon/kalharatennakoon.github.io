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
  stats,
  timeline,
} from '../data/profile'
import {
  blank,
  error,
  hint,
  line,
  link,
  ok,
  paragraph,
  s,
  table,
} from './format'
import { HOME, completionsFor, displayPath, entries, resolvePath } from './filesystem'
import type { FsDir } from './filesystem'
import { parseFlags, pipelineCompletions, renderPipelineYaml, runPipeline } from './pipeline'
import type { Command, CommandContext, Segment } from './types'

const projectAge = (p: (typeof projects)[number]) => p.period.split('–')[0].trim()

/* ────────────────────────────────────────────────────────────────────────────
 * kubectl
 * ──────────────────────────────────────────────────────────────────────────*/

const kubectlResources: Record<string, () => Segment[][]> = {
  projects: () =>
    table(
      [
        { header: 'name', color: 'cyan' },
        { header: 'status', color: 'green' },
        { header: 'stack' },
        { header: 'since', color: 'dim' },
      ],
      projects.map((p) => [p.name, p.status, p.stack.slice(0, 3).join(','), projectAge(p)]),
    ),

  skills: () =>
    table(
      [
        { header: 'group', color: 'cyan' },
        { header: 'count', color: 'yellow' },
        { header: 'items' },
      ],
      skills.map((g) => [g.id, String(g.items.length), g.items.join(', ')]),
    ),

  nodes: () =>
    table(
      [
        { header: 'name', color: 'cyan' },
        { header: 'status', color: 'green' },
        { header: 'roles' },
        { header: 'capacity', color: 'dim' },
      ],
      skills.map((g) => [g.id, 'Ready', g.label, `${g.items.length} skills`]),
    ),

  certs: () =>
    table(
      [
        { header: 'name', color: 'cyan' },
        { header: 'issuer' },
        { header: 'issued', color: 'dim' },
      ],
      certifications.map((c) => [c.name, c.issuer, c.date]),
    ),

  achievements: () =>
    table(
      [
        { header: 'award', color: 'cyan' },
        { header: 'when', color: 'dim' },
      ],
      achievements.map((a) => [a.title, a.date]),
    ),

  deployments: () =>
    table(
      [
        { header: 'name', color: 'cyan' },
        { header: 'ready', color: 'green' },
        { header: 'org' },
        { header: 'age', color: 'dim' },
      ],
      experience.map((e) => [e.id, '1/1', e.company.split(' ')[0], e.period]),
    ),
}

kubectlResources.pods = kubectlResources.projects
kubectlResources.svc = kubectlResources.skills
kubectlResources.certifications = kubectlResources.certs

function describeProject(name: string): Segment[][] {
  const p = projects.find((x) => x.id === name || x.name === name)
  if (!p) {
    return [
      error(`projects "${name}" not found`),
      hint(`Available: ${projects.map((x) => x.name).join(', ')}`),
    ]
  }

  const out: Segment[][] = [
    [s('  Name'.padEnd(18), 'dim'), s(p.name, 'cyan', true)],
    [s('  Tagline'.padEnd(18), 'dim'), s(p.tagline)],
    [s('  Status'.padEnd(18), 'dim'), s(p.status, p.status === 'Running' ? 'green' : 'yellow')],
    [s('  Period'.padEnd(18), 'dim'), s(p.period)],
    [s('  Stack'.padEnd(18), 'dim'), s(p.stack.join(', '))],
  ]

  if (p.github) {
    out.push([s('  Source'.padEnd(18), 'dim'), link(p.github, p.github)])
  }

  out.push(blank, [s('  Description:', 'dim')], ...paragraph(p.description, undefined, 76, '    '))
  return out
}

function describeExperience(name: string): Segment[][] {
  const e = experience.find((x) => x.id === name)
  if (!e) {
    return [
      error(`deployments "${name}" not found`),
      hint(`Available: ${experience.map((x) => x.id).join(', ')}`),
    ]
  }

  const out: Segment[][] = [
    [s('  Role'.padEnd(18), 'dim'), s(e.title, 'cyan', true)],
    [s('  Company'.padEnd(18), 'dim'), s(e.company)],
    [s('  Location'.padEnd(18), 'dim'), s(e.location)],
    [s('  Period'.padEnd(18), 'dim'), s(e.period)],
    [s('  Type'.padEnd(18), 'dim'), s(e.type)],
    blank,
    [s('  Highlights:', 'dim')],
  ]

  for (const h of e.highlights) {
    out.push(...paragraph(`• ${h}`, undefined, 74, '    '))
  }
  return out
}

/* ────────────────────────────────────────────────────────────────────────────
 * Command registry
 * ──────────────────────────────────────────────────────────────────────────*/

export const commands: Command[] = [
  /* ── system ─────────────────────────────────────────────────────────── */
  {
    name: 'help',
    usage: 'help [command]',
    description: 'List available commands, or show detail for one',
    category: 'system',
    aliases: ['?'],
    completions: () => commands.filter((c) => !c.hidden).map((c) => c.name),
    run({ args, print }) {
      if (args[0]) {
        const cmd = resolve(args[0])
        if (!cmd) return print([error(`no help topic for "${args[0]}"`)])
        return print([
          [s(cmd.name, 'cyan', true), s(' — '), s(cmd.description)],
          blank,
          [s('  usage: ', 'dim'), s(cmd.usage, 'yellow')],
          ...(cmd.aliases?.length ? [[s('  alias: ', 'dim'), s(cmd.aliases.join(', '))]] : []),
        ])
      }

      const groups: { key: Command['category']; title: string }[] = [
        { key: 'devops', title: 'DevOps' },
        { key: 'system', title: 'System' },
        { key: 'navigation', title: 'Navigation' },
      ]

      const rows: Segment[][] = [
        [s('Available commands', 'yellow', true), s('  (Tab completes · ↑↓ recalls history)', 'dim')],
      ]

      for (const g of groups) {
        rows.push(blank, [s(g.title, 'magenta', true)])
        for (const cmd of commands.filter((c) => c.category === g.key && !c.hidden)) {
          rows.push([s('  ' + cmd.usage.padEnd(30), 'cyan'), s(cmd.description, 'dim')])
        }
      }

      rows.push(blank, hint('Start with: whoami · kubectl get projects · pipeline run · git log'))
      print(rows)
    },
  },

  {
    name: 'whoami',
    usage: 'whoami',
    description: 'Print the identity behind this portfolio',
    category: 'system',
    run({ print }) {
      print([
        [s(identity.name, 'cyan', true)],
        [s(identity.role, 'green'), s('  ·  '), s(identity.location, 'dim')],
        blank,
        ...paragraph(identity.summary),
        blank,
        ...stats.map((st) => [s('  ' + st.value.padEnd(8), 'yellow', true), s(st.label, 'dim')]),
        blank,
        hint('Next: `ls` to browse, or `kubectl get projects` to see the work.'),
      ])
    },
  },

  {
    name: 'ls',
    usage: 'ls [-l] [path]',
    description: 'List the contents of the current directory',
    category: 'system',
    completions: (cwd) => completionsFor(cwd, false),
    run({ args, print, cwd }) {
      const long = args.some((a) => a === '-l' || a === '-la' || a === '-al')
      const target = args.find((a) => !a.startsWith('-'))

      const resolved = resolvePath(cwd, target ?? '.')
      if (!resolved) {
        return print([error(`ls: ${target}: No such file or directory`)])
      }

      /* `ls <file>` just echoes the filename, same as a real shell. */
      if (resolved.node.type === 'file') {
        return print([[s(resolved.node.name)]])
      }

      const items = entries(resolved.node)
      if (!items.length) return print([hint('(empty directory)')])

      if (!long) {
        /* Wrap into fixed columns the way `ls` does, so wide directories
           don't force the terminal to scroll sideways. */
        const width = items.reduce((max, n) => Math.max(max, n.name.length + 1), 0) + 2
        const columns = Math.max(1, Math.floor(80 / width))
        const rows: Segment[][] = []

        for (let i = 0; i < items.length; i += columns) {
          rows.push(
            items.slice(i, i + columns).map((n) =>
              n.type === 'dir'
                ? s((n.name + '/').padEnd(width), 'blue', true)
                : s(n.name.padEnd(width), 'white'),
            ),
          )
        }

        return print([
          ...rows,
          blank,
          hint('Use `ls -l` for detail, `cd <dir>` to enter, `cat <file>` to read.'),
        ])
      }

      print([
        [s(`total ${items.length}`, 'dim')],
        ...items.map((n) => [
          s(n.type === 'dir' ? 'drwxr-xr-x  ' : '-rw-r--r--  ', 'dim'),
          n.type === 'dir'
            ? s((n.name + '/').padEnd(26), 'blue', true)
            : s(n.name.padEnd(26), 'white'),
          s(n.meta, 'dim'),
        ]),
      ])
    },
  },

  {
    name: 'cat',
    usage: 'cat <file>',
    description: 'Print the contents of a file',
    category: 'system',
    completions: (cwd) => completionsFor(cwd),
    run({ args, print, cwd }) {
      const target = args[0]
      if (!target) return print([error('cat: missing operand'), hint('Usage: cat <file>')])

      const resolved = resolvePath(cwd, target)
      if (!resolved) {
        return print([error(`cat: ${target}: No such file or directory`)])
      }
      if (resolved.node.type === 'dir') {
        return print([
          error(`cat: ${target}: Is a directory`),
          hint(`Try \`ls ${target}\` or \`cd ${target}\`.`),
        ])
      }

      /* Binary-ish files open in a new tab rather than printing bytes. */
      if (resolved.node.open) {
        window.open(resolved.node.open, '_blank', 'noopener')
        return print([...resolved.node.render(), ok('Opened in a new tab.')])
      }

      print(resolved.node.render())
    },
  },

  {
    name: 'tree',
    usage: 'tree [path]',
    description: 'Print the directory structure',
    category: 'system',
    completions: (cwd) => completionsFor(cwd, false),
    run({ args, print, cwd }) {
      const resolved = resolvePath(cwd, args[0] ?? '.')
      if (!resolved) return print([error(`tree: ${args[0]}: No such file or directory`)])
      if (resolved.node.type === 'file') return print([[s(resolved.node.name)]])

      const rows: Segment[][] = [[s(displayPath(resolved.segments), 'blue', true)]]
      let dirCount = 0
      let fileCount = 0

      const walk = (node: FsDir, prefix: string, depth: number) => {
        const items = entries(node)
        items.forEach((child, i) => {
          const last = i === items.length - 1
          const branch = last ? '└── ' : '├── '
          if (child.type === 'dir') {
            dirCount++
            rows.push([s(prefix + branch, 'dim'), s(child.name + '/', 'blue', true)])
            /* Two levels is enough to show the shape without flooding the screen. */
            if (depth < 1) walk(child, prefix + (last ? '    ' : '│   '), depth + 1)
          } else {
            fileCount++
            rows.push([s(prefix + branch, 'dim'), s(child.name)])
          }
        })
      }

      walk(resolved.node, '', 0)
      rows.push(blank, hint(`${dirCount} directories, ${fileCount} files`))
      print(rows)
    },
  },

  {
    name: 'neofetch',
    usage: 'neofetch',
    description: 'Display system info with the obligatory ASCII art',
    category: 'system',
    run({ print, theme }) {
      const art = [
        '        ▄▄▄▄▄        ',
        '     ▄█████████▄     ',
        '   ███▀       ▀███   ',
        '  ██▀   ▄███▄   ▀██  ',
        ' ██    ███████    ██ ',
        ' ██    ▀█████▀    ██ ',
        '  ██▄           ▄██  ',
        '   ███▄       ▄███   ',
        '     ▀█████████▀     ',
        '        ▀▀▀▀▀        ',
      ]

      const info: Segment[][] = [
        [s(`${identity.handle}`, 'green', true), s('@', 'dim'), s('portfolio', 'green', true)],
        [s('─────────────────────────', 'dim')],
        [s('Role      ', 'cyan', true), s(identity.role)],
        [s('Education ', 'cyan', true), s(`BSc (Hons) CS — ${education.honours}`)],
        [s('Uni       ', 'cyan', true), s('Kingston University, London')],
        [s('Location  ', 'cyan', true), s(identity.location)],
        [s('Shell     ', 'cyan', true), s('portfolio-sh 4.0')],
        [s('Theme     ', 'cyan', true), s(theme)],
        [s('Projects  ', 'cyan', true), s(`${projects.length} tracked`)],
        [s('Certs     ', 'cyan', true), s(`${certifications.length}`)],
        [s('Articles  ', 'cyan', true), s('50+ (150K+ views)')],
        [s('Focus     ', 'cyan', true), s(identity.focus.join(', '))],
      ]

      const rows: Segment[][] = []
      const height = Math.max(art.length, info.length)
      for (let i = 0; i < height; i++) {
        const artRow = s((art[i] ?? '').padEnd(22), 'cyan', true)
        rows.push([artRow, ...(info[i] ?? [])])
      }
      print(rows)
    },
  },

  {
    name: 'history',
    usage: 'history',
    description: 'Show commands run this session',
    category: 'system',
    run({ history, print }) {
      if (!history.length) return print([hint('No history yet.')])
      print(history.map((h, i) => [s(String(i + 1).padStart(4) + '  ', 'dim'), s(h)]))
    },
  },

  {
    name: 'theme',
    usage: 'theme [dark|light]',
    description: 'Switch the site between dark and light',
    category: 'system',
    completions: () => ['dark', 'light'],
    run({ args, print, theme, toggleTheme }) {
      const want = args[0]?.toLowerCase()
      if (!want) return print([[s('Current theme: ', 'dim'), s(theme, 'cyan', true)], hint('Usage: theme dark | theme light')])
      if (want !== 'dark' && want !== 'light') return print([error(`unknown theme "${want}" — expected dark or light`)])
      if (want === theme) return print([hint(`Already using the ${theme} theme.`)])
      toggleTheme()
      print([ok(`Switched to ${want} theme.`)])
    },
  },

  {
    name: 'clear',
    usage: 'clear',
    description: 'Clear the terminal scrollback',
    category: 'system',
    aliases: ['cls'],
    run({ clear }) {
      clear()
    },
  },

  {
    name: 'date',
    usage: 'date',
    description: 'Print the current date and time',
    category: 'system',
    run({ print }) {
      print([line(new Date().toString())])
    },
  },

  {
    name: 'echo',
    usage: 'echo <text>',
    description: 'Write text back to the terminal',
    category: 'system',
    run({ args, print }) {
      print([line(args.join(' '))])
    },
  },

  {
    name: 'pwd',
    usage: 'pwd',
    description: 'Print the working directory',
    category: 'system',
    run({ print, cwd }) {
      print([line(cwd.length ? `${HOME}/${cwd.join('/')}` : HOME)])
    },
  },

  {
    name: 'resume',
    usage: 'resume',
    description: 'Open the full CV as a PDF in a new tab',
    category: 'system',
    run({ print }) {
      window.open(resumePath, '_blank', 'noopener,noreferrer')
      print([ok('Opening Kalhara_Tennakoon_Resume.pdf in a new tab…')])
    },
  },

  /* ── devops ─────────────────────────────────────────────────────────── */
  {
    name: 'kubectl',
    usage: 'kubectl get <resource>',
    description: 'Query projects, skills, nodes, certs and deployments',
    category: 'devops',
    aliases: ['k'],
    completions: () => ['get', 'describe'],
    run({ args, print }) {
      const [verb, resource, name] = args

      if (!verb) {
        return print([
          error('kubectl: no subcommand'),
          hint('Usage: kubectl get <resource> | kubectl describe <resource> <name>'),
          hint(`Resources: ${Object.keys(kubectlResources).sort().join(', ')}`),
        ])
      }

      if (verb === 'get') {
        if (!resource) {
          return print([
            error('You must specify a resource type'),
            hint(`Valid resources: ${Object.keys(kubectlResources).sort().join(', ')}`),
          ])
        }
        const render = kubectlResources[resource]
        if (!render) {
          return print([
            error(`the server doesn't have a resource type "${resource}"`),
            hint(`Valid resources: ${Object.keys(kubectlResources).sort().join(', ')}`),
          ])
        }
        const rows = render()
        return print([
          ...rows,
          blank,
          hint(
            resource === 'projects' || resource === 'pods'
              ? 'Drill in with `kubectl describe projects <name>`.'
              : 'Tip: `kubectl get all` is not implemented — try `help`.',
          ),
        ])
      }

      if (verb === 'describe') {
        if (!resource || !name) {
          return print([
            error('describe requires a resource type and a name'),
            hint('Example: kubectl describe projects vetcare-pro'),
          ])
        }
        if (resource === 'projects' || resource === 'project' || resource === 'pods') {
          return print(describeProject(name))
        }
        if (resource === 'deployments' || resource === 'deployment') {
          return print(describeExperience(name))
        }
        return print([error(`cannot describe resource type "${resource}"`)])
      }

      print([error(`unknown kubectl subcommand "${verb}"`), hint('Supported: get, describe')])
    },
  },

  {
    name: 'docker',
    usage: 'docker ps',
    description: 'Show what I am actively working on',
    category: 'devops',
    completions: () => ['ps', 'images'],
    run({ args, print }) {
      const sub = args[0] ?? 'ps'

      if (sub === 'images') {
        return print(
          table(
            [
              { header: 'repository', color: 'cyan' },
              { header: 'tag', color: 'yellow' },
              { header: 'size', color: 'dim' },
            ],
            skills.map((g) => [g.id, 'latest', `${g.items.length} layers`]),
          ),
        )
      }

      if (sub !== 'ps') {
        return print([error(`docker: '${sub}' is not a supported command here`), hint('Supported: ps, images')])
      }

      const running = [
        { id: 'e4a91c7f2b0d', image: 'solarcast:latest', status: 'Up 4 months', ports: 'ml/forecasting' },
        { id: '9c3f0a5d81e6', image: 'devsecops-practice:latest', status: 'Up 2 years', ports: 'security/ci-cd' },
        { id: '1b7d62e9f403', image: 'mlops-learning:latest', status: 'Up 8 months', ports: 'ai/infrastructure' },
        { id: 'a05e13c7d9b2', image: 'technical-writing:latest', status: 'Up 4 years', ports: 'medium/150k-views' },
      ]

      print([
        ...table(
          [
            { header: 'container id', color: 'dim' },
            { header: 'image', color: 'cyan' },
            { header: 'status', color: 'green' },
            { header: 'focus' },
          ],
          running.map((r) => [r.id, r.image, r.status, r.ports]),
        ),
        blank,
        hint('These are current focus areas, not literal containers.'),
      ])
    },
  },

  {
    name: 'terraform',
    usage: 'terraform show',
    description: 'Render work experience as infrastructure state',
    category: 'devops',
    aliases: ['tf'],
    completions: () => ['show', 'plan', 'state'],
    run({ args, print }) {
      const sub = args[0] ?? 'show'

      if (sub === 'plan') {
        return print([
          line('Terraform will perform the following actions:'),
          blank,
          [s('  # career.next_role', 'cyan'), s(' will be created', 'green')],
          [s('  + resource ', 'green'), s('"career" "next_role" {')],
          [s('      + title       = ', 'green'), s('"DevOps / Platform Engineer"', 'yellow')],
          [s('      + focus       = ', 'green'), s('["DevSecOps", "MLOps", "AI Infrastructure"]', 'yellow')],
          [s('      + location    = ', 'green'), s('"Remote / Hybrid"', 'yellow')],
          [s('      + start_date  = ', 'green'), s('(known after apply)', 'dim')],
          [s('    }', 'green')],
          blank,
          [s('Plan: ', 'white', true), s('1 to add, 0 to change, 0 to destroy.', 'green')],
          blank,
          hint('Run `cat contact.md` to apply.'),
        ])
      }

      if (sub === 'state') {
        return print([
          ...experience.map((e) => [s('career.experience.', 'dim'), s(e.id, 'cyan')]),
          ...projects.map((p) => [s('career.project.', 'dim'), s(p.id, 'cyan')]),
        ])
      }

      if (sub !== 'show') {
        return print([error(`terraform: unsupported subcommand "${sub}"`), hint('Supported: show, plan, state')])
      }

      const rows: Segment[][] = [line('# career.tfstate', 'dim'), blank]
      for (const e of experience) {
        rows.push(
          [s('resource ', 'magenta'), s('"experience" ', 'yellow'), s(`"${e.id}"`, 'cyan'), s(' {')],
          [s('  title    = ', 'dim'), s(`"${e.title}"`, 'yellow')],
          [s('  company  = ', 'dim'), s(`"${e.company}"`, 'yellow')],
          [s('  period   = ', 'dim'), s(`"${e.period}"`, 'yellow')],
          [s('  outcomes = [', 'dim')],
        )
        for (const h of e.highlights) {
          rows.push(...paragraph(`"${h}",`, 'yellow', 72, '    '))
        }
        rows.push([s('  ]', 'dim')], [s('}')], blank)
      }
      rows.push(hint('Try `terraform plan` to see what comes next.'))
      print(rows)
    },
  },

  {
    name: 'helm',
    usage: 'helm list',
    description: 'List certifications as installed releases',
    category: 'devops',
    completions: () => ['list'],
    run({ args, print }) {
      const sub = args[0] ?? 'list'
      if (sub !== 'list' && sub !== 'ls') {
        return print([error(`helm: unsupported subcommand "${sub}"`), hint('Supported: list')])
      }
      print([
        ...table(
          [
            { header: 'name', color: 'cyan' },
            { header: 'namespace', color: 'magenta' },
            { header: 'status', color: 'green' },
            { header: 'updated', color: 'dim' },
          ],
          certifications.map((c) => [
            c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
            c.group,
            'deployed',
            c.date,
          ]),
        ),
        blank,
        hint(`${certifications.length} releases across 2 namespaces. Issuers: kubectl get certs`),
      ])
    },
  },

  {
    name: 'argocd',
    usage: 'argocd app list',
    description: 'Show projects as GitOps applications',
    category: 'devops',
    run({ print }) {
      print([
        ...table(
          [
            { header: 'name', color: 'cyan' },
            { header: 'sync status', color: 'green' },
            { header: 'health', color: 'green' },
            { header: 'repo' },
          ],
          projects.map((p) => [
            p.name,
            'Synced',
            p.status === 'Running' ? 'Progressing' : 'Healthy',
            p.github ? p.github.replace('https://github.com/', '') : 'private',
          ]),
        ),
        blank,
        hint('Open sources with `gh repo list`.'),
      ])
    },
  },

  {
    name: 'git',
    usage: 'git log',
    description: 'Show my career timeline as a commit history',
    category: 'devops',
    completions: () => ['log', 'status'],
    run({ args, print }) {
      const sub = args[0] ?? 'log'

      if (sub === 'status') {
        return print([
          line('On branch main'),
          line("Your branch is up to date with 'origin/main'."),
          blank,
          [s('Changes staged for commit:', 'green')],
          [s('  new file:   ', 'green'), s('next-role.tf')],
          blank,
          [s('Untracked files:', 'red')],
          [s('  ', 'dim'), s('opportunities/', 'red')],
          blank,
          hint("Run `cat contact.md` to open a PR on my career."),
        ])
      }

      if (sub !== 'log') {
        return print([error(`git: '${sub}' is not supported here`), hint('Supported: log, status')])
      }

      const rows: Segment[][] = []
      for (const c of timeline) {
        rows.push([
          s(c.hash, 'yellow'),
          s('  '),
          s(c.date, 'dim'),
          s('  '),
          s(c.subject),
        ])
      }
      print([...rows, blank, hint(`${timeline.length} commits · newest first`)])
    },
  },

  {
    name: 'gh',
    usage: 'gh repo list',
    description: 'List public repositories with links',
    category: 'devops',
    run({ print }) {
      const withSource = projects.filter((p) => p.github)
      print([
        ...withSource.map((p) => [
          s(p.name.padEnd(24), 'cyan', true),
          s(p.tagline.slice(0, 42).padEnd(44), 'dim'),
          link('open ↗', p.github!),
        ]),
        blank,
        [s('  profile  ', 'dim'), link('github.com/kalharatennakoon', 'https://github.com/kalharatennakoon')],
      ])
    },
  },

  {
    name: 'pipeline',
    usage: 'pipeline run [flags]',
    description: 'Run a parameterised CI/CD pipeline, gate and all',
    category: 'devops',
    aliases: ['ci'],
    completions: () => pipelineCompletions(),
    async run({ args, print, sleep, aborted }) {
      if (args[0] && args[0] !== 'run' && !args[0].startsWith('--')) {
        return print([
          error(`pipeline: unknown subcommand "${args[0]}"`),
          hint('Usage: pipeline run [--cluster=aks|gke|eks|rancher] [--gate=fail-on-high|log-and-continue] [--inject-exploit] [--dry-run]'),
        ])
      }

      const { config, dryRun, errors } = parseFlags(args)
      if (errors.length) {
        return print([
          ...errors,
          hint('Usage: pipeline run [--cluster=…] [--gate=…] [--inject-exploit] [--dry-run]'),
        ])
      }

      /* `--dry-run` renders the manifest this run would submit, without running it. */
      if (dryRun) {
        return print([
          ...renderPipelineYaml(config),
          blank,
          hint('Dry run — nothing was executed. Drop `--dry-run` to run it.'),
        ])
      }

      await runPipeline(config, { print, sleep, aborted })
    },
  },

  {
    name: 'uptime',
    usage: 'uptime',
    description: 'Show career uptime and current load',
    category: 'devops',
    run({ print }) {
      print([
        [
          s(new Date().toLocaleTimeString(), 'white'),
          s('  up ', 'dim'),
          s('6 years', 'cyan', true),
          s(' in tech,  ', 'dim'),
          s('2 internships', 'cyan', true),
          s(',  load average: ', 'dim'),
          s('0.72, 0.65, 0.58', 'green'),
        ],
        blank,
        ...community.map((c) => [
          s('  ' + c.role.padEnd(20), 'cyan'),
          s(c.org.padEnd(32), 'white'),
          s(c.period, 'dim'),
        ]),
      ])
    },
  },

  {
    name: 'curl',
    usage: 'curl /api/<endpoint>',
    description: 'Fetch profile data as JSON',
    category: 'devops',
    completions: () => ['/api/contact', '/api/stats', '/api/health', '/api/education'],
    run({ args, print }) {
      const endpoint = (args[0] ?? '').replace(/^https?:\/\/[^/]+/, '')

      const payloads: Record<string, Segment[][]> = {
        '/api/contact': [
          line('{'),
          [s('  "email": ', 'cyan'), link(`"${identity.email}"`, `mailto:${identity.email}`), s(',')],
          ...links.map((l, i) => [
            s(`  "${l.label.toLowerCase().replace(/\s+/g, '_')}": `, 'cyan'),
            link(`"${l.url}"`, l.url),
            s(i === links.length - 1 ? '' : ','),
          ]),
          line('}'),
        ],
        '/api/stats': [
          line('{'),
          ...stats.map((st, i) => [
            s(`  "${st.label.toLowerCase().replace(/\s+/g, '_')}": `, 'cyan'),
            s(`"${st.value}"`, 'yellow'),
            s(i === stats.length - 1 ? '' : ','),
          ]),
          line('}'),
        ],
        '/api/health': [
          line('{'),
          [s('  "status": ', 'cyan'), s('"healthy"', 'green'), s(',')],
          [s('  "available_for_hire": ', 'cyan'), s('true', 'green'), s(',')],
          [s('  "response_time_ms": ', 'cyan'), s('42', 'yellow')],
          line('}'),
        ],
        '/api/education': [
          line('{'),
          [s('  "degree": ', 'cyan'), s(`"${education.degree}"`, 'yellow'), s(',')],
          [s('  "honours": ', 'cyan'), s(`"${education.honours}"`, 'yellow'), s(',')],
          [s('  "university": ', 'cyan'), s(`"${education.university}"`, 'yellow'), s(',')],
          [s('  "graduation": ', 'cyan'), s(`"${education.graduation}"`, 'yellow'), s(',')],
          [s('  "final_year_project": ', 'cyan'), s(`"${education.finalYearProject}"`, 'yellow')],
          line('}'),
        ],
      }

      if (!endpoint) {
        return print([error('curl: no URL specified'), hint(`Endpoints: ${Object.keys(payloads).join(', ')}`)])
      }

      const body = payloads[endpoint]
      if (!body) {
        return print([
          [s('HTTP/2 ', 'dim'), s('404 Not Found', 'red', true)],
          blank,
          hint(`Available endpoints: ${Object.keys(payloads).join(', ')}`),
        ])
      }

      print([
        [s('HTTP/2 ', 'dim'), s('200 OK', 'green', true)],
        [s('content-type: application/json', 'dim')],
        blank,
        ...body,
      ])
    },
  },

  /* ── navigation ─────────────────────────────────────────────────────── */
  {
    name: 'cd',
    usage: 'cd <directory>',
    description: 'Change the working directory',
    category: 'navigation',
    completions: (cwd) => completionsFor(cwd, false),
    run({ args, print, cwd, setCwd }) {
      const target = args[0] ?? '~'

      const resolved = resolvePath(cwd, target)
      if (!resolved) {
        return print([error(`cd: ${target}: No such file or directory`)])
      }
      if (resolved.node.type !== 'dir') {
        return print([error(`cd: ${target}: Not a directory`)])
      }

      /* Deliberately does not scroll the page: changing directory should
         leave the reader where they are, with the cursor in the shell. */
      setCwd(resolved.segments)

      print([hint(`Now in ${displayPath(resolved.segments)} — run \`ls\` to see what's here.`)])
    },
  },

  {
    name: 'open',
    usage: 'open <link>',
    description: 'Open a profile link in a new tab',
    category: 'navigation',
    completions: () => links.map((l) => l.label.toLowerCase().replace(/\s+/g, '')),
    run({ args, print }) {
      const key = (args[0] ?? '').toLowerCase().replace(/\s+/g, '')
      if (!key) {
        return print([
          error('open: missing target'),
          hint(`Targets: ${links.map((l) => l.label.toLowerCase().replace(/\s+/g, '')).join(', ')}`),
        ])
      }

      const found = links.find((l) => l.label.toLowerCase().replace(/\s+/g, '') === key)
      if (!found) {
        return print([
          error(`open: unknown target "${key}"`),
          hint(`Targets: ${links.map((l) => l.label.toLowerCase().replace(/\s+/g, '')).join(', ')}`),
        ])
      }

      window.open(found.url, '_blank', 'noopener,noreferrer')
      print([ok(`Opening ${found.label} → ${found.url}`)])
    },
  },

  /* ── fun / hidden ───────────────────────────────────────────────────── */
  {
    name: 'sudo',
    usage: 'sudo <command>',
    description: 'Elevate privileges',
    category: 'fun',
    hidden: true,
    run({ print }) {
      print([
        line('[sudo] password for guest:', 'dim'),
        blank,
        [s('kalhara is not in the sudoers file. This incident has been reported.', 'red')],
        blank,
        hint('Nice try. Everything here is already readable — try `ls -l`.'),
      ])
    },
  },

  {
    name: 'exit',
    usage: 'exit',
    description: 'Close the session',
    category: 'fun',
    hidden: true,
    aliases: ['quit', 'logout'],
    run({ print }) {
      print([
        line('logout'),
        blank,
        hint('There is no escape — but there is a scroll bar. Try `cd projects`.'),
      ])
    },
  },

  {
    name: 'coffee',
    usage: 'coffee',
    description: 'Brew a coffee',
    category: 'fun',
    hidden: true,
    async run({ print, sleep }) {
      print([line('Brewing…', 'dim')])
      await sleep(700)
      print([
        [s('  ( (', 'dim')],
        [s('   ) )', 'dim')],
        [s('  ┌────┐', 'yellow')],
        [s('  │    │═╗', 'yellow')],
        [s('  │    │ ║', 'yellow')],
        [s('  └────┘═╝', 'yellow')],
        blank,
        [s('418 I\'m a teapot', 'magenta', true)],
      ])
    },
  },

  {
    name: 'man',
    usage: 'man <command>',
    description: 'Show the manual for a command',
    category: 'system',
    hidden: true,
    completions: () => commands.map((c) => c.name),
    run({ args, print }) {
      const cmd = resolve(args[0] ?? '')
      if (!cmd) return print([error(`No manual entry for ${args[0] ?? ''}`)])
      print([
        [s('NAME', 'yellow', true)],
        [s('    ' + cmd.name, 'cyan'), s(' — ' + cmd.description)],
        blank,
        [s('SYNOPSIS', 'yellow', true)],
        [s('    ' + cmd.usage, 'green')],
        blank,
        [s('CATEGORY', 'yellow', true)],
        [s('    ' + cmd.category)],
      ])
    },
  },
]

/** Resolve a name or alias to its command. */
export function resolve(name: string): Command | undefined {
  const key = name.toLowerCase()
  return commands.find((c) => c.name === key || c.aliases?.includes(key))
}

/** Names offered by tab completion (aliases excluded to keep the list short). */
export function completableNames(): string[] {
  return commands.filter((c) => !c.hidden).map((c) => c.name)
}

/** Parse an input string into a command and its arguments. */
export function parse(input: string): { name: string; args: string[] } {
  const parts = input.trim().split(/\s+/)
  return { name: parts[0] ?? '', args: parts.slice(1) }
}

export type { Command, CommandContext }
