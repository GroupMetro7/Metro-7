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
          <Href Icon={DashboardLogo} Redirect="/service"></Href>
          <Href Icon={OrderlistLogo} Redirect="/service/OrderList"></Href>
          <Href Icon={ProfileLogo} Redirect="/service/profile"></Href>
          <Href Icon={LogoutLogo}></Href>
        </nav>
      </div>
    </aside>
    <Outlet />
    </Group>
  );
}
