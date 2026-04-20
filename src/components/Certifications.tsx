
const certs = [
  { title: 'Containers & Kubernetes Essentials', issuer: 'IBM', date: 'Feb 2025', credentialUrl: 'https://www.credly.com/earner/earned/badge/cd6d6b21-8e27-4980-b51d-d97f011ed11d' },
  { title: 'GitHub Foundations', issuer: 'GitHub', date: 'Jan 2025', credentialUrl: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url' },
  { title: 'Cloud DevOps', issuer: 'Intel', date: 'Jan 2025', credentialUrl: 'https://www.credly.com/earner/earned/badge/41940219-ee87-4c5d-9fce-f6f8d55370ac' },
  { title: 'Introduction to Kubernetes', issuer: 'The Linux Foundation', date: 'Dec 2024', credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf' },
  { title: 'Microsoft Certified: Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: 'Jan 2023', credentialUrl: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url' },
  { title: 'Getting Started with Google Kubernetes Engine', issuer: 'Google Cloud (Coursera)', date: 'Jul 2020', credentialUrl: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7' },
  { title: 'Cisco AI Technical Practitioner', issuer: 'Cisco', date: 'Mar 2026', credentialUrl: 'https://www.credly.com/earner/earned/badge/9b00b8b8-743c-4a8e-b835-1fe68df201c4' },
  { title: 'Google AI Professional Certificate', issuer: 'Google (Coursera)', date: 'Feb 2026', credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/X5H7V3FBA2ZC' },
  { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild', date: 'Jun 2025', credentialUrl: 'https://www.credly.com/earner/earned/badge/a5b815dd-e21b-4841-86a6-d3948a44dfe9' },
  { title: 'Microsoft Certified: Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', date: 'Nov 2024', credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA' },
  { title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: 'Apr 2024', credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA' },
  { title: 'Cybersecurity Fundamentals', issuer: 'IBM', date: 'Jun 2025', credentialUrl: 'https://www.credly.com/earner/earned/badge/e25e75f5-2d41-416c-b383-86f5fec810b9' },
  { title: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Apr 2020', credentialUrl: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111' },
]

function Certifications() {
  return (
    <section id="certifications" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Certifications</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {certs.map((cert) => (
            <div key={cert.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', flex: 1, minWidth: 0 }}>
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500, textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
                >{cert.title}</a>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>· {cert.issuer}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', flexShrink: 0 }}>{cert.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
