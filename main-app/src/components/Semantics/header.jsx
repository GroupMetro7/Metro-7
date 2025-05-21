import React from 'react'
import '../../Assets/css/components/header.sass'
import '../../Assets/css/components/menu_burger.css'
import { ScreenWidth, HeaderHeight, Href } from '../../Exporter/component_exporter'
import { TextLogo } from '../../Exporter/public_exporter'

export default function Header({ AuthenticatedMode, Logout }) {
    HeaderHeight();
    const screenwidth = ScreenWidth();

    return(
        <header>
            <div>
                <img src={ TextLogo } />
                { screenwidth > 766 ? 
                    <nav>
                        { AuthenticatedMode ?
                            <>
                                <Href Title='HOME' Redirect='/' />
                                <Href Title='LOCATION' Redirect='/location' />
                                <Href Title='PRE-ORDER' Redirect='/menu' />
                                <Href Title='RESERVATION' Redirect='/reservation' />
                                <Href Title={ AuthenticatedMode } DropDown />
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <Href Title='PROFILE' Redirect='/profile' />
                                    { Logout }
                                </ul>
                            </>
                            :
                            <>
                                <Href Title='HOME' Redirect='/' />
                                <Href Title='LOCATION' Redirect='/location' />
                                <Href Title='MENU' Redirect='/menu' />
                                <Href Title='LOGIN' Redirect='/login' />
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
                                <Href Title='HOME' Redirect='/' />
                                <Href Title='LOCATION' Redirect='/location' />
                                <Href Title='PRE-ORDER' Redirect='/menu' />
                                <Href Title='RESERVATION' Redirect='/reservation' />
                                <Href Title='PROFILE' Redirect='/profile' />
                                <Href Title='LOGOUT' Onclick={ Logout } />
                            </>
                            :
                            <>
                                <Href Title='HOME' Redirect='/' />
                                <Href Title='LOCATION' Redirect='/location' />
                                <Href Title='MENU' Redirect='/menu' />
                                <Href Title='LOGIN' Redirect='/login' />
                            </>
                        }
                    </nav>
                </div>
            ) }
        </header>
    )
}
