import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Href } from '../../exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from '../../exporter/public_exporter'

export default function SideBar({ ServiceMode, AdminMode }) {
    return(
        <aside className="sidebar">
            <div>
                <img src={ M7Logo }/>
                <nav>
                    { ServiceMode ? 
                        <>
                            <Href Icon={ DashboardLogo } Redirect="/servicedashboard"></Href>
                            <Href Icon={ OrderlistLogo } Redirect="/service/order_list"></Href>
                            <Href Icon={ ProfileLogo } Redirect="/serviceprofile"></Href>
                            <Href Icon={ LogoutLogo }></Href>
                        </>
                    : undefined
                    }
                    { AdminMode ? 
                        <>
                            <Href Icon={ DashboardLogo } Redirect="/admin"/>
                            <Href Icon={ SalesLogo } Redirect=""/>
                            <Href Icon={ InventoryLogo } Redirect="/admin/inventory_management"/>
                            <Href Icon={ EmployeeLogo } Redirect="/admin/employee_management"/>
                            <Href Icon={ CustomerLogo } Redirect="/admin/customer_management"/>
                            <Href Icon={ LogoutLogo }/>
                        </>
                    : undefined
                    }
                </nav>
            </div>
        </aside>
    )
}