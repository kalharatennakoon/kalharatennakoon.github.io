import { FaPen, FaHandsHelping, FaFlask, FaTableTennis } from 'react-icons/fa'

interface Activity {
  title: string
  role: string
  period: string
  description: string
  icon: React.ReactNode
  stats?: string[]
}

const activities: Activity[] = [
  {
    title: 'Medium — Technical Writer',
    role: 'Technical Author',
    period: 'Dec 2021 – Present',
    description: 'Write in-depth technical articles on DevOps, cloud-native technologies, Kubernetes, CI/CD, and software engineering. Content reaches a global audience of developers and engineers.',
    icon: <FaPen />,
    stats: ['50+ Articles Published', '150,000+ Total Views'],
  },
  {
    title: 'STEMUp Educational Foundation',
    role: 'Volunteer',
    period: 'Aug 2018 – Dec 2020',
    description: 'Contributed to STEM outreach initiatives, assisting in workshops and educational events aimed at improving access to quality science and technology education for underprivileged students in Sri Lanka.',
    icon: <FaHandsHelping />,
  },
  {
    title: 'Senior Science Society — Maliyadeva College',
    role: 'Member',
    period: 'School Years',
    description: 'Active member of the Senior Science Society, participating in science fairs, experiments, and inter-school competitions.',
    icon: <FaFlask />,
  },
  {
    title: 'Badminton — School Team',
    role: 'Under-17 Player',
    period: 'School Years',
    description: 'Represented the school in the Under-17 badminton team, competing in inter-school tournaments.',
    icon: <FaTableTennis />,
  },
]

function Activities() {
  return (
    <section id="activities" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] bg-clip-text text-transparent">
          Activities & Volunteering
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(30,58,138,0.08)] to-[rgba(23,37,84,0.08)] rounded-full border-2 border-[rgba(30,58,138,0.2)] dark:from-[rgba(30,58,138,0.12)] dark:to-[rgba(23,37,84,0.12)] dark:border-[rgba(30,58,138,0.3)]">
          <FaHandsHelping className="text-2xl flex-shrink-0 text-[var(--color-primary)]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Writing • Community • Science • Sports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(30,58,138,0.15)] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] flex items-center justify-center text-white text-xl flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-0.5 leading-snug">{activity.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                    <span className="text-sm font-medium text-[var(--color-primary)]">{activity.role}</span>
                    <span className="text-[var(--text-secondary)] text-xs">•</span>
                    <span className="text-xs text-[var(--text-secondary)]">{activity.period}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{activity.description}</p>
                  {activity.stats && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {activity.stats.map((stat) => (
                        <span
                          key={stat}
                          className="px-3 py-1 bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] rounded-full text-xs font-semibold border border-[rgba(30,58,138,0.2)]"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
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
