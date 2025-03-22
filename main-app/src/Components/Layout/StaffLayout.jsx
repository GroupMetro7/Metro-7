import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Group, Href } from '../../exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, LogoutLogo } from '../../exporter/public_exporter'
import { Outlet } from 'react-router-dom';

export default function StaffLayout() {
  return (
        <Group>
    <aside className="sidebar">
      <div>
        <img src={M7Logo} />
        <nav>
          <Href Icon={DashboardLogo} Redirect="/staff"></Href>
          <Href Icon={OrderlistLogo} Redirect="/staff/OrderList"></Href>
          <Href Icon={ProfileLogo} Redirect="/staff/profile"></Href>
          <Href Icon={LogoutLogo}></Href>
        </nav>
      </div>
    </aside>
    <Outlet />
    </Group>
  );
}
