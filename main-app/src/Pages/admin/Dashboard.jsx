import React from 'react'
import '../../assets/css/pages/admin/Dashboard.sass'
import { Title, Body_addclass,Group, Main, Section, Box, KPI, DateText, TimeText, Table, Modal, Form, Outputfetch, Button, SubmitButton } from '../../exporter/component_exporter'
import TopCategory from '../../hooks/graphs/pie'
import SalesReport from '../../hooks/graphs/bar'
import useFetchDashboardData from '../../hooks/admin/fetchData'

export default function DashboardPage() {
    Title('Dashboard')
    Body_addclass('Dashboard-Admin-PAGE')
    // optimized
    // needs some updates
    const { monthlyRevenue, mostSoldProduct, orders, expenses, totalStockValue } = useFetchDashboardData();
    const latestMonth = monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue[0] : null;
    const latestRevenue = latestMonth ? latestMonth.revenue : 0;
    const showExpenses = expenses || 0;
    const showStockValue = totalStockValue || 0
    const mostSoldName = mostSoldProduct ? mostSoldProduct.product_name : 'N/A';
    const mostSoldQty = mostSoldProduct ? mostSoldProduct.total_quantity : 0;

    const tbhead = ['ORDER NO.',  'CUSTOMER', 'AMOUNT', 'OPTION', 'STATUS']
    const tbrows = orders.map((order) => ({
      order_number: order.order_number,
      order_date: order.name,
      amount: '₱' + order.amount,
      option: order.option,
      status: order.status,
    }))

    return(
        <>
        <Group>
            <Main>
                <Section Title="Sales Revenue" Class="salesrevenue">
                    <Group Class="upper">
                        <Group Class="kpis">
                          <KPI Title="TOTAL REVENUE" Integer={`₱${Number(latestRevenue).toLocaleString()}`} Class="red1" />
                          <KPI Title="STOCK EXPENSES" Integer={`₱${Number(showExpenses).toLocaleString()}`}/>
                          <KPI Title="STOCK VALUE" Integer={`₱${Number(showStockValue).toLocaleString()}`} Class="red2" />
                          <KPI Title={mostSoldName} Integer={mostSoldQty + ' ' + 'pcs'} Class="red3" />
                        </Group>
                        <Box Class="datetime" >
                            <h3>
                                <DateText />
                                <br />
                                <TimeText />
                            </h3>
                        </Box>
                    </Group>
                    <Group Class="charts">
                        <Box Title="Sales Status" Class="salesstatus" BoxCol><SalesReport/></Box>
                        <Box Title="Top Category" Class="topcategory" BoxCol><TopCategory/></Box>
                    </Group>
                    <Group Class="charts">
                        <Box Title="Demand Forecast" Class="demandforecast" BoxCol><img src="" /></Box>
                    </Group>
                </Section>
                <Box Title="RECENT ORDER" BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } ViewBtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal="ViewModal">
            <Form Title="VIEW ORDER" FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title="Order No." Value="25569" OutCol OutWhite />
                    <Outputfetch Title="Order Date" Value="2025-02-24 | 02:27:25" OutCol OutWhite />
                    <Outputfetch Title="Cashier Name" Value="Micheal Lance Kester Li" OutCol OutWhite />
                    <Outputfetch Title="Options" Value="TAKE-OUT" OutCol OutWhite />
                    <Outputfetch Title="Amount" Value="₱559.00" OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CLOSE" CloseModal BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}
