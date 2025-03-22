import { Outlet } from "react-router-dom";
import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Group, Href } from '../../exporter/component_exporter'
import { M7Logo, DashboardLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from '../../exporter/public_exporter'


export default function AdminLayout() {
  return (
    <Group>
      <aside className="sidebar">
        <div>
          <img src={M7Logo} />
          <nav>
                <Href Icon={DashboardLogo} Redirect="/admin" />
                <Href Icon={SalesLogo} Redirect="" />
                <Href
                  Icon={InventoryLogo}
                  Redirect="/admin/inventory_management"
                />
                <Href
                  Icon={EmployeeLogo}
                  Redirect="/admin/employee_management"
                />
                <Href
                  Icon={CustomerLogo}
                  Redirect="/admin/customer_management"
                />
                <Href Icon={LogoutLogo} />
          </nav>
        </div>
      </aside>
      <Outlet />
      </Group>
  );
}
