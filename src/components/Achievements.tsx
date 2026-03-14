import { FaTrophy } from 'react-icons/fa'

interface Achievement {
  title: string
  description: string
  date: string
  highlight?: boolean
}

const achievements: Achievement[] = [
  {
    title: 'Dan Kohn Scholarship — KubeCon + CloudNativeCon',
    description: 'Awarded the CNCF Dan Kohn Scholarship to attend KubeCon + CloudNativeCon. Recognised for contributions and potential in the cloud-native ecosystem.',
    date: '2025 & 2022',
    highlight: true,
  },
  {
    title: 'First Runner-Up — Hack:Bit Hackathon',
    description: 'Secured First Runner-Up at the Hack:Bit national-level hackathon, competing against university and school teams across Sri Lanka.',
    date: 'Jul 2019',
  },
  {
    title: 'Top 15 Finalist — HaXmas Hackathon',
    description: 'Selected as one of the Top 15 finalists at the HaXmas Hackathon, a competitive coding and innovation challenge.',
    date: 'Jan 2018',
  },
  {
    title: 'Finalist — Cisco Packet Riders',
    description: 'Reached the national final of Cisco Packet Riders, a networking and troubleshooting competition open to students across Sri Lanka.',
    date: 'Jul 2018',
  },
  {
    title: '4th in Sri Lanka & 118th in Asia Pacific — Cisco NetRiders',
    description: 'Achieved 4th place in Sri Lanka and 118th in Asia Pacific at the Cisco NetRiders Skills Competition, a regional networking proficiency assessment.',
    date: 'Sep 2017',
  },
]

function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-[var(--bg-primary)] dark:bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Achievements
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <FaTrophy className="text-2xl flex-shrink-0 text-[#667eea]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Scholarships • Hackathons • Competitions
          </p>
        </div>

        <div className="space-y-5 max-w-4xl mx-auto">
          {achievements.map((item) => (
            <div
              key={item.title}
              className={`bg-[var(--card-bg)] p-6 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border-l-4 transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(102,126,234,0.15)] ${
                item.highlight
                  ? 'border-[#667eea] bg-gradient-to-r from-[rgba(102,126,234,0.04)] to-transparent'
                  : 'border-[#764ba2]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex items-start gap-3 flex-1">
                  <FaTrophy
                    className={`text-xl mt-0.5 flex-shrink-0 ${item.highlight ? 'text-[#667eea]' : 'text-[#764ba2]'}`}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">{item.description}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#667eea] bg-[rgba(102,126,234,0.1)] px-3 py-1 rounded-full whitespace-nowrap self-start sm:self-auto flex-shrink-0">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
