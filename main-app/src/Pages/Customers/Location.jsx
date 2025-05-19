import React from 'react'
import '../../assets/css/pages/customers/Location.sass'
import { ScreenWidth, Title, Body_addclass, Header, Footer, Main, Section, Box, GMap, Group } from '../../Exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'
import CustomerLayout from '../../components/Layout/CustomerLayout'
import GuestLayout from '../../components/Layout/GuestLayout'

export default function LocationPage() {
    const { token} = useStateContext();
    Title('Metro 7 | Location')
    Body_addclass('Location-PAGE')
    const screenwidth = ScreenWidth()

    return(
        <>{token ? (
          <CustomerLayout />
        ):(
          <GuestLayout />
        )}
        <Main>
            <Section Title='OUR LOCATION' Class='location'>
                { screenwidth > 766 ? 
                    <Box>
                        <article>
                            <h2>
                                Metrowalk Commercial Complex Meralco Ave., Pasig, Metro
                                Manila
                            </h2>
                            <h2>+63 9952332528</h2>
                            <h2>Businessemail@email.com</h2>
                        </article>
                        <Group Class='map'>
                            <GMap />
                        </Group>
                    </Box>
                    :
                    <Box BoxCol>
                        <Group Class='map'>
                            <GMap />
                        </Group>
                        <article>
                            <h3>
                                Metrowalk Commercial Complex Meralco Ave., Pasig, Metro
                                Manila
                            </h3>
                            <h3>+63 9952332528</h3>
                            <h3>Businessemail@email.com</h3>
                        </article>
                    </Box>
                }
            </Section>
        </Main>
        <Footer />
        </>
    )
}
