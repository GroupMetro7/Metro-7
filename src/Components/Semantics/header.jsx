import React from 'react'
import '../../assets/css/components/header.sass'
import { Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'

export default function Header({ AuthenticatedMode }) {
    return(
        <header>
            <div>
                <img src={ TextLogo } />
                <nav>
                    { AuthenticatedMode ?
                        <>
                            <Href Title='HOME' Redirect='/' />
                            <Href Title='LOCATION' Redirect='/location' />
                            <Href Title='PRE-ORDER' Redirect='/menu' />
                            <Href Title='RESERVATION' Redirect='/reservation' />
                            <Href Title={ AuthenticatedMode } DropDown />
                            <ul class="dropdown-menu dropdown-menu-end">
                                <Href Title='PROFILE' Redirect='/profile' / >
                                <Href Title='LOGOUT' Redirect='' />
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
            </div>
        </header>
    )
}