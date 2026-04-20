import { useState, useEffect } from 'react'
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'About',          href: '#about' },
  { label: 'Education',      href: '#education' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements',   href: '#achievements' },
  { label: 'Activities',     href: '#activities' },
  { label: 'Blog',           href: '#blog' },
  { label: 'Contact',        href: '#contact' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docH > 0 ? (window.scrollY / docH) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Liquid Glass colours ─────────────────────────────────────────────
   *  The pill needs to look like glass you can actually SEE.
   *  Light: a distinct sky-blue frosted pill
   *  Dark : a deep navy pill
   * ──────────────────────────────────────────────────────────────────── */
  const pillBg = isDark
    ? 'rgba(12, 22, 50, 0.72)'         // dark navy glass
    : 'rgba(200, 220, 255, 0.62)'      // sky-blue frosted glass

  const pillBorder = isDark
    ? '1.5px solid rgba(140, 170, 255, 0.25)'
    : '1.5px solid rgba(255, 255, 255, 0.90)'

  const pillShadow = scrolled
    ? isDark
      ? '0 8px 40px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.12)'
      : '0 8px 40px rgba(80,110,220,0.22), 0 2px 8px rgba(80,110,220,0.12), inset 0 1px 0 rgba(255,255,255,0.95)'
    : isDark
      ? '0 4px 24px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.10)'
      : '0 4px 24px rgba(80,110,220,0.16), inset 0 1px 0 rgba(255,255,255,0.92)'

  /* ── mobile dropdown glass ────────────────────────────────────────── */
  const dropBg = isDark
    ? 'rgba(12, 22, 50, 0.82)'
    : 'rgba(210, 228, 255, 0.88)'

  return (
    <div className="fixed top-0 left-0 right-0 z-[999] flex flex-col items-center pointer-events-none">
      {/* ── Floating pill ────────────────────────────────────────────── */}
      <div
        className="pointer-events-auto mt-3 w-[calc(100%-2rem)] max-w-5xl transition-all duration-500 relative overflow-hidden"
        style={{
          background:           pillBg,
          border:               pillBorder,
          borderRadius:         '9999px',
          boxShadow:            pillShadow,
          backdropFilter:       isDark ? 'none' : 'blur(40px) saturate(2.0) brightness(1.08)',
          WebkitBackdropFilter: isDark ? 'none' : 'blur(40px) saturate(2.0) brightness(1.08)',
        }}
      >
        {/* ① Specular highlight — top half of pill */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: '52%',
            borderRadius: '9999px 9999px 0 0',
            background: isDark
              ? 'linear-gradient(180deg, rgba(255,255,255,0.09) 0%, transparent 100%)'
              : 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, transparent 100%)',
          }}
        />

        {/* ② Top rim — bright edge light */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 top-0 pointer-events-none"
          style={{
            height: '1.5px',
            background: isDark
              ? 'linear-gradient(90deg, transparent, rgba(180,210,255,0.50) 30%, rgba(220,235,255,0.65) 50%, rgba(180,210,255,0.50) 70%, transparent)'
              : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.90) 20%, rgba(255,255,255,1.00) 50%, rgba(255,255,255,0.90) 80%, transparent)',
          }}
        />

        {/* ③ Bottom rim — glass thickness shadow */}
        <div
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 pointer-events-none"
          style={{
            height: '1px',
            background: isDark
              ? 'rgba(0,0,0,0.50)'
              : 'rgba(90,120,220,0.18)',
          }}
        />

        {/* Scroll progress bar inside pill bottom edge */}
        <div
          className="absolute bottom-0 left-0 h-[2.5px] pointer-events-none transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #6366f1, #3b82f6, #06b6d4)',
            borderRadius: '0 0 0 9999px',
          }}
        />

        {/* ── Content row ────────────────────────────────────────────── */}
        <div className="relative flex items-center justify-between px-5 py-2.5">

          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 transition-opacity duration-200 text-[var(--color-primary)] hover:opacity-70"
            style={{ fontFamily: '"Rouge Script", cursive', fontSize: '1.75rem', fontWeight: 400 }}
          >
            Kalhara
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--color-primary)] group"
                  style={{ letterSpacing: '0.01em' }}
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Theme toggle — glass disc */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              className="relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 text-[var(--color-primary)] overflow-hidden"
              style={{
                background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.70)',
                border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.95)',
                boxShadow: isDark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.35)'
                  : 'inset 0 1px 0 rgba(255,255,255,1.00), 0 2px 8px rgba(80,110,220,0.18)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.80) 0%, transparent 100%)',
                }}
              />
              {isDark
                ? <FaSun  size={12} className="relative z-10" />
                : <FaMoon size={12} className="relative z-10" />}
            </button>

            {/* Hamburger (mobile) — glass disc */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden relative w-8 h-8 rounded-full flex items-center justify-center transition-all text-[var(--text-primary)] overflow-hidden"
              style={{
                background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.70)',
                border: isDark ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.95)',
                boxShadow: isDark
                  ? 'inset 0 1px 0 rgba(255,255,255,0.15), 0 2px 8px rgba(0,0,0,0.35)'
                  : 'inset 0 1px 0 rgba(255,255,255,1.00), 0 2px 8px rgba(80,110,220,0.18)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-full"
                style={{
                  background: isDark
                    ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, transparent 100%)',
                }}
              />
              {menuOpen
                ? <FaTimes size={12} className="relative z-10" />
                : <FaBars  size={12} className="relative z-10" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown — glass pill below ────────────────────────── */}
      {menuOpen && (
        <div
          className="pointer-events-auto mt-2 w-[calc(100%-2rem)] max-w-5xl overflow-hidden"
          style={{
            background:           dropBg,
            border:               pillBorder,
            borderRadius:         '24px',
            boxShadow:            pillShadow,
            backdropFilter:       'blur(40px) saturate(2.0)',
            WebkitBackdropFilter: 'blur(40px) saturate(2.0)',
          }}
        >
          {/* specular on dropdown */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-8 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)',
            }}
          />
          <div className="px-4 py-3 grid grid-cols-2 gap-1 relative">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDark
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(255,255,255,0.60)'
                }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
