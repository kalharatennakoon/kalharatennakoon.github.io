import { useEffect, useRef } from 'react'

/*
 * Cursor particle effect — inspired by Google Antigravity.
 *
 * Each particle is a small rotated rectangle (dash) that spawns at the
 * cursor position and scatters outward in a random direction before fading.
 *
 * Key visual properties matching the reference:
 *   • Shape  : thin rectangle (2–4 × 4–12 px), border-radius 2px, random rotation
 *   • Color  : navy/black in light mode, white/silver in dark mode
 *   • Motion : scatter outward (all 360°), eases out quickly, no gravity
 *   • Spawn  : at cursor ± small jitter; rate scales with cursor speed
 */

const PALETTE_LIGHT = [
  '23,  37,  84',   // navy (#172554)
  '30,  58, 138',   // lighter navy
  '15,  23,  42',   // navy-black
  '10,  10,  10',   // black
  '51,  65,  85',   // slate
]
const PALETTE_DARK = [
  '255, 255, 255',  // white
  '226, 232, 240',  // silver
  '203, 213, 225',  // light slate
  '148, 163, 184',  // grey
  '191, 219, 254',  // pale navy tint
]

function CursorBubbles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastTimeRef  = useRef(0)
  const lastXRef     = useRef(0)
  const lastYRef     = useRef(0)
  const countRef     = useRef(0)
  const MAX_PARTICLES = 100

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const spawn = (cx: number, cy: number) => {
      if (countRef.current >= MAX_PARTICLES) return

      const isDark  = document.documentElement.getAttribute('data-theme') === 'dark'
      const palette = isDark ? PALETTE_DARK : PALETTE_LIGHT

      /* ── Particle geometry ── */
      const w        = 1.5 + Math.random() * 2.5        // 1.5–4 px wide
      const h        = 3.5 + Math.random() * 8.5        // 3.5–12 px tall
      const rotation = Math.random() * 360              // random tilt

      /* ── Spawn position: slight jitter around cursor ── */
      const jitter = 6
      const x = cx + (Math.random() - 0.5) * jitter
      const y = cy + (Math.random() - 0.5) * jitter

      /* ── Scatter vector (screen-space) ── */
      const dist = 28 + Math.random() * 70             // 28–98 px
      const dir  = Math.random() * Math.PI * 2         // any direction
      const endX = Math.cos(dir) * dist
      const endY = Math.sin(dir) * dist

      /* ── Timing & colour ── */
      const dur  = 650 + Math.random() * 850           // 0.65–1.5 s
      const opa  = isDark
        ? 0.35 + Math.random() * 0.40                  // softer on dark bg
        : 0.50 + Math.random() * 0.40                  // punchy on light bg
      const col  = palette[Math.floor(Math.random() * palette.length)]

      const el = document.createElement('div')
      el.style.cssText = `
        position:fixed;
        left:${x - w / 2}px;
        top:${y - h / 2}px;
        width:${w}px;
        height:${h}px;
        border-radius:2px;
        background:rgba(${col},${opa});
        pointer-events:none;
        will-change:transform,opacity;
      `
      container.appendChild(el)
      countRef.current++

      /*
       * translate() comes BEFORE rotate() so the scatter direction is
       * in screen-space coordinates, unaffected by the element's rotation.
       */
      el.animate(
        [
          {
            transform: `translate(0px, 0px) rotate(${rotation}deg)`,
            opacity: opa,
          },
          {
            transform: `translate(${endX}px, ${endY}px) rotate(${rotation}deg)`,
            opacity: 0,
          },
        ],
        {
          duration: dur,
          easing: 'cubic-bezier(0.05, 0.85, 0.35, 1)',
          fill: 'forwards',
        }
      ).onfinish = () => {
        el.remove()
        countRef.current--
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const now   = Date.now()
      const dx    = e.clientX - lastXRef.current
      const dy    = e.clientY - lastYRef.current
      const speed = Math.sqrt(dx * dx + dy * dy)

      /* Throttle: 22 ms between spawns; ignore micro-movements */
      if (now - lastTimeRef.current < 22 || speed < 2.5) return
      lastTimeRef.current = now
      lastXRef.current    = e.clientX
      lastYRef.current    = e.clientY

      /* More particles for faster cursor movement (1 → 4) */
      const burst = Math.min(4, 1 + Math.floor(speed / 13))
      for (let i = 0; i < burst; i++) spawn(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 9990 }}
    />
  )
}

export default CursorBubbles
