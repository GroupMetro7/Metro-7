import React from 'react'
import '../../assets/css/pages/customers/Reservation.sass'
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Selectionbox } from '../../Exporter/Component_Exporter'
import { useStateContext, useScreenWidth, useCreateReservation } from '../../Exporter/Hooks_Exporter'

export default function ReservationPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Reservation`)
    Body_addclass(`Reservation-PAGE`)

    // Fetching Hooks
    const {
        formData,
        setFormData,
        handleInputChange,
        handleCreateReservation,
        isLoading,
        success,
        error,
        today,
        minDateTime
    } = useCreateReservation()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Select: true, Title: `Reservation Type`, ID: `restype-slt`, Name: `reservationType`, Value: formData.reservationType, SltCol: true, SltWhite: true, OnChange: handleInputChange, 
                Options: [
                    { label: `Solo`, value: `Solo` },
                    { label: `Group`, value: `Group` },
                    { label: `Event`, value: `Event` }
            ]},
            { Input: true, Title: `Party Size`, Type: `number`, ID: `party-in`, Name: `partySize`, InCol: true, InWhite: true, Value: formData.partySize, onChange: handleInputChange },
            { Input: true, Title: `Date`, Type: `date`, ID: `date-in`, Name: `date`, InCol: true, InWhite: true, Value: formData.date, MinDate: today, onChange: handleInputChange },
            { Input: true, Title: `Time`, Type: `time`, ID: `time-in`, Name: `time`, InCol: true, InWhite: true, Value: formData.time, MinDate: minDateTime, onChange: handleInputChange }
        ]

    return (
        <Main>
            <Section Class={`reservation`}>
                <Form Title={`RESERVATION`} {...(screenwidth > 766 && { FormTwolayers: true })} OnSubmit={handleCreateReservation} >
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                    <Group Col>
                        {!error && !success && 
                            <>
                            <Group Class={`infoside`} Col>
                                <h5>HOURS: OPEN - CLOSES 10:00PM</h5>
                                <h5>MOBILE NUMBER: 09952332528</h5>
                            </Group>
                            <hr />
                            </>
                        }
                        <Group Class={`inputside`} {...(screenwidth > 766 ? { Wrap: true } : { Col: true })} >
                            {Inputboxes.map((input, index) =>
                                input.Select &&
                                <Selectionbox
                                    key={index}
                                    Title={input.Title}
                                    ID={input.ID}
                                    Name={input.Name}
                                    Value={input.Value}
                                    Options={input.Options}
                                    SltCol={input.SltCol}
                                    SltWhite={input.SltWhite}
                                    OnChange={input.OnChange}
                                />
                                || input.Input &&
                                <Inputbox
                                    key={index}
                                    Title={input.Title}
                                    Type={input.Type}
                                    ID={input.ID}
                                    Name={input.Name}
                                    InCol={input.InCol}
                                    InWhite={input.InWhite}
                                    Value={input.Value}
                                    MinDate={input.MinDate}
                                    onChange={input.onChange}
                                />
                            )}
                        </Group>
                    </Group>
                    <Group Class={`buttonside`}>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} disabled={isLoading} BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}