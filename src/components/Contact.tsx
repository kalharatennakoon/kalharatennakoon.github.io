import { FaEnvelope, FaGithub, FaLinkedin, FaMedium, FaStackOverflow } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'

const contactLinks = [
  { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope size={16} />, label: 'Email', value: 'kalharatennakoonmck@gmail.com', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin size={16} />, label: 'LinkedIn', value: 'linkedin.com/in/kalharatennakoon', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub size={16} />, label: 'GitHub', value: 'github.com/kalharatennakoon', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium size={16} />, label: 'Medium', value: 'kalharatennakoon.medium.com', external: true },
  { href: 'https://x.com/_KalharaT', icon: <FaXTwitter size={16} />, label: 'X', value: 'x.com/_KalharaT', external: true },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: <SiBluesky size={16} />, label: 'Bluesky', value: 'kalharatennakoon.bsky.social', external: true },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: <FaStackOverflow size={16} />, label: 'Stack Overflow', value: 'stackoverflow.com/users/13018789', external: true },
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                title={link.label}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {link.icon}
              </a>
            ))}
          </div>
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
