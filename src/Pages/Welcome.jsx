import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import '../Static/css/Welcome.css'
import Header from '../Components/header'
import Footer from '../Components/footer'
import LOGO2 from '../Static/assets/img/LOGO.png'

function WelcomePage() {
    useEffect(() => {
        document.body.classList.add("landingpage");
        return () => {
            document.body.classList.remove("landingpage");
        };
    }, []);

    const navigate = useNavigate();

    return(
        <>
        <title>Metro 7</title>
        <header>
            <Header/>
        </header>
        <main class="PCMOD-body">
            <div class="preordersection">
                <span>Want to order in advance before<br/>you arrive?</span>
                <button onClick={() => navigate("/login")}>Pre-order now</button>
            </div>
            <div class="aboutsection">
                <div class="logoside">
                    <img src={LOGO2}/>
                </div>
                <div class="descriptionside">
                    <div class="text">
                        <div class="ourstory">Our Story</div>
                        <div class="description">
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a
                            type specimen book. It has survived not only five centuries,
                            but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with
                            the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software
                            like Aldus PageMaker including versions of Lorem Ipsum.
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    )
}

export default WelcomePage