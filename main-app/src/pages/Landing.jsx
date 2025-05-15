import React from 'react'
import '../assets/css/pages/Landing.sass'
import { ScreenWidth, Title, Body_addclass, Header, Footer, Main, Section, Group, Button } from '../Exporter/component_exporter'
import { Logo } from '../exporter/public_exporter'
import { useStateContext } from '../Contexts/ContextProvider'

export default function LandingPage() {
    Title('Metro 7 | Login')
    Body_addclass('Landing-PAGE')
    const screenwidth = ScreenWidth()

    const { token } = useStateContext();

    return(
        <>
        <Main>
            <Section Class='pre-order'>
                { screenwidth > 766 ? 
                    <h1>Want to order in advance before<br />you arrive?</h1>
                    : 
                    <h2>Want to order in advance before you arrive?</h2>
                }
                <Button Title='PRE-ORDER NOW' Redirect={ token ? '/reservation' : '/login' } BtnWhite />
            </Section>
            <Group Class='about'>
                { screenwidth > 1023 && (
                    <div>
                        <img src={ Logo } />
                    </div>
                ) }
                <Group Class='description' Col>
                    { screenwidth > 766 ? 
                        <h2>OUR STORY</h2>
                        :
                        <h3>OUR STORY</h3>
                    }
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
