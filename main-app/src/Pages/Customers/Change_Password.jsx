import { useEffect, useState } from "react";
import "../../assets/css/pages/customers/Forgot_Password.sass";
import { useStateContext } from "../../Contexts/ContextProvider";
import {
  ScreenWidth,
  Title,
  Body_addclass,
  Main,
  Section,
  Form,
  Group,
  Inputbox,
  SubmitButton,
  Href,
  Button,
} from "../../Exporter/component_exporter";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useParams, useLocation } from "react-router-dom";

export default function ChangePasswordPage() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  //form handler connect to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await axiosClient.post("/reset-password", {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      });

      setSuccess("Password has been reset. You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Reset failed, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  Title("Metro 7 | Forget Password");
  Body_addclass("FPass-PAGE");
  const screenwidth = ScreenWidth();

  const Inputboxes = [
    {
      Title: "New Password",
      Type: "password",
      InCol: true,
      InWhite: true,
      Value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      Title: "Confirm Password",
      Type: "password",
      InCol: true,
      InWhite: true,
      Value: passwordConfirmation,
      onChange: (e) => setPasswordConfirmation(e.target.value),
    },
  ];

  return (
    <>
      <Main>
        <Section Class="fpass">
          <Form Title="NEW PASSWORD" OnSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <Group Class="inputside" Col>
              {Inputboxes.map((input, index) => (
                <Inputbox
                  key={index}
                  Title={input.Title}
                  ID={input.ID}
                  Type={input.Type}
                  InCol={input.InCol}
                  InWhite={input.InWhite}
                  Value={input.Value}
                  onChange={input.onChange}
                />
              ))}
            </Group>
            <Group Class="buttonside" Col>
              <SubmitButton Title="SUBMIT" BtnWhite disabled={isLoading} />
            </Group>
          </Form>
        </Section>
      </Main>
    </>
  );
}
