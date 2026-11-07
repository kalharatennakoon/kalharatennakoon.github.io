import { useState, useEffect } from 'react'
import {
  FaSun, FaMoon, FaBars, FaTimes, FaSearch, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'
import { soundFx } from '../utils/sound'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

const navLinks = [
  { label: 'About',          href: '#about' },
  { label: 'Terminal',       href: '#terminal' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Education',      href: '#education' },
  { label: 'Achievements',   href: '#achievements' },
  { label: 'Writing',        href: '#blog' },
  { label: 'Contact',        href: '#contact' },
]

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [soundEnabled, setSoundEnabled] = useState(soundFx.isEnabled())
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0)

      // Scrollspy
      const sections = ['hero', 'about', 'terminal', 'projects', 'experience', 'skills', 'education', 'certifications', 'achievements', 'activities', 'blog', 'contact']
      const scrollPos = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Listen for global shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenCommandPalette()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onOpenCommandPalette])

  const handleToggleSound = () => {
    const next = soundFx.toggle()
    setSoundEnabled(next)
  }

  const handleNavClick = (href: string) => {
    soundFx.tab()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* ── Top Scroll Reading Progress Bar ────────────────────────────── */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[10000] bg-transparent pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Floating Island Header ────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[1000] flex flex-col items-center pointer-events-none px-4 pt-3 sm:pt-4">
        <div
          className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 relative rounded-full ${
            scrolled ? 'py-2 px-4 sm:px-6 shadow-2xl' : 'py-3 px-5 sm:px-7 shadow-lg'
          }`}
          style={{
            background: isDark
              ? 'rgba(11, 18, 36, 0.78)'
              : 'rgba(255, 255, 255, 0.82)',
            backdropFilter: 'blur(20px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
            border: isDark
              ? '1px solid rgba(255, 255, 255, 0.12)'
              : '1px solid rgba(226, 232, 240, 0.9)',
            boxShadow: isDark
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 10px 30px -10px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
          }}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo & Status Beacon */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick('#hero')
              }}
              className="flex items-center gap-2.5 text-base font-extrabold tracking-tight group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-mono text-xs shadow-md group-hover:scale-105 transition-transform">
                KT
              </div>
              <span className="text-[var(--text-primary)] font-bold tracking-tight">
                Kalhara
                <span className="text-sky-500">.</span>
              </span>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 ml-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open for roles</span>
              </div>
            </a>

            {/* Desktop Navigation Links (with Scrollspy) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(link.href)
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 relative ${
                      isActive
                        ? 'text-sky-400 bg-sky-500/12 shadow-sm font-bold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-slate-500/10'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-sky-400 rounded-full" />
                    )}
                  </a>
                )
              })}
            </nav>

            {/* Action Tools Cluster: Command Palette, Sound FX, Theme Toggle, Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Quick Search / Command Palette Button */}
              <button
                onClick={() => {
                  soundFx.click()
                  onOpenCommandPalette()
                }}
                className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-sky-500/40 border border-[var(--border-color)] transition-all shadow-sm"
                title="Open Command Palette (⌘K)"
                aria-label="Open Command Palette"
              >
                <FaSearch className="text-[11px] text-sky-400" />
                <span className="hidden md:inline text-[11px]">Search</span>
                <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[10px] bg-slate-500/15 border border-[var(--border-color)] rounded font-mono text-[var(--text-secondary)]">
                  ⌘K
                </kbd>
              </button>

              {/* Sound FX Toggle */}
              <button
                onClick={handleToggleSound}
                className={`p-2 rounded-full text-xs transition-all border ${
                  soundEnabled
                    ? 'text-sky-400 border-sky-400/30 bg-sky-500/10'
                    : 'text-[var(--text-secondary)] border-transparent hover:bg-slate-500/10'
                }`}
                title={soundEnabled ? 'Mute sound effects' : 'Enable interface sound effects'}
                aria-label="Toggle sound FX"
              >
                {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={() => {
                  soundFx.click()
                  toggleTheme()
                }}
                className="p-2 rounded-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-color)] hover:bg-slate-500/10 transition-all"
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <FaSun className="text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <FaMoon className="text-indigo-500 hover:-rotate-12 transition-transform" />
                )}
              </button>

              {/* Mobile Drawer Trigger Button */}
              <button
                onClick={() => {
                  soundFx.click()
                  setMenuOpen(!menuOpen)
                }}
                className="lg:hidden p-2 text-base text-[var(--text-primary)] rounded-full hover:bg-slate-500/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Drawer Dropdown ────────────────────────────────────────── */}
        {menuOpen && (
          <div
            className="pointer-events-auto lg:hidden w-full max-w-6xl mt-2 rounded-2xl p-4 shadow-2xl transition-all duration-300 animate-fadeIn border"
            style={{
              background: isDark ? 'rgba(11, 18, 36, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(24px)',
              borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(226, 232, 240, 0.95)',
            }}
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick(link.href)
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl text-center transition-all ${
                    activeSection === link.href.replace('#', '')
                      ? 'bg-sky-500/15 text-sky-400 font-bold border border-sky-500/30'
                      : 'text-[var(--text-primary)] hover:bg-slate-500/10'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
              <button
                onClick={() => {
                  soundFx.click()
                  setMenuOpen(false)
                  onOpenCommandPalette()
                }}
                className="flex items-center gap-2 text-xs font-semibold text-sky-400"
              >
                <FaSearch className="text-xs" />
                <span>Open Command Palette</span>
              </button>
              <a
                href="/Kalhara_Tennakoon_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-400 underline underline-offset-4"
              >
                Download CV
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar
