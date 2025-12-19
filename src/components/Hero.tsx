import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

const roles = [
'Aspiring DevOps Engineer',
'Cloud-Native Developer',
'CI/CD Automation Engineer',
'Kubernetes & Containerization Engineer'
]


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
  }, [text, isDeleting, loopNum, typingSpeed, roles])

  return (
    <section className="min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white relative overflow-hidden dark:from-[#4c51bf] dark:to-[#5a3d7a]">
      <ThemeToggle />
      
      {/* Decorative background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-[20%] w-1/2 h-1/2 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 animate-fade-in-up">
        <div className="text-2xl font-light mb-2 opacity-90 tracking-[2px] uppercase">Hello, I'm</div>
        <h1 className="text-6xl md:text-7xl mb-4 font-extrabold bg-gradient-to-r from-white to-indigo-100 bg-clip-text text-transparent leading-tight">
          Kalhara Tennakoon
        </h1>
        <h2 className="text-4xl font-normal mb-6 min-h-[3.5rem] flex items-center justify-center gap-1">
          <span className="text-accent font-medium">{text}</span>
          <span className="text-accent font-light animate-blink">|</span>
        </h2>
        <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed px-4">
          Automating delivery pipelines and building reliable systems with cloud-native technologies
        </p>
        <div className="flex gap-6 justify-center flex-wrap">
          <a 
            href="https://github.com/kalharatennakoon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/15 rounded-xl text-white border-2 border-white/20 font-medium flex items-center gap-2 hover:bg-white/25 hover:-translate-y-1 hover:border-white/40 transition-all backdrop-blur-md"
          >
            <span className="text-xl">💻</span> GitHub
          </a>
          <a 
            href="https://linkedin.com/in/kalharatennakoon" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white/15 rounded-xl text-white border-2 border-white/20 font-medium flex items-center gap-2 hover:bg-white/25 hover:-translate-y-1 hover:border-white/40 transition-all backdrop-blur-md"
          >
            <span className="text-xl">💼</span> LinkedIn
          </a>
          <a 
            href="#contact"
            className="px-8 py-4 bg-white/15 rounded-xl text-white border-2 border-white/20 font-medium flex items-center gap-2 hover:bg-white/25 hover:-translate-y-1 hover:border-white/40 transition-all backdrop-blur-md"
          >
            <span className="text-xl">📧</span> Contact
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow text-3xl opacity-70 cursor-pointer">
        <span>↓</span>
      </div>
    </section>
  )
}

export default Hero
