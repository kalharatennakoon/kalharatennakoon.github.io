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

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

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

        <div ref={bodyRef} className={`max-w-3xl mx-auto flex flex-col gap-6 reveal ${bodyVisible ? 'is-visible' : ''}`}>
          {recommendations.map((r) => (
            <figure
              key={r.name}
              className="m-0 relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-[0_4px_15px_var(--shadow)] px-6 sm:px-10 pt-9 pb-8"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 inset-x-0 h-1"
                style={{ background: 'linear-gradient(90deg, var(--accent-bar-from), var(--accent-bar-to))' }}
              />
              <FaQuoteLeft aria-hidden="true" className="block mb-4 text-2xl text-[var(--color-primary)] opacity-25" />

              <blockquote cite={RECOMMENDATIONS_URL} className="m-0">
                <p className="m-0 text-[17px] sm:text-lg leading-relaxed text-[var(--text-primary)]">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-7 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }}
                  >
                    {initials(r.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-[var(--text-primary)]">{r.name}</span>
                    <span className="text-sm text-[var(--text-secondary)]">{r.role}</span>
                    <span className="text-sm text-[var(--text-secondary)]">{r.context} · {r.date}</span>
                  </span>
                </div>
                <a
                  href={RECOMMENDATIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-semibold text-[var(--color-primary)] hover:underline underline-offset-2"
                >
                  <FaLinkedin aria-hidden="true" /> Read the full recommendation
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
