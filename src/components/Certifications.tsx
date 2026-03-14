import { FaAward } from 'react-icons/fa'

interface Cert {
  title: string
  issuer: string
  date: string
  credentialUrl: string
}

const certGroups: { group: string; items: Cert[] }[] = [
  {
    group: 'Cloud & DevOps',
    items: [
      {
        title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        issuer: 'Microsoft',
        date: 'Jan 2023',
        credentialUrl: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url',
      },
      {
        title: 'Getting Started with Google Kubernetes Engine',
        issuer: 'Google Cloud / Coursera',
        date: 'Jul 2020',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7',
      },
      {
        title: 'Introduction to Kubernetes',
        issuer: 'The Linux Foundation',
        date: 'May 2022',
        credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf',
      },
      {
        title: 'Introduction to GitOps',
        issuer: 'The Linux Foundation',
        date: 'May 2022',
        credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/26a061f2-539e-41a7-9e6a-8ee41a2d21ca-t-m-kalhara-randil-bandara-tennakoon-d03dccea-4781-4578-9d2c-de8fa9c0f7db-certificate.pdf',
      },
      {
        title: 'GitHub Foundations',
        issuer: 'GitHub',
        date: 'Jan 2025',
        credentialUrl: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url',
      },
    ],
  },
  {
    group: 'AI & Data',
    items: [
      {
        title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
        issuer: 'Microsoft',
        date: 'Apr 2024',
        credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA',
      },
      {
        title: 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
        issuer: 'Microsoft',
        date: 'Nov 2024',
        credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA',
      },
      {
        title: 'Career Essentials in Generative AI',
        issuer: 'Microsoft & LinkedIn',
        date: 'Jul 2023',
        credentialUrl: 'https://www.linkedin.com/learning/certificates/3df7542a5c778a0e3e180571caf85ba59fb4a1afddbf58ea438e2e1badf72d80',
      },
      {
        title: 'Gemini Certified Educator',
        issuer: 'Google for Education',
        date: '2024',
        credentialUrl: 'https://edu.google.accredible.com/ae8c5710-9e25-4048-82d5-8e2f15288978',
      },
      {
        title: 'Gemini Certified University Student',
        issuer: 'Google for Education',
        date: '2024',
        credentialUrl: 'https://edu.google.accredible.com/fd37035c-4b98-4d55-a083-80fbb8a7ad57',
      },
    ],
  },
  {
    group: 'Cybersecurity & Software Dev',
    items: [
      {
        title: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        date: '2023',
        credentialUrl: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111',
      },
      {
        title: 'Career Essentials in Cybersecurity',
        issuer: 'Microsoft & LinkedIn',
        date: 'Feb 2024',
        credentialUrl: 'https://www.linkedin.com/learning/certificates/',
      },
      {
        title: 'Career Essentials in Software Development',
        issuer: 'Microsoft & LinkedIn',
        date: 'Aug 2023',
        credentialUrl: 'https://www.linkedin.com/learning/certificates/',
      },
      {
        title: 'AWS Fundamentals: Going Cloud-Native',
        issuer: 'AWS / Coursera',
        date: '2022',
        credentialUrl: 'https://coursera.org/share/a527b8fa5b14962328c02a3c3e8b54f9',
      },
    ],
  },
]

function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Certifications
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <FaAward className="text-2xl flex-shrink-0 text-[#667eea]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Cloud Platforms • AI & Data • Cybersecurity • Software Development
          </p>
        </div>

        <div className="space-y-10 max-w-5xl mx-auto">
          {certGroups.map(({ group, items }) => (
            <div key={group}>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4 pb-2 border-b-2 border-[rgba(102,126,234,0.25)] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] inline-block flex-shrink-0"></span>
                {group}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((cert) => (
                  <div
                    key={cert.title}
                    className="group bg-[var(--card-bg)] p-6 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all duration-300 border-l-4 border-[#667eea] hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(102,126,234,0.2)] relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(102,126,234,0.03)] to-[rgba(118,75,162,0.03)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <h4 className="text-base mb-2 text-[var(--text-primary)] font-semibold leading-snug relative z-10">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-[#667eea] font-medium mb-1 relative z-10">{cert.issuer}</p>
                    <p className="text-xs text-[var(--text-secondary)] mb-3 relative z-10">{cert.date}</p>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#667eea] font-semibold text-sm transition-all hover:text-[#764ba2] group-hover:gap-2 relative z-10"
                    >
                      View Credential →
                    </a>
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
