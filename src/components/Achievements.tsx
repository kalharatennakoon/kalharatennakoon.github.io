import { FaTrophy } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

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
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [timelineRef, timelineVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="achievements" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">

      {/* Background blobs */}
      <div
        className="blob-shape w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.07), rgba(30,58,138,0.08), transparent)',
          top: '-100px',
          right: '-80px',
          animationDuration: '20s',
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
              <div className="absolute inset-0 blur-xl bg-amber-400 opacity-30 rounded-full" />
              <FaTrophy className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text pb-1"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Achievements
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
              transition: 'transform 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />

          <div className="space-y-8">
            {achievements.map((item, index) => (
              <div
                key={item.title}
                className={`relative sm:pl-20 reveal-left ${timelineVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: timelineVisible ? `${0.15 + index * 0.15}s` : '0s' }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-5 hidden sm:flex items-center justify-center w-12 h-12 rounded-full shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)] pulse-dot"
                  style={{
                    background: item.highlight
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                      : 'linear-gradient(135deg, var(--color-primary), #06b6d4)',
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <FaTrophy className="text-white text-base" />
                </div>

                <div className={`bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border transition-all duration-300 hover:-translate-y-1 overflow-hidden shimmer-hover ${
                  item.highlight
                    ? 'border-amber-400/30 hover:border-amber-400/50 hover:shadow-[0_12px_36px_rgba(245,158,11,0.14)]'
                    : 'border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:shadow-[0_12px_36px_rgba(30,58,138,0.14)]'
                }`}>
                  {/* Highlight accent */}
                  {item.highlight && (
                    <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #f59e0b, #d97706)' }} />
                  )}

                  {/* Header */}
                  <div className={`px-7 pt-5 pb-4 border-b border-[var(--border-color)] ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[rgba(245,158,11,0.06)] to-transparent'
                      : 'bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent'
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug flex-1">
                        {item.title}
                      </h3>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap border flex-shrink-0 ${
                        item.highlight
                          ? 'text-white bg-amber-500 border-amber-600 shadow-[0_2px_8px_rgba(245,158,11,0.4)]'
                          : 'text-[var(--color-primary)] bg-[rgba(30,58,138,0.08)] border-[rgba(30,58,138,0.15)]'
                      }`}>
                        {item.date}
                      </span>
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
