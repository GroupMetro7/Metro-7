import React from 'react'
import '../assets/css/pages/Login.sass'
import { user } from '../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Form, Group, Inputbox, SubmitButton, Href } from '../exporter/component_exporter'


export default function LoginPage() {
    Title('Metro 7 | Login')
    Body_addclass('Login-PAGE')

    return (
        <>
        <Header AuthenticatedMode={ user } />
        <Main>
            <Section Class='login'>
                <Form Title='LOGIN'>
                    <Group Class='inputside' Col>
                        <Inputbox Title='Email' Type='email' InCol InWhite />
                        <Inputbox Title='Password' Type='password' InCol InWhite />
                    </Group>
                    <Group Class='buttonside' Col>
                        <SubmitButton Title='LOGIN' BtnWhite />
                        <Href Title='CREATE ACCOUNT' Redirect='/register' HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        <Footer />
        </>
    )
}