import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarCheck,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaUser,
} from 'react-icons/fa'
import ArchitectureDiagram from '../components/case-study/ArchitectureDiagram'
import { caseStudies, findCaseStudy, hostedCaseStudies } from '../data/caseStudies'
import usePageTitle from '../hooks/usePageTitle'
import NotFoundPage from './NotFoundPage'

const GRADIENT = { background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }
const ACCENT_BAR = { background: 'linear-gradient(90deg, var(--accent-bar-from), var(--accent-bar-to))' }

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'flow', label: 'Pipeline' },
  { id: 'decisions', label: 'Trade-offs' },
  { id: 'results', label: 'Results' },
  { id: 'next', label: 'Next steps' },
]

/** Shared width for everything below the hero. */
const WRAP = 'max-w-4xl mx-auto px-5 sm:px-8'

const card =
  'rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-[0_4px_15px_var(--shadow)]'

function Section({ id, index, title, intro, children }: { id: string; index: number; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 py-12 sm:py-16 border-t border-[var(--border-color)] first:border-t-0 first:pt-10 sm:first:pt-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs font-semibold text-[var(--color-primary)]">{String(index).padStart(2, '0')}</span>
        <span aria-hidden="true" className="h-px w-10" style={ACCENT_BAR} />
      </div>
      <h2 className="m-0 text-[1.75rem] sm:text-[2.125rem] font-bold text-[var(--text-primary)] leading-tight tracking-tight">{title}</h2>
      {intro && <p className="m-0 mt-4 text-base sm:text-[17px] text-[var(--text-secondary)] leading-relaxed max-w-[65ch]">{intro}</p>}
      <div className="mt-8 sm:mt-10">{children}</div>
    </section>
  )
}

