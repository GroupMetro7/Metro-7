import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Selectionbox, Table, Button, Modal, Form, SubmitButton } from '../../exporter/component_exporter'

export default function CustomerManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const user = 'Micheal Lance Kester Li'

    const tbhead = ['CUST. NO.', 'CUST. NAME', 'EMAIL', 'LAST VISIT', 'TOTAL VISITS', 'LOYALTY', 'BALANCE']
    const tbrows = [
        [<>36548</>, <>Micheal Lance Kester Li</>, <>kesterli1998 @gmail.com</>, <>2025-02-24 <br/> 02:27:25</>, 23, <>SILVER</>, <>₱2,475.00</>],
        [<>18585</>, <>Dylan Clive Espino</>, <>dylanyak @gmail.com</>, <>2025-02-24 <br/> 02:27:25</>, 23, <>SILVER</>, <>₱0.00</>],
        [<>69696</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>2025-02-24 <br/> 02:27:25</>, 23, <>SILVER</>, <>₱0.00</>],
        [<>36548</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>2025-02-24 <br/> 02:27:25</>, 23, <>SILVER</>, <>₱0.00</>],
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
                <Box Title="CUSTOMERS" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal="AddModal">
            <Form Title="ADD CUSTOMER" FormTwolayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Inputbox Title='Contact Number' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="EditModal">
            <Form Title="EDIT CUSTOMER" FormTwolayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' Value="" InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' Value="" InCol InWhite />
                    <Inputbox Title='Email' Type='email' Value="" InCol InWhite />
                    <Inputbox Title='Contact Number' Type='number' Value="" InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}