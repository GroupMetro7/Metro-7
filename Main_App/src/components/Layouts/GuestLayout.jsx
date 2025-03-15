import { Link, Navigate, Outlet } from "react-router-dom";
import { Href } from '../components_exporter'
import { TEXTLOGO } from '../../Static/assets/$exporter_assets'

export default function Guestlayout(){
    return(
        <div>
            <header>
                    <section>
                      <aside class="titleside">
                        <img src={TEXTLOGO} />
                      </aside>
                      <nav>
                        <Href name="HOME" navigatation="/" />
                        <Href name="LOCATION" navigatation="/location" />
                        <Href name="MENU" navigatation="/menu" />
                        {location.pathname === "/register" ? (
                            <Link to="/guest/login">LOGIN</Link>
                        ) : (
                            <Link to="/guest/register">REGISTER</Link>
                        )}
                      </nav>
                    </section>
                  </header>
            <main>
              admin
            <Outlet/>
            </main>
        </div>
    )
}