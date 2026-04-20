import { FaStackOverflow } from 'react-icons/fa'

const activities = [
  {
    title: 'Medium – Technical Writer',
    role: 'Technical Author',
    period: 'Dec 2021 – Present',
    description: 'Write in-depth technical articles on DevOps, cloud-native technologies, Kubernetes, CI/CD, and software engineering. Content reaches a global audience of developers and engineers.',
    stats: '50+ Articles · 150,000+ Total Views',
  },
  {
    title: 'STEMUp Educational Foundation',
    role: 'Volunteer',
    period: 'Aug 2018 – Dec 2020',
    description: 'Contributed to STEM outreach initiatives, assisting in workshops and educational events aimed at improving access to quality science and technology education for underprivileged students in Sri Lanka.',
  },
  {
    title: 'Stack Overflow',
    role: 'Contributor',
    period: 'Apr 2020 – Present',
    description: 'Active member of the Stack Overflow developer community, contributing answers and engaging with questions across DevOps, cloud, and software engineering topics.',
    link: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon',
  },
]

function Activities() {
  return (
    <section id="activities" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Activities & Volunteering</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {activities.map((act) => (
            <div key={act.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{act.title}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· {act.role}</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{act.period}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.375rem' }}>{act.description}</p>
              {act.stats && (
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0 0 0.25rem', opacity: 0.7 }}>{act.stats}</p>
              )}
              {act.link && (
                <a
                  href={act.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  <FaStackOverflow size={11} /> View Profile
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Activities
