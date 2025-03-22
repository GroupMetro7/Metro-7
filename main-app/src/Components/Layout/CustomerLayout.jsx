import { Navigate, Outlet } from 'react-router-dom';
import '../../assets/css/components/header.sass'
import { Footer, Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'
import { useStateContext } from '../../Contexts/ContextProvider';
import axiosClient from '../../axiosClient';
import { useEffect } from 'react';

export default function CustomerLayout() {
  const { token, setUser, setToken } = useStateContext();

  if (!token) {
    return <Navigate to={"/login"} />;
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
          <div className="titleside">
            <img src={TextLogo} />
          </div>
          <nav>
            <Href Title="HOME" Redirect="/" />
            <Href Title="LOCATION" Redirect="/location" />
            <Href Title="MENU" Redirect="/menu" />
            <Href Title="PROFILE" Redirect="/profile" />
            <Href Title="RESERVE" Redirect="/reservation" />
            <a href="#" onClick={onLogout}>
                            LOGOUT
                        </a>
          </nav>
        </div>
      </header>
        <Outlet />
    </div>
  );
}
