interface Role {
  title: string
  company: string
  location: string
  period: string
  highlights: string[]
  stack: string[]
}

const roles: Role[] = [
  {
    title: 'DevOps Engineering Intern',
    company: 'IFS R&D International',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2024 – Oct 2024',
    highlights: [
      'Automated Kubernetes-native CI/CD workflows with Tekton, streamlining deployment for critical services.',
      'Integrated Behave automated tests into the Tekton pipelines, reducing manual debugging effort by about 30% and improving deployment reliability.',
      'Optimised pipeline configuration and resolved recurring build and deployment failures.',
      'Ran knowledge-sharing sessions on testing practice for the team.',
    ],
    stack: ['Kubernetes', 'Tekton', 'Behave', 'Docker', 'Azure DevOps', 'Python'],
  },
  {
    title: 'Software Engineering Intern',
    company: 'IFS R&D International',
    location: 'Colombo, Sri Lanka',
    period: 'Jul 2020 – Dec 2020',
    highlights: [
      'Developed a Docker and Kubernetes based security scanner for container images and cluster configuration.',
      'Integrated security scanning into CI/CD pipelines to catch vulnerabilities across deployment stages.',
      'Diagnosed deployment and runtime issues, and wrote technical documentation for reliability and onboarding.',
    ],
    stack: ['Kubernetes', 'Docker', 'Go', 'Argo CD', 'Rancher', 'AKS', 'GKE', 'Azure DevOps'],
  },
]

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="page-wrap">
        <div className="section-head">
          <h2 className="section-title">Experience</h2>
          <p className="section-lede">
            Two internships at IFS R&amp;D International, four years apart: first on container
            security, then on CI/CD automation for Kubernetes.
          </p>
        </div>

        <ol className="border-t border-rule">
          {roles.map((r) => (
            <li key={r.period} className="grid gap-4 border-b border-rule py-8 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
              <div>
                <p className="text-[0.9375rem] font-medium tabular-nums text-ink">{r.period}</p>
                <p className="mt-0.5 text-[0.875rem] text-muted">{r.location}</p>
              </div>
              <div className="max-w-[44rem]">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.01em]">{r.title}</h3>
                <p className="mt-0.5 text-[0.9688rem] text-muted">{r.company}</p>
                <ul className="mt-4 space-y-2.5 text-[0.9688rem] leading-relaxed text-ink/85">
                  {r.highlights.map((h) => (
                    <li key={h} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-rule-strong">
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {r.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
