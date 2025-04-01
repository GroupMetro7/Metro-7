import { Navigate, Outlet } from 'react-router-dom'
import '../../assets/css/components/header.sass'
import { Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import axiosClient from '../../axiosClient'
import { useEffect } from 'react'

export default function CustomerLayout() {
    const { token, setUser, setToken } = useStateContext();

    const { user } = useStateContext();

    if (!token) {
        return <Navigate to={"/welcome"} />;
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

    //pull user data
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);

    return (
        <div>
            <header>
                <div>
                    <img src={ TextLogo } />
                    <nav>
                        <Href Title='HOME' Redirect='/' />
                        <Href Title='LOCATION' Redirect='/location' />
                        <Href Title='PRE-ORDER' Redirect='/menu' />
                        <Href Title='RESERVATION' Redirect='/reservation' />
                        <Href Title={ user.firstname } DropDown />
                        <ul className="dropdown-menu dropdown-menu-end">
                            <Href Title='PROFILE' Redirect='/profile' />
                            <a href="#" onClick={onLogout}>LOGOUT</a>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </div>
    );
}
