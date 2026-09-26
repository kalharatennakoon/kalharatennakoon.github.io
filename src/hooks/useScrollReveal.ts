import { useEffect, useRef, useState } from 'react'

interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
}

function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  optionsParam: number | ScrollRevealOptions = 0.12
) {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  const threshold = typeof optionsParam === 'number' ? optionsParam : (optionsParam.threshold ?? 0.12)
  const rootMargin = typeof optionsParam === 'object' && optionsParam.rootMargin ? optionsParam.rootMargin : '0px 0px -50px 0px'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return [ref, isVisible] as const
}

export default useScrollReveal
