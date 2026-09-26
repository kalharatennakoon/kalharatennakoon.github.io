const certGroups = [
  {
    category: 'Cloud, DevOps & Platform Engineering',
    certs: [
      { title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: 'Jan 2023' },
      { title: 'Introduction to Kubernetes', issuer: 'The Linux Foundation', date: 'Dec 2024' },
      { title: 'GitHub Foundations', issuer: 'GitHub', date: 'Jan 2025' },
      { title: 'Containers & Kubernetes Essentials', issuer: 'IBM', date: 'Feb 2025' },
    ],
  },
  {
    category: 'Artificial Intelligence & Data',
    certs: [
      { title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: 'Apr 2024' },
      { title: 'Microsoft Certified: Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', date: 'Nov 2024' },
      { title: 'Google AI Professional Certificate', issuer: 'Google (Coursera)', date: 'Feb 2026' },
    ],
  },
]

function Certifications() {
  return (
    <section id="certifications" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Certifications</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {certGroups.map((group) => (
            <div key={group.category}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>
                {group.category}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {group.certs.map((cert) => (
                  <div key={cert.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                        {cert.title}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>· {cert.issuer}</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Certifications
