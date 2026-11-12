import { FaLinkedin, FaQuoteLeft } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

interface Recommendation {
  /** Copied word for word from the LinkedIn recommendation, with permission. */
  quote: string
  name: string
  role: string
  context: string
  date: string
}

const RECOMMENDATIONS_URL = 'https://www.linkedin.com/in/kalharatennakoon/details/recommendations/'

const recommendations: Recommendation[] = [
  {
    quote:
      'Kalhara is a dedicated and enthusiastic individual with a strong willingness to learn and take on new challenges. ' +
      'I had the pleasure of mentoring him through the Ascentic AI LaunchPad programme, where I got to see his ' +
      'problem-solving skills, adaptability, and commitment to improving his technical capabilities.',
    name: 'Nuwan Wijethilaka',
    role: 'Senior Technical Lead',
    context: 'Mentor, Ascentic AI LaunchPad',
    date: 'November 2026',
  },
]

function Recommendations() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [bodyRef, bodyVisible] = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section id="recommendations" className="pt-4 pb-20 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaQuoteLeft className="relative text-3xl text-[var(--color-primary)]" aria-hidden="true" />
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent animate-gradient-text pb-1"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--text-grad-from) 0%, var(--text-grad-to) 100%)', backgroundSize: '200% 200%' }}
            >
              Recommendations
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        <div ref={bodyRef} className={`max-w-2xl mx-auto flex flex-col gap-6 reveal ${bodyVisible ? 'is-visible' : ''}`}>
          {recommendations.map((r) => (
            <figure
              key={r.name}
              className="m-0 glass-card shimmer-hover relative overflow-hidden rounded-2xl p-6 sm:p-8"
            >
              <blockquote cite={RECOMMENDATIONS_URL} className="m-0">
                <p className="m-0 text-[15px] sm:text-base leading-relaxed text-[var(--text-primary)]">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-6 pt-5 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <span className="flex flex-col">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">{r.name}</span>
                  <span className="text-xs text-[var(--text-secondary)]">{r.role} · {r.date}</span>
                  <span className="mt-1 text-xs text-[var(--text-secondary)] opacity-80">
                    {r.context}
                  </span>
                </span>
                <a
                  href={RECOMMENDATIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 self-start sm:self-auto text-xs font-semibold text-[var(--color-primary)] hover:underline underline-offset-2"
                >
                  <FaLinkedin aria-hidden="true" className="text-sm" /> Read on LinkedIn
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Recommendations
