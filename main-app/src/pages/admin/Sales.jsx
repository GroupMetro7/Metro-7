import React from 'react'
import '../../assets/css/pages/admin/Sales.sass'
import { user, revpermonthhead, revpermonthdata } from '../../constant'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Section, KPI, Selectionbox, DateText, TimeText } from '../../exporter/component_exporter'

export default function MenuManagementPage() {
    Title('Revenue')
    Body_addclass('Sales-PAGE')

    return(
        <>
        <Group>
            <Main Row>
                <Box Class='search'>
                    <Selectionbox Title='Period' />
                    <Inputbox Title='Date' Type='date' />
                </Box>
                <Section Title="Sales Revenue" Class="salesrevenue" UpperRight={ <Button Title="EXPORT AS FILE" /> }>
                    <Group Class='upper'>
                        <Group Class='kpis'>
                            <KPI Title='TOTAL SALES' Integer='₱230,631.00' Increase='₱8,271.00' Class='red1' />
                            <KPI Title='THIS MONTH' Integer='₱34,106.00' Increase='₱3,599.00' Class='red2' />
                            <KPI Title='TODAY' Integer='₱13,331.00' Decrease='₱31.00' Class='red3' />
                            <KPI Title='RATE' Integer='23.8%' Increase='1.4%' />
                        </Group>
                        <Box Title={ <><DateText /><br /><TimeText /></> } Class='datetime' />
                    </Group>
                    <Group Class='charts'>
                        <Box Title='Sales Status' Class='salesstatus' BoxCol><img src='' /></Box>
                        <Box Title='Top Category' Class='topcategory' BoxCol><img src='' /></Box>
                    </Group>
                    <Box Title="BREAKDOWN REVENUE PER MONTH" BoxCol>
                        <Table HeadRows={ revpermonthhead } DataRows={ revpermonthdata } />
                    </Box>
                    <Box Title="PRODUCT REVENUE PER MONTH" BoxCol>
                        <Table HeadRows={ revpermonthhead } DataRows={ revpermonthdata } />
                    </Box>
                </Section>
            </Main>
        </Group>
        </>
    )
}