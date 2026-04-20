const experiences = [
  {
    title: 'DevOps Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2024 – Oct 2024',
    achievements: [
      'Automated CI/CD pipelines using Tekton, streamlining artifact packaging and deployment for critical services',
      'Integrated Behave automated tests into Tekton pipelines, reducing manual debugging effort by ~30%',
      'Optimized pipeline configurations, resolving persistent build issues for faster deployment cycles',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2020 – Dec 2020',
    achievements: [
      'Built a cloud security scanning app using Docker and Kubernetes, improving container platform security posture',
      'Integrated scanning tools into CI/CD pipelines, enhancing vulnerability detection across deployment stages',
      'Diagnosed and resolved runtime issues, maintaining 99.9% system uptime',
    ],
  },
]

function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Experience</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {experiences.map((exp) => (
            <div key={exp.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.title}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· {exp.company}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.75rem', opacity: 0.7 }}>{exp.location}</p>
              <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                {exp.achievements.map((a, idx) => (
                  <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
