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

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        width: '2.25rem',
        height: '2.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        border: 'none',
        borderRadius: '50%',
        cursor: 'pointer',
        color: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.2s, color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75' }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
    >
      <FaArrowUp size={11} />
    </button>
  )
}

export default ScrollToTop
