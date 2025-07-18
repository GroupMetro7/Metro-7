import React from 'react'
import '../Assets/CSS/Pages/Login.sass'
import { Main, Section, Form, Group, Inputbox, SubmitButton, Href, Button } from '../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useAuthentication } from '../Exporter/Hooks_Exporter'

export default function LoginPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Login`)
    useBodyAddClass(`Login-PAGE`)

    // Fetching Hooks
    const {formData, setFormData, handleSubmit, isLoading, error} = useAuthentication()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: formData.email, OnChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })) },
            { Title: `Password`, Type: `password`, ID: `password-in`, InCol: true, InWhite: true, Value: formData.password, OnChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })) }
        ]

    return (
        <Main>
            <Section ID={`login`}>
                <Form Title={`LOGIN`} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p className={`error`}>{error}</p></Group>}
                    <Group Class={`inputside`} Col>
                        {Inputboxes.map((Input, Index) => (
                            <Inputbox
                                Key={Index}
                                Title={Input.Title}
                                Type={Input.Type}
                                ID={Input.ID}
                                InCol={Input.InCol}
                                InWhite={Input.InWhite}
                                Value={Input.Value}
                                OnChange={Input.OnChange}
                            />
                        ))}
                    </Group>
                    <Group Class={`buttonside`} Col>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                        <Button Title={`REGISTER`} ID={`register-btn`} Redirect={`/register`} BtnWhite />
                        <Href Title={`FORGOT PASSWORD?`} ID={`fpass-btn`} Redirect={`/forget_password`} HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}
