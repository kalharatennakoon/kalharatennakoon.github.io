import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-[900] flex h-10 w-10 items-center justify-center rounded-full border border-rule-strong bg-surface text-muted shadow-[var(--shadow-md)] transition-[opacity,transform,color] duration-200 hover:text-ink ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <FaArrowUp className="text-[0.8125rem]" />
    </button>
  )
}

export default ScrollToTop
