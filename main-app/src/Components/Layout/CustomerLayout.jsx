import { Navigate, Outlet } from 'react-router-dom'
import '../../assets/css/components/header.sass'
import { Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'
import { useEffect, useState } from 'react'

export default function CustomerLayout() {
    const { token, setUser, setToken } = useStateContext();
    const { user } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get("/user")
            .then(({ data }) => {
                setUser(data);
                setLoading(false); // Stop loading once user data is fetched
            })
            .catch((error) => {
                console.error("Failed to fetch user:", error);
                setLoading(false); // Stop loading even if the request fails
            });
    }, []);

    if (loading) {
        return <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>; // Show a loading indicator while fetching user data
    }

    if (!token) {
        return <Navigate to={"/welcome"} />;
    } else if (user.role === 'employee') {
        return <Navigate to={"/service"} />;
    } else if (user.role === 'admin') {
        return <Navigate to={"/admin"} />;
    }

    const onLogout = async (ev) => {
        ev.preventDefault();
        try {
            await axiosClient.post("/logout");
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
      <div>
          <header>
              <div className='header'>
                  <img src={ TextLogo } />
                  <nav>
                      <Href Title='HOME' Redirect='/' />
                      <Href Title='LOCATION' Redirect='/location' />
                      <Href Title='PRE-ORDER' Redirect='/menu' />
                      <Href Title='RESERVATION' Redirect='/reservation' />
                      <Href Title={ user.firstname } DropDown />
                      <ul class="dropdown-menu dropdown-menu-end">
                          <Href Title='PROFILE' Redirect='/profile' />
                          <Href Title='LOGOUT' Onclick={ onLogout } />
                      </ul>
                  </nav>
              </div>
          </header>
      <Outlet />
  </div>
    );
}
