import { FaTrophy } from 'react-icons/fa'

interface Achievement {
  title: string
  description: string
  date: string
  highlight?: boolean
}

const achievements: Achievement[] = [
  {
    title: 'Dan Kohn Scholarship - KubeCon + CloudNativeCon',
    description: 'Awarded the CNCF Dan Kohn Scholarship to attend KubeCon + CloudNativeCon. Recognised for contributions and potential in the cloud-native ecosystem.',
    date: '2025 & 2022',
    highlight: true,
  },
  {
    title: 'First Runner-Up - Hack:Bit Hackathon',
    description: 'Secured First Runner-Up at the Hack:Bit national-level hackathon, competing against university and school teams across Sri Lanka.',
    date: 'Jul 2019',
  },
  {
    title: 'Top 15 Finalist - HaXmas Hackathon',
    description: 'Selected as one of the Top 15 finalists at the HaXmas Hackathon, a competitive coding and innovation challenge.',
    date: 'Jan 2018',
  },
  {
    title: 'Finalist - Cisco Packet Riders',
    description: 'Reached the national final of Cisco Packet Riders, a networking and troubleshooting competition open to students across Sri Lanka.',
    date: 'Jul 2018',
  },
  {
    title: '4th in Sri Lanka & 118th in Asia Pacific - Cisco NetRiders',
    description: 'Ranked 4th in Sri Lanka and 118th in Asia Pacific at the Cisco NetRiders competition.',
    date: 'Sep 2017',
  },
]

function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaTrophy className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
            Achievements
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[rgba(30,58,138,0.3)] to-transparent hidden sm:block" />

          <div className="space-y-8">
            {achievements.map((item) => (
              <div key={item.title} className="relative sm:pl-20">
                {/* Dot */}
                <div className="absolute left-0 top-5 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)]">
                  <FaTrophy className="text-white text-base" />
                </div>

                <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden">
                  {/* Header */}
                  <div className="px-7 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug flex-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs font-medium text-[var(--color-primary)] bg-[rgba(30,58,138,0.08)] px-2.5 py-1 rounded-full whitespace-nowrap border border-[rgba(30,58,138,0.15)]">
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-7 py-4">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{item.description}</p>
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

export default Achievements
