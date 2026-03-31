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
  // const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  // const [status, setStatus] = useState<Status>('idle')

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  // }

  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault()
  //   setStatus('sending')
  //   try {
  //     const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  //         template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  //         user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  //         template_params: {
  //           from_name: form.name,
  //           from_email: form.email,
  //           message: form.message,
  //           to_email: 'kalharatennakoonmck@gmail.com',
  //         },
  //       }),
  //     })
  //     if (res.ok) {
  //       setStatus('success')
  //       setForm({ name: '', email: '', message: '' })
  //     } else {
  //       setStatus('error')
  //     }
  //   } catch {
  //     setStatus('error')
  //   }
  // }

  // const inputClass =
  //   'w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] text-sm outline-none focus:border-[var(--color-primary-2)] focus:ring-2 focus:ring-[rgba(30,58,138,0.15)] transition-all placeholder:text-[var(--text-secondary)]'

  return (
    <>
      <section id="contact" className="py-20 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
              I'm always open to new opportunities, collaborations, or just a good conversation. Drop me a message.
            </p>
          </div>

          {/* Full-width: info + social icons */}
          <div className="flex flex-col items-center gap-8 text-center">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Let's connect</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xl mx-auto">
                  Whether you have a project in mind, want to collaborate, or just want to say hi, <br/>
                  feel free to reach out through any of the platforms below.
                </p>
              </div>

              {/* Social icons — single row with tooltips */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-4">Find me on</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {contactLinks.map((link) => (
                    <div key={link.label} className="relative group">
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-lg text-[var(--color-primary-2)] bg-white border border-[var(--border-color)] shadow-sm hover:bg-[#1e3a8a] hover:text-white hover:border-[var(--color-primary-2)] hover:shadow-md transition-all duration-200"
                      >
                        {link.icon}
                      </a>
                      {/* Tooltip */}
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium bg-[#172554] text-white rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg">
                        {link.label}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#172554]"></span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: contact form
            <div className="bg-[var(--card-bg)] rounded-2xl p-8 shadow-[0_4px_30px_var(--shadow)] border border-[var(--border-color)]">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="What's on your mind?"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-1 w-full py-3 px-6 bg-[#1e3a8a] hover:bg-[#172554] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_6px_20px_rgba(30,58,138,0.4)] hover:-translate-y-0.5"
                >
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-center text-sm text-green-600 font-medium">
                    Message sent! I'll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-center text-sm text-red-500 font-medium">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
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
