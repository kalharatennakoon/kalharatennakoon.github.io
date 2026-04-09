import { FaAward, FaExternalLinkAlt } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'

interface Cert {
  title: string
  issuer: string
  date: string
  credentialUrl: string
  badgeImage?: string
}

const certGroups: { group: string; items: Cert[] }[] = [
  {
    group: 'Cloud & DevOps',
    items: [
      {
        title: 'Containers & Kubernetes Essentials',
        issuer: 'IBM',
        date: 'Feb 2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/cd6d6b21-8e27-4980-b51d-d97f011ed11d',
        badgeImage: 'https://images.credly.com/size/340x340/images/82966826-6630-4768-80d4-6028b3fab414/image.png',
      },
      {
        title: 'GitHub Foundations',
        issuer: 'GitHub',
        date: 'Jan 2025',
        credentialUrl: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url',
        badgeImage: 'https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
      },
      {
        title: 'Cloud DevOps',
        issuer: 'Intel',
        date: 'Jan 2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/41940219-ee87-4c5d-9fce-f6f8d55370ac',
        badgeImage: 'https://images.credly.com/size/340x340/images/f953f0f3-d130-4d6d-8d5d-62d8b24eee9b/image.png',
      },
      {
        title: 'Introduction to Kubernetes',
        issuer: 'The Linux Foundation',
        date: 'Dec 2024',
        credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf',
      },
      {
        title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
        issuer: 'Microsoft',
        date: 'Jan 2023',
        credentialUrl: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url',
        badgeImage: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
      },
      {
        title: 'Getting Started with Google Kubernetes Engine',
        issuer: 'Google Cloud (Coursera)',
        date: 'Jul 2020',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7',
      },
    ],
  },
  {
    group: 'AI & Data',
    items: [
      {
        title: 'Cisco AI Technical Practitioner',
        issuer: 'Cisco',
        date: 'Mar 2026',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/9b00b8b8-743c-4a8e-b835-1fe68df201c4',
        badgeImage: 'https://images.credly.com/size/340x340/images/cd953e3c-7106-4547-ac48-2af013959760/blob',
      },
      {
        title: 'Google AI Professional Certificate',
        issuer: 'Google (Coursera)',
        date: 'Feb 2026',
        credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/X5H7V3FBA2ZC',
      },
      {
        title: 'Artificial Intelligence Fundamentals',
        issuer: 'IBM SkillsBuild',
        date: 'Jun 2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/a5b815dd-e21b-4841-86a6-d3948a44dfe9',
        badgeImage: 'https://images.credly.com/size/340x340/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png',
      },
      {
        title: 'Microsoft Certified: Azure Data Fundamentals (DP-900)',
        issuer: 'Microsoft',
        date: 'Nov 2024',
        credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA',
      },
      {
        title: 'Microsoft Certified: Azure AI Fundamentals (AI-900)',
        issuer: 'Microsoft',
        date: 'Apr 2024',
        credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA',
      },
    ],
  },
  {
    group: 'Cybersecurity',
    items: [
      {
        title: 'Cybersecurity Fundamentals',
        issuer: 'IBM',
        date: 'Jun 2025',
        credentialUrl: 'https://www.credly.com/earner/earned/badge/e25e75f5-2d41-416c-b383-86f5fec810b9',
        badgeImage: 'https://images.credly.com/size/340x340/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png',
      },
      {
        title: 'Introduction to Cybersecurity',
        issuer: 'Cisco',
        date: 'Apr 2020',
        credentialUrl: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111',
        badgeImage: 'https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
      },
    ],
  },
]

function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [bodyRef, bodyVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="certifications" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden dark:bg-[var(--bg-primary)]">

      {/* Background blob */}
      <div
        className="blob-shape w-[450px] h-[450px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.1), transparent)',
          top: '-130px',
          left: '-100px',
          animationDuration: '18s',
          animationDelay: '-4s',
        }}
      />

      <div className="max-w-5xl mx-auto px-8 relative z-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaAward className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Certifications
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        <div ref={bodyRef} className="space-y-10">
          {certGroups.map(({ group, items }, groupIdx) => (
            <div
              key={group}
              className={`reveal ${bodyVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: bodyVisible ? `${groupIdx * 0.15}s` : '0s' }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] bg-[rgba(30,58,138,0.08)] px-3 py-1 rounded-full border border-[rgba(30,58,138,0.2)]">
                  {group}
                </span>
                <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(30,58,138,0.3), transparent)' }} />
              </div>

              {/* Cert rows */}
              <div className="space-y-3">
                {items.map((cert, certIdx) => (
                  <div
                    key={cert.title}
                    className={`reveal-scale shimmer-hover ${bodyVisible ? 'is-visible' : ''}`}
                    style={{ transitionDelay: bodyVisible ? `${groupIdx * 0.15 + certIdx * 0.07}s` : '0s' }}
                  >
                    <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(30,58,138,0.12)] overflow-hidden">
                      {/* Badge */}
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[rgba(30,58,138,0.1)] to-[rgba(6,182,212,0.08)] flex items-center justify-center flex-shrink-0 overflow-hidden border border-[rgba(30,58,138,0.1)]">
                        {cert.badgeImage ? (
                          <img src={cert.badgeImage} alt={cert.title} className="w-full h-full object-contain p-0.5" />
                        ) : (
                          <FaAward className="text-base text-[var(--color-primary)]" />
                        )}
                      </div>

                      {/* Title + issuer */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug m-0">{cert.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] m-0 mt-0.5">{cert.issuer}</p>
                      </div>

                      {/* Date + button */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs font-medium text-[var(--color-primary)] bg-[rgba(30,58,138,0.08)] px-2.5 py-1 rounded-full whitespace-nowrap border border-[rgba(30,58,138,0.15)]">
                          {cert.date}
                        </span>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-white hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(30,58,138,0.35)] transition-all duration-200 whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                        >
                          <FaExternalLinkAlt className="text-[10px]" /> View
                        </a>
                      </div>
                    </div>
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
