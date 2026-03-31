import { FaPen, FaHandsHelping, FaFlask, FaTableTennis, FaCalendarAlt } from 'react-icons/fa'

interface Activity {
  title: string
  role: string
  period: string
  description: string
  icon: React.ReactNode
  badge: string
  stats?: string[]
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
    title: 'Senior Science Society - Maliyadeva College',
    role: 'Member',
    period: 'School Years',
    badge: 'Club',
    description: 'Member of the Senior Science Society during school years, involved in science fairs, experiments, and inter-school competitions.',
    icon: <FaFlask />,
  },
  {
    title: 'Badminton - School Team',
    role: 'Under-17 Player',
    period: 'School Years',
    badge: 'Sports',
    description: 'Represented the school in the Under-17 badminton team, competing in inter-school tournaments.',
    icon: <FaTableTennis />,
  },
]

function Activities() {
  return (
    <section id="activities" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaHandsHelping className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
            Activities & Volunteering
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] flex items-center justify-center text-white text-sm flex-shrink-0">
                      {activity.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug truncate">{activity.title}</h3>
                      <p className="text-sm font-medium text-[var(--color-primary)] m-0">{activity.role}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0 self-start">
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
                        className="px-3 py-1 bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] rounded-full text-xs font-semibold border border-[rgba(30,58,138,0.2)]"
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Activities
