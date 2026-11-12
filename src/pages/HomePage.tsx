import Hero from '../components/Hero'
import About from '../components/About'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Recommendations from '../components/Recommendations'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Contact from '../components/Contact'
import usePageTitle from '../hooks/usePageTitle'

function HomePage() {
  usePageTitle()

  return (
    <>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Skills />
      <Projects limit={3} />
      <Recommendations />
      <Contact />
    </>
  )
}

export default HomePage
