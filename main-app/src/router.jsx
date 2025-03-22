import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./Components/Layout/GuestLayout";
import LoginPage from "./Pages/Login";
import RegisterPage from "./Pages/Customers/Register";
import LocationPage from "./Pages/Customers/Location";
import CustomerLayout from "./Components/Layout/CustomerLayout";
import ProfilePage from "./Pages/Customers/Profile";
import InventoryManagementPage from "./Pages/admin/Inventory_Management";
import DashboardPage from "./Pages/admin/Dashboard";
import LandingPage from "./Pages/Landing";
import AdminLayout from "./Components/Layout/AdminLayout";
import Inventory from "./Pages/admin/testInventory";
import ReservationPage from "./Pages/Customers/Reservation";
import MenuPage from "./Pages/Customers/Menu";
import EmployeeManagementPage from "./Pages/admin/Employee_Management";
import StaffDashboard from "./Pages/services/Dashboard";
import StaffOrderList from "./Pages/services/Order_List";
import StaffProfile from "./Pages/services/Profile";
import StaffLayout from "./Components/Layout/StaffLayout";
import CustomerManagementPage from "./Pages/admin/Customer_Management";

const router = createBrowserRouter([

  //Customers routing
  {
    path: '/',
    element: <CustomerLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: 'profile',
        element: <ProfilePage/>
      },
      {
        path: 'reservation',
        element: <ReservationPage />
      },
      {
        path: 'menu',
        element: <MenuPage />
      },
    ]
  },

  //customer guest routing
  {
    path: '',
    element: <GuestLayout />,
    children: [
      {
        path: 'welcome',
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
      {
        path: 'menu',
        element: <MenuPage />
      },
    ]
  },



  {
    path: '/location',
    element: <LocationPage/>
  },

  //Staff routing

  {
    path: '/staff',
    element: <StaffLayout/>,
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
        path: 'inventory_test',
        element: <Inventory />
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
      }
    ]
  }
])

export default router;
