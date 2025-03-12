import React from 'react'
import '../../Static/css/Location.sass'
import { Title, Body_useClass, Header, Footer } from '../../Components/components_exporter'

export default function LocationPage() {
    Title("Metro 7 | Location")
    Body_useClass("locationpage")

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
                    <img src=""/>
                </section>
            </section>
            <Footer/>
        </main>
        </>
    )
}