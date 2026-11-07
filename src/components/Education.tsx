import Logbook from './Logbook'

const degreeFacts: [string, string][] = [
  ['Degree', 'BSc (Hons) Computer Science, Software Engineering'],
  ['University', 'Kingston University, London. Studied in Sri Lanka through ESU, Kandy.'],
  ['Result', 'First Class Honours, and Batch Top of the Software Engineering cohort'],
  ['Final year project', 'VetCare One, Grade A (76%)'],
]

const modules = [
  'Object-oriented programming',
  'Data structures and algorithms',
  'Network security',
  'Database design',
  'UI/UX design',
  'Web application development',
  'Research and data analysis',
]

export function Education() {
  return (
    <section id="education" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Education</h2>
          <p className="section-lede">
            The degree in brief, then a logbook of the years around it: projects, internships,
            scholarships and honours. Open the cover to read it.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <dl className="border-t border-rule">
            {degreeFacts.map(([k, v]) => (
              <div key={k} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-[0.875rem] font-medium text-muted">{k}</dt>
                <dd className="text-[0.9688rem] text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="text-[0.9375rem] font-medium text-muted">Modules included</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {modules.map((m) => (
                <li key={m} className="tag">{m}</li>
              ))}
            </ul>
            <p className="mt-6 text-[0.9375rem] text-muted">
              Graduated in 2026.{' '}
              <a href="/Kalhara_Tennakoon_CV.pdf" target="_blank" rel="noopener noreferrer" className="text-link">
                Full details in the CV
              </a>
              .
            </p>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl bg-sunken px-4 py-12 sm:px-5 sm:py-16">
          <Logbook />
        </div>
      </div>
    </section>
  )
}

export default Education
