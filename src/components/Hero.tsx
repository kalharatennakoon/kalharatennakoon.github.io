import { useEffect, useState, type CSSProperties } from 'react'
import {
  FaArrowDown, FaEnvelope, FaTerminal, FaFilePdf, FaCode
} from 'react-icons/fa'
import {
  SiKubernetes, SiDocker, SiReact, SiOllama
} from 'react-icons/si'
import useCountUp from '../hooks/useCountUp'
import { soundFx } from '../utils/sound'

const roles = [
  'DevOps & Cloud-Native Engineer',
  'AI / ML & Full-Stack Systems Builder',
  'First Class CS Graduate • Batch Top',
  '2× Dan Kohn Scholar (KubeCon EU)',
  'Technical Author (150K+ Reads)',
]

const stats = [
  { value: 50,  suffix: '+',  label: 'Technical Articles', sub: 'DevOps & Cloud' },
  { value: 150, suffix: 'K+', label: 'Total Article Views', sub: 'Global Audience' },
  { value: 13,  suffix: '+',  label: 'Certifications',     sub: 'IBM, MS, GitHub' },
  { value: 2,   suffix: '×',  label: 'KubeCon Scholarships', sub: 'Dan Kohn Memorial' },
]

const delay = (seconds: number) => ({ '--enter-delay': `${seconds}s` } as CSSProperties)

function Stat({ value, suffix, label, sub, startDelay }: { value: number; suffix: string; label: string; sub: string; startDelay: number }) {
  const count = useCountUp(value, { delay: startDelay })

  return (
    <div className="flex flex-col items-start p-3 sm:p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] backdrop-blur-md shadow-sm hover:border-sky-500/30 transition-all">
      <div className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent font-mono">
        {count}{suffix}
      </div>
      <div className="text-xs font-bold text-[var(--text-primary)] mt-1">{label}</div>
      <div className="text-[11px] text-[var(--text-secondary)] opacity-75">{sub}</div>
    </div>
  )
}

