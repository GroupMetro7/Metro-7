import { useEffect, useState } from 'react';
import '../assets/css/pages/Login.sass'
import { useStateContext } from '../Contexts/ContextProvider';
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Href, Footer } from '../Exporter/component_exporter'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function LoginPage() {
    const { user, setUser, setToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      axiosClient.get("/user")
          .then(({ data }) => {
              setUser(data);
              setLoading(false); // Stop loading once user data is fetched
          })
          .catch((error) => {
              console.error("Failed to fetch user:", error);
              setLoading(false); // Stop loading even if the request fails
          });
  }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post("/login", {
                email,
                password,
            });

            setUser(response.data.user);
            setToken(response.data.token);
            if (user.role === "customer") {
                navigate("/");
            }
            else if (user.role === "employee") {
                navigate("/service");
            } else if (user.role === "admin") {
                navigate("/admin");
            }
        } catch (err) {
            setError(
                err.response.data.message || "Login failed, please try again."
            );
        }
    };

    Title('Metro 7 | Login')
    Body_addclass('Login-PAGE')
    const screenwidth = ScreenWidth()

    const Inputboxes = [
        { Title: 'Email', Type: 'email', ID: 'email', InCol: true, InWhite: true, Value: email, onChange: (e) => setEmail(e.target.value) },
        { Title: 'Password', Type: 'password', ID: 'password', InCol: true, InWhite: true, Value: password, onChange: (e) => setPassword(e.target.value) }
    ]

    return(
        <>
        <Main>
            <Section Class='login'>
                <Form Title='LOGIN' OnSubmit={handleSubmit}>
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> }
                    <Group Class='inputside' Col>
                        { Inputboxes.map((input, index) => (
                            <Inputbox key={index} Title={input.Title} ID={input.ID} Type={input.Type} InCol={input.InCol} InWhite={input.InWhite} Value={input.Value} onChange={input.onChange } />
                        )) }
                    </Group>
                    <Group Class='buttonside' Col>
                        <SubmitButton Title='LOGIN' BtnWhite />
                        <Href Title='CREATE ACCOUNT' Redirect='/register' HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        </>
    )
}
