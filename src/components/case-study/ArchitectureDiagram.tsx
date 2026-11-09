import { FaArrowDown, FaArrowRight } from 'react-icons/fa'
import type { ArchColumn, ArchNode } from '../../data/caseStudies'

// An architecture diagram built from HTML rather than an image, so it follows
// the light/dark theme, reflows to a vertical stack on phones, and its text is
// in the prerendered page for search engines and screen readers.

function Node({ node }: { node: ArchNode }) {
  return (
    <li className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3.5 py-2.5 shadow-[0_1px_2px_var(--shadow)]">
      <p className="m-0 text-sm font-semibold text-[var(--text-primary)] leading-snug">{node.label}</p>
      {node.detail && <p className="m-0 mt-0.5 text-xs text-[var(--text-secondary)] leading-relaxed">{node.detail}</p>}
    </li>
  )
}

function Column({ column }: { column: ArchColumn }) {
  return (
    <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 h-full">
      <p className="m-0 mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-secondary)]">{column.title}</p>
      {column.nodes && (
        <ul className="m-0 p-0 list-none flex flex-col gap-2">
          {column.nodes.map((n) => <Node key={n.label} node={n} />)}
        </ul>
      )}
      {column.groups && (
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {column.groups.map((g) => (
            <div key={g.title} className="rounded-lg border border-dashed border-[var(--text-secondary)]/40 p-3">
              <p className="m-0 mb-2 font-mono text-xs font-semibold text-[var(--color-primary)] whitespace-nowrap">{g.title}</p>
              <ul className="m-0 p-0 list-none flex flex-col gap-2">
                {g.nodes.map((n) => <Node key={n.label} node={n} />)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Connector({ label }: { label: string }) {
  return (
    <div className="flex lg:flex-col items-center justify-center gap-2 py-1 lg:py-0 lg:px-1 lg:w-20 flex-shrink-0" aria-hidden="true">
      <FaArrowDown className="lg:hidden text-[var(--color-primary)] opacity-70" />
      <FaArrowRight className="hidden lg:block text-[var(--color-primary)] opacity-70" />
      <span className="text-[11px] leading-tight text-center text-[var(--text-secondary)]">{label}</span>
    </div>
  )
}

function ArchitectureDiagram({ columns, links, label }: { columns: ArchColumn[]; links: string[]; label: string }) {
  return (
    <figure className="m-0 xl:-mx-28" aria-label={label}>
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {columns.map((column, i) => (
          <div key={column.title} className="contents">
            {i > 0 && <Connector label={links[i - 1] ?? ''} />}
            <div className={column.groups ? 'lg:flex-[2] min-w-0' : 'lg:flex-1 min-w-0'}>
              <Column column={column} />
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}

export default ArchitectureDiagram
