import React from 'react'
import '../../assets/css/pages/services/Profile.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Section, Button, Modal, Form, DateText, TimeText, SubmitButton } from '../../exporter/component_exporter'
import { useStateContext } from '../../Contexts/ContextProvider'

export default function StaffProfile() {
    Title('Inventory Management')
    Body_addclass('Profile-Services-PAGE')

    const {user} = useStateContext();

    return(
        <>
        <Group>
            <Main Row>
                <Group Class="leftside" Col>
                    <Section Title='My Profile' Class='myprofile'>
                        <Box Class="details">
                            <img />
                            <article>
                                <h2>{user.firstname} {user.lastname}</h2>
                                <h4>{user.contact}</h4>
                            </article>
                            <div className='buttons'>
                                <Button Title='EDIT PROFILE' OpenModal="EditProfile" />
                            </div>
                        </Box>
                        <Box Title="Statistics" Class="statistic" BoxCol><img src="" /></Box>
                    </Section>
                </Group>
                <Box Class="rightside" BoxCol>
                    <Group Class="datetime" Col><h2><DateText /><br /><TimeText /></h2><hr /></Group>
                    <Group Class="diningopts">
                        <Button Title="TIME-IN" />
                        <Button Title="TIME-OUT" />
                    </Group>
                    <hr />
                </Box>
            </Main>
        </Group>
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
