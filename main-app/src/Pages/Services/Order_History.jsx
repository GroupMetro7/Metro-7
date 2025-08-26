import React from 'react'
import '../../Assets/CSS/Pages/Services/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox, Pagination, KPI } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useKpi, useOCRReceipt, useDateFormat, useTimeFormat, useFetchOrders, useModifyOrderList, useOrderHistory } from '../../Exporter/Hooks_Exporter'

export default function StaffOrderList() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Order History`)
    useBodyAddClass(`Management-PAGE`)

    // optimized, need to add pre orders tab
    const { selectedOrder, setSelectedOrder } = useFetchOrders();

    const { formData, setFormData, handleUpdateOrder, error, success } =
        useModifyOrderList(selectedOrder);

    const {
        orderHistory,
        currentPage,
        totalPages,
        handlePageChange,
        setSearchItem,
        setFilterDate
    } = useOrderHistory();

    const { monthlyRevenuee, monthlyStockExpense, stockValue, totalOrders } = useKpi()

    const handleReceiptUpload = useOCRReceipt({ setFormData })

    const screenwidth = useScreenWidth()

    const tborderhistory =
        screenwidth > 766 ? {
            head: {
                orderId: `NO.`,
                name: `CUSTOMER`,
                received: `RECEIVED`,
                completed: `COMPLETED`,
                amount: `AMOUNT`,
                discount: `DISCOUNT`,
                balance: `BALANCE`,
                option: `OPTION`,
                status: `STATUS`
            },
            rows: orderHistory.map((order) => ({
                orderId: order.order_number,
                name: order.name,
                received: `${useDateFormat(new Date(order.created_at))} ${useTimeFormat(new Date(order.created_at))}`,
                completed: `${useDateFormat(new Date(order.updated_at))} ${useTimeFormat(new Date(order.updated_at))}`,
                amount: order.amount,
                discount: order.discount,
                balance: order.unpaid_balance <= 0 ? `Paid` : order.unpaid_balance,
                option: order.option,
                status: order.status,
                userName: `${order.user.firstname} ${order.user.lastname}`,
                edit: () => {
                    setSelectedOrder(order);
                },
            }))
        }
            :
            {
                head: {
                    orderId: `NO.`,
                    name: `CUSTOMER`,
                    completed: `COMPLETED`,
                },
                rows: orderHistory.map((order) => ({
                    orderId: order.order_number,
                    name: order.name,
                    completed: `${useDateFormat(new Date(order.updated_at))} ${useTimeFormat(new Date(order.updated_at))}`,
                    edit: () => {
                        setSelectedOrder(order);
                    },
                }))
            }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const kpis = [
        { Title: `TOTAL REVENUE`, Integer: `₱${Number(monthlyRevenuee || 0).toFixed(2)}/Month` },
        { Title: `STOCK EXPENSES`, Integer: `₱${Number(monthlyStockExpense || 0).toFixed(2)}/Month` },
        { Title: `STOCK VALUE`, Integer: `₱${Number(stockValue || 0).toFixed(2)}` },
        { Title: `TOTAL SOLD`, Integer: `${totalOrders}` }
    ]


    return (
        <>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" OnChange={(e) => setSearchItem(e.target.value)} Placeholder={"Search by Order No. / user's name"} />
                    <Inputbox Title="Date" Type="date" OnChange={(e) => setFilterDate(e.target.value)} />
                </Box>
                {user && user.role === "admin" && (
                    <Group Class="kpis">
                        {kpis.map((kpi, index) => (
                            <KPI key={index} Title={kpi.Title} Integer={kpi.Integer} />
                        ))}
                    </Group>
                )}
                <Box Title="ORDER HISTORY" BoxCol>
                    <Table HeadRows={tborderhistory.head} DataRows={tborderhistory.rows} EditBtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>

            {/* Modal to display tickets for the selected order */}

            <Modal Modal="edit-modal" onClose={() => setSelectedOrder(null)}>
                {selectedOrder && (
                    <Form Title="EDIT ORDER" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={handleUpdateOrder}>
                        {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                        success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                        <Group Class="outputfetch" Wrap>
                            <Outputfetch Title={`Order No.`} Value={selectedOrder.order_number} OutCol OutWhite />
                            <Outputfetch Title={`Order Date`} Value={`${useDateFormat(new Date (selectedOrder.created_at))} | ${useTimeFormat(new Date(selectedOrder?.created_at))}`} OutCol OutWhite />
                            <Outputfetch Title={`Customer Name`} Value={selectedOrder.name} OutCol OutWhite />
                            <Outputfetch Title={`Options`} Value={selectedOrder.option} OutCol OutWhite />
                        </Group>
                        <Group Class="outputfetch" Col>
                            <div>
                                <Outputfetch Title="Items" OutWhite />
                                <Outputfetch Title="Quantity" OutWhite />
                                <Outputfetch Title="Unit Price" OutWhite />
                                <Outputfetch Title="Total Price" OutWhite />
                            </div>
                            {selectedOrder.tickets.map((ticket, index) => (
                                <div key={index}>
                                    <Outputfetch Value={ticket.product_name} OutWhite />
                                    <Outputfetch Value={`x${ticket.quantity}`} OutWhite />
                                    <Outputfetch Value={`₱${ticket.unit_price}`} OutWhite />
                                    <Outputfetch Value={`₱${ticket.total_price}`} OutWhite />
                                </div>
                            ))}
                        </Group>
                        <Group Class="outputfetch" Wrap>
                            <Outputfetch Title="Total Price" Value={selectedOrder.amount} OutCol OutWhite />
                            <Outputfetch Title="Discount" Value={selectedOrder.discount} OutCol OutWhite />
                            <Outputfetch Title="Payment Mode" Value={selectedOrder.option} OutCol OutWhite />
                            <Outputfetch Title="Down Payment Price" Name="downpayment" Value={`₱${formData.downpayment}`} OnChange={handleInputChange} OutCol OutWhite />
                            <Outputfetch Title="Reference Number" Name="refNumber" Value={formData.refNumber} OnChange={handleInputChange} OutCol OutWhite />
                            <Selectionbox Title="Order Status" Name="status" Value={formData.status} Options={["Pending", "Completed", "Cancelled"]} OnChange={handleInputChange} SltCol SltWhite />
                        </Group>
                        {screenwidth > 766 ?
                            <Group Class={`buttonside`}>
                                <Button Title={`CLOSE`} CloseModal BtnWhite />
                                <SubmitButton Title={`SAVE`} ID={`submit-btn`} BtnWhite />
                            </Group>
                            :
                            <Group Class={`buttonside`} Col>
                                <SubmitButton Title={`SAVE`} ID={`submit-btn`} BtnWhite />
                                <Button Title={`CLOSE`} CloseModal BtnWhite />
                            </Group>
                        }
                    </Form>
                )}
            </Modal>
        </>
    )
}
