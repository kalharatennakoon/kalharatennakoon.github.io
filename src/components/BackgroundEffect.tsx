import { memo } from 'react'

/**
 * Modern ambient lighting and cyber-mesh background.
 * Provides rich visual depth with smooth floating radiant orbs and subtle grid matrix.
 */
function BackgroundEffectComponent() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Dynamic Cyber Tech Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07] transition-opacity duration-700"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 100%)',
        }}
      />

      {/* Radiant Glowing Orbs (Floating Ambient Aurora) */}
      <div
        className="absolute -top-[15%] left-[10%] w-[550px] h-[550px] rounded-full blur-[120px] opacity-25 dark:opacity-20 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, #3b82f6 50%, transparent 70%)',
          animationDuration: '18s',
        }}
      />

      <div
        className="absolute top-[35%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[130px] opacity-20 dark:opacity-15 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, #8b5cf6 50%, transparent 70%)',
          animationDuration: '24s',
          animationDelay: '-6s',
        }}
      />

      <div
        className="absolute top-[65%] -left-[12%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 dark:opacity-15 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #0284c7 50%, transparent 70%)',
          animationDuration: '22s',
          animationDelay: '-12s',
        }}
      />

      <div
        className="absolute bottom-[-10%] right-[15%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-20 dark:opacity-15 animate-float pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #3b82f6 0%, #10b981 50%, transparent 70%)',
          animationDuration: '26s',
          animationDelay: '-16s',
        }}
      />

      {/* Vignette overlay for cinematic contrast */}
      <div
        className="absolute inset-0 bg-radial-[circle_at_center,_transparent_50%,_var(--bg-primary)_100%] opacity-40 dark:opacity-70 pointer-events-none"
      />
    </div>
  )
}

export const BackgroundEffect = memo(BackgroundEffectComponent)
