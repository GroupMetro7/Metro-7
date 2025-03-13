import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import WelcomePage from './Pages/Customers/Welcome'
import LocationPage from './Pages/Customers/Location'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Customers/Register'
import ProfilePage from './Pages/Customers/Profile'
import MenuPage from './Pages/Customers/Menu'
import OrderListPage from './Pages/Services/Order_List'
import ServiceDashboardPage from './Pages/Services/Dashboard'
import ServiceProfilePage from './Pages/Services/Profile'
import AdminDashboardPage from './Pages/Admin/Dashboard'
import InventoryManagementPage from './Pages/Admin/Inventory_Management'
import EmployeeManagementPage from './Pages/Admin/Employee_Management'
import CustomerManagementPage from './Pages/Admin/Customer_Management'

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
                <Route path="/orderlist" element={<OrderListPage />} />
                <Route path="/servicedashboard" element={<ServiceDashboardPage />} />
                <Route path="/serviceprofile" element={<ServiceProfilePage />} />
                <Route path="/admindashboard" element={<AdminDashboardPage />} />
                <Route path="/inventorymanagement" element={<InventoryManagementPage />} />
                <Route path="/employeemanagement" element={<EmployeeManagementPage />} />
                <Route path="/customermanagement" element={<CustomerManagementPage />} />
            </Routes>
        </Router>
    );
};