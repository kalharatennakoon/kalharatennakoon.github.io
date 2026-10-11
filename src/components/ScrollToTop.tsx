import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top"
      className="glass-btn-primary fixed bottom-8 right-8 z-[1000] w-12 h-12 cursor-pointer transition-all duration-300 text-white"
      style={{
        position: 'fixed',
        background: 'linear-gradient(135deg, var(--color-primary), #3b82f6, #06b6d4)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.8)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.12)' }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)' }}
    >
      <FaArrowUp className="text-base relative z-10" />
    </button>
  )
}

export default ScrollToTop
