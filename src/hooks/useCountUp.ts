import { useEffect, useRef, useState } from 'react'

interface CountUpOptions {
  duration?: number
  delay?: number
}

/**
 * Counts from 0 up to `target` on mount, easing out so the number sprints
 * away from zero and settles gently on its final digits.
 *
 * Jumps straight to the target under prefers-reduced-motion — a ticking
 * number is exactly the kind of motion that setting asks us to drop.
 */
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function useCountUp(target: number, { duration = 1600, delay = 0 }: CountUpOptions = {}) {
  // Seeded rather than assigned in the effect, so the reduced-motion case
  // renders the final number on the very first paint — no flash of zero.
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))
  const frame = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      frame.current = requestAnimationFrame(() => setValue(target))
      return () => cancelAnimationFrame(frame.current)
    }

    let startedAt = 0
    const tick = (now: number) => {
      if (!startedAt) startedAt = now
      const t = Math.min((now - startedAt) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Math.round(target * eased))
      if (t < 1) frame.current = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
      frame.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frame.current)
    }
  }, [target, duration, delay])

  return value
}

export default useCountUp
