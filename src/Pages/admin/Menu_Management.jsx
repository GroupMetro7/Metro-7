import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch } from '../../exporter/component_exporter'

export default function MenuManagementPage() {
    Title('Menu List Management')
    Body_addclass('Management-PAGE')

    const user = 'Micheal Lance Kester Li'

    const tbhead = ['MENU NO.', 'NAME', 'CATEGORY', 'AMOUNT']
    const tbrows = [
        [<>36548</>, <>Burger</>, <>MEAL</>, 158.00.toFixed(2)],
        [<>18585</>, <>Fries</>, <>MEAL</>, 89.00.toFixed(2)],
        [<>69696</>, <>Bacardi</>, <>BEVERANGE</>, 358.00.toFixed(2)],
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
                <Box Title="MENU" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal="AddModal">
            <Form Title="ADD MENU" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='Name' Type='text' InCol InWhite />
                    <Inputbox Title='Category' Type='text' InCol InWhite />
                    <Inputbox Title='Amount' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="EditModal">
            <Form Title="EDIT MENU" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='Name' Type='text' InCol InWhite />
                    <Inputbox Title='Category' Type='text' InCol InWhite />
                    <Inputbox Title='Amount' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="DeleteModal">
            <Form Title="DELETE EMPLOYEE" FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title="Balance" Value="36548" OutCol OutWhite />
                    <Outputfetch Title="First Name" Value="Micheal Lance Kester" OutCol OutWhite />
                    <Outputfetch Title="Last Name" Value="Li" OutCol OutWhite />
                    <Outputfetch Title="Email" Value="kesterli1998@gmail.com" OutCol OutWhite />
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