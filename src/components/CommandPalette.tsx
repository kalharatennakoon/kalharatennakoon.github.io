import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FaArrowRight, FaBook, FaCopy, FaFilePdf, FaGithub, FaLinkedin, FaMedium,
  FaMoon, FaSearch, FaSun, FaTerminal,
} from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'

type Group = 'Go to' | 'Actions' | 'Run in terminal' | 'Profiles'

interface CommandItem {
  id: string
  title: string
  group: Group
  icon: React.ReactNode
  keywords?: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

const sections: { id: string; title: string; keywords: string }[] = [
  { id: 'hero', title: 'Top of page', keywords: 'home intro start' },
  { id: 'about', title: 'About', keywords: 'bio summary profile background' },
  { id: 'projects', title: 'Projects', keywords: 'vetcare solarcast strongcv shortlisted know your letter apps work' },
  { id: 'experience', title: 'Experience', keywords: 'ifs internship devops software engineer jobs career' },
  { id: 'education', title: 'Education and logbook', keywords: 'kingston university bsc first class degree esu book logbook' },
  { id: 'skills', title: 'Skills', keywords: 'kubernetes docker tekton python react go cloud aws azure gcp stack' },
  { id: 'terminal', title: 'Terminal', keywords: 'shell cli console command bash' },
  { id: 'certifications', title: 'Certifications', keywords: 'ibm github intel cisco linux foundation azure google credly' },
  { id: 'achievements', title: 'Honours', keywords: 'ascentic launch pad batch top kubecon dan kohn awards hackathon' },
  { id: 'blog', title: 'Writing', keywords: 'medium articles blog posts' },
  { id: 'contact', title: 'Contact', keywords: 'email hire message reach' },
]

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const [notice, setNotice] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const goTo = useCallback((id: string) => {
    onClose()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [onClose])

  const runInTerminal = useCallback((cmd: string) => {
    onClose()
    document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' })
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent('portfolio:terminal-exec', { detail: { command: cmd } }))
    }, 450)
  }, [onClose])

  const open = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    onClose()
  }, [onClose])

  const commands: CommandItem[] = useMemo(() => [
    ...sections.map((s) => ({
      id: `go-${s.id}`,
      title: s.title,
      group: 'Go to' as const,
      icon: s.id === 'education' ? <FaBook /> : <FaArrowRight />,
      keywords: s.keywords,
      action: () => goTo(s.id),
    })),
    {
      id: 'cv',
      title: 'Download CV (PDF)',
      group: 'Actions',
      icon: <FaFilePdf />,
      keywords: 'resume curriculum vitae pdf',
      action: () => open('/Kalhara_Tennakoon_CV.pdf'),
    },
    {
      id: 'copy-email',
      title: 'Copy email address',
      group: 'Actions',
      icon: <FaCopy />,
      keywords: 'email mail kalhara@kalharatennakoon.com',
      action: () => {
        navigator.clipboard
          .writeText('kalhara@kalharatennakoon.com')
          .then(() => setNotice('Copied kalhara@kalharatennakoon.com'))
          .catch(() => setNotice('Copy failed. The address is kalhara@kalharatennakoon.com'))
        window.setTimeout(onClose, 1100)
      },
    },
    {
      id: 'theme',
      title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
      group: 'Actions',
      icon: theme === 'dark' ? <FaSun /> : <FaMoon />,
      keywords: 'dark light theme mode appearance',
      action: () => {
        toggleTheme()
        onClose()
      },
    },
    { id: 't-whoami', title: 'whoami', group: 'Run in terminal', icon: <FaTerminal />, keywords: 'identity bio', action: () => runInTerminal('whoami') },
    { id: 't-projects', title: 'kubectl get projects', group: 'Run in terminal', icon: <FaTerminal />, keywords: 'kubernetes k8s pods projects', action: () => runInTerminal('kubectl get projects') },
    { id: 't-pipeline', title: 'pipeline run', group: 'Run in terminal', icon: <FaTerminal />, keywords: 'ci cd tekton build deploy', action: () => runInTerminal('pipeline run') },
    { id: 't-gitlog', title: 'git log', group: 'Run in terminal', icon: <FaTerminal />, keywords: 'history timeline career commits', action: () => runInTerminal('git log') },
    { id: 'p-github', title: 'GitHub', group: 'Profiles', icon: <FaGithub />, keywords: 'code repositories source', action: () => open('https://github.com/kalharatennakoon') },
    { id: 'p-linkedin', title: 'LinkedIn', group: 'Profiles', icon: <FaLinkedin />, keywords: 'network professional', action: () => open('https://www.linkedin.com/in/kalharatennakoon') },
    { id: 'p-medium', title: 'Medium', group: 'Profiles', icon: <FaMedium />, keywords: 'articles blog writing', action: () => open('https://kalharatennakoon.medium.com') },
  ], [theme, toggleTheme, goTo, runInTerminal, open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) =>
      `${c.title} ${c.group} ${c.keywords ?? ''}`.toLowerCase().includes(q),
    )
  }, [commands, query])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown' && results.length) {
      e.preventDefault()
      setSelected((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp' && results.length) {
      e.preventDefault()
      setSelected((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      results[selected]?.action()
    }
  }

  let lastGroup: Group | null = null

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[3000] flex items-start justify-center bg-[rgb(10_14_22/0.45)] px-4 pt-[12vh]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="animate-pop-in w-full max-w-xl overflow-hidden rounded-xl border border-rule bg-surface shadow-[0_24px_60px_-20px_rgb(10_14_22/0.5)]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4">
          <FaSearch className="shrink-0 text-[0.875rem] text-faint" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelected(0)
            }}
            placeholder="Search sections, actions and commands"
            aria-label="Search"
            aria-controls="palette-results"
            aria-activedescendant={results[selected] ? `cmd-${results[selected].id}` : undefined}
            className="h-14 w-full bg-transparent text-[1rem] text-ink outline-none placeholder:text-faint"
          />
          <kbd className="hidden rounded border border-rule bg-sunken px-1.5 font-mono text-[0.6875rem] leading-5 text-muted sm:block">
            Esc
          </kbd>
        </div>

        {notice ? (
          <p className="px-5 py-8 text-center text-[0.9375rem] text-ink" role="status">{notice}</p>
        ) : (
          <div id="palette-results" ref={listRef} role="listbox" className="max-h-[min(26rem,60vh)] overflow-y-auto p-2">
            {results.length === 0 && (
              <p className="px-3 py-8 text-center text-[0.9375rem] text-muted">
                Nothing matches "{query}". Try "projects", "CV" or "terminal".
              </p>
            )}
            {results.map((c, i) => {
              const header = c.group !== lastGroup ? c.group : null
              lastGroup = c.group
              const isSel = i === selected
              return (
                <div key={c.id}>
                  {header && (
                    <p className="px-3 pb-1 pt-3 text-[0.75rem] font-medium text-faint">{header}</p>
                  )}
                  <div
                    id={`cmd-${c.id}`}
                    role="option"
                    aria-selected={isSel}
                    data-index={i}
                    onClick={c.action}
                    onMouseMove={() => setSelected(i)}
                    className={`flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] ${
                      isSel ? 'bg-sunken text-ink' : 'text-muted'
                    }`}
                  >
                    <span className={`text-[0.8125rem] ${isSel ? 'text-accent' : 'text-faint'}`} aria-hidden="true">
                      {c.icon}
                    </span>
                    <span className={c.group === 'Run in terminal' ? 'font-mono text-[0.875rem]' : ''}>{c.title}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null
  return <CommandPaletteModal onClose={onClose} />
}
