import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'Education',  href: '#education' },
  { label: 'Research',   href: '#projects' },
  { label: 'Awards',     href: '#awards' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Writing',    href: '#activities' },
  { label: 'Contact',    href: '#contact' },
]

function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu on Escape or when resizing up to desktop width
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    const mq = window.matchMedia('(min-width: 769px)')
    const onResize = () => { if (mq.matches) setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onResize)
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      const next = docH > 0 ? (window.scrollY / docH) * 100 : 0
      if (Math.abs(next - scrollProgress) > 0.1) setScrollProgress(next)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollProgress])

  return (
    <nav className="no-print" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      background: 'var(--bg-primary)',
      borderBottom: '1px solid var(--border-color)',
    }}>
      {/* Scroll progress bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        height: '2px',
        width: `${scrollProgress}%`,
        background: 'var(--text-primary)',
        transition: 'width 0.1s ease-out',
        pointerEvents: 'none',
      }} />

      <div className="nav-bar" style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ul className="nav-desktop flex" style={{ gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ flexShrink: 0 }}>
              <a href={link.href} className="nav-link" style={{ fontSize: '0.7rem', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <HiX size={22} /> : <HiMenu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <ul id="mobile-menu" className="nav-mobile-menu" style={{ listStyle: 'none', margin: 0, padding: '0.5rem 1.5rem 1rem' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link"
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '0.65rem 0', fontSize: '0.8rem', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
