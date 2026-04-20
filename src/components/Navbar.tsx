import { useState, useEffect } from 'react'

const navLinks = [
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
  const [scrollProgress, setScrollProgress] = useState(0)

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
    <nav style={{
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

      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0 1.5rem', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ul className="flex" style={{ gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', overflowX: 'auto' }}>
          {navLinks.map((link) => (
            <li key={link.href} style={{ flexShrink: 0 }}>
              <a href={link.href} className="nav-link" style={{ fontSize: '0.7rem', textDecoration: 'none', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
