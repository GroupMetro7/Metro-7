import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from './Pages/Welcome.jsx'
import LocationPage from './Pages/Location.jsx'
import LoginPage from './Pages/Login.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/location" element={<LocationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
