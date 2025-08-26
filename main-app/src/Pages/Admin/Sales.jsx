import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Section, Selectionbox, Modal, Form, SubmitButton, Pagination } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useDateFormat, useTimeFormat, useExportCSV, useFetchData } from '../../Exporter/Hooks_Exporter'

export default function SalesPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Sales Revenue`)
    useBodyAddClass(`Management-PAGE`)

    const screenwidth = useScreenWidth()

    const {
        exportCSV,
        exportedSalesReport,
        dateRange,
        setDateRange,
    } = useExportCSV()

    const { monthlyRevenue, productRevenue, revenuePagination, setFilterMonth } = useFetchData()
    const revpermonthhead = {
        year: `Year`, 
        month: `Month`, 
        revenue: `Revenue`
    }
    const revpermonthdata = monthlyRevenue.map((item) => [
        item.year,
        item.month_name,
        `₱${Number(item.revenue).toLocaleString(undefined, {
            minimumFractionDigits: 2,
        })}`,
    ])

    const salesReport = {
        display: {
            head: {
                productName: `NAME`, 
                revenue: `REVENUE`, 
                month: `MONTH`, 
                totalSold: `TOTAL SOLD`
            },
            rows: productRevenue.map((item) => ({
                productName: item.product_name,
                revenue: item.total_product_sales,
                month: item.month,
                totalSold: item.total_quantity_sold,
            })),
        },
        export: {
            head: {
                no: "No.",
                name: "Name",
                date: "Date",
                price: "Price",
                quantity: "Quantity",
                unitcost: "Cost Per Unit",
            },
            rows: exportedSalesReport.map((item) => ({
                no: item.order.order_number,
                name: item.product_name,
                date: useDateFormat(item.created_at),
                price: item.unit_price,
                quantity: item.quantity,
                unitcost: item.cost || "N/A",
            })),
        },
    }

    const monthOptions = [
        { value: "", label: "Current" },
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
    ]

    return (
        <>
            <Main>
                <Box Class="search">
                    <Selectionbox Title="Period" Options={monthOptions} OnChange={(e) => setFilterMonth(e.target.value)} />
                    <Inputbox Title="Date" Type="date" />
                </Box>
                <Section Title="Sales Revenue" Class="salesrevenue" UpperRight={
                    <Button Title="EXPORT AS FILE" OpenModal="AddModal-exportCSV" />
                    }>
                    <Box Title="BREAKDOWN REVENUE PER MONTH" BoxCol>
                        <Table HeadRows={revpermonthhead} DataRows={revpermonthdata} />
                    </Box>
                    <Box Title="PRODUCT REVENUE PER MONTH" BoxCol>
                        <Table HeadRows={salesReport.display.head} DataRows={salesReport.display.rows} />
                        <Pagination currentPage={revenuePagination.currentPage} totalPages={revenuePagination.totalPages} onPageChange={revenuePagination.handlePageChange} />
                    </Box>
                </Section>
            </Main>

            <Modal Modal="AddModal-exportCSV">
                <Form Title="EXPORT FILE" {...(screenwidth > 766 ? { FormTwolayers: true } : { Col: true })}>
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Start Date" Type="date" Value={dateRange.startDate} OnChange={(e) => setDateRange((prev) => ({ ...prev, startDate: e.target.value, })) } InCol InWhite />
                        <Inputbox Title="End Date" Type="date" Value={dateRange.endDate} OnChange={(e) => setDateRange((prev) => ({ ...prev, endDate: e.target.value, })) } InCol InWhite />
                    </Group>
                    { screenwidth > 766 ?
                        <Group Class={`buttonside`}>
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                        </Group>
                        :
                        <Group Class={`buttonside`} Col>
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
        </>
    )
}