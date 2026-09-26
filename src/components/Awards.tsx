const awards = [
  {
    title: 'Top 10 Finalist – Ascentic AI Launch Pad',
    date: '2026',
    description: 'Selected for the Top 10 of the Ascentic AI Launch Pad programme and invited to present VetCare Pro at Demo Day. VetCare Pro is an on-premise, AI-powered veterinary clinic management system. It was recognised for its local RAG assistant, ML forecasting models and companion iOS app, all built for a real working clinic.',
  },
  {
    title: 'Batch Top – Software Engineering, ESU Kandy',
    date: '2026',
    description: 'Ranked first in the Software Engineering cohort of the BSc (Hons) Computer Science programme.',
  },
  {
    title: 'Two-Time Dan Kohn Scholarship Recipient – KubeCon + CloudNativeCon Europe',
    date: '2022 & 2025',
    description: 'Awarded the highly competitive scholarship recognising contributions to the cloud-native ecosystem.',
  },
  {
    title: 'First Runner-Up – Hack:Bit Hackathon',
    date: '2019',
    description: 'Secured 2nd place in a competition organised in collaboration with Microsoft and Sarvodaya Fusion.',
  },
  {
    title: 'Top 15 Finalist – HaXmas Hackathon',
    date: '2018',
    description: 'Selected among 75+ competing teams in a national-level hackathon.',
  },
  {
    title: 'Finalist – Cisco Packet Riders',
    date: '2018',
    description: 'Reached the national final of a networking and troubleshooting competition open to students across Sri Lanka.',
  },
  {
    title: 'Cisco NetRiders',
    date: '2017',
    description: 'Ranked 4th in Sri Lanka and 118th in the Asia Pacific & Japan region.',
  },
]

function Awards() {
  return (
    <section id="awards" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Honours & Awards</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {awards.map((item) => (
            <div key={item.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: item.description ? '0.2rem' : 0 }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
              {item.description && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{item.description}</p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Awards
