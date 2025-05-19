import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import '../../assets/css/components/sidebar.sass';
import { Group, Href } from '../../exporter/component_exporter';
import { M7Logo, DashboardLogo, SalesLogo, OrderlistLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from '../../exporter/public_exporter';
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';

export default function AdminLayout() {
    const { user, setUser } = useStateContext();
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

    if (!user || user.role !== "admin") {
        return <Navigate to={"/welcome"} />;
    }

    return (
        <Group>
            <aside className="sidebar">
                <div>
                    <img src={M7Logo} />
                    <nav>
                        <Href Icon={DashboardLogo} Redirect="/admin" />
                        <Href Icon={SalesLogo} Redirect='/admin/sales' />
                        <Href Icon={OrderlistLogo} Redirect='/admin/menu_management' />
                        <Href Icon={InventoryLogo} Redirect="/admin/inventory_management" />
                        <Href Icon={EmployeeLogo} Redirect="/admin/employee_management" />
                        <Href Icon={CustomerLogo} Redirect="/admin/customer_management" />
                        <Href Icon={LogoutLogo} />
                    </nav>
                </div>
            </aside>
            <Outlet />
        </Group>
    );
}
