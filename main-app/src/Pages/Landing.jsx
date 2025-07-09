import React from 'react'
import '../assets/css/pages/Landing.sass'
import { ScreenWidth, Title, Body_addclass, PreOrderSectionHeight, Main, Section, Group, Button, GMap } from '../Exporter/component_exporter'
import { Logo } from '../Exporter/public_exporter'
import { useStateContext } from "../Contexts/ContextProvider";

export default function LandingPage() {
    Title(`Metro 7`)
    Body_addclass(`Landing-PAGE`)
    const { user } = useStateContext()

    const screenwidth = ScreenWidth()
    PreOrderSectionHeight()

    return(
        <>
        <Main>
            <Section Class='pre-order' ID="pre-order">
                { screenwidth > 766 ?
                    <h1>Want to order in advance before<br />you arrive?</h1>
                    :
                    <h2>Want to order in advance before you arrive?</h2>
                }
                <Button Title='PRE-ORDER NOW' Redirect={ user && user.id ? '/customer/reservation' : '/login' } BtnWhite />
            </Section>
            <Section Class='about'>
                { screenwidth > 1023 && (
                    <div>
                        <img src={ Logo } />
                    </div>
                ) }
                <Group Class='description' ID="description" Col>
                    <h2>OUR STORY</h2>
                    <p>
                        Metro 7 is a company built by 7 individuals born in 2023, they came up with a plan 
                        of starting a business within the food and beverages industry sharing capital to start 
                        the business. Hence the birth of Metro 7 Restaurant and Bar catering to both food
                        enthusiasts and nightlife enthusiasts. Our menu features a curated selection of dishes 
                        inspired by international cuisines, crafted with fresh ingredients and a modern twist. 
                        Paired with our wide range of signature cocktails, wines, and craft beverages, every 
                        visit promises a memorable culinary experience.
                    </p>
                </Group>
            </Section>
            <Section Class='location' ID="loc">
                {screenwidth > 766 ?
                    <>
                        <h2>OUR LOCATION</h2>
                        <Group>
                            <article>
                                <h4>
                                    Metrowalk Commercial Complex Meralco Ave., Pasig, Metro Manila
                                </h4>
                                <h4>+63 9952332528</h4>
                                <h4>businessemail@email.com</h4>
                            </article>
                            <Group Class='map'>
                                <GMap />
                            </Group>
                        </Group>
                    </>
                    :
                    <>
                        <h3>OUR LOCATION</h3>
                        <Group Col>
                            <Group Class='map'>
                                <GMap />
                            </Group>
                            <article>
                                <h3>
                                    Metrowalk Commercial Complex Meralco Ave., Pasig, Metro Manila
                                </h3>
                                <h3>+63 9952332528</h3>
                                <h3>businessemail@email.com</h3>
                            </article>
                        </Group>
                    </>
                }
            </Section>
        </Main>
        </>
    )
}
