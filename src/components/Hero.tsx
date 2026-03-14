import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from 'react-icons/fa'

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
    <section className="min-h-screen flex items-center justify-center text-center bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-1/2 h-1/2 bg-gradient-to-br from-[rgba(102,126,234,0.08)] to-[rgba(118,75,162,0.08)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-[20%] w-1/2 h-1/2 bg-gradient-to-br from-[rgba(118,75,162,0.08)] to-[rgba(102,126,234,0.08)] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 animate-fade-in-up px-4">
        <div className="text-2xl font-light mb-2 text-[var(--text-secondary)] tracking-[2px] uppercase">Hello, I'm</div>
        <h1 className="text-6xl md:text-7xl mb-4 font-extrabold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent leading-tight">
          Kalhara Tennakoon
        </h1>
        <h2 className="text-4xl font-normal mb-6 min-h-[3.5rem] flex items-center justify-center gap-1">
          <span className="text-[#667eea] font-medium">{text}</span>
          <span className="text-[#667eea] font-light animate-blink">|</span>
        </h2>
        <p className="text-xl mb-10 text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed px-4">
          Automating delivery pipelines and building reliable systems with cloud-native technologies
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <a
            href="https://github.com/kalharatennakoon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl text-white border-2 border-transparent font-medium flex items-center gap-2 hover:opacity-90 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(102,126,234,0.4)] transition-all"
          >
            <FaGithub className="text-xl" /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kalharatennakoon"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl text-[#667eea] border-2 border-[rgba(102,126,234,0.4)] font-medium flex items-center gap-2 hover:bg-[rgba(102,126,234,0.08)] hover:-translate-y-1 hover:border-[#667eea] transition-all"
          >
            <FaLinkedin className="text-xl" /> LinkedIn
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl text-[#667eea] border-2 border-[rgba(102,126,234,0.4)] font-medium flex items-center gap-2 hover:bg-[rgba(102,126,234,0.08)] hover:-translate-y-1 hover:border-[#667eea] transition-all"
          >
            <FaEnvelope className="text-xl" /> Contact
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow opacity-70 cursor-pointer">
        <a href="#about" className="text-[#667eea] flex items-center justify-center">
          <FaArrowDown className="text-3xl" />
        </a>
      </div>
    </section>
  )
}

export default Hero
