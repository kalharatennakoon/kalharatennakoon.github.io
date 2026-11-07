import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import {
  FaSearch, FaTimes, FaTerminal, FaFilePdf, FaEnvelope, FaGithub,
  FaLinkedin, FaMedium, FaSun, FaMoon, FaCode, FaBriefcase, FaGraduationCap,
  FaAward, FaTrophy, FaNewspaper, FaVolumeUp, FaVolumeMute, FaArrowRight
} from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import { soundFx } from '../utils/sound'

interface CommandItem {
  id: string
  title: string
  category: 'Navigation' | 'Actions' | 'Terminal Commands' | 'Social'
  icon: React.ReactNode
  keywords?: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  const { theme, toggleTheme } = useTheme()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled())
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    soundFx.click()
    const timer = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = useCallback((id: string) => {
    onClose()
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [onClose])

  const runTerminalCommand = useCallback((cmd: string) => {
    onClose()
    const termEl = document.getElementById('terminal') || document.getElementById('about')
    if (termEl) {
      termEl.scrollIntoView({ behavior: 'smooth' })
    }
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('portfolio:terminal-exec', { detail: { command: cmd } }))
    }, 400)
  }, [onClose])

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText('kalhara@kalharatennakoon.com')
    soundFx.success()
    alert('Email copied to clipboard: kalhara@kalharatennakoon.com')
    onClose()
  }, [onClose])

  const handleToggleSound = useCallback(() => {
    const next = soundFx.toggle()
    setSoundEnabled(next)
  }, [])

  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'nav-hero',
      title: 'Home / Hero',
      category: 'Navigation',
      icon: <FaArrowRight className="text-cyan-400" />,
      keywords: 'top start intro kalhara',
      action: () => scrollToSection('hero'),
    },
    {
      id: 'nav-about',
      title: 'About & Highlights',
      category: 'Navigation',
      icon: <FaArrowRight className="text-cyan-400" />,
      keywords: 'bio summary profile story background',
      action: () => scrollToSection('about'),
    },
    {
      id: 'nav-terminal',
      title: 'Interactive Shell / Terminal',
      category: 'Navigation',
      icon: <FaTerminal className="text-emerald-400" />,
      keywords: 'cli shell bash sh console command',
      action: () => scrollToSection('terminal'),
    },
    {
      id: 'nav-projects',
      title: 'Featured Projects',
      category: 'Navigation',
      icon: <FaCode className="text-blue-400" />,
      keywords: 'vetcare solarcast strongcv shortlisted know your letter apps work',
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-experience',
      title: 'Work Experience',
      category: 'Navigation',
      icon: <FaBriefcase className="text-indigo-400" />,
      keywords: 'ifs jobs career devops swe software engineer internship history',
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-skills',
      title: 'Skills & Tech Matrix',
      category: 'Navigation',
      icon: <FaCode className="text-teal-400" />,
      keywords: 'kubernetes docker tekton python react golang ci cd cloud aws azure gcp',
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-education',
      title: 'Education',
      category: 'Navigation',
      icon: <FaGraduationCap className="text-yellow-400" />,
      keywords: 'kingston university bsc first class degree esu',
      action: () => scrollToSection('education'),
    },
    {
      id: 'nav-certifications',
      title: 'Certifications',
      category: 'Navigation',
      icon: <FaAward className="text-amber-400" />,
      keywords: 'ibm github intel cisco linux foundation azure google cloud credly',
      action: () => scrollToSection('certifications'),
    },
    {
      id: 'nav-achievements',
      title: 'Honors & Achievements',
      category: 'Navigation',
      icon: <FaTrophy className="text-yellow-500" />,
      keywords: 'ascentic ai launch pad batch top kubecon dan kohn awards',
      action: () => scrollToSection('achievements'),
    },
    {
      id: 'nav-blog',
      title: 'Technical Articles & Blog',
      category: 'Navigation',
      icon: <FaNewspaper className="text-pink-400" />,
      keywords: 'medium writing publication devops kubernetes views',
      action: () => scrollToSection('blog'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Me',
      category: 'Navigation',
      icon: <FaEnvelope className="text-cyan-400" />,
      keywords: 'reach out hire message email send form',
      action: () => scrollToSection('contact'),
    },

    // Actions
    {
      id: 'act-resume',
      title: 'View / Download Resume (PDF)',
      category: 'Actions',
      icon: <FaFilePdf className="text-red-400" />,
      keywords: 'cv resume curriculum vitae download pdf',
      action: () => {
        window.open('/Kalhara_Tennakoon_CV.pdf', '_blank')
        onClose()
      },
    },
    {
      id: 'act-copy-email',
      title: 'Copy Email Address',
      category: 'Actions',
      icon: <FaEnvelope className="text-cyan-400" />,
      keywords: 'copy email address mail kalhara@kalharatennakoon.com',
      action: copyEmail,
    },
    {
      id: 'act-theme',
      title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon className="text-indigo-400" />,
      keywords: 'dark light theme toggle mode appearance',
      action: () => {
        toggleTheme()
        onClose()
      },
    },
    {
      id: 'act-sound',
      title: `${soundEnabled ? 'Disable' : 'Enable'} Interface Sound FX`,
      category: 'Actions',
      icon: soundEnabled ? <FaVolumeMute className="text-gray-400" /> : <FaVolumeUp className="text-cyan-400" />,
      keywords: 'sound audio click beep volume mute haptic fx',
      action: handleToggleSound,
    },

    // Terminal Commands
    {
      id: 'cmd-pipeline',
      title: 'Run CI/CD Pipeline (Terminal: pipeline run)',
      category: 'Terminal Commands',
      icon: <FaTerminal className="text-emerald-400" />,
      keywords: 'pipeline run build test deploy tekton argo',
      action: () => runTerminalCommand('pipeline run'),
    },
    {
      id: 'cmd-k8s',
      title: 'List Cluster Projects (Terminal: kubectl get projects)',
      category: 'Terminal Commands',
      icon: <FaTerminal className="text-emerald-400" />,
      keywords: 'kubectl get projects kubernetes k8s pods',
      action: () => runTerminalCommand('kubectl get projects'),
    },
    {
      id: 'cmd-whoami',
      title: 'Inspect Identity (Terminal: whoami)',
      category: 'Terminal Commands',
      icon: <FaTerminal className="text-emerald-400" />,
      keywords: 'whoami user identity role bio',
      action: () => runTerminalCommand('whoami'),
    },
    {
      id: 'cmd-gitlog',
      title: 'View Career Commit Log (Terminal: git log)',
      category: 'Terminal Commands',
      icon: <FaTerminal className="text-emerald-400" />,
      keywords: 'git log history timeline commits',
      action: () => runTerminalCommand('git log'),
    },

    // Social Links
    {
      id: 'soc-github',
      title: 'GitHub Profile (@kalharatennakoon)',
      category: 'Social',
      icon: <FaGithub className="text-gray-300" />,
      keywords: 'github code repo git source',
      action: () => {
        window.open('https://github.com/kalharatennakoon', '_blank')
        onClose()
      },
    },
    {
      id: 'soc-linkedin',
      title: 'LinkedIn Profile (/in/kalharatennakoon)',
      category: 'Social',
      icon: <FaLinkedin className="text-blue-500" />,
      keywords: 'linkedin network connect professional profile',
      action: () => {
        window.open('https://www.linkedin.com/in/kalharatennakoon', '_blank')
        onClose()
      },
    },
    {
      id: 'soc-medium',
      title: 'Medium Blog (@kalharatennakoon)',
      category: 'Social',
      icon: <FaMedium className="text-emerald-400" />,
      keywords: 'medium articles blog publications',
      action: () => {
        window.open('https://kalharatennakoon.medium.com', '_blank')
        onClose()
      },
    },
  ], [theme, soundEnabled, toggleTheme, scrollToSection, runTerminalCommand, copyEmail, handleToggleSound, onClose])

  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands.filter((cmd) =>
      cmd.title.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q) ||
      (cmd.keywords && cmd.keywords.toLowerCase().includes(q))
    )
  }, [commands, query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      soundFx.tab()
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      soundFx.tab()
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredCommands[selectedIndex]) {
        soundFx.click()
        filteredCommands[selectedIndex].action()
      }
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const activeEl = list.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-md transition-opacity duration-200 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl transition-all transform animate-scaleUp"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-[var(--border-color)] bg-slate-900/10">
          <FaSearch className="text-[var(--text-secondary)] text-lg mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search sections, projects, commands, or quick actions... (↑↓ to navigate)"
            className="w-full bg-transparent text-[var(--text-primary)] placeholder-[var(--text-secondary)] text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setSelectedIndex(0)
              }}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm mr-2 p-1"
              aria-label="Clear query"
            >
              <FaTimes />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded font-mono shadow-sm">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto py-2 px-2 divide-y divide-transparent"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-secondary)]">
              <p className="text-base font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for "projects", "skills", "terminal", or "resume"</p>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={cmd.id}
                  data-index={idx}
                  onClick={() => {
                    soundFx.click()
                    cmd.action()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-gradient-to-r from-sky-500/15 via-blue-500/10 to-transparent border border-sky-500/30 text-[var(--text-primary)] shadow-sm'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-slate-500/5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="p-2 rounded-lg bg-[var(--bg-secondary)] text-base border border-[var(--border-color)] flex-shrink-0">
                      {cmd.icon}
                    </span>
                    <div className="truncate">
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {cmd.title}
                      </div>
                      <div className="text-xs text-[var(--text-secondary)] opacity-75">
                        {cmd.category}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <kbd className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                      ↵ Enter
                    </kbd>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-2.5 bg-slate-900/20 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded font-mono">↑</kbd>{' '}
              <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded font-mono">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded font-mono">↵</kbd> Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded font-mono">ESC</kbd> Close
            </span>
          </div>
          <span className="font-mono text-[11px] opacity-75">Kalhara Command Palette</span>
        </div>
      </div>
    </div>
  )
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  if (!isOpen) return null
  return <CommandPaletteModal onClose={onClose} />
}
