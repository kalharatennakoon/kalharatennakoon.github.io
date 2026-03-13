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
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--card-bg)]/95 backdrop-blur-md shadow-[0_2px_20px_var(--shadow)] border-b border-[var(--border-color)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled
              ? 'text-[var(--text-primary)]'
              : 'text-white'
          }`}
        >
          KT
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-[rgba(102,126,234,0.1)] hover:text-[#667eea] ${
                  scrolled ? 'text-[var(--text-secondary)]' : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.label}
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
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
              scrolled
                ? 'bg-[rgba(102,126,234,0.1)] text-[#667eea] hover:bg-[rgba(102,126,234,0.2)]'
                : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
            }`}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              scrolled
                ? 'text-[var(--text-primary)] hover:bg-[rgba(102,126,234,0.1)]'
                : 'text-white hover:bg-white/15'
            }`}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--card-bg)]/98 backdrop-blur-md border-t border-[var(--border-color)] px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[#667eea] hover:bg-[rgba(102,126,234,0.08)] transition-all"
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
