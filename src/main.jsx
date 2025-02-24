import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Static/css/Components/BASE.css'
import './Static/css/Components/BOOTSTRAP.css'
import App from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
