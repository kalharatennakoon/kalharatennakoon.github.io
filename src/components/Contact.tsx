import type { CSSProperties } from 'react'
import {
  FaEnvelope, FaGithub, FaLinkedin, FaMedium,
  FaStackOverflow, FaHeart
} from 'react-icons/fa'
import { FaMugHot } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { SiBluesky } from 'react-icons/si'
import useScrollReveal from '../hooks/useScrollReveal'

/**
 * Start vector + overshoot for one fly-in. The animation itself lives in
 * index.css; each element only supplies where it comes from.
 *
 * `x`/`y` are the off-screen start, `rot` the angle it tumbles in at, and the
 * `o*` values the slight overshoot at the 60% mark before it settles.
 */
interface FlyVector {
  x: string
  y: string
  rot: string
  ox: string
  oy: string
  orot: string
}

const fly = (v: FlyVector, delay: number) => ({
  '--fly-x': v.x,
  '--fly-y': v.y,
  '--fly-rot': v.rot,
  '--fly-ox': v.ox,
  '--fly-oy': v.oy,
  '--fly-orot': v.orot,
  // Rounded because 0.7 + 3 * 0.1 lands on 0.7999999999999999 otherwise.
  '--fly-delay': `${Math.round(delay * 1000) / 1000}s`,
} as CSSProperties)

/* The card sweeps in from off the top-left of the section. */
const CARD_VECTOR: FlyVector = {
  x: '-125vw', y: '-70vh', rot: '-38deg',
  ox: '18px',  oy: '10px', orot: '3deg',
}

/* Social buttons alternate corners so the row assembles from every side.
   Travel is in px, not vw: these live inside the card, which clips its own
   overflow, so a viewport-scale start would simply be invisible until it
   crossed the card edge. */
const BUTTON_VECTORS: FlyVector[] = [
  { x: '-115px', y:   '95px', rot: '-32deg', ox:  '6px', oy: '-5px', orot:  '4deg' },
  { x:  '110px', y:  '-95px', rot:  '30deg', ox: '-6px', oy:  '5px', orot: '-4deg' },
  { x: '-120px', y:  '-88px', rot: '-28deg', ox:  '5px', oy:  '5px', orot:  '3deg' },
  { x:  '118px', y:   '92px', rot:  '34deg', ox: '-5px', oy: '-5px', orot: '-3deg' },
  { x:    '0px', y: '-125px', rot:  '24deg', ox:  '0px', oy:  '6px', orot: '-3deg' },
  { x: '-108px', y:  '100px', rot: '-35deg', ox:  '6px', oy: '-4px', orot:  '4deg' },
  { x:  '114px', y:  '-86px', rot:  '29deg', ox: '-6px', oy:  '4px', orot: '-4deg' },
]

const contactLinks = [
  { href: 'mailto:kalharatennakoonmck@gmail.com', icon: <FaEnvelope />, label: 'Email', external: false },
  { href: 'https://www.linkedin.com/in/kalharatennakoon', icon: <FaLinkedin />, label: 'LinkedIn', external: true },
  { href: 'https://github.com/kalharatennakoon', icon: <FaGithub />, label: 'GitHub', external: true },
  { href: 'https://kalharatennakoon.medium.com', icon: <FaMedium />, label: 'Medium', external: true },
  { href: 'https://x.com/_KalharaT', icon: <FaXTwitter />, label: 'X', external: true },
  { href: 'https://bsky.app/profile/kalharatennakoon.bsky.social', icon: <SiBluesky />, label: 'Bluesky', external: true },
  { href: 'https://stackoverflow.com/users/13018789/kalhara-tennakoon', icon: <FaStackOverflow />, label: 'Stack Overflow', external: true },
]

