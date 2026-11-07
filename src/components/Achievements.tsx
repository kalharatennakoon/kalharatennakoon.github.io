interface Honour {
  year: string
  title: string
  detail: string
}

const honours: Honour[] = [
  {
    year: '2026',
    title: 'Top 10 finalist, Ascentic AI Launch Pad',
    detail: 'Selected from more than 700 applicants. Presented VetCare One at Demo Day.',
  },
  {
    year: '2026',
    title: 'Batch Top, Software Engineering',
    detail: 'Ranked first in the Software Engineering cohort at ESU Kandy.',
  },
  {
    year: '2025',
    title: 'Dan Kohn Scholarship, KubeCon + CloudNativeCon Europe',
    detail: 'Second award, recognising contributions to the cloud-native ecosystem.',
  },
  {
    year: '2022',
    title: 'Dan Kohn Scholarship, KubeCon + CloudNativeCon Europe',
    detail: 'First award from the Cloud Native Computing Foundation.',
  },
  {
    year: '2019',
    title: 'First runner-up, Hack:Bit Hackathon',
    detail: 'A competition run with Microsoft and Sarvodaya Fusion.',
  },
  {
    year: '2018',
    title: 'Top 15 finalist, HaXmas Hackathon',
    detail: 'Selected from more than 75 competing teams.',
  },
  {
    year: '2018',
    title: 'National finalist, Cisco Packet Riders',
    detail: 'Cisco networking competition, national final.',
  },
  {
    year: '2017',
    title: 'Cisco NetRiders',
    detail: '4th in Sri Lanka and 118th across Asia Pacific and Japan.',
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Honours</h2>
          <p className="section-lede">
            Awards and competitions, most recent first.
          </p>
        </div>

        <ol className="border-t border-rule">
          {honours.map((h) => (
            <li key={h.title + h.year} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4 border-b border-rule py-4 sm:grid-cols-[6rem_minmax(0,1fr)] sm:gap-10">
              <span className="pt-[1px] text-[0.9375rem] tabular-nums text-muted">{h.year}</span>
              <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
                <p className="font-medium text-ink">{h.title}</p>
                <p className="text-[0.9375rem] text-muted">{h.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Achievements
