import React from 'react'
import '../Static/css/Components/FOOTER.sass'
import { Inputbox, Href } from './$exporter_components'
import { LOGO, FBLOGO, XLOGO, IGLOGO, PHONELOGO, LOCLOGO } from '../Static/assets/$exporter_assets'

export default function Footer() {
    return(
        <>
        <footer>
            <aside class="logoside">
                <img src={ LOGO }/>
            </aside>
            <aside class="contactside">
                <section class="logos">
                    <img src={ FBLOGO }/>
                    <img src={ XLOGO }/>
                    <img src={ IGLOGO }/>
                </section>
                <section class="contact">
                    <figure>
                        <img src={ PHONELOGO }/>
                        <figurecaption>+63 9952332528</figurecaption>
                    </figure>
                    <figure>
                        <img src={ LOCLOGO }/>
                        <figurecaption>Metrowalk, Pasig City</figurecaption>
                    </figure>
                </section>
            </aside>
            <nav>
                <Href label="HOME" navigatation="/"/>
                <Href label="LOCATION" navigatation="/location"/>
                <Href label="MENU"/>
                <Href label="LOGIN" navigatation="/login"/>
            </nav>
            <aside class="privacytermsside">
                <Href label="PRIVACY & TERMS"/>
                <section>
                    <Inputbox label="Email" type="email" colIn/>
                    <span>Receive news from us!</span>
                </section>
            </aside>
        </footer>
        </>
    )
}