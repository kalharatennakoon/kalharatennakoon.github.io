const facts: { label: string; value: React.ReactNode }[] = [
  { label: 'Based in', value: 'Kurunegala, Sri Lanka. Open to on-site, hybrid and remote work.' },
  { label: 'Focus', value: 'Software engineering, DevOps and cloud-native platforms, applied ML and MLOps.' },
  { label: 'Education', value: 'BSc (Hons) Computer Science, Software Engineering. First Class Honours, Kingston University.' },
  { label: 'Industry', value: 'Two internships at IFS R&D International: DevOps (2024) and software engineering (2020).' },
  {
    label: 'Community',
    value: (
      <>
        Technical writer on{' '}
        <a href="https://kalharatennakoon.medium.com" target="_blank" rel="noopener noreferrer" className="text-link">
          Medium
        </a>{' '}
        since 2021, contributor on{' '}
        <a
          href="https://stackoverflow.com/users/13018789/kalhara-tennakoon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Stack Overflow
        </a>
        , former STEMUp volunteer.
      </>
    ),
  },
]

export function About() {
  return (
    <section id="about" className="section">
      <div className="page-wrap grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2 className="section-title">About</h2>
          <div className="mt-6 max-w-[40rem] space-y-5 text-[1.0625rem] leading-[1.7] text-ink/85">
            <p>
              I'm a software engineer who likes the whole path from idea to production. At IFS
              R&amp;D I automated Kubernetes-native CI/CD with Tekton and added Behave tests to the
              pipelines, which cut manual debugging by about 30%. Earlier, I built a container
              security scanner and wired it into CI/CD.
            </p>
            <p>
              Outside work I build full-stack products end to end: a veterinary clinic platform
              with a local RAG assistant, a solar forecasting app deployed with Argo CD, and tools
              that use LLMs to review CVs and explain official letters in Sinhala, Tamil and English.
            </p>
            <p>
              I write about what I learn. Over 50 articles on Kubernetes, Tekton, Docker and
              CI/CD have reached more than 150,000 readers.
            </p>
          </div>
        </div>

        <dl className="self-start border-t border-rule">
          {facts.map((f) => (
            <div key={f.label} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6">
              <dt className="text-[0.875rem] font-medium text-muted">{f.label}</dt>
              <dd className="text-[0.9688rem] leading-relaxed text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default About
