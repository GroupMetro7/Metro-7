import React from 'react'
import '../Static/css/Components/FOOTER.css'
import M7LOGO from '../Static/assets/img/LOGO.png'
import FBLOGO from '../Static/assets/img/FOOTER FB LOGO.png'
import XLOGO from '../Static/assets/img/FOOTER X LOGO.png'
import IGLOGO from '../Static/assets/img/FOOTER IG LOGO.png'
import PHONELOGO from '../Static/assets/img/FOOTER PHONE LOGO.png'
import LOCLOGO from '../Static/assets/img/FOOTER LOC LOGO.png'

function Footer() {
    return(
        <>
        <footer>
            <div className="logoside">
                <img src={M7LOGO}/>
            </div>
            <div className="contactside">
                <div className="logos">
                    <img src={FBLOGO}/>
                    <img src={XLOGO}/>
                    <img src={IGLOGO}/>
                </div>
                <div className="contact">
                    <div>
                        <img src={PHONELOGO}/>
                        <span>+63 9952332528</span>
                    </div>
                    <div className="landingpageadd">
                        <img src={LOCLOGO}/>
                        <span>Metrowalk, Pasig City</span>
                    </div>
                </div>
            </div>
            <div className="navside">
                <a href=''>HOME</a>
                <a href=''>LOCATION</a>
                <a href=''>MENU</a>
                <a href=''>PROFILE</a>
            </div>
            <div className="privacytermsside">
                <a href=''>PRIVACY & TERMS</a>
                <div className="receivenewsemail">
                    <div className="email">
                        <span>Email Address:</span>
                        <input type="text"/>
                    </div>
                    <span>Receive news from us!</span>
                </div>
            </div>
        </footer>
        </>
    )
}

export default Footer;