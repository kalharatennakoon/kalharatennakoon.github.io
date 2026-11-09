import { FaGithub } from 'react-icons/fa'

const README = 'https://github.com/kalharatennakoon/kalharatennakoon.github.io#how-this-site-is-built'

/** Shown at the bottom of every page, from App. The extra right/bottom
 * padding keeps the text clear of the floating back-to-top button. */
function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-5 pb-24 sm:pb-5 sm:pr-24 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-6 text-center sm:text-left">
        <p className="m-0 text-xs text-[var(--text-secondary)] sm:whitespace-nowrap sm:flex-shrink-0">
          © {year} Kalhara Tennakoon. All Rights Reserved.
        </p>
        <p className="m-0 text-xs">
          <a
            href={README}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline whitespace-nowrap"
          >
            <FaGithub aria-hidden="true" /> How this site is built
          </a>
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
