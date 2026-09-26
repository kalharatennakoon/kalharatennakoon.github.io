const skillGroups = [
  {
    title: 'Programming',
    skills: ['Python', 'Java', 'Golang', 'JavaScript', 'C', 'Bash / Shell'],
  },
  {
    title: 'Data & AI',
    skills: ['Scikit-learn', 'Pandas', 'Prophet', 'pgvector', 'Ollama', 'SPSS', 'Matplotlib', 'Seaborn', 'Jupyter Notebook', 'Google Colab', 'Power BI', 'Data Cleaning', 'EDA'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'Kubernetes', 'Tekton', 'ArgoCD', 'GitHub Actions', 'Azure DevOps', 'CI/CD', 'Infrastructure as Code (IaC)'],
  },
  {
    title: 'Cloud Platforms',
    skills: ['Microsoft Azure', 'AWS', 'Google Cloud Platform', 'AKS', 'GKE', 'Rancher'],
  },
  {
    title: 'Web & Databases',
    skills: ['React', 'Node.js', 'Flask', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MySQL', 'MongoDB'],
  },
  {
    title: 'Networking',
    skills: ['TCP/IP', 'DNS', 'Load Balancing', 'Firewalls', 'VPN', 'OSI Model'],
  },
  {
    title: 'Tools & Practices',
    skills: ['Git', 'GitHub', 'Agile', 'Scrum', 'Jira', 'Technical Documentation'],
  },
]

function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Technical Skills</h2>
        </div>

        {/* Skill groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {skillGroups.map((group) => (
            <div key={group.title} className="flex flex-col sm:flex-row" style={{ gap: '0.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                whiteSpace: 'nowrap', minWidth: '9.5rem', paddingTop: '0.15rem',
              }}>
                {group.title}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', flex: 1 }}>
                {group.skills.map((skill) => (
                  <span key={skill} style={{
                    fontSize: '0.72rem', fontWeight: 500,
                    color: 'var(--text-primary)',
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '9999px',
                    padding: '0.15rem 0.6rem',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills
