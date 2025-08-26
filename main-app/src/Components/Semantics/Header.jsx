import React from 'react'
import '../../Assets/CSS/Components/Header.sass'
import '../../Assets/CSS/Components/Menu_burger.css'
import { ScreenWidth, HeaderHeight, Href } from '../../Exporter/Component_Exporter'
import { M7Logo, TextLogo, DashboardLogo, OrderlistLogo, ProfileLogo, SalesLogo, InventoryLogo, EmployeeLogo, CustomerLogo, LogoutLogo, OrderhistoryLogo, ActivityLogsLogo } from '../../Exporter/Public_Exporter'

export default function Header({ AuthenticatedMode, ServiceMode, AdminMode, Logout }) {
    HeaderHeight()
    const screenwidth = ScreenWidth()

    const navitems = [
        { GuestItem: 1, CustItem: 1, Title: `HOME`, Redirect: `/` },
        
        { GuestItem: 2, Title: `MENU`, Redirect: `/menu` },

        { CustItem: 2, Title: `PRE-ORDER`, Redirect: `/menu` },
        { CustItem: 3, Title: `RESERVATION`, Redirect: `/reservation` },
        { CustItem: 4 , Title: AuthenticatedMode, DropDown: true },
        { CustItem: 999, DropDownItem: 1, Title: `PROFILE`, Redirect: `/profile` },

        { ServiceItem: 1, AdminItem: 1, Title: `Dashboard`, Icon: DashboardLogo, Redirect: `/` },
        { ServiceItem: 2, AdminItem: 4, Title: `Order List`, Icon: OrderlistLogo, Redirect: `/orderlist` },
        { ServiceItem: 3, AdminItem: 5, Title: `Res. List`, Icon: OrderlistLogo, Redirect: `/reservationlist` },
        { ServiceItem: 4, AdminItem: 6, Title: `Order History`, Icon: OrderhistoryLogo, Redirect: `/order_history` },

        { ServiceItem: 5, Title: `Profile`, Icon: ProfileLogo, Redirect: `/profile` },

        { AdminItem: 2, Title: `Sales`, Icon: SalesLogo, Redirect: `/sales` },
        { AdminItem: 3, Title: `Forecasts`, Icon: CustomerLogo, Redirect: `/df` },
        { AdminItem: 7, Title: `Product List`, Icon: OrderlistLogo, Redirect: `/product_management` },
        { AdminItem: 8, Title: `Inventory`, Icon: InventoryLogo, Redirect: `/inventory_management` },
        { AdminItem: 9, Title: `Employee`, Icon: EmployeeLogo, Redirect: `/employee_management` },
        { AdminItem: 10, Title: `Customer`, Icon: CustomerLogo, Redirect: `/customer_management` },
        { AdminItem: 11, Title: `Activity Logs`, Icon: ActivityLogsLogo, Redirect: `/logs` },
        
        { GuestItem: 999, Title: `LOGIN`, Redirect: `/login` },

        { CustItem: 999, ServiceItem: 999, AdminItem: 999, DropDownItem: 999, Title: `LOGOUT`, Icon: LogoutLogo, Onclick: Logout }
    ]

    return(
        <header>
            <div>
                { ServiceMode || AdminMode ?
                    <img src={ M7Logo }/>
                    :
                    <img src={ TextLogo } />
                }
                { screenwidth > 766 ? 
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && !item.DropDownItem ).sort((item1, item2) => item1.CustItem - item2.CustItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect && `/customer${item.Redirect}` } DropDown={ item.DropDown } />
                            ))}
                            <ul className={`dropdown-menu dropdown-menu-end`}>
                                { navitems.filter( item => item.CustItem && item.DropDownItem ).sort((item1, item2) => item1.DropDownItem - item2.DropDownItem).map(( item, index ) => (
                                    <Href key={ index } Title={ item.Title } Redirect={ item.Redirect && `/customer${item.Redirect}` } Onclick={ item.Onclick } />
                                ))}
                            </ul>
                            </>
                            :
                            <>
                            { navitems.filter( item => item.GuestItem ).sort((item1, item2) => item1.GuestItem - item2.GuestItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } />
                            ))}
                            </>
                        }
                    </nav>
                    :  
                    <div className={`burger`}>
                        <input className={`burger-in`} type={`checkbox`} href={`#NavMenu`} data-bs-toggle={`collapse`} data-bs-target={`#collapseExample`} />
                    </div>
                }
            </div>
            { screenwidth <= 766 && (
                <div className={`collapse`} id={`collapseExample`}>
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && item.Title !== AuthenticatedMode ).sort((a, b) => a.CustItem !== b.CustItem ? a.CustItem - b.CustItem : a.DropDownItem - b.DropDownItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect && `/customer${item.Redirect}` } Onclick={ item.Onclick } />
                            ))}
                            </>
                            :
                            ServiceMode ? 
                            <>
                            { navitems.filter( item => item.ServiceItem ).sort((item1, item2) => item1.ServiceItem - item2.ServiceItem).map(( item, index ) => (
                                <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } IconBadge={ item.IconBadge } Redirect={ item.Redirect && `/service${item.Redirect}` } Onclick={ item.Onclick } />
                            ))}
                            </>
                            :
                            AdminMode ? 
                            <>
                            { navitems.filter( item => item.AdminItem ).sort((item1, item2) => item1.AdminItem - item2.AdminItem).map(( item, index ) => (
                                <Href key={ index } Title={ <span>{ item.Title }</span> } Icon={ item.Icon } IconBadge={ item.IconBadge } Redirect={ item.Redirect && `/admin${item.Redirect}` } Onclick={ item.Onclick } />
                            ))}
                            </>
                            :
                            <>
                            { navitems.filter( item => item.GuestItem ).sort((item1, item2) => item1.GuestItem - item2.GuestItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } />
                            ))}
                            </>
                        }
                    </nav>
                </div>
            ) }
        </header>
    )
}
