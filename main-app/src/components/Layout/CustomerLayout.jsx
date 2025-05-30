import { Navigate, Outlet } from 'react-router-dom'
import { Header } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'
import { useEffect, useState } from 'react'

export default function CustomerLayout() {
    const { token, setUser, setToken } = useStateContext();
    const { user } = useStateContext();
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
        return <Navigate to={"/service"} />;
    } else if (user.role === 'admin') {
        return <Navigate to={"/admin"} />;
    }



    return (
        <>
            <Header AuthenticatedMode={ user.firstname } Logout={onLogout} />
            <Outlet />
        </>
    );
}
