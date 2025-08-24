import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import heroWebp from './assets/handball-hero-optimized.jpg?format=webp'
import heroJpg from './assets/handball-hero-optimized.jpg'

// Preload LCP hero image with Vite-resolved URLs before rendering
const preloadHero = (href, type) => {
  if (!href) return
  const selector = `link[rel="preload"][as="image"][href="${href}"]`
  if (!document.querySelector(selector)) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = href
    link.fetchPriority = 'high'
    if (type) link.type = type
    document.head.appendChild(link)
  }
}

preloadHero(heroWebp, 'image/webp')
preloadHero(heroJpg, 'image/jpeg')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
