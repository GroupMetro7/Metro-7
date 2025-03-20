import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Selectionbox, KPI, Table, Button, Modal, Form, SubmitButton, Outputfetch } from '../../exporter/component_exporter'

export default function InventoryManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const user = 'Micheal Lance Kester Li'

    const tbhead = ['SKU NO.', 'ITEM NAME', 'CATEGORY', 'STOCK', 'UNIT COST', 'STOCK VALUE', 'STATUS', 'LAST UPDATED']
    const tbrows = [
        [<>VEG-1989</>, <>Tomato</>, <>Vegetable</>, 99, <>₱25.00</>, <>₱2,475.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
        [<>OIL-1580</>, <>Olive Oil</>, <>Oil</>, 6, <>₱89.00</>, <>₱534.00</>, 'LOW STOCK', <>2025-02-24 <br /> 02:27:25</>],
        [<>MEA-0008</>, <>Salmon</>, <>Meat</>, 24, <>₱58.00</>, <>₱1,392.00</>, 'AVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
        [<>SWE-0008</>, <>Sugar</>, <>Sweetener</>, 0, <>₱5.50</>, <>₱0.00</>, 'UNVAILABLE', <>2025-02-24 <br /> 02:27:25</>],
    ]

    return(
        <>
        <Group>
            <SideBar AdminMode />
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" />
                    <Selectionbox Title="Filter" />
                </Box>
                <Group Class="kpis">
                    <KPI Title="TOTAL REVENUE" Integer="₱230,631.00" Class="red1" />
                    <KPI Title="RATE" Integer="23.8%" />
                    <KPI Title="TOTAL STOCK VALUES" Integer="₱34,106.00" Class="red2" />
                    <KPI Title="MOST PRODUCT REVENUE" Integer="Tomato" Class="red3" />
                </Group>
                <Box Title="INVENTORY" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal="AddModal">
            <Form Title="ADD ITEM" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='SKU No.' Type='text' InCol InWhite />
                    <Inputbox Title='Item Name' Type='text' InCol InWhite />
                    <Inputbox Title='Category' Type='text' InCol InWhite />
                    <Inputbox Title='Stock' Type='email' InCol InWhite />
                    <Inputbox Title='Unit Cost' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="EditModal">
            <Form Title="EDIT ITEM" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='SKU No.' Type='text' Value="" InCol InWhite />
                    <Inputbox Title='Item Name' Type='text' Value="" InCol InWhite />
                    <Inputbox Title='Category' Type='text' Value="" InCol InWhite />
                    <Inputbox Title='Stock' Type='email' Value="" InCol InWhite />
                    <Inputbox Title='Unit Cost' Type='number' Value="" InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="DeleteModal">
            <Form Title="DELETE ITEM" FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title="SKU No." Value="VEG-1989" OutCol OutWhite />
                    <Outputfetch Title="Item Name" Value="Tomato" OutCol OutWhite />
                    <Outputfetch Title="Category" Value="Vegetable" OutCol OutWhite />
                    <Outputfetch Title="Stock" Value="99" OutCol OutWhite />
                    <Outputfetch Title="Unit Cost" Value="₱25.00" OutCol OutWhite />
                    <Outputfetch Title="Stock Value" Value="₱2,475.00" OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='DELETE' BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}