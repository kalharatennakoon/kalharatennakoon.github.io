import { FaEnvelope, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa'

function Contact() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <section id="contact" className="py-20 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] dark:from-[var(--bg-primary)] dark:via-[var(--bg-secondary)] dark:to-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center">
            <h2 className="text-5xl mb-4 text-[var(--text-primary)] font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-[#667eea] mb-4 font-medium">
            Let's connect and build something amazing together
          </p>
          <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, opportunities, or collaborations. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <a 
              href="mailto:kalharatennakoonmck@gmail.com" 
              className="group bg-[var(--card-bg)] py-10 px-8 rounded-2xl transition-all duration-300 border-2 border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] flex flex-col items-center gap-4 hover:-translate-y-2 hover:border-[#667eea] hover:shadow-[0_8px_30px_rgba(102,126,234,0.3)] backdrop-blur-sm hover:bg-gradient-to-br hover:from-[rgba(102,126,234,0.05)] hover:to-[rgba(118,75,162,0.05)]"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-3xl text-white transition-all group-hover:scale-110 group-hover:rotate-[5deg]">
                <FaEnvelope />
              </div>
              <h3 className="text-xl text-[var(--text-primary)] m-0 font-semibold">
                Email
              </h3>
            </a>

            <a 
              href="https://github.com/kalharatennakoon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-[var(--card-bg)] py-10 px-8 rounded-2xl transition-all duration-300 border-2 border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] flex flex-col items-center gap-4 hover:-translate-y-2 hover:border-[#667eea] hover:shadow-[0_8px_30px_rgba(102,126,234,0.3)] backdrop-blur-sm hover:bg-gradient-to-br hover:from-[rgba(102,126,234,0.05)] hover:to-[rgba(118,75,162,0.05)]"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_8px_20px_rgba(102,126,234,0.5)]">
                <FaGithub />
              </div>
              <h3 className="text-xl text-[var(--text-primary)] m-0 font-semibold">
                GitHub
              </h3>
            </a>

            <a 
              href="https://linkedin.com/in/kalharatennakoon" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-[var(--card-bg)] py-10 px-8 rounded-2xl transition-all duration-300 border-2 border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] flex flex-col items-center gap-4 hover:-translate-y-2 hover:border-[#667eea] hover:shadow-[0_8px_30px_rgba(102,126,234,0.3)] backdrop-blur-sm hover:bg-gradient-to-br hover:from-[rgba(102,126,234,0.05)] hover:to-[rgba(118,75,162,0.05)]"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_8px_20px_rgba(102,126,234,0.5)]">
                <FaLinkedin />
              </div>
              <h3 className="text-xl text-[var(--text-primary)] m-0 font-semibold">
                LinkedIn
              </h3>
            </a>

            <a 
              href="https://kalharatennakoon.medium.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-[var(--card-bg)] py-10 px-8 rounded-2xl transition-all duration-300 border-2 border-[var(--border-color)] shadow-[0_4px_15px_var(--shadow)] flex flex-col items-center gap-4 hover:-translate-y-2 hover:border-[#667eea] hover:shadow-[0_8px_30px_rgba(102,126,234,0.3)] backdrop-blur-sm hover:bg-gradient-to-br hover:from-[rgba(102,126,234,0.05)] hover:to-[rgba(118,75,162,0.05)]"
            >
              <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-3xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[5deg] group-hover:shadow-[0_8px_20px_rgba(102,126,234,0.5)]">
                <FaMedium />
              </div>
              <h3 className="text-xl text-[var(--text-primary)] m-0 font-semibold">
                Medium
              </h3>
            </a>
          </div>
          </div>
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 bg-[var(--card-bg)]/95 backdrop-blur-md border-t border-[var(--border-color)] py-5 z-50 shadow-[0_-4px_20px_var(--shadow)]">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(102,126,234,0.03)] via-transparent to-[rgba(118,75,162,0.03)]"></div>
        <div className="max-w-6xl mx-auto px-8 relative z-10">
          <div className="text-center">
            <p className="text-[var(--text-primary)] text-sm m-0 mb-1 font-semibold tracking-wide">
              © {currentYear} Kalhara Tennakoon. All Rights Reserved.
            </p>
            <p className="text-[var(--text-secondary)] text-xs m-0 opacity-70">
              Crafted with ❤️ and ☕
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Contact
