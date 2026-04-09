import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

function Experience() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [timelineRef, timelineVisible] = useScrollReveal<HTMLDivElement>(0.05)

  const experiences = [
    {
      title: 'DevOps Engineering Intern',
      company: 'IFS R&D International (Pvt) Ltd',
      location: 'Colombo, Sri Lanka',
      period: 'Jul 2024 – Oct 2024',
      type: 'Internship',
      achievements: [
        'Automated CI/CD pipelines using Tekton, streamlining artifact packaging and deployment for critical services',
        'Integrated Behave automated tests into Tekton pipelines, reducing manual debugging effort by ~30%',
        'Optimized pipeline configurations, resolving persistent build issues for faster deployment cycles',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'IFS R&D International (Pvt) Ltd',
      location: 'Colombo, Sri Lanka',
      period: 'Jul 2020 – Dec 2020',
      type: 'Internship',
      achievements: [
        'Built a cloud security scanning app using Docker and Kubernetes, improving container platform security posture',
        'Integrated scanning tools into CI/CD pipelines, enhancing vulnerability detection across deployment stages',
        'Diagnosed and resolved runtime issues, maintaining 99.9% system uptime',
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">

      {/* Background blob */}
      <div
        className="blob-shape w-[450px] h-[450px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.1), transparent)',
          top: '-100px',
          right: '-100px',
          animationDuration: '17s',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaBriefcase className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Work Experience
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Animated vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background: 'linear-gradient(to bottom, var(--color-primary), rgba(30,58,138,0.25), transparent)',
              transformOrigin: 'top',
              transform: timelineVisible ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative sm:pl-20 reveal-left ${timelineVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: timelineVisible ? `${0.2 + index * 0.2}s` : '0s' }}
              >
                {/* Timeline dot with pulse */}
                <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)] pulse-dot"
                  style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                >
                  <FaBriefcase className="text-white text-base" />
                </div>

                <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(30,58,138,0.14)] transition-all duration-300 overflow-hidden shimmer-hover">
                  {/* Card header */}
                  <div className="px-7 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.06)] to-transparent">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                          {exp.title}
                        </h3>
                        <p className="text-base font-semibold text-[var(--color-primary)] m-0">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-[rgba(30,58,138,0.2)] text-[var(--color-primary)] bg-[rgba(30,58,138,0.08)] flex-shrink-0">
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
