import React from 'react'
import '../../assets/css/pages/customers/Register.sass'
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, useRegisterUser } from '../../Exporter/Hooks_Exporter'

export default function RegisterPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Register`)
    Body_addclass(`Register-PAGE`)

    // Fetching Hooks
    const {formData, setFormData, handleSubmit, isLoading, error, success} = useRegisterUser()

    // UI Hooks
    const screenwidth = ScreenWidth()
    
        // Hooks for forms
        const Inputboxes = [
            { Title: `First Name`, Type: `text`, ID: `fname-in`, InCol: true, InWhite: true, Value: formData.firstname, onChange: (e) => setFormData(prev => ({ ...prev, firstname: e.target.value })), },
            { Title: `Last Name`, Type: `text`, ID: `lname-in`, InCol: true, InWhite: true, Value: formData.lastname, onChange: (e) => setFormData(prev => ({ ...prev, lastname: e.target.value })), },
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), },
            { Title: `Contact Number`, Type: `number`, ID: `number-in`, InCol: true, InWhite: true, Value: formData.contact, onChange: (e) => setFormData(prev => ({ ...prev, contact: e.target.value })), },
            { Title: `Password`, Type: `password`, ID: `pass-in`, InCol: true, InWhite: true, Value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })), },
            { Title: `Confirm Password`, Type: `password`, ID: `2pass-in`, InCol: true, InWhite: true, Value: formData.passwordConfirmation, onChange: (e) => setFormData(prev => ({ ...prev, passwordConfirmation: e.target.value })), },
        ]

    return (
        <Main>
            <Section ID={`register`} Class={`register`}>
                <Form Title={`REGISTER`} {...(screenwidth > 766 && { FormTwolayers: true })} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                    <Group Class={`inputside`} {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}>
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
                    <Group Class={`buttonside`}>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} disabled={isLoading} BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}
