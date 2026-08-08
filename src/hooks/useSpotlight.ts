import { useEffect } from 'react'

/**
 * Publishes the pointer's position over any card root as --spot-x / --spot-y,
 * which the `.shimmer-hover::before` gradient in index.css reads to paint a
 * cursor-following spotlight.
 *
 * One delegated listener instead of one per card: the card count is dynamic
 * (Blog fetches its posts at runtime), so delegation wires up every current
 * and future card for free. Position reads and style writes are batched into
 * a single rAF, so sweeping across a grid costs one layout read per frame
 * rather than one per pointer event.
 */
function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let pending: { el: HTMLElement; clientX: number; clientY: number } | null = null

    const flush = () => {
      frame = 0
      if (!pending) return
      const { el, clientX, clientY } = pending
      pending = null
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${clientY - rect.top}px`)
    }

    const onMove = (e: PointerEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const card = target.closest<HTMLElement>('.shimmer-hover')
      if (!card) return
      pending = { el: card, clientX: e.clientX, clientY: e.clientY }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}

export default useSpotlight
