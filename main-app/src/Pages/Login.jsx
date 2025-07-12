import { useEffect } from 'react';
import '../assets/css/pages/Login.sass';
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Href, Button } from '../Exporter/component_exporter';
import useAuthentication from '../hooks/authentication';
import { useStateContext } from "../Contexts/ContextProvider";

export default function LoginPage() {
    const { user } = useStateContext()
    Title(`Metro 7 | Login`);
    Body_addclass(`Login-PAGE`);

    const {
        formData,
        setFormData,
        handleSubmit,
        isLoading,
        error
    } = useAuthentication();

    const Inputboxes = [
        { Title: 'Email', Type: 'email', ID: 'email', InCol: true, InWhite: true, Value: formData.email, onChange: (e) => setFormData(prev => ({ ...prev, email: e.target.value })) },
        { Title: 'Password', Type: 'password', ID: 'password', InCol: true, InWhite: true, Value: formData.password, onChange: (e) => setFormData(prev => ({ ...prev, password: e.target.value })) }
    ];

    return (
        <Main>
            <Section Class='login'>
                <Form Title='LOGIN' OnSubmit={handleSubmit}>
                    {error && <Group Class="signalside"><p className="error">{error}</p></Group>}
                    <Group Class='inputside' Col>
                        {Inputboxes.map((input, index) => (
                            <Inputbox key={index} Title={input.Title} ID={input.ID} Type={input.Type} InCol={input.InCol} InWhite={input.InWhite} Value={input.Value} onChange={input.onChange} />
                        ))}
                    </Group>
                    <Group Class='buttonside' Col>
                        <SubmitButton Title={isLoading ? "SUBMITTING..." : "SUBMIT"} disabled={isLoading} BtnWhite />
                        <Button Title="REGISTER" Redirect="/register" BtnWhite />
                        <Href Title='FORGOT PASSWORD?' Redirect='/forget_password' HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
    );
}
