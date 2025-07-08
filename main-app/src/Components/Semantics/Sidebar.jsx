import React, { useRef, useEffect, useState } from 'react'
import '../../assets/css/components/sidebar.sass'
import { Href, SideBarWeight } from '../../Exporter/component_exporter'
import { M7Logo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo, OrderhistoryLogo, PrevLogo, NextLogo } from '../../Exporter/public_exporter'

export default function SideBar({ ServiceMode, AdminMode, Logout }) {
    SideBarWeight()

    const navitems = [
        { ServiceItem: 1, AdminItem: 1, Title: "Dashboard", Icon: DashboardLogo, Redirect: "/" },
        { ServiceItem: 3, AdminItem: 4, Title: "Order History", Icon: OrderhistoryLogo, Redirect: "/order_history" },

        { ServiceItem: 2, Title: "Order List", Icon: OrderlistLogo, Redirect: "/orderlist" },
        { ServiceItem: 4, Title: "Profile", Icon: ProfileLogo, Redirect: "/profile" },

        { AdminItem: 2, Title: "Sales", Icon: SalesLogo, Redirect: "/sales" },
        { AdminItem: 3, Title: "Forecasts", Icon: CustomerLogo, Redirect: "/df" },
        { AdminItem: 5, Title: "Product List", Icon: OrderlistLogo, Redirect: "/menu_management" },
        { AdminItem: 6, Title: "Inventory", Icon: InventoryLogo, Redirect: "/inventory_management" },
        { AdminItem: 7, Title: "Employee", Icon: EmployeeLogo, Redirect: "/employee_management" },
        { AdminItem: 8, Title: "Customer", Icon: CustomerLogo, Redirect: "/customer_management" },
        { AdminItem: 9, Title: "Activity Logs", Icon: CustomerLogo, Redirect: "/logs" },

        { ServiceItem: 999, AdminItem: 999, Title: "Logout", Icon: LogoutLogo, Onclick: Logout }
    ]

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSidebar = () => {
        setIsExpanded(prev => !prev);
    };

    return(
        <aside className={`sidebar ${isExpanded ? 'expanded' : ''}`} onClick={toggleSidebar}>
            <div>
                <div>
                  <img src={ M7Logo }/>
                  <h1>{ ServiceMode && ServiceMode || AdminMode && AdminMode }</h1>
                </div>
                <nav>
                    {/* { showScrollButtons && (
                        <Href Title={ <span>Previous</span> } Icon={ PrevLogo } Onclick={handlePrev} />
                    )} */}
                    { ServiceMode && 
                        navitems.filter( item => item.ServiceItem ).sort((item1, item2) => item1.ServiceItem - item2.ServiceItem).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect && `/service${item.Redirect}` } Onclick={ item.Onclick } />
                        )) 
                    ||
                    AdminMode && 
                        navitems.filter( item => item.AdminItem ).sort((item1, item2) => item1.AdminItem - item2.AdminItem).map(( item, index ) => (
                            <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } Redirect={ item.Redirect && `/admin${item.Redirect}` } Onclick={ item.Onclick } />
                        )) 
                    }
                    {/* {showScrollButtons && (
                        <Href Title={ <span>Next</span> } Icon={ NextLogo } Onclick={handleNext} />
                    )} */}
                </nav>
            </div>
        </aside>
    )
}