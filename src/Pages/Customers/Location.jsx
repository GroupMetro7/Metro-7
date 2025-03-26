import React from 'react'
import '../../assets/css/pages/customers/Location.sass'
import { user } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Box } from '../../exporter/component_exporter'

export default function LocationPage() {
    Title('Metro 7 | Location')
    Body_addclass('Location-PAGE')

    return(
        <>
        <Header AuthenticatedMode={ user } />
        <Main>
            <Section Title='OUR LOCATION' Class='location'>
                <Box>
                    <article>
                        <h2>
                            Metrowalk Commercial Complex Meralco Ave., Pasig, Metro
                            Manila
                        </h2>
                        <h2>+63 9952332528</h2>
                        <h2>Businessemail@email.com</h2>
                    </article>
                    <img src='' />
                </Box>
            </Section>
        </Main>
        <Footer />
        </>
    )
}