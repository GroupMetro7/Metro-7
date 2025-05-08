import React from 'react'
import '../../Assets/css/components/header.sass'
import '../../Assets/css/components/menu_burger.css'
import { Href } from '../../Exporter/component_exporter'
import { TextLogo } from '../../Exporter/public_exporter'

export default function Header({ AuthenticatedMode }) {
    return(
        <header>
            <div className="header">
                <img src={ TextLogo } />
                <nav>
                    { AuthenticatedMode ?
                        <>
                            <Href Title='HOME' Redirect='/' />
                            <Href Title='LOCATION' Redirect='/location' />
                            <Href Title='PRE-ORDER' Redirect='/menu' />
                            <Href Title='RESERVATION' Redirect='/reservation' />
                            <Href Title={ AuthenticatedMode } Redirect='/login' />
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
                <div className="burger">
                <div class="menu btn1" data-menu="1">
        <div class="icon-left"></div>
        <div class="icon-right"></div>
        </div>
                    <input type="checkbox" href="#NavMenu" data-bs-toggle="collapse" data-bs-target="#collapseExample" />
                </div>
            </div>
            <div class="collapse" id="collapseExample">
                <nav>
                    { AuthenticatedMode ?
                        <>
                            <Href Title='HOME' Redirect='/' />
                            <Href Title='LOCATION' Redirect='/location' />
                            <Href Title='PRE-ORDER' Redirect='/menu' />
                            <Href Title='RESERVATION' Redirect='/reservation' />
                            <Href Title={ AuthenticatedMode } Redirect='/login' />
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
        </header>
    )
}
