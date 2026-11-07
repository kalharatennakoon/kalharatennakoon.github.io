import { useState, useMemo } from 'react'
import { FaAward, FaExternalLinkAlt, FaCheckCircle } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

interface Cert {
  title: string
  issuer: string
  date: string
  credentialUrl: string
  badgeImage?: string
  group: 'cloud-devops' | 'ai-data' | 'cybersecurity'
}

const certificationsList: Cert[] = [
  // Cloud & DevOps
  {
    title: 'Containers & Kubernetes Essentials',
    issuer: 'IBM',
    date: 'Feb 2025',
    credentialUrl: 'https://www.credly.com/earner/earned/badge/cd6d6b21-8e27-4980-b51d-d97f011ed11d',
    badgeImage: 'https://images.credly.com/size/340x340/images/82966826-6630-4768-80d4-6028b3fab414/image.png',
    group: 'cloud-devops',
  },
  {
    title: 'GitHub Foundations',
    issuer: 'GitHub',
    date: 'Jan 2025',
    credentialUrl: 'https://www.credly.com/badges/91239f31-74c8-4175-93a0-0855efb3c46e/public_url',
    badgeImage: 'https://images.credly.com/size/340x340/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png',
    group: 'cloud-devops',
  },
  {
    title: 'Cloud DevOps',
    issuer: 'Intel',
    date: 'Jan 2025',
    credentialUrl: 'https://www.credly.com/earner/earned/badge/41940219-ee87-4c5d-9fce-f6f8d55370ac',
    badgeImage: 'https://images.credly.com/size/340x340/images/f953f0f3-d130-4d6d-8d5d-62d8b24eee9b/image.png',
    group: 'cloud-devops',
  },
  {
    title: 'Introduction to Kubernetes',
    issuer: 'The Linux Foundation',
    date: 'Dec 2024',
    credentialUrl: 'https://ti-user-certificates.s3.amazonaws.com/e0df7fbf-a057-42af-8a1f-590912be5460/ff96589e-6699-4b22-847c-d9ec38812b30-t-m-kalhara-tennakoon-5b479bc0-2836-48c1-8abc-35ad7de91aa7-certificate.pdf',
    group: 'cloud-devops',
  },
  {
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft',
    date: 'Jan 2023',
    credentialUrl: 'https://www.credly.com/badges/1cd00bda-ffc7-467f-83a9-c8f7c9702be7/public_url',
    badgeImage: 'https://images.credly.com/size/340x340/images/be8fcaeb-c769-4858-b567-ffaaa73ce8cf/image.png',
    group: 'cloud-devops',
  },
  {
    title: 'Getting Started with GKE',
    issuer: 'Google Cloud',
    date: 'Jul 2020',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/records/KHP2Z9NZ9FY7',
    group: 'cloud-devops',
  },

  // AI & Data
  {
    title: 'AI Technical Practitioner',
    issuer: 'Cisco',
    date: 'Mar 2026',
    credentialUrl: 'https://www.credly.com/earner/earned/badge/9b00b8b8-743c-4a8e-b835-1fe68df201c4',
    badgeImage: 'https://images.credly.com/size/340x340/images/cd953e3c-7106-4547-ac48-2af013959760/blob',
    group: 'ai-data',
  },
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    date: 'Feb 2026',
    credentialUrl: 'https://www.coursera.org/account/accomplishments/specialization/X5H7V3FBA2ZC',
    group: 'ai-data',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Jun 2025',
    credentialUrl: 'https://www.credly.com/earner/earned/badge/a5b815dd-e21b-4841-86a6-d3948a44dfe9',
    badgeImage: 'https://images.credly.com/size/340x340/images/82b908e1-fdcd-4785-9d32-97f11ccbcf08/image.png',
    group: 'ai-data',
  },
  {
    title: 'Azure Data Fundamentals (DP-900)',
    issuer: 'Microsoft',
    date: 'Nov 2024',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/38133387373C82E1?sharingId=87BD701455AA18AA',
    group: 'ai-data',
  },
  {
    title: 'Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    date: 'Apr 2024',
    credentialUrl: 'https://learn.microsoft.com/api/credentials/share/en-gb/TMKRBTennakoon/1C53DDEE0DB410A4?sharingId=87BD701455AA18AA',
    group: 'ai-data',
  },

  // Cybersecurity
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM',
    date: 'Jun 2025',
    credentialUrl: 'https://www.credly.com/earner/earned/badge/e25e75f5-2d41-416c-b383-86f5fec810b9',
    badgeImage: 'https://images.credly.com/size/340x340/images/50b96632-6cbb-40b7-ac0e-b83f49ff7f94/image.png',
    group: 'cybersecurity',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    date: 'Apr 2020',
    credentialUrl: 'https://www.credly.com/badges/9061852c-fdf7-4219-926b-523d30a31111',
    badgeImage: 'https://images.credly.com/size/340x340/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png',
    group: 'cybersecurity',
  },
]

type CertFilter = 'all' | 'cloud-devops' | 'ai-data' | 'cybersecurity'

export function Certifications() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)
  const [activeFilter, setActiveFilter] = useState<CertFilter>('all')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return certificationsList
    return certificationsList.filter((c) => c.group === activeFilter)
  }, [activeFilter])

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaAward className="text-xs" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Certifications
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Industry-recognized credentials validating expertise across Kubernetes, cloud architectures, AI, and cybersecurity.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => {
                soundFx.tab()
                setActiveFilter('all')
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              All Certifications ({certificationsList.length})
            </button>
            <button
              onClick={() => {
                soundFx.tab()
                setActiveFilter('cloud-devops')
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'cloud-devops'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              Cloud & DevOps (6)
            </button>
            <button
              onClick={() => {
                soundFx.tab()
                setActiveFilter('ai-data')
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'ai-data'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              AI & Data (5)
            </button>
            <button
              onClick={() => {
                soundFx.tab()
                setActiveFilter('cybersecurity')
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeFilter === 'cybersecurity'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              Cybersecurity (2)
            </button>
          </div>
        </div>

        {/* Credentials Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {filtered.map((cert) => (
            <div
              key={cert.title + cert.issuer}
              className="bento-card p-5 flex flex-col justify-between shimmer-hover group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  {cert.badgeImage ? (
                    <img
                      src={cert.badgeImage}
                      alt={cert.title}
                      className="w-12 h-12 object-contain rounded-xl p-1 bg-white/5 border border-white/10"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-lg">
                      <FaAward />
                    </div>
                  )}

                  <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1 leading-snug">
                  {cert.title}
                </h3>
                <div className="text-xs font-semibold text-sky-400 mb-3">
                  {cert.issuer}
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                  <FaCheckCircle className="text-xs" />
                  Verified Credential
                </span>

                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.click()}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Verify</span>
                  <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Certifications
