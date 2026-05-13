import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa'

const techStack = ['Kubernetes', 'Docker', 'Tekton', 'ArgoCD', 'Python', 'CI/CD', 'Azure', 'AWS', 'Machine Learning']

const socialProof = [
  '3× Microsoft Azure Certified',
  'Two-Time Dan Kohn Scholar',
  '150K+ Medium Views',
]

const currentlyBuilding = [
  'SolarCast — ML-powered solar energy forecasting platform (FastAPI + React + Prophet)',
  'Exploring MLOps & AI infrastructure pipelines',
  'Writing about Kubernetes & cloud-native engineering on Medium',
]

function Hero() {
  return (
    <section id="hero" style={{ background: 'var(--bg-primary)', paddingTop: '52px' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2.5rem 1.5rem 2rem', borderBottom: '2px solid var(--text-primary)' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem' }}>

          {/* Left column */}
          <div style={{ flex: 1 }}>

            {/* Name */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 0.5rem' }}>
              Kalhara Tennakoon
            </h1>

            {/* Role identity */}
            <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '-0.01em', lineHeight: 1.4, margin: '0 0 1rem' }}>
              Software Engineer focused on Cloud-Native Systems, DevSecOps & AI Infrastructure
            </p>

            {/* Short description */}
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 1rem' }}>
              Early-career engineer with hands-on industry experience in software development, cloud-native systems, and automation. Skilled in Kubernetes, Docker, CI/CD automation, and cloud platforms including Azure and AWS. Passionate about DevSecOps, MLOps, AI infrastructure, and technical knowledge sharing.
            </p>

            {/* Tech stack */}
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 1.25rem', letterSpacing: '0.01em' }}>
              {techStack.join(' · ')}
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '1.25rem', alignItems: 'center' }}>
              <a
                href="/Kalhara_Tennakoon_Resume.pdf"
                download="Kalhara_Tennakoon_Resume.pdf"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--bg-primary)', background: 'var(--text-primary)', border: '1px solid var(--text-primary)', borderRadius: '9999px', padding: '0.4rem 1.1rem', textDecoration: 'none', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <FaDownload size={10} /> Resume
              </a>
              <a
                href="https://github.com/kalharatennakoon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.4rem 1.1rem', textDecoration: 'none', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
              >
                <FaGithub size={12} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kalharatennakoon"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.4rem 1.1rem', textDecoration: 'none', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
              >
                <FaLinkedin size={12} /> LinkedIn
              </a>
              <a
                href="#projects"
                style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.04em' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                Projects →
              </a>
            </div>

            {/* Social proof */}
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: '0 0 1.5rem', letterSpacing: '0.02em' }}>
              {socialProof.join(' · ')}
            </p>

            {/* Currently building */}
            <div>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: '0 0 0.4rem' }}>
                Currently Building
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {currentlyBuilding.map((item) => (
                  <li key={item} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right column: photo */}
          <img
            src="/profile.png"
            alt="Kalhara Tennakoon"
            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid var(--border-color)' }}
          />

        </div>

      </div>
    </section>
  )
}

export default Hero
