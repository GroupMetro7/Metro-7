import React from 'react'
import '../../assets/css/pages/customers/Profile.sass'
import { user, userrecorderstbhead, userrecorderstbdata } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Box, Button, Table, Modal, Form, Group, Inputbox, SubmitButton } from '../../exporter/component_exporter'

export default function CustomerProfilePage() {
    Title('Metro 7')
    Body_addclass('Profile-Customer-PAGE')

    return(
        <>
        <Header AuthenticatedMode={ user } />
        <Main>

            <Section Title='My Profile' Class='myprofile'>
                <Box Class='profile'>
                    <img />
                    <article>
                        <h2>{ user }</h2>
                        <h4>kesterli1998@gmail.com</h4>
                        <h4>09774956316</h4>
                        <h4>SILVER</h4>
                    </article>
                    <Button Title='EDIT PROFILE' OpenModal='EditProfile' />
                </Box>
                <Box Title='Order History' Class='orderhistory' BoxCol>
                    <Table HeadRows={ userrecorderstbhead } DataRows={ userrecorderstbdata } ViewBtn />
                </Box>
            </Section>
        </Main>
        <Footer />
        <Modal Modal='EditProfile'>
            <Form Title='Edit Profile' FormTwolayers>
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
        </>
    )
}