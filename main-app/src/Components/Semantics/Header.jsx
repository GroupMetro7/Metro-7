import React from 'react'
import '../../Assets/css/components/header.sass'
import '../../Assets/css/components/menu_burger.css'
import { ScreenWidth, HeaderHeight, Href } from '../../Exporter/component_exporter'
import { TextLogo } from '../../Exporter/public_exporter'

export default function Header({ AuthenticatedMode, Logout }) {
    HeaderHeight()
    const screenwidth = ScreenWidth()

    const navitems = [
        { GuestItem: 1, CustItem: 1, Title: "HOME", Redirect: "/" },
        
        { GuestItem: 2, Title: "MENU", Redirect: "/menu" },

        { CustItem: 2, Title: "PRE-ORDER", Redirect: "/menu" },
        { CustItem: 3, Title: "RESERVATION", Redirect: "/reservation" },
        { CustItem: 4 , Title: AuthenticatedMode, DropDown: true },
        { CustItem: 999, DropDownItem: 1, Title: "PROFILE", Redirect: "/profile" },

        { GuestItem: 999, Title: "LOGIN", Redirect: "/login" },
        { CustItem: 999, DropDownItem: 999, Title: "LOGOUT", Onclick: Logout }
    ]

    return(
        <header>
            <div>
                <img src={ TextLogo } />
                { screenwidth > 766 ? 
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && !item.DropDownItem ).sort((item1, item2) => item1.CustItem - item2.CustItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect && `/customer${item.Redirect}` } DropDown={ item.DropDown } />
                            ))}
                            <ul className="dropdown-menu dropdown-menu-end">
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
                    <div className="burger">
                        <input className="burger-in" type="checkbox" href="#NavMenu" data-bs-toggle="collapse" data-bs-target="#collapseExample" />
                    </div>
                }
            </div>
            { screenwidth <= 766 && (
                <div className="collapse" id="collapseExample">
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && item.Title !== AuthenticatedMode ).sort((a, b) => a.CustItem !== b.CustItem ? a.CustItem - b.CustItem : a.DropDownItem - b.DropDownItem).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ `/customer${item.Redirect}` } DropDown={ item.DropDown } Onclick={ item.Onclick }  />
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
