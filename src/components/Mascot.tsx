import { useState, useEffect, useCallback } from 'react'
import { useTheme } from '../hooks/useTheme'
import { FaTimes, FaRobot, FaMagic } from 'react-icons/fa'
import './Mascot.css'

interface Message {
  badge: string
  text: string
  mode: 'devops' | 'ai' | 'writer' | 'general'
}

const mascotMessages: Message[] = [
  {
    badge: '☸️ K8s Scholar',
    text: "Hi! I'm Kubey! Kalhara is a 2x KubeCon & CloudNativeCon Scholar!",
    mode: 'devops',
  },
  {
    badge: '⚡ ML & Solar',
    text: 'Check out SolarCast! Predicts solar generation with 90% confidence using Prophet ML!',
    mode: 'ai',
  },
  {
    badge: '🐳 DevSecOps',
    text: 'Automating Tekton CI/CD pipelines & container security scanning in Kubernetes!',
    mode: 'devops',
  },
  {
    badge: '📝 Tech Writer',
    text: 'Kalhara published 50+ articles on Medium with 150K+ total views!',
    mode: 'writer',
  },
  {
    badge: '💻 Terminal CLI',
    text: 'Pro Tip: You can type `help`, `projects`, or `resume` in the terminal below!',
    mode: 'general',
  },
  {
    badge: '🐾 VetCare Pro',
    text: 'VetCare Pro uses ML disease prediction & RESTful APIs for clinic management!',
    mode: 'ai',
  },
]

interface Particle {
  id: number
  symbol: string
  x: number
  y: number
}

