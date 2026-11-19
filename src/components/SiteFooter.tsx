/** Shown at the bottom of every page, from App. The extra side/bottom
 * padding keeps the text clear of the floating back-to-top button. */
function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-6 sm:px-24 pt-5 pb-24 sm:pb-5 relative z-10 flex items-center justify-center text-center">
        <p className="m-0 text-xs text-[var(--text-secondary)]">
          © {year} Kalhara Tennakoon. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
