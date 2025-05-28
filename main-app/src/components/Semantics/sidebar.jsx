import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Href, SideBarWeight } from '../../Exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo } from '../../Exporter/public_exporter'

export default function SideBar({ ServiceMode, AdminMode, Logout }) {
    SideBarWeight()

    const navitems = [
        { ServiceItem: true, Title: "Dashboard", Icon: DashboardLogo, Redirect: "/service" },
        { ServiceItem: true, Title: "Order List", Icon: OrderlistLogo, Redirect: "/service/orderlist" },
        { ServiceItem: true, Title: "Profile", Icon: ProfileLogo, Redirect: "/service/profile" },

        { AdminItem: true, Title: "Dashboard", Icon: DashboardLogo, Redirect: "/admin" },
        { AdminItem: true, Title: "Sales", Icon: SalesLogo, Redirect: "/admin/sales" },
        { AdminItem: true, Title: "Product List", Icon: OrderlistLogo, Redirect: "/admin/menu_management" },
        { AdminItem: true, Title: "Inventory", Icon: InventoryLogo, Redirect: "/admin/inventory_management" },
        { AdminItem: true, Title: "Employee", Icon: EmployeeLogo, Redirect: "/admin/employee_management" },
        { AdminItem: true, Title: "Customers", Icon: CustomerLogo, Redirect: "/admin/customer_management" },

        { ServiceItem: true, AdminItem: true, Title: "Logout", Icon: LogoutLogo, Onclick: Logout }
    ]

    return(
        <aside className="sidebar">
            <div>
                <img src={ M7Logo }/>
                <nav>
                    { ServiceMode && 
                        navitems.filter( item => item.ServiceItem ).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect } Onclick={ item.Onclick } />
                        )) 
                    ||
                    AdminMode && 
                        navitems.filter( item => item.AdminItem ).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect } Onclick={ item.Onclick } />
                        ))
                    }
                </nav>
            </div>
        </aside>
    )
}