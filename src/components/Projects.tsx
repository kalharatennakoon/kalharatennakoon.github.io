import { useState, useMemo } from 'react'
import {
  FaCode, FaGithub, FaExternalLinkAlt, FaPaw, FaSun, FaFileAlt,
  FaClipboardList, FaEnvelopeOpenText, FaBrain, FaShieldAlt,
  FaHospital, FaCar, FaChevronDown, FaChevronUp, FaLayerGroup
} from 'react-icons/fa'
import type { IconType } from 'react-icons'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  architectureDetails?: string[]
  technologies: string[]
  icon: IconType
  category: 'ai' | 'devops' | 'web'
  featured?: boolean
  date?: string
  github?: string
  website?: string
}

const projectsData: Project[] = [
  {
    id: 'vetcare-one',
    title: 'VetCare One',
    subtitle: 'Final Year Project (Grade A, 76%) · AI Launch Pad Top 10',
    description:
      'Smart veterinary clinic management system (formerly VetCare Pro). Features role-based clinical records, inventory, and appointment workflows, combined with a local RAG assistant (Ollama & pgvector) that intelligently routes between natural language semantics and exact SQL queries with human-in-the-loop write confirmation.',
    architectureDetails: [
      'Dual-route local RAG assistant with Ollama (Llama 3) and pgvector for semantic clinic queries',
      'Intelligent SQL generation with safety guards and confirmation for database mutations',
      'Machine learning microservices for clinical disease prediction and seasonal demand forecasting',
      'Companion SwiftUI iOS mobile app for clinic staff and pet owners',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
    icon: FaPaw,
    category: 'ai',
    featured: true,
    website: 'https://kalharatennakoon.com/vetcareone/',
    date: 'Oct 2025 – Aug 2026',
  },
  {
    id: 'solarcast',
    title: 'SolarCast',
    subtitle: 'Solar Energy Forecasting App · GitOps on Kubernetes',
    description:
      'Full-stack machine learning application predicting monthly solar generation, grid exports, and financial payouts from residential inverter datasets using Meta\'s Prophet with 90% confidence intervals (approx. 8% error on unseen test months).',
    architectureDetails: [
      'Time-series forecasting models with Meta\'s Prophet achieving ~8% error on unseen test months',
      'FastAPI microservice instrumented with custom Prometheus telemetry metrics',
      'Multi-stage non-root container packaging with 39 automated tests and Trivy security scanning',
      'Continuous deployment via GitOps using Kustomize and ArgoCD to Kubernetes environments',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Docker', 'Kubernetes', 'Kustomize', 'ArgoCD', 'GitOps', 'Prometheus', 'Trivy'],
    icon: FaSun,
    category: 'devops',
    featured: true,
    website: 'https://kalharatennakoon.com/solarcast/',
    date: 'Apr 2026 – Oct 2026',
  },
  {
    id: 'strongcv',
    title: 'StrongCV',
    subtitle: 'AI-Powered Resume Analysis & Targeted Rewriting',
    description:
      'Intelligent web application that evaluates CVs against target role specifications and job descriptions. Scores section-by-section alignment, highlights missing domain keywords, and synthesizes tailored rewrites with validated JSON schemas.',
    architectureDetails: [
      'Two-model LLM generation pipeline on Ollama Cloud with deterministic JSON schema validation via Zod',
      'Automated Applicant Tracking System (ATS) compatibility analysis and tailored cover letter generation',
      'Multilingual feedback assistance in Sinhala and Tamil',
      'Distributed visitor rate limiting and session caching via Upstash Redis',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Ollama', 'LLMs', 'Zod', 'Upstash Redis', 'Vercel'],
    icon: FaFileAlt,
    category: 'ai',
    featured: true,
    website: 'https://strongcv.vercel.app/',
    date: 'Sep 2026',
  },
  {
    id: 'shortlisted',
    title: 'Shortlisted',
    subtitle: 'Job Application Tracking Board with Row-Level Security',
    description:
      'Modern web application for managing job searches with status boards, calendar schedules, and analytics. Built on Supabase Postgres with strict Row-Level Security (RLS) policies and scheduled reminders.',
    architectureDetails: [
      'Interactive Kanban, table, calendar, and metric analytics views with CSV import/export',
      'Encrypted document repository for versioned CVs, transcripts, and cover letters',
      'Daily scheduled email digest notifications dispatched via Supabase Edge Functions',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    icon: FaClipboardList,
    category: 'web',
    website: 'https://kalharatennakoon.com/shortlisted/',
    date: 'Sep 2026',
  },
  {
    id: 'know-your-letter',
    title: 'Know Your Letter',
    subtitle: 'Vision LLM Official Letter Explainer',
    description:
      'Free civic-tech web application that breaks down official letters into plain Sinhala, Tamil, or English from photos or PDFs. Summarizes required actions, critical deadlines, and highlights scam warnings without storing user documents.',
    architectureDetails: [
      'Multimodal Gemma vision model on Ollama Cloud producing structured breakdown schemas',
      'Automated numerical verification: rejects translations if any critical date or reference number diverges',
      'Zero-storage privacy architecture with server-side masking for NIC, credit card, and IBAN data',
    ],
    technologies: ['Next.js', 'React', 'Vision LLM', 'Ollama', 'Upstash Redis', 'pdf.js', 'Vercel'],
    icon: FaEnvelopeOpenText,
    category: 'ai',
    featured: true,
    website: 'https://know-your-letter.vercel.app',
    date: 'Oct 2026',
  },
  {
    id: 'k8s-scanner',
    title: 'K8s Security Scanner',
    subtitle: 'Container & Cluster Security Tooling (IFS R&D)',
    description:
      'Containerized security scanning tooling deployed on Kubernetes to detect CVE vulnerabilities in container images and configuration drift in cluster workloads, wired into CI/CD delivery pipelines.',
    architectureDetails: [
      'Integrated static analysis and container image vulnerability scanners into pipeline stages',
      'Automated policy validation for Kubernetes pod security standards and least-privilege configurations',
      'Deployed on AKS and GKE clusters with GitOps workflows',
    ],
    technologies: ['Kubernetes', 'Docker', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps', 'CI/CD'],
    icon: FaShieldAlt,
    category: 'devops',
    date: 'Jul 2020 – Dec 2020',
  },
  {
    id: 'course-difficulty',
    title: 'Course Difficulty Prediction',
    subtitle: 'Supervised ML from Student Evaluation Datasets',
    description:
      'Supervised machine learning models predicting student-perceived course difficulty levels. Statistically identified instructor-related attributes as significant predictors through regression and classification.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'SPSS', 'Machine Learning'],
    icon: FaBrain,
    category: 'ai',
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: 'Feb 2025 – Jul 2025',
  },
  {
    id: 'hospital-appointments',
    title: 'Hospital Channeling System',
    subtitle: 'Queue-Based Clinical Appointment Engine',
    description:
      'Full clinical appointment scheduling system featuring FIFO queue-based rescheduling, LIFO stack-based cancellation tracking, and structured persistence.',
    technologies: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
    icon: FaHospital,
    category: 'web',
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
    date: '2023',
  },
  {
    id: 'ecoride',
    title: 'EcoRide Car Rental',
    subtitle: 'Fleet & Booking Management Engine',
    description:
      'Java-based vehicle rental and fleet management platform featuring dynamic billing, reservation tracking, and automated PDF invoice generation.',
    technologies: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
    icon: FaCar,
    category: 'web',
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
    date: '2023',
  },
]

type FilterType = 'all' | 'ai' | 'devops' | 'web'

export function Projects() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)
  const [filter, setFilter] = useState<FilterType>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projectsData
    return projectsData.filter((p) => p.category === filter)
  }, [filter])

  const handleFilterChange = (f: FilterType) => {
    soundFx.tab()
    setFilter(f)
  }

  const toggleExpand = (id: string) => {
    soundFx.click()
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaCode className="text-xs" />
            <span>Portfolio Highlights</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Featured Projects
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Production-grade systems bridging Kubernetes CI/CD pipelines, local LLM architectures,
            and scalable web platforms.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              All Projects ({projectsData.length})
            </button>
            <button
              onClick={() => handleFilterChange('ai')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === 'ai'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              AI & Machine Learning (4)
            </button>
            <button
              onClick={() => handleFilterChange('devops')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === 'devops'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              Cloud & DevOps (2)
            </button>
            <button
              onClick={() => handleFilterChange('web')}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                filter === 'web'
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              Full-Stack & Systems (3)
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {filteredProjects.map((p) => {
            const IconComponent = p.icon
            const isExpanded = expandedId === p.id

            return (
              <div
                key={p.id}
                className={`bento-card flex flex-col justify-between shimmer-hover p-6 ${
                  p.featured ? 'border-sky-500/30' : ''
                }`}
              >
                <div>
                  {/* Card Header: Icon & Badges */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xl shadow-sm">
                      <IconComponent />
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {p.featured && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm">
                          Featured
                        </span>
                      )}
                      {p.date && (
                        <span className="text-[11px] font-mono text-[var(--text-secondary)] opacity-80">
                          {p.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-snug">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <div className="text-xs font-semibold text-sky-400 mb-3">
                      {p.subtitle}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                    {p.description}
                  </p>

                  {/* Expandable Architecture Details */}
                  {p.architectureDetails && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleExpand(p.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors py-1 cursor-pointer"
                      >
                        <FaLayerGroup className="text-xs" />
                        <span>{isExpanded ? 'Hide Architecture' : 'Architecture & Specs'}</span>
                        {isExpanded ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
                      </button>

                      {isExpanded && (
                        <ul className="mt-2 space-y-1.5 p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] animate-fadeIn">
                          {p.architectureDetails.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-sky-400 font-bold">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Footer: Stack pills & Links */}
                <div>
                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-[var(--border-color)]">
                    {p.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {p.technologies.length > 5 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-secondary)]">
                        +{p.technologies.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex items-center gap-2">
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.click()}
                        className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-400 border border-sky-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FaExternalLinkAlt className="text-[10px]" />
                        <span>Live App</span>
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.click()}
                        className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-[var(--bg-secondary)] hover:border-sky-500/40 text-[var(--text-primary)] border border-[var(--border-color)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <FaGithub className="text-xs" />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Projects
