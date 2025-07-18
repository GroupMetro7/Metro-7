import { createBrowserRouter } from 'react-router-dom'
import GuestLayout from './Components/Layout/GuestLayout'
import CustomerLayout from './Components/Layout/CustomerLayout'
import StaffLayout from './Components/Layout/StaffLayout'
import AdminLayout from './Components/Layout/AdminLayout'
import LoginPage from './Pages/Login'
import RegisterPage from './Pages/Customers/Register'
import ForgetPasswordPage from './Pages/Customers/Forget_Password'
import ChangePasswordPage from './Pages/Customers/Change_Password'
import ProfilePage from './Pages/Customers/Profile'
import DashboardPage from './Pages/Admin/Dashboard'
import LandingPage from './Pages/Landing'
import ReservationPage from './Pages/Customers/Reservation'
import EmployeeManagementPage from './Pages/Admin/Employee_Management'
import StaffDashboard from './Pages/Services/Dashboard'
import StaffProfile from './Pages/Services/Profile'
import CustomerManagementPage from './Pages/Admin/Customer_Management'
import ProductManagementPage from './Pages/Admin/Product_Management'
import SalesPage from './Pages/Admin/Sales'
import StaffOrderList from './Pages/Services/Order_List'
import InventoryManagementPage from './Pages/Admin/Inventory_Management'
import MenuPage from './Pages/Customers/Menu'
import Test from './Pages/Admin/test'
import NotFound from './Pages/404not_found'
import OrderHistoryPage from './Pages/Admin/Order_History'
import ActivityLogsPage from './Pages/Admin/Activity_Logs'
import DemandForecastPage from './Pages/Admin/Demand_Forecast'
import ReservationListPage from './Pages/Services/Reservation_List'

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
				path: 'orderlist',
				element: <StaffOrderList />
			},
			{
				path: 'reservationlist',
				element: <ReservationListPage />
			},
			{
				path: 'profile',
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
				path: 'orderlist',
				element: <StaffOrderList />
			},
			{
				path: 'reservationlist',
				element: <ReservationListPage />
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
