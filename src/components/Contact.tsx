import { FaEnvelope, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'

const contactLinks = [
  { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope size={13} />, label: 'Email', value: 'kalharatennakoonmck@gmail.com', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin size={13} />, label: 'LinkedIn', value: 'linkedin.com/in/kalharatennakoon', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub size={13} />, label: 'GitHub', value: 'github.com/kalharatennakoon', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium size={13} />, label: 'Medium', value: 'kalharatennakoon.medium.com', external: true },
]

function Contact() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ marginBottom: '1.25rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h2 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', margin: 0 }}>Contact</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1rem' }}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'none', width: 'fit-content' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {link.icon} {link.value}
              </a>
            ))}
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
            Academic and professional references available upon request.
          </p>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1rem 1.5rem', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0, letterSpacing: '0.04em' }}>
            © {currentYear} Kalhara Tennakoon. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Contact
