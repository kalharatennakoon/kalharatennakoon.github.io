import { FaPen, FaHandsHelping, FaStackOverflow, FaUsers, FaExternalLinkAlt } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

interface Activity {
  title: string
  role: string
  period: string
  badge: string
  description: string
  icon: React.ReactNode
  stats?: string[]
  link?: string
}

const activitiesData: Activity[] = [
  {
    title: 'Medium — Technical Author',
    role: 'Cloud-Native & DevOps Columnist',
    period: 'Dec 2021 – Present',
    badge: 'Technical Writing',
    description:
      'Authoring comprehensive, production-focused engineering articles on Kubernetes CronJobs, Tekton pipelines, container hardening, and modern software engineering. Reaching over 150,000 developers globally.',
    icon: <FaPen />,
    stats: ['50+ Deep-Dive Articles', '150,000+ Total Reads', 'Global Developer Reach'],
    link: 'https://kalharatennakoon.medium.com',
  },
  {
    title: 'STEMUp Educational Foundation',
    role: 'Volunteer Educator',
    period: 'Aug 2018 – Dec 2020',
    badge: 'Volunteering & Outreach',
    description:
      'Contributed to nationwide STEM outreach initiatives, conducting hands-on coding workshops and digital literacy sessions for students in rural and underprivileged communities across Sri Lanka.',
    icon: <FaHandsHelping />,
    stats: ['Digital Literacy Outreach', 'Youth Coding Mentorship'],
  },
  {
    title: 'Stack Overflow Developer Community',
    role: 'Technical Contributor',
    period: 'Apr 2020 – Present',
    badge: 'Community Contributor',
    description:
      'Active contributor addressing complex challenges across Docker, Kubernetes orchestration, CI/CD pipeline issues, and programming design patterns.',
    icon: <FaStackOverflow />,
    stats: ['Active Community Q&A', 'DevOps & Systems Problem Solving'],
    link: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon',
  },
]

export function Activities() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="activities" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaUsers className="text-xs" />
            <span>Community & Impact</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Activities & Volunteering
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Giving back through open knowledge sharing, technical writing, and STEM education.
          </p>
        </div>

        {/* Activities Cards Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {activitiesData.map((act) => (
            <div
              key={act.title}
              className="bento-card p-6 flex flex-col justify-between shimmer-hover"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-xl shadow-sm">
                    {act.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                      {act.badge}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--text-secondary)] opacity-80">
                      {act.period}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-snug">
                  {act.title}
                </h3>
                <div className="text-xs font-semibold text-sky-400 mb-3">
                  {act.role}
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {act.description}
                </p>

                {/* Stat Badges */}
                {act.stats && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {act.stats.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-[var(--bg-secondary)] text-sky-400 border border-[var(--border-color)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {act.link && (
                <div className="pt-3 border-t border-[var(--border-color)]">
                  <a
                    href={act.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.click()}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 cursor-pointer"
                  >
                    <span>Visit Profile / Publications</span>
                    <FaExternalLinkAlt className="text-[10px]" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Activities
