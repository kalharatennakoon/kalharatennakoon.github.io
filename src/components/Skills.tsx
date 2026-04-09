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
import useScrollReveal from '../hooks/useScrollReveal'

interface Skill {
  name: string
  icon: IconType
  color: string
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
      { name: 'Docker',         icon: SiDocker,        color: '#2496ED' },
      { name: 'Kubernetes',     icon: SiKubernetes,    color: '#326CE5' },
      { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
      { name: 'ArgoCD',         icon: SiArgo,          color: '#EF7B4D' },
      { name: 'Jenkins',        icon: SiJenkins,       color: '#D24939' },
      { name: 'Azure DevOps',   icon: FaCloud,         color: '#0078D7' },
      { name: 'Tekton',         icon: FaCog,           color: '#FD495C' },
    ],
  },
  {
    title: 'Cloud Platforms',
    icon: FaCloud,
    skills: [
      { name: 'Microsoft Azure', icon: FaCloud,       color: '#0078D7' },
      { name: 'AWS',             icon: FaAws,         color: '#FF9900' },
      { name: 'Google Cloud',    icon: SiGooglecloud, color: '#4285F4' },
      { name: 'AKS',             icon: SiKubernetes,  color: '#326CE5' },
      { name: 'GKE',             icon: SiGooglecloud, color: '#4285F4' },
      { name: 'AWS EKS',         icon: FaAws,         color: '#FF9900' },
      { name: 'Rancher',         icon: FaCog,         color: '#0075A8' },
    ],
  },
  {
    title: 'Programming & Languages',
    icon: FaCode,
    skills: [
      { name: 'Python',       icon: SiPython,  color: '#3776AB' },
      { name: 'Golang',       icon: SiGo,      color: '#00ADD8' },
      { name: 'Bash / Shell', icon: SiGnubash, color: '#4EAA25' },
      { name: 'Java',         icon: FaCode,    color: '#007396' },
      { name: 'C',            icon: FaCode,    color: '#A8B9CC' },
    ],
  },
  {
    title: 'Web & Databases',
    icon: SiReact,
    skills: [
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'React',      icon: SiReact,      color: '#61DAFB' },
      { name: 'Node.js',    icon: SiNodedotjs,  color: '#339933' },
      { name: 'Angular',    icon: SiAngular,    color: '#DD0031' },
      { name: 'Flask',      icon: SiFlask,      color: '#6B7280' },
      { name: 'HTML / CSS', icon: SiHtml5,      color: '#E34F26' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL',      icon: SiMysql,      color: '#4479A1' },
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
    ],
  },
  {
    title: 'Version Control & Agile',
    icon: SiGit,
    skills: [
      { name: 'Git',        icon: SiGit,        color: '#F05032' },
      { name: 'GitHub',     icon: SiGithub,     color: '#181717' },
      { name: 'Bitbucket',  icon: SiBitbucket,  color: '#0052CC' },
      { name: 'Jira',       icon: SiJira,       color: '#0052CC' },
      { name: 'Confluence', icon: SiConfluence, color: '#172B4D' },
      { name: 'Scrum',      icon: FaCog,        color: '#6B7280' },
      { name: 'Kanban',     icon: FaCog,        color: '#6B7280' },
    ],
  },
  {
    title: 'Networking',
    icon: FaNetworkWired,
    skills: [
      { name: 'TCP/IP',         icon: FaNetworkWired, color: '#6B7280' },
      { name: 'DNS',            icon: FaNetworkWired, color: '#6B7280' },
      { name: 'Load Balancing', icon: FaNetworkWired, color: '#6B7280' },
      { name: 'Firewall',       icon: FaNetworkWired, color: '#EF4444' },
      { name: 'VPN',            icon: FaNetworkWired, color: '#6B7280' },
      { name: 'OSI Model',      icon: FaNetworkWired, color: '#6B7280' },
    ],
  },
  {
    title: 'Data Analytics',
    icon: FaChartBar,
    skills: [
      { name: 'Power BI',      icon: FaChartBar, color: '#F2C811' },
      { name: 'Jupyter',       icon: SiJupyter,  color: '#F37626' },
      { name: 'Google Colab',  icon: SiJupyter,  color: '#F9AB00' },
      { name: 'Data Cleaning', icon: FaCode,     color: '#6B7280' },
      { name: 'EDA',           icon: FaCode,     color: '#6B7280' },
    ],
  },
]

function Skills() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="skills" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden dark:bg-[var(--bg-primary)]">

      {/* Background blobs */}
      <div
        className="blob-shape w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.12), transparent)',
          top: '-150px',
          left: '-150px',
          animationDuration: '20s',
        }}
      />
      <div
        className="blob-shape w-[350px] h-[350px]"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1), transparent)',
          bottom: '-100px',
          right: '-80px',
          animationDelay: '-8s',
          animationDuration: '15s',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 relative z-10">

        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
              <FaWrench className="relative text-3xl text-[var(--color-primary)]" />
            </div>
            <h2
              className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
            >
              Technical Expertise
            </h2>
          </div>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((category, index) => {
            const CatIcon = category.icon
            return (
              <div
                key={category.title}
                className={`reveal-scale shimmer-hover ${gridVisible ? 'is-visible' : ''}`}
                style={{ transitionDelay: gridVisible ? `${index * 0.08}s` : '0s' }}
              >
                <div className="bg-[var(--card-bg)] rounded-xl shadow-[0_2px_12px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(30,58,138,0.14)] transition-all duration-300 overflow-hidden h-full">
                  {/* Card header */}
                  <div className="px-4 pt-4 pb-3 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.06)] to-transparent">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                      >
                        <CatIcon className="text-white text-xs" />
                      </div>
                      <h3 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider leading-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  {/* Skill pills */}
                  <div className="px-4 py-3 flex flex-wrap gap-1.5">
                    {category.skills.map((skill, skillIdx) => {
                      const Icon = skill.icon
                      return (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] dark:bg-[rgba(255,255,255,0.04)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-secondary)] hover:border-[rgba(30,58,138,0.35)] hover:text-[var(--text-primary)] hover:shadow-[0_2px_8px_rgba(30,58,138,0.1)] transition-all duration-200 cursor-default"
                          style={{
                            opacity: gridVisible ? 1 : 0,
                            transform: gridVisible ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 0.4s ease, transform 0.4s ease`,
                            transitionDelay: gridVisible ? `${index * 0.08 + skillIdx * 0.04}s` : '0s',
                          }}
                        >
                          <Icon style={{ color: skill.color }} className="text-sm flex-shrink-0" />
                          {skill.name}
                        </span>
                      )
                    })}
                  </div>
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
