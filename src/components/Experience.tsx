import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaBuilding } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

interface ExperienceItem {
  title: string
  company: string
  location: string
  period: string
  type: string
  summary: string
  metricHighlight?: string
  achievements: string[]
  stack: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: 'DevOps Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2024 – Oct 2024',
    type: 'Internship',
    metricHighlight: '~30% manual debugging reduced',
    summary: 'Spearheaded Kubernetes-native CI/CD workflows and automated delivery pipelines for enterprise cloud services.',
    achievements: [
      'Automated cloud-native delivery pipelines with Tekton, accelerating deployment cycles for critical enterprise components',
      'Integrated Behave behavioral testing directly into Tekton pipelines, reducing manual debugging overhead by ~30%',
      'Diagnosed and eliminated recurring configuration bottlenecks, hardening build reproducibility across environments',
      'Delivered a team-wide knowledge session on automated testing standards, uplifting pipeline engineering practices',
    ],
    stack: ['Kubernetes', 'Tekton', 'Docker', 'Azure DevOps', 'Python', 'CI/CD', 'Behave'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2020 – Dec 2020',
    type: 'Internship',
    metricHighlight: 'Cloud security scanning engine',
    summary: 'Contributed to cloud-native container security scanning tooling and container platform hardening.',
    achievements: [
      'Engineered a containerized cloud security scanning application with Docker and Kubernetes to protect the host container platform',
      'Embedded security scanners into CI/CD pipelines, establishing continuous vulnerability detection before container promotion',
      'Investigated runtime and orchestration incidents on AKS and GKE, authoring technical operational documentation for developer onboarding',
    ],
    stack: ['Kubernetes', 'Docker', 'Golang', 'AKS', 'GKE', 'ArgoCD', 'Azure DevOps', 'CI/CD'],
  },
]

export function Experience() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [timelineRef, timelineVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaBriefcase className="text-xs" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Work Experience
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Hands-on enterprise engineering experience in DevOps automation, Tekton pipelines,
            and container platform security.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div
            className="absolute left-4 sm:left-6 top-3 bottom-3 w-0.5 hidden sm:block bg-gradient-to-b from-sky-400 via-indigo-500 to-transparent"
            style={{
              transformOrigin: 'top',
              transform: timelineVisible ? 'scaleY(1)' : 'scaleY(0)',
              transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={exp.title + exp.period}
                className={`relative sm:pl-16 reveal-left ${timelineVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: timelineVisible ? `${0.2 + idx * 0.2}s` : '0s' }}
              >
                {/* Timeline Pulsing Node */}
                <div className="absolute left-1.5 sm:left-3.5 top-5 -translate-x-1/2 hidden sm:flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 shadow-md shadow-sky-500/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>

                {/* Card */}
                <div className="bento-card p-6 sm:p-8 shimmer-hover">
                  {/* Top Bar: Role & Company */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-[var(--border-color)]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                          {exp.title}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          {exp.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-sky-400">
                        <FaBuilding className="text-xs" />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-secondary)]">
                        <FaCalendarAlt className="text-sky-400 text-xs" />
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                        <FaMapMarkerAlt className="text-sky-400 text-xs" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlight Callout Pill */}
                  {exp.metricHighlight && (
                    <div className="my-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Impact: {exp.metricHighlight}</span>
                    </div>
                  )}

                  {/* Summary & Bullet Points */}
                  <div className="mt-3 space-y-2.5">
                    {exp.achievements.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        <FaCheck className="text-sky-400 text-xs mt-1 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stack Chips */}
                  <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex flex-wrap gap-2">
                    {exp.stack.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
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
