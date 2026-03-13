import { FaCode, FaGithub } from 'react-icons/fa'

function Projects() {
  const projects = [
    {
      title: 'EcoRide Car Rental System',
      description: 'A Java-based car rental management system with vehicle management, booking system, payment processing, and automated invoice generation.',
      technologies: ['Java', 'OOP', 'File I/O', 'Data Persistence'],
      github: 'https://github.com/kalharatennakoon/EcoRideCarRentalSystem'
    },
    {
      title: 'Hospital Appointment Management System',
      description: 'Complete hospital appointment system with queue-based rescheduling (FIFO), stack-based cancellation history (LIFO), and CSV data persistence.',
      technologies: ['Java', 'Data Structures', 'Queue', 'Stack', 'CSV'],
      github: 'https://github.com/kalharatennakoon/doctor_channeling_system'
    },
    {
      title: 'Course Difficulty Analysis',
      description: 'Statistical analysis of course difficulty prediction using validity, reliability, and normality testing with machine learning models.',
      technologies: ['Python', 'Jupyter', 'Machine Learning', 'Statistics', 'Data Science'],
      github: 'https://github.com/kalharatennakoon/course-difficulty-analysis'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center text-[var(--text-primary)] font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Projects
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <FaCode className="text-2xl flex-shrink-0 text-[#667eea]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Automation • CI/CD • Containerization • Cloud-Native
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_12px_35px_rgba(102,126,234,0.2)] border border-[var(--border-color)] hover:border-[rgba(102,126,234,0.4)] backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(102,126,234,0.03)] to-[rgba(118,75,162,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <h3 className="text-2xl mb-4 text-[#667eea] font-bold relative z-10 group-hover:text-[#764ba2] transition-colors">
                {project.title}
              </h3>
              <p className="mb-4 leading-relaxed text-[var(--text-secondary)] relative z-10">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)] rounded-full text-sm text-[var(--text-primary)] font-medium border border-[rgba(102,126,234,0.2)] hover:border-[rgba(102,126,234,0.4)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 relative z-10">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#667eea] font-semibold hover:text-[#764ba2] transition-colors inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  <FaGithub /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
