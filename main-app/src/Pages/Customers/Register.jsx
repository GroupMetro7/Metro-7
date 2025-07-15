import React from 'react'
import '../../Assets/CSS/Pages/Customers/Register.sass'
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, useScreenWidth, useRegisterUser } from '../../Exporter/Hooks_Exporter'

export default function RegisterPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Register`)
    Body_addclass(`Register-PAGE`)

    // Fetching Hooks
    const {formData, setFormData, handleSubmit, isLoading, error, success} = useRegisterUser()

    // UI Hooks
    const screenwidth = useScreenWidth()
    
        // Hooks for forms
        const Inputboxes = [
            { Title: `First Name`, Type: `text`, ID: `fname-in`, InCol: true, InWhite: true, Value: formData.firstname, OnChange: (e) => setFormData(prev => ({ ...prev, firstname: e.target.value })), },
            { Title: `Last Name`, Type: `text`, ID: `lname-in`, InCol: true, InWhite: true, Value: formData.lastname, OnChange: (e) => setFormData(prev => ({ ...prev, lastname: e.target.value })), },
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: formData.email, OnChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })), },
            { Title: `Contact Number`, Type: `number`, ID: `number-in`, InCol: true, InWhite: true, Value: formData.contact, OnChange: (e) => setFormData(prev => ({ ...prev, contact: e.target.value })), },
            { Title: `Password`, Type: `password`, ID: `pass-in`, InCol: true, InWhite: true, Value: formData.password, OnChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })), },
            { Title: `Confirm Password`, Type: `password`, ID: `2pass-in`, InCol: true, InWhite: true, Value: formData.passwordConfirmation, OnChange: (e) => setFormData(prev => ({ ...prev, passwordConfirmation: e.target.value })), },
        ]

    return (
        <Main>
            <Section ID={`register`}>
                <Form Title={`REGISTER`} {...(screenwidth > 766 && { FormTwolayers: true })} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                    <Group Class={`inputside`} {...(screenwidth > 766 ? { Wrap: true } : { Col: true })}>
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
                    <Group Class={`buttonside`}>
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `SUBMIT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}