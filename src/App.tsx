import { useState } from 'react'
import Navbar from './components/Navbar'
import CursorBubbles from './components/CursorBubbles'
import { BackgroundEffect } from './components/BackgroundEffect'
import { CommandPalette } from './components/CommandPalette'
import Hero from './components/Hero'
import About from './components/About'
import TerminalSection from './components/TerminalSection'
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

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  // Drives the cursor-following spotlight on every card root, site-wide.
  useSpotlight()

  return (
    <div className="flex flex-col min-h-screen relative selection:bg-sky-500 selection:text-white">
      {/* Ambient Aurora & Cyber Grid Background */}
      <BackgroundEffect />

      {/* Modern Island Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow relative z-10">
        <Hero />
        <About />
        <TerminalSection />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Achievements />
        <Activities />
        <Blog />
        <Contact />
      </main>

      {/* Interactive Global Tools */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
      <ScrollToTop />
      <CursorBubbles />
    </div>
  )
}

export default App
