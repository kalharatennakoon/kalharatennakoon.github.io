import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Activities from './components/Activities'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Activities />
        <Contact />
      </main>
      <ScrollToTop />
    </div>
  )
}

export default App
