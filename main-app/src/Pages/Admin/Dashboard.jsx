import React from 'react'
import '../../Assets/CSS/Pages/Admin/Dashboard.sass'
import { Main, Group, Section, Box, Table, Modal, Form, Outputfetch, Button, SubmitButton, Pagination, Selectionbox, InsertFileButton, Inputbox, Graph, KPI } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useClockText, useDateFormat, useTimeFormat, useOCRReceipt, TopCategory, SalesReport, useFetchOrders, UseKpi, useModifyOrderList, useFetchDashboardData, DailyOrdersGraphs } from '../../Exporter/Hooks_Exporter'

export default function DashboardPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle("Metro 7 | Admin Dashboard")
    useBodyAddClass("Dashboard-Admin-PAGE")

    // Fetching Hooks

        // For Dashboard Data
        const { SalesReportData, SalesReportOptions } = SalesReport(useFetchDashboardData())
        const { TopCategoryData, TopCategoryOptions } = TopCategory(useFetchDashboardData())
        const { 
            dailyOrdersData, 
            dailyOrdersOptions, 
            dailyRevenueData, 
            dailyRevenueOptions 
        } = DailyOrdersGraphs(useFetchDashboardData())

        // For KPIs
        const { 
            monthlyRevenuee, 
            monthlyStockExpense, 
            stockValue, 
            totalOrders, 
            dailyOrders 
        } = UseKpi()

        // For Order List
        const {
            orders,
            selectedOrder,
            setSelectedOrder,
            currentPage,
            totalPages,
            handlePageChange,
            fetchOrder
        } = useFetchOrders()

        const { 
            formData, 
            setFormData, 
            handleUpdateOrder, 
            isLoading,
            error, 
            success 
        } = useModifyOrderList(selectedOrder, fetchOrder)
        
        // For Handling OCR via GCash
        const handleReceiptUpload = useOCRReceipt({ setFormData })

        // Need to modify this part for better handling, reusability & consistency
        // {
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        // }

    // UI Hooks
    const screenwidth = useScreenWidth()

    const {time, date} = useClockText()

        // Hooks for Tables
        const TBRecOrders = {
            head: {
                orderId: `NO.`,
                name: `CUSTOMER`,
                date: `DATE`,
                amount: `AMOUNT`,
                discount: `DISCOUNT`,
                balance: `BALANCE`,
                option: `OPTION`,
                status: `STATUS`
            },
            rows: orders.map((order) => ({
                orderId: order.order_number,
                name: order.name,
                date: `${useDateFormat(new Date(order.created_at))} ${useTimeFormat(new Date(order.created_at))}`,
                amount: order.amount,
                discount: order.discount,
                balance: order.unpaid_balance <= 0 ? `Paid` : order.unpaid_balance,
                option: order.option,
                status: order.status,
                edit: () => {setSelectedOrder(order)}
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
                { Input: true, Title: `Cash Payment`, Type: `number`, ID: `c-payment-in`, Name: `cashPayment`, Value: formData.cashPayment, OnChange: handleInputChange, InCol: true, InWhite: true },
                { Input: true, Title: `Online Payment`, Type: `number`, ID: `o-payment-in`, Name: `onlinePayment`, Value: formData.onlinePayment, OnChange: handleInputChange, InCol: true, InWhite: true },
                { Select: true, Title: `Status`, ID: `status-slt`, Name: `status`, Value: formData.status, OnChange: handleInputChange, SltCol: true, SltWhite: true,  
                    Options: [
                        { label: `Pending`, value: `Pending` },
                        { label: `Completed`, value: `Completed` },
                        { label: `Cancelled`, value: `Cancelled` }
                ]},
            ]
        }

        const kpis = [
            { Title: `TOTAL REVENUE`, Integer: `₱${Number(monthlyRevenuee || 0).toFixed(2)}/Month` },
            { Title: `STOCK EXPENSES`, Integer: `₱${Number(monthlyStockExpense || 0).toFixed(2)}/Month` },
            { Title: `STOCK VALUE`, Integer: `₱${Number(stockValue || 0).toFixed(2)}` },
            { Title: `TOTAL SOLD`, Integer: `${totalOrders}` }
        ]

    return (
        <>
            <Group>
                <Main>
                    <Section Title={`Sales Revenue`} Class={`salesrevenue`}>
                        <Group Class={`upper`}>
                            <Group Class={`kpis`}>
                                {kpis.map((kpi, index) => (
                                    <KPI key={index} Title={kpi.Title} Integer={kpi.Integer} />
                                ))}
                            </Group>
                            <Box Class={`datetime`}>
                                <h3>
                                    {date}
                                    <br />
                                    {time}
                                </h3>
                            </Box>
                        </Group>
                        <Group Class={`charts`}>
                            <Box Title={`Sales Status`} Class={`salesstatus`} BoxCol>
                                <Graph BarGraph Data={SalesReportData} Options={SalesReportOptions} />
                            </Box>
                            <Box Title={`Most Sold Products`} Class={`topcategory`} BoxCol>
                                <Graph PieGraph Data={TopCategoryData} Options={TopCategoryOptions} />
                            </Box>
                        </Group>
                        <Group Class={`charts`}>
                            <Box Title={`Daily Revenue`} Class={`salesstatus`} BoxCol>
                                <Graph BarGraph Data={dailyRevenueData} Options={dailyRevenueOptions} />
                            </Box>
                            <Box Title={`Daily Order`} Class={`salesstatus`} BoxCol>
                                <Graph BarGraph Data={dailyOrdersData} Options={dailyOrdersOptions} />
                            </Box>
                        </Group>
                    </Section>
                    <Box Title={`RECENT ORDER`} BoxCol>
                        <Table HeadRows={TBRecOrders.head} DataRows={TBRecOrders.rows} EditBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
                    </Box>
                </Main>
            </Group>

            {/* Modal to display tickets for the selected order */}
            <Modal Modal={`edit-modal`} onClose={() => setSelectedOrder(null)}>
                {selectedOrder && 
                    <Form Title={`EDIT ORDER`} FormThreelayers OnSubmit={handleUpdateOrder}>
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
                }
            </Modal>
        </>
    )
}