export function Mascot() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const [messageIdx, setMessageIdx] = useState(0)
  const [showBubble, setShowBubble] = useState(true)
  const [animClass, setAnimClass] = useState<'mascot-float-anim' | 'mascot-spin-anim' | 'mascot-bounce-anim'>('mascot-float-anim')
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  // Cycle speech bubbles automatically
  useEffect(() => {
    const timer = setInterval(() => {
      setShowBubble(false)
      setTimeout(() => {
        setMessageIdx((prev) => (prev + 1) % mascotMessages.length)
        setShowBubble(true)
      }, 300)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const spawnParticles = useCallback(() => {
    const symbols = ['< />', '☸️', '⚡', '🚀', '🧠', '💻', '✨']
    const newParticles: Particle[] = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + i,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      x: (Math.random() - 0.5) * 60,
      y: -30 - Math.random() * 40,
    }))
    setParticles((prev) => [...prev.slice(-8), ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)))
    }, 1000)
  }, [])

  const handleMascotClick = () => {
    const nextClick = clickCount + 1
    setClickCount(nextClick)

    // Trigger random fun animation
    if (nextClick % 2 === 0) {
      setAnimClass('mascot-spin-anim')
    } else {
      setAnimClass('mascot-bounce-anim')
    }

    spawnParticles()

    // Cycle to next message immediately on click
    setShowBubble(false)
    setTimeout(() => {
      setMessageIdx((prev) => (prev + 1) % mascotMessages.length)
      setShowBubble(true)
    }, 200)

    // Reset animation class after finish
    setTimeout(() => {
      setAnimClass('mascot-float-anim')
    }, 600)
  }

  const currentMsg = mascotMessages[messageIdx]

  if (isMinimized) {
    return (
      <div className="mascot-wrapper">
        <button
          onClick={() => setIsMinimized(false)}
          className="mascot-interactive px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:scale-105 shadow-lg"
          style={{
            background: isDark
              ? 'linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,58,138,0.9))'
              : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(219,234,254,0.95))',
            border: isDark ? '1px solid rgba(56,189,248,0.4)' : '1px solid rgba(59,130,246,0.4)',
            color: isDark ? '#38bdf8' : '#2563eb',
            backdropFilter: 'blur(12px)',
          }}
          title="Summon Kubey Mascot"
        >
          <FaRobot className="animate-pulse text-sm" />
          <span>Kubey</span>
          <FaMagic className="text-[10px] opacity-70" />
        </button>
      </div>
    )
  }

  return (
    <div className="mascot-wrapper">
      {/* Speech Bubble */}
      {showBubble && (
        <div
          onClick={handleMascotClick}
          className={`mascot-speech-bubble ${isDark ? 'mascot-bubble-dark' : 'mascot-bubble-light'}`}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
              style={{
                background: isDark ? 'rgba(56,189,248,0.2)' : 'rgba(37,99,235,0.15)',
                color: isDark ? '#38bdf8' : '#2563eb',
                border: isDark ? '1px solid rgba(56,189,248,0.3)' : '1px solid rgba(37,99,235,0.3)',
              }}
            >
              {currentMsg.badge}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(true)
              }}
              className="text-xs opacity-60 hover:opacity-100 transition-opacity p-0.5"
              title="Minimize Mascot"
            >
              <FaTimes size={10} />
            </button>
          </div>
          <p className="m-0 text-xs leading-snug font-medium">{currentMsg.text}</p>
        </div>
      )}

      {/* Floating Mascot Vector Container */}
      <div className="relative flex items-center justify-center">
        {/* Spawned Particle Effects */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="mascot-particle"
            style={{
              left: '50%',
              top: '20%',
              '--p-x': `${p.x}px`,
              '--p-y': `${p.y}px`,
              color: isDark ? '#38bdf8' : '#2563eb',
            } as React.CSSProperties}
          >
            {p.symbol}
          </span>
        ))}

        {/* Mascot SVG Body */}
        <div
          onClick={handleMascotClick}
          className={`mascot-interactive ${animClass} group`}
          title="Click Kubey for a fact or trick!"
        >
          <svg
            width="72"
            height="84"
            viewBox="0 0 100 115"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mascot-glow-pulse transition-transform duration-300 group-hover:scale-105"
          >
            {/* Thruster Glow / Energy Beam */}
            <ellipse
              cx="50"
              cy="98"
              rx="18"
              ry="6"
              fill={isDark ? 'url(#thrusterGlowDark)' : 'url(#thrusterGlowLight)'}
              opacity="0.8"
            />
            <path
              d="M40 90 L50 106 L60 90 Z"
              fill={isDark ? 'url(#flameDark)' : 'url(#flameLight)'}
              opacity="0.85"
            />

            {/* Drone Pod / Main Body Base */}
            <rect
              x="26"
              cy="48"
              width="48"
              height="38"
              rx="19"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#38bdf8' : '#3b82f6'}
              strokeWidth="3"
            />
            <rect
              x="30"
              cy="52"
              width="40"
              height="30"
              rx="15"
              fill={isDark ? '#1e293b' : '#f0f9ff'}
            />

            {/* Chest Screen / Tech Display */}
            <rect
              x="36"
              cy="58"
              width="28"
              height="18"
              rx="6"
              fill={isDark ? '#0284c7' : '#2563eb'}
              opacity="0.9"
            />
            <text
              x="50"
              y="71"
              fontSize="10"
              fontWeight="bold"
              fill="#ffffff"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {currentMsg.mode === 'devops'
                ? '☸️'
                : currentMsg.mode === 'ai'
                ? '⚡'
                : currentMsg.mode === 'writer'
                ? '📝'
                : '💻'}
            </text>

            {/* Head Antenna */}
            <line
              x1="50"
              y1="18"
              x2="50"
              y2="28"
              stroke={isDark ? '#38bdf8' : '#3b82f6'}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="15"
              r="6"
              fill={isDark ? '#06b6d4' : '#60a5fa'}
              stroke={isDark ? '#38bdf8' : '#2563eb'}
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="15"
              r="2.5"
              fill="#ffffff"
              className="animate-ping"
              opacity="0.75"
            />

            {/* Head Dome */}
            <rect
              x="22"
              cy="24"
              width="56"
              height="30"
              rx="15"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#38bdf8' : '#3b82f6'}
              strokeWidth="3.5"
            />
            {/* Face Visor Glass */}
            <rect
              x="27"
              cy="29"
              width="46"
              height="20"
              rx="10"
              fill={isDark ? '#020617' : '#1e293b'}
            />

            {/* Glowing LED Eyes */}
            <circle cx="39" cy="39" r="4" fill={isDark ? '#38bdf8' : '#60a5fa'} />
            <circle cx="61" cy="39" r="4" fill={isDark ? '#38bdf8' : '#60a5fa'} />
            <circle cx="40.5" cy="37.5" r="1.5" fill="#ffffff" />
            <circle cx="62.5" cy="37.5" r="1.5" fill="#ffffff" />

            {/* Cute Happy Mouth Line */}
            <path
              d="M46 43 Q50 46 54 43"
              stroke={isDark ? '#38bdf8' : '#60a5fa'}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Side Floating Arms */}
            <circle
              cx="18"
              cy="58"
              r="5"
              fill={isDark ? '#1e293b' : '#dbeafe'}
              stroke={isDark ? '#38bdf8' : '#3b82f6'}
              strokeWidth="2"
            />
            <circle
              cx="82"
              cy="58"
              r="5"
              fill={isDark ? '#1e293b' : '#dbeafe'}
              stroke={isDark ? '#38bdf8' : '#3b82f6'}
              strokeWidth="2"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="flameDark" x1="50" y1="90" x2="50" y2="106" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06b6d4" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="flameLight" x1="50" y1="90" x2="50" y2="106" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="thrusterGlowDark" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 98) scale(18 6)">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="thrusterGlowLight" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(50 98) scale(18 6)">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Mascot
