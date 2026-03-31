// import { useState } from 'react'
import {
  FaEnvelope, FaGithub, FaLinkedin, FaMedium,
  FaStackOverflow, FaGoogle, FaAward, FaHeart, FaCoffee
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky, SiLinktree, SiGooglecloud } from 'react-icons/si'

const contactLinks = [
  { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope />, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin />, label: 'LinkedIn', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub />, label: 'GitHub', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium />, label: 'Medium', external: true },
  { href: 'https://x.com/_KalharaT', icon: <FaXTwitter />, label: 'X', external: true },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: <SiBluesky />, label: 'Bluesky', external: true },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: <FaStackOverflow />, label: 'Stack Overflow', external: true },
  { href: 'https://linktr.ee/kalharatennakoon', icon: <SiLinktree />, label: 'Linktree', external: true },
  { href: 'https://g.dev/TMKRBTennakoon', icon: <FaGoogle />, label: 'Google Dev', external: true },
  { href: 'https://www.cloudskillsboost.google/public_profiles/e074e12f-53b1-4ccd-ae0f-c18216f147fd', icon: <SiGooglecloud />, label: 'Google Cloud', external: true },
  { href: 'https://www.credly.com/users/kalharatennakoon', icon: <FaAward />, label: 'Credly', external: true },
]

// type FormState = { name: string; email: string; message: string }
// type Status = 'idle' | 'sending' | 'success' | 'error'

function Contact() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <section id="contact" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-5xl mb-10 text-center font-bold flex items-center justify-center gap-3">
            <FaEnvelope className="text-4xl text-[var(--color-primary)] flex-shrink-0" />
            <span className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent pb-1">
              Get In Touch
            </span>
          </h2>

          {/* Social card */}
          <div className="max-w-2xl mx-auto bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] overflow-hidden">
            {/* Card header */}
            <div className="px-8 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent">
              <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Let's Connect</h3>
              <p className="text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
                Feel free to reach out through any of the platforms below.
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 py-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-4">Find me on</p>
              <div className="flex flex-wrap justify-center gap-3">
                {contactLinks.map((link) => (
                  <div key={link.label} className="relative group">
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-lg text-[var(--color-primary)] bg-[rgba(30,58,138,0.06)] border border-[rgba(30,58,138,0.15)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] hover:shadow-[0_4px_12px_rgba(30,58,138,0.3)] transition-all duration-200"
                    >
                      {link.icon}
                    </a>
                    <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-[var(--color-primary)] text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                      {link.label}
                      <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-primary)]" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*
          <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-[0_4px_30px_var(--shadow)] border border-[var(--border-color)]">
            Send a message form (pending EmailJS setup)
          </div>
          */}
        </div>
      </section>

      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] py-2">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <p className="text-[var(--text-primary)] text-xs font-semibold m-0 mb-1">
            © {currentYear} Kalhara Tennakoon. All Rights Reserved.
          </p>
          <p className="text-[var(--text-secondary)] text-xs flex items-center justify-center gap-1 opacity-70 m-0">
            Crafted with <FaHeart className="text-[var(--color-primary)]" /> and <FaCoffee className="text-[var(--color-primary)]" />
          </p>
        </div>
      </footer>
    </>
  )
}

export default Contact
