import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Header, Footer, Main, LoadingScreen } from '../../Exporter/Component_Exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'

export default function CustomerLayout() {
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

    if (!user) {
        return <Navigate to={"/"} />;
    } else if (user.role === 'employee') {
        return <Navigate to={"/service"} replace/>;
    } else if (user.role === 'admin') {
        return <Navigate to={"/admin"} replace/>;
    }

    return (
        <>
            <Header AuthenticatedMode={user.firstname} Logout={onLogout} />
            <Outlet />
            <Footer />
        </>
    );
}
