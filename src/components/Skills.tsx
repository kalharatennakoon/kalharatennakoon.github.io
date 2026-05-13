const skillGroups = [
  {
    title: 'Programming & Backend',
    skills: ['Python', 'Golang', 'Java', 'JavaScript', 'Node.js', 'FastAPI', 'Flask', 'REST APIs', 'Bash / Shell'],
  },
  {
    title: 'Cloud & DevOps',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'Tekton', 'ArgoCD', 'Azure DevOps', 'CI/CD', 'Infrastructure as Code (IaC)'],
  },
  {
    title: 'Cloud Platforms',
    skills: ['Microsoft Azure', 'AWS', 'Google Cloud Platform', 'AKS', 'GKE', 'Rancher'],
  },
  {
    title: 'AI/ML & Data',
    skills: ['Scikit-learn', 'Pandas', 'Prophet', 'Machine Learning', 'Data Analysis', 'Jupyter Notebook', 'Power BI'],
  },
  {
    title: 'Frontend & Databases',
    skills: ['React', 'PostgreSQL', 'MongoDB', 'MySQL', 'HTML / CSS'],
  },
  {
    title: 'Tools & Collaboration',
    skills: ['Git', 'GitHub', 'Jira', 'Agile / Scrum', 'Technical Writing', 'Figma'],
  },
]

const currentlyExploring = ['MLOps', 'LLM Applications', 'AI Infrastructure', 'Agentic AI Systems', 'Cloud Security']

function Skills() {
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Section header */}
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Technical Expertise</h2>
        </div>

        {/* Skill groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {skillGroups.map((group) => (
            <div key={group.title} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
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

        {/* Currently Exploring */}
        <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <span style={{
              fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)',
              textTransform: 'uppercase', letterSpacing: '0.08em',
              whiteSpace: 'nowrap', minWidth: '9.5rem', paddingTop: '0.15rem',
            }}>
              Currently Exploring
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', flex: 1 }}>
              {currentlyExploring.map((item) => (
                <span key={item} style={{
                  fontSize: '0.72rem', fontWeight: 500,
                  color: 'var(--text-secondary)',
                  background: 'transparent',
                  border: '1px dashed var(--border-color)',
                  borderRadius: '9999px',
                  padding: '0.15rem 0.6rem',
                }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Skills
