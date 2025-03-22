import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton } from '../../exporter/component_exporter'

export default function CustomerManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')


    const tbhead = ['CUST. NO.', 'CUST. NAME', 'EMAIL', 'LOYALTY', 'BALANCE']
    const tbrows = [
    ]

    return(
        <>
        <Group>
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" Type="search" />
                    <Inputbox Title="Filter" Type="text" />
                </Box>
                <Box Title="CUSTOMERS" UpperRight={ <Button Title="+" OpenModal="AddModal"/> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } EditBtn Deletebtn />
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
