import { useState } from 'react'
import { FaCheck, FaCopy, FaGithub, FaLinkedin, FaMedium, FaStackOverflow } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'

const EMAIL = 'kalhara@kalharatennakoon.com'

const profiles = [
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://github.com/kalharatennakoon', icon: FaGithub, label: 'GitHub' },
  { href: 'https://kalharatennakoon.medium.com', icon: FaMedium, label: 'Medium' },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: FaStackOverflow, label: 'Stack Overflow' },
  { href: 'https://x.com/_KalharaT', icon: FaXTwitter, label: 'X' },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: SiBluesky, label: 'Bluesky' },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [opened, setOpened] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Message from ${form.name}`
    const body = `${form.message}\n\n${form.name}\n${form.email}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <>
      <section id="contact" className="section">
        <div className="page-wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <h2 className="section-title">Get in touch</h2>
            <p className="mt-4 max-w-[30rem] text-[1.0625rem] leading-relaxed text-muted">
              I'm looking for roles in software engineering, DevOps, cloud and MLOps, on-site in Sri
              Lanka or remote. Email is the quickest way to reach me.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={`mailto:${EMAIL}`} className="btn btn-primary">
                {EMAIL}
              </a>
              <button type="button" onClick={copyEmail} className="btn btn-secondary" aria-live="polite">
                {copied ? <FaCheck className="text-positive" aria-hidden="true" /> : <FaCopy aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 border-t border-rule sm:grid-cols-3">
              {profiles.map(({ href, icon: Icon, label }) => (
                <li key={label} className="border-b border-rule">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 py-3.5 text-[0.9375rem] text-ink transition-colors hover:text-accent"
                  >
                    <Icon className="text-[1rem] text-muted" aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-rule bg-surface p-6 sm:p-8">
            <h3 className="text-[1.125rem] font-semibold">Write a message</h3>
            <p className="mt-1 text-[0.9375rem] text-muted">
              This opens your email app with the message filled in, ready to send.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-[0.875rem] font-medium text-ink">Name</label>
                <input
                  id="c-name"
                  className="field"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-[0.875rem] font-medium text-ink">Your email</label>
                <input
                  id="c-email"
                  type="email"
                  className="field"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="c-message" className="mb-1.5 block text-[0.875rem] font-medium text-ink">Message</label>
                <textarea
                  id="c-message"
                  rows={5}
                  className="field resize-y"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button type="submit" className="btn btn-primary">Open in email app</button>
                {opened && (
                  <p className="text-[0.875rem] text-muted" role="status">
                    If nothing opened, email {EMAIL} directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-rule">
        <div className="page-wrap flex flex-col gap-3 py-8 text-[0.875rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kalhara Tennakoon</p>
          <div className="flex items-center gap-6">
            <a href="/Kalhara_Tennakoon_CV.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-ink">CV</a>
            <a href="/academic/" className="hover:text-ink">Academic CV</a>
            <a href="#" className="hover:text-ink">Back to top</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Contact
