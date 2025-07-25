import React from 'react'
import '../../Assets/CSS/Pages/Customers/Reservation.sass'
import '../../Assets/CSS/forCalendar/calendar_styling.css'
import { Main, Section, Form, Group, Inputbox, SubmitButton, Selectionbox } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useCreateReservation } from '../../Exporter/Hooks_Exporter'
import ReservationCalendar from '../../Hooks/customer/calendar/calendar_component'

export default function ReservationPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Reservation`)
    useBodyAddClass(`Reservation-PAGE`)

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
        minDateTime,
        handleReservationTypeChange,
        showCalendar,
        setShowCalendar,
        handleDateSelect
    } = useCreateReservation()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
    const Inputboxes = [
        { Select: true, Title: `Reservation Type`, ID: `restype-slt`, Name: `reservationType`, Value: formData.reservationType, SltCol: true, SltWhite: true, OnChange: handleReservationTypeChange,
            Options: [
                { label: `Solo`, value: `Solo` },
                { label: `Group`, value: `Group` },
                { label: `Event`, value: `Event` }
        ]},
        { Input: true, Title: `Party Size`, Type: `number`, ID: `party-in`, Name: `partySize`, InCol: true, InWhite: true, Value: formData.reservationType === 'Solo' ? 1 : formData.partySize, OnChange: handleInputChange, Disabled: formData.reservationType === 'Solo'},
        { Input: true, Title: `Date`, Type: `date`, ID: `date-in`, Name: `date`, InCol: true, InWhite: true, Value: formData.date, MinDate: today, OnChange: handleInputChange, CustomButton: true },
        { Input: true, Title: `Time`, Type: `time`, ID: `time-in`, Name: `time`, InCol: true, InWhite: true, Value: formData.time, MinDate: minDateTime, OnChange: handleInputChange }
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
                            {Inputboxes.map((Input, Index) =>
                                Input.Select &&
                                <Selectionbox
                                    Key={Index}
                                    Title={Input.Title}
                                    ID={Input.ID}
                                    Name={Input.Name}
                                    Value={Input.Value}
                                    Options={Input.Options}
                                    SltCol={Input.SltCol}
                                    SltWhite={Input.SltWhite}
                                    OnChange={Input.OnChange}
                                />
                                || Input.Input &&
                                <div key={Index}>
                                    <Inputbox
                                        Key={Index}
                                        Title={Input.Title}
                                        Type={Input.Type}
                                        ID={Input.ID}
                                        Name={Input.Name}
                                        InCol={Input.InCol}
                                        InWhite={Input.InWhite}
                                        Value={Input.Value}
                                        MinDate={Input.MinDate}
                                        OnChange={Input.OnChange}
                                        Disabled={Input.Disabled}
                                        CustomButton={Input.CustomButton && (
                                        <button
                                            type="button"
                                            onClick={() => setShowCalendar(!showCalendar)}
                                            className="calendar-toggle-button"
                                        >
                                            {showCalendar ? '-' : '+'}
                                        </button>
                                    )}
                                    />
                                </div>
                            )}
                        </Group>

                        {showCalendar && (
                            <Group Class={`calendar-container`}>
                                <ReservationCalendar
                                    selectedDate={formData.date}
                                    onDateSelect={handleDateSelect}
                                    minDate={today}
                                />
                            </Group>
                        )}
                    </Group>
                    <Group Class={`buttonside`}>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}
