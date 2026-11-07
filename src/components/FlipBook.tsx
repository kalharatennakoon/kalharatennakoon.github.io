import { useState } from 'react'
import {
  FaBook, FaChevronLeft, FaChevronRight, FaGraduationCap,
  FaAward, FaTrophy, FaCheckCircle, FaPaw
} from 'react-icons/fa'
import { SiKubernetes, SiTekton } from 'react-icons/si'
import { soundFx } from '../utils/sound'

interface PageContent {
  pageNumber: number
  title: string
  subtitle: string
  tag: string
  content: React.ReactNode
}

export function FlipBook() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  const pages: PageContent[] = [
    // Page 0: Cover
    {
      pageNumber: 1,
      title: 'ACADEMIC & RESEARCH LOGBOOK',
      subtitle: 'Kingston University London • First Class Honours',
      tag: 'Official Record',
      content: (
        <div className="flex flex-col items-center justify-center text-center h-full p-4 sm:p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-xl mb-6">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-amber-400 text-3xl">
              <FaGraduationCap />
            </div>
          </div>

          <span className="px-3 py-1 text-[11px] font-mono uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full mb-3">
            First Class Honours • Batch Top
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mb-2">
            Engineering Logbook
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm mb-6 leading-relaxed">
            Chronicles of software engineering, cloud-native DevOps research, and applied machine learning systems by Kalhara Tennakoon.
          </p>

          <div className="w-full max-w-xs p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-left space-y-2">
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-secondary)]">Degree:</span>
              <span className="font-semibold text-[var(--text-primary)]">BSc (Hons) Computer Science</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-secondary)]">Institution:</span>
              <span className="font-semibold text-[var(--text-primary)]">Kingston University, UK</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[var(--text-secondary)]">Final Year Project:</span>
              <span className="font-semibold text-amber-400">Grade A (76%)</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-sky-400 animate-pulse">
            <span>Turn page to begin</span>
            <FaChevronRight className="text-[10px]" />
          </div>
        </div>
      ),
    },

    // Page 1: Academic Milestones & Cohort Standing
    {
      pageNumber: 2,
      title: 'Undergraduate Excellence',
      subtitle: 'Kingston University London & ESU Kandy',
      tag: 'Academic Track',
      content: (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <FaAward />
              <span>Batch Top Award (2026)</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Ranked first across the entire Software Engineering cohort in the BSc (Hons) Computer Science degree.
              Recognized for consistently high academic standards, advanced algorithm implementation, and software architecture.
            </p>

            <div className="space-y-2.5 my-4">
              <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex justify-between items-center text-xs">
                <span className="font-medium text-[var(--text-primary)]">Data Structures & Algorithms</span>
                <span className="text-xs font-bold text-emerald-400">Distinction</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex justify-between items-center text-xs">
                <span className="font-medium text-[var(--text-primary)]">Network Security & Cryptography</span>
                <span className="text-xs font-bold text-emerald-400">Distinction</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex justify-between items-center text-xs">
                <span className="font-medium text-[var(--text-primary)]">Database Design & Distributed Systems</span>
                <span className="text-xs font-bold text-emerald-400">Distinction</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-medium">
            Graduation: September 2026 with First Class Honours
          </div>
        </div>
      ),
    },

    // Page 2: Final Year Capstone — VetCare Pro
    {
      pageNumber: 3,
      title: 'Capstone: VetCare Pro',
      subtitle: 'Smart Veterinary Clinic Management System (Grade A, 76%)',
      tag: 'Thesis & Engineering',
      content: (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-2">
              <FaPaw />
              <span>Local RAG & Predictive Clinical ML</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Designed and implemented a comprehensive clinic management platform engineered for real clinical practice.
              Incorporated a local semantic retrieval assistant with <strong>Ollama & pgvector</strong>, featuring intelligent query routing
              between freeform semantic veterinary guidance and structured SQL queries with safety confirmations.
            </p>

            {/* Architecture diagram pill visual */}
            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] mb-4">
              <div className="text-[11px] font-mono text-[var(--text-secondary)] mb-2 font-bold uppercase tracking-wider">
                System Topology:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                <span className="px-2 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">SwiftUI / React UI</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Express REST API</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">PostgreSQL + pgvector</span>
                <span>➔</span>
                <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">Ollama Local LLM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--border-color)]">
            <span>Grade: <strong className="text-amber-400">A (76%)</strong></span>
            <span className="text-sky-400 font-semibold">Ascentic AI Launch Pad Top 10</span>
          </div>
        </div>
      ),
    },

    // Page 3: Ascentic AI Launch Pad Demo Day
    {
      pageNumber: 4,
      title: 'Ascentic AI Launch Pad',
      subtitle: 'National Top 10 Finalist & Demo Day Pitch (2026)',
      tag: 'Innovation & Pitch',
      content: (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-2">
              <FaTrophy />
              <span>Top 10 Finalist Selection</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              Selected among competitive nationwide applicants for the Ascentic AI Launch Pad.
              Presented VetCare Pro at Demo Day to industry leaders, software architects, and AI practitioners.
            </p>

            <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-400 text-xs mt-1 flex-shrink-0" />
                <span>On-premise local RAG protecting sensitive clinic and client patient data.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-400 text-xs mt-1 flex-shrink-0" />
                <span>Time-series inventory sales and clinical demand forecasting models.</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-emerald-400 text-xs mt-1 flex-shrink-0" />
                <span>Native iOS SwiftUI client application for pet owners and field veterinarians.</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 font-semibold text-center">
            Recognized for practical engineering utility in veterinary medicine
          </div>
        </div>
      ),
    },

    // Page 4: DevOps Field Notes at IFS R&D
    {
      pageNumber: 5,
      title: 'DevOps Field Log (IFS R&D)',
      subtitle: 'Kubernetes CI/CD & Pipeline Optimization',
      tag: 'Industry Experience',
      content: (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-2">
              <SiTekton className="text-rose-500" />
              <span>Tekton CI/CD Automation</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              At IFS R&D International, automated Kubernetes-native continuous deployment workflows using Tekton.
              Integrated automated Behave BDD testing directly into delivery pipelines.
            </p>

            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] mb-4">
              <div className="text-xs font-bold text-emerald-400 mb-1">
                ⚡ ~30% Reduction in Manual Debugging
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                By catching regressions upstream during Tekton test stages, developer triage time was reduced significantly.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--border-color)]">
            <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[10px] font-mono text-sky-400 border border-[var(--border-color)]">Kubernetes</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[10px] font-mono text-rose-400 border border-[var(--border-color)]">Tekton</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[10px] font-mono text-blue-400 border border-[var(--border-color)]">Docker</span>
            <span className="px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[10px] font-mono text-emerald-400 border border-[var(--border-color)]">Behave BDD</span>
          </div>
        </div>
      ),
    },

    // Page 5: KubeCon Scholarships & Global Reach
    {
      pageNumber: 6,
      title: 'CNCF KubeCon Scholarship',
      subtitle: 'Dan Kohn Memorial Recipient (2022 & 2025)',
      tag: 'Global Recognition',
      content: (
        <div className="h-full flex flex-col justify-between p-4 sm:p-6 text-left">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-2">
              <SiKubernetes className="text-[#326CE5]" />
              <span>Two-Time Recipient (Europe)</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Selected twice by the Cloud Native Computing Foundation (CNCF) for the prestigious Dan Kohn Memorial Scholarship
              to attend KubeCon + CloudNativeCon Europe. Recognized for open-source contributions, technical writing, and potential in cloud-native platforms.
            </p>

            <div className="space-y-2.5 my-3 text-xs text-[var(--text-secondary)]">
              <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex justify-between">
                <span className="font-semibold text-[var(--text-primary)]">Medium Publications:</span>
                <span className="font-mono text-sky-400">50+ In-Depth Articles</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex justify-between">
                <span className="font-semibold text-[var(--text-primary)]">Total Readers Reached:</span>
                <span className="font-mono text-emerald-400">150,000+ Reads</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 font-semibold text-center">
            Dedicated to cloud-native open source education & community
          </div>
        </div>
      ),
    },
  ]

  const totalPages = pages.length

  const handleNextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      soundFx.tab()
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
        setIsFlipping(false)
      }, 250)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      soundFx.tab()
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1)
        setIsFlipping(false)
      }, 250)
    }
  }

  const currentPageData = pages[currentPage]

  return (
    <div className="w-full max-w-2xl mx-auto my-8">
      {/* Book Frame with 3D Perspective & Page Turning Animation */}
      <div
        className="relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/60 shadow-2xl overflow-hidden"
        style={{
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.1)',
        }}
      >
        {/* Book Spine Simulation & Page Header Ribbon */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-700/50 bg-slate-900/60 rounded-t-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <FaBook className="text-amber-400" />
            <span>Interactive Engineering Chronicles</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>

        {/* The Animated Page Sheet */}
        <div
          className={`min-h-[420px] sm:min-h-[460px] p-2 sm:p-4 transition-all duration-300 transform ${
            isFlipping
              ? 'opacity-40 scale-[0.98] rotate-y-6 blur-[1px]'
              : 'opacity-100 scale-100 rotate-y-0 blur-0'
          }`}
          style={{ perspective: '1000px' }}
        >
          <div className="h-full rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] p-4 sm:p-6 shadow-inner flex flex-col justify-between relative overflow-hidden">
            {/* Top Page Header Pill */}
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {currentPageData.tag}
              </span>
              <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                Ref #{currentPageData.pageNumber}
              </span>
            </div>

            {/* Page Title */}
            {currentPage !== 0 && (
              <div className="mb-4">
                <h4 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  {currentPageData.title}
                </h4>
                <div className="text-xs font-semibold text-sky-400 mt-0.5">
                  {currentPageData.subtitle}
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1">
              {currentPageData.content}
            </div>

            {/* Bottom Page Corner Turn Hint */}
            <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0 || isFlipping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:text-sky-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-medium"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>Previous Page</span>
              </button>

              {/* Page Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {pages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.click()
                      setCurrentPage(idx)
                    }}
                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                      currentPage === idx
                        ? 'bg-sky-400 w-5'
                        : 'bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1 || isFlipping}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-secondary)] hover:text-sky-400 disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer font-medium"
              >
                <span>Next Page</span>
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FlipBook
