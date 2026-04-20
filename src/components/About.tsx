function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-secondary)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>About</h2>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '60rem', margin: 0 }}>
          DevOps Engineer driven by a strong passion for CI/CD automation, container orchestration, and cloud-native systems.
          Microsoft Azure certified with hands-on experience in Kubernetes, Docker, Tekton, and ArgoCD.
          Deeply interested in the convergence of DevOps and AI, with a growing focus on MLOps and building scalable, intelligent systems.
        </p>
      </div>
    </section>
  )
}

export default About
