import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'

const roles = [
  'DevOps Engineer',
  'MLOps Engineer',
  'Cloud-Native Developer',
  'CI/CD Automation Engineer',
]

const stats = [
  { value: '50+', label: 'Articles Published' },
  { value: '150K+', label: 'Total Views' },
  { value: '13+', label: 'Certifications' },
]

function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section className="min-h-screen flex items-center bg-[var(--bg-primary)] relative overflow-hidden">

      {/* Floating blob shapes */}
      <div
        className="blob-shape w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(circle at center, #1e3a8a, #06b6d4)',
          top: '-220px',
          right: '-180px',
          animationDelay: '0s',
          animationDuration: '14s',
        }}
      />
      <div
        className="blob-shape w-[420px] h-[420px]"
        style={{
          background: 'radial-gradient(circle at center, #7c3aed, #1e3a8a)',
          bottom: '-120px',
          left: '-120px',
          animationDelay: '-5s',
          animationDuration: '16s',
        }}
      />
      <div
        className="blob-shape w-[240px] h-[240px]"
        style={{
          background: 'radial-gradient(circle at center, #06b6d4, #38bdf8)',
          top: '42%',
          left: '38%',
          animationDelay: '-9s',
          animationDuration: '10s',
        }}
      />

      {/* Dot grid overlay */}
      <div className="dot-grid opacity-60" />

      {/* Floating particles */}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float pointer-events-none"
          style={{
            width: `${4 + (i % 3) * 3}px`,
            height: `${4 + (i % 3) * 3}px`,
            background: i % 2 === 0 ? 'var(--color-primary)' : '#06b6d4',
            opacity: 0.15 + (i % 3) * 0.07,
            top: `${12 + i * 11}%`,
            left: `${8 + i * 11}%`,
            animationDelay: `${-i * 0.9}s`,
            animationDuration: `${3.5 + i * 0.4}s`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12 py-32">

        {/* Left: text */}
        <div className="flex-1 animate-fade-in-up text-left">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(30,58,138,0.1)] border border-[rgba(30,58,138,0.2)] text-sm font-medium text-[var(--color-primary)] mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-slow" />
            Available for opportunities
          </div>

          {/* Name */}
          <div className="text-lg font-light mb-1 text-[var(--text-secondary)] tracking-[2px] uppercase">
            Hello, I'm
          </div>
          <h1 className="text-5xl md:text-6xl mb-4 font-extrabold leading-tight">
            <span
              className="block bg-clip-text text-transparent animate-gradient-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 45%, #06b6d4 100%)',
                backgroundSize: '200% 200%',
              }}
            >
              Kalhara Tennakoon
            </span>
          </h1>

          {/* Typing effect */}
          <h2 className="text-2xl md:text-3xl font-normal mb-6 min-h-[3rem] flex items-center gap-1">
            <span className="text-[var(--color-primary)] font-medium">{text}</span>
            <span className="text-[var(--color-primary)] font-light animate-blink">|</span>
          </h2>

          <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed mb-8">
            Automating delivery pipelines and building reliable systems with cloud-native technologies
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(30,58,138,0.45)]"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 100%)',
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl font-semibold text-sm text-[var(--color-primary)] border-2 border-[rgba(30,58,138,0.25)] backdrop-blur-sm transition-all duration-300 hover:bg-[rgba(30,58,138,0.08)] hover:border-[rgba(30,58,138,0.5)] hover:-translate-y-0.5"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="text-left"
                style={{ animationDelay: `${0.6 + i * 0.15}s` }}
              >
                <div
                  className="text-2xl font-extrabold bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, var(--color-primary), #06b6d4)',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[var(--text-secondary)] font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: profile photo */}
        <div className="flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-110"
              style={{
                background: 'linear-gradient(135deg, rgba(30,58,138,0.3), rgba(6,182,212,0.2))',
              }}
            />
            <div className="relative w-[300px] h-[300px] md:w-[340px] md:h-[340px] animate-float">
              {/* Outer spinning ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, transparent 38%, var(--color-primary) 65%, #06b6d4 82%, transparent 100%)',
                }}
              />
              {/* Inner counter-spinning ring */}
              <div
                className="absolute inset-[5px] rounded-full"
                style={{
                  background:
                    'conic-gradient(from 180deg, transparent 0%, transparent 40%, rgba(6,182,212,0.5) 70%, rgba(30,58,138,0.35) 90%, transparent 100%)',
                  animation: 'spin-slow 13s linear infinite reverse',
                }}
              />
              {/* Gap ring matches bg */}
              <div className="absolute inset-[10px] rounded-full bg-[var(--bg-primary)]" />
              {/* Soft inner glow */}
              <div
                className="absolute inset-[13px] rounded-full"
                style={{ boxShadow: 'inset 0 0 30px rgba(30,58,138,0.1)' }}
              />
              {/* Profile image */}
              <div className="absolute inset-[13px] rounded-full overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Kalhara Tennakoon"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70">
        <span className="text-[10px] text-[var(--text-secondary)] tracking-[3px] uppercase font-medium">Scroll</span>
        <a href="#about" className="flex flex-col items-center">
          <div className="w-6 h-10 rounded-full border-2 border-[rgba(30,58,138,0.3)] flex items-start justify-center pt-1.5">
            <div className="w-1.5 h-2.5 rounded-full bg-[var(--color-primary)] animate-bounce-slow" />
          </div>
        </a>
        <FaArrowDown className="text-[var(--color-primary)] text-sm animate-bounce-slow" style={{ animationDelay: '0.3s' }} />
      </div>
    </section>
  )
}

export default Hero
