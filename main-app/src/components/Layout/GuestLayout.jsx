import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import '../../assets/css/components/header.sass'
import { Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import CustomerLayout from './CustomerLayout';


export default function GuestLayout() {
    const location = useLocation();
    const { token } = useStateContext();

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {token ? (
                <CustomerLayout>
                    <Outlet />
                </CustomerLayout>
            ) : (
                <>
                    <header>
                        <div>
                            <img src={TextLogo} />
                            <nav>
                                <Href Title='HOME' Redirect='/welcome' />
                                <Href Title='LOCATION' Redirect='/location' />
                                <Href Title='MENU' Redirect='/menu' />
                                <Href Title='LOGIN' Redirect='/login' />
                            </nav>
                        </div>
                    </header>
                    <Outlet />
                </>
            )}
        </div>
    );
}
