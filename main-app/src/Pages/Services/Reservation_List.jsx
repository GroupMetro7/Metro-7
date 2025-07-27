import React from 'react'
import '../../Assets/CSS/Pages/Services/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useOCRReceipt, useDateFormat, useTimeFormat, useReservationFunctions } from '../../Exporter/Hooks_Exporter'

export default function ReservationList() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Table Reservation List`)
    useBodyAddClass(`Management-PAGE`)

    // Fetching Hooks

        // For Reservation List
        const {
            reservations,
            selectedReservation,
            updateReservation,
            updateReservationStatus,
            handleInputChange,
            isLoading,
            error,
            success,
        } = useReservationFunctions()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for Tables
        const TBRes = {
            head: {
                resId: `NO.`,
                name: `CUSTOMER`,
                reservationsType: `RES. TYPE`,
                date: `DATE`,
                time: `TIME`,
                partySize: `PARTY SIZE`,
                status: `STATUS`,
            },
            rows: reservations.map((res) => ({
                resId: res.id,
                name: `${res.user.firstname} ${res.user.lastname}`,
                reservationsType: res.reservation_type,
                date: useDateFormat(new Date(res.date)),
                time: res.time,
                partySize: res.party_size,
                status: res.status,
                edit: () => updateReservation(res),
            })),
        }

        // Hooks for OutputFetch for Retrieving & Modifying
        const InputOutputfetches = [
            { Output: true, Title: `No.`, Value: selectedReservation?.id, OutCol: true, OutWhite: true },
            { Output: true, Title: `Name`, Value: `${selectedReservation?.user.firstname} ${selectedReservation?.user.lastname}`, OutCol: true, OutWhite: true },
            { Output: true, Title: `Date`, Value: `${useDateFormat(new Date(selectedReservation?.date))} | ${selectedReservation?.time}`, OutCol: true, OutWhite: true },
            { Output: true, Title: `Party Size`, Value: selectedReservation?.party_size, OutCol: true, OutWhite: true },
            { Select: true, Title: `Status`, ID: `status-slt`, Name: `status`, Value: selectedReservation?.status, OnChange: handleInputChange, SltCol: true, SltWhite: true,  
                Options: [
                    { label: `Pending`, value: `pending` },
                    { label: `Confirmed`, value: `confirmed` },
                    { label: `Cancelled`, value: `cancelled` },
                    { label: `Completed`, value: `completed` }
            ]}
        ]

    return (
        <>
            <Group>
                <Main>
                    <Box Class={`search`}>
                        <Inputbox Type={`search`} Title={`Search`} OnChange={``} Placeholder={`Search Reservation number`}/>
                    </Box>
                    <Box Title={`RESERVATION`} BoxCol>
                        <Table HeadRows={TBRes.head} DataRows={TBRes.rows} EditBtn />
                        {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
                    </Box>
                </Main>
            </Group>
            <Modal Modal={`edit-modal`}>
                {selectedReservation && (
                    <Form Title={`Reservation`} FormThreelayers OnSubmit={updateReservationStatus}>
                        {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                        success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                        <Group Class={`outputfetch`} Wrap>
                            {InputOutputfetches.map((Item) =>
                                Item.Output &&
                                    <Outputfetch
                                        Title={Item.Title}
                                        Value={Item.Value}
                                        OutCol={Item.OutCol}
                                        OutWhite={Item.OutWhite}
                                    />
                                || Item.Select && 
                                    <Selectionbox
                                        Title={Item.Title}
                                        ID={Item.ID}
                                        Name={Item.Name}
                                        Value={Item.Value}
                                        Options={Item.Options}
                                        SltCol={Item.SltCol}
                                        SltWhite={Item.SltWhite}
                                        OnChange={Item.OnChange}
                                    />
                            )}
                        </Group>
                        <Group Class={`buttonside`}>
                            <Button Title={`CLOSE`} CloseModal BtnWhite />
                            <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                        </Group>
                    </Form>
                )}
            </Modal>
        </>
    )
}