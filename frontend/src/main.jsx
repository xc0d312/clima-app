import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const appDocumentElement = document.getElementById('root')
const root = createRoot(appDocumentElement)
root.render(
  <StrictMode>
    <App />
    </StrictMode>,
)