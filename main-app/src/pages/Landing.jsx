import React from 'react'
import '../assets/css/pages/Landing.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Button } from '../exporter/component_exporter'
import { Logo } from '../exporter/public_exporter'
import { useStateContext } from '../Contexts/ContextProvider'

export default function LandingPage() {
    Title('Metro 7 | Login')
    Body_addclass('Landing-PAGE')

    const user = "Micheal Lance Kester Li"

    const { token } = useStateContext();

    return(
        <>
        <Main>
            <Section Title={ <>Want to order in advance before<br />you arrive?</> } Class='pre-order'>
                <Button Title='PRE-ORDER NOW' Redirect={ token ? '/reservation' : '/login' } BtnWhite />
            </Section>
            <Group Class='about'>
                <div>
                    <img src={ Logo } />
                </div>
                <Group Class='description' Col>
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
                </Group>
            </Group>
        </Main>
        <Footer />
        </>
    )
}
