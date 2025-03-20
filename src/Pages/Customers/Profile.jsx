import React from 'react'
import '../../assets/css/pages/customers/Profile.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Box, Button, Table, Modal, Form, Group, Inputbox, SubmitButton } from '../../exporter/component_exporter'

export default function LocationPage() {
    Title('Metro 7')
    Body_addclass('Profile-Customer-PAGE')

    const user = "Micheal Lance Kester Li"

    const tbhead = ['ORDER NO.', 'ORDER DATE', 'OPTIONS', 'AMOUNT', 'STATUS']
    const tbrows = [
        [<>234567</>, <>2025-02-24 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱559.00</>, 'PENDING'],
        [<>181818</>, <>2025-02-22 <br /> 02:27:25</>, <>TAKE OUT</>, <>₱358.00</>, 'PAID'],
        [<>176923</>, <>2025-01-08 <br /> 03:33:03</>, <>DINE-IN</>, <>₱1,258.00</>, 'PAID']
    ]

    return(
        <>
        <Header />
        <Main>
            <Section Title='My Profile' Class='myprofile'>
                <Box>
                    <img />
                    <article>
                        <h2>{ user }</h2>
                        <h4>kesterli1998@gmail.com</h4>
                        <h4>09774956316</h4>
                        <h4>SILVER</h4>
                    </article>
                    <div className='buttons'>
                        <Button Title='EDIT PROFILE' OpenModal="EditProfile" />
                    </div>
                </Box>
                <Box Title='Order History' Class='orderhistory' BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } ViewBtn />
                </Box>
            </Section>
        </Main>
        <Footer />
        <Modal Modal="EditProfile">
            <Form Title="Edit Profile" FormTwolayers>
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