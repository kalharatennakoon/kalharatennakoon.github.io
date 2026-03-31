import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaChevronRight } from 'react-icons/fa'

function Education() {
  return (
    <section id="education" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaGraduationCap className="text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent">
            Education
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[rgba(30,58,138,0.3)] to-transparent hidden sm:block" />

          <div className="space-y-10">
            {/* Kingston University */}
            <div className="relative sm:pl-20">
              <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] shadow-[0_0_0_4px_var(--bg-secondary),0_0_0_5px_rgba(30,58,138,0.25)] dark:shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)]">
                <FaGraduationCap className="text-white text-base" />
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="px-7 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                        BSc(Hons) Computer Science (Software Engineering)
                      </h3>
                      <p className="text-base font-semibold text-[var(--color-primary)] m-0">
                        Kingston University, London, UK
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0">
                      Undergraduate
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <FaCalendarAlt className="text-[var(--color-primary)] text-xs" />
                      Expected September 2026
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <FaMapMarkerAlt className="text-[var(--color-primary)] text-xs" />
                      Delivered via ESOFT UNI (ESU), Sri Lanka
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-7 py-5 space-y-5">
                  <div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Concentrations</p>
                    <div className="flex flex-wrap gap-2">
                      {['Software Engineering', 'Web Application Development', 'Research & Data Analysis'].map((c) => (
                        <span key={c} className="px-3 py-1 bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.2)]">{c}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Key Coursework</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 list-none">
                      {[
                        'Object-Oriented Programming',
                        'Data Structures & Algorithms',
                        'Network Security',
                        'Database Design',
                        'UX/UI Design',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <FaChevronRight className="text-[var(--color-primary)] text-xs flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Maliyadeva College */}
            <div className="relative sm:pl-20">
              <div className="absolute left-0 top-6 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] shadow-[0_0_0_4px_var(--bg-secondary),0_0_0_5px_rgba(30,58,138,0.25)] dark:shadow-[0_0_0_4px_var(--bg-primary),0_0_0_5px_rgba(30,58,138,0.25)]">
                <FaGraduationCap className="text-white text-base" />
              </div>

              <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="px-7 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1 leading-tight">
                        High School
                      </h3>
                      <p className="text-base font-semibold text-[var(--color-primary)] m-0">
                        Maliyadeva College
                      </p>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[rgba(30,58,138,0.1)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)] flex-shrink-0">
                      Secondary
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
                      <FaMapMarkerAlt className="text-[var(--color-primary)] text-xs" />
                      Kurunegala, Sri Lanka
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-7 py-5 space-y-5">
                  <div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">GCE Advanced Level</p>
                    <ul className="space-y-1.5 list-none">
                      {[
                        { subject: 'Political Science', grade: 'A' },
                        { subject: 'Information & Communication Technology', grade: 'B' },
                        { subject: 'Logic & Scientific Method', grade: 'C' },
                        { subject: 'General English', grade: 'A' },
                      ].map(({ subject, grade }) => (
                        <li key={subject} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <FaChevronRight className="text-[var(--color-primary)] text-xs flex-shrink-0" />
                          <span>{subject}</span>
                          <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)]">{grade}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">GCE Ordinary Level</p>
                    <div className="flex items-center gap-2">
                      <FaChevronRight className="text-[var(--color-primary)] text-xs flex-shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">9 subjects passed with</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.2)]">9 A's</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
