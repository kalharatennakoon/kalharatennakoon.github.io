import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaAward, FaBookOpen } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import FlipBook from './FlipBook'

const coursework = [
  'Object-Oriented Programming',
  'Data Structures & Algorithms',
  'Network Security',
  'Database Design',
  'UI/UX Design',
  'Web Application Development',
  'Research & Data Analysis',
]

export function Education() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [contentRef, contentVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [bookRef, bookVisible] = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaGraduationCap className="text-xs" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Education & Academic Logbook
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Rigorous foundations in computer science, software engineering, and systems research.
          </p>
        </div>

        {/* Main Education Overview Card */}
        <div
          ref={contentRef}
          className={`max-w-4xl mx-auto bento-card p-6 sm:p-10 shimmer-hover reveal-scale ${
            contentVisible ? 'is-visible' : ''
          }`}
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  BSc (Hons) Computer Science
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-sm">
                  First Class Honours
                </span>
              </div>

              <div className="text-base sm:text-lg font-semibold text-sky-400">
                Kingston University, London, United Kingdom
              </div>
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
                Delivered via ESU, Sri Lanka • Specialization: Software Engineering
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 font-mono text-xs text-[var(--text-secondary)]">
              <span className="inline-flex items-center gap-1.5">
                <FaCalendarAlt className="text-amber-400" />
                Graduated September 2026
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FaMapMarkerAlt className="text-amber-400" />
                London, UK / Kandy, LK
              </span>
            </div>
          </div>

          {/* Highlights Row: Batch Top & Final Year Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaAward />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  Batch Top Honor
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  Ranked #1 in the Software Engineering cohort across the entire degree programme at ESU Kandy.
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-lg flex-shrink-0">
                <FaBookOpen />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-primary)]">
                  Final Year Project: Grade A (76%)
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  <strong>VetCare Pro</strong>: Smart Veterinary Clinic Management System with local RAG, ML forecasting models, and companion iOS app.
                </div>
              </div>
            </div>
          </div>

          {/* Key Coursework Modules */}
          <div className="pt-4 border-t border-[var(--border-color)]">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
              Key Academic Modules
            </div>
            <div className="flex flex-wrap gap-2">
              {coursework.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Interactive FlipBook / Academic Chronicles */}
        <div
          ref={bookRef}
          className={`mt-14 text-center reveal ${bookVisible ? 'is-visible' : ''}`}
        >
          <div className="mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Interactive 3D Portfolio Reader
            </span>
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mt-1">
              Flip Through the Engineering Logbook
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto">
              Turn pages to explore thesis architecture, research findings, and KubeCon scholarship logs.
            </p>
          </div>

          <FlipBook />
        </div>

      </div>
    </section>
  )
}

export default Education
