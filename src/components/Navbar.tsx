import { useState, useEffect } from 'react'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Activities', href: '#activities' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-400 ${
        scrolled
          ? 'bg-[var(--card-bg)]/95 backdrop-blur-xl shadow-[0_4px_24px_var(--shadow)] border-b border-[var(--border-color)]'
          : 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)]/50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="transition-all duration-200 text-[var(--color-primary)] hover:opacity-80"
          style={{ fontFamily: '"Rouge Script", cursive', fontSize: '1.85rem', fontWeight: 400 }}
        >
          Kalhara
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--color-primary)] group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </li>
          ))}
        </ul>

        {/* Theme toggle + mobile menu button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] hover:bg-[rgba(30,58,138,0.18)] hover:shadow-[0_0_16px_var(--glow-primary)]"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all text-[var(--text-primary)] hover:bg-[rgba(30,58,138,0.1)]"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--border-color)]/40">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--color-primary), #06b6d4)',
          }}
        />
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--card-bg)]/98 backdrop-blur-xl border-t border-[var(--border-color)] px-6 py-4 flex flex-col gap-1 shadow-[0_12px_32px_var(--shadow)]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] hover:bg-[rgba(30,58,138,0.08)] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
