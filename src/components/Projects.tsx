import { FaGithub } from 'react-icons/fa'

const featuredProjects = [
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
    tag: 'Currently Building',
  },
  {
    title: 'VetCare Pro',
    subtitle: 'Smart Veterinary Clinic Management System',
    summary: 'Full-stack veterinary management platform integrating RESTful services, ML pipelines, and secure authentication for real-world clinical workflows.',
    highlights: [
      'ML services for disease prediction, sales forecasting, and inventory demand forecasting (Python + Scikit-learn)',
      'RESTful API design with modular Node.js/Express backend and JWT-based authentication',
      'Appointment scheduling, electronic medical records, billing, and inventory management workflows',
    ],
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'Flask', 'Scikit-learn', 'JWT'],
    github: 'https://github.com/kalharatennakoon/vetcarepro',
    date: 'Oct 2025 – Mar 2026',
    tag: 'Final Year Project',
  },
  {
    title: 'Predicting Course Difficulty from Student Evaluation Responses',
    subtitle: '',
    summary: 'Supervised ML pipeline to predict perceived course difficulty from student evaluation data using statistical analysis and classification algorithms.',
    highlights: [
      'Data preprocessing, EDA, and feature engineering on student evaluation datasets',
      'Classification model evaluation with cross-validation and statistical significance testing',
      'Identified instructor-related attributes as key predictors of perceived course difficulty',
    ],
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS', 'Machine Learning'],
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: 'Feb 2025 – Jul 2025',
    tag: 'Research',
  },
]

const otherProjects = [
  {
    title: 'Kubernetes Cluster & Container Image Security Scanner',
    description: 'Containerized security scanning tool deployed on Kubernetes to detect vulnerabilities in container images and cluster configurations for secure DevOps pipelines.',
    technologies: ['Kubernetes', 'Docker', 'Golang', 'ArgoCD', 'AKS', 'GKE', 'CI/CD'],
    date: 'Jul 2020 – Dec 2020',
    tag: 'Internship · IFS',
  },
  {
    title: 'Hospital Appointment Management System',
    description: 'Hospital appointment system with FIFO queue-based rescheduling, LIFO stack-based cancellation history, and CSV data persistence.',
    technologies: ['Java', 'Data Structures', 'Queue', 'Stack'],
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
  },
  {
    title: 'EcoRide Car Rental System',
    description: 'Java-based car rental management system with vehicle management, booking, payment processing, and automated invoice generation.',
    technologies: ['Java', 'OOP', 'File I/O'],
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
  },
]

function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Projects</h2>
        </div>

        {/* Featured projects */}
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 0.75rem' }}>Featured</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {featuredProjects.map((proj) => (
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

        {/* Other projects */}
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 0.75rem' }}>Other Projects</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {otherProjects.map((proj) => (
            <div key={proj.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>{proj.title}</span>
                  {proj.tag && <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-secondary)', opacity: 0.8 }}>{proj.tag}</span>}
                </div>
                {proj.date && <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{proj.date}</span>}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.5rem' }}>{proj.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center', marginBottom: proj.github ? '0.4rem' : 0 }}>
                {proj.technologies.map((t) => (
                  <span key={t} style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>
                    {t}
                  </span>
                ))}
              </div>
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <FaGithub size={11} /> GitHub
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
