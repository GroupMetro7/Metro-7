import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Group, SideBar, Main, LoadingScreen } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';

export default function AdminLayout() {
    const { user, setUser, setToken } = useStateContext();
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
        return (
            <Main>
                <LoadingScreen/>
            </Main>
        )
    }

    if (!user || user?.role !== "admin") {
        return <Navigate to={"/"} replace/>;
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
        <Group>
            <SideBar AdminMode={user.firstname} Logout={onLogout}/>
            <Outlet />
        </Group>
    );
}
