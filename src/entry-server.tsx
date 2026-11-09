// Build-time entry used by scripts/prerender-routes.js.
// Renders each page to static HTML so search engines and link-preview bots
// see the real content without running JavaScript. The browser still loads
// main.tsx as usual and renders the live app over this markup.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StaticRouter>
    </StrictMode>,
  )
}

// The prerender script builds one page per case study from the same data.
export { caseStudies } from './data/caseStudies'