export function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(120)

  useEffect(() => {
    const handle = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )
      setTypingSpeed(isDeleting ? 40 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2200)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const t = setTimeout(handle, typingSpeed)
    return () => clearTimeout(t)
  }, [text, isDeleting, loopNum, typingSpeed])

  const scrollToTerminal = (e: React.MouseEvent) => {
    e.preventDefault()
    soundFx.click()
    const el = document.getElementById('terminal') || document.getElementById('about')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="min-h-screen relative flex items-center justify-center pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Hero Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">

            {/* Availability Badge */}
            <div
              className="enter inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
              style={delay(0.05)}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span>Available for Software, DevOps & AI Roles</span>
            </div>

            {/* Greeting Tag */}
            <div
              className="enter text-xs sm:text-sm font-mono uppercase tracking-widest text-sky-400 font-semibold mb-2"
              style={delay(0.12)}
            >
              System.Init() • Software Engineer
            </div>

            {/* Main Name Heading with Flowing Gradient */}
            <h1
              className="enter text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.08]"
              style={delay(0.18)}
            >
              <span className="animate-gradient-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
                Kalhara Tennakoon
              </span>
            </h1>

            {/* Dynamic Typewriter Line */}
            <div
              className="enter flex items-center gap-2 text-lg sm:text-2xl font-semibold text-[var(--text-primary)] min-h-[2.5rem] mb-6"
              style={delay(0.25)}
            >
              <span className="text-sky-400 font-mono text-base sm:text-xl">&gt;</span>
              <span className="text-[var(--text-primary)] font-medium">{text}</span>
              <span className="w-2.5 h-6 bg-sky-400 animate-pulse" />
            </div>

            {/* Bio Paragraph */}
            <p
              className="enter text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8"
              style={delay(0.32)}
            >
              First Class Computer Science graduate with hands-on industry experience at IFS.
              Specialized in Kubernetes CI/CD automation with Tekton, full-stack cloud-native platforms,
              and applied AI systems with Ollama, pgvector, and predictive ML models.
            </p>

            {/* Primary Action Buttons */}
            <div
              className="enter flex flex-wrap items-center gap-3.5 mb-10"
              style={delay(0.4)}
            >
              <a
                href="#projects"
                onClick={() => soundFx.click()}
                className="glass-btn-primary px-6 py-3 font-semibold text-sm flex items-center gap-2 group cursor-pointer"
              >
                <FaCode className="text-sm group-hover:rotate-12 transition-transform" />
                <span>Explore Projects</span>
              </a>

              <a
                href="#terminal"
                onClick={scrollToTerminal}
                className="glass-btn px-6 py-3 font-semibold text-sm flex items-center gap-2 border hover:border-emerald-500/50 hover:text-emerald-400 cursor-pointer"
              >
                <FaTerminal className="text-emerald-400 text-xs" />
                <span>Open Shell</span>
              </a>

              <a
                href="/Kalhara_Tennakoon_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.click()}
                className="glass-btn px-5 py-3 font-semibold text-sm flex items-center gap-2 border hover:border-sky-500/40 cursor-pointer"
              >
                <FaFilePdf className="text-red-400 text-xs" />
                <span>CV (PDF)</span>
              </a>

              <a
                href="mailto:kalhara@kalharatennakoon.com"
                onClick={() => soundFx.click()}
                className="glass-btn px-5 py-3 font-semibold text-sm flex items-center gap-2 border hover:border-sky-500/40 cursor-pointer"
              >
                <FaEnvelope className="text-sky-400 text-xs" />
                <span>Email</span>
              </a>
            </div>

            {/* Quick Metrics Grid */}
            <div
              className="enter grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl"
              style={delay(0.48)}
            >
              {stats.map((s, i) => (
                <Stat
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  sub={s.sub}
                  startDelay={500 + i * 100}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Holographic Avatar & Floating Tech Orbit (5 cols) */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div
              className="enter relative flex items-center justify-center"
              style={delay(0.28)}
            >
              {/* Outer Breathing Aura Halo */}
              <div className="avatar-halo" />

              {/* Avatar Center Frame with Conic Gradient Border */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-1 bg-gradient-to-tr from-sky-500 via-indigo-600 to-cyan-400 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-4 border-[var(--bg-primary)]">
                  <img
                    src="/profile.png"
                    alt="Kalhara Tennakoon"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Orbiting Tech Badge 1: Kubernetes (Top Right) */}
              <div
                className="absolute -top-3 -right-3 p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl backdrop-blur-md animate-float flex items-center gap-2"
                style={{ animationDuration: '6s' }}
              >
                <SiKubernetes className="text-[#326CE5] text-xl" />
                <span className="text-xs font-bold text-[var(--text-primary)]">Kubernetes</span>
              </div>

              {/* Orbiting Tech Badge 2: AI / Ollama (Bottom Left) */}
              <div
                className="absolute -bottom-4 -left-4 p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl backdrop-blur-md animate-float flex items-center gap-2"
                style={{ animationDuration: '7s', animationDelay: '-2s' }}
              >
                <SiOllama className="text-sky-400 text-xl" />
                <span className="text-xs font-bold text-[var(--text-primary)]">Local AI / RAG</span>
              </div>

              {/* Orbiting Tech Badge 3: Docker & CI/CD (Bottom Right) */}
              <div
                className="absolute bottom-6 -right-6 p-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl backdrop-blur-md animate-float flex items-center gap-2"
                style={{ animationDuration: '8s', animationDelay: '-4s' }}
              >
                <SiDocker className="text-[#2496ED] text-lg" />
                <span className="text-xs font-bold text-[var(--text-primary)]">Tekton CI/CD</span>
              </div>

              {/* Orbiting Tech Badge 4: React / Python (Top Left) */}
              <div
                className="absolute top-4 -left-6 p-2.5 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] shadow-xl backdrop-blur-md animate-float flex items-center gap-2"
                style={{ animationDuration: '7.5s', animationDelay: '-1s' }}
              >
                <SiReact className="text-[#61DAFB] text-lg" />
                <span className="text-xs font-bold text-[var(--text-primary)]">Full-Stack</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <a
          href="#about"
          onClick={() => soundFx.click()}
          className="flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-[var(--text-secondary)]"
        >
          <span>Scroll</span>
          <FaArrowDown className="text-sky-400 text-xs animate-bounce" />
        </a>
      </div>
    </section>
  )
}

export default Hero
