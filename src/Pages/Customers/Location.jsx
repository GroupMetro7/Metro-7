import React from 'react'
import '../../assets/css/pages/customers/Location.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Box } from '../../exporter/component_exporter'

export default function LocationPage() {
    Title('Metro 7 | Location')
    Body_addclass('Location-PAGE')

    const user = "Micheal Lance Kester Li"

    return(
        <>
        <Header />
        <Main>
            <Section Title='Our Location' Class='location'>
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