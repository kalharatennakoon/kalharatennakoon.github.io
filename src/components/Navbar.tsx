import { useEffect, useState } from 'react'
import { FaBars, FaMoon, FaSearch, FaSun, FaTimes } from 'react-icons/fa'
import { useTheme } from '../hooks/useTheme'

interface NavbarProps {
  onOpenCommandPalette: () => void
}

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Writing', id: 'blog' },
  { label: 'Contact', id: 'contact' },
]

const spySections = [
  'hero', 'about', 'projects', 'experience', 'education', 'skills',
  'terminal', 'certifications', 'achievements', 'blog', 'contact',
]

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const isDark = theme === 'dark'
  const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const y = window.scrollY + 160
      for (let i = spySections.length - 1; i >= 0; i--) {
        const el = document.getElementById(spySections[i])
        if (el && el.offsetTop <= y) {
          setActive(spySections[i])
          break
        }
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenCommandPalette()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onOpenCommandPalette])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', id === 'hero' ? '#' : `#${id}`)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-[background-color,border-color] duration-200 ${
        scrolled || menuOpen
          ? 'border-b border-rule bg-paper/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="page-wrap flex h-16 items-center justify-between gap-4">
        <a href="#" onClick={go('hero')} className="flex items-center gap-2.5 font-semibold text-ink">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-[0.8125rem] font-semibold text-accent-ink"
          >
            KT
          </span>
          <span className="text-[0.9688rem]">Kalhara Tennakoon</span>
        </a>

        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.id
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={go(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-md px-3 py-2 text-[0.875rem] font-medium transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-[1px] h-[2px] rounded-full bg-accent transition-opacity ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="hidden h-9 items-center gap-2 rounded-md border border-rule-strong bg-surface pl-2.5 pr-1.5 text-[0.8125rem] text-muted transition-colors hover:border-ink hover:text-ink sm:flex"
            aria-label="Search the site"
          >
            <FaSearch className="text-[0.75rem]" />
            <span>Search</span>
            <kbd className="rounded border border-rule bg-sunken px-1.5 font-mono text-[0.6875rem] leading-5">
              {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
          </button>
          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="icon-btn sm:hidden"
            aria-label="Search the site"
          >
            <FaSearch className="text-sm" />
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
          >
            {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="icon-btn lg:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes className="text-base" /> : <FaBars className="text-base" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Sections" className="border-t border-rule lg:hidden">
          <ul className="page-wrap flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={go(link.id)}
                  className={`block py-3 text-[1rem] font-medium ${
                    active === link.id ? 'text-accent' : 'text-ink'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="border-t border-rule mt-2 pt-3 pb-2">
              <a
                href="/Kalhara_Tennakoon_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
