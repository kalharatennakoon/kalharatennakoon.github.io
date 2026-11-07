/**
 * Contact form endpoint: POST /contact with JSON
 *   { name, email, subject?, message, website?, turnstileToken? }
 * Emails the message to CONTACT_TO with Reply-To set to the visitor.
 */

import { EmailMessage } from 'cloudflare:email'

/*
 * Sending uses Email Routing's Workers integration (free plan): a raw MIME
 * message via EmailMessage, delivered only to addresses verified as Email
 * Routing destinations, from an address on the routing domain. The newer
 * structured send() needs Email Sending onboarding, which is Workers Paid.
 */
interface Env {
  EMAIL: SendEmail
  CONTACT_TO: string
  DISPLAY_TO: string
  TURNSTILE_SECRET?: string
  FROM_ADDRESS: string
  FROM_NAME: string
  ALLOWED_ORIGINS: string
}

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000, minMessage: 10 }
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin && allowed.includes(origin)) headers['Access-Control-Allow-Origin'] = origin
  return headers
}

function json(body: unknown, status: number, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })
}

/** Single line, trimmed: keeps names and subjects out of header territory. */
const oneLine = (v: unknown) => (typeof v === 'string' ? v.replace(/[\r\n\t]+/g, ' ').trim() : '')

/** RFC 2047 encoded-word, so names and subjects can hold any Unicode safely. */
const encodeHeader = (v: string) =>
  /^[\x20-\x7e]*$/.test(v) ? v : `=?UTF-8?B?${toBase64(v)}?=`

const formatAddress = (email: string, name?: string) =>
  name ? `${encodeHeader(name.replace(/["\\]/g, ''))} <${email}>` : `<${email}>`

function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

/** Plain-text UTF-8 message; base64 body wrapped at 76 chars per RFC 2045. */
function buildMime(o: { from: string; fromName: string; to: string; toName: string; replyTo: string; replyName: string; subject: string; text: string }): string {
  const domain = o.from.split('@')[1]
  const body = toBase64(o.text).replace(/.{1,76}/g, '$&\r\n')
  return [
    `From: ${formatAddress(o.from, o.fromName)}`,
    `To: ${formatAddress(o.to, o.toName)}`,
    `Reply-To: ${formatAddress(o.replyTo, o.replyName)}`,
    `Subject: ${encodeHeader(o.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@${domain}>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n')
}

async function verifyTurnstile(token: string, ip: string | null, secret: string): Promise<boolean> {
  const form = new FormData()
  form.append('secret', secret)
  form.append('response', token)
  if (ip) form.append('remoteip', ip)
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
  const data = (await res.json()) as { success?: boolean; 'error-codes'?: string[]; hostname?: string }
  if (!data.success) console.warn('turnstile rejected', JSON.stringify(data['error-codes']), data.hostname)
  return data.success === true
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin')
    const cors = corsHeaders(origin, env)
    const url = new URL(request.url)

    if (url.pathname !== '/contact') return json({ ok: false, error: 'Not found' }, 404, cors)
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
    if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405, cors)
    // Browsers always send Origin on cross-site POSTs; this blocks other sites' pages.
    if (!cors['Access-Control-Allow-Origin']) return json({ ok: false, error: 'Origin not allowed' }, 403, cors)

    let body: Record<string, unknown>
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: 'Invalid request' }, 400, cors)
    }

    // Honeypot filled in: pretend it worked so bots don't retry.
    if (oneLine(body.website)) return json({ ok: true }, 200, cors)

    const name = oneLine(body.name)
    const email = oneLine(body.email)
    const subject = oneLine(body.subject)
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || name.length > LIMITS.name) return json({ ok: false, error: 'Please enter your name.' }, 400, cors)
    if (!EMAIL_RE.test(email) || email.length > LIMITS.email) return json({ ok: false, error: 'Please enter a valid email address.' }, 400, cors)
    if (subject.length > LIMITS.subject) return json({ ok: false, error: 'Subject is too long.' }, 400, cors)
    if (message.length < LIMITS.minMessage || message.length > LIMITS.message) {
      return json({ ok: false, error: `Message must be ${LIMITS.minMessage}–${LIMITS.message} characters.` }, 400, cors)
    }

    if (env.TURNSTILE_SECRET) {
      const token = typeof body.turnstileToken === 'string' ? body.turnstileToken : ''
      const human = token && (await verifyTurnstile(token, request.headers.get('CF-Connecting-IP'), env.TURNSTILE_SECRET))
      if (!human) return json({ ok: false, error: 'Spam check failed. Please try again.' }, 400, cors)
    }

    const finalSubject = subject || `Message from ${name}`
    const text = [
      'You have a new message from your portfolio contact form.',
      '',
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Subject: ${finalSubject}`,
      '',
      message,
      '',
      '—',
      `Reply to this email to respond directly to ${name}.`,
    ].join('\n')

    try {
      const raw = buildMime({
        from: env.FROM_ADDRESS,
        fromName: env.FROM_NAME,
        // Shown in the To line; actual delivery goes to the verified CONTACT_TO
        // inbox (the address this one forwards to), like a Bcc.
        to: env.DISPLAY_TO,
        toName: 'Kalhara Tennakoon',
        replyTo: email,
        replyName: name,
        subject: `New message: ${finalSubject}`,
        text,
      })
      await env.EMAIL.send(new EmailMessage(env.FROM_ADDRESS, env.CONTACT_TO, raw))
    } catch (err) {
      const e = err as { code?: string; message?: string }
      console.error('send failed', e.code, e.message)
      return json({ ok: false, error: 'Message could not be sent.' }, 502, cors)
    }

    return json({ ok: true }, 200, cors)
  },
}