function CaseStudyPage() {
  const { slug } = useParams()
  const study = findCaseStudy(slug)
  usePageTitle(study ? `${study.name} case study` : 'Page not found')

  if (!study) return <NotFoundPage />

  const others = [
    ...caseStudies.filter((c) => c.slug !== study.slug).map((c) => ({ name: c.name, to: `/projects/${c.slug}/`, hosted: false })),
    ...hostedCaseStudies.map((c) => ({ name: c.name, to: c.href, hosted: true })),
  ]
  const [lead, ...rest] = study.problem

  return (
    <article className="bg-[var(--bg-primary)]">
      {/* Hero band */}
      <header className="relative overflow-hidden border-b border-[var(--border-color)] bg-[var(--bg-secondary)] pt-28 sm:pt-32 pb-40 sm:pb-56">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(60rem 30rem at 85% -10%, var(--glow-primary), transparent 70%)' }}
        />
        <div className={`${WRAP} relative`}>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-2 text-sm text-[var(--text-secondary)]">
              <li>
                <Link to="/projects/" className="inline-flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                  <FaArrowLeft className="text-xs" /> Projects
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-50">/</li>
              <li aria-current="page" className="text-[var(--text-primary)] font-medium">{study.name}</li>
            </ol>
          </nav>

          <p className="m-0 mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--color-primary)] border border-[var(--border-color)] bg-[var(--card-bg)]">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full" style={GRADIENT} /> Case study
          </p>
          <h1 className="m-0 text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-[var(--text-primary)] leading-[1.1] tracking-tight max-w-[22ch]">
            {study.title}
          </h1>
          <p className="m-0 mt-6 text-[17px] sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-[60ch]">{study.tagline}</p>

          <ul className="m-0 mt-8 p-0 list-none flex flex-wrap gap-2.5">
            <li className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm text-[var(--text-secondary)] border border-[var(--border-color)] bg-[var(--card-bg)]">
              <FaCalendarCheck className="text-[var(--color-primary)]" /> {study.period}
            </li>
            <li className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm text-[var(--text-secondary)] border border-[var(--border-color)] bg-[var(--card-bg)]">
              <FaUser className="text-[var(--color-primary)]" /> {study.kind}
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={study.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
              style={GRADIENT}
            >
              <FaGlobe /> {study.live.label} <FaExternalLinkAlt className="text-[10px] opacity-80" />
            </a>
            {study.github && (
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-[var(--color-primary)] border border-[var(--border-color)] bg-[var(--card-bg)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaGithub /> Source on GitHub <FaExternalLinkAlt className="text-[10px] opacity-80" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Screenshot overlapping the hero band, then the key figures */}
      <div className={`${WRAP} relative -mt-28 sm:-mt-44`}>
        <div className={`${card} overflow-hidden p-1.5 sm:p-2 shadow-[0_24px_60px_var(--shadow)]`}>
          <img
            src={study.cover}
            alt={`Screenshot of ${study.name}`}
            width={960}
            height={600}
            className="block w-full h-auto rounded-xl"
          />
        </div>

        <dl className="m-0 mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {study.facts.map((f) => (
            <div key={f.label} className={`${card} relative overflow-hidden px-5 pt-6 pb-5`}>
              <span aria-hidden="true" className="absolute top-0 inset-x-0 h-1" style={ACCENT_BAR} />
              <dt className="sr-only">{f.label}</dt>
              <dd className="m-0">
                <span
                  className="block text-[2rem] sm:text-[2.5rem] leading-none font-bold text-[var(--text-primary)] tabular-nums tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {f.value}
                </span>
                <span className="block mt-3 text-[13px] text-[var(--text-secondary)] leading-snug">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <nav aria-label="On this page" className="mt-10 sm:mt-12 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)] sm:mr-2">On this page</span>
          <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block px-3.5 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-white hover:border-transparent hover:bg-[var(--fill-from)] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={WRAP}>
        <Section id="problem" index={1} title="The problem">
          <div className="flex flex-col gap-5 max-w-[65ch]">
            <p className="m-0 text-lg sm:text-xl text-[var(--text-primary)] leading-relaxed">{lead}</p>
            {rest.map((p) => (
              <p key={p} className="m-0 text-base sm:text-[17px] text-[var(--text-secondary)] leading-[1.75]">{p}</p>
            ))}
          </div>
        </Section>

        <Section id="architecture" index={2} title="Architecture" intro={study.architecture.intro}>
          <ArchitectureDiagram
            columns={study.architecture.columns}
            links={study.architecture.links}
            label={`Architecture of ${study.name}`}
          />
          {study.architecture.footnote && (
            <p className="m-0 mt-6 pl-4 border-l-2 border-[var(--color-primary)] text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[65ch]">
              {study.architecture.footnote}
            </p>
          )}
        </Section>

        <Section id="flow" index={3} title={study.flow.title} intro={study.flow.intro}>
          <ol className="m-0 p-0 list-none">
            {study.flow.steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 sm:gap-6 pb-8 last:pb-0">
                {i < study.flow.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-5 top-11 bottom-1 w-px -translate-x-1/2 bg-[var(--border-color)]" />
                )}
                <span
                  className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-[0_6px_16px_var(--shadow)]"
                  style={GRADIENT}
                >
                  {i + 1}
                </span>
                <div className={`${card} px-5 py-4 sm:px-6 sm:py-5`}>
                  <h3 className="m-0 text-[17px] font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="m-0 mt-2 text-[15px] text-[var(--text-secondary)] leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="decisions" index={4} title="Decisions and trade-offs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {study.decisions.map((d, i) => (
              <div key={d.title} className={`${card} relative overflow-hidden flex flex-col p-6`}>
                <span aria-hidden="true" className="absolute top-0 inset-x-0 h-1" style={ACCENT_BAR} />
                <span className="font-mono text-xs font-semibold text-[var(--text-secondary)]">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="m-0 mt-2 text-[17px] font-semibold text-[var(--text-primary)] leading-snug">{d.title}</h3>
                <p className="m-0 mt-3 text-[15px] text-[var(--text-secondary)] leading-relaxed">{d.why}</p>
                <div className="mt-auto pt-5">
                  <p className="m-0 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                    <span className="block mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-primary)]">Trade-off</span>
                    {d.cost}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="results" index={5} title="Results">
          <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {study.results.map((r) => (
              <li key={r} className={`${card} flex gap-4 p-5 sm:p-6`}>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs"
                  style={GRADIENT}
                >
                  <FaCheck />
                </span>
                <p className="m-0 text-[15px] text-[var(--text-secondary)] leading-relaxed">{r}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="next" index={6} title="What I'd do next" intro={study.next.intro}>
          <ol className="m-0 p-0 list-none flex flex-col gap-3">
            {study.next.items.map((item, i) => (
              <li key={item} className={`${card} grid grid-cols-[2rem_minmax(0,1fr)] gap-4 px-5 py-4 sm:px-6 sm:py-5 items-start`}>
                <span className="font-mono text-sm font-semibold text-[var(--color-primary)] pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                <p className="m-0 text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</p>
              </li>
            ))}
          </ol>
        </Section>

        <section className="py-12 sm:py-14 border-t border-[var(--border-color)]" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="m-0 mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">Built with</h2>
          <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <li
                key={t}
                className="px-3.5 py-1.5 bg-[rgba(30,58,138,0.07)] text-[var(--color-primary)] rounded-full text-[13px] font-medium border border-[rgba(30,58,138,0.15)]"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        <footer className="pt-10 pb-24 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/projects/"
            className={`${card} group flex items-center gap-4 px-6 py-5 hover:border-[rgba(30,58,138,0.4)] transition-colors`}
          >
            <FaArrowLeft className="text-sm text-[var(--color-primary)] transition-transform group-hover:-translate-x-1" />
            <span className="flex flex-col">
              <span className="text-xs text-[var(--text-secondary)]">Back to</span>
              <span className="text-base font-semibold text-[var(--text-primary)]">All projects</span>
            </span>
          </Link>
          {others.map((o, i) => {
            const cls = `${card} group flex items-center justify-between gap-4 px-6 py-5 hover:border-[rgba(30,58,138,0.4)] transition-colors`
            const body = (
              <>
                <span className="flex flex-col">
                  <span className="text-xs text-[var(--text-secondary)]">{i === 0 ? 'Next case study' : 'Case study'}</span>
                  <span className="text-base font-semibold text-[var(--text-primary)]">{o.name}</span>
                </span>
                <FaArrowRight className="text-sm text-[var(--color-primary)] transition-transform group-hover:translate-x-1" />
              </>
            )
            // A hosted case study is a separate site on the same domain, so it needs a full page load.
            return o.hosted ? (
              <a key={o.to} href={o.to} className={cls}>{body}</a>
            ) : (
              <Link key={o.to} to={o.to} className={cls}>{body}</Link>
            )
          })}
        </footer>
      </div>
    </article>
  )
}

export default CaseStudyPage
