import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-[1000] bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 hover:shadow-[0_8px_25px_rgba(102,126,234,0.4)] shadow-[0_4px_15px_rgba(102,126,234,0.3)]"
          aria-label="Scroll to top"
          title="Back to top"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </>
  )
}

export default ScrollToTop
