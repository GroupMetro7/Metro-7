import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { Group, SideBar, Main, LoadingScreen } from '../../Exporter/Component_Exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';

export default function AdminLayout() {
    const { user, setUser, setToken } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        axiosClient.get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Failed to fetch user:", error);
            });

            return () => clearTimeout(timer);
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
