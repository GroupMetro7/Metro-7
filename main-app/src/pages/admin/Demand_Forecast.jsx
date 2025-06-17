import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, Outputfetch, SubmitButton, Selectionbox, InsertFileButton, Pagination } from '../../exporter/component_exporter'

export default function StaffOrderList() {
    Title("Demand Forecast");
    Body_addclass("Management-PAGE");

    const tbhead = [
        "ITEM",
        "DS",
        "YHAT",
        "YHAT_UPPER",
        "YHAT_LOWER",
    ];

    const [data, setData] = useState([]);
    // Example useEffect for fetching data (uncomment and adjust as needed)
    useEffect(() => {
    fetch("http://localhost:5000/")
        .then(res => res.json())
        .then(data => {
        setData(data);
        })
    }, []);

    const tbrowsOrders = Object.keys(data).flatMap((itemName) =>
        data[itemName].map((entry) => ({
            item: itemName,
            date: entry.ds,
            yhat: entry.yhat.toFixed(2),
            yhat_upper: entry.yhat_upper.toFixed(2),
            yhat_lower: entry.yhat_lower.toFixed(2),
        }))
    );

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Box Title="ACTIVITY LOGS" BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrowsOrders} />
                        {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} /> */}
                    </Box>
                </Main>
            </Group>
        </>
    )

}