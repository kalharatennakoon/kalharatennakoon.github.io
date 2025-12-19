import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaDocker, FaAws, FaGitAlt, 
  FaGithub, FaCloud
} from 'react-icons/fa'
import { 
  SiTypescript, SiJavascript, SiNextdotjs, SiKubernetes, 
  SiTerraform, SiGraphql, SiTekton, SiArgo, SiGithubactions
} from 'react-icons/si'
import { DiCss3 } from 'react-icons/di'
import { TbBrandCSharp } from 'react-icons/tb'

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      color: '#667eea',
      skills: [
        { name: 'React', icon: <FaReact />, color: '#61DAFB' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#000000' },
        { name: 'HTML/CSS', icon: <DiCss3 />, color: '#1572B6' }
      ]
    },
    {
      title: 'Backend & Languages',
      color: '#764ba2',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
        { name: 'Python', icon: <FaPython />, color: '#3776AB' },
        { name: 'Java', icon: <FaJava />, color: '#007396' },
        { name: 'C#', icon: <TbBrandCSharp />, color: '#239120' },
        { name: 'GraphQL', icon: <SiGraphql />, color: '#E10098' }
      ]
    },
    {
      title: 'Cloud & DevOps',
      color: '#f093fb',
      skills: [
        { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
        { name: 'Kubernetes', icon: <SiKubernetes />, color: '#326CE5' },
        { name: 'AWS', icon: <FaAws />, color: '#FF9900' },
        { name: 'Azure', icon: <FaCloud />, color: '#0078D4' },
        { name: 'Terraform', icon: <SiTerraform />, color: '#7B42BC' },
        { name: 'Tekton', icon: <SiTekton />, color: '#FD495C' },
        { name: 'ArgoCD', icon: <SiArgo />, color: '#EF7B4D' }
      ]
    },
    {
      title: 'Tools & Automation',
      color: '#4facfe',
      skills: [
        { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
        { name: 'GitHub', icon: <FaGithub />, color: '#181717' },
        { name: 'GitHub Actions', icon: <SiGithubactions />, color: '#2088FF' }
      ]
    }
  ]

  return (
    <section id="skills" className="py-24 bg-[var(--bg-secondary)] relative dark:bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-5xl mb-8 text-center text-[var(--text-primary)] font-bold">
          Skills & Technologies
        </h2>
        
        <div className="flex items-center justify-center gap-4 max-w-3xl mx-auto mb-12 px-8 py-4 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full border-2 border-[rgba(102,126,234,0.2)] dark:from-[rgba(102,126,234,0.12)] dark:to-[rgba(118,75,162,0.12)] dark:border-[rgba(102,126,234,0.3)]">
          <span className="text-2xl flex-shrink-0">🛠️</span>
          <p className="m-0 text-base text-[var(--text-secondary)] font-medium text-center">
            Core tools for building, automating, and operating cloud-native systems
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {skillCategories.map((category) => (
            <div 
              key={category.title} 
              className="bg-[var(--card-bg)] p-10 rounded-3xl shadow-[0_4px_20px_var(--shadow)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-[rgba(102,126,234,0.1)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(102,126,234,0.15)] hover:border-[rgba(102,126,234,0.3)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:hover:shadow-[0_12px_40px_rgba(102,126,234,0.3)]"
            >
              <h3 className="text-2xl text-[var(--text-primary)] font-semibold mb-8 pb-4 border-b-2 border-[var(--border-color)] flex items-center gap-2">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex flex-col items-center gap-3 p-5 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)] rounded-xl transition-all cursor-pointer border-2 border-transparent relative overflow-hidden group hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                    style={{ '--skill-color': skill.color } as React.CSSProperties}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--skill-color)] to-transparent opacity-0 group-hover:opacity-5 transition-opacity z-0"></div>
                    <div 
                      className="text-5xl flex items-center justify-center text-[var(--skill-color)] transition-all relative z-10 group-hover:scale-110 group-hover:[transform:rotateY(360deg)] group-hover:[filter:drop-shadow(0_4px_8px_rgba(0,0,0,0.15))]"
                    >
                      {skill.icon}
                    </div>
                    <span className="text-sm text-[var(--text-secondary)] font-semibold text-center transition-colors relative z-10 group-hover:text-[var(--text-primary)]">
                      {skill.name}
                    </span>
                  </div>
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
