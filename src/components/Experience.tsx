const experiences = [
  {
    title: 'DevOps Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2024 – Oct 2024',
    summary: 'Worked on Kubernetes-native CI/CD workflows and deployment automation for cloud-native services.',
    achievements: [
      'Automated artifact packaging and CI/CD workflow execution using Tekton, streamlining deployment processes for critical services',
      'Integrated Behave automated testing into Tekton pipelines, reducing manual debugging effort by ~30% and improving deployment reliability',
      'Optimized pipeline configurations and resolved recurring build issues to improve deployment stability and engineering efficiency',
      'Conducted a knowledge-sharing session on testing best practices to support team collaboration and code quality improvements',
    ],
    stack: ['Kubernetes', 'Tekton', 'Docker', 'Azure DevOps', 'CI/CD', 'Python'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'IFS R&D International (Pvt) Ltd',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2020 – Dec 2020',
    summary: 'Contributed to cloud-native security tooling and container platform reliability improvements.',
    achievements: [
      'Developed a Kubernetes-based cloud security scanning application using Docker and Golang to improve container platform security and vulnerability assessment workflows',
      'Integrated automated security scanning workflows into CI/CD pipelines, improving vulnerability detection across deployment stages',
      'Diagnosed deployment and runtime issues to maintain reliable service availability',
      'Authored technical documentation for system onboarding and troubleshooting workflows',
    ],
    stack: ['Kubernetes', 'Docker', 'Golang', 'AKS', 'GKE', 'ArgoCD', 'CI/CD'],
  },
]

function Experience() {
  return (
    <section id="experience" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Experience</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {experiences.map((exp) => (
            <div key={exp.title}>

              {/* Title + period */}
              <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.15rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{exp.title}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· {exp.company}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{exp.period}</span>
              </div>

              {/* Location */}
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem', opacity: 0.7 }}>{exp.location}</p>

              {/* One-line summary */}
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 0.625rem', fontStyle: 'italic' }}>{exp.summary}</p>

              {/* Bullets */}
              <ul style={{ margin: '0 0 0.75rem', padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.375rem', listStyleType: 'disc' }}>
                {exp.achievements.map((a, idx) => (
                  <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{a}</li>
                ))}
              </ul>

              {/* Tech stack badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                {exp.stack.map((t) => (
                  <span key={t} style={{
                    fontSize: '0.68rem', fontWeight: 500,
                    color: 'var(--text-primary)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '9999px',
                    padding: '0.1rem 0.5rem',
                  }}>
                    {t}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
