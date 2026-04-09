import {
  FaEnvelope, FaGithub, FaLinkedin, FaMedium,
  FaStackOverflow, FaHeart
} from 'react-icons/fa'
import { FaMugHot } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'
import useScrollReveal from '../hooks/useScrollReveal'

const contactLinks = [
  { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope />, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin />, label: 'LinkedIn', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub />, label: 'GitHub', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium />, label: 'Medium', external: true },
  { href: 'https://x.com/_KalharaT', icon: <FaXTwitter />, label: 'X', external: true },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: <SiBluesky />, label: 'Bluesky', external: true },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: <FaStackOverflow />, label: 'Stack Overflow', external: true },
]

function Contact() {
  const currentYear = new Date().getFullYear()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [cardRef, cardVisible] = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <>
      <section id="contact" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden dark:bg-[var(--bg-primary)]">

        {/* Background blobs */}
        <div
          className="blob-shape w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.1), rgba(6,182,212,0.06), transparent)',
            top: '-150px',
            right: '-120px',
            animationDuration: '20s',
          }}
        />
        <div
          className="blob-shape w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.07), transparent)',
            bottom: '-80px',
            left: '-60px',
            animationDelay: '-8s',
            animationDuration: '15s',
          }}
        />

        <div className="max-w-6xl mx-auto px-8 relative z-10">

          {/* Section header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
                <FaEnvelope className="relative text-3xl text-[var(--color-primary)]" />
              </div>
              <h2
                className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
              >
                Get In Touch
              </h2>
            </div>
            <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          </div>

          {/* Social card */}
          <div
            ref={cardRef}
            className={`max-w-2xl mx-auto reveal-scale ${cardVisible ? 'is-visible' : ''}`}
          >
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_8px_32px_var(--shadow)] border border-[var(--border-color)] overflow-hidden shimmer-hover">
              {/* Gradient accent top */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), #3b82f6, #06b6d4)' }} />

              {/* Card header */}
              <div className="px-8 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Let's Connect</h3>
                <p className="text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
                  Feel free to reach out through any of the platforms below.
                </p>
              </div>

              {/* Social links */}
              <div className="px-8 py-7">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-5">Find me on</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {contactLinks.map((link, i) => (
                    <div key={link.label} className="relative group">
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg text-[var(--color-primary)] border border-[rgba(30,58,138,0.15)] transition-all duration-300 hover:text-white hover:scale-110 hover:shadow-[0_6px_20px_rgba(30,58,138,0.35)] hover:-translate-y-1"
                        style={{
                          background: 'rgba(30,58,138,0.06)',
                          transitionDelay: cardVisible ? `${i * 0.05}s` : '0s',
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget
                          el.style.background = 'linear-gradient(135deg, var(--color-primary), #06b6d4)'
                          el.style.borderColor = 'transparent'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget
                          el.style.background = 'rgba(30,58,138,0.06)'
                          el.style.borderColor = 'rgba(30,58,138,0.15)'
                        }}
                      >
                        {link.icon}
                      </a>
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                      >
                        {link.label}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-primary)]" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] py-3 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <p className="text-[var(--text-primary)] text-xs font-semibold m-0 mb-1">
            © {currentYear} Kalhara Tennakoon. All Rights Reserved.
          </p>
          <p className="text-[var(--text-secondary)] text-xs flex items-center justify-center gap-1 opacity-60 m-0">
            Crafted with <FaHeart className="text-red-500" /> and <FaMugHot className="text-amber-700" />
          </p>
        </div>
      </footer>
    </>
  )
}

export default Contact
