import { useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { FaCode, FaGithub, FaGlobe, FaBuilding, FaCalendarCheck, FaShieldAlt, FaBrain, FaPaw, FaCar, FaHospital, FaSun, FaFileAlt, FaClipboardList, FaEnvelopeOpenText, FaReceipt, FaArrowRight, FaTimes, FaExternalLinkAlt, FaBookOpen } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { Link } from 'react-router-dom'
import useScrollReveal from '../hooks/useScrollReveal'

interface Project {
  title: string
  /** One or two sentences shown on the card. */
  summary: string
  /** Full write-up shown in the details dialog, one string per paragraph. */
  details: string[]
  technologies: string[]
  icon: IconType
  github?: string
  website?: string
  date?: string
  subtitle?: string
  /** Screenshot of the deployed site, served from public/project-covers/. */
  cover?: string
  /** Slug of a long-form case study at /projects/<slug>/. */
  caseStudy?: string
  /** A case study hosted with the project itself, as a full URL so it also works from the dev server. */
  caseStudyUrl?: string
}

/** How many technology chips a card shows before collapsing the rest into "+N". */
const CARD_TECH_LIMIT = 4

const projects: Project[] = [
  {
    title: 'VetCare One – Smart Veterinary Clinic Management System',
    summary:
      'Clinic management system with ML disease prediction and demand forecasting, extended with a local RAG assistant, a pet owner portal, and an iOS app.',
    details: [
      'Formerly VetCare Pro. Final year project (Grade A, 76%) covering appointments, medical records, billing and inventory, with role-based access, a RESTful Express API, JWT auth, and ML models for disease prediction and sales & demand forecasting.',
      'Extended for the Ascentic AI Launch Pad (Top 10) with a local RAG assistant (Ollama & pgvector) that routes between semantic retrieval and exact SQL queries, with human-in-the-loop confirmation for database writes, plus a pet owner portal and SwiftUI iOS app.',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
    icon: FaPaw,
    website: 'https://kalharatennakoon.com/vetcareone/',
    cover: '/project-covers/vetcareone.jpg',
    caseStudyUrl: 'https://kalharatennakoon.com/vetcareone/case-study/',
    date: 'Oct 2025 – Aug 2026',
    subtitle: 'Final Year Project · AI Launch Pad',
  },
  {
    title: 'SolarCast – Solar Energy Forecasting App',
    summary:
      'Forecasts monthly solar generation, grid export, and payouts with Prophet, shipped to Kubernetes through a GitOps pipeline.',
    details: [
      'Full-stack ML app that forecasts monthly solar generation, grid export, and cash payouts from residential inverter data using Meta\'s Prophet with 90% confidence intervals (about 8% error on unseen months).',
      'FastAPI backend and an interactive React dashboard, packaged as multi-stage, non-root Docker images and shipped through GitHub Actions CI/CD (linting, 39 automated tests, Trivy scans) to Kubernetes dev and prod environments managed with Kustomize and ArgoCD.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Machine Learning', 'Pandas', 'Docker', 'Kubernetes', 'Kustomize', 'ArgoCD', 'GitOps', 'GitHub Actions', 'nginx', 'Trivy'],
    icon: FaSun,
    website: 'https://kalharatennakoon.com/solarcast/',
    github: 'https://github.com/kalharatennakoon/solarcast',
    cover: '/project-covers/solarcast.jpg',
    caseStudy: 'solarcast',
    date: 'Apr 2026 – Oct 2026',
  },
  {
    title: 'Shortlisted – Job Application Tracking Board',
    summary:
      'Job application tracker with board, table, calendar, and stats views, built on Supabase with per-user accounts and daily reminders.',
    details: [
      'Web app for tracking job applications on a status board with per-user accounts, built on Supabase authentication and Postgres with Row Level Security.',
      'Offers board, table, calendar, and statistics views, CSV import/export, a document library for CVs and cover letters, Google Calendar and .ics export, follow-up email templates, and opt-in daily reminders sent by a scheduled Supabase Edge Function.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    icon: FaClipboardList,
    website: 'https://kalharatennakoon.com/shortlisted/',
    cover: '/project-covers/shortlisted.jpg',
    date: 'Sep 2026',
  },
  {
    title: 'OrderBook – Order & Payment Tracker for Social Media Sellers',
    summary:
      'Order, payment, and invoice tracker for Facebook and WhatsApp sellers in Sri Lanka, with AI that reads orders from chats and payments from bank slips.',
    details: [
      'Web app that replaces the paper order book for small Facebook and WhatsApp sellers in Sri Lanka: every order, customer, delivery date, advance, and balance in one place, with invoices sent to customers on WhatsApp in one tap. Available in Sinhala, Tamil, and English, with a free tier and a Pro plan.',
      'AI features on Ollama fill in an order from a pasted WhatsApp message or chat screenshot, read bank transfer slips and bank SMS to record payments, and summarise the week. Customers can place orders through a shareable order link and upload payment slips for the seller to accept or decline. Built with Next.js and PostgreSQL on Neon, with Google sign-in, hosted on Vercel.',
    ],
    technologies: ['Next.js', 'React', 'PostgreSQL', 'Neon', 'Ollama', 'Vision LLM', 'Google OAuth', 'i18n', 'Vercel'],
    icon: FaReceipt,
    website: 'https://myorderbook.vercel.app/',
    cover: '/project-covers/orderbook.jpg',
    caseStudy: 'orderbook',
    date: 'Oct 2026 – Nov 2026',
  },
  {
    title: 'StrongCV – AI-Powered CV Review & Rewriting Tool',
    summary:
      'Scores a CV against a target role, points out gaps and missing keywords, and rewrites it for download as Word or PDF.',
    details: [
      'Web app that analyses a CV against a target role and job description, scores it overall and section by section, highlights strengths, gaps, and missing keywords, then rewrites it for download as Word or PDF.',
      'Runs a two-model LLM pipeline on Ollama Cloud with JSON-schema outputs validated by Zod, plus ATS checks, tailored cover letters, interview preparation, feedback in Sinhala or Tamil, and per-visitor rate limiting with Upstash Redis.',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Ollama', 'LLMs', 'Zod', 'Upstash Redis', 'Vercel'],
    icon: FaFileAlt,
    website: 'https://strongcv.vercel.app/',
    cover: '/project-covers/strongcv.jpg',
    date: 'Sep 2026',
  },
  {
    title: 'Know Your Letter – Plain-Language Explainer for Official Letters',
    summary:
      'Explains official letters in plain Sinhala, Tamil, or English from a photo or PDF, with what to do, the deadline, and scam warnings.',
    details: [
      'Free web app that explains official letters to Sri Lankans in plain Sinhala, Tamil, or English from a photo or PDF: what the letter says, what to do, and the date to act by, with scam warnings.',
      'A vision model (Gemma) on Ollama Cloud fills a fixed JSON schema, translations are rejected if any number differs from the original, and no letter content is stored or logged, with NIC, card, and IBAN numbers masked server-side.',
    ],
    technologies: ['Next.js', 'React', 'Vision LLM', 'Ollama', 'Prompt Engineering', 'Upstash Redis', 'pdf.js', 'Vercel', 'i18n', 'Accessibility'],
    icon: FaEnvelopeOpenText,
    website: 'https://know-your-letter.vercel.app',
    cover: '/project-covers/know-your-letter.jpg',
    caseStudy: 'know-your-letter',
    date: 'Oct 2026',
  },
  {
    title: 'Predicting Course Difficulty from Student Evaluation Responses',
    summary:
      'Supervised ML models that predict perceived course difficulty from student evaluations.',
    details: [
      'Supervised ML models to predict perceived course difficulty from student evaluation data, identifying instructor attributes as key predictors using statistical validation and classification algorithms.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS', 'Machine Learning', 'Statistics'],
    icon: FaBrain,
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: 'Feb 2025 – Jul 2025',
  },
  {
    title: 'Kubernetes Cluster and Container Image Security Scanner',
    summary:
      'Containerised tool on Kubernetes that finds vulnerabilities in container images and cluster configuration.',
    details: [
      'Containerized security scanning tool deployed on Kubernetes to detect vulnerabilities in container images and cluster configurations for secure DevOps pipelines.',
    ],
    technologies: ['Docker', 'Kubernetes', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps', 'Shell Scripting', 'CI/CD'],
    icon: FaShieldAlt,
    date: 'Jul 2020 – Dec 2020',
    subtitle: 'Internship · IFS',
  },
  {
    title: 'Hospital Appointment Management System',
    summary:
      'Java appointment system with queue-based rescheduling and stack-based cancellation history.',
    details: [
      'Complete hospital appointment system with queue-based rescheduling (FIFO), stack-based cancellation history (LIFO), and CSV data persistence.',
    ],
    technologies: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
    icon: FaHospital,
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
  },
  {
    title: 'EcoRide Car Rental System',
    summary:
      'Java car rental system covering vehicles, bookings, payments, and invoices.',
    details: [
      'A Java-based car rental management system with vehicle management, booking system, payment processing, and automated invoice generation.',
    ],
    technologies: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
    icon: FaCar,
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
  },
]

const GRADIENT = { background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }
const ACCENT_BAR = { background: 'linear-gradient(90deg, var(--accent-bar-from), var(--accent-bar-to))' }

const chipClass =
  'px-2.5 py-0.5 bg-[rgba(30,58,138,0.07)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.15)]'

/** Small square icon button for a project's site / repo on the card footer. */
function IconLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--color-primary)] border border-[var(--border-color)] hover:text-white hover:border-transparent hover:bg-[var(--color-primary)] transition-colors duration-200"
    >
      {children}
    </a>
  )
}

/** Date and subtitle line, shared by the card and the dialog. */
function ProjectMeta({ project }: { project: Project }) {
  if (!project.date && !project.subtitle) return null
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
      {project.date && (
        <span className="flex items-center gap-1.5">
          <FaCalendarCheck className="text-[var(--color-primary)] flex-shrink-0" /> {project.date}
        </span>
      )}
      {project.subtitle && (
        <span className="flex items-center gap-1.5">
          <FaBuilding className="text-[var(--color-primary)] flex-shrink-0" /> {project.subtitle}
        </span>
      )}
    </div>
  )
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const Icon = project.icon
  const titleId = 'project-dialog-title'

  useEffect(() => {
    // Remember what opened the dialog so focus can go back there on close.
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Keep Tab inside the dialog.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      opener?.focus()
    }
  }, [onClose])

  // Portalled to <body>: the cards sit inside transformed reveal wrappers,
  // which would otherwise trap a position: fixed overlay inside the card.
  return createPortal(
    <div
      className="project-dialog-backdrop fixed inset-0 z-[1100] flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="project-dialog-panel relative w-full sm:max-w-2xl max-h-[90vh] flex flex-col bg-[var(--card-bg)] rounded-t-2xl sm:rounded-2xl border border-[var(--border-color)] shadow-[0_24px_64px_rgba(0,0,0,0.35)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 w-full flex-shrink-0" style={ACCENT_BAR} />

        {/* Header */}
        <div className="flex items-start gap-4 px-6 sm:px-8 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0" style={GRADIENT}>
            <Icon />
          </div>
          <div className="flex-1 min-w-0">
            <h3 id={titleId} className="text-lg sm:text-xl font-bold text-[var(--text-primary)] leading-snug mb-2">
              {project.title}
            </h3>
            <ProjectMeta project={project} />
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="w-9 h-9 -mr-2 -mt-1 rounded-lg flex items-center justify-center flex-shrink-0 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[rgba(30,58,138,0.08)] transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 sm:px-8 py-6 overflow-y-auto">
          {project.cover && (
            <img
              src={project.cover}
              alt={`Screenshot of ${project.title.split(' – ')[0]}`}
              width={960}
              height={600}
              className="w-full h-auto rounded-xl border border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] mb-6"
            />
          )}
          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Overview</h4>
          <div className="flex flex-col gap-3 mb-6">
            {project.details.map((para) => (
              <p key={para} className="text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed m-0">{para}</p>
            ))}
          </div>

          <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-3">Tech stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className={chipClass}>{tech}</span>
            ))}
          </div>
        </div>

        {/* Footer links */}
        {(project.website || project.github || project.caseStudy || project.caseStudyUrl) && (
          <div className="flex flex-wrap gap-3 px-6 sm:px-8 py-4 border-t border-[var(--border-color)]">
            {project.caseStudy && (
              <Link
                to={`/projects/${project.caseStudy}/`}
                onClick={onClose}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
                style={GRADIENT}
              >
                <FaBookOpen /> Read the case study
              </Link>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
                style={GRADIENT}
              >
                <FaBookOpen /> Read the case study
              </a>
            )}
            {project.website && (
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
                style={GRADIENT}
              >
                <FaGlobe /> Visit site <FaExternalLinkAlt className="text-[10px] opacity-80" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-[var(--color-primary)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:bg-[rgba(30,58,138,0.06)] transition-colors"
              >
                <FaGithub /> View on GitHub <FaExternalLinkAlt className="text-[10px] opacity-80" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

/** `limit` shows only the first N projects plus a link to the full list. */
function Projects({ limit }: { limit?: number } = {}) {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const closeDialog = useCallback(() => setOpenProject(null), [])

  const shown = limit ? projects.slice(0, limit) : projects
  const hasMore = shown.length < projects.length

  return (
    <section id="projects" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">

      {/* Background blobs */}
      <div
        className="blob-shape w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.1), transparent)',
          top: '-150px',
          right: '-120px',
          animationDuration: '16s',
        }}
      />
      <div
        className="blob-shape w-[300px] h-[300px]"
        style={{
          background: 'radial-gradient(circle, rgba(23,37,84,0.08), transparent)',
          bottom: '-80px',
          left: '-60px',
          animationDelay: '-7s',
          animationDuration: '13s',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaCode className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text pb-1"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--text-grad-from) 0%, var(--text-grad-to) 100%)', backgroundSize: '200% 200%' }}
            >
              Projects
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shown.map((project, index) => {
            const Icon = project.icon
            const visibleTech = project.technologies.slice(0, CARD_TECH_LIMIT)
            const hiddenTech = project.technologies.length - visibleTech.length
            return (
              <div
                key={project.title}
                className={`reveal-scale ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: gridVisible ? `${index * 0.1}s` : '0s' }}
              >
                <article className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(30,58,138,0.16)] transition-all duration-400 overflow-hidden flex flex-col h-full shimmer-hover group">
                  <div className="h-1 w-full" style={ACCENT_BAR} />

                  {project.cover && (
                    <button
                      type="button"
                      onClick={() => setOpenProject(project)}
                      aria-label={`View details for ${project.title.split(' – ')[0]}`}
                      className="block relative aspect-[16/10] overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] cursor-pointer"
                    >
                      <img
                        src={project.cover}
                        alt=""
                        width={960}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  )}

                  <div className="px-6 pt-6 pb-5 flex flex-col flex-grow gap-4">
                    {/* Icon + title */}
                    <div className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                        style={GRADIENT}
                      >
                        <Icon />
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug m-0">{project.title}</h3>
                    </div>

                    <ProjectMeta project={project} />

                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow m-0">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {visibleTech.map((tech) => (
                        <span key={tech} className={chipClass}>{tech}</span>
                      ))}
                      {hiddenTech > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-color)]">
                          +{hiddenTech}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer: details button + quick links */}
                  <div className="px-6 py-4 border-t border-[var(--border-color)] flex items-center justify-between gap-3">
                    {project.caseStudyUrl ? (
                      <a
                        href={project.caseStudyUrl}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(30,58,138,0.35)] group/btn"
                        style={GRADIENT}
                      >
                        Case study
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    ) : project.caseStudy ? (
                      <Link
                        to={`/projects/${project.caseStudy}/`}
                        className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(30,58,138,0.35)] group/btn"
                        style={GRADIENT}
                      >
                        Case study
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenProject(project)}
                        aria-haspopup="dialog"
                        className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_20px_rgba(30,58,138,0.35)] group/btn"
                        style={GRADIENT}
                      >
                        View details
                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </button>
                    )}
                    <div className="flex items-center gap-2">
                      {project.website && (
                        <IconLink href={project.website} label={`Visit ${project.title.split(' – ')[0]} site`}>
                          <FaGlobe />
                        </IconLink>
                      )}
                      {project.github && (
                        <IconLink href={project.github} label={`${project.title.split(' – ')[0]} on GitHub`}>
                          <FaGithub />
                        </IconLink>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            )
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-12">
            <Link
              to="/projects/"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(30,58,138,0.4)] hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))', backgroundSize: '200% 200%' }}
            >
              View all {projects.length} projects <FaArrowRight className="text-xs" />
            </Link>
          </div>
        )}
      </div>

      {openProject && <ProjectDialog project={openProject} onClose={closeDialog} />}
    </section>
  )
}

export default Projects
