import { FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'Kubernetes Cluster and Container Image Security Scanner',
    description: 'Containerized security scanning tool deployed on Kubernetes to detect vulnerabilities in container images and cluster configurations for secure DevOps pipelines.',
    technologies: ['Docker', 'Kubernetes', 'Golang', 'ArgoCD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps', 'Shell Scripting', 'CI/CD'],
    date: 'Jul 2020 – Dec 2020',
    subtitle: 'Internship · IFS',
  },
  {
    title: 'Predicting Course Difficulty from Student Evaluation Responses',
    description: 'Supervised ML models to predict perceived course difficulty from student evaluation data, identifying instructor attributes as key predictors using statistical validation and classification algorithms.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Matplotlib', 'Seaborn', 'SPSS', 'Machine Learning', 'Statistics'],
    github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    date: 'Feb 2025 – Jul 2025',
  },
  {
    title: 'VetCare Pro: Smart Web-Based Veterinary Clinic Management System',
    description: 'Full-stack veterinary clinic management system with appointment scheduling, electronic medical records, billing, inventory management, and an ML service for disease prediction and demand forecasting.',
    technologies: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Python', 'Flask', 'Scikit-learn', 'JWT'],
    github: 'https://github.com/kalharatennakoon/vetcarepro',
    date: 'Oct 2025 – Mar 2026',
  },
  {
    title: 'EcoRide Car Rental System',
    description: 'A Java-based car rental management system with vehicle management, booking system, payment processing, and automated invoice generation.',
    technologies: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
    github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem',
  },
  {
    title: 'Hospital Appointment Management System',
    description: 'Complete hospital appointment system with queue-based rescheduling (FIFO), stack-based cancellation history (LIFO), and CSV data persistence.',
    technologies: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
    github: 'https://github.com/kalharatennakoon/doctor_channeling_system',
  },
]

function Projects() {
  return (
    <section id="projects" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Projects</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((proj) => (
            <div key={proj.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{proj.title}</span>
                {proj.date && <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{proj.date}</span>}
              </div>
              {proj.subtitle && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem', opacity: 0.7 }}>{proj.subtitle}</p>
              )}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.625rem' }}>{proj.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', alignItems: 'center', marginBottom: proj.github ? '0.5rem' : 0 }}>
                {proj.technologies.map((t) => (
                  <span key={t} style={{ fontSize: '0.68rem', fontWeight: 500, color: 'var(--text-primary)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.1rem 0.5rem' }}>#{t}</span>
                ))}
              </div>
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
