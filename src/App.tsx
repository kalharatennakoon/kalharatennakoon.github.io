import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CursorBubbles from './components/CursorBubbles'
import ScrollToTop from './components/ScrollToTop'
import ScrollManager from './components/ScrollManager'
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'
import AchievementsPage from './pages/AchievementsPage'
import BlogPage from './pages/BlogPage'
import NotFoundPage from './pages/NotFoundPage'
import useSpotlight from './hooks/useSpotlight'

function App() {
  // Drives the cursor-following spotlight on every card root, site-wide.
  useSpotlight()

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollManager />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ScrollToTop />
      <CursorBubbles />
    </div>
  )
}

export default App
