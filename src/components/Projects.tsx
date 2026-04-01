import { FaCode, FaGithub, FaBuilding, FaCalendarCheck } from 'react-icons/fa'

interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
  date?: string
  subtitle?: string
}

function Projects() {
  const projects: Project[] = [
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

  return (
    <section id="projects" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaCode className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
            Projects
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                <div className="flex items-start justify-between gap-2 mb-3">
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
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors w-fit"
                    >
                      <FaGithub /> View on GitHub
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
                      className="px-2.5 py-0.5 bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.15)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
