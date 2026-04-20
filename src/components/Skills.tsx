const skillCategories = [
  {
    title: 'DevOps & CI/CD',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'ArgoCD', 'Jenkins', 'Azure DevOps', 'Tekton'],
  },
  {
    title: 'Cloud Platforms',
    skills: ['Microsoft Azure', 'AWS', 'Google Cloud', 'AKS', 'GKE', 'AWS EKS', 'Rancher'],
  },
  {
    title: 'Programming & Languages',
    skills: ['Python', 'Golang', 'Bash / Shell', 'Java', 'C'],
  },
  {
    title: 'Web & Databases',
    skills: ['JavaScript', 'React', 'Node.js', 'Angular', 'Flask', 'HTML / CSS', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Version Control & Agile',
    skills: ['Git', 'GitHub', 'Bitbucket', 'Jira', 'Confluence', 'Scrum', 'Kanban'],
  },
  {
    title: 'Networking',
    skills: ['TCP/IP', 'DNS', 'Load Balancing', 'Firewall', 'VPN', 'OSI Model'],
  },
  {
    title: 'Data Analytics',
    skills: ['Power BI', 'Jupyter', 'Google Colab', 'Data Cleaning', 'EDA'],
  },
]

function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Technical Skills</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skillCategories.map((cat) => (
            <div key={cat.title} style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap', minWidth: '10rem' }}>{cat.title}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {cat.skills.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
