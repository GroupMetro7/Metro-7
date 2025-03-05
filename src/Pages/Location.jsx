import React from 'react'
import '../Static/css/Location.sass'
import { Header, Footer, Body_useClass, Title } from '../Components/$exporter_components'

export default function LocationPage() {
    Title("Metro 7 | Location");
    Body_useClass("locationpage");

    return(
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="locationsection">
                <h1>OUR LOCATION</h1>
                <section>
                    <article>
                        <h2>
                            Metrowalk Commercial Complex Meralco Ave., Pasig, Metro
                            Manila
                        </h2>
                        <h2>+63 9952332528</h2>
                        <h2>Businessemail@email.com</h2>
                    </article>
                    <img src="" alt="image73463"/>
                </section>
            </section>
            <Footer/>
        </main>
        </>
    )
}