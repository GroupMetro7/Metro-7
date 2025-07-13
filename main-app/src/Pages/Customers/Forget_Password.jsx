import React from 'react'
import '../../assets/css/pages/customers/Forgot_Password.sass'
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, useFetchEmailUser } from '../../Exporter/Hooks_Exporter'

export default function ForgetPasswordPage() {
    // Basic Hooks
    const { user } = useStateContext()
    Title(`Metro 7 | Forget Password`)
    Body_addclass(`FPass-PAGE`)

    // Fetching Hooks
    const {email, setEmail, handleSubmit, isLoading, error, success} = useFetchEmailUser()

    // UI Hooks
    const screenwidth = ScreenWidth()

        // Hooks for forms
        const Inputboxes = [
            { Title: `Email`, Type: `email`, ID: `email-in`, InCol: true, InWhite: true, Value: email, onChange: (e) => setEmail(e.target.value) },
        ]

    return(
        <Main>
            <Section Class={`fpass`}>
                <Form Title={`LOST PASSWORD`} OnSubmit={handleSubmit}>
                    {error ? <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> :
                    success ? <Group Class={`signalside`}><p class={`success`}>{success}</p></Group> :
                    <Group Class={`infoside`} Col> <h5>Please enter your email to search for your account.</h5></Group>}
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