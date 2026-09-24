import { FaGithub } from 'react-icons/fa'

interface Project {
  title: string
  subtitle: string
  summary: string
  highlights: string[]
  technologies: string[]
  github?: string
  date: string
  tag: string
}

const projects: Project[] = [
  {
    title: 'VetCare Pro',
    subtitle: 'Smart Veterinary Clinic Management System',
    summary: 'Full-stack veterinary clinic platform covering appointments, medical records, billing, and inventory, with role-based access, a pet owner portal, and a SwiftUI companion app.',
    highlights: [
      'Local RAG assistant using locally hosted LLMs and pgvector, with intelligent routing between semantic retrieval and exact SQL queries',
      'Human-in-the-loop database controls requiring confirmation for write actions',
      'ML models for disease prediction, sales forecasting, and inventory demand forecasting',
      'Awarded Grade A (76%); selected for the Top 10 of the Ascentic AI Launch Pad',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'pgvector', 'Python', 'Flask', 'Scikit-learn', 'Ollama', 'SwiftUI', 'JWT'],
    github: 'https://github.com/kalharatennakoon/vetcarepro',
    date: 'Oct 2025 – Aug 2026',
    tag: 'Final Year Project',
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
    title: 'SolarCast',
    subtitle: 'Personal Solar Energy Forecasting App',
    summary: 'Full-stack ML app predicting monthly solar energy generation, grid export, and cash payouts from residential inverter data using time-series forecasting.',
    highlights: [
      'Time-series forecasting with Meta\'s Prophet, producing 90% confidence interval predictions',
      'Chronological train/test ML pipeline to prevent data leakage across forecast windows',
      'Interactive React dashboard with CSV upload support and energy analytics visualisations',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'Prophet', 'Machine Learning', 'Pandas', 'REST APIs'],
    date: 'Apr 2026 – Present',
    tag: 'Ongoing',
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center', marginBottom: proj.github ? '0.75rem' : 0 }}>
                {proj.technologies.map((t) => (
                  <span key={t} style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* GitHub button */}
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--bg-primary)', background: 'var(--text-primary)', borderRadius: '9999px', padding: '0.3rem 0.8rem', textDecoration: 'none', letterSpacing: '0.03em' }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
                >
                  <FaGithub size={11} /> View on GitHub
                </a>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Projects
