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

    const navWrapperRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollStep = 53*2;

  const updateButtons = () => {
    if (!navWrapperRef.current) {
      return {
        disablePrev: true,
        disableNext: true,
      };
    }
    const maxScroll =
      navWrapperRef.current.scrollHeight - navWrapperRef.current.clientHeight;
    return {
      disablePrev: scrollPosition <= 0,
      disableNext: scrollPosition >= maxScroll,
    };
  };

  const handleNext = () => {
    if (!navWrapperRef.current) return;
    const maxScroll =
      navWrapperRef.current.scrollHeight - navWrapperRef.current.clientHeight;
    const newPosition = Math.min(scrollPosition + scrollStep, maxScroll);
    navWrapperRef.current.scrollTop = newPosition;
    setScrollPosition(newPosition);
  };

  const handlePrev = () => {
    if (!navWrapperRef.current) return;
    const newPosition = Math.max(scrollPosition - scrollStep, 0);
    navWrapperRef.current.scrollTop = newPosition;
    setScrollPosition(newPosition);
  };

  useEffect(() => {
    const ref = navWrapperRef.current;
    const onScroll = () => {
      setScrollPosition(ref.scrollTop);
    };
    ref.addEventListener("scroll", onScroll);
    return () => ref.removeEventListener("scroll", onScroll);
  }, []);

    const showScrollButtons =
        (AdminMode && navitems.filter(item => item.AdminItem).length >= 7) ||
        (ServiceMode && navitems.filter(item => item.ServiceItem).length >= 7);

    return(
        <aside className="sidebar">
            <div>
                <img src={ M7Logo }/>
                <nav>
                    {/* { showScrollButtons && (
                        <Href Title={ <span>Previous</span> } Icon={ PrevLogo } Onclick={handlePrev} />
                    )} */}
                    <div ref={navWrapperRef}>
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
                    </div>
                    {/* {showScrollButtons && (
                        <Href Title={ <span>Next</span> } Icon={ NextLogo } Onclick={handleNext} />
                    )} */}
                </nav>
            </div>
        </aside>
    )
}