import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox } from '../../exporter/component_exporter'

export default function EmployeeManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    const user = 'Micheal Lance Kester Li'

    const roleoptions = ['SERVICE', 'CASHIER', 'COOK']
    const scheduleoptions = [<>WEEKDAYS <br/> 09:00-05:00</>]
    const tbhead = ['EMP. NO.', 'EMP. NAME', 'EMAIL', 'ROLE', 'SCHEDULE', 'LAST LOGGED']
    const tbrows = [
        [<>36548</>, <>Micheal Lance Kester Li</>, <>kesterli1998 @gmail.com</>, roleoptions[0], scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
        [<>18585</>, <>Dylan Clive Espino</>, <>dylanyak @gmail.com</>, <>CASHIER</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
        [<>69696</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SERVICE</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
        [<>69698</>, <>Mark Anthony Amper</>, <>marklagingabsent @gmail.com</>, <>SERVICE</>, scheduleoptions[0], <>2025-02-24 <br/> 02:27:25</>],
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
                <Box Title="EMPLOYEES" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal="AddModal">
            <Form Title="ADD EMPLOYEE" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Selectionbox Title='Role' Options={ roleoptions } SltCol SltWhite />
                    <Selectionbox Title='Schedule' Options={ scheduleoptions } SltCol SltWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title="CANCEL" CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal="EditModal">
            <Form Title="EDIT EMPLOYEE" FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Selectionbox Title='Role' Options={ roleoptions } SltCol SltWhite />
                    <Selectionbox Title='Schedule' Options={ scheduleoptions } SltCol SltWhite />
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