function Contact() {
  const currentYear = new Date().getFullYear()
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>()
  const [cardRef, cardVisible] = useScrollReveal<HTMLDivElement>(0.15)

  return (
    <>
      <section id="contact" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden dark:bg-[var(--bg-primary)]">

        {/* Background blobs */}
        <div
          className="blob-shape w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.1), rgba(6,182,212,0.06), transparent)',
            top: '-150px',
            right: '-120px',
            animationDuration: '20s',
          }}
        />
        <div
          className="blob-shape w-[300px] h-[300px]"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,138,0.07), transparent)',
            bottom: '-80px',
            left: '-60px',
            animationDelay: '-8s',
            animationDuration: '15s',
          }}
        />

        <div className={`max-w-6xl mx-auto px-8 relative z-10 fly-stage ${cardVisible ? 'is-flying' : ''}`}>

          {/* Section header */}
          <div
            ref={headerRef}
            className={`text-center mb-12 reveal ${headerVisible ? 'is-visible' : ''}`}
          >
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-[var(--color-primary)] opacity-30 rounded-full" />
                <FaEnvelope className="relative text-3xl text-[var(--color-primary)]" />
              </div>
              <h2
                className="text-5xl font-bold bg-clip-text text-transparent animate-gradient-text pb-1"
                style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
              >
                Get In Touch
              </h2>
            </div>
            <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          </div>

          {/* Social card */}
          <div
            ref={cardRef}
            className="max-w-2xl mx-auto fly-in"
            style={fly(CARD_VECTOR, 0)}
          >
            <div className="bg-[var(--card-bg)] rounded-2xl shadow-[0_8px_32px_var(--shadow)] border border-[var(--border-color)] overflow-hidden shimmer-hover">
              {/* Gradient accent top */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), #3b82f6, #06b6d4)' }} />

              {/* Card header */}
              <div
                className="px-8 pt-6 pb-5 border-b border-[var(--border-color)] bg-gradient-to-r from-[rgba(30,58,138,0.05)] to-transparent fly-in"
                style={fly({ x: '-60px', y: '0px', rot: '-6deg', ox: '5px', oy: '0px', orot: '1deg' }, 0.5)}
              >
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Let's Connect</h3>
                <p className="text-sm text-[var(--text-secondary)] m-0 leading-relaxed">
                  Feel free to reach out through any of the platforms below.
                </p>
              </div>

              {/* Social links */}
              <div className="px-8 py-7">
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] mb-5">Find me on</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {contactLinks.map((link, i) => (
                    /* The vector rides the wrapper, not the button: .glass-btn
                       animates its own transform on hover, and a filled
                       animation on the same element would outrank it. */
                    <div
                      key={link.label}
                      className="relative group fly-in"
                      style={fly(BUTTON_VECTORS[i], 0.7 + i * 0.1)}
                    >
                      <a
                        href={link.href}
                        {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="glass-btn w-12 h-12 text-lg text-[var(--color-primary)] transition-all duration-300"
                        onMouseEnter={(e) => {
                          const el = e.currentTarget
                          el.style.background = 'linear-gradient(135deg, var(--color-primary), #06b6d4)'
                          el.style.color = '#fff'
                          el.style.borderColor = 'transparent'
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget
                          el.style.background = ''
                          el.style.color = ''
                          el.style.borderColor = ''
                        }}
                      >
                        {link.icon}
                      </a>
                      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                        style={{ background: 'linear-gradient(135deg, var(--color-primary), #06b6d4)' }}
                      >
                        {link.label}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--color-primary)]" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] py-3 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="max-w-6xl mx-auto px-8 text-center relative z-10">
          <p className="text-[var(--text-primary)] text-xs font-semibold m-0 mb-1">
            © {currentYear} Kalhara Tennakoon. All Rights Reserved.
          </p>
          <p className="text-[var(--text-secondary)] text-xs flex items-center justify-center gap-1 opacity-60 m-0">
            Crafted with <FaHeart className="text-red-500" /> and <FaMugHot className="text-amber-700" />
          </p>
        </div>
      </footer>
    </>
  )
}

export default Contact
