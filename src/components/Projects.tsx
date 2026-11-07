import { useMemo, useState } from 'react'
import { FaChevronDown, FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

type Category = 'ai' | 'devops' | 'web'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  details?: string[]
  technologies: string[]
  category: Category
  featured?: boolean
  date: string
  github?: string
  website?: string
}

const projects: Project[] = [
  {
    id: 'vetcare-one',
    title: 'VetCare One',
    subtitle: 'Final year project, Grade A (76%). Ascentic AI Launch Pad top 10.',
    description:
      'Veterinary clinic management (formerly VetCare Pro): appointments, medical records, billing, inventory and role-based access, with a local RAG assistant that routes between semantic search and exact SQL, and asks for confirmation before any write.',
    details: [
      'Local RAG assistant on Ollama and pgvector, combining semantic retrieval with SQL for structured clinic data',
      'Human-in-the-loop confirmation for every database write the assistant proposes',
      'ML models for disease prediction, sales forecasting and inventory demand',
      'Pet-owner portal and a SwiftUI companion iOS app',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
    category: 'ai',
    featured: true,
    website: 'https://kalharatennakoon.com/vetcareone/',
    date: '2025–2026',
  },
  {
    id: 'solarcast',
    title: 'SolarCast',
    subtitle: 'Solar energy forecasting, deployed with GitOps on Kubernetes',
    description:
      "Forecasts monthly solar generation, grid export and payouts from residential inverter data using Meta's Prophet with 90% confidence ranges. About 8% error (MAPE) on unseen months, against 9.5% for a same-month-last-year baseline.",
    details: [
      'Chronological 70/30 split for honest evaluation on unseen months',
      'GitHub Actions pipeline with linting, 39 automated tests, Trivy scans and end-to-end smoke tests',
      'Multi-stage, non-root Docker images published to Docker Hub',
      'Kustomize and Argo CD: merges to main roll out to dev, prod is promoted by pull request, rollbacks are Git reverts',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Docker', 'Kubernetes', 'Kustomize', 'Argo CD', 'GitHub Actions', 'Prometheus', 'Trivy'],
    category: 'devops',
    featured: true,
    website: 'https://kalharatennakoon.com/solarcast/',
    date: '2026',
  },
  {
    id: 'strongcv',
    title: 'StrongCV',
    subtitle: 'AI review and rewriting for CVs',
    description:
      'Scores a CV section by section against a target role and job description, points out missing keywords, then rewrites it for download as Word or PDF. Also drafts cover letters and interview preparation.',
    details: [
      'Two-model LLM pipeline on Ollama Cloud with JSON-schema outputs validated by Zod',
      'ATS compatibility checks alongside the section scores',
      'Rate limiting and session caching with Upstash Redis',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Ollama', 'Zod', 'Upstash Redis', 'Vercel'],
    category: 'ai',
    featured: true,
    website: 'https://strongcv.vercel.app/',
    date: '2026',
  },
  {
    id: 'know-your-letter',
    title: 'Know Your Letter',
    subtitle: 'Official letters explained in plain Sinhala, Tamil or English',
    description:
      'A free tool for Sri Lankans: upload a photo or PDF of an official letter and get what it says, what you need to do, and by when. Nothing from the letter is stored or logged.',
    details: [
      'Gemma vision model on Ollama Cloud filling a fixed JSON schema',
      'Rejects a translation if any date or reference number changes from the original',
      'Server-side masking of identity and card numbers before processing',
    ],
    technologies: ['Next.js', 'React', 'Vision LLM', 'Ollama', 'Upstash Redis', 'pdf.js', 'Vercel'],
    category: 'ai',
    featured: true,
    website: 'https://know-your-letter.vercel.app',
    date: '2026',
  },
  {
    id: 'shortlisted',
    title: 'Shortlisted',
    subtitle: 'Job application tracking board',
    description:
      'Board, table, calendar and statistics views for a job search, a document library, and opt-in daily email reminders. Per-user accounts on Supabase with Row Level Security.',
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    category: 'web',
    website: 'https://kalharatennakoon.com/shortlisted/',
    date: '2026',
  },
  {
    id: 'k8s-scanner',
    title: 'Kubernetes security scanner',
    subtitle: 'Built during the 2020 internship at IFS R&D',
    description:
      'Containerized scanning for vulnerabilities in container images and cluster configuration, integrated into CI/CD with GitOps tooling.',
    technologies: ['Kubernetes', 'Docker', 'Go', 'Argo CD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps'],
    category: 'devops',
    date: '2020',
  },
  {
    id: 'course-difficulty',
    title: 'Course difficulty prediction',
    subtitle: 'Supervised ML on student evaluation data',
    description:
      'Models predicting perceived course difficulty, with cross-validation and significance testing that identified instructor-related attributes as predictors.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS'],
    category: 'ai',
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: '2025',
  },
  {
    id: 'hospital-appointments',
    title: 'Hospital channelling system',
    subtitle: 'Appointment scheduling with queues and stacks',
    description:
      'FIFO queue for rescheduling, a LIFO stack for cancellation history, and CSV persistence.',
    technologies: ['Java', 'Data structures'],
    category: 'web',
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
    date: '2023',
  },
  {
    id: 'ecoride',
    title: 'EcoRide car rental',
    subtitle: 'Vehicle, booking and invoicing system',
    description:
      'Vehicle management, bookings, payment processing and automated invoice generation.',
    technologies: ['Java', 'OOP', 'File I/O'],
    category: 'web',
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
    date: '2023',
  },
]

const filters: { id: 'all' | Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI and ML' },
  { id: 'devops', label: 'Cloud and DevOps' },
  { id: 'web', label: 'Full-stack and systems' },
]

function ProjectLinks({ p }: { p: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.875rem]">
      {p.website && (
        <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
          Open the app
          <FaExternalLinkAlt className="text-[0.625rem]" aria-hidden="true" />
        </a>
      )}
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1.5">
          <FaGithub className="text-[0.875rem]" aria-hidden="true" />
          Source
        </a>
      )}
    </div>
  )
}

