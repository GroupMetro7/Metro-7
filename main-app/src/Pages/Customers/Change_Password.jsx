import React from 'react'
import '../../assets/css/pages/customers/Forgot_Password.sass'
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext } from '../../Exporter/Hooks_Exporter'
import useChangePassUser from '../../Hooks/Users/Change_Pass'

export default function ChangePasswordPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Change Password`)
    Body_addclass(`FPass-PAGE`)

    // Fetching Hooks
    const {password, setPassword, passwordConfirmation, setPasswordConfirmation, handleSubmit, isLoading, error, success} = useChangePassUser()

    // UI Hooks
    const screenwidth = ScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: "New Password", Type: "password", InCol: true, InWhite: true, Value: password, onChange: (e) => setPassword(e.target.value), },
            { Title: "Confirm Password", Type: "password", InCol: true, InWhite: true, Value: passwordConfirmation, onChange: (e) => setPasswordConfirmation(e.target.value), },
        ]

    return (
        <Main>
            <Section Class={`fpass`}>
                <Form Title={`NEW PASSWORD`} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
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
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}