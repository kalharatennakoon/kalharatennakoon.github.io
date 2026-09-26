import Navbar from './components/Navbar'
import CursorBubbles from './components/CursorBubbles'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Activities from './components/Activities'
import Blog from './components/Blog'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import useSpotlight from './hooks/useSpotlight'

function App() {
  // Drives the cursor-following spotlight on every card root, site-wide.
  useSpotlight()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Activities />
        <Blog />
        <Contact />
      </main>
      <ScrollToTop />
      <CursorBubbles />
    </div>
  )
}

export default App
