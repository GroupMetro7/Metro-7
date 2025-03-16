import React from 'react'
import '../../assets/css/components/header.sass'
import { Href } from '../../exporter/component_exporter'
import { TextLogo } from '../../exporter/public_exporter'

export default function Header() {
    return(
        <header>
            <div>
                <div className='titleside'>
                    <img src={ TextLogo } />
                </div>
                <nav>
                    <Href Title='HOME' Redirect='/'/>
                    <Href Title='LOCATION' Redirect='/location'/>
                    <Href Title='MENU' Redirect='/'/>
                    <Href Title='LOGIN' Redirect='/login'/>
                </nav>
            </div>
        </header>
    )
}