import Terminal from './Terminal'

export function TerminalSection() {
  return (
    <section id="terminal" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Terminal</h2>
          <p className="section-lede">
            The same portfolio as a shell. Try <code className="font-mono text-[0.9375rem] text-ink">whoami</code>,{' '}
            <code className="font-mono text-[0.9375rem] text-ink">kubectl get projects</code> or{' '}
            <code className="font-mono text-[0.9375rem] text-ink">git log</code>, or type{' '}
            <code className="font-mono text-[0.9375rem] text-ink">help</code> for the full list.
          </p>
        </div>
        <Terminal />
      </div>
    </section>
  )
}

export default TerminalSection
