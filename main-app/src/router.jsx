import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './components/Layout/GuestLayout'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Customers/Register'
import LocationPage from './pages/Customers/Location'
import ProfilePage from './pages/Customers/Profile'
import DashboardPage from './pages/admin/Dashboard'
import LandingPage from './pages/Landing'
import AdminLayout from './components/Layout/AdminLayout'
import ReservationPage from './pages/Customers/Reservation'
import EmployeeManagementPage from './pages/admin/Employee_Management'
import StaffDashboard from './pages/services/Dashboard'
import StaffProfile from './pages/services/Profile'
import StaffLayout from './components/Layout/StaffLayout'
import CustomerManagementPage from './pages/admin/Customer_Management'
import MenuManagementPage from './pages/admin/Menu_Management'
import SalesPage from './pages/admin/Sales'
import StaffOrderList from './pages/services/Order_List'
import InventoryManagementPage from './Pages/admin/Inventory_Management'
import MenuPage from './Pages/Customers/Menu'
import CustomerLayout from './Components/Layout/CustomerLayout'
import Test from './Pages/admin/test'

const router = createBrowserRouter([

  //testing

  {
    path: 'test',
    element: <Test />
  },

	//Customers routing
  {
		path: '',
		element: <GuestLayout />,
		children: [
			{
				path: '',
				element: <LandingPage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			},
		]
	},

	{
		path: '',
		element: <CustomerLayout />,
		children: [
			{
				path: 'welcome',
				element: <LandingPage />
			},
			{
				path: 'profile',
				element: <ProfilePage />
			},
			{
				path: 'reservation',
				element: <ReservationPage />
			},
		]
	},

	//customer guest routing


	{
		path: '/location',
		element: <LocationPage />
	},
  {
    path: 'menu',
    element: <MenuPage />
  },
	//Staff routing

	{
		path: '/service',
		element: <StaffLayout />,
		children: [
			{
				path: '',
				element: <StaffDashboard />
			},
			{
				path: 'OrderList',
				element: <StaffOrderList />
			},
			{
				path: 'Profile',
				element: <StaffProfile />
			}
		]
	},
	//Admin routing

	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				path: '',
				element: <DashboardPage />
			},
			{
				path: 'sales',
				element: <SalesPage />
			},
			{
				path: 'menu_management',
				element: <MenuManagementPage />
			},
			{
				path: 'inventory_management',
				element: <InventoryManagementPage />
			},
			{
				path: 'Employee_management',
				element: <EmployeeManagementPage />
			},
			{
				path: 'customer_management',
				element: <CustomerManagementPage />
			},

		]
	}
])

export default router
