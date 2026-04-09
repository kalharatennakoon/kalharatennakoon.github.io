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
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
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

  const handleNavClick = () => setMenuOpen(false)

  /* ─── shared colours ─────────────────────────────────────────── */
  /*
   * Liquid Glass uses a semi-opaque frosted base so the glass reads clearly
   * against both white AND coloured backgrounds.  Apple's own glass sits at
   * ~65–75 % opacity — any lower and the element vanishes on light pages.
   *
   * The three visual layers that define "Liquid Glass":
   *   1. Frosted base  – semi-opaque, high-blur, high-saturate
   *   2. Specular face – bright gradient across the top ~55 % of the surface
   *   3. Top rim       – near-white 1–2 px edge (strongest light-catch point)
   *   4. Bottom rim    – faint dark edge (glass-thickness shadow)
   */
  const base = isDark
    ? 'rgba(10, 18, 40, 0.68)'       // dark: deep navy-glass
    : 'rgba(225, 235, 255, 0.70)'    // light: icy blue-white frosted glass

  const specularTop = isDark
    ? 'rgba(255, 255, 255, 0.10)'
    : 'rgba(255, 255, 255, 0.72)'

  const rimTop = isDark
    ? 'linear-gradient(90deg, transparent 0%, rgba(170,200,255,0.30) 25%, rgba(210,225,255,0.45) 50%, rgba(170,200,255,0.30) 75%, transparent 100%)'
    : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 20%, rgba(255,255,255,1.00) 50%, rgba(255,255,255,0.85) 80%, transparent 100%)'

  const rimBottom = isDark ? 'rgba(0,0,0,0.45)' : 'rgba(100,120,200,0.12)'

  const outerShadow = scrolled
    ? isDark
      ? '0 8px 40px rgba(0,0,0,0.55), 0 2px 8px rgba(0,0,0,0.35)'
      : '0 8px 40px rgba(80,100,200,0.18), 0 2px 6px rgba(80,100,200,0.10)'
    : isDark
      ? '0 2px 16px rgba(0,0,0,0.30)'
      : '0 2px 16px rgba(80,100,200,0.10)'

  /* ─── mini-button (theme toggle / hamburger) ─────────────────── */
  const btnBase = isDark
    ? 'rgba(255,255,255,0.08)'
    : 'rgba(210,225,255,0.65)'
  const btnBorder = isDark
    ? '1px solid rgba(255,255,255,0.14)'
    : '1px solid rgba(255,255,255,0.85)'
  const btnShadow = isDark
    ? 'inset 0 1px 0 rgba(255,255,255,0.13), 0 3px 12px rgba(0,0,0,0.40)'
    : 'inset 0 1px 0 rgba(255,255,255,0.95), 0 3px 12px rgba(80,100,200,0.15)'

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[999] transition-all duration-400"
      style={{
        background:           base,
        backdropFilter:       'blur(48px) saturate(2.2) brightness(1.05)',
        WebkitBackdropFilter: 'blur(48px) saturate(2.2) brightness(1.05)',
        boxShadow:            outerShadow,
      }}
    >
      {/* ① Specular face — bright gradient covering top portion of glass */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{
          height: '56%',
          background: `linear-gradient(180deg, ${specularTop} 0%, rgba(255,255,255,0.00) 100%)`,
        }}
      />

      {/* ② Top rim — strongest light-catch, near-white 1.5 px edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: '1.5px', background: rimTop }}
      />

      {/* ③ Bottom rim — glass-thickness shadow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: '1px', background: rimBottom }}
      />

      {/* Scroll progress bar (above bottom rim) */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] pointer-events-none">
        <div
          className="h-full transition-[width] duration-100 ease-out"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, var(--color-primary), #3b82f6, #06b6d4)',
          }}
        />
      </div>

      {/* ─── Content ─────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between relative">

        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="transition-opacity duration-200 text-[var(--color-primary)] hover:opacity-70"
          style={{ fontFamily: '"Rouge Script", cursive', fontSize: '1.85rem', fontWeight: 400 }}
        >
          Kalhara
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--color-primary)] group"
              >
                {link.label}
                <span className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">

          {/* Theme toggle — mini liquid-glass disc */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 text-[var(--color-primary)] overflow-hidden"
            style={{ background: btnBase, border: btnBorder, boxShadow: btnShadow }}
          >
            {/* Specular on the disc */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-full"
              style={{
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.70) 0%, transparent 100%)',
              }}
            />
            {isDark
              ? <FaSun  className="text-sm relative z-10" />
              : <FaMoon className="text-sm relative z-10" />}
          </button>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            className="md:hidden relative w-10 h-10 rounded-full flex items-center justify-center transition-all text-[var(--text-primary)] overflow-hidden"
            style={{ background: btnBase, border: btnBorder, boxShadow: btnShadow }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1/2 pointer-events-none rounded-t-full"
              style={{
                background: isDark
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, transparent 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, transparent 100%)',
              }}
            />
            {menuOpen
              ? <FaTimes className="relative z-10" />
              : <FaBars  className="relative z-10" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — same glass treatment */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-1 relative overflow-hidden"
          style={{
            background:           isDark ? 'rgba(10,18,40,0.75)' : 'rgba(220,232,255,0.78)',
            backdropFilter:       'blur(48px) saturate(2)',
            WebkitBackdropFilter: 'blur(48px) saturate(2)',
            borderTop:            isDark
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(255,255,255,0.70)',
          }}
        >
          {/* Specular on dropdown */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-10 pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.50) 0%, transparent 100%)',
            }}
          />
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-all duration-200 relative z-10"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDark
                  ? 'rgba(255,255,255,0.08)'
                  : 'rgba(255,255,255,0.55)'
              }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
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
