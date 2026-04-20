import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'

const roles = [
  'DevOps Engineer',
  'MLOps Engineer',
  'Cloud-Native Developer',
  'CI/CD Automation Engineer',
]

const stats = [
  { value: '50+',   label: 'Articles Published' },
  { value: '150K+', label: 'Total Views' },
  { value: '13+',   label: 'Certifications' },
]

function Hero() {
  const [text, setText]           = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum]     = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handle = () => {
      const i        = loopNum % roles.length
      const fullText = roles[i]
      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1))
      setTypingSpeed(isDeleting ? 50 : 150)
      if (!isDeleting && text === fullText) setTimeout(() => setIsDeleting(true), 2000)
      else if (isDeleting && text === '') { setIsDeleting(false); setLoopNum(loopNum + 1) }
    }
    const t = setTimeout(handle, typingSpeed)
    return () => clearTimeout(t)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section
      id="hero"
      style={{ background: 'var(--bg-primary)', minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}
    >
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '8rem 1.5rem', width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '3rem', flexWrap: 'wrap' }}>

        {/* Left: text */}
        <div style={{ flex: 1, minWidth: '280px' }}>

          {/* Status badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(30,58,138,0.1)', border: '1px solid rgba(30,58,138,0.2)', fontSize: '14px', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '24px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            Available for opportunities
          </div>

          <div style={{ fontSize: '16px', fontWeight: 300, color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
            Hello, I'm
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
            <span style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 45%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Kalhara Tennakoon
            </span>
          </h1>

          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 400, marginBottom: '24px', minHeight: '3rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 500 }}>{text}</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 300, animation: 'blink 0.7s infinite' }}>|</span>
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '36rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Automating delivery pipelines and building reliable systems with cloud-native technologies
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a href="#projects" className="glass-btn-primary px-7 py-3 font-semibold text-sm text-white"
              style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%)' }}>
              View Projects
            </a>
            <a href="#contact" className="glass-btn px-7 py-3 font-semibold text-sm" style={{ color: 'var(--color-primary)' }}>
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: profile photo */}
        <div className="flex justify-center md:block" style={{ flexShrink: 0, width: '100%', maxWidth: '300px', margin: '0 auto' }}>
          <div style={{ width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(59,130,246,0.4)' }}>
            <img src="/profile.png" alt="Kalhara Tennakoon" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
        </div>

      </div>

      {/* Scroll indicator — hidden on mobile to avoid overlap with stacked content */}
      <div className="hidden md:flex" style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', flexDirection: 'column', alignItems: 'center', gap: '8px', opacity: 0.6 }}>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 500 }}>Scroll</span>
        <FaArrowDown style={{ color: 'var(--color-primary)', fontSize: '14px' }} />
      </div>
    </section>
  )
}

export default Hero
