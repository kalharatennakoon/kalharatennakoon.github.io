import { FaWrench } from 'react-icons/fa'

function Skills() {
  const skillCategories = [
    {
      title: 'DevOps & CI/CD',
      tags: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Tekton', 'ArgoCD', 'Azure DevOps', 'Pipeline Optimization'],
    },
    {
      title: 'Cloud Platforms & Orchestration',
      tags: ['Microsoft Azure', 'AWS', 'Google Cloud', 'AKS', 'GKE', 'AWS EKS', 'Rancher'],
    },
    {
      title: 'Programming & Languages',
      tags: ['Python', 'Golang', 'Java', 'C', 'Bash/Shell Scripting'],
    },
    {
      title: 'Web & Databases',
      tags: ['JavaScript', 'HTML/CSS', 'Node.js', 'Angular', 'Flask', 'REST API', 'React', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL Server'],
    },
    {
      title: 'Version Control & Agile',
      tags: ['Git', 'GitHub', 'Bitbucket', 'Agile', 'Scrum', 'Kanban', 'Jira', 'Confluence'],
    },
    {
      title: 'Networking',
      tags: ['TCP/IP', 'OSI Model', 'Load Balancing', 'DNS', 'Firewall', 'VPN', 'IPv4/IPv6'],
    },
    {
      title: 'Data Analytics',
      tags: ['Power BI', 'Jupyter Notebook', 'Google Colab', 'Data Cleaning', 'EDA'],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-[var(--bg-secondary)] relative dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
          Technical Expertise
        </h2>

        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <FaWrench className="text-2xl flex-shrink-0 text-[#667eea]" />
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            DevOps • Cloud-Native • Automation • Full-Stack • Data
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-[var(--card-bg)] p-6 rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(102,126,234,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(102,126,234,0.15)] transition-all duration-300"
            >
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-4 pb-3 border-b border-[var(--border-color)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex-shrink-0 inline-block"></span>
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-gradient-to-r from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)] rounded-full text-sm text-[var(--text-primary)] font-medium border border-[rgba(102,126,234,0.2)] hover:border-[rgba(102,126,234,0.5)] hover:from-[rgba(102,126,234,0.18)] hover:to-[rgba(118,75,162,0.18)] transition-all cursor-default"
                  >
                    {tag}
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
