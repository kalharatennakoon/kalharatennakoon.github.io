function Hero() {
  return (
    <section id="hero" style={{ background: 'var(--bg-primary)', paddingTop: '52px' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2.5rem 1.5rem 2rem', borderBottom: '2px solid var(--text-primary)' }}>

        {/* Name row + photo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', marginBottom: '0.75rem' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, margin: 0 }}>
            Kalhara Tennakoon
          </h1>
          <img
            src="/profile.png"
            alt="Kalhara Tennakoon"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid var(--border-color)' }}
          />
        </div>

        {/* Summary */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '60rem', margin: '0.75rem 0 0.75rem' }}>
          DevOps Engineer with hands-on experience in CI/CD automation, container orchestration, and cloud-native infrastructure.
          Microsoft Azure Certified, with practical exposure to Kubernetes, Docker, Tekton, and ArgoCD.
          Two-time Dan Kohn Scholarship recipient at KubeCon + CloudNativeCon. Expanding into MLOps and AI infrastructure,
          with a passion for open-source and technical writing.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="/Kalhara_Tennakoon_Resume.pdf"
            download="Kalhara_Tennakoon_Resume.pdf"
            style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--bg-primary)', background: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '9999px', padding: '0.4rem 1.1rem', textDecoration: 'none', letterSpacing: '0.04em' }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Download Resume
          </a>
        </div>

      </div>
    </section>
  )
}

export default Hero
