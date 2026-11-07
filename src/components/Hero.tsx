import { useEffect, useState, type CSSProperties } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const credentials = [
  { fact: 'First Class Honours', context: 'BSc Computer Science, Kingston University' },
  { fact: 'Batch Top', context: 'Software Engineering cohort, 2026' },
  { fact: 'Top 10 of 700+', context: 'Ascentic AI Launch Pad 2026' },
  { fact: '2× Dan Kohn Scholar', context: 'KubeCon + CloudNativeCon Europe' },
  { fact: '50+ articles', context: '150K+ views on Medium' },
]

const delay = (seconds: number) => ({ '--enter-delay': `${seconds}s` }) as CSSProperties

function useColomboTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Colombo',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(new Date())

  const [time, setTime] = useState(format)

  useEffect(() => {
    // Tick on the minute boundary so the clock never lags by up to a minute.
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      setTime(format())
      interval = window.setInterval(() => setTime(format()), 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])

  return time
}

export function Hero() {
  const time = useColomboTime()

  return (
    <section id="hero" className="pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="page-wrap">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div>
            <p className="enter flex items-center gap-2 text-[0.875rem] font-medium text-muted" style={delay(0)}>
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full rounded-full bg-positive opacity-40 motion-safe:animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-positive" />
              </span>
              Open to software, DevOps, cloud and MLOps roles
            </p>

            <h1
              className="enter mt-5 text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] sm:text-[4rem] lg:text-[4.5rem]"
              style={delay(0.06)}
            >
              Kalhara Tennakoon
            </h1>

            <p
              className="enter mt-4 text-[1.25rem] leading-snug text-muted sm:text-[1.5rem]"
              style={delay(0.12)}
            >
              Software, DevOps &amp; AI/ML engineer
            </p>

            <p
              className="enter mt-6 max-w-[38rem] text-[1.0625rem] leading-relaxed text-ink/85"
              style={delay(0.18)}
            >
              First Class Computer Science graduate and Software Engineering batch top, with
              industry experience at IFS R&amp;D in Kubernetes-native CI/CD and container
              security. I build full-stack applications, machine learning systems and AI tools,
              and ship them with GitOps.
            </p>

            <div className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(0.24)}>
              <a href="#projects" className="btn btn-primary">
                View projects
              </a>
              <a
                href="/Kalhara_Tennakoon_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Download CV
              </a>
              <a
                href="https://github.com/kalharatennakoon"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn ml-1"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://www.linkedin.com/in/kalharatennakoon"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>

            <p className="enter mt-6 text-[0.8125rem] text-faint" style={delay(0.3)}>
              Kurunegala, Sri Lanka, where it's <time className="tabular-nums">{time}</time>
            </p>
          </div>

          <div className="enter mx-auto w-full max-w-[17rem] lg:max-w-none" style={delay(0.12)}>
            <div className="overflow-hidden rounded-xl border border-rule bg-sunken shadow-[var(--shadow-md)]">
              <picture>
                <source srcSet="/profile.webp" type="image/webp" />
                <img
                  src="/profile.png"
                  alt="Portrait of Kalhara Tennakoon"
                  width={1024}
                  height={1024}
                  className="aspect-[4/5] w-full object-cover object-top"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
        </div>

        <ul
          className="enter mt-16 grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-5"
          style={delay(0.36)}
          aria-label="Highlights"
        >
          {credentials.map((c, i) => (
            <li
              key={c.fact}
              className={`border-b border-rule py-4 lg:border-b-0 lg:py-5 lg:pr-5 ${
                i > 0 ? 'lg:border-l lg:pl-5' : ''
              } ${i % 2 === 1 ? 'sm:border-l sm:pl-5 lg:pl-5' : ''}`}
            >
              <p className="font-semibold text-ink">{c.fact}</p>
              <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{c.context}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
