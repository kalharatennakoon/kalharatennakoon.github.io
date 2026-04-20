const achievements = [
  {
    title: 'Dan Kohn Scholarship – KubeCon + CloudNativeCon',
    description: 'Awarded the CNCF Dan Kohn Scholarship to attend KubeCon + CloudNativeCon. Recognised for contributions and potential in the cloud-native ecosystem.',
    date: '2025 & 2022',
  },
  {
    title: 'First Runner-Up – Hack:Bit Hackathon',
    description: 'Secured First Runner-Up at the Hack:Bit national-level hackathon, competing against university and school teams across Sri Lanka.',
    date: 'Jul 2019',
  },
  {
    title: 'Top 15 Finalist – HaXmas Hackathon',
    description: 'Selected as one of the Top 15 finalists at the HaXmas Hackathon, a competitive coding and innovation challenge.',
    date: 'Jan 2018',
  },
  {
    title: 'Finalist – Cisco Packet Riders',
    description: 'Reached the national final of Cisco Packet Riders, a networking and troubleshooting competition open to students across Sri Lanka.',
    date: 'Jul 2018',
  },
  {
    title: '4th in Sri Lanka & 118th in Asia Pacific – Cisco NetRiders',
    description: 'Ranked 4th in Sri Lanka and 118th in Asia Pacific at the Cisco NetRiders competition.',
    date: 'Sep 2017',
  },
]

function Achievements() {
  return (
    <section id="achievements" style={{ background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Achievements</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {achievements.map((item) => (
            <div key={item.title}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.date}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements
