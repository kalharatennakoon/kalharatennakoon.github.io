
function About() {
  return (
    <section id="about" className="py-12 md:py-16 bg-[var(--bg-primary)] relative dark:bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <h2 className="text-4xl md:text-5xl mb-8 text-center text-[var(--text-primary)] relative after:content-[''] after:absolute after:bottom-[-0.75rem] after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-gradient-to-r after:from-[var(--color-primary)] after:to-[var(--color-primary)] after:rounded-sm">
          About Me
        </h2>

        <div className="relative text-center px-4 md:px-10">
          <span className="text-6xl md:text-7xl text-[var(--color-primary)] opacity-20 leading-none select-none absolute -top-4 left-0 md:left-4" style={{ fontFamily: '"Handlee", cursive' }}>"</span>
          <p
            className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] m-0 px-6 md:px-8"
            style={{ fontFamily: '"Handlee", cursive', fontWeight: 400 }}
          >
            DevOps Engineer driven by a strong passion for CI/CD automation, container orchestration, and cloud-native systems. Microsoft Azure certified with hands-on experience in Kubernetes, Docker, Tekton, and ArgoCD.
            Deeply interested in the convergence of DevOps and AI, with a growing focus on MLOps and building scalable, intelligent systems.
          </p>
          <span className="text-6xl md:text-7xl text-[var(--color-primary)] opacity-20 leading-none select-none absolute -bottom-4 right-0 md:right-4 rotate-180 inline-block" style={{ fontFamily: '"Handlee", cursive' }}>"</span>
        </div>
      </div>
    </section>
  )
}

export default About
