import React from 'react'
import '../../Static/css/Components/FOOTER.sass'
import { Inputbox, Href } from '../components_exporter'
import { LOGO, FBLOGO, XLOGO, IGLOGO, PHONELOGO, LOCLOGO } from '../../Static/public_exporter'

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
                <Href name="HOME" navigatation="/"/>
                <Href name="LOCATION" navigatation="/location"/>
                <Href name="MENU" navigatation="/menu"/>
                <Href name="LOGIN" navigatation="/login"/>
            </nav>
            <aside class="privacytermsside">
                <Href name="PRIVACY & TERMS"/>
                <section>
                    <Inputbox name="Email" type="email" formIn/>
                    <span>Receive news from us!</span>
                </section>
            </aside>
        </footer>
        </>
    )
}