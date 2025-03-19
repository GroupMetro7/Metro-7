import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Trial from './App'
import LandingPage from './pages/Landing'
import LocationPage from './pages/customers/Location'
import ProfilePage from './pages/customers/Profile'
import LoginPage from './pages/Login'
import RegisterPage from './pages/customers/Register'
import MenuPage from './pages/customers/Menu'
import ReservationPage from './pages/customers/Reservation'
import AdminDashboardPage from './pages/admin/Dashboard'
import InventoryManagementPage from './pages/admin/Inventory_Management'
import EmployeeManagementPage from './pages/admin/Employee_Management'
import CustomerManagementPage from './pages/admin/Customer_Management'
import OrderListPage from './pages/services/Order_List'

export default function App() {
    return (
        <Router>
            <Routes>
                {/* <Route path='/trial' element={<Trial />} /> */}
                <Route path='/' element={<LandingPage />} />
                <Route path='/location' element={<LocationPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/menu' element={<MenuPage />} />
                <Route path='/reservation' element={<ReservationPage />} />
                <Route path='/admin' element={<AdminDashboardPage />} />
                <Route path='/admin/inventory_management' element={<InventoryManagementPage />} />
                <Route path='/admin/employee_management' element={<EmployeeManagementPage />} />
                <Route path='/admin/customer_management' element={<CustomerManagementPage />} />
                <Route path='/service/order_list' element={<OrderListPage />} />
            </Routes>
        </Router>
    )
}