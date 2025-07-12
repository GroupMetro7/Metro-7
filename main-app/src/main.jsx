import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ContextProvider } from './Contexts/ContextProvider.jsx'
import router from './router.jsx'
import './assets/css/Base.sass'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import './assets/bootstrap/jquery'
import './assets/bootstrap/popper'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
)

// check if SW is registered
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration)
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error)
            })
    })
}
