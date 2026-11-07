import { Link } from 'react-router-dom'
import usePageTitle from '../hooks/usePageTitle'

function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-8 pt-24 pb-16 bg-[var(--bg-primary)]">
      <div className="text-center">
        <p className="text-6xl font-bold text-[var(--color-primary)] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-3">This page doesn't exist</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-8">The link may be old, or the address may have a typo.</p>
        <Link
          to="/"
          className="glass-btn-primary px-7 py-3 font-semibold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, var(--fill-from), var(--fill-to))' }}
        >
          Back to home
        </Link>
      </div>
    </section>
  )
}

export default NotFoundPage
