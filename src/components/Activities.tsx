import { FaStackOverflow, FaMedium } from 'react-icons/fa'

const featuredArticles = [
  {
    title: 'Getting Started with CronJobs in Kubernetes',
    excerpt: 'A practical guide to scheduling and automating workloads using Kubernetes CronJobs, with real-world examples and best practices.',
    date: 'Dec 2021',
    url: 'https://faun.pub/getting-started-with-cronjobs-in-kubernetes-d3cfce10fd9b',
    tags: ['Kubernetes', 'DevOps', 'Automation'],
    image: 'https://miro.medium.com/1*lSbm5so0zwaSZFwh0BlXfg.jpeg',
  },
  {
    title: 'Getting Started with Tekton Pipelines: A Beginner\'s Guide to CI/CD on Kubernetes',
    excerpt: 'Learn how to build cloud-native CI/CD pipelines with Tekton on Kubernetes — from Tasks and Pipelines to running your first workflow.',
    date: 'Aug 2024',
    url: 'https://levelup.gitconnected.com/getting-started-with-tekton-pipelines-a-beginners-guide-to-ci-cd-on-kubernetes-afd21e98b9fe',
    tags: ['Tekton', 'CI/CD', 'Kubernetes'],
    image: 'https://miro.medium.com/1*sw4RrWUIoLyCq9UXIQdZsQ.jpeg',
  },
  {
    title: 'Building, Dockerizing, and Deploying a CRUD API in Go on Kubernetes',
    excerpt: 'A comprehensive guide to containerizing a Go application and running it on Minikube.',
    date: 'Apr 2025',
    url: 'https://levelup.gitconnected.com/building-dockerizing-and-deploying-a-crud-api-in-go-on-kubernetes-9c25b01ad2e8',
    tags: ['Golang', 'Docker', 'Kubernetes'],
    image: 'https://cdn-images-1.medium.com/max/2600/1*BD4MIh6X3pcdtek0v16YPA.jpeg',
  },
]

const community = [
  {
    icon: <FaStackOverflow size={13} />,
    name: 'Stack Overflow',
    role: 'Contributor',
    period: 'Apr 2020 – Present',
    description: 'Active contributor across DevOps, cloud, and software engineering topics.',
    link: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon',
    linkLabel: 'View Profile',
  },
]

function Activities() {
  return (
    <section id="activities" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Writing & Community</h2>
        </div>

        {/* Medium stats row */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaMedium size={14} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>Technical Writer · Medium</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Dec 2021 – Present</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.375rem' }}>
            Published 50+ articles on Kubernetes, DevOps, cloud-native engineering, and software development. Content has reached a global audience of engineers and developers.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, opacity: 0.8 }}>50+ Articles · 150,000+ Total Views</p>
        </div>

        {/* Featured articles */}
        <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '1rem 0 0.625rem' }}>
          Featured Articles
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.875rem' }}>
          {featuredArticles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start', textDecoration: 'none' }}
            >
              {/* Thumbnail */}
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '72px', height: '52px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0, border: '1px solid var(--border-color)' }}
              />
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 0.25rem', lineHeight: 1.4 }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = 'none' }}
                >
                  {article.title}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center' }}>
                  {article.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: '0.62rem', fontWeight: 500, color: 'var(--text-secondary)', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.05rem 0.45rem' }}>{tag}</span>
                  ))}
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', opacity: 0.7, marginLeft: '0.25rem' }}>{article.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* View all link */}
        <a
          href="https://kalharatennakoon.medium.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '1.75rem' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          <FaMedium size={11} /> View all articles on Medium →
        </a>

        {/* Community */}
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
          <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)', margin: '0 0 0.75rem' }}>
            Community
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {community.map((item) => (
              <div key={item.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>· {item.role}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.period}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 0.3rem' }}>{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                  {item.icon} {item.linkLabel}
                </a>
              </div>
            ))}

            {/* STEMUp */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '0.2rem' }}>
                <div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>STEMUp Educational Foundation</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '0.4rem' }}>· Volunteer</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>Aug 2018 – Dec 2020</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                Contributed to STEM outreach initiatives, assisting in workshops and educational events to improve access to science and technology education for students in Sri Lanka.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Activities
