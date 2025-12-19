function About() {
  return (
    <section id="about" className="py-20 bg-[var(--bg-primary)] relative dark:bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] to-[#764ba2]"></div>
      
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-12 text-center text-[var(--text-primary)] relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-[#667eea] after:to-[#764ba2] after:rounded-sm">
          About Me
        </h2>
        
        <div className="max-w-4xl mx-auto mb-12 p-8 md:p-12 bg-gradient-to-br from-[rgba(102,126,234,0.1)] to-[rgba(118,75,162,0.1)] border-l-4 border-[#667eea] rounded-xl relative dark:from-[rgba(102,126,234,0.15)] dark:to-[rgba(118,75,162,0.15)]">
          <div className="absolute top-[-10px] left-5 text-6xl text-[#667eea] opacity-30 font-serif leading-none">"</div>
          <p className="text-lg leading-relaxed text-[var(--text-primary)] m-0 italic relative z-10">
            Computer Science undergraduate and aspiring DevOps engineer with hands-on internship experience in CI/CD automation, containerization, and cloud-based deployments. Passionate about building reliable systems, continuous improvement, and sharing knowledge with the engineering community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all hover:-translate-y-2 hover:shadow-[0_8px_25px_var(--shadow)] border border-[var(--border-color)]">
            <h3 className="text-xl text-[var(--text-primary)] mb-4 font-semibold">
              🚀 DevOps & Automation
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] m-0">
              Demonstrated success in automating CI/CD pipelines and managing container orchestration with <strong className="text-[#667eea] font-semibold">Docker</strong>, <strong className="text-[#667eea] font-semibold">Kubernetes</strong>, <strong className="text-[#667eea] font-semibold">Tekton</strong>, <strong className="text-[#667eea] font-semibold">ArgoCD</strong>, and <strong className="text-[#667eea] font-semibold">GitHub Actions</strong>.
            </p>
          </div>
          
          <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all hover:-translate-y-2 hover:shadow-[0_8px_25px_var(--shadow)] border border-[var(--border-color)]">
            <h3 className="text-xl text-[var(--text-primary)] mb-4 font-semibold">
              ☁️ Cloud-Native Expertise
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] m-0">
              Microsoft Azure certified with expertise in <strong className="text-[#667eea] font-semibold">Infrastructure as Code (IaC)</strong>, building scalable and secure cloud-native systems.
            </p>
          </div>
          
          <div className="bg-[var(--card-bg)] p-8 rounded-2xl shadow-[0_4px_15px_var(--shadow)] transition-all hover:-translate-y-2 hover:shadow-[0_8px_25px_var(--shadow)] border border-[var(--border-color)]">
            <h3 className="text-xl text-[var(--text-primary)] mb-4 font-semibold">
              ✍️ Knowledge Sharing
            </h3>
            <p className="text-base leading-relaxed text-[var(--text-secondary)] m-0">
              Committed to technical writing and open-source collaboration, sharing practical insights on DevOps and cloud technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
