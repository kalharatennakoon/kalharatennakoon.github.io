import Projects from '../components/Projects'
import usePageTitle from '../hooks/usePageTitle'

function ProjectsPage() {
  usePageTitle('Projects')

  // Top padding clears the fixed navbar; colour matches the section below.
  return (
    <div className="pt-12 bg-[var(--bg-primary)]">
      <Projects />
    </div>
  )
}

export default ProjectsPage
