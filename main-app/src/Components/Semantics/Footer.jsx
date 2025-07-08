import React from 'react'
import '../../assets/css/components/footer.sass'
import { ScreenWidth, FooterHeight, Inputbox, Href } from '../../Exporter/component_exporter'
import { Logo, FBLogo, XLogo, IGLogo, PhoneLogo, LocationLogo } from '../../Exporter/public_exporter'

export default function Footer() {
    FooterHeight()
    const screenwidth = ScreenWidth();

    return(
        <footer>
            <img src={ Logo }/>
            <div>
                {/* <div>
                    <img src={ FBLogo }/>
                    <img src={ XLogo }/>
                    <img src={ IGLogo }/>
                </div> */}
                <div>
                    <figure>
                        <img src={ PhoneLogo }/>
                        <figurecaption>+63 9952332528</figurecaption>
                    </figure>
                    <figure>
                        <img src={ LocationLogo }/>
                        <figurecaption>Metrowalk, Pasig City</figurecaption>
                    </figure>
                </div>
                { screenwidth < 1265 && <Href Title='PRIVACY & TERMS' HrefWhite/> }
            </div>
            { screenwidth > 1266 &&
            <nav>
                <Href Title='HOME' Redirect='/' HrefWhite/>
                <Href Title='MENU' Redirect='/menu' HrefWhite/>
                <Href Title='LOGIN' Redirect='/login' HrefWhite/>
                <Href Title='PRIVACY & TERMS' HrefWhite/>
            </nav>
            }
        </footer>
    )
}
