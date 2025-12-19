import { useTheme } from '../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      className="fixed top-8 right-8 z-[1000] bg-white/20 border-2 border-white/30 rounded-full w-[50px] h-[50px] flex items-center justify-center cursor-pointer transition-all hover:bg-white/30 hover:rotate-[20deg] hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)] backdrop-blur-md text-white text-[1.3rem] dark:bg-white/10 dark:border-white/20"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeToggle
