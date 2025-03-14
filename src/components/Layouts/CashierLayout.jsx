import React from 'react'
import '../../Static/css/Components/SIDEBAR.sass'
import { Href } from '../components_exporter'
import { M7LOGO, DASHBOARDLOGO, ORDERLISTLOGO, PROFILELOGO, SALESLOGO, INVENTORYLOGO, EMPLOYEELOGO, CUSTOMERLOGO } from '../../Static/public_exporter'
import { Outlet } from 'react-router-dom';

export default function CashierLayout() {
    return (
      <div>
        <aside className="sidebar">
          <section>
            <div className="titleside">
              <img src={M7LOGO} />
            </div>
            <nav>
                  <Href
                    name={<img src={DASHBOARDLOGO} />}
                    navigatation="/service"
                  ></Href>
                  <Href
                    name={<img src={ORDERLISTLOGO} />}
                    navigatation="/service/orders"
                  ></Href>
                  <Href
                    name={<img src={PROFILELOGO} />}
                    navigatation="/service/profile"
                  ></Href>
            </nav>
          </section>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    );
}