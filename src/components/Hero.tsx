import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'

const roles = [
  'Aspiring DevOps Engineer',
  'Cloud-Native Developer',
  'CI/CD Automation Engineer',
  'Kubernetes & Containerization Engineer',
]

function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length
      const fullText = roles[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section className="min-h-screen flex items-center bg-[var(--bg-primary)] relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-between gap-12 py-32">
        {/* Left: text */}
        <div className="flex-1 animate-fade-in-up text-left">
          <div className="text-lg font-light mb-2 text-[var(--text-secondary)] tracking-[2px] uppercase">Hello, I'm</div>
          <h1 className="text-5xl md:text-6xl mb-4 font-extrabold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-2)] bg-clip-text text-transparent leading-tight">
            Kalhara Tennakoon
          </h1>
          <h2 className="text-3xl font-normal mb-6 min-h-[3rem] flex items-center gap-1">
            <span className="text-[var(--color-primary)] font-medium">{text}</span>
            <span className="text-[var(--color-primary)] font-light animate-blink">|</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Automating delivery pipelines and building reliable systems with cloud-native technologies
          </p>
        </div>

        {/* Right: profile photo */}
        <div className="flex-shrink-0 animate-fade-in-up">
          <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden">
            <img
              src="/profile.png"
              alt="Kalhara Tennakoon"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-70 cursor-pointer">
        <a href="#about" className="text-[var(--color-primary)] flex items-center justify-center">
          <FaArrowDown className="text-3xl" />
        </a>
      </div>
    </section>
  )
}

export default Hero
