import { FaCode, FaCog, FaWrench, FaNetworkWired, FaCloud, FaAws, FaChartBar } from 'react-icons/fa'
import {
  SiDocker, SiKubernetes, SiJenkins, SiGithubactions, SiArgo,
  SiGooglecloud,
  SiPython, SiGo, SiGnubash,
  SiJavascript, SiHtml5, SiNodedotjs, SiAngular, SiFlask, SiReact,
  SiMysql, SiPostgresql, SiMongodb,
  SiGit, SiGithub, SiBitbucket, SiJira, SiConfluence,
  SiJupyter,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

interface Skill {
  name: string
  icon: IconType
  color: string
  level: number
}

interface Category {
  title: string
  icon: IconType
  skills: Skill[]
}

const skillCategories: Category[] = [
  {
    title: 'DevOps & CI/CD',
    icon: FaCog,
    skills: [
      { name: 'Docker',          icon: SiDocker,        color: '#2496ED', level: 90 },
      { name: 'Kubernetes',      icon: SiKubernetes,    color: '#326CE5', level: 80 },
      { name: 'GitHub Actions',  icon: SiGithubactions, color: '#2088FF', level: 65 },
      { name: 'ArgoCD',          icon: SiArgo,          color: '#EF7B4D', level: 65 },
      { name: 'Jenkins',         icon: SiJenkins,       color: '#D24939', level: 55 },
      { name: 'Azure DevOps',    icon: FaCloud,         color: '#0078D7', level: 65 },
      { name: 'Tekton',          icon: FaCog,           color: '#FD495C', level: 55 },
      { name: 'Pipeline Optim.', icon: FaWrench,        color: '#6B7280', level: 45 },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: FaCloud,
    skills: [
      { name: 'Microsoft Azure', icon: FaCloud,       color: '#0078D7', level: 65 },
      { name: 'AWS',             icon: FaAws,         color: '#FF9900', level: 35 },
      { name: 'Google Cloud',    icon: SiGooglecloud, color: '#4285F4', level: 35 },
      { name: 'AKS',             icon: SiKubernetes,  color: '#326CE5', level: 80 },
      { name: 'GKE',             icon: SiGooglecloud, color: '#4285F4', level: 40 },
      { name: 'AWS EKS',         icon: FaAws,         color: '#FF9900', level: 40 },
      { name: 'Rancher',         icon: FaCog,         color: '#0075A8', level: 65 },
    ],
  },
  {
    title: 'Programming & Languages',
    icon: FaCode,
    skills: [
      { name: 'Python',       icon: SiPython,  color: '#3776AB', level: 80 },
      { name: 'Golang',       icon: SiGo,      color: '#00ADD8', level: 65 },
      { name: 'Bash / Shell', icon: SiGnubash, color: '#4EAA25', level: 75 },
      { name: 'Java',         icon: FaCode,    color: '#007396', level: 70 },
      { name: 'C',            icon: FaCode,    color: '#A8B9CC', level: 65 },
    ],
  },
  {
    title: 'Web & Databases',
    icon: SiReact,
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 75 },
      { name: 'React',      icon: SiReact,      color: '#61DAFB', level: 65 },
      { name: 'Node.js',    icon: SiNodedotjs,  color: '#339933', level: 65 },
      { name: 'Angular',    icon: SiAngular,    color: '#DD0031', level: 40 },
      { name: 'Flask',      icon: SiFlask,      color: '#6B7280', level: 65 },
      { name: 'HTML / CSS', icon: SiHtml5,      color: '#E34F26', level: 80 },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791', level: 70 },
      { name: 'MySQL',      icon: SiMysql,      color: '#4479A1', level: 70 },
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248', level: 40 },
    ],
  },
  {
    title: 'Version Control & Agile',
    icon: SiGit,
    skills: [
      { name: 'Git',        icon: SiGit,        color: '#F05032', level: 85 },
      { name: 'GitHub',     icon: SiGithub,     color: '#181717', level: 75 },
      { name: 'Bitbucket',  icon: SiBitbucket,  color: '#0052CC', level: 60 },
      { name: 'Jira',       icon: SiJira,       color: '#0052CC', level: 60 },
      { name: 'Confluence', icon: SiConfluence, color: '#172B4D', level: 60 },
      { name: 'Scrum',      icon: FaCog,        color: '#6B7280', level: 70 },
      { name: 'Kanban',     icon: FaCog,        color: '#6B7280', level: 70 },
    ],
  },
  {
    title: 'Networking',
    icon: FaNetworkWired,
    skills: [
      { name: 'TCP/IP',         icon: FaNetworkWired, color: '#6B7280', level: 80 },
      { name: 'DNS',            icon: FaNetworkWired, color: '#6B7280', level: 65 },
      { name: 'Load Balancing', icon: FaNetworkWired, color: '#6B7280', level: 45 },
      { name: 'Firewall',       icon: FaNetworkWired, color: '#EF4444', level: 45 },
      { name: 'VPN',            icon: FaNetworkWired, color: '#6B7280', level: 55 },
      { name: 'OSI Model',      icon: FaNetworkWired, color: '#6B7280', level: 75 },
    ],
  },
  {
    title: 'Data Analytics',
    icon: FaChartBar,
    skills: [
      { name: 'Power BI',      icon: FaChartBar, color: '#F2C811', level: 65 },
      { name: 'Jupyter',       icon: SiJupyter,  color: '#F37626', level: 65 },
      { name: 'Google Colab',  icon: SiJupyter,  color: '#F9AB00', level: 55 },
      { name: 'Data Cleaning', icon: FaCode,     color: '#6B7280', level: 70 },
      { name: 'EDA',           icon: FaCode,     color: '#6B7280', level: 45 },
    ],
  },
]

function Skills() {
  return (
    <section id="skills" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
          <FaWrench className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
          <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
            Technical Expertise
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const CatIcon = category.icon
            return (
              <div
                key={category.title}
                className="bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(30,58,138,0.12)] transition-all duration-300 overflow-hidden"
              >
                {/* Card header */}
                <div className="px-6 pt-5 pb-4 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-2)] flex items-center justify-center flex-shrink-0">
                        <CatIcon className="text-white text-sm" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] border border-[rgba(30,58,138,0.15)]">
                      {category.skills.length} skills
                    </span>
                  </div>
                </div>

                {/* Card body — skills list */}
                <div className="px-6 py-5 space-y-3">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon
                    return (
                      <div key={skill.name} className="flex items-center gap-3">
                        {/* Brand-colored icon */}
                        <div className="w-5 flex-shrink-0 flex items-center justify-center">
                          <Icon style={{ color: skill.color }} className="text-base" />
                        </div>

                        {/* Name */}
                        <span className="text-sm text-[var(--text-secondary)] w-32 flex-shrink-0 truncate">
                          {skill.name}
                        </span>

                        {/* Progress bar with tooltip */}
                        <div className="relative flex-1 group">
                          <div className="h-1.5 bg-[var(--border-color)] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                            />
                          </div>
                          {/* Tooltip */}
                          <div
                            className="absolute bottom-full mb-2 -translate-x-1/2 bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-semibold px-2 py-0.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10"
                            style={{ left: `${skill.level}%` }}
                          >
                            {skill.level}%
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
