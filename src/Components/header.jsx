import React from 'react'
import '../Static/css/Components/HEADER.sass'
import { Href } from './$exporter_components'
import { TEXTLOGO } from '../Static/assets/$exporter_assets'

export default function Header() {
    return(
        <>
        <header>
            <section>
                    <aside class="titleside">
                        <img src={ TEXTLOGO } />
                    </aside>
                    <nav>
                        <Href label="HOME" navigatation="/"/>
                        <Href label="LOCATION" navigatation="/location"/>
                        <Href label="MENU"/>
                        <Href label="LOGIN" navigatation="/login"/>
                    </nav>
            </section>
        </header>
        </>
    )
}