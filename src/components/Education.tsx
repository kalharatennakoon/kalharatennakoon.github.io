function Education() {
  return (
    <section id="education" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Education</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Kingston University */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>BSc (Hons) Computer Science (Software Engineering)</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Graduation: Sep 2026</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.625rem' }}>Kingston University, London, UK · Delivered via ESU, Sri Lanka</p>
            <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', listStyleType: 'disc' }}>
              <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>Concentrations:</span> Software Engineering · Web Application Development · Research & Data Analysis
              </li>
              <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>Key Coursework:</span> Object-Oriented Programming · Data Structures & Algorithms · Network Security · Database Design · UI/UX Design · Web Application Development · Research & Data Analysis
              </li>
              <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>Final Year Project:</span> VetCare Pro — Full-stack veterinary healthcare management platform with RESTful architecture, database management, and machine learning workflows
              </li>
            </ul>
          </div>

          {/* Maliyadeva College */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>High School</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>Maliyadeva College · Kurunegala, Sri Lanka</p>
            <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', listStyleType: 'disc' }}>
              <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>GCE Advanced Level:</span> A, B, C · General English: A
              </li>
              <li style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                <span style={{ fontWeight: 600 }}>GCE Ordinary Level:</span> 9As
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Education
