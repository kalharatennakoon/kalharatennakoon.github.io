
function About() {
  return (
    <section id="about" className="py-20 bg-[var(--bg-primary)] relative dark:bg-[var(--bg-secondary)]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]"></div>

      <div className="max-w-6xl mx-auto px-8">
        <h2 className="text-5xl mb-12 text-center text-[var(--text-primary)] relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-1/2 after:-translate-x-1/2 after:w-20 after:h-1 after:bg-gradient-to-r after:from-[var(--color-primary)] after:to-[var(--color-primary)] after:rounded-sm">
          About Me
        </h2>

        <div className="max-w-5xl mx-auto mb-12 text-center relative">
          <div className="text-8xl text-[var(--color-primary)] opacity-20 leading-none select-none" style={{ fontFamily: '"Handlee", cursive' }}>"</div>
          <p
            className="text-2xl leading-relaxed text-[var(--text-primary)] m-0 -mt-6 px-4"
            style={{ fontFamily: '"Handlee", cursive', fontWeight: 400 }}
          >
            DevOps Engineer driven by a strong passion for CI/CD automation, container orchestration, and cloud-native systems. Microsoft Azure certified with hands-on experience in Kubernetes, Docker, Tekton, and ArgoCD.
            Deeply interested in the convergence of DevOps and AI, with a growing focus on MLOps and building scalable, intelligent systems.
          </p>
          <div className="text-8xl text-[var(--color-primary)] opacity-20 leading-none select-none rotate-180 inline-block" style={{ fontFamily: '"Handlee", cursive' }}>"</div>
        </div>
      </div>
    </section>
  )
}

export default About
