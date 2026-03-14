import { FaGraduationCap, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa'

function Education() {
  return (
    <section id="education" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center text-[var(--text-primary)] font-bold relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#667eea] after:to-[#764ba2] after:rounded-sm">
          Education
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <FaGraduationCap className="text-2xl flex-shrink-0 text-[#667eea]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Computer Science • Software Engineering • Cloud Computing
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Kingston University */}
          <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border-l-4 border-[#667eea] transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_var(--shadow)]">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                BSc(Hons) Computer Science (Software Engineering)
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[var(--text-secondary)]">
                <p className="text-lg font-medium text-[#667eea] m-0">Kingston University, London, UK</p>
                <p className="text-sm m-0">September 2026 (Expected)</p>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-1 m-0 flex items-center gap-1">
                <FaMapMarkerAlt className="text-[#667eea]" /> Delivered via ESOFT UNI (ESU), Sri Lanka
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Concentrations</p>
              <div className="flex flex-wrap gap-2">
                {['Software Engineering', 'Web Application Development', 'Research & Data Analysis'].map((c) => (
                  <span key={c} className="px-3 py-1 bg-[rgba(102,126,234,0.1)] text-[#667eea] rounded-full text-sm font-medium border border-[rgba(102,126,234,0.25)]">{c}</span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Key Coursework</p>
              <ul className="space-y-1 list-none pl-0">
                {[
                  'Object-Oriented Programming',
                  'Data Structures & Algorithms',
                  'Network Security',
                  'Database Design',
                  'UX/UI Design',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[var(--text-secondary)] text-sm">
                    <FaChevronRight className="text-[#667eea] text-xs mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Maliyadeva College */}
          <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border-l-4 border-[#764ba2] transition-all hover:-translate-y-1 hover:shadow-[0_8px_25px_var(--shadow)]">
            <div className="mb-4">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
                High School
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[var(--text-secondary)]">
                <p className="text-lg font-medium text-[#764ba2] m-0">Maliyadeva College</p>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-1 m-0 flex items-center gap-1">
                <FaMapMarkerAlt className="text-[#764ba2]" /> Kurunegala, Sri Lanka
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">GCE Advanced Level</p>
                <p className="text-sm text-[var(--text-secondary)]">Political Science — <strong className="text-[var(--text-primary)]">A</strong> &nbsp;|&nbsp; Information & Communication Technology — <strong className="text-[var(--text-primary)]">B</strong> &nbsp;|&nbsp; Logic & Scientific Method — <strong className="text-[var(--text-primary)]">C</strong> &nbsp;|&nbsp; General English — <strong className="text-[var(--text-primary)]">A</strong></p>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1">GCE Ordinary Level</p>
                <p className="text-sm text-[var(--text-secondary)]">9As</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
