import React from 'react'
import '../../assets/css/pages/customers/Reservation.sass'
import { ScreenWidth, Title, Body_addclass, Header, Footer, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/component_exporter'

export default function ReservationPage() {
    Title('Metro 7 | Reservation')
    Body_addclass('Reservation-PAGE')
    const screenwidth = ScreenWidth()

    const user = "Micheal Lance Kester Li"

    return(
        <>
        <Main>
            <Section Class='reservation'>
                <Form Title='RESERVATION' { ...screenwidth > 766 && { FormTwolayers: true } }>
                    <Group Col>
                        <Group Class='infoside' Col>
                            <h5>HOURS: OPEN - CLOSES 10:00PM</h5>
                            <h5>MOBILE NUMBER: 09952332528</h5>
                        </Group>
                        <hr />
                        <Group Class='inputside' { ...screenwidth > 766 ? { Wrap: true } : { Col: true } }>
                            <Inputbox Title='Party Size' Type='number' Class="partysize" InCol InWhite />
                            <Inputbox Title='Date' Type='date' InCol InWhite />
                            <Inputbox Title='Time' Type='time' InCol InWhite />
                        </Group>
                    </Group>
                    <Group Class='buttonside'>
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
