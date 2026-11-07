import { useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

/*
 * Sends the message through EmailJS straight to the inbox configured on the
 * EmailJS template (kalhara@kalharatennakoon.com). The IDs are public by
 * design: EmailJS restricts use by allowed origin, not by secrecy.
 *
 * Template variables: {{name}}, {{email}}, {{subject}}, {{message}}.
 * Set the template's Reply-To to {{email}} so replies go to the sender.
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined
const CONTACT_EMAIL = 'kalhara@kalharatennakoon.com'

const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

type Status = 'idle' | 'sending' | 'sent' | 'error'

const fieldClass =
  'w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--bg-primary)] text-[var(--text-primary)] ' +
  'border border-[var(--border-color)] placeholder:text-[var(--text-secondary)] placeholder:opacity-60 ' +
  'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--focus-ring)] ' +
  'transition-colors duration-200 disabled:opacity-60'

const labelClass = 'block text-xs font-semibold text-[var(--text-secondary)] mb-1.5'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  // Hidden from people; bots that fill every field get silently dropped.
  const [honeypot, setHoneypot] = useState('')

  const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    if (honeypot) { setStatus('sent'); return }

    if (!configured) {
      // No EmailJS keys in this build (e.g. local dev): fall back to the mail app.
      const body = `${form.message}\n\n${form.name} <${form.email}>`
      window.location.href =
        `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(form.subject || `Message from ${form.name}`)}` +
        `&body=${encodeURIComponent(body)}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID!,
        TEMPLATE_ID!,
        {
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim() || `Message from ${form.name.trim()}`,
          message: form.message.trim(),
        },
        { publicKey: PUBLIC_KEY! },
      )
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact form failed to send:', err)
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="text-center py-6">
        <FaCheckCircle className="mx-auto text-4xl text-emerald-500 mb-3" />
        <p className="text-base font-bold text-[var(--text-primary)] mb-1">Message sent</p>
        <p className="text-sm text-[var(--text-secondary)] mb-5">Thanks for reaching out. I'll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} className="space-y-4 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>Name</label>
          <input
            id="cf-name" name="name" type="text" required maxLength={100} autoComplete="name"
            value={form.name} onChange={update('name')} disabled={sending}
            placeholder="Your name" className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>Email</label>
          <input
            id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email"
            value={form.email} onChange={update('email')} disabled={sending}
            placeholder="you@example.com" className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className={labelClass}>
          Subject <span className="font-normal opacity-70">(optional)</span>
        </label>
        <input
          id="cf-subject" name="subject" type="text" maxLength={150}
          value={form.subject} onChange={update('subject')} disabled={sending}
          placeholder="What's it about?" className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>Message</label>
        <textarea
          id="cf-message" name="message" required minLength={10} maxLength={5000} rows={5}
          value={form.message} onChange={update('message')} disabled={sending}
          placeholder="Your message" className={`${fieldClass} resize-y min-h-[120px]`}
        />
      </div>

      {/* Honeypot: off-screen and skipped by keyboard and screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off"
          value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
          <FaExclamationCircle className="mt-0.5 flex-shrink-0" />
          <span>
            Your message couldn't be sent. Please try again, or email me at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold underline">{CONTACT_EMAIL}</a>.
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-[0_10px_30px_rgba(30,58,138,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
        style={{ background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }}
      >
        <FaPaperPlane className="text-xs" />
        {sending ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm
