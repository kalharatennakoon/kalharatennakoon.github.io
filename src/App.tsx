import { useState } from 'react'
import Navbar from './components/Navbar'
import { CommandPalette } from './components/CommandPalette'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import TerminalSection from './components/TerminalSection'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import Blog from './components/Blog'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[2000] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:shadow-md"
      >
        Skip to content
      </a>

      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      <main id="main" className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Education />
        <Skills />
        <TerminalSection />
        <Certifications />
        <Achievements />
        <Blog />
        <Contact />
      </main>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <ScrollToTop />
    </div>
  )
}

export default App
