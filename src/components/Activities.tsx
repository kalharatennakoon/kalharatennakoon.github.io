import { FaPen, FaHandsHelping, FaCalendarAlt, FaStackOverflow } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

interface Activity {
  title: string
  role: string
  period: string
  description: string
  icon: React.ReactNode
  badge: string
  stats?: string[]
  link?: string
}

const activities: Activity[] = [
  {
    title: 'Medium - Technical Writer',
    role: 'Technical Author',
    period: 'Dec 2021 – Present',
    badge: 'Writing',
    description: 'Write in-depth technical articles on DevOps, cloud-native technologies, Kubernetes, CI/CD, and software engineering. Content reaches a global audience of developers and engineers.',
    icon: <FaPen />,
    stats: ['50+ Articles Published', '150,000+ Total Views'],
  },
  {
    title: 'STEMUp Educational Foundation',
    role: 'Volunteer',
    period: 'Aug 2018 – Dec 2020',
    badge: 'Volunteering',
    description: 'Contributed to STEM outreach initiatives, assisting in workshops and educational events aimed at improving access to quality science and technology education for underprivileged students in Sri Lanka.',
    icon: <FaHandsHelping />,
  },
  {
    title: 'Stack Overflow',
    role: 'Contributor',
    period: 'Apr 2020 – Present',
    badge: 'Community',
    description: 'Active member of the Stack Overflow developer community, contributing answers and engaging with questions across DevOps, cloud, and software engineering topics.',
    icon: <FaStackOverflow />,
    link: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon',
  },
]

function Activities() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="activities" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden dark:bg-[var(--bg-primary)]">

      {/* Background blob */}
      <div
        className="blob-shape w-[350px] h-[350px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.09), transparent)',
          bottom: '-80px',
          right: '-60px',
          animationDuration: '16s',
          animationDelay: '-3s',
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
              <FaHandsHelping className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Activities & Volunteering
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activities.map((activity, index) => (
            <div
              key={activity.title}
              className={`reveal-scale ${gridVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: gridVisible ? `${index * 0.12}s` : '0s' }}
            >
              <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(30,58,138,0.14)] transition-all duration-300 overflow-hidden shimmer-hover h-full">
                {/* Accent line */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: 'linear-gradient(90deg, var(--color-primary), #06b6d4)' }}
                />

                {/* Header */}
                <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                      >
                        {activity.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug break-words">{activity.title}</h3>
                        <p className="text-sm font-medium text-[var(--color-primary)] m-0">{activity.role}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0 self-start">
                      {activity.badge}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2.5 ml-12">
                    <FaCalendarAlt className="text-[var(--color-primary)] text-xs" />
                    <span className="text-xs text-[var(--text-secondary)]">{activity.period}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{activity.description}</p>
                  {activity.stats && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {activity.stats.map((stat) => (
                        <span
                          key={stat}
                          className="px-3 py-1 text-[var(--color-primary)] rounded-full text-xs font-semibold border border-[rgba(30,58,138,0.2)]"
                          style={{ background: 'rgba(30,58,138,0.07)' }}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg text-xs font-semibold text-white hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(30,58,138,0.35)] transition-all duration-200 self-start"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                    >
                      <FaStackOverflow className="text-sm" /> View Profile
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Activities
