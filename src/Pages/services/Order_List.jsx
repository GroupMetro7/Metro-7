import React from 'react'
import '../../assets/css/pages/services/Management.sass'
import { user, orderstbhead, orderstbdata, preorderstbdata } from '../../constant'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, Outputfetch } from '../../exporter/component_exporter'

export default function OrderListPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    return(
        <>
        <Group>
            <SideBar ServiceMode />
            <Main>
                <Box Class='search'>
                    <Inputbox Title='Search' Type='search' />
                    <Inputbox Title='Filter' Type='text' />
                </Box>
                <Box Title='ORDER' BoxCol>
                    <Table HeadRows={ orderstbhead } DataRows={ orderstbdata } Paginate={ 5 } EditBtn />
                </Box>
                <Box Title='PRE-ORDER' BoxCol>
                    <Table HeadRows={ orderstbhead } DataRows={ preorderstbdata } Paginate={ 5 } EditBtn />
                </Box>
            </Main>
        </Group>
        <Modal Modal='EditModal'>
            <Form Title='VIEW ORDER' FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='Order No.' Value='25569' OutCol OutWhite />
                    <Outputfetch Title='Order Date' Value='2025-02-24 | 02:27:25' OutCol OutWhite />
                    <Outputfetch Title='Cashier Name' Value='Micheal Lance Kester Li' OutCol OutWhite />
                    <Outputfetch Title='Options' Value='TAKE-OUT' OutCol OutWhite />
                    <Outputfetch Title='Status' Value='PREPARING' OutCol OutWhite />
                </Group>
                <Group Class='outputfetch' Col>
                    <Outputfetch Title='Customer Name' OutWhite />
                    <div><Outputfetch Value='Pork Steak' OutWhite /><Outputfetch Value='₱581.00' OutWhite /></div>
                    <div><Outputfetch Value='Bacardi' OutWhite /><Outputfetch Value='₱369.00' OutWhite /></div>
                </Group>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='Total Price' Value='₱950.00' OutCol OutWhite />
                    <Outputfetch Title='Discount' Value='₱0.00' OutCol OutWhite />
                    <Outputfetch Title='Payment Mode' Value='ONLINE' OutCol OutWhite />
                    <Outputfetch Title='Down Payment Price' Value='₱475.00' OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CLOSE' CloseModal BtnWhite />
                    <Button Title='MARKED AS DONE' Onclick='' BtnWhite />
                    {/* <Button Title='MARKED AS PREPARED' Onclick='' BtnWhite /> */}
                </Group>
            </Form>
        </Modal>
        </>
    )
}