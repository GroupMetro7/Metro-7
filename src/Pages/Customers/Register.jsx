import React from 'react'
import '../../assets/css/pages/customers/Register.sass'
import { Title, Body_addclass, Header, Footer, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../exporter/component_exporter'

export default function LoginPage() {
    Title('Metro 7 | Register')
    Body_addclass('Register-PAGE')

    const user = "Micheal Lance Kester Li"

    return(
        <>
        <Header />
        <Main>
            <Section Class='register'>
                <Form Title='REGISTER' FormTwolayers>
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='First Name' Type='text' InCol InWhite />
                        <Inputbox Title='Last Name' Type='text' InCol InWhite />
                        <Inputbox Title='Email' Type='email' InCol InWhite />
                        <Inputbox Title='Contact Number' Type='number' InCol InWhite />
                        <Inputbox Title='Password' Type='password' InCol InWhite />
                        <Inputbox Title='Confirm Password' Type='password' InCol InWhite />
                    </Group>
                    <Group Class='buttonside'>
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        <Footer />
        </>
    )
}