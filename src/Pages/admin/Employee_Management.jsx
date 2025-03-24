import React from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { user, emptbhead, emptbdata, roleoptions, scheduleoptions } from '../../constant'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch } from '../../exporter/component_exporter'

export default function EmployeeManagementPage() {
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
                <Box Title='EMPLOYEES' UpperRight={ <Button Title='+' OpenModal='AddModal' /> } BoxCol>
                    <Table HeadRows={ emptbhead } DataRows={ emptbdata } Paginate={ 5 } EditBtn Deletebtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal='AddModal'>
            <Form Title='ADD EMPLOYEE' FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Selectionbox Title='Role' Options={ roleoptions } SltCol SltWhite />
                    <Selectionbox Title='Schedule' Options={ scheduleoptions } SltCol SltWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='EditModal'>
            <Form Title='MODIFY EMPLOYEE' FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='First Name' Type='text' InCol InWhite />
                    <Inputbox Title='Last Name' Type='text' InCol InWhite />
                    <Inputbox Title='Email' Type='email' InCol InWhite />
                    <Selectionbox Title='Role' Options={ roleoptions } SltCol SltWhite />
                    <Selectionbox Title='Schedule' Options={ scheduleoptions } SltCol SltWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='DeleteModal'>
            <Form Title='DELETE EMPLOYEE' FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='Balance' Value='36548' OutCol OutWhite />
                    <Outputfetch Title='First Name' Value='Micheal Lance Kester' OutCol OutWhite />
                    <Outputfetch Title='Last Name' Value='Li' OutCol OutWhite />
                    <Outputfetch Title='Email' Value='kesterli1998@gmail.com' OutCol OutWhite />
                    <Outputfetch Title='Role' Value={ roleoptions[1] } OutCol OutWhite />
                    <Outputfetch Title='Schedule' Value={ scheduleoptions[0] } OutCol OutWhite />
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