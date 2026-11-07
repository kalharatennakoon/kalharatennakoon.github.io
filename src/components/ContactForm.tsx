import { useEffect, useRef, useState, type FormEvent } from 'react'
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

/*
 * Posts the message to the Cloudflare Worker in /worker, which emails it to
 * the site owner with Reply-To set to the visitor. Turnstile (Cloudflare's
 * invisible spam check) runs when a site key is configured.
 */
const ENDPOINT =
  (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) || 'https://api.kalharatennakoon.com/contact'
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const CONTACT_EMAIL = 'kalhara@kalharatennakoon.com'

type Status = 'idle' | 'sending' | 'sent' | 'error'

interface TurnstileApi {
  render(el: HTMLElement, opts: Record<string, unknown>): string
  reset(id?: string): void
  remove(id: string): void
}
declare global {
  interface Window { turnstile?: TurnstileApi }
}

/** Loads Cloudflare's Turnstile script once and resolves when it's ready. */
let turnstileLoader: Promise<TurnstileApi> | null = null
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile)
  turnstileLoader ??= new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile missing')))
    script.onerror = () => { turnstileLoader = null; reject(new Error('Turnstile failed to load')) }
    document.head.appendChild(script)
  })
  return turnstileLoader
}

const fieldClass =
  'w-full px-4 py-2.5 rounded-xl text-sm bg-[var(--bg-primary)] text-[var(--text-primary)] ' +
  'border border-[var(--border-color)] placeholder:text-[var(--text-secondary)] placeholder:opacity-60 ' +
  'focus:outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--focus-ring)] ' +
  'transition-colors duration-200 disabled:opacity-60'

const labelClass = 'block text-xs font-semibold text-[var(--text-secondary)] mb-1.5'

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorText, setErrorText] = useState('')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  // Hidden from people; bots that fill every field get silently dropped.
  const [honeypot, setHoneypot] = useState('')

  const turnstileRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string | null>(null)
  const tokenRef = useRef('')

  const sent = status === 'sent'

  // Mount the Turnstile widget while the form is on screen.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || sent) return
    let cancelled = false
    loadTurnstile()
      .then((ts) => {
        if (cancelled || !turnstileRef.current) return
        widgetId.current = ts.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          appearance: 'interaction-only', // invisible unless Cloudflare needs a click
          theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
          callback: (token: string) => { tokenRef.current = token },
          'expired-callback': () => { tokenRef.current = '' },
          'error-callback': () => { tokenRef.current = '' },
        })
      })
      .catch((err) => console.error(err))
    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current)
      widgetId.current = null
      tokenRef.current = ''
    }
  }, [sent])

  const update = (field: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const fail = (text: string) => {
    setErrorText(text)
    setStatus('error')
    // Turnstile tokens are single-use; get a fresh one for the retry.
    tokenRef.current = ''
    if (widgetId.current) window.turnstile?.reset(widgetId.current)
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    if (honeypot) { setStatus('sent'); return }
    if (TURNSTILE_SITE_KEY && !tokenRef.current) {
      fail('The spam check is still running. Please try again in a moment.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, website: honeypot, turnstileToken: tokenRef.current }),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        // 400s carry a message meant for the visitor (e.g. invalid email).
        fail(res.status === 400 && data.error ? data.error : '')
        return
      }
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      console.error('Contact form failed to send:', err)
      fail('')
    }
  }

  if (sent) {
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

      {/* Turnstile mounts here; it stays empty unless a visitor needs to click. */}
      <div ref={turnstileRef} />

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400">
          <FaExclamationCircle className="mt-0.5 flex-shrink-0" />
          <span>
            {errorText || "Your message couldn't be sent. Please try again."} You can also email me at{' '}
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
