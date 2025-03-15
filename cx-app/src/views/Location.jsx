import React from 'react'

import { Body_useClass, Title } from '../../../Main_App/src/components/components_exporter'
import '../../../Main_App/src/Static/css/Location.sass'
import GoogleMapEmbed from '../Components/Map/GoogleMap'


export default function LocationPage() {
    Title("Metro 7 | Location")
    Body_useClass("locationpage")

    return(
        <>
        <main className="PCMOD-body">
            <section className="locationsection">
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
                    <GoogleMapEmbed />
                </section>
            </section>
        </main>
        </>
    )
}