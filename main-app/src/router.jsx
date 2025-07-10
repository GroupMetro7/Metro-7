import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './components/Layout/GuestLayout'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Customers/Register'
import ForgetPasswordPage from './pages/Customers/Forget_Password'
import ChangePasswordPage from './pages/Customers/Change_Password'
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
import ProductManagementPage from './pages/admin/Product_Management'
import SalesPage from './pages/admin/Sales'
import StaffOrderList from './pages/services/Order_List'
import InventoryManagementPage from './Pages/admin/Inventory_Management'
import MenuPage from './Pages/Customers/Menu'
import CustomerLayout from './Components/Layout/CustomerLayout'
import Test from './Pages/admin/test'
import NotFound from './Pages/404not_found'
import OrderHistoryPage from './Pages/admin/Order_History'
import ActivityLogsPage from './Pages/admin/Activity_Logs'
import DemandForecastPage from './Pages/admin/Demand_Forecast'

const router = createBrowserRouter([
  //not found page

  {
    path: '*',
    element: <NotFound />
  },

  //tesing

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
				path: 'menu',
				element: <MenuPage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			},
			{
				path: 'forget_password',
				element: <ForgetPasswordPage />
			},
			{
				path: 'change_password/:token',
				element: <ChangePasswordPage />
			},
		]
	},

	{
		path: '/customer',
		element: <CustomerLayout />,
		children: [
			{
				path: '',
				element: <LandingPage />
			},
			{
				path: 'menu',
				element: <MenuPage />
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


	// {
	// 	path: '/location',
	// 	element: <LocationPage />
	// },

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
			},
			{
				path: 'order_history',
				element: <OrderHistoryPage />
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
				path: 'product_management',
				element: <ProductManagementPage />
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
			{
				path: 'order_history',
				element: <OrderHistoryPage />
			},
			{
				path: 'logs',
				element: <ActivityLogsPage />
			},
			{
				path: 'df',
				element: <DemandForecastPage />
			},
		]
	}
])

export default router
