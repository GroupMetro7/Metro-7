import { Navigate, Outlet } from 'react-router-dom'
import { Header, Footer } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'
import { useEffect, useState } from 'react'

export default function CustomerLayout() {
    const { token, setUser, setToken } = useStateContext();
    const { user } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user")
            .then(({ data }) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Failed to fetch user:", error);
            });
    }, []);

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

    if (!token) {
        return <Navigate to={"/"} />;
    } else if (user.role === 'employee') {
        return <Navigate to={"/service"} replace/>;
    } else if (user.role === 'admin') {
        return <Navigate to={"/admin"} replace/>;
    }



    return (
        <>
            <Header AuthenticatedMode={ user.firstname } Logout={onLogout} />
            <Outlet />
            <Footer />
        </>
    );
}
