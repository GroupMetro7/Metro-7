import React from 'react'
import '../../Assets/CSS/Pages/Services/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox, InsertFileButton, Pagination } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useRetrieveOrdersList, useUpdateOrders, useOCRReceipt, useDateFormat, useTimeFormat } from '../../Exporter/Hooks_Exporter'

export default function StaffOrderList() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Order List`)
    useBodyAddClass(`Management-PAGE`)

    // Fetching Hooks

        // For Order List
        const {
            orders,
            selectedOrder,
            setSelectedOrder,
            currentPage,
            totalPages,
            handlePageChange,
            setSearchItem,
            fetchOrder,
        } = useRetrieveOrdersList()

        // For Retrieving & Modifying Selected Order
        const { 
            formData, 
            setFormData, 
            handleSubmit, 
            handleInputChange, 
            isLoading, 
            error, 
            success, 
            today
        } = useUpdateOrders(selectedOrder, fetchOrder)

        // For Handling OCR via GCash
        const handleReceiptUpload = useOCRReceipt({ setFormData })

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for Tables
        const TBOrders = {
            head: {
                orderId: `NO.`,
                name: `CUSTOMER`,
                amount: `AMOUNT`,
                discount: `DISCOUNT`,
                balance: `BALANCE`,
                option: `OPTION`,
                status: `STATUS`
            },
            rows: orders.map((order) => ({
                orderId: order.order_number,
                name: order.name,
                amount: order.amount,
                discount: order.discount,
                balance: order.unpaid_balance <= 0 ? `Paid` : order.unpaid_balance,
                option: order.option,
                status: order.status,
                edit: () => setSelectedOrder(order),
            })),
        }

        // Hooks for OutputFetch for Retrieving & Modifying
        const InputOutputfetches = {
            first: [
                { Title: `No.`, Value: selectedOrder?.order_number, OutCol: true, OutWhite: true },
                { Title: `Name`, Value: selectedOrder?.name, OutCol: true, OutWhite: true },
                { Title: `Date`, Value: `${useDateFormat(new Date(selectedOrder?.created_at))} | ${useTimeFormat(new Date(selectedOrder?.created_at))}`, OutCol: true, OutWhite: true },
                { Title: `Options`, Value: selectedOrder?.option, OutCol: true, OutWhite: true }
            ],
            second: {
                Title: [
                    { Title: `Items`, OutWhite: true },
                    { Title: `Quantity`, OutWhite: true },
                    { Title: `Unit Price`, OutWhite: true },
                    { Title: `Total Price`, OutWhite: true }
                ],
                Value: selectedOrder?.tickets.map((ticket) => ([
                    { Value: ticket?.product_name, OutWhite: true },
                    { Value: `x${ticket?.quantity}`, OutWhite: true },
                    { Value: `₱${Number(ticket?.unit_price).toFixed(2)}`, OutWhite: true },
                    { Value: `₱${Number(ticket?.total_price).toFixed(2)}`, OutWhite: true }
                ]))
            },
            third: [
                { Title: `Total Price`, Value: `₱${Number(selectedOrder?.amount || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                { Title: `Discount`, Value: `₱${Number(selectedOrder?.discount || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                { Title: `Down Payment Price`, Value: `₱${Number(formData?.downpayment || 0).toFixed(2)}`, Name: `downpayment`, OnChange: handleInputChange, OutCol: true, OutWhite: true },
                { Title: `Reference Number`, Value: formData?.refNumber, Name: `refNumber`, OnChange: handleInputChange, OutCol: true, OutWhite: true }
            ],
            fourth: [
                { Input: true, Title: `Cash Payment`, Type: `number`, ID: `c-payment-in`, Name: `cashPayment`, Value: formData.partySize, OnChange: handleInputChange, InCol: true, InWhite: true },
                { Input: true, Title: `Online Payment`, Type: `number`, ID: `o-payment-in`, Name: `onlinePayment`, Value: formData.date, MinDate: today, OnChange: handleInputChange, InCol: true, InWhite: true },
                { Select: true, Title: `Status`, ID: `status-slt`, Name: `status`, Value: formData.status, OnChange: handleInputChange, SltCol: true, SltWhite: true,  
                    Options: [
                        { label: `Pending`, value: `Pending` },
                        { label: `Completed`, value: `Completed` },
                        { label: `Cancelled`, value: `Cancelled` }
                ]},
            ]
        }

    return (
        <>
            <Group>
                <Main>
                    <Box Class={`search`}>
                        <Inputbox Title={`Search`} Type={`search`} ID={`search-in`} OnChange={(e) => setSearchItem(e.target.value)} />
                    </Box>
                    <Box Title={`ORDER`} ID={`ordertable`} BoxCol>
                        <Table HeadRows={TBOrders.head} DataRows={TBOrders.rows} EditBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>

            {/* Modal to display tickets for the selected order */}
            <Modal Modal={`edit-modal`} onClose={() => setSelectedOrder(null)}>
                {selectedOrder && (
                    <Form Title={`EDIT ORDER`} FormThreelayers OnSubmit={handleSubmit}>
                        {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                        success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                        <Group Class={`outputside`} Wrap>
                            {InputOutputfetches.first.map((output) => (
                                <Outputfetch
                                    Title={output.Title}
                                    Value={output.Value}
                                    OutCol={output.OutCol}
                                    OutWhite={output.OutWhite}
                                />
                            ))}
                        </Group>
                        <Group Class={`outputfetch orderside`} Col>
                            {[InputOutputfetches.second.Title, ...InputOutputfetches.second.Value].map((output, index) => (
                                <div key={index}>
                                    {output.map((entry, colindex) => (
                                        <Outputfetch
                                            key={`cell-${index}-${colindex}`}
                                            {...(entry.Title && { Title: entry.Title })}
                                            {...(entry.Value && { Value: entry.Value })}
                                            OutWhite={entry.OutWhite}
                                        />
                                    ))}
                                </div>
                            ))}
                        </Group>
                        <Group Class={`outputside`} Wrap>
                            {InputOutputfetches.third.map((output) => (
                                <Outputfetch
                                    Title={output.Title}
                                    Value={output.Value}
                                    Name={output.Name}
                                    OnChange={output.OnChange}
                                    OutCol={output.OutCol}
                                    OutWhite={output.OutWhite}
                                />
                            ))}
                        </Group>
                        <Group Class={`inputside`}>
                            {InputOutputfetches.fourth.map((Input, Index) =>
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
                                />
                            )}
                        </Group>
                        <Group Class={`qrside`} Col>
                            <Outputfetch Title={`QR Code`} OutWhite />
                            <Group>
                                <img />
                                <Group Col>
                                    <p>
                                        Please pay a 50% DOWNPAYMENT. Orders without a payment
                                        receipt will remain pending. Failure to pay on time will
                                        result in cancellation.
                                    </p>
                                    <InsertFileButton Title={`UPLOAD GCASH RECEIPT`} BtnWhite Accept={`image/*`} Name={`image`} OnChange={handleReceiptUpload} />
                                </Group>
                            </Group>
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