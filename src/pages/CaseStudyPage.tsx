import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeft, FaArrowRight, FaCalendarCheck, FaExternalLinkAlt, FaGithub, FaGlobe, FaUser } from 'react-icons/fa'
import ArchitectureDiagram from '../components/case-study/ArchitectureDiagram'
import { caseStudies, findCaseStudy } from '../data/caseStudies'
import usePageTitle from '../hooks/usePageTitle'
import NotFoundPage from './NotFoundPage'

const GRADIENT = { background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }

const SECTIONS = [
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'flow', label: 'Pipeline' },
  { id: 'decisions', label: 'Trade-offs' },
  { id: 'results', label: 'Results' },
  { id: 'next', label: 'Next' },
]

function Section({ id, index, title, children }: { id: string; index: number; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 py-10 border-t border-[var(--border-color)]">
      <p className="m-0 mb-2 font-mono text-xs font-semibold text-[var(--text-secondary)]">
        {String(index).padStart(2, '0')}
      </p>
      <h2 className="m-0 mb-5 text-2xl sm:text-3xl font-bold text-[var(--text-primary)] leading-tight">{title}</h2>
      {children}
    </section>
  )
}

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="flex flex-col gap-4 max-w-[68ch]">
      {paragraphs.map((p) => (
        <p key={p} className="m-0 text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed">{p}</p>
      ))}
    </div>
  )
}

function CaseStudyPage() {
  const { slug } = useParams()
  const study = findCaseStudy(slug)
  usePageTitle(study ? `${study.name} case study` : 'Page not found')

  if (!study) return <NotFoundPage />

  const others = caseStudies.filter((c) => c.slug !== study.slug)

  return (
    <article className="bg-[var(--bg-primary)] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm">
          <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-2 text-[var(--text-secondary)]">
            <li>
              <Link to="/projects/" className="inline-flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
                <FaArrowLeft className="text-xs" /> Projects
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--text-primary)] font-medium">{study.name}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="pb-10">
          <p className="m-0 mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-primary)]">Case study</p>
          <h1 className="m-0 mb-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[var(--text-primary)] leading-[1.15]">
            {study.title}
          </h1>
          <p className="m-0 mb-6 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-[62ch]">{study.tagline}</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-7 text-sm text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-2">
              <FaCalendarCheck className="text-[var(--color-primary)]" /> {study.period}
            </span>
            <span className="inline-flex items-center gap-2">
              <FaUser className="text-[var(--color-primary)]" /> {study.kind}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={study.live.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_8px_24px_rgba(30,58,138,0.35)] hover:-translate-y-0.5"
              style={GRADIENT}
            >
              <FaGlobe /> {study.live.label} <FaExternalLinkAlt className="text-[10px] opacity-80" />
            </a>
            {study.github && (
              <a
                href={study.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-[var(--color-primary)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:bg-[rgba(30,58,138,0.06)] transition-colors"
              >
                <FaGithub /> Source on GitHub <FaExternalLinkAlt className="text-[10px] opacity-80" />
              </a>
            )}
          </div>
        </header>

        <img
          src={study.cover}
          alt={`Screenshot of ${study.name}`}
          width={960}
          height={600}
          className="w-full h-auto rounded-2xl border border-[var(--border-color)] shadow-[0_10px_30px_var(--shadow)]"
        />

        {/* Key figures */}
        <dl className="m-0 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {study.facts.map((f) => (
            <div key={f.label} className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
              <dt className="sr-only">{f.label}</dt>
              <dd className="m-0">
                <span className="block text-3xl font-bold text-[var(--text-primary)] tabular-nums" style={{ fontFamily: 'var(--font-display)' }}>
                  {f.value}
                </span>
                <span className="block mt-1 text-xs text-[var(--text-secondary)] leading-snug">{f.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* On this page */}
        <nav aria-label="On this page" className="mt-10 mb-2">
          <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)] transition-colors"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Section id="problem" index={1} title="The problem">
          <Prose paragraphs={study.problem} />
        </Section>

        <Section id="architecture" index={2} title="Architecture">
          <div className="mb-6"><Prose paragraphs={[study.architecture.intro]} /></div>
          <ArchitectureDiagram
            columns={study.architecture.columns}
            links={study.architecture.links}
            label={`Architecture of ${study.name}`}
          />
          {study.architecture.footnote && (
            <p className="m-0 mt-4 text-sm text-[var(--text-secondary)] leading-relaxed max-w-[68ch]">{study.architecture.footnote}</p>
          )}
        </Section>

        <Section id="flow" index={3} title={study.flow.title}>
          <div className="mb-6"><Prose paragraphs={[study.flow.intro]} /></div>
          <ol className="m-0 p-0 list-none relative">
            {study.flow.steps.map((step, i) => (
              <li key={step.title} className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-4 pb-6 last:pb-0">
                {i < study.flow.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[1.0625rem] top-9 bottom-0 w-px bg-[var(--border-color)]" />
                )}
                <span
                  className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={GRADIENT}
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="m-0 mb-1 text-base font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="m-0 text-sm sm:text-[15px] text-[var(--text-secondary)] leading-relaxed max-w-[68ch]">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="decisions" index={4} title="Decisions and trade-offs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.decisions.map((d) => (
              <div key={d.title} className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 flex flex-col gap-3">
                <h3 className="m-0 text-base font-semibold text-[var(--text-primary)] leading-snug">{d.title}</h3>
                <p className="m-0 text-sm text-[var(--text-secondary)] leading-relaxed">{d.why}</p>
                <p className="m-0 mt-auto pt-3 border-t border-[var(--border-color)] text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--text-primary)]">Trade-off: </span>
                  {d.cost}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="results" index={5} title="Results">
          <ul className="m-0 p-0 list-none flex flex-col gap-3 max-w-[68ch]">
            {study.results.map((r) => (
              <li key={r} className="relative pl-5 text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] w-2 h-2 rounded-full" style={GRADIENT} />
                {r}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="next" index={6} title="What I'd do next">
          {study.next.intro && <div className="mb-5"><Prose paragraphs={[study.next.intro]} /></div>}
          <ol className="m-0 pl-5 flex flex-col gap-3 max-w-[68ch] list-decimal marker:text-[var(--text-secondary)] marker:font-mono marker:text-sm">
            {study.next.items.map((item) => (
              <li key={item} className="pl-1 text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed">{item}</li>
            ))}
          </ol>
        </Section>

        <section className="py-10 border-t border-[var(--border-color)]" aria-labelledby="stack-heading">
          <h2 id="stack-heading" className="m-0 mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]">Stack</h2>
          <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
            {study.stack.map((t) => (
              <li
                key={t}
                className="px-3 py-1 bg-[rgba(30,58,138,0.07)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.15)]"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* More */}
        <footer className="pt-10 border-t border-[var(--border-color)] flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Link
            to="/projects/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaArrowLeft className="text-xs" /> All projects
          </Link>
          {others.map((o) => (
            <Link
              key={o.slug}
              to={`/projects/${o.slug}/`}
              className="group inline-flex flex-col items-start sm:items-end rounded-xl border border-[var(--border-color)] px-5 py-3 hover:border-[rgba(30,58,138,0.4)] transition-colors"
            >
              <span className="text-xs text-[var(--text-secondary)]">Next case study</span>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
                {o.name} <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </footer>
      </div>
    </article>
  )
}

export default CaseStudyPage
