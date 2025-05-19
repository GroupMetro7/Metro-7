import React from 'react'
import '../../assets/css/pages/customers/Location.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Box } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import GoogleMapEmbed from '../../Components/Map/GoogleMap'
import CustomerLayout from '../../components/Layout/CustomerLayout'
import GuestLayout from '../../components/Layout/GuestLayout'

export default function LocationPage() {
    const { token} = useStateContext();
    Title('Metro 7 | Location')
    Body_addclass('Location-PAGE')

    return(
        <>{token ? (
          <CustomerLayout />
        ):(
          <GuestLayout />
        )}
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
                    <GoogleMapEmbed />
                </Box>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
