import React, { useEffect } from 'react'
import '../Static/css/Location.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

function LocationPage() {
    useEffect(() => {
        document.body.classList.add("locationpage");
        return () => {
            document.body.classList.remove("locationpage");
        };
        }, []);

    return(
        <>
        <title>Metro 7</title>
        <header>
            <Header/>
        </header>
        <main class="PCMOD-body">
            <div class="locationsection">
                <span>OUR LOCATION</span>
                <div class="container">
                    <div class="text">
                        <span>
                            Metrowalk Commercial Complex Meralco Ave., Pasig, Metro
                            Manila
                        </span>
                        <span>+63 9952332528</span>
                        <span>Businessemail@email.com</span>
                    </div>
                    <img src="" alt="image73463"/>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    )
}

export default LocationPage