import React from 'react'
import '../../Assets/css/components/header.sass'
import '../../Assets/css/components/menu_burger.css'
import { ScreenWidth, HeaderHeight, Href } from '../../Exporter/component_exporter'
import { TextLogo } from '../../Exporter/public_exporter'

export default function Header({ AuthenticatedMode, Logout }) {
    HeaderHeight()
    const screenwidth = ScreenWidth()

    const navitems = [
        { GuestItem: true, CustItem: true, Title: "HOME", Redirect: "/" },
        
        { GuestItem: true, Title: "MENU", Redirect: "/menu" },
        { GuestItem: true, Title: "LOGIN", Redirect: "/login" },

        { CustItem: true, Title: "PRE-ORDER", Redirect: "/menu" },
        { CustItem: true, Title: "RESERVATION", Redirect: "/reservation" },
        { CustItem: true, Title: AuthenticatedMode, DropDown: true },
        { CustItem: true, DropDownItem: true, Title: "PROFILE", Redirect: "/profile" },
        { CustItem: true, DropDownItem: true, Title: "LOGOUT", Onclick: Logout }
    ]

    return(
        <header>
            <div>
                <img src={ TextLogo } />
                { screenwidth > 766 ? 
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && !item.DropDownItem ).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } DropDown={ item.DropDown } />
                            ))}
                            <ul className="dropdown-menu dropdown-menu-end">
                                { navitems.filter( item => item.CustItem && item.DropDownItem ).map(( item, index ) => (
                                    <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } Onclick={ item.Onclick } />
                                ))}
                            </ul>
                            </>
                            :
                            <>
                            { navitems.filter( item => item.GuestItem ).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } />
                            ))}
                            </>
                        }
                    </nav>
                    :  
                    <div className="burger">
                        <input type="checkbox" href="#NavMenu" data-bs-toggle="collapse" data-bs-target="#collapseExample" />
                    </div>
                }
            </div>
            { screenwidth <= 766 && (
                <div className="collapse" id="collapseExample">
                    <nav>
                        { AuthenticatedMode ?
                            <>
                            { navitems.filter( item => item.CustItem && item.Title !== AuthenticatedMode ).map(( item, index ) => (
                                <Href key={ index } Title={ item.Title } Redirect={ item.Redirect } DropDown={ item.DropDown } Onclick={ item.Onclick }  />
                            ))}
                            </>
                            :
                            <>
                            { navitems.filter( item => item.GuestItem ).map(( item, index ) => (
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
