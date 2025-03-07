import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WelcomePage from './Pages/Welcome.jsx'
import LocationPage from './Pages/Location.jsx'
import LoginPage from './Pages/Login.jsx'
import RegisterPage from './Pages/Register.jsx'
import ProfilePage from './Pages/Profile.jsx'
import MenuPage from './Pages/Menu.jsx'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/menu" element={<MenuPage />} />
            </Routes>
        </Router>
    );
};