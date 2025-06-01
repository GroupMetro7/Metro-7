import React from 'react'
import '../../assets/css/pages/customers/Reservation.sass'
import { ScreenWidth, Title, Body_addclass, Footer, Main, Section, Form, Group, Inputbox, SubmitButton, Selectionbox } from '../../Exporter/component_exporter'

export default function ReservationPage() {
    Title('Metro 7 | Reservation')
    Body_addclass('Reservation-PAGE')
    const screenwidth = ScreenWidth()
//this file needs to be updated

    const restypeoption = [
        { Birthday: 'Birthday' },
        { Anniversary: 'Anniversary' },
        { Wedding: 'Wedding' },
        { Corporate: 'Corporate' },
        { Meeting: 'Meeting' },
        { Graduation: 'Graduation' },
        { Baptismal: 'Baptismal' },
        { Reunion: 'Reunion' },
        { Other: 'Other' }
    ]

    const Inputboxes = [
        { Selectionbox: true, Title: 'Reservation Type', Name: 'restype', Value: 'restype', Options: restypeoption, SltCol: true, SltWhite: true },
        { Inputbox: true, Title: 'Party Size', Type: 'number', InCol: true, InWhite: true },
        { Inputbox: true, Title: 'Date', Type: 'date', InCol: true, InWhite: true },
        { Inputbox: true, Title: 'Time', Type: 'time', InCol: true, InWhite: true }
    ]

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
                            { Inputboxes.map((input, index) => (
                                input.Inputbox &&  
                                <Inputbox key={index} Title={input.Title} Type={input.Type} Class={input.Class} MinLength={input.MinLength} InCol={input.InCol} InWhite={input.InWhite} /> 
                                ||
                                input.Selectionbox &&
                                <Selectionbox key={index} Title={input.Title} Name={input.Name} Value={input.Value} Options={input.Options} SltCol={input.SltCol} SltWhite={input.SltWhite} />
                            ))}
                        </Group>
                    </Group>
                    <Group Class='buttonside'>
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        {/* <Footer /> */}
        </>
    )
}
