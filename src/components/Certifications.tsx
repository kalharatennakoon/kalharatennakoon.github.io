import { FaExternalLinkAlt } from 'react-icons/fa'

interface Cert {
  title: string
  issuer: string
  date: string
  url: string
}

const groups: { label: string; certs: Cert[] }[] = [
  {
    label: 'Cloud and DevOps',
    certs: [
      { title: 'Containers & Kubernetes Essentials', issuer: 'IBM', date: 'Feb 2025', url: 'https://www.credly.com/earner/earned/badge/cd6d6b21-8e27-4980-b51d-d97f011ed11d' },
      { title: 'GitHub Foundations', issuer: 'GitHub', date: 'Jan 2025', url: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url' },
      { title: 'Cloud DevOps', issuer: 'Intel', date: 'Jan 2025', url: 'https://www.credly.com/earner/earned/badge/41940219-ee87-4c5d-9fce-f6f8d55370ac' },
      { title: 'Introduction to Kubernetes', issuer: 'The Linux Foundation', date: 'Dec 2024', url: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf' },
      { title: 'Azure Fundamentals (AZ-900)', issuer: 'Microsoft', date: 'Jan 2023', url: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url' },
      { title: 'Getting Started with GKE', issuer: 'Google Cloud', date: 'Jul 2020', url: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7' },
    ],
  },
  {
    label: 'AI and data',
    certs: [
      { title: 'AI Technical Practitioner', issuer: 'Cisco', date: 'Mar 2026', url: 'https://www.credly.com/earner/earned/badge/9b00b8b8-743c-4a8e-b835-1fe68df201c4' },
      { title: 'Google AI Professional Certificate', issuer: 'Google', date: 'Feb 2026', url: 'https://www.coursera.org/account/accomplishments/specialization/X5H7V3FBA2ZC' },
      { title: 'Artificial Intelligence Fundamentals', issuer: 'IBM SkillsBuild', date: 'Jun 2025', url: 'https://www.credly.com/earner/earned/badge/a5b815dd-e21b-4841-86a6-d3948a44dfe9' },
      { title: 'Azure Data Fundamentals (DP-900)', issuer: 'Microsoft', date: 'Nov 2024', url: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA' },
      { title: 'Azure AI Fundamentals (AI-900)', issuer: 'Microsoft', date: 'Apr 2024', url: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA' },
    ],
  },
  {
    label: 'Security',
    certs: [
      { title: 'Cybersecurity Fundamentals', issuer: 'IBM', date: 'Jun 2025', url: 'https://www.credly.com/earner/earned/badge/e25e75f5-2d41-416c-b383-86f5fec810b9' },
      { title: 'Introduction to Cybersecurity', issuer: 'Cisco', date: 'Apr 2020', url: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111' },
    ],
  },
]

const total = groups.reduce((n, g) => n + g.certs.length, 0)

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Certifications</h2>
          <p className="section-lede">
            {total} credentials from IBM, Microsoft, Google, Cisco, GitHub, Intel and the Linux
            Foundation. Each one links to its verification page.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {groups.map((g) => (
            <div key={g.label}>
              <h3 className="text-[0.9375rem] font-medium text-muted">{g.label}</h3>
              <ul className="mt-3 border-t border-rule">
                {g.certs.map((c) => (
                  <li key={c.title} className="border-b border-rule">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="block text-[0.9688rem] font-medium text-ink group-hover:text-accent transition-colors">
                          {c.title}
                        </span>
                        <span className="block text-[0.8125rem] text-muted">
                          {c.issuer}, {c.date}
                        </span>
                      </span>
                      <FaExternalLinkAlt
                        className="mt-1.5 shrink-0 text-[0.6875rem] text-faint group-hover:text-accent transition-colors"
                        aria-label="Verify credential"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
