import { FaGithub, FaGlobe } from 'react-icons/fa'

interface Project {
  title: string
  subtitle: string
  summary: string
  highlights: string[]
  technologies: string[]
  github?: string
  website?: string
  date: string
  tag: string
}

const projects: Project[] = [
  {
    title: 'VetCare One',
    subtitle: 'Smart Veterinary Clinic Management System (formerly VetCare Pro)',
    summary: 'Full-stack veterinary clinic management platform, developed as my final year project (Oct 2025 – Mar 2026, Grade A) and then extended with AI features for the Ascentic AI Launch Pad through Aug 2026.',
    highlights: [
      'Final year project: appointments, medical records, billing, and inventory management with role-based access, a RESTful Node.js/Express API, and JWT authentication',
      'Final year project: ML models for disease prediction, sales forecasting, and inventory demand forecasting; awarded Grade A (76%)',
      'AI Launch Pad extension: local RAG assistant using locally hosted LLMs and pgvector, routing between semantic retrieval and exact SQL queries, with human-in-the-loop confirmation for database writes',
      'AI Launch Pad extension: pet owner portal and SwiftUI companion iOS app; selected for the Top 10',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
    website: 'https://kalharatennakoon.github.io/vetcareone/',
    date: 'Oct 2025 – Aug 2026',
    tag: 'Final Year Project · AI Launch Pad',
  },
  {
    title: 'Predicting Course Difficulty from Student Evaluation Responses',
    subtitle: '',
    summary: 'Supervised machine learning models predicting perceived course difficulty from student evaluation datasets using statistical analysis techniques.',
    highlights: [
      'Data preprocessing, exploratory data analysis, and feature engineering on student evaluation datasets',
      'Classification model evaluation with cross-validation and statistical significance testing',
      'Identified instructor-related attributes as significant predictors through statistical validation and model interpretation',
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS', 'Machine Learning'],
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: 'Feb 2025 – Jul 2025',
    tag: 'Research',
  },
  {
    title: 'CV Analyzer LK',
    subtitle: 'AI-Powered CV Review & Rewriting Tool',
    summary: 'Web app that analyses a CV against a target role and job description, scores it overall and section by section, highlights strengths, gaps, and missing keywords, then rewrites the CV with the fixes applied for download as Word or PDF.',
    highlights: [
      'Two-model LLM pipeline on Ollama Cloud (analysis and rewriting) with JSON-schema structured outputs validated by Zod; rewrites use only facts from the original CV',
      'Section-by-section scoring (summary, experience, projects, skills, education, formatting & ATS) from the same analysis call; the rewrite prioritises weak sections and the re-score shows per-section before/after deltas',
      'Rule-based and AI-assisted ATS checks, tailored cover letters, and interview preparation with STAR-style answer outlines',
      'Feedback explained in Sinhala or Tamil, job posting URL extraction with an SSRF guard, and per-visitor rate limiting with Upstash Redis',
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Ollama', 'LLMs', 'Zod', 'Upstash Redis', 'Vercel'],
    website: 'https://cv-analyzer-lk.vercel.app/',
    date: 'Sep 2026',
    tag: 'Personal Project',
  },
  {
    title: 'Shortlisted',
    subtitle: 'Job Application Tracking Board',
    summary: 'Web app for tracking job applications on a status board with per-user accounts, scheduled next steps, follow-up emails, statistics, and a document library.',
    highlights: [
      'Supabase authentication and Postgres with Row Level Security so each user can only access their own applications and documents',
      'Board, table, calendar, and statistics views, an "Up Next" panel for upcoming steps, CSV import/export, and a document library linking CVs and cover letters to applications',
      'Next steps can be added to Google Calendar or exported as .ics files; built-in email templates draft follow-ups, thank-you notes, and check-ins; posting checks record when a job ad was last verified and whether it has closed',
      'Opt-in daily email reminders sent by a scheduled Supabase Edge Function; deployed to GitHub Pages via GitHub Actions',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'GitHub Actions'],
    website: 'https://kalharatennakoon.github.io/shortlisted/',
    date: 'Sep 2026',
    tag: 'Personal Project',
  },
  {
    title: 'SolarCast',
    subtitle: 'Solar Energy Forecasting App',
    summary: 'Full-stack ML app that forecasts monthly solar generation, grid export and cash payouts from residential inverter data, containerised and deployed to Kubernetes through an automated GitOps pipeline.',
    highlights: [
      'Time-series forecasting with Meta\'s Prophet, producing 90% confidence interval predictions, with a chronological train/test split to prevent data leakage (about 8% error on unseen months)',
      'FastAPI backend with health checks and Prometheus metrics, serving an interactive React dashboard with energy analytics visualisations',
      'Containerised with Docker (multi-stage, non-root images), nginx and Docker Compose',
      'CI/CD with GitHub Actions: linting, 39 automated tests, Trivy vulnerability scanning, container smoke tests, and multi-architecture images published to Docker Hub',
      'Deployed to Kubernetes with separate dev and prod environments using Kustomize, managed by Argo CD: merges roll out to dev automatically, prod is promoted by pull request, and rollbacks are Git reverts',
      'Live demo on GitHub Pages, built from synthetic data and redeployed automatically every month',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Machine Learning', 'Pandas', 'Docker', 'Kubernetes', 'Kustomize', 'Argo CD', 'GitOps', 'GitHub Actions', 'nginx', 'Prometheus', 'Trivy'],
    website: 'https://kalharatennakoon.github.io/solarcast/',
    date: 'Apr 2026 – Oct 2026',
    tag: 'Personal Project',
  },
  {
    title: 'Kubernetes Cluster & Container Image Security Scanner',
    subtitle: '',
    summary: 'Containerized security scanning solution for Kubernetes environments, detecting vulnerabilities in container images and cluster configurations.',
    highlights: [
      'Integrated automated security scanning workflows into CI/CD pipelines to strengthen secure deployment practices',
      'Used cloud-native platforms and GitOps tooling to support scalable, secure, and reliable Kubernetes operations',
    ],
    technologies: ['Kubernetes', 'Docker', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps'],
    date: 'Jul 2020 – Dec 2020',
    tag: 'Industry · IFS',
  },
  {
    title: 'Know Your Letter',
    subtitle: 'Plain-Language Explainer for Official Letters',
    summary: 'Free web app that explains official letters to Sri Lankans in plain Sinhala, Tamil or English from a photo or PDF: what the letter says, what to do, and the date to act by. It also flags signs of a scam and handles letters written in other languages for Sri Lankans living abroad.',
    highlights: [
      'Vision model (Gemma) on Ollama Cloud fills a fixed JSON schema, and the server cleans every field before display, so every letter is shown as the same set of cards',
      'Switching language translates the text without re-reading the photo; the translation is rejected if any number differs from the original, and the photo is re-read instead',
      'Privacy by design: no letter content is stored or logged, PDFs and their passwords never leave the device, and NIC, card and IBAN numbers are masked server-side, with IBANs confirmed by checksum',
    ],
    technologies: ['Next.js', 'React', 'Vision LLM', 'Ollama', 'Prompt Engineering', 'Upstash Redis', 'pdf.js', 'Vercel', 'i18n', 'Accessibility'],
    website: 'https://know-your-letter.vercel.app',
    date: 'Oct 2026',
    tag: 'Personal Project',
  },
]

function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-primary)', scrollMarginTop: '1.5rem' }}>
      {/* Reduced top padding: follows Education on the same background */}
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '0.5rem 1.5rem 2rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Research & Projects</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {projects.map((proj) => (
            <div
              key={proj.title}
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem' }}
            >
              {/* Title row */}
              <div className="proj-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{proj.title}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{proj.date}</span>
              </div>

              {/* Subtitle + tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', flexWrap: 'wrap' }}>
                {proj.subtitle && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{proj.subtitle}</span>
                )}
                <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-primary)', background: 'var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.55rem' }}>{proj.tag}</span>
              </div>

              {/* One-line summary */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.75rem' }}>{proj.summary}</p>

              {/* Highlights */}
              <ul style={{ margin: '0 0 0.875rem', padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', listStyleType: 'disc' }}>
                {proj.highlights.map((h) => (
                  <li key={h} style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{h}</li>
                ))}
              </ul>

              {/* Tech badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center', marginBottom: proj.github || proj.website ? '0.75rem' : 0 }}>
                {proj.technologies.map((t) => (
                  <span key={t} style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Link buttons */}
              {(proj.github || proj.website) && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {[
                    proj.website && { href: proj.website, icon: <FaGlobe size={11} />, label: 'Visit Site' },
                    proj.github && { href: proj.github, icon: <FaGithub size={11} />, label: 'View on GitHub' },
                  ].flatMap((l) => (l ? [l] : [])).map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--bg-primary)', background: 'var(--text-primary)', borderRadius: '9999px', padding: '0.3rem 0.8rem', textDecoration: 'none', letterSpacing: '0.03em' }}
                      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                    >
                      {l.icon} {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
