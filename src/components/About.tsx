import { FaTerminal } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import Terminal from './Terminal'

const researchInterests = [
  'MLOps & Machine Learning Systems',
  'LLM Applications & Retrieval-Augmented Generation',
  'AI Infrastructure',
  'Agentic AI Systems',
  'Cloud Security & DevSecOps',
]

function About() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2)
  const [termRef, termVisible] = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="about" className="py-16 md:py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]" style={{ contain: 'paint' }}>

      {/* Subtle background blob — kept inside section bounds */}
      <div
        className="blob-shape w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.18), transparent)',
          top: '0px',
          right: '-80px',
          animationDuration: '18s',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-8 relative z-10">

        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-10 reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 inline-block bg-clip-text text-transparent animate-gradient-text pb-1"
            style={{ backgroundImage: 'linear-gradient(135deg, var(--color-primary) 0%, #3b82f6 50%, #06b6d4 100%)', backgroundSize: '200% 200%' }}
          >
            About Me
          </h2>
          <div className={`section-underline ${isVisible ? 'is-visible' : ''}`} />
        </div>

        {/* Quote card */}
        <div
          className={`relative text-center px-4 md:px-10 reveal ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.15s' }}
        >
          {/* Glassmorphism card */}
          <div className="glass-card rounded-2xl px-8 md:px-14 py-10 shimmer-hover">
            {/* Decorative blobs inside card */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(6,182,212,0.08)' }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl pointer-events-none"
              style={{ background: 'rgba(30,58,138,0.08)' }}
            />

            <p
              className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] m-0 px-4 relative z-10"
              style={{ fontFamily: '"Handlee", cursive', fontWeight: 400 }}
            >
              DevOps Engineer driven by a strong passion for CI/CD automation, container orchestration, and cloud-native systems.
              Microsoft Azure certified with hands-on experience in Kubernetes, Docker, Tekton, and ArgoCD.
              Deeply interested in the convergence of DevOps and AI, with a growing focus on MLOps and building scalable, intelligent systems.
            </p>
          </div>
        </div>

        {/* Academic profile */}
        <div
          className={`mt-8 grid grid-cols-1 md:grid-cols-5 gap-6 reveal ${isVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.3s' }}
        >
          <div className="md:col-span-3 bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] transition-all duration-300 overflow-hidden shimmer-hover">
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), #06b6d4)' }} />
            <div className="px-7 py-6">
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Academic Profile</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed m-0">
                Computer Science graduate with First Class Honours, ranked top of the Software Engineering batch at ESU Kandy, with industry experience in cloud-native systems and DevOps automation at IFS R&amp;D International. My undergraduate work applies machine learning to real problems: a final-year veterinary clinic management system with ML forecasting models (Grade A), later extended with a local RAG assistant that reached the Top 10 of the Ascentic AI Launch Pad, and a statistical study predicting perceived course difficulty from student evaluations. I am seeking graduate study at the intersection of machine learning and reliable, secure systems infrastructure.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-[var(--card-bg)] rounded-2xl shadow-[0_4px_15px_var(--shadow)] border border-[var(--border-color)] hover:border-[rgba(30,58,138,0.4)] transition-all duration-300 overflow-hidden shimmer-hover">
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, var(--color-primary), #06b6d4)' }} />
            <div className="px-7 py-6">
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-3">Research Interests</p>
              <div className="flex flex-wrap gap-2">
                {researchInterests.map((interest) => (
                  <span key={interest} className="px-3 py-1 bg-[rgba(30,58,138,0.08)] text-[var(--color-primary)] rounded-full text-xs font-medium border border-[rgba(30,58,138,0.2)] hover:bg-[rgba(30,58,138,0.14)] transition-colors">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive shell */}
        <div
          ref={termRef}
          className={`mt-14 reveal ${termVisible ? 'is-visible' : ''}`}
          style={{ transitionDelay: '0.1s' }}
        >
          <div className="text-center mb-5">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
              style={{
                background: 'rgba(30,58,138,0.1)',
                border: '1px solid rgba(30,58,138,0.2)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
              }}
            >
              <FaTerminal />
              Interactive shell
            </div>
            <p className="text-sm md:text-base text-[var(--text-secondary)] max-w-xl mx-auto m-0 leading-relaxed">
              I automate infrastructure for a living, so this portfolio ships with a working shell.
              Explore it like you would a cluster — type a command, or click one below.
            </p>
          </div>

          <Terminal />
        </div>
      </div>
    </section>
  )
}

export default About
