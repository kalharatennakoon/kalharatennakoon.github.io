import { useState, useMemo } from 'react'
import {
  FaCode, FaCog, FaNetworkWired, FaCloud, FaAws, FaChartBar, FaBrain,
  FaSearch, FaTimes
} from 'react-icons/fa'
import {
  SiDocker, SiKubernetes, SiJenkins, SiGithubactions, SiArgo,
  SiGooglecloud,
  SiPython, SiGo, SiGnubash,
  SiJavascript, SiNodedotjs, SiFlask, SiReact,
  SiMysql, SiPostgresql, SiMongodb,
  SiGit, SiGithub, SiBitbucket, SiJira, SiConfluence,
  SiJupyter,
  SiScikitlearn, SiPandas, SiOllama, SiFastapi, SiTerraform,
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

interface Skill {
  name: string
  icon: IconType
  color: string
}

interface Category {
  id: string
  title: string
  icon: IconType
  skills: Skill[]
}

const skillCategories: Category[] = [
  {
    id: 'devops',
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
      { name: 'IaC (Terraform)', icon: SiTerraform,    color: '#7B42BC' },
    ],
  },
  {
    id: 'cloud',
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
    id: 'programming',
    title: 'Languages & Core',
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
    id: 'web-data',
    title: 'Web & Databases',
    icon: SiReact,
    skills: [
      { name: 'React',      icon: SiReact,      color: '#61DAFB' },
      { name: 'Node.js',    icon: SiNodedotjs,  color: '#339933' },
      { name: 'FastAPI',    icon: SiFastapi,    color: '#009688' },
      { name: 'Flask',      icon: SiFlask,      color: '#6B7280' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL',      icon: SiMysql,      color: '#4479A1' },
      { name: 'MongoDB',    icon: SiMongodb,    color: '#47A248' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    ],
  },
  {
    id: 'ai-data',
    title: 'AI & Data Science',
    icon: FaBrain,
    skills: [
      { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      { name: 'Pandas',       icon: SiPandas,      color: '#150458' },
      { name: 'Ollama (RAG)', icon: SiOllama,      color: '#38bdf8' },
      { name: 'Prophet',      icon: FaChartBar,    color: '#0668E1' },
      { name: 'pgvector',     icon: SiPostgresql,  color: '#336791' },
      { name: 'Jupyter',       icon: SiJupyter,    color: '#F37626' },
      { name: 'Power BI',      icon: FaChartBar,   color: '#F2C811' },
    ],
  },
  {
    id: 'practices',
    title: 'Tools & Practices',
    icon: SiGit,
    skills: [
      { name: 'Git & GitHub',   icon: SiGithub,     color: '#2088FF' },
      { name: 'Bitbucket',      icon: SiBitbucket,  color: '#0052CC' },
      { name: 'Jira & Agile',   icon: SiJira,       color: '#0052CC' },
      { name: 'Confluence',     icon: SiConfluence, color: '#172B4D' },
      { name: 'TCP/IP & DNS',   icon: FaNetworkWired, color: '#10b981' },
      { name: 'Load Balancing', icon: FaNetworkWired, color: '#6366f1' },
    ],
  },
]

export function Skills() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [gridRef, gridVisible] = useScrollReveal<HTMLDivElement>(0.05)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const totalSkillsCount = useMemo(() => {
    return skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)
  }, [])

  const filteredCategories = useMemo(() => {
    let cats = skillCategories

    if (selectedCategory !== 'all') {
      cats = cats.filter((c) => c.id === selectedCategory)
    }

    if (!searchQuery.trim()) return cats

    const q = searchQuery.toLowerCase()
    return cats
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.skills.length > 0)
  }, [selectedCategory, searchQuery])

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaCode className="text-xs" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Skills & Tech Stack
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Comprehensive toolkit spanning container orchestration, cloud platforms,
            automation pipelines, and modern full-stack development.
          </p>

          {/* Interactive Search Bar & Filters */}
          <div className="max-w-md mx-auto mt-8 relative">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search across ${totalSkillsCount}+ technologies (e.g. Tekton, Python, Docker)...`}
                className="w-full pl-11 pr-10 py-2.5 rounded-full bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 outline-none text-xs sm:text-sm placeholder-[var(--text-secondary)] shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <FaTimes className="text-xs" />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => {
                soundFx.tab()
                setSelectedCategory('all')
              }}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
              }`}
            >
              All Skills ({totalSkillsCount})
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.tab()
                  setSelectedCategory(cat.id)
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-sky-500 text-white shadow-md'
                    : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:text-[var(--text-primary)]'
                }`}
              >
                {cat.title} ({cat.skills.length})
              </button>
            ))}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal ${
            gridVisible ? 'is-visible' : ''
          }`}
        >
          {filteredCategories.map((category) => {
            const CatIcon = category.icon

            return (
              <div
                key={category.id}
                className="bento-card p-6 flex flex-col justify-between shimmer-hover"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[var(--border-color)]">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center text-base">
                      <CatIcon />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)]">
                        {category.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[var(--text-secondary)]">
                        {category.skills.length} skills listed
                      </span>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {category.skills.map((skill) => {
                      const SkillIcon = skill.icon

                      return (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-sky-500/40 hover:scale-[1.02] transition-all group cursor-default"
                        >
                          <span
                            className="text-base flex-shrink-0 transition-transform group-hover:scale-110"
                            style={{ color: skill.color }}
                          >
                            <SkillIcon />
                          </span>
                          <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                            {skill.name}
                          </span>
                        </div>
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
