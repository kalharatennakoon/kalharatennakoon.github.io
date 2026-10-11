import { FaCode, FaGithub, FaGlobe, FaBuilding, FaCalendarCheck, FaShieldAlt, FaBrain, FaPaw, FaCar, FaHospital, FaSun, FaFileAlt, FaClipboardList, FaEnvelopeOpenText } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import useScrollReveal from '../hooks/useScrollReveal'

interface Project {
  title: string
  description: string
  technologies: string[]
  icon: IconType
  github?: string
  website?: string
  date?: string
  subtitle?: string
}

function Projects() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)

  const projects: Project[] = [
    {
      title: 'VetCare One – Smart Veterinary Clinic Management System',
      description:
        'Formerly VetCare Pro. Final year project (Grade A, 76%) covering appointments, medical records, billing and inventory, with role-based access, a RESTful Express API, JWT auth, and ML models for disease prediction and sales & demand forecasting. ' +
        'Extended for the Ascentic AI Launch Pad (Top 10) with a local RAG assistant (Ollama & pgvector) that routes between semantic retrieval and exact SQL queries, with human-in-the-loop confirmation for database writes, plus a pet owner portal and SwiftUI iOS app.',
      technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
      icon: FaPaw,
      website: 'https://kalharatennakoon.github.io/vetcareone/',
      date: 'Oct 2025 – Aug 2026',
      subtitle: 'Final Year Project · AI Launch Pad',
    },
    {
      title: 'SolarCast – Solar Energy Forecasting App',
      description:
        'Full-stack ML app that forecasts monthly solar generation, grid export, and cash payouts from residential inverter data using Meta\'s Prophet with 90% confidence intervals (about 8% error on unseen months). ' +
        'FastAPI backend with Prometheus metrics and an interactive React dashboard, packaged as multi-stage, non-root Docker images and shipped through GitHub Actions CI/CD (linting, 39 automated tests, Trivy scans) to Kubernetes dev and prod environments managed with Kustomize and ArgoCD.',
      technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Machine Learning', 'Pandas', 'Docker', 'Kubernetes', 'Kustomize', 'ArgoCD', 'GitOps', 'GitHub Actions', 'nginx', 'Prometheus', 'Trivy'],
      icon: FaSun,
      website: 'https://kalharatennakoon.github.io/solarcast/',
      date: 'Apr 2026 – Oct 2026',
    },
    {
      title: 'StrongCV – AI-Powered CV Review & Rewriting Tool',
      description:
        'Web app that analyses a CV against a target role and job description, scores it overall and section by section, highlights strengths, gaps, and missing keywords, then rewrites it for download as Word or PDF. ' +
        'Runs a two-model LLM pipeline on Ollama Cloud with JSON-schema outputs validated by Zod, plus ATS checks, tailored cover letters, interview preparation, feedback in Sinhala or Tamil, and per-visitor rate limiting with Upstash Redis.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Ollama', 'LLMs', 'Zod', 'Upstash Redis', 'Vercel'],
      icon: FaFileAlt,
      website: 'https://strongcv.vercel.app/',
      date: 'Sep 2026',
    },
    {
      title: 'Shortlisted – Job Application Tracking Board',
      description:
        'Web app for tracking job applications on a status board with per-user accounts, built on Supabase authentication and Postgres with Row Level Security. ' +
        'Offers board, table, calendar, and statistics views, CSV import/export, a document library for CVs and cover letters, Google Calendar and .ics export, follow-up email templates, and opt-in daily reminders sent by a scheduled Supabase Edge Function.',
      technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
      icon: FaClipboardList,
      website: 'https://kalharatennakoon.github.io/shortlisted/',
      date: 'Sep 2026',
    },
    {
      title: 'Know Your Letter – Plain-Language Explainer for Official Letters',
      description:
        'Free web app that explains official letters to Sri Lankans in plain Sinhala, Tamil, or English from a photo or PDF: what the letter says, what to do, and the date to act by, with scam warnings. ' +
        'A vision model (Gemma) on Ollama Cloud fills a fixed JSON schema, translations are rejected if any number differs from the original, and no letter content is stored or logged, with NIC, card, and IBAN numbers masked server-side.',
      technologies: ['Next.js', 'React', 'Vision LLM', 'Ollama', 'Prompt Engineering', 'Upstash Redis', 'pdf.js', 'Vercel', 'i18n', 'Accessibility'],
      icon: FaEnvelopeOpenText,
      website: 'https://know-your-letter.vercel.app',
      date: 'Oct 2026',
    },
    {
      title: 'Predicting Course Difficulty from Student Evaluation Responses',
      description: 'Supervised ML models to predict perceived course difficulty from student evaluation data, identifying instructor attributes as key predictors using statistical validation and classification algorithms.',
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS', 'Machine Learning', 'Statistics'],
      icon: FaBrain,
      github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
      date: 'Feb 2025 – Jul 2025',
    },
    {
      title: 'Kubernetes Cluster and Container Image Security Scanner',
      description: 'Containerized security scanning tool deployed on Kubernetes to detect vulnerabilities in container images and cluster configurations for secure DevOps pipelines.',
      technologies: ['Docker', 'Kubernetes', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps', 'Shell Scripting', 'CI/CD'],
      icon: FaShieldAlt,
      date: 'Jul 2020 – Dec 2020',
      subtitle: 'Internship · IFS',
    },
    {
      title: 'Hospital Appointment Management System',
      description: 'Complete hospital appointment system with queue-based rescheduling (FIFO), stack-based cancellation history (LIFO), and CSV data persistence.',
      technologies: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
      icon: FaHospital,
      github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
    },
    {
      title: 'EcoRide Car Rental System',
      description: 'A Java-based car rental management system with vehicle management, booking system, payment processing, and automated invoice generation.',
      technologies: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
      icon: FaCar,
      github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
    },
  ]

  return (
    <section id="projects" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">

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
          background: 'radial-gradient(circle, rgba(6,182,212,0.08), transparent)',
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
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Projects
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <div
                key={project.title}
                className={`reveal-scale ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: gridVisible ? `${index * 0.1}s` : '0s' }}
              >
                <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(30,58,138,0.16)] transition-all duration-400 overflow-hidden flex flex-col h-full shimmer-hover group">
                  {/* Colored top accent */}
                  <div
                    className="h-1 w-full"
                    style={{ background: 'linear-gradient(90deg, var(--color-primary), #06b6d4)' }}
                  />

                  {/* Header */}
                  <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                      >
                        <Icon />
                      </div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">{project.title}</h3>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {project.date && (
                        <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <FaCalendarCheck className="text-[var(--color-primary)] flex-shrink-0" /> {project.date}
                        </span>
                      )}
                      {project.subtitle && (
                        <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                          <FaBuilding className="flex-shrink-0" /> {project.subtitle}
                        </span>
                      )}
                      {project.website && (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-2)] hover:underline transition-colors w-fit"
                        >
                          <FaGlobe className="text-sm" /> Visit Site
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-2)] hover:underline transition-colors w-fit"
                        >
                          <FaGithub className="text-sm" /> View on GitHub
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-6 py-5 flex flex-col flex-grow gap-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-grow m-0">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 bg-[rgba(30,58,138,0.07)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.15)] hover:bg-[rgba(30,58,138,0.14)] hover:border-[rgba(30,58,138,0.3)] transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
