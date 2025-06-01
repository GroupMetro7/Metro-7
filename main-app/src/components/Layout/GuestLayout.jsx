import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Header, Footer } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import CustomerLayout from './CustomerLayout.jsx';
import { useEffect } from 'react';
import axiosClient from '../../axiosClient.js';

export default function GuestLayout() {
    const location = useLocation();
    const { token } = useStateContext();
    const { user, setUser } = useStateContext();

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    if (token) {
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
