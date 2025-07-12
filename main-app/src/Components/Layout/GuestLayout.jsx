import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Header, Footer, Main, LoadingScreen } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient.js';

export default function GuestLayout() {
    const location = useLocation()
    const { user, setUser } = useStateContext()
    const [loading, setLoading] = useState(true)

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

    if (user) {
        if (user.role === "employee") {
            return <Navigate to={"/service"} replace />;
        } else if (user.role === 'admin') {
            return <Navigate to={"/admin"} replace />;
        } else if (user.role === 'customer') {
            return <Navigate to={"/customer"} replace />;
        }
    }

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
