import { useEffect, useState } from 'react'
import {
  FaUser, FaGraduationCap, FaTrophy, FaPenFancy,
  FaClock, FaMapMarkerAlt, FaServer
} from 'react-icons/fa'
import { SiKubernetes, SiDocker, SiPython } from 'react-icons/si'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

export function About() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      // Sri Lanka is UTC+5:30
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }
      setCurrentTime(new Intl.DateTimeFormat('en-US', options).format(now))
    }

    updateClock()
    const timer = setInterval(updateClock, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaUser className="text-xs" />
            <span>Profile & Background</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            About Me
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Software engineer operating at the convergence of cloud-native infrastructure,
            automated deployment pipelines, and intelligent AI features.
          </p>
        </div>

        {/* Modern Bento Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {/* Bento Item 1: Core Bio & Philosophy (Large - 8 cols) */}
          <div className="md:col-span-3 lg:col-span-8 bento-card p-6 sm:p-8 flex flex-col justify-between shimmer-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  Engineering DNA
                </span>
                <span className="text-xs font-mono text-[var(--text-secondary)]">
                  Sri Lanka • Global Remote
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                Automating Cloud Platforms & Shipping Resilient Code
              </h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base mb-4">
                I am a software engineer with industry experience in DevOps and automation at <strong>IFS R&D</strong>.
                My work centers around eliminating friction in deployment workflows: automating Kubernetes-native
                pipelines with <strong>Tekton</strong>, integrating automated testing with Behave to cut manual debugging by ~30%,
                and baking security scanning directly into container delivery lifecycles.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">
                Beyond infrastructure, I build complete end-to-end full-stack applications with <strong>React</strong> and <strong>FastAPI/Node.js</strong>,
                integrated with cutting-edge AI architectures—such as local RAG with <strong>Ollama & pgvector</strong>,
                and time-series energy forecasting with <strong>Prophet</strong> deployed via GitOps and ArgoCD.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-[var(--border-color)] flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]">
                <SiKubernetes className="text-blue-400" /> Kubernetes & Tekton
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]">
                <SiDocker className="text-sky-400" /> Container Security
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]">
                <SiPython className="text-yellow-400" /> Applied ML & LLMs
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]">
                <FaServer className="text-emerald-400" /> GitOps & ArgoCD
              </span>
            </div>
          </div>

          {/* Bento Item 2: Live Time & Location Card (4 cols) */}
          <div className="md:col-span-3 lg:col-span-4 bento-card p-6 flex flex-col justify-between shimmer-hover">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Time
                </span>
                <FaClock className="text-emerald-400 text-sm" />
              </div>

              <div className="text-center py-5">
                <div className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono tracking-wider">
                  {currentTime || '07:30:00 PM'}
                </div>
                <div className="text-xs font-semibold text-emerald-400 mt-2">
                  Sri Lanka Standard Time (UTC+5:30)
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center gap-3">
              <FaMapMarkerAlt className="text-sky-400 text-base flex-shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-[var(--text-primary)]">Kurunegala, Sri Lanka</div>
                <div className="text-[var(--text-secondary)] opacity-75">Available for on-site & remote global roles</div>
              </div>
            </div>
          </div>

          {/* Bento Item 3: Academic Excellence Card (4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 bento-card p-6 shimmer-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-lg mb-4">
                <FaGraduationCap />
              </div>
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">First Class Honours</h4>
              <p className="text-xs text-sky-400 font-semibold mb-3">Kingston University London</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                BSc (Hons) Computer Science (Software Engineering). Awarded <strong>Batch Top</strong> honors.
                Final year capstone VetCare Pro earned Grade A (76%).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between">
              <span>Graduation: Sep 2026</span>
              <span className="text-amber-400 font-bold">Grade A (76%)</span>
            </div>
          </div>

          {/* Bento Item 4: Global Scholarships & Awards (4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 bento-card p-6 shimmer-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-lg mb-4">
                <FaTrophy />
              </div>
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">2× KubeCon Scholar</h4>
              <p className="text-xs text-purple-400 font-semibold mb-3">CNCF Dan Kohn Memorial Award</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Honored twice (2022 & 2025) by the Cloud Native Computing Foundation for cloud-native contributions.
                Top 10 Finalist at Ascentic AI Launch Pad Demo Day.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between">
              <span>KubeCon Europe</span>
              <span className="text-purple-400 font-bold">2022 & 2025</span>
            </div>
          </div>

          {/* Bento Item 5: Technical Writing & Community (4 cols) */}
          <div className="md:col-span-1 lg:col-span-4 bento-card p-6 shimmer-hover flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center text-lg mb-4">
                <FaPenFancy />
              </div>
              <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">150K+ Article Views</h4>
              <p className="text-xs text-pink-400 font-semibold mb-3">Technical Author on Medium</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Authored 50+ deep-dive guides on Kubernetes CronJobs, Tekton Pipelines, Docker best practices, and IT ergonomics,
                serving a worldwide engineering community.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)] font-mono flex items-center justify-between">
              <span>50+ Guides</span>
              <a
                href="https://kalharatennakoon.medium.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.click()}
                className="text-pink-400 font-bold hover:underline"
              >
                Read on Medium →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default About
