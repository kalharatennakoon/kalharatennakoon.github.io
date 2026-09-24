const selectedArticles = [
  {
    title: 'Building, Dockerizing, and Deploying a CRUD API in Go on Kubernetes',
    venue: 'Level Up Coding',
    date: 'Apr 2025',
    url: 'https://levelup.gitconnected.com/building-dockerizing-and-deploying-a-crud-api-in-go-on-kubernetes-9c25b01ad2e8',
  },
  {
    title: 'Getting Started with Tekton Pipelines: A Beginner\'s Guide to CI/CD on Kubernetes',
    venue: 'Level Up Coding',
    date: 'Aug 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
  },
  {
    title: 'Getting Started with CronJobs in Kubernetes',
    venue: 'FAUN.dev',
    date: 'Dec 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
  },
]

function Activities() {
  return (
    <section id="activities" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Technical Writing & Outreach</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Medium */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Technical Writer</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· Medium</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Dec 2021 – Present</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.625rem' }}>
              Authored 50+ technical articles on DevOps, cloud-native technologies, and software engineering, reaching 150K+ views.
            </p>
            <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 0.4rem' }}>
              Selected Articles
            </p>
            <ol style={{ margin: '0 0 0.5rem', padding: '0 0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {selectedArticles.map((article) => (
                <li key={article.url} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 500 }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
                  >
                    {article.title}
                  </a>
                  {' '}· <span style={{ fontStyle: 'italic' }}>{article.venue}</span>, {article.date}
                </li>
              ))}
            </ol>
            <a
              href="https://kalharatennakoon.medium.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              All articles on Medium →
            </a>
          </div>

          {/* STEMUp */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Volunteer</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· STEMUp Educational Foundation</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Aug 2018 – Dec 2020</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              Contributed to initiatives promoting STEM education and digital literacy among students and youth communities in Sri Lanka.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Activities
