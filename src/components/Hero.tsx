import { FaGithub, FaLinkedin, FaDownload, FaEnvelope } from 'react-icons/fa'

const researchInterests = [
  'MLOps & Machine Learning Systems',
  'LLM Applications & Retrieval-Augmented Generation',
  'AI Infrastructure',
  'Agentic AI Systems',
  'Cloud Security & DevSecOps',
]

const buttonStyle = { display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)', background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '9999px', padding: '0.4rem 1.1rem', textDecoration: 'none', letterSpacing: '0.04em' }

function Hero() {
  return (
    <section id="hero" style={{ background: 'var(--bg-primary)', paddingTop: '52px' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2.5rem 1.5rem 2rem', borderBottom: '2px solid var(--text-primary)' }}>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start" style={{ gap: '2rem' }}>

          {/* Left column */}
          <div style={{ flex: 1 }}>

            {/* Name */}
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 0.5rem' }}>
              Kalhara Tennakoon
            </h1>

            {/* Degree identity */}
            <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '-0.01em', lineHeight: 1.4, margin: '0 0 0.35rem' }}>
              BSc (Hons) Computer Science (Software Engineering) · First Class Honours
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 1rem' }}>
              Kingston University, London · Kurunegala, Sri Lanka
            </p>

            {/* Academic profile */}
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75, margin: '0 0 1rem' }}>
              First Class Computer Science graduate, top of the Software Engineering batch at ESU Kandy, with industry experience in cloud-native systems and DevOps at IFS R&D International. My undergraduate work applies machine learning to real problems: a veterinary clinic system with ML forecasting (Grade A) whose local RAG assistant reached the Ascentic AI Launch Pad Top 10, and a study predicting course difficulty from student evaluations. I am seeking graduate study in machine learning and reliable, secure systems infrastructure.
            </p>

            {/* Research interests */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: '0 0 0.4rem' }}>
                Research Interests
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                {researchInterests.join(' · ')}
              </p>
            </div>

            {/* CTA buttons */}
            <div className="no-print" style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="/Kalhara_Tennakoon_CV.pdf"
                download="Kalhara_Tennakoon_CV.pdf"
                style={{ ...buttonStyle, color: 'var(--bg-primary)', background: 'var(--text-primary)', border: '1px solid var(--text-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                <FaDownload size={10} /> CV (PDF)
              </a>
              {[
                { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope size={12} />, label: 'Email', external: false },
                { href: 'https://github.com/kalharatennakoon', icon: <FaGithub size={12} />, label: 'GitHub', external: true },
                { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin size={12} />, label: 'LinkedIn', external: true },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  style={buttonStyle}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--text-primary)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
                >
                  {link.icon} {link.label}
                </a>
              ))}
            </div>

          </div>

          {/* Photo */}
          <img
            src="/profile.png"
            alt="Kalhara Tennakoon"
            className="self-start order-first sm:order-last w-28 h-28 sm:w-[150px] sm:h-[150px]"
            style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '1px solid var(--border-color)' }}
          />

        </div>

      </div>
    </section>
  )
}

export default Hero
