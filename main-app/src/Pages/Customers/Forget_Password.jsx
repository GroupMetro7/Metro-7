import { useEffect, useState } from 'react';
import "../../assets/css/pages/customers/Forgot_Password.sass"
import { useStateContext } from '../../Contexts/ContextProvider';
import { ScreenWidth, Title, Body_addclass, Main, Section, Form, Group, Inputbox, SubmitButton, Href, Button } from '../../Exporter/component_exporter'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';

export default function ForgetPasswordPage() {
    // const { user, setUser, setToken } = useStateContext();
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    // const navigate = useNavigate();

//     useEffect(() => {
//       axiosClient.get("/user")
//           .then(({ data }) => {
//               setUser(data);
//               setLoading(false); // Stop loading once user data is fetched
//           })
//           .catch((error) => {
//               console.error("Failed to fetch user:", error);
//               setLoading(false); // Stop loading even if the request fails
//           });
//   }, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
        const response = await axiosClient.post("/forgot-password", {email});
        setSuccess("Password reset link sent to your email!");
    } catch (err) {
        setError(
            err.response?.data?.message || err.response?.data?.email || "Failed to send reset link, please try again."
        );
        console.error("Error sending reset link:", err);
    }
};


    Title('Metro 7 | Forget Password')
    Body_addclass('FPass-PAGE')
    const screenwidth = ScreenWidth()

    const Inputboxes = [
        { Title: 'Email', Type: 'email', ID: 'email', InCol: true, InWhite: true, Value: email, onChange: (e) => setEmail(e.target.value) },
    ]

    return(
        <>
        <Main>
            <Section Class='fpass'>
                <Form Title='LOST PASSWORD' OnSubmit={handleSubmit}>
                    <Group Class="infoside" Col>
                      {success && <p className="success">{success}</p>}
                      { error && <p className="error" >{error}</p> }
                        <h5>Please enter your email to search for your account.</h5>
                    </Group>
                    <Group Class='inputside' Col>
                        { Inputboxes.map((input, index) => (
                            <Inputbox key={index} Title={input.Title} ID={input.ID} Type={input.Type} InCol={input.InCol} InWhite={input.InWhite} Value={input.Value} onChange={input.onChange } />
                        )) }
                    </Group>
                    <Group Class='buttonside' Col>
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Section>
        </Main>
        </>
    )
}
