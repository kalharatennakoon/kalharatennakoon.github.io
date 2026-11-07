import { FaTerminal } from 'react-icons/fa'
import useScrollReveal from '../hooks/useScrollReveal'
import Terminal from './Terminal'
import PipelineVisualizer from './PipelineVisualizer'

export function TerminalSection() {
  const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>(0.1)

  return (
    <section id="terminal" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`text-center mb-10 reveal ${headerVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <FaTerminal className="text-xs" />
            <span>Interactive Cloud Shell</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Production Cluster CLI
          </h2>
          <div className={`section-underline ${headerVisible ? 'is-visible' : ''}`} />
          <p className="mt-4 text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed">
            As a DevOps engineer, I treat infrastructure as code. Explore this live environment
            just like you would a production Kubernetes cluster—run Tekton pipelines, query cluster resources, or inspect git logs.
          </p>
        </div>

        {/* Animated Tekton Pipeline Visualizer */}
        <PipelineVisualizer />

        {/* The Shell */}
        <div className="max-w-4xl mx-auto mt-8">
          <Terminal />
        </div>

      </div>
    </section>
  )
}

export default TerminalSection
