import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { TEXTLOGO } from '../../../../Main_App/src/Static/assets/$exporter_assets'
import axiosClient from "../../../../Main_App/src/axiosClient";
import { useStateContext } from "../../../../Main_App/src/Contexts/ContextProvider";
import { Footer, Href } from "../../../../Main_App/src/components/components_exporter";

export default function CustomerDefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

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

  useEffect(() => {
    if (token) {
      axiosClient.get("/user").then(({ data }) => {
        setUser(data);
      });
    }
  }, [token, setUser]);

  if (!token) {
    return <Navigate to="/guest/login" />;
  }

  return (
    <>
      <header>
        <section>
          <aside className="titleside">
            <img src={TEXTLOGO} />
          </aside>
          <nav>
            <Href name="HOME" navigatation="/" />
            <Href name="LOCATION" navigatation="/location" />
            <Href name="MENU" navigatation="/menu" />
            <Href name="PROFILE" navigatation="/Profile" />
            <a href="#" onClick={onLogout}>
              LOGOUT
            </a>
          </nav>
        </section>
      </header>
      <main>
        <Outlet />
        <Footer />
      </main>
    </>
  );


}