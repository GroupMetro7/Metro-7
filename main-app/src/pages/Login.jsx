import { useEffect, useState } from 'react';
import '../assets/css/pages/Login.sass'
import { useStateContext } from '../Contexts/ContextProvider';
import { Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Href, Footer } from '../exporter/component_exporter'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axiosClient';

export default function LoginPage() {
    const { token, setUser, setToken } = useStateContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useStateContext();

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

    return(
        <>
        <Main>
            <Section Class='login'>
                <Form Title='LOGIN' OnSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Group Class='inputside' Col>
                        <Inputbox Title='Email' Type='email' InCol InWhite Value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        <Inputbox Title='Password' Type='password' InCol InWhite Value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Group>
                    <Group Class='buttonside' Col>
                        <SubmitButton Title='LOGIN' BtnWhite />
                        <Href Title='CREATE ACCOUNT' Redirect='/register' HrefWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        <Footer />

        </>

    )
}
