import React from 'react'
import '../../assets/css/components/footer.sass'
import { Inputbox, Href } from '../../exporter/component_exporter'
import { Logo, FBLogo, XLogo, IGLogo, PhoneLogo, LocationLogo } from '../../exporter/public_exporter'

export default function Footer() {
    return(
        <footer>
            <img src={ Logo }/>
            <div className='contactside'>
                <div className='logos'>
                    <img src={ FBLogo }/>
                    <img src={ XLogo }/>
                    <img src={ IGLogo }/>
                </div>
                <div className='contact'>
                    <figure>
                        <img src={ PhoneLogo }/>
                        <figurecaption>+63 9952332528</figurecaption>
                    </figure>
                    <figure>
                        <img src={ LocationLogo }/>
                        <figurecaption>Metrowalk, Pasig City</figurecaption>
                    </figure>
                </div>
            </div>
            <nav>
                <Href Title='HOME' Redirect='/' HrefWhite/>
                <Href Title='LOCATION' Redirect='/location' HrefWhite/>
                <Href Title='MENU' Redirect='/menu' HrefWhite/>
                <Href Title='LOGIN' Redirect='/login' HrefWhite/>
            </nav>
            <div className='privacytermsside'>
                <Href Title='PRIVACY & TERMS' HrefWhite/>
                <div>
                    <Inputbox Title='Email' Type='email' InCol InWhite/>
                    <p>Receive news from us!</p>
                </div>
            </div>
        </footer>
    )
}
