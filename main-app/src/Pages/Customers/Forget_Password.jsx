import React from 'react'
import '../../Assets/CSS/Pages/Customers/Forgot_Password.sass'
import { Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useRetrieveEmailUser } from '../../Exporter/Hooks_Exporter'

export default function ForgetPasswordPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Forget Password`)
    useBodyAddClass(`FPass-PAGE`)

    // Fetching Hooks
    const {email, setEmail, handleSubmit, isLoading, error, success} = useRetrieveEmailUser()

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: email, OnChange: (e) => setEmail(e.target.value) },
        ]

    return(
        <Main>
            <Section ID={`retrieveemail`}>
                <Form Title={`LOST PASSWORD`} OnSubmit={handleSubmit}>
                    {error ? <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> :
                    success ? <Group Class={`signalside`}><p class={`success`}>{success}</p></Group> :
                    <Group Class={`infoside`} Col> <h5>Please enter your email to search for your account.</h5></Group>}
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