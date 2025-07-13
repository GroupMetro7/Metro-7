import React from 'react'
import '../assets/css/pages/Login.sass'
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Href, Button } from '../Exporter/Component_Exporter'
import { useStateContext, useScreenWidth, useAuthentication } from '../Exporter/Hooks_Exporter'

export default function LoginPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Login`)
    Body_addclass(`Login-PAGE`)

    // Fetching Hooks
    const {formData, setFormData, handleSubmit, isLoading, error} = useAuthentication()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })) },
            { Title: `Password`, Type: `password`, ID: `password-in`, InCol: true, InWhite: true, Value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })) }
        ]

    return (
        <Main>
            <Section ID={`login`} Class={`login`}>
                <Form Title={`LOGIN`} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p className={`error`}>{error}</p></Group>}
                    <Group Class={`inputside`} Col>
                        {Inputboxes.map((input, index) => (
                            <Inputbox
                                key={index}
                                Title={input.Title}
                                Type={input.Type}
                                ID={input.ID}
                                InCol={input.InCol}
                                InWhite={input.InWhite}
                                Value={input.Value}
                                onChange={input.onChange}
                            />
                        ))}
                    </Group>
                    <Group Class={`buttonside`} Col>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} disabled={isLoading} BtnWhite />
                        <Button Title={`REGISTER`} ID={`register-btn`} Redirect={`/register`} BtnWhite />
                        <Href Title={`FORGOT PASSWORD?`} ID={`fpass-btn`} Redirect={`/forget_password`} HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}
