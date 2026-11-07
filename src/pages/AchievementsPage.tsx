import Certifications from '../components/Certifications'
import Achievements from '../components/Achievements'
import Activities from '../components/Activities'
import usePageTitle from '../hooks/usePageTitle'

/* The top padding clears the fixed navbar; its colour matches the first section. */
function AchievementsPage() {
  usePageTitle('Achievements & Certifications')

  return (
    <div className="pt-12 bg-[var(--bg-primary)]">
      <Achievements />
      <Certifications />
      <Activities />
    </div>
  )
}

export default AchievementsPage
