import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/Base.sass'
import './assets/bootstrap/popper.jsx'
import './assets/bootstrap/bootstrap.css'
import './assets/bootstrap/bootstrap.jsx'
import App from './router'
import './exporter/component_exporter.jsx'
import './exporter/public_exporter.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)