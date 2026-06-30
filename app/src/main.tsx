import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactGA from 'react-ga4'

// Initialize Google Analytics
ReactGA.initialize("G-C5RR5G93KG")

createRoot(document.getElementById('root')!).render(<App />)
