import React, { useEffect, useState } from 'react'
import '../../assets/css/components/sidebar.sass'
import { Group, Href } from '../../exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, LogoutLogo } from '../../exporter/public_exporter'
import { Navigate, Outlet } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../Contexts/ContextProvider';

export default function StaffLayout() {
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

if(!token || user.role !== "employee") {
    return <Navigate to={"/welcome"} />;
}


  return (
        <Group>
    <aside className="sidebar">
      <div>
        <img src={M7Logo} />
        <nav>
          <Href Icon={DashboardLogo} Redirect="/service"></Href>
          <Href Icon={OrderlistLogo} Redirect="/service/OrderList"></Href>
          <Href Icon={ProfileLogo} Redirect="/service/profile"></Href>
          <a href="#" onClick={onLogout}><img src={LogoutLogo} alt=""/></a>
        </nav>
      </div>
    </aside>
    <Outlet />
    </Group>
  );
}
