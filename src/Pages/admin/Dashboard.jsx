import React from 'react'
import '../../assets/css/pages/admin/Dashboard.sass'
import { user, recorderstbhead, recorderstbdata } from '../../constant'
import { Title, Body_addclass, SideBar, Group, Main, Section, Box, KPI, DateText, TimeText, Table, Modal, Form, Outputfetch, Button, SubmitButton } from '../../exporter/component_exporter'

export default function AdminDashboardPage() {
    Title('Dashboard')
    Body_addclass('Dashboard-Admin-PAGE')

    return(
        <>
        <Group>
            <SideBar AdminMode />
            <Main>
                <Section Title='Sales Revenue' Class='salesrevenue'>
                    <Group Class='upper'>
                        <Group Class='kpis'>
                            <KPI Title='TOTAL SALES' Integer='₱230,631.00' Increase='₱8,271.00' Class='red1' />
                            <KPI Title='THIS MONTH' Integer='₱34,106.00' Increase='₱3,599.00' Class='red2' />
                            <KPI Title='TODAY' Integer='₱13,331.00' Decrease='₱31.00' Class='red3' />
                            <KPI Title='RATE' Integer='23.8%' Increase='1.4%' />
                        </Group>
                        <Box Title={ <><DateText /><br /><TimeText /></> } Class='datetime' />
                    </Group>
                    <Group Class='charts' Wrap>
                        <Box Title='Sales Status' Class='salesstatus' BoxCol><img src='' /></Box>
                        <Box Title='Top Category' Class='topcategory' BoxCol><img src='' /></Box>
                        <Box Title='Demand Forecast' Class='demandforecast' BoxCol><img src='' /></Box>
                    </Group>
                </Section>
                <Box Title='RECENT ORDER' BoxCol>
                    <Table HeadRows={ recorderstbhead } DataRows={ recorderstbdata } ViewBtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal='ViewModal'>
            <Form Title='VIEW ORDER' FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='Order No.' Value='25569' OutCol OutWhite />
                    <Outputfetch Title='Order Date' Value='2025-02-24 | 02:27:25' OutCol OutWhite />
                    <Outputfetch Title='Cashier Name' Value='Micheal Lance Kester Li' OutCol OutWhite />
                    <Outputfetch Title='Options' Value='TAKE-OUT' OutCol OutWhite />
                    <Outputfetch Title='Amount' Value='₱559.00' OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CLOSE' CloseModal BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}