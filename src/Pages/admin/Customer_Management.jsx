import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { user, custbhead, custbdata } from '../../constant'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Selectionbox, Table, Button, Modal, Form, SubmitButton, Outputfetch } from '../../exporter/component_exporter'

export default function CustomerManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    return(
        <>
        <Group>
            <SideBar AdminMode />
            <Main>
                <Box Class='search'>
                    <Inputbox Title='Search' Type='search' />
                    <Selectionbox Title='Filter' />
                </Box>
                <Box Title='CUSTOMERS' UpperRight={ <Button Title='+' OpenModal='AddModal' /> } BoxCol>
                    <Table HeadRows={ custbhead } DataRows={ custbdata } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal='AddModal'>
            <Form Title='ADD CUSTOMER' FormTwolayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Inputbox Title='Contact Number' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='EditModal'>
            <Form Title='MODIFY CUSTOMER' FormTwolayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='First Name' Type='text' Value='' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' Value='' InCol InWhite />
                    <Inputbox Title='Email' Type='email' Value='' InCol InWhite />
                    <Inputbox Title='Contact Number' Type='number' Value='' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='DeleteModal'>
            <Form Title='DELETE CUSTOMER' FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='First Name' Value='Micheal Lance Kester' OutCol OutWhite />
                    <Outputfetch Title='Last Name' Value='Li' OutCol OutWhite />
                    <Outputfetch Title='Email' Value='kesterli1998@gmail.com' OutCol OutWhite />
                    <Outputfetch Title='Contact Number' Value='09774956316' OutCol OutWhite />
                    <Outputfetch Title='Loyalty' Value='SILVER' OutCol OutWhite />
                    <Outputfetch Title='Balance' Value='₱0.00' OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='DELETE' BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}