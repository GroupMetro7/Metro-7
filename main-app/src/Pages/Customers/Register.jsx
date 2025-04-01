import React, { useState } from 'react'
import '../../assets/css/pages/customers/Register.sass'
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Footer } from '../../exporter/component_exporter'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';

export default function RegisterPage() {
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
  Body_addclass("Register-PAGE");

  return (
    <>
      <Main>
        <Section Class="register">
          <Form Title="REGISTER" FormTwolayers OnSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <Group Class="inputside" Wrap>
              <Inputbox
                Title="First Name"
                Type="text"
                InCol
                InWhite
                Value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Inputbox
                Title="Last Name"
                Type="text"
                InCol
                InWhite
                Value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Inputbox
                Title="Email"
                Type="email"
                InCol
                InWhite
                Value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputbox
                Title="Contact Number"
                Type="number"
                InCol
                InWhite
                Value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <Inputbox
                Title="Password"
                Type="password"
                InCol
                InWhite
                Value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Inputbox
                Title="Confirm Password"
                Type="password"
                InCol
                InWhite
                Value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </Group>
            <Group Class="buttonside">
              <SubmitButton Title="SUBMIT" BtnWhite />
            </Group>
          </Form>
        </Section>
      </Main>
      <Footer />
    </>
  );
}
