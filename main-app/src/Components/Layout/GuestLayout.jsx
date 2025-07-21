import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Header, Footer, Main, LoadingScreen } from '../../Exporter/Component_Exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'

export default function GuestLayout() {
    const location = useLocation()
    const { user, setUser } = useStateContext()
    const [loading, setLoading] = useState(true)

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
