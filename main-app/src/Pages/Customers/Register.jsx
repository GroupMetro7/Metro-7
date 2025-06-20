import { useState } from 'react'
import '../../assets/css/pages/customers/Register.sass'
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Footer } from '../../Exporter/component_exporter'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';

export default function RegisterPage() {

  // this file is subject for optimization
    //registration variables
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //form handler connect to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axiosClient.post('/register', {
                lastname,
                firstname,
                email,
                contact,
                password,
                password_confirmation: passwordConfirmation,
            });
            localStorage.setItem("ACCESS_TOKEN", response.data.token);
            navigate("/");
            window.location.reload();
        } catch (err) {
            setError(
                err.response.data.message || "Registration failed, please try again."
            );
        }
    };

    Title("Metro 7 | Register");
    Body_addclass("Register-PAGE")
    const screenwidth = ScreenWidth()

    const Inputboxes = [
        { Title: "First Name", Type: "text", InCol: true, InWhite: true, Value: firstname, onChange: (e) => setFirstName(e.target.value) },
        { Title: "Last Name", Type: "text", InCol: true, InWhite: true, Value: lastname, onChange: (e) => setLastName(e.target.value) },
        { Title: "Email", Type: "email", InCol: true, InWhite: true, Value: email, onChange: (e) => setEmail(e.target.value) },
        { Title: "Contact Number", Type: "number", InCol: true, InWhite: true, Value: contact, onChange: (e) => setContact(e.target.value) },
        { Title: "Password", Type: "password", InCol: true, InWhite: true, Value: password, onChange: (e) => setPassword(e.target.value) },
        { Title: "Confirm Password", Type: "password", InCol: true, InWhite: true, Value: passwordConfirmation, onChange: (e) => setPasswordConfirmation(e.target.value) }
    ]

    return (
        <>
            <Main>
                <Section Class="register">
                    <Form Title="REGISTER" { ...screenwidth > 766 && { FormTwolayers: true } } OnSubmit={handleSubmit}>
                        { error && <Group Class="errorside"><p>{ error }</p></Group> }
                        <Group Class="inputside" { ...screenwidth > 766 ? { Wrap: true } : { Col: true } }>
                            { Inputboxes.map((input, index) => (
                                <Inputbox key={index} Title={input.Title} Type={input.Type} InCol={input.InCol} InWhite={input.InWhite} Value={input.Value} onChange={input.onChange } />
                            )) }
                        </Group>
                        <Group Class="buttonside">
                            <SubmitButton Title="SUBMIT" BtnWhite />
                        </Group>
                    </Form>
                </Section>
            </Main>
        </>
    )
}
