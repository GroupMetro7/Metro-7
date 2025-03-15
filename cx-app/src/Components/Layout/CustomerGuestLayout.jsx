import { Navigate, Outlet, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { TEXTLOGO } from '../../../../Main_App/src/Static/assets/$exporter_assets'
import axiosClient from "../../../../Main_App/src/axiosClient";
import { useStateContext } from "../../../../Main_App/src/Contexts/ContextProvider";
import { Footer, Href } from "../../../../Main_App/src/components/components_exporter";

export default function CustomerGuestLayout() {
  const { token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
}

  const location = useLocation();

  return (
    <div>
      <header>
        <section>
          <aside className="titleside">
            <img src={TEXTLOGO}/>
          </aside>
          <nav>
            <Href name="HOME" navigatation="/" />
            <Href name="LOCATION" navigatation="/guest/location" />
            <Href name="MENU" navigatation="/guest/menu" />
            {location.pathname === "/guest/register" ? (
              <Link to="/guest/login">LOGIN</Link>
            ) : (
              <Link to="/guest/register">REGISTER</Link>
            )}
          </nav>
        </section>
      </header>
      <main>
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}