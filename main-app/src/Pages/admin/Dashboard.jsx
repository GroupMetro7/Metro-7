import React from 'react'
import '../../assets/css/pages/admin/Dashboard.sass'
import { Title, Body_addclass, SideBar, Group, Main, Section, Box, KPI, DateText, TimeText, Table, Modal, Form, Outputfetch, Button, SubmitButton } from '../../exporter/component_exporter'
import useMonthlySales from '../../hooks/fetch'

export default function DashboardPage() {
    Title('Dashboard')
    Body_addclass('Dashboard-Admin-PAGE')

    const { monthlyRevenue, mostSoldProduct } = useMonthlySales();
    // Get the latest month's revenue (assuming the first item is the latest)
    const latestMonth = monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue[0] : null;
    const latestRevenue = latestMonth ? latestMonth.revenue : 0;

    // Most sold product info
    const mostSoldName = mostSoldProduct ? mostSoldProduct.product_name : 'N/A';
    const mostSoldQty = mostSoldProduct ? mostSoldProduct.total_quantity : 0;

    const tbhead = ['ORDER NO.', 'ORDER DATE', 'CASHIER NAME', 'OPTIONS', 'AMOUNT']
    const tbrows = [
        [<>25569</>, <>2025-02-24 <br /> 02:27:25</>, <>Micheal Lance Kester Li</>, <>TAKE-OUT</>, <>₱559.00</>],
        [<>12403</>, <>2025-02-22 <br /> 02:27:25</>, <>Eryck Del Fonso</>, <>DINE-IN</>, <>₱358.00</>],
        [<>26891</>, <>2025-02-22 <br /> 02:27:25</>, <>Michael Angelo Lim</>, <>TAKE-OUT</>, <>₱358.00</>],
        [<>12403</>, <>2025-02-22 <br /> 02:27:25</>, <>Eryck Del Fonso</>, <>TAKE-OUT</>, <>₱358.00</>],
        [<>12403</>, <>2025-01-08 <br /> 03:33:03</>, <>Eryck Del Fonso</>, <>TAKE-OUT</>, <>₱1,258.00</>]
    ]

    return(
        <>
        <Group>
            <Main>
                <Section Title="Sales Revenue" Class="salesrevenue">
                    <Group Class="upper">
                        <Group Class="kpis">
                          <KPI Title="TOTAL REVENUE" Integer={`₱${Number(latestRevenue).toLocaleString()}`} Class="red1" />
                          <KPI Title="TOTAL REVENUE" Integer="23.8%" />
                          <KPI Title="TOTAL REVENUE" Integer="₱34,106.00" Class="red2" />
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
                    <Group Class="charts" Wrap>
                        <Box Title="Sales Status" Class="salesstatus" BoxCol><img src="" /></Box>
                        <Box Title="Top Category" Class="topcategory" BoxCol><img src="" /></Box>
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
