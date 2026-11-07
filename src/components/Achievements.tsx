import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

interface Achievement {
  title: string
  subtitle: string
  description: string
  date: string
  category: 'Global Scholarship' | 'National Finalist' | 'Academic Cohort' | 'Hackathon'
  featured?: boolean
}

const achievementsData: Achievement[] = [
  {
    title: 'Top 10 Finalist — Ascentic AI Launch Pad',
    subtitle: 'National AI Innovation Program & Demo Day Presentation',
    description:
      'Selected for the Top 10 of the Ascentic AI Launch Pad programme and invited to present VetCare Pro at Demo Day. Recognized for its on-premise local RAG assistant (Ollama & pgvector), ML demand forecasting models, and companion iOS app built for a real working veterinary clinic.',
    date: '2026',
    category: 'National Finalist',
    featured: true,
  },
  {
    title: 'Batch Top — Software Engineering',
    subtitle: 'BSc (Hons) Computer Science, ESU Kandy',
    description:
      'Ranked #1 in the Software Engineering cohort of the BSc (Hons) Computer Science degree delivered in collaboration with Kingston University London.',
    date: '2026',
    category: 'Academic Cohort',
    featured: true,
  },
  {
    title: 'Two-Time Dan Kohn Scholarship Recipient',
    subtitle: 'KubeCon + CloudNativeCon Europe (CNCF)',
    description:
      'Awarded the highly competitive Cloud Native Computing Foundation (CNCF) Dan Kohn Memorial Scholarship twice (2022 & 2025) recognizing contributions and community leadership in the cloud-native ecosystem.',
    date: '2025 & 2022',
    category: 'Global Scholarship',
    featured: true,
  },
  {
    title: 'First Runner-Up — Hack:Bit Hackathon',
    subtitle: 'National Collaboration with Microsoft & Sarvodaya Fusion',
    description:
      'Secured First Runner-Up at the Hack:Bit national-level hackathon, competing against top university and school development teams across Sri Lanka.',
    date: 'Jul 2019',
    category: 'Hackathon',
  },
  {
    title: 'Top 15 Finalist — HaXmas Hackathon',
    subtitle: '75+ Competing Engineering Teams Nationally',
    description:
      'Selected as one of the Top 15 finalists from 75+ competing teams at the HaXmas national-level coding and product innovation challenge.',
    date: 'Jan 2018',
    category: 'Hackathon',
  },
  {
    title: 'National Finalist — Cisco Packet Riders',
    subtitle: 'Advanced Networking & Troubleshooting Challenge',
    description:
      'Reached the national final of Cisco Packet Riders, a competitive networking protocol and troubleshooting challenge across Sri Lanka.',
    date: 'Jul 2018',
    category: 'National Finalist',
  },
  {
    title: '4th in Sri Lanka & 118th in Asia Pacific — Cisco NetRiders',
    subtitle: 'Asia Pacific & Japan Regional Competition',
    description:
      'Ranked 4th nationally in Sri Lanka and 118th overall across the entire Asia Pacific & Japan (APJ) region in the Cisco NetRiders networking championship.',
    date: 'Sep 2017',
    category: 'Global Scholarship',
  },
]

export function Achievements() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaTrophy className="text-xs" />
            <span>Honors & Accolades</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Achievements & Recognition
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Competitive honors spanning global cloud-native scholarships, national AI demo days, and hackathon podiums.
          </p>
        </div>

        {/* Bento Trophy Room Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {achievementsData.map((item) => (
            <div
              key={item.title}
              className={`bento-card p-6 flex flex-col justify-between shimmer-hover ${
                item.featured ? 'border-amber-500/30 shadow-lg' : ''
              }`}
            >
              <div>
                {/* Top Badge & Date */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-sm ${
                    item.featured
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950'
                      : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  }`}>
                    {item.featured ? <FaTrophy /> : <FaMedal />}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 leading-snug">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-sky-400 mb-3">
                  {item.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.featured && (
                <div className="mt-5 pt-3 border-t border-[var(--border-color)] flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                  <FaStar className="text-[10px]" />
                  <span>Featured Milestone</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Achievements
