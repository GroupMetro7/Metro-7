import React, { useEffect, useState } from 'react'
import { SideBar, Group, Main, LoadingScreen } from '../../Exporter/Component_Exporter'
import { Navigate, Outlet } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useStateContext } from '../../Contexts/ContextProvider';


export default function StaffLayout() {
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
        <Group>
            <SideBar ServiceMode={user.firstname} Logout={ onLogout }/>
            <Outlet />
        </Group>
    );
}
