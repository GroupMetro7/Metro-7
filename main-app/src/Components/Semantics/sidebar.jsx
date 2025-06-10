import React from 'react'
import '../../assets/css/components/sidebar.sass'
import { Href, SideBarWeight } from '../../Exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo, OrderhistoryLogo } from '../../Exporter/public_exporter'

export default function SideBar({ ServiceMode, AdminMode, Logout }) {
    SideBarWeight()

    const navitems = [
        { ServiceItem: true, Title: "Dashboard", Icon: DashboardLogo, Redirect: "/" },
        { ServiceItem: true, Title: "Order List", Icon: OrderlistLogo, Redirect: "/orderlist" },
        { ServiceItem: true, Title: "Order History", Icon: OrderhistoryLogo, Redirect: "/order_history" },
        { ServiceItem: true, Title: "Profile", Icon: ProfileLogo, Redirect: "/profile" },

        { AdminItem: true, Title: "Dashboard", Icon: DashboardLogo, Redirect: "/" },
        { AdminItem: true, Title: "Sales", Icon: SalesLogo, Redirect: "/sales" },
        { AdminItem: true, Title: "Order History", Icon: OrderhistoryLogo, Redirect: "/order_history" },
        { AdminItem: true, Title: "Product List", Icon: OrderlistLogo, Redirect: "/menu_management" },
        { AdminItem: true, Title: "Inventory", Icon: InventoryLogo, Redirect: "/inventory_management" },
        { AdminItem: true, Title: "Employee", Icon: EmployeeLogo, Redirect: "/employee_management" },
        { AdminItem: true, Title: "Activity Logs", Icon: CustomerLogo, Redirect: "/logs" },

        { ServiceItem: true, AdminItem: true, Title: "Logout", Icon: LogoutLogo, Onclick: Logout }
    ]

    return(
        <aside className="sidebar">
            <div>
                <img src={ M7Logo }/>
                <nav>
                    { ServiceMode && 
                        navitems.filter( item => item.ServiceItem ).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect && `/service${item.Redirect}` } Onclick={ item.Onclick } />
                        )) 
                    ||
                    AdminMode && 
                        navitems.filter( item => item.AdminItem ).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect && `/admin${item.Redirect}` } Onclick={ item.Onclick } />
                        ))
                    }
                </nav>
            </div>
        </aside>
    )
}