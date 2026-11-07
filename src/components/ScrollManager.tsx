import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * On every navigation: jump to the `#hash` target if there is one
 * (retrying briefly while the page renders), otherwise go to the top.
 * Keyed on location.key so clicking the same link twice still scrolls.
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    let tries = 0
    let timer: number | undefined
    const scrollToTarget = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else if (tries++ < 20) {
        timer = window.setTimeout(scrollToTarget, 50)
      }
    }
    scrollToTarget()
    return () => window.clearTimeout(timer)
  }, [pathname, hash, key])

  return null
}

export default ScrollManager
