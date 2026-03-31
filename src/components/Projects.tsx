import { FaCode, FaGithub } from 'react-icons/fa'

function Projects() {
  const projects = [
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
    {
      title: 'Course Difficulty Analysis',
      description: 'Statistical analysis of course difficulty prediction using validity, reliability, and normality testing with machine learning models.',
      technologies: ['Python', 'Jupyter', 'Machine Learning', 'Statistics', 'Data Science'],
      github: 'https://github.com/kalharatennakoon/course-difficulty-analysis',
    },
  ]

  return (
    <section id="projects" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(23,37,84,0.08)] rounded-full border-2 border-[rgba(30,58,138,0.2)] dark:from-[rgba(30,58,138,0.12)] dark:to-[rgba(23,37,84,0.12)] dark:border-[rgba(30,58,138,0.3)]">
          <FaCode className="text-2xl flex-shrink-0 text-[var(--color-primary)]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Automation • CI/CD • Containerization • Cloud-Native
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug">{project.title}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0">
                    Project
                  </span>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  <FaGithub /> View on GitHub
                </a>
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
