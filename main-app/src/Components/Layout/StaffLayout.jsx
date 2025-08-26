import React, { useEffect, useState } from 'react'
import { Header, SideBar, Group, Main, LoadingScreen } from '../../Exporter/Component_Exporter'
import { Navigate, Outlet } from 'react-router-dom';
import axiosClient from '../../axiosClient'
import { useStateContext, useScreenWidth } from '../../Exporter/Hooks_Exporter'

export default function StaffLayout() {
    const { user, setUser, setToken } = useStateContext()
    const [loading, setLoading] = useState(true)

    const screenwidth = useScreenWidth()

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

    if (!user || user?.role !== "employee") {
        return <Navigate to={"/"} replace/>;
    }

    return (
        <>
        { screenwidth > 766 ? 
        <Group>
            <SideBar ServiceMode={user.firstname} Logout={ onLogout }/>
            <Group>
                <Outlet />
            </Group>
        </Group> 
        :
        <>
            <Header ServiceMode={user.firstname} Logout={onLogout} />
            <Outlet />
        </>
        }
        </>
    )
}
