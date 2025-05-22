import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Href, SideBarWeight } from '../../Exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from '../../Exporter/public_exporter'

export default function SideBar({ ServiceMode, AdminMode, Logout }) {
    SideBarWeight()

    return(
        <aside className="sidebar">
            <div>
                <img src={ M7Logo }/>
                <nav>
                    { ServiceMode && 
                        <>
                            <Href Title={ <span>Dashboard</span> } Icon={ DashboardLogo } Redirect="/service"></Href>
                            <Href Title={ <span>Order List</span> } Icon={ OrderlistLogo } Redirect="/service/orderlist"></Href>
                            <Href Title={ <span>Profile</span> } Icon={ ProfileLogo } Redirect="/service/profile"></Href>
                            <Href Title={ <span>Logout</span> } Icon={ LogoutLogo } Onclick={ Logout } />
                        </>
                    ||
                    AdminMode && 
                        <>
                            <Href Title={ <span>Dashboard</span> } Icon={ DashboardLogo } Redirect="/admin"/>
                            <Href Title={ <span>Sales</span> } Icon={ SalesLogo } Redirect="/admin/sales"/>
                            <Href Title={ <span>Product List</span> } Icon={ OrderlistLogo } Redirect="/admin/menu_management"/>
                            <Href Title={ <span>Inventory</span> } Icon={ InventoryLogo } Redirect="/admin/inventory_management"/>
                            <Href Title={ <span>Employee</span> } Icon={ EmployeeLogo } Redirect="/admin/employee_management"/>
                            <Href Title={ <span>Customers</span> } Icon={ CustomerLogo } Redirect="/admin/customer_management"/>
                            <Href Title={ <span>Logout</span> } Icon={ LogoutLogo } Onclick={ Logout } />
                        </>
                    }
                </nav>
            </div>
        </aside>
    )
}