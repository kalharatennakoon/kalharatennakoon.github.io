import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'

function Experience() {
  const experiences = [
    {
      title: 'DevOps Engineering Intern',
      company: 'IFS R&D International (Pvt) Ltd',
      location: 'Colombo, Sri Lanka',
      period: 'Jul 2024 – Oct 2024',
      type: 'Internship',
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
      period: 'Jul 2020 – Dec 2020',
      type: 'Internship',
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

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-16 px-8 py-4 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(23,37,84,0.08)] rounded-full border-2 border-[rgba(30,58,138,0.2)] dark:from-[rgba(30,58,138,0.12)] dark:to-[rgba(23,37,84,0.12)] dark:border-[rgba(30,58,138,0.3)]">
          <FaBriefcase className="text-2xl flex-shrink-0 text-[var(--color-primary)]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Building scalable systems • CI/CD automation • Cloud security
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[rgba(30,58,138,0.3)] to-transparent hidden sm:block" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative sm:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)]">
                  <FaBriefcase className="text-white text-base" />
                </div>

                <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden">
                  {/* Card header */}
                  <div className="px-7 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-primary)] m-0">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-3">
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <FaCalendarAlt className="text-[var(--color-primary)] text-xs" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <FaMapMarkerAlt className="text-[var(--color-primary)] text-xs" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="px-7 py-5 space-y-3 list-none">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                        <FaChevronRight className="text-[var(--color-primary)] text-xs mt-1 flex-shrink-0" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