function FeaturedCard({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="flex flex-col rounded-xl border border-rule bg-surface p-6 sm:p-7 transition-colors hover:border-rule-strong">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[1.375rem] font-semibold tracking-[-0.015em]">{p.title}</h3>
        <span className="shrink-0 text-[0.8125rem] tabular-nums text-faint">{p.date}</span>
      </div>
      <p className="mt-1 text-[0.9375rem] text-muted">{p.subtitle}</p>
      <p className="mt-4 text-[0.9688rem] leading-relaxed text-ink/85">{p.description}</p>

      {p.details && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={`${p.id}-details`}
            className="inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-ink hover:text-accent"
          >
            How it's built
            <FaChevronDown className={`text-[0.625rem] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {open && (
            <ul id={`${p.id}-details`} className="mt-3 space-y-2 border-l-2 border-rule pl-4 text-[0.9063rem] leading-relaxed text-muted">
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.technologies.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <ProjectLinks p={p} />
      </div>
    </article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<'all' | Category>('all')

  const shown = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const featured = shown.filter((p) => p.featured)
  const more = shown.filter((p) => !p.featured)

  return (
    <section id="projects" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Projects</h2>
          <p className="section-lede">
            Products I've designed, built and deployed, from local LLM assistants to forecasting
            services shipped through GitOps.
          </p>
        </div>

        <div className="segmented mb-8" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span className="tabular-nums text-faint">{count}</span>
              </button>
            )
          })}
        </div>

        {featured.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            {featured.map((p) => (
              <FeaturedCard key={p.id} p={p} />
            ))}
          </div>
        )}

        {more.length > 0 && (
          <div className={featured.length > 0 ? 'mt-14' : ''}>
            <h3 className="text-[1.0625rem] font-semibold">More projects</h3>
            <ul className="mt-4 border-t border-rule">
              {more.map((p) => (
                <li key={p.id} className="grid gap-x-8 gap-y-2 border-b border-rule py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
                  <div>
                    <p className="font-semibold">{p.title}</p>
                    <p className="text-[0.8125rem] text-faint tabular-nums">{p.date}</p>
                  </div>
                  <div>
                    <p className="text-[0.9375rem] text-muted">{p.subtitle}</p>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/85">{p.description}</p>
                    <p className="mt-2 text-[0.8125rem] text-faint">{p.technologies.join(', ')}</p>
                  </div>
                  <div className="md:pt-0.5">
                    <ProjectLinks p={p} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
