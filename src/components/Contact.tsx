import { useState } from 'react'
import {
  FaEnvelope, FaGithub, FaLinkedin, FaMedium,
  FaStackOverflow, FaHeart, FaCopy, FaCheck, FaPaperPlane
} from 'react-icons/fa'
import { FaMugHot, FaXTwitter } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'
import useScrollReveal from '../hooks/useScrollReveal'
import { soundFx } from '../utils/sound'

const contactLinks = [
  { href: 'mailto:kalhara@kalharatennakoon.com', icon: <FaEnvelope />, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin />, label: 'LinkedIn', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub />, label: 'GitHub', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium />, label: 'Medium', external: true },
  { href: 'https://x.com/_KalharaT', icon: <FaXTwitter />, label: 'X', external: true },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: <SiBluesky />, label: 'Bluesky', external: true },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: <FaStackOverflow />, label: 'Stack Overflow', external: true },
]

export function Contact() {
  const currentYear = new Date().getFullYear()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [cardRef, cardVisible] = useScrollReveal<HTMLDivElement>(0.1)
  const [copied, setCopied] = useState(false)

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')

  const copyEmail = () => {
    soundFx.success()
    navigator.clipboard.writeText('kalhara@kalharatennakoon.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    soundFx.success()
    setStatus('sending')

    // Simulate sending / opens mailto as fallback
    setTimeout(() => {
      setStatus('success')
      const mailtoLink = `mailto:kalhara@kalharatennakoon.com?subject=Contact from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.email)}`
      window.open(mailtoLink, '_blank')
    }, 600)
  }

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

          {/* Section Header */}
          <div
            ref={headerRef}
            className={`text-center mb-16 reveal ${headerVisible ? 'is-visible' : ''}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <FaEnvelope className="text-xs" />
              <span>Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Let's Connect & Collaborate
            </h2>
            <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
            <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
              Open to opportunities in Software Engineering, DevOps, Cloud Platforms, and Applied AI systems.
            </p>
          </div>

          <div
            ref={cardRef}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start reveal ${
              cardVisible ? 'is-visible' : ''
            }`}
          >
            {/* Left Column: Direct Links & 1-Click Copy (5 cols) */}
            <div className="lg:col-span-5 bento-card p-6 sm:p-8 shimmer-hover flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                  Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                  Based in Kurunegala, Sri Lanka (UTC+5:30). Available for full-time on-site, hybrid, and worldwide remote opportunities.
                </p>

                {/* 1-Click Email Copy Card */}
                <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] mb-6">
                  <div className="text-xs font-mono text-[var(--text-secondary)] mb-1">
                    Primary Email
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[var(--text-primary)] font-mono truncate">
                      kalhara@kalharatennakoon.com
                    </span>
                    <button
                      onClick={copyEmail}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500 hover:text-white text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer flex-shrink-0"
                      title="Copy email to clipboard"
                      aria-label="Copy email"
                    >
                      {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Social Network Channels */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-3 font-semibold">
                    Find Me Online
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {contactLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        onClick={() => soundFx.click()}
                        className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] hover:border-sky-500/50 hover:text-sky-400 hover:scale-110 text-[var(--text-primary)] border border-[var(--border-color)] flex items-center justify-center text-base transition-all shadow-sm cursor-pointer"
                        title={link.label}
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status footer inside left card */}
              <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Typically replies within 24 hours</span>
              </div>
            </div>

            {/* Right Column: Direct Message Form (7 cols) */}
            <div className="lg:col-span-7 bento-card p-6 sm:p-8 shimmer-hover">
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                Have a question or looking to hire? Drop a quick note below.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fadeIn">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl mx-auto mb-3">
                    <FaCheck />
                  </div>
                  <h4 className="text-base font-bold text-[var(--text-primary)] mb-1">
                    Message Prepared!
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] max-w-sm mx-auto mb-4 leading-relaxed">
                    Opening your mail client to dispatch your message directly to kalhara@kalharatennakoon.com.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle')
                      setFormData({ name: '', email: '', message: '' })
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500 text-white cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 outline-none text-xs sm:text-sm placeholder-[var(--text-secondary)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 outline-none text-xs sm:text-sm placeholder-[var(--text-secondary)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-[var(--text-secondary)] mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hello Kalhara, let's discuss an engineering role / project..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] focus:border-sky-500/60 focus:ring-2 focus:ring-sky-500/20 outline-none text-xs sm:text-sm placeholder-[var(--text-secondary)] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="glass-btn-primary w-full py-3 px-6 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <FaPaperPlane className="text-xs" />
                    <span>{status === 'sending' ? 'Dispatching…' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Modern Footer */}
      <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] py-8 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[var(--text-secondary)]">
              © {currentYear} <strong className="text-[var(--text-primary)]">Kalhara Tennakoon</strong>. All rights reserved.
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)]">
              <span>Engineered with React 19, TypeScript &</span>
              <FaHeart className="text-red-500 text-xs" />
              <span>&</span>
              <FaMugHot className="text-amber-500 text-xs" />
            </div>

            <div>
              <a
                href="#hero"
                onClick={() => soundFx.click()}
                className="text-xs font-mono font-semibold text-sky-400 hover:text-sky-300"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Contact
