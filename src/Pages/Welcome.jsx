import React from 'react'
import '../Static/css/Welcome.sass'
import { Header, Footer, Body_useClass, Title, Button } from '../Components/$exporter_components'
import { LOGO } from '../Static/assets/$exporter_assets'

export default function WelcomePage() {
    Title("Metro 7");
    Body_useClass("landingpage");

    return(
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="preordersection">
                <h1>Want to order in advance before<br/>you arrive?</h1>
                <Button label={"PRE-ORDER NOW"} navigatation={"/login"}/>
            </section>
            <section class="aboutsection">
                <aside>
                    <img src={ LOGO }/>
                </aside>
                <article>
                    <h2>Our Story</h2>
                    <p>
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
                    </p>
                </article>
            </section>
            <Footer/>
        </main>
        </>
    )
}