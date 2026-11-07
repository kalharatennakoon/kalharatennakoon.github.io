// Grouped as on the CV.
const groups: { label: string; items: string[] }[] = [
  { label: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'Go', 'C', 'Bash'] },
  {
    label: 'Software engineering',
    items: ['React', 'Node.js', 'Express', 'Flask', 'FastAPI', 'Next.js', 'REST APIs', 'JWT authentication'],
  },
  {
    label: 'AI and machine learning',
    items: ['Scikit-learn', 'Pandas', 'Prophet', 'pgvector', 'Ollama', 'RAG', 'Local LLMs', 'Feature engineering', 'Time-series forecasting'],
  },
  {
    label: 'Cloud and DevOps',
    items: ['Kubernetes', 'Docker', 'Tekton', 'Argo CD', 'Kustomize', 'GitHub Actions', 'Azure DevOps', 'Trivy', 'GitOps', 'Infrastructure as Code', 'Container security'],
  },
  { label: 'Cloud platforms', items: ['Microsoft Azure', 'AWS', 'Google Cloud', 'AKS', 'GKE', 'Rancher'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Supabase'] },
  {
    label: 'Ways of working',
    items: ['Git and GitHub', 'Jira', 'Agile and Scrum', 'Automated testing', 'Technical documentation', 'AI-assisted engineering'],
  },
]

export function Skills() {
  return (
    <section id="skills" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Skills</h2>
          <p className="section-lede">
            The tools I've used in production work and shipped projects, grouped by where they fit.
          </p>
        </div>

        <dl className="border-t border-rule">
          {groups.map((g) => (
            <div key={g.label} className="grid gap-2 border-b border-rule py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
              <dt className="text-[0.9375rem] font-medium text-ink">{g.label}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Skills
