import { Link, Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../../axiosClient";
import { Href } from '../components_exporter'
import { TEXTLOGO } from '../../Static/assets/$exporter_assets'
import { useStateContext } from "../../Contexts/ContextProvider";

export default function Authenticatedlayout() {
  const { user, token, setUser, setToken } = useStateContext();

  if (!token) {
      return <Navigate to="/login" />;
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

  //useEffect is data pulling method this will connect in api.php
  useEffect(() => {
      axiosClient.get("/user").then(({ data }) => {
          setUser(data);
      });
  }, []);

  return (
    <div>
      <header>
        <section>
          <aside className="titleside">
            <img src={TEXTLOGO} />
          </aside>
          <nav>
            <Href name="HOME" navigatation="/" />
            <Href name="LOCATION" navigatation="/location" />
            <Href name="MENU" navigatation="/menu" />
            <Href name="LOGIN" navigatation="/login" />
          </nav>
        </section>
      </header>
      <main>
        <Outlet />
        {/* <Footer /> */}
      </main>
    </div>
  );
}