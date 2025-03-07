import React from 'react'
import '../../Static/css/Components/HEADER.sass'
import { Href } from '../components_exporter'
import { TEXTLOGO } from '../../Static/assets/$exporter_assets'

export default function Header() {
    return(
        <>
        <header>
            <section>
                    <aside class="titleside">
                        <img src={ TEXTLOGO } />
                    </aside>
                    <nav>
                        <Href name="HOME" navigatation="/"/>
                        <Href name="LOCATION" navigatation="/location"/>
                        <Href name="MENU" navigatation="/menu"/>
                        <Href name="LOGIN" navigatation="/login"/>
                    </nav>
            </section>
        </header>
        </>
    )
}