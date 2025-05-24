import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Sales.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Section, KPI, Selectionbox, DateText, TimeText } from '../../exporter/component_exporter'
import axiosClient from '../../axiosClient'
import useMonthlySales from '../../hooks/fetch'
import { saveAs } from 'file-saver';

export default function SalesPage() {
    Title('Revenue')
    Body_addclass('Sales-PAGE')

    const { monthlyRevenue, mostSoldProduct } = useMonthlySales();
    const latestMonth = monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue[0] : null;
    const latestRevenue = latestMonth ? latestMonth.revenue : 0;

    const mostSoldName = mostSoldProduct ? mostSoldProduct.product_name : 'N/A';
    const mostSoldQty = mostSoldProduct ? mostSoldProduct.total_quantity : 0;

    const revpermonthhead = ['Year', 'Month', 'Revenue']
    const monthNames = [
      '', 'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    const revpermonthdata = monthlyRevenue.map((item) => [
      item.year,
      (item.month !== undefined && item.month !== null ? monthNames[item.month] : ''),
      `₱${Number(item.revenue).toLocaleString(undefined, {minimumFractionDigits: 2})}`
    ])

    const exportTableAsCSV = (headers, data, filename = 'table_data.csv') => {
        const csvRows = [];
        csvRows.push(headers.join(','));
        data.forEach(row => {
            csvRows.push(row.join(','));
        });
        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        saveAs(blob, filename);
    };

    return(
        <>
        <Group>
            <Main Row>
                <Box Class='search'>
                    <Selectionbox Title='Period' />
                    <Inputbox Title='Date' Type='date' />
                </Box>
                <Section Title="Sales Revenue" Class="salesrevenue" UpperRight={ <Button Title="EXPORT AS FILE" Onclick={() => exportTableAsCSV(revpermonthhead, revpermonthdata, 'sales_data.csv')}/> }>
                    <Group Class='upper'>
                        <Group Class='kpis'>
                          <KPI Title="TOTAL REVENUE" Integer={`₱${Number(latestRevenue).toLocaleString()}`} Class="red1" />
                          <KPI Title="TOTAL REVENUE" Integer="23.8%" />
                          <KPI Title="TOTAL REVENUE" Integer="₱34,106.00" Class="red2" />
                          <KPI Title={mostSoldName} Integer={mostSoldQty + ' ' + 'pcs'} Class="red3" />
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
