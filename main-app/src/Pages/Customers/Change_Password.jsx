import React from 'react'
import '../../Assets/CSS/Pages/Customers/Forgot_Password.sass'
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, useScreenWidth, useChangePassUser } from '../../Exporter/Hooks_Exporter'

export default function ChangePasswordPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Change Password`)
    Body_addclass(`FPass-PAGE`)

    // Fetching Hooks
    const {password, setPassword, passwordConfirmation, setPasswordConfirmation, handleSubmit, isLoading, error, success} = useChangePassUser()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: `New Password`, Type: `password`, ID: `pass-in`, InCol: true, InWhite: true, Value: password, OnChange: (e) => setPassword(e.target.value), },
            { Title: `Confirm Password`, Type: `password`, ID: `2pass-in`, InCol: true, InWhite: true, Value: passwordConfirmation, OnChange: (e) => setPasswordConfirmation(e.target.value), },
        ]

    return (
        <Main>
            <Section ID={`changepass`}>
                <Form Title={`NEW PASSWORD`} OnSubmit={handleSubmit}>
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
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
                    </Group>
                </Form>
            </Section>
        </Main>
    )
}