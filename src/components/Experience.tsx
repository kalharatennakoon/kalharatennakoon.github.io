import { FaBriefcase, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa'

function Experience() {
  const experiences = [
    {
      title: 'DevOps Engineering Intern',
      company: 'IFS R&D International (Pvt) Ltd',
      location: 'Colombo, Sri Lanka',
      period: 'Jul 2024 - Oct 2024',
      achievements: [
        'Automated artifact packaging and task execution in CI/CD pipelines using Tekton, streamlining the deployment process for critical services',
        'Integrated Behave automated tests directly into Tekton pipelines, enhancing reliability and reducing manual debugging effort by approximately 30%',
        'Optimized pipeline configurations and resolved persistent build issues, leading to smoother and faster deployment cycles',
        'Conducted a knowledge-sharing session on testing best practices, improving team collaboration and code quality standards'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'IFS R&D International (Pvt) Ltd',
      location: 'Colombo, Sri Lanka',
      period: 'Jul 2020 - Dec 2020',
      achievements: [
        'Developed a cloud security scanning application utilizing Docker and Kubernetes, significantly improving container platform security posture',
        'Integrated multiple scanning tools into CI/CD pipelines, enhancing vulnerability detection coverage across various deployment stages',
        'Diagnosed and resolved deployment and runtime issues to maintain consistent system performance and achieve 99.9% system uptime',
        'Authored comprehensive technical documentation to support onboarding for new team members and future development initiatives'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-[var(--bg-primary)] relative dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center text-[var(--text-primary)] relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-[var(--color-primary)] after:to-[var(--color-primary)] after:rounded-sm">
          Work Experience
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(23,37,84,0.08)] rounded-full border-2 border-[rgba(30,58,138,0.2)] dark:from-[rgba(30,58,138,0.12)] dark:to-[rgba(23,37,84,0.12)] dark:border-[rgba(30,58,138,0.3)]">
          <FaBriefcase className="text-2xl flex-shrink-0 text-[var(--color-primary)]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Building scalable systems • CI/CD automation • Cloud security
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border-l-4 border-[var(--color-primary)] transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_var(--shadow)]"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                  {exp.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[var(--text-secondary)]">
                  <p className="text-lg font-medium text-[var(--color-primary)] m-0">
                    {exp.company}
                  </p>
                  <p className="text-sm m-0">
                    {exp.period}
                  </p>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1 m-0 flex items-center gap-1">
                  <FaMapMarkerAlt className="text-[var(--color-primary)]" /> {exp.location}
                </p>
              </div>

              <ul className="space-y-3 list-none pl-0">
                {exp.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-[var(--text-secondary)] leading-relaxed"
                  >
                    <FaChevronRight className="text-[var(--color-primary)] text-xs mt-1.5 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
