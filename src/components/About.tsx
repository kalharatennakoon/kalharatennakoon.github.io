import useScrollReveal from '../hooks/useScrollReveal'

function About() {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>(0.2)

  return (
    <section id="about" className="py-16 md:py-20 bg-[var(--bg-primary)] relative overflow-hidden dark:bg-[var(--bg-secondary)]">

      {/* Subtle background blob */}
      <div
        className="blob-shape w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(30,58,138,0.18), transparent)',
          top: '-100px',
          right: '-80px',
          animationDuration: '18s',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-8 relative z-10">

        {/* Section header */}
        <div
          ref={ref}
          className={`text-center mb-10 reveal ${isVisible ? 'is-visible' : ''}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-3 inline-block bg-clip-text text-transparent animate-gradient-text"
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

            <span
              className="text-6xl md:text-7xl text-[var(--color-primary)] opacity-20 leading-none select-none absolute -top-3 left-4 md:left-8"
              style={{ fontFamily: '"Handlee", cursive' }}
            >
              "
            </span>

            <p
              className="text-lg md:text-xl leading-relaxed text-[var(--text-primary)] m-0 px-4 relative z-10"
              style={{ fontFamily: '"Handlee", cursive', fontWeight: 400 }}
            >
              DevOps Engineer driven by a strong passion for CI/CD automation, container orchestration, and cloud-native systems.
              Microsoft Azure certified with hands-on experience in Kubernetes, Docker, Tekton, and ArgoCD.
              Deeply interested in the convergence of DevOps and AI, with a growing focus on MLOps and building scalable, intelligent systems.
            </p>

            <span
              className="text-6xl md:text-7xl text-[var(--color-primary)] opacity-20 leading-none select-none absolute -bottom-3 right-4 md:right-8 rotate-180 inline-block"
              style={{ fontFamily: '"Handlee", cursive' }}
            >
              "
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
