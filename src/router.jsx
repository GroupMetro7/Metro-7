import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './App'
import LocationPage from './pages/customers/Location'
import ProfilePage from './pages/customers/Profile'
import LoginPage from './pages/Login'
import RegisterPage from './pages/customers/Register'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/location' element={<LocationPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
            </Routes>
        </Router>
    )
}