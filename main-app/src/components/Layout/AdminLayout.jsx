import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Group, Href } from '../../exporter/component_exporter';
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
            <SideBar AdminMode />
            <Outlet />
        </Group>
    );
}
