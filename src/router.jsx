import { createBrowserRouter } from "react-router-dom";
import Guestlayout from "./components/Layouts/GuestLayout";
import CustomerDefaultLayout from "../../cx-app/src/Components/Layout/CustomerDefaultLayout";
import CustomerGuestLayout from "../../cx-app/src/Components/Layout/CustomerGuestLayout";
import CustomerLogin from "../../cx-app/src/views/Auth/Login";
import CustomerRegister from "../../cx-app/src/views/Auth/Register";
import Welcomepage from "../../cx-app/src/views/Welcome";
import LoginStaff from "./views/Auth/Login";
import CustomerProfile from "../../cx-app/src/views/Auth/Profilepage";
import Menupage from "../../cx-app/src/views/Menu";
import LocationPage from "../../cx-app/src/views/Location";
import NotFound from "./views/Error_Page/404NotFound";
import ServiceDashboardPage from "./views/staff/Dashboard";
import OrderListPage from "./views/staff/Order_List";
import ServiceProfilePage from "./views/staff/Profile";
import CashierLayout from "./components/Layouts/cashierLayout";
import AddProduct from "./views/admin/sampleAddProduct";
import Inventory from "./views/admin/inventory";


const router = createBrowserRouter([

  // admin router @main_app
  {
    path: "/admin",
    element: <Guestlayout />,
    children: [
      {
        path: "login",
        element: <LoginStaff />,
      },
      {
        path: "inventoryManagement",
        element: <Inventory />,
      },
      {
        path: "sample",
        element: <AddProduct />,
      },
    ],
  },

  // staff router @main_app
  {
    path: 'service',
    element: <CashierLayout />,
    children: [
      {
        path: '',
        element: <ServiceDashboardPage />
      },
      {
        path: 'orders',
        element: <OrderListPage />,
      },
      {
        path: 'profile',
        element: <ServiceProfilePage />
      }
    ]
  },


  // Customer Router @cx-app

  {
    path: '/guest',
    element: <CustomerGuestLayout/>,
    children: [
      {
        path: 'login',
        element: <CustomerLogin/>
      },
      {
        path: 'register',
        element: <CustomerRegister/>
      },
      {
        path: 'location',
        element: <LocationPage/>
      },
      {
        path: 'menu',
        element: <Menupage/>
      },
    ]
  },
  {
    path: '/',
    element: <CustomerDefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Welcomepage />
      },
      {
        path: '/Profile',
        element: <CustomerProfile/>
      },
      {
        path: '/menu',
        element: <Menupage/>
      },
      {
        path: '/location',
        element: <LocationPage/>
      },
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  },
]);

export default router;
