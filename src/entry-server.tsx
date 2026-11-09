// Build-time entry used by scripts/build.js.
// Renders the page to static HTML so search engines and link-preview bots
// see the real content without running JavaScript. The browser still loads
// main.tsx as usual and renders the live app over this markup.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